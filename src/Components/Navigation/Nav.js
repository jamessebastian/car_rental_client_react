import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MenuList } from "./Menu";
import { MenuList1 } from "./Menu1";
import { MenuList2 } from "./Menu2";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import "./Nav.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const [click, setclick] = useState(false);
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const menuList1 = MenuList1.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const menuList2 = MenuList2.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  try {
    let token = localStorage.getItem("Usertoken");
    let decoded = jwt_decode(token);
    if (decoded.user.role == "1"){
      return (
        <nav navbar-corner>
          <div className="logo ">
            Car<font>Rental</font>
          </div>
          <ul className={click ? "menu-list" : "menu-list close"}>
            {menuList2}
            <li>
              <button onClick={auth.logout}>Logout</button>
            </li>
          </ul>
        </nav>
      );
    }
    else{
       return (
      <nav navbar-corner>
        <div className="logo ">
          Car<font>Rental</font>
        </div>
        <ul className={click ? "menu-list" : "menu-list close"}>
          {menuList}
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
    }
   
  } catch (err) {
    return (
      <nav navbar-corner>
        <div className="logo ">
          Car<font>Rental</font>
        </div>
        <ul className={click ? "menu-list" : "menu-list close"}>{menuList1}</ul>
      </nav>
    );
  }
};

export default Navbar;
