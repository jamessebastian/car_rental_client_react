import { Footer } from "../Components/Footer";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ListCars = () => {
  useEffect(() => {
    sendGetRequest();
  }, []);
    const [query, setQuery] = useState([]);
    let a = null;
    let decoded = null;
    try {
      let token = localStorage.getItem("Usertoken");
      decoded = jwt_decode(token);
      // valid token format
    } catch (error) {
      return "Forbidden";
    }
  const sendGetRequest = async () => {
    let decoded = null;
    let token = null;
    try {
      token = localStorage.getItem("Usertoken");
      decoded = jwt_decode(token);
      // valid token format
    } catch (error) {
      return "Forbidden";
    }
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cars/",
        config
      );
      setQuery(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (decoded.user.role == "1"){
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

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Car ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Type</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {query.map((query) => (
                  <Querylist query={query} key={query.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  ); 
  }
  else{
    return "invalid access!";
  }

};

const Querylist = ({ query }) => {
  const deletefn = async (e) => {
    const id = e.target.getAttribute("data-c_id");
    let token = null;
    try {
      token = localStorage.getItem("Usertoken");
    } catch (error) {
      return "Forbidden";
    }
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      let a = "http://localhost:5000/api/cars/" + id;
      const response = await axios.delete(
        a,
        config
      );
      console.log(a);
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{query.car_id}</td>
      <td>{query.name}</td>
      <td>{query.brand}</td>
      <td>{query.type}</td>
      <td>{query.price}</td>
      <td>
        <button
          onClick={(e) => deletefn(e)}
          data-c_id={query.car_id}
          type="button"
          className="btn  m-1 btn-sm btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};
export default ListCars;
