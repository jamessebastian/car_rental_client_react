import { Footer } from "../Components/Footer";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Admin_userlist = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    sendGetRequest();
  }, []);
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
    let token = localStorage.getItem("Usertoken");

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/",
        config
      );
      setUsers(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (decoded.user.role == "1") {
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
                    <th scope="col">id</th>
                    <th scope="col">firstName</th>
                    <th scope="col">lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Phone</th>
                    <th>role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <User user={user} key={user.id} />
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

const User = ({ user }) => {
  const deletefn = async (e) => {
    const id = e.target.getAttribute("data-userid");
    console.log(id);

    let token = localStorage.getItem("Usertoken");

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    console.log(token);
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/user/" + id,
        config
      );
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  if(user.role == 1){
    return(
      <>
          <tr>
      <td>{user.id}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td>{user.phone}</td>
      <td>{user.role == "1" ? "admin" : "normal user"}</td>
      
    </tr>
      </>
    )
  }
  else{
      return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td>{user.phone}</td>
      <td>{user.role == "1" ? "admin" : "normal user"}</td>
      <td>
        <button
          onClick={(e) => deletefn(e)}
          data-userid={user._id}
          type="button"
          className="btn  m-1 btn-sm btn-danger"
        >
          delete
        </button>
        <form action="/editUser">
          <input type="text" name="userID" value={user._id} hidden />
          <input
            type="submit"
            value="Update details"
            className="btn btn-primary btn-sm"
          />
        </form>
      </td>
    </tr>
  );
  }

};

export default Admin_userlist;
