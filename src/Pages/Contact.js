import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import decode from "jwt-decode";

const Contact = () => {
  const [err, SetError] = useState("");
  let navigate = useNavigate();
  const [formData2, setFromDate] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  const { Name, Email, Subject, Message } = formData2;

  const onChange = (e) => {
    setFromDate({ ...formData2, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = {
      email: Email,
      name: Name,
      subject: Subject,
      message: Message,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/inquiry/",
        data,
        config
      );
      alert("Your response has been noted, check your email!");
      navigate("/");
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
        <section className="mb-4">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us
          </h2>

          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>

          <div className="row">
            <div className="col-md-9 mb-md-0 mb-5">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="name"
                        name="Name"
                        value={Name}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                      />
                      <label for="name" className="">
                        Your name
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="email"
                        name="Email"
                        value={Email}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                      />
                      <label for="email" className="">
                        Your email
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="subject"
                        name="Subject"
                        value={Subject}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                      />
                      <label for="subject" className="">
                        Subject
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="Message"
                        value={Message}
                        rows="2"
                        className="form-control md-textarea"
                        onChange={(e) => onChange(e)}
                      ></textarea>
                      <label for="message">Your message</label>
                    </div>
                  </div>
                </div>
                {err.errors && <div className="alert alert-danger">{err.errors}</div>}
                <div className="text-center text-md-left">
                
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Send message"
                  />
                </div>
                <div className="status"></div>
              </form>
            </div>

            <div className="col-md-3 text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="bi bi-building"></i>
                  <p>Toronto, ET M9R2V8, Canada</p>
                </li>

                <li>
                  <i className="bi bi-telephone-plus-fill"></i>
                  <p>+ 01 234 567 89</p>
                </li>

                <li>
                  <i className="bi bi-at mt-4 fa-5x"></i>
                  <p>contact@mdbootstrap.com</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Contact;
