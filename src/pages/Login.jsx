import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/navbar.css";
import firebase from "../firebase";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { login } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("message");
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSignInSubmit = async (e) => {
    e.preventDefault();
    let res = await login({ mobile: phoneNumber, app_id: app_id });
    if (res.status === 1) {
      // console.log("firebase object ", firebase.firebase_.auth.RecaptchaVerifier);
      let recaptcha = new firebase.firebase_.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      let number = "+91" + phoneNumber;
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (e) {
          let code = prompt("enter the  otp", "");
          if (code === null) return;
          e.confirm(code)
            .then(function (result) {
              setType("success");
              setMessage("OTP Verified!");
              localStorage.setItem("user_id", res?.data._id);
              setTimeout(() => navigate("/"), 2000);
              localStorage.setItem("token", result.recaptchaStoken);
              setOpen(true);
            })
            .catch((result) => {
              console.log("hello ", result);
              setType("success");
              setMessage("Invalid OTP!");
              setOpen(true);
              // setType("error");
              // setMessage(result);
              // setOpen(true);
            });
        });
    } else {
      setType("error");
      setMessage(res.message);
      setOpen(true);
      if (res.status === 2) {
        setTimeout(() => {
          navigate("/signup");
        }, 2500);
      }
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      <div
        className="container-fluid bg-light"
        style={{ backgroundImage: "url('')" }}
      >
        <div className="row ">
          <div className="container mt-5 pt-5 innnermain">
            <div className="col-sm-9 ms-auto me-auto mt-3 p-3  pb-5">
              <form
                className="login  col-sm-6 p-5 ms-auto me-auto mt-4 shadow bg-white"
                onSubmit={onSignInSubmit}
              >
                {/* <div className="text-center">
                <img src={logo} className="m-3" height="40" alt="" />
              </div> */}
                <h5 className=" mb-">Log in to your account</h5>
                <message className="text-center text-light bg-success"></message>
                <div class="mb-1">
                  <label
                    for="exampleInputEmail1"
                    style={{ fontSize: "14px" }}
                    class="form-label"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    value={phoneNumber}
                    class="form-control p-3"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Number"
                    aria-describedby="emailHelp"
                    style={{ borderRadius: "0px", border: "1px solid black" }}
                    required
                  />
                  {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                </div>

                <div className="row redirectrow">
                  <div className="col-sm-6 m-0">
                    <p className="" style={{ fontSize: "13px" }}>
                      Don't Have Account
                    </p>
                  </div>
                  <div className="col-sm-6 text-right px-5">
                    <Link
                      to="/signup"
                      className="ms-5 ps-5 text-decoration-none"
                      style={{ fontSize: "13px", color: "#640513" }}
                    >
                      SignUp
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn text-light p-2 mb-4 w-100"
                  style={{ borderRadius: "0px", backgroundColor: "#640513" }}
                >
                  SEND OTP
                </button>
                <div className="text-right">
                  <Link
                    to="/"
                    className="text-decoration-none text-center text-dark fw-bold"
                    style={{ fontSize: "13px", fontFamily: "segoe ui symbol" }}
                  >
                    <i class="fa fa-arrow-left"></i>&nbsp;Back To Home
                  </Link>
                  <div id="recaptcha-container"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
