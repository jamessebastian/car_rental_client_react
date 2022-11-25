import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Carlist from "./Pages/Carlist";
import Admin_addcar from "./Admin/AddCars";
import EditAbout from "./Admin/EditAbout";
import Payment from "./Pages/Payment";
import Bookings from "./Pages/MyBookings";
import BookCar from "./Pages/BookCar";
import Register from "./Pages/Register";
import Feedback from "./Pages/Feedback";
import FeedbackUser from "./Pages/FeedbackUser";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import { useState } from "react";
import UserProfile from "./Pages/UserProfile";
import EditUser from "./Pages/EditUser";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import PasswordReset from "./Pages/PasswordReset";
import Faq from "./Pages/Faq";
import AuthContext from "./Components/context/AuthContext";
import Admin_userlist from "./Admin/UserList";
import Inquires from "./Admin/Inquires";
import Respond from "./Admin/Respond";
import ListCars from "./Admin/ListCars";
import Admin_Bookings from "./Admin/Bookings";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("Usertoken");
    setIsLoggedIn(false);
  };
  let appRoutes;

  if (isLoggedIn) {
    appRoutes = (
      <Routes>
        <Route path="Admin_addcar" element={<Admin_addcar />} />
        <Route path="Admin_about" element={<EditAbout />} />
        <Route path="Admin_userlist" element={<Admin_userlist />} />
        <Route path="Carlist" element={<Carlist />} />
        <Route path="Payment" element={<Payment />} />
        <Route path="Booking/:id" element={<BookCar />} />
        <Route path="Login" element={<Login />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Feedback" element={<Feedback />} />
        <Route path="FeedbackUser" element={<FeedbackUser />} />
        <Route path="UserProfile" element={<UserProfile />} />
        <Route path="EditUser" element={<EditUser />} />
        <Route path="Bookings" element={<Bookings />} />
        <Route path="Forgot" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="Faq" element={<Faq />} />
        <Route path="About" element={<About />} />
        <Route path="Inquires_list" element={<Inquires />} />
        <Route path="Respond" element={<Respond />} />
        <Route path="Admin_Listcars" element={<ListCars />} />
        <Route path="Admin_Bookings" element={<Admin_Bookings />} />
      </Routes>
    );
  } else {
    appRoutes = (
      <Routes>
        <Route path="Contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="Carlist" element={<Carlist />} />
        <Route path="Login" element={<Login />} />
        <Route path="Feedback" element={<Feedback />} />
        <Route path="Register" element={<Register />} />
        <Route path="Forgot" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="Faq" element={<Faq />} />
        <Route path="About" element={<About />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <div>
          <Nav />
          <div className="bodyy">{appRoutes}</div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
