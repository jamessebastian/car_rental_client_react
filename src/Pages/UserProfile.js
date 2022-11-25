import "../Components/css/UserProfile.css";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
const axios = require("axios");

const UserProfile = () => {
  const navigate = useNavigate();
  let a = null;
  try {
    let token = localStorage.getItem("Usertoken");
    let decoded = jwt_decode(token);

    if (decoded.user.role == "1") {
      navigate("/Admin_userlist");
    }

    if (token) {
      console.log(token);
      console.log(decoded.user._id);
      a = "http://localhost:5000/api/user/" + decoded.user._id;
    }
  } catch (err) {
    navigate("/");
  }

  const [posts, setPosts] = useState([]);
  const sendGetRequest = async () => {
    let token = localStorage.getItem("Usertoken");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      const response = await axios.get(a, config);
      setPosts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    sendGetRequest();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Postdata post={post} />
      ))}
    </>
  );
};

const Postdata = ({ post }) => {
  console.log(post.phone);
  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div>
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        {" "}
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />{" "}
                      </div>
                      <h6 className="f-w-600">
                        {" "}
                        {post.firstname} {post.lastname}
                      </h6>

                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400"> {post.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Phone</p>
                          <h6 className="text-muted f-w-400"> {post.phone}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Bookings
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Cars Booked</p>
                          <h6 className="text-muted f-w-400">3</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">User id</p>
                          <h6 className="text-muted f-w-400"> {post.id}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-2">
                      <form action="/editUser">
                        <input
                          type="text"
                          name="userID"
                          value={post._id}
                          hidden
                        />
                        <input
                          type="submit"
                          value="Update details"
                          className="btn btn-primary btn-sm"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
