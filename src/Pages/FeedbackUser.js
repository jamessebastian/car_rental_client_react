import React, { useEffect, useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../App.css";
import {Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card'





const FeedbackUser=()=> {
  const url="http://localhost:5000/api/feedbacks" 
  const[users,setUsers]=useState([]) 
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [data, setData] = useState({
      name: "",
      date:{date},
      feedback:""
  })
  


  function handle(e){
      const newdata={...data}
      newdata[e.target.id]=e.target.value
      setData(newdata)
      console.log(newdata)

  }
  
  const onDelete=(_id)=>{
      axios.delete(`http://localhost:5000/api/feedbacks/${_id}`)
    //   alert("del")
    //   window.location.reload(false);
      }



  function submit(e){
    e.preventDefault();
    let token = localStorage.getItem('Usertoken');
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
    axios.post("http://localhost:5000/api/feedbacks/",{
      name:data.name,
      feedback:data.feedback
    },config)
    .then(res=>{
      console.log(res.data)
    //   alert("feedback added successfully !!")
    //   window.location.reload(false);


  })
  }
  


  const getUsers = async () => {
    try {
      let token = localStorage.getItem('Usertoken');

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const response = await axios.get(
        'http://localhost:5000/api/feedbacks/',
        config
      );
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
    
  useEffect(()=>{
    getUsers();
  },[users])


  useEffect(()=>{
    onDelete();
  },[])


  return (
   <>
      <Card className="m-5 p-5">
        <Card.Header >Customer Feedback</Card.Header>
        <Card.Body>
          <Card.Title>Help us to give you better services !!</Card.Title>
          <Card.Text className="feedback">
          <h5>Here at Car Rental the customer satisfaction is our highest priority. Therefore our customers’ feedback is really important to us.
          Your comments, not only that you will help us thrive but will also help us improve our services.<br/><br/>
          If you are one our beloved clients, please take 2 minutes of your time to leave us few comments.</h5>
        <h5>We want CarRental Service to be a place where you find all of the Car Rental information you need. If you have comments or feedback please fill out the form below. <br/><br/>
            Our FAQs page can help answer many of your car rental questions.</h5>          </Card.Text>
        </Card.Body><br/>

{/* --form */}
        <Form onSubmit={(e)=>submit(e)}>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>handle(e)} id="name" value={data.name}/><br/>
        </Form.Group>

        
        <label htmlFor="exampleFormControlTextarea1">Feedback</label>
      <textarea
        className="form-control"
        rows="5"
        onChange={(e)=>handle(e)} id="feedback" value={data.feedback}
      /><br/>


        <Button variant="primary" type="submit" value="Submit">
          Submit
        </Button>
      </Form>


      </Card>


      {/* ---show added feedback---- */}
      <Card className="m-5 p-5" >
      {
            users.map((currElem)=>{
              return(
          <div class= "feed" style={{border:"1px solid black", marginTop:"10px" }}>
             
  <Card.Header><i>{currElem.name}</i></Card.Header>
  <Card.Body >
    <blockquote className="blockquote mb-0">
      <p>
        {' '}{currElem.feedback}{' '}
      </p>
      <Button variant="danger" onClick={()=>onDelete(currElem._id)} style={{marginLeft:"90%" }}>
          Delete
        </Button>
      <footer className="blockquote-footer">
        <i>{date} by {currElem.name}</i>
      </footer>
    </blockquote>
  </Card.Body>


  </div>

              )
            })}
</Card>
      
   </>
  );
}

export default FeedbackUser;
