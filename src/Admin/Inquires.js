import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Inquires = () => {
  const [query, setQuery] = useState([]);
  const [err, SetError] = useState("");
  useEffect(() => {
    sendGetRequest();
  }, []);
  let decoded1 = null;
  try {
    let token = localStorage.getItem("Usertoken");
    decoded1 = jwt_decode(token);
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
        "http://localhost:5000/api/inquiry/",
        config
      );
      setQuery(response.data);
      
    } catch (err) {
      SetError(err.response.data);
      alert(err.error[0].msg);
    }
    
  };
 
  if (decoded1.user.role == "1"){
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
                  <th scope="col">Query Id</th>
                  <th scope="col">Query subject</th>
                  <th scope="col">From</th>
                  <th scope="col">Email</th>
                  <th scope="col">date</th>
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
      const response = await axios.delete(
        "http://http://localhost:5000/api/inquiry/" + id,
        config
      );
      alert("Query deleted!");
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{query.c_id}</td>
      <td>{query.subject}</td>
      <td>{query.name}</td>
      <td>{query.email}</td>
      <td>{query.date}</td>
      <td>
        <button
          onClick={(e) => deletefn(e)}
          data-c_id={query._id}
          type="button"
          className="btn  m-1 btn-sm btn-danger"
        >
          delete
        </button>
        <form action="/Respond">
          <input type="text" name="c_id" value={query._id} hidden />
          <input type="text" name="email" value={query.email} hidden />
          <input
            type="submit"
            value="Respond"
            className="btn btn-primary btn-sm"
          />
        </form>
      </td>
    </tr>
  );
};

export default Inquires;
