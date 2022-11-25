import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import AuthContext from "../Components/context/AuthContext";

const EditAbout = () => {
  const navigate = useNavigate();
  const [formData2, setFromDate] = useState({
    name: "",
    email: "",
  });

  const { title, description } = formData2;

  const onChange = (e) => {
    setFromDate({ ...formData2, [e.target.name]: e.target.value });
  };
  const [err, SetError] = useState("");
  let a = null;
  let decoded = null;
  try {
    let token = localStorage.getItem("Usertoken");
    decoded = jwt_decode(token);
    // valid token format
  } catch (error) {
    return "Forbidden";
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = {
      title: title,
      description: description,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/aboutus",
        data,
        config
      );

      console.log(response);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        SetError(error.response.data);
        console.log(err);
      }
    }
  };
  if (decoded.user.role == "1") {
    return (
      <>
        <div className="">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>

            <div className="col">
              <br />
              <br />
              <h1>Edit About Page</h1>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label>Title</label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-lg btn-block"
                />
              </form>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
      </>
    );
  } else {
    return "invalid access!";
  }
};

export default EditAbout;
