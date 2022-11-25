import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const About = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/aboutus");
    setUsers(response.data);
    console.log(response.data);
    console.log("--test");
  };

  useEffect(() => {
    getUsers();
  }, []);
  {
    /* <div>
              <Card  className="m-5 p-5">
                <Card.Body>
                  <Card.Title>{currElem.title}</Card.Title>
                  <Card.Text className="feedback"><h5>{currElem.description}</h5></Card.Text>
                </Card.Body>
              </Card>
            </div> */
  }

  return (
    <>
      {users.map((currElem) => {
        return (
          <div className="container">
            <div className="row align-items-center">
              <div class="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
                <div class="row align-items-center">
                  <div class="col-lg-6 col-md-6 col-6">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 mt-4 pt-2">
                        <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80"
                            class="img-fluid"
                            alt="Image"
                          />
                          <div class="img-overlay bg-dark"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-6">
                    <div class="row">
                      <div class="col-lg-12 col-md-12">
                        <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                          <img
                            src="https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2019/10/Buy-a-Kia-Telluride-Instead-gear-patrol-slide-1.jpg?crop=0.620xw:0.919xh;0.293xw,0.0813xh&resize=640:*"
                            class="img-fluid"
                            alt="Image"
                          />
                          <div class="img-overlay bg-dark"></div>
                        </div>
                      </div>

                      <div class="col-lg-12 col-md-12 mt-4 pt-2">
                        <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                          <img
                            src="https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/gt-4dr-coupe/all-vehicles/2022-AMG-GT43-4DR-COUPE-AVP-DR.png"
                            class="img-fluid"
                            alt="Image"
                          />
                          <div class="img-overlay bg-dark"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-md-6 col-12 order-1 order-md-2">
                <div class="section-title ml-lg-5">
                  <h5 class="text-custom font-weight-normal mb-3">
                    {currElem.title}
                  </h5>
                  <h4 class="title mb-4">
                    Our mission is to <br />
                    make your life easier.
                  </h4>
                  <p class="text-muted mb-0">{currElem.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default About;
