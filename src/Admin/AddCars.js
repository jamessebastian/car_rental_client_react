import { Footer } from "../Components/Footer";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

const Admin_addcar = () => {
  const [err, SetError] = useState("");
  let navigate = useNavigate();
  const [myFile, setFile] = useState();
  const [formData2, setFromDate] = useState({
    Brand: "",
    Name: "",
    Phone: "",
    userId: "",
  });
  let a = null;
  let decoded = null;
  try {
    let token = localStorage.getItem("Usertoken");
    decoded = jwt_decode(token);
    // valid token format
  } catch (error) {
    return "Forbidden";
  }

  try {
    const { Brand, Name, Price, Type } = formData2;

    const onChange = (e) => {
      setFromDate({ ...formData2, [e.target.name]: e.target.value });
    };
    const onChange2 = (e) => {
      setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      let token = localStorage.getItem("Usertoken");

      let config = {
        headers: {
          "Content-Type": "multipart/json",
          "x-auth-token": token,
        },
      };

      const data = new FormData();

      data.append("name", Name);
      data.append("brand", Brand);
      data.append("type", Type);
      data.append("price", Price);
      data.append("myFile", myFile);

      try {
        let config = {
          headers: {
            "Content-Type": "multipart/json",
            "x-auth-token": token,
          },
        };
        const response = await axios.post(
          "http://localhost:5000/api/cars/",
          data,
          config
        );
        console.log(response);
        navigate("/Admin_listcars");
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          SetError(error.response.data);
          console.log(error);
        }
      }
    };

    if (decoded.user.role == "1") {
      return (
        <>
          <div classname="container">
            <div className="row">
              <div className="col">
                <Sidebar />
              </div>
              <div className="col">
                <br />
                <br />
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <label>name</label>
                    <input
                      type="text"
                      name="Name"
                      value={Name}
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Civic"
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>brand</label>
                    <input
                      type="text"
                      name="Brand"
                      value={Brand}
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Honda"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>type</label>
                    <input
                      type="text"
                      name="Type"
                      value={Type}
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Automatic"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>price</label>
                    <input
                      type="text"
                      name="Price"
                      value={Price}
                      className="form-control"
                      id="inputEmail4"
                      placeholder="50"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload car image</label>
                    <input
                      type="file"
                      name="myFile"
                      className="form-control"
                      onChange={(e) => onChange2(e)}
                    />
                  </div>
                  {err.errors && (
                    <div className="alert alert-danger">
                      {err.errors[0].msg}
                    </div>
                  )}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                  >
                    add car
                  </button>
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
  } catch (err) {
    console.log(err);
  }
};
export default Admin_addcar;
