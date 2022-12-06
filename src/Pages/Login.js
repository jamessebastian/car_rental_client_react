import { useState, useContext } from "react";
import { Link, useNavigate, Redirect } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import jwt_decode from "jwt-decode";
import AuthContext from "../Components/context/AuthContext";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFromDate] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFromDate({ ...formData, [e.target.name]: e.target.value });
  };

  const [err, SetError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        data,
        config
      );
      console.log(" respoonse aanee");
      console.log(response);
      localStorage.setItem("Usertoken", response.data.token);
      let token = localStorage.getItem("Usertoken");
      let decoded = jwt_decode(token);

      console.log(decode(response.data.token));
      auth.login();
      window.location = "/";
    } catch (error) {
      SetError(error.response.data);
      alert(err.error[0].msg);
      console.log(error.message);
    }
  };
  return (
    <div className="inner my-4">
      <br />
      <h3>Login</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Email 2</label>

          <input
          required
            className="form-control"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
          required
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        {err.errors && <div className="alert alert-danger">{err.errors}</div>}
        <br></br>
        <input
          className="btn btn-dark btn-lg btn-block"
          type="submit"
          value="LOGIN"
        />
        &nbsp;
        <Link to="/Register" className="btn btn-dark btn-lg btn-block">
          Sign Up
        </Link>
      </form>
      <p>
        <Link to="/Forgot">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
