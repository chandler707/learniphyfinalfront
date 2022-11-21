import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/navbar.css";
import { register, get_state, get_city } from '../Repository/UserRepository';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { app_id } from '../Repository/Repository';
import { height } from '@mui/system';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Signup = () => {
    const [firstname, setfirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("success");
    const [message, setMessage] = useState("message");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const navigate = useNavigate();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const registerUser = async (e) => {
        e.preventDefault();
        let res = await register({
            fname: firstname,
            lname: lastname,
            mobile: mobile,
            email: email,
            city: city,
            state: state,
            app_id: '618e5e2f339a8e2b1055fffb',
        });
        if (res.status === 1) {
            console.log(res)
            setType("success");
            setMessage(res.message);

            setOpen(true);
            setTimeout(() => navigate("/login"), 2000);
            localStorage.setItem("mobile", res.data.mobile);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.emaill);
        } else {
            setType("error");
            setMessage(res.message);
            setOpen(true);
        }
    };
    useEffect(() => {
        states();
    }, []);
    const states = async () => {
        let res = await get_state({ is_all: true, app_id: app_id });
        setStateList(res.data);
    };
    const onchangeState = async (e) => {
        console.log(e.target.value);
        setState(e.target.value);
        let res = await get_city({ is_all: true, app_id: app_id, state_id: e.target.value });
        if (res.status === 1) {
            setCityList(res.data);
            console.log(res.data)
        }
    };
    return (
        <>
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
            <div className="container-fluid bg-light signups" >

                <div className="row">
                    <div className=" container ">
                        <div className="col-sm-8 ms-auto me-auto ">
                            <form className='login col-sm-6  ms-auto me-auto p-5 mt-3 bg-white shadow-sm' onSubmit={registerUser}>
                                <h5 className=' mb-4 text-dark'>Sign up and start learning</h5>
                                <div class="mb-2">
                                    <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">First Name</label>
                                    <input type="text" class="form-control p-2" id="exampleInputEmail1" placeholder='Enter Your First Name' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} onChange={(e) => setfirstName(e.target.value)} required />
                                </div>
                                <div class="mb-2">
                                    <label for="exampleInputPassword1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">Last Name</label>
                                    <input type="text" class="form-control p-2" placeholder='Enter Your Last Name' id="exampleInputPassword1" style={{ borderRadius: "0px" }} onChange={(e) => setlastName(e.target.value)} required />
                                </div>
                                <div class="mb-2">
                                    <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">Email Address</label>
                                    <input type="email" class="form-control p-2" id="exampleInputEmail1" placeholder='Enter Your Email Address' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} onChange={(e) => setEmail(e.target.value)} required />
                                    {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label for="exampleInputPassword1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">State</label>
                                        <select class="form-select p-2" aria-label="Default select example" style={{ borderRadius: "0px" }} onChange={onchangeState} required>
                                            <option selected style={{ fontSize: "13px" }} >Select State</option>
                                            {stateList?.map((ele, index) => {
                                                return (
                                                    <option style={{ fontSize: "13px" }} key={index} value={ele._id}>
                                                        {ele.state_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="exampleInputPassword1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">City</label>
                                        <select class="form-select p-2" aria-label="Default select example" style={{ borderRadius: "0px" }} onChange={(e) => setCity(e.target.value)} required>
                                            <option selected style={{ fontSize: "13px" }} >Select City</option>
                                            {cityList?.map((ele, index) => {
                                                return (
                                                    <option style={{ fontSize: "13px" }} key={index} value={ele._id}>
                                                        {ele.city_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleInputPassword1" style={{ fontSize: "13px" }} class="form-label text-dark mb-0">Phone Number</label>
                                    <input type="tel" class="form-control p-2" placeholder='Enter Your Phone Number' id="exampleInputPassword1" style={{ borderRadius: "0px" }} onChange={(e) => setMobile(e.target.value)} maxLength="10" required />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 m-0">
                                        <p style={{ fontSize: "13px" }} className="text-dark">Already Have Account</p>
                                    </div>
                                    <div className="col-sm-6 text-right px-5 ">
                                        <Link to="/login" className='ms-5 ps-5 text-decoration-none' style={{ fontSize: "13px", color: "#640513", textAlign: "right" }}>&nbsp;&nbsp;&nbsp;&nbsp;Login</Link>
                                    </div>
                                </div>
                                <button type="submit" class="btn text-light p-2 w-100 mb-2" style={{ borderRadius: "0px", backgroundColor: "#640513" }}>Sign Up</button>
                                <div className="text-right">
                                    <Link to="/" className='text-decoration-none text-center text-dark' style={{ fontSize: "13px" }}><i class="fa fa-arrow-left"></i>&nbsp;Back To Home</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup