import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Bookings = () => {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
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
        "http://localhost:5000/api/bookings/",
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

  const ReturnCar = async (e) => {
    const id = e.target.getAttribute("data-bookingId");
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
        "http://localhost:5000/api/bookings/" + id,
        config
      );
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const Contactus = (e) => {
    navigate("/Contact");
  };
  return (
    <>
      <div className="container m-4 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Car Name</th>
              <th scope="col">Car Type</th>
              <th scope="col">Date From</th>
              <th scope="col">Date To</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((currElem) => {
              return (
                <tr>
                  <td>{currElem.carName}</td>
                  <td>{currElem.carType}</td>
                  <td>{currElem.dateFrom}</td>
                  <td>{currElem.dateTo}</td>
                  <td>{currElem.totalPrice}</td>
                  {currElem.status == "1" ? (
                    <>
                      <td>Pending</td>
                    </>
                  ) : (
                    <>
                      {currElem.status == "0" ? (
                        <>
                          <b class="text-danger"> Booking Rejected</b>
                          <button
                            type="submit"
                            class="btn btn-info"
                            onClick={Contactus}
                          >
                            {" "}
                            Contact us?
                          </button>
                        </>
                      ) : (
                        <>
                          <b class="text-success">Booking Approved</b>
                          <button
                            type="submit"
                            data-bookingId={currElem._id}
                            class="btn btn-info"
                            onClick={(e) => ReturnCar(e)}
                          >
                            {" "}
                            Return Car
                          </button>
                        </>
                      )}
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;
