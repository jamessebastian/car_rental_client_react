
import { Button, ButtonToolbar } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';



function BookedSlots(props) {

  const[users,setUsers]=useState([]) 


 
  const getUsers = async () => {
    try {
     
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${props.id}`
        
      );
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
    
 


  useEffect(()=>{
    getUsers();
  },[])


    return (
     
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booked Slots of {props.car.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
            users.map((currElem)=>{
              return(
          <div>
              <h6><b>Date From:</b> {currElem.dateFrom}</h6>
              <h6><b>Date To:</b> {currElem.dateTo}</h6><br/>
          </div>
             )
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  export default BookedSlots;
