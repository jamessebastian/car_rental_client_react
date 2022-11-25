import { Footer } from "../Components/Footer";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Bookings = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getCars();
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

  const getCars = async () => {
    try {
      let token = localStorage.getItem("Usertoken");
      let config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
    let a = "http://localhost:5000/api/bookings/getAll";
      const response = await axios.get(
        a,
        config
      );
      console.log(a)
      setCars(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const tableLock = () => {
    return <></>;
  };

  const actionfn = async (e) => {
    const id = e.target.getAttribute("data-userid");
    const action = e.target.getAttribute("data-action");
    console.log(action);

    let token = localStorage.getItem("Usertoken");

    let data = {
      status: action,
      id: id,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    console.log(token);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/bookings/updateStatus",
        data
      );
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err.response);
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

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">Car Name</th>
                    <th scope="col">Car Type</th>
                    <th scope="col">Date From</th>
                    <th scope="col">Date To</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Status</th>
                    <th scope="col" colspan="2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((currElem) => {
                    return (
                      <tr>
                        <td>{currElem.user}</td>
                        <td>{currElem.carName}</td>
                        <td>{currElem.carType}</td>
                        <td>{currElem.dateFrom}</td>
                        <td>{currElem.dateTo}</td>
                        <td>{currElem.totalPrice}</td>
                        <td>
                          {currElem.status == "1" ? "Pending" : "Action Taken"}
                        </td>
                        {currElem.status == "1" ? (
                          <>
                            <td>
                              <button
                                onClick={(e) => actionfn(e)}
                                data-userid={currElem.b_id}
                                data-action={0}
                                type="button"
                                className="btn  m-1 btn-sm btn-danger"
                              >
                                Reject
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                onClick={(e) => actionfn(e)}
                                data-userid={currElem.b_id}
                                data-action={2}
                                type="button"
                                className="btn  m-1 btn-sm btn-success"
                              >
                                Approve
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            {currElem.status == "0" ? "Rejected" : "Approved"}
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return "Invalid access";
  }
};

export default Bookings;
