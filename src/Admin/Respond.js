import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Respond = () => {
    let navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("c_id");
  const email = queryParams.get("email");

  const [formData2, setFromDate] = useState({
    Reply: "",
  });
  const { Reply } = formData2;

  const onChange = (e) => {
    setFromDate({ ...formData2, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("Usertoken");

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    let data = {
      email: email,
      reply: Reply,
      c_id: id,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/inquiry/"+ id,
        data,
        config
      );
      alert("Email sent to: "+email);
      console.log(response);
    navigate("/Inquires_list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div classname="container">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-8">
            <br />
            <br />
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="Email"
                  value={email}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="Reply"
                  value={Reply}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
              <div className="text-center text-md-left">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Send Reply"
                  />
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Respond;
