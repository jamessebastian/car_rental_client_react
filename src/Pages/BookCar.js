import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Col, Row } from "react-bootstrap";
// import 'reactjs-popup/dist/index.css';
import BookedSlots from "./BookedSlots";
const Booking = () => {

  const [car, setCar] = useState([]);
  const [days, setDays] = useState([]);
  const [price, setPrice] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [err, SetError] = useState("");
  const { id } = useParams();
  console.log(id);
  let navigate = useNavigate();
  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
    setCar(response.data);
    console.log(response.data);
    console.log("------------final_______________");
    console.log(car.name);
  };

  useEffect(() => {
    getUsers();
  }, [setCar]);

  const [data, setData] = useState({
    dateFrom: "",
    dateTo: "",
    status: "pending",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  function onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("Usertoken");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      if (
        data.dateFrom == null ||
        data.dateFrom == undefined ||
        data.dateFrom == ""
      ) {
        SetError("Dates Missing");
      }
      axios
        .post(
          "http://localhost:5000/api/bookings/",
          {
            carId: id,
            carName: car.name,
            carType: car.type,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            totalPrice: price,
            status: data.status,
          },
          config
        )
        .then((res) => {
          console.log("--test2--");
          console.log(car.carName);
          console.log(res.data);
          console.log(typeof dateFrom);
          alert("Car Booked successfully !!");
          navigate("/Bookings");
        });
    } catch (err) {
      console.log(err.message);
    }
    
  }

  function noOfdays() {
    var date1 = new Date(data.dateFrom);
    var date2 = new Date(data.dateTo);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var price = Difference_In_Days * car.price;
    setDays(Difference_In_Days);
    setPrice(price);
  }
  var today = new Date(); //defaulting today's date to End Date form component.
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  var today = yyyy + "-" + mm + "-" + dd;
  useEffect(() => {
    noOfdays();
  }, [data]);

  let a = "http://localhost:5000/uploads/" + car.image;
  return (
    <>
      <Row className="m-5">
        <Col>
          <Card style={{ width: "35rem" }} className="p-2">
            <Card.Header class="bg-dark text-white">
              <b>{car.name}</b>
            </Card.Header>
            <Card.Img variant="top" src={a} width="290" height="350" />
            <ListGroup className="list-group-flush">
              <ListGroupItem>{car.name}</ListGroupItem>
              <ListGroupItem>{car.type}</ListGroupItem>
              <ListGroupItem>{car.price}/Day</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

        {/* --------------- */}
        <Col>
          <Card className="p-2">
            <Card.Body>
              <Card.Header>Booking Details</Card.Header>
              <br />

              <Form onSubmit={(e) => onSubmit(e)}>
                <Row>
                  <Col>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => handle(e)}
                      value={data.dateFrom}
                      id="dateFrom"
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>To Date </Form.Label>
                    <Form.Control
                      type="date"
                      value={data.dateTo}
                      onChange={(e) => handle(e)}
                      id="dateTo"
                      required
                    />
                  </Col>
                </Row>
                <br />
                {days ? (
                  <h5>
                    <b>No. of days: {days}</b>
                  </h5>
                ) : (
                  ""
                )}
                {days ? (
                  <h5>
                    <b>Rent per day: {car.price}</b>
                  </h5>
                ) : (
                  ""
                )}
                {days ? (
                  <h5>
                    <b>Total Price: {price}</b>
                  </h5>
                ) : (
                  ""
                )}
                <br />
                {/* -----------booked slots------------ */}
                <Button
                  variant="primary"
                  onClick={() => setModalShow(true)}
                  style={{ width: "30%" }}
                >
                  Check Booked Slots
                </Button>
                <BookedSlots
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  car={car}
                  data={data}
                  id={id}
                />
                <br />
                <br />
                <Card.Header variant="primary">
                  Payment Details
                </Card.Header>{" "}
                <br />
                <Row>
                  <Col>
                    <Form.Label>Card Number </Form.Label>
                    <Form.Control
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      minlength="16"
                      maxlength="16"
                      required
                      pattern="[0-9]+"
                      title="Please Enter a Valid Credit/Debit Number"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      placeholder="John"
                      pattern="[A-Za-z]+"
                      title="Name only"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      placeholder="###"
                      minlength="3"
                      maxlength="3"
                      pattern="[0-9]{3}"
                      title="CVV is invalid"
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Expiry Date </Form.Label>
                    <Form.Control
                      placeholder="MM/YY"
                      maxlength="4"
                      pattern="(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})+"
                      required
                    />
                  </Col>
                </Row>
                <br />
                {err.errors && (
                  <div className="alert alert-danger">{err.errors}</div>
                )}
                <Button variant="primary" type="submit" name="submit">
                  Book Now
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <br />
          <br />

          <h4>Please add your feedback</h4>
          <Link to={`/FeedbackUser`}>
            <Button variant="primary" type="submit" name="submit">
              Feedback
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default Booking;
