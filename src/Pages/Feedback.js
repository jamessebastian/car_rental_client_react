import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Feedback = () => {
  const url = "http://localhost:5000/api/feedbacks";
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const getUsers = async () => {
    try {
      let token = localStorage.getItem("Usertoken");

      let config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/all/api/feedbacks/all",
        config
      );
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Card className="m-5 p-5">
        <Card.Header>Customer Feedback</Card.Header>
        <div class="bg-dark text-white p-5 text-center">
        <Card.Body>
          <Card.Title>
            <h1>A little description about ourselves :)</h1>
          </Card.Title>
          <Card.Text className="feedback">
            
              <p>
                {" "}
                We are a privately owned company by two awesome individuals who
                goes by the name Chaitanya and Rahul. Our subscription service
                is aimed to offer a package of service depending on the
                subscription purchased, the overall idea is to bring down your
                total spending and also providing you the maximum services at
                affordable rates. Trusted by over a 100K subscribers, We are
                here to provide you industry breaking service and competitive
                prices.
              </p>
           {" "}
          </Card.Text>
        </Card.Body>
        </div>
        <br />

        {/* --form */}
      </Card>

      {/* ---show added feedback---- */}
      <Card className="m-5 p-5">
        {users.map((currElem) => {
          return (
            <div
              class="feed"
              style={{ border: "1px solid black", marginTop: "10px" }}
            >
              <Card.Header>
                <i>{currElem.name}</i>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p> {currElem.feedback} </p>
                  <footer className="blockquote-footer">
                    <i>
                      {date} by {currElem.name}
                    </i>
                  </footer>
                </blockquote>
              </Card.Body>
            </div>
          );
        })}
      </Card>
    </>
  );
};

export default Feedback;
