import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import decode from "jwt-decode";

const EditUser = () => {
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("userID");
  const [err, SetError] = useState("");
  const [formData2, setFromDate] = useState({
    Email: "",
    Name: "",
    Phone: "",
    userId: id,
  });
  const { Email, Name, Phone, userId } = formData2;

  const onChange = (e) => {
    setFromDate({ ...formData2, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("Usertoken");

    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    let data = {
      email: Email,
      name: Name,
      phone: Phone,
      userId: id,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/",
        data,
        config
      );
      console.log(response);
      navigate("/userProfile");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        SetError(error.response.data);
        alert(err.error[0].msg);
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                name="Email"
                value={Email}
                className="form-control"
                id="inputEmail4"
                placeholder="Update Email"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputAddress">Name</label>
            <input
              type="text"
              name="Name"
              value={Name}
              className="form-control"
              id="inputAddress"
              placeholder="Update your name"
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputAddress2">Phone</label>
            <input
              type="text"
              name="Phone"
              value={Phone}
              className="form-control"
              id="inputAddress2"
              placeholder="New phone number"
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="userId"
              value={id}
              onChange={(e) => onChange(e)}
              hidden
            />
          </div>
          <div className="col-md-3 mb-3">
            <input type="submit" value="Update details" />
          </div>
          {err.errors && <div className="alert alert-danger">{err.errors}</div>}
        </form>
      </div>
    </>
  );
};
export default EditUser;
