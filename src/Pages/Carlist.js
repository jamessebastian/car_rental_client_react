import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarList = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    let token = localStorage.getItem("token");
    let config = {
      header: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const response = await axios.get("http://localhost:5000/api/cars/", config);
    setUsers(response.data);
    console.log(response.data);
    console.log("--test");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row text-center">
          {users.map((currElem) => {
            let a = "http://localhost:5000/uploads/" + currElem.image;
            if (currElem.status == "0") {
              return (
                <div className="col-10 col-md-4 mt-3 mb-3">
                  <div class="card p-2  ">
                    <div class="d-flex align-items-center">
                      <div class="image">
                        <img src={a} class="rounded" width="155" height="100" />{" "}
                      </div>
                      <div class="ml-3 w-100">
                        <h4 class="mb-0 mt-0 textLeft">{currElem.name}</h4>{" "}
                        <span className="textLeft">{currElem.type}</span>
                        <div class="price">
                          <span className="textRight">
                            {currElem.price}/Day
                          </span>
                          {/* both ways are correct */}
                          <Link to={`/Booking/${currElem._id}`}>
                            <button class="btn2">
                              {/* <Link to={'/Booking/'+currElem._id+'/'+currElem.name+'/'+currElem.type+'/'+currElem.price+'/'+currElem.image}><button class="btn2"> */}
                              Book Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="col-10 col-md-4 mt-3 mb-3">
                  <div class="card p-2  ">
                    <div class="d-flex align-items-center">
                      <div class="image">
                        <img
                          src="http://localhost:5000/uploads/booked.jpg"
                          class="rounded"
                          width="155"
                          height="100"
                        />{" "}
                      </div>
                      <div class="ml-3 w-100">
                        <h4 class="mb-0 mt-0 textLeft">{currElem.name}</h4>{" "}
                        <span className="textLeft">{currElem.type}</span>
                        <div class="price">
                          <span className="textRight">
                            {currElem.price}/Day
                          </span>
                          {/* both ways are correct */}
                          <Link to={`/Booking/${currElem._id}`}>
                            <button class="btn2" disabled>
                              {/* <Link to={'/Booking/'+currElem._id+'/'+currElem.name+'/'+currElem.type+'/'+currElem.price+'/'+currElem.image}><button class="btn2"> */}
                              Check back later
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CarList;
