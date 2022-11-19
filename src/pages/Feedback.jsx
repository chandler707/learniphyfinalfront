import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addFeedback } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import { baseUrl } from '../Repository/Repository';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Feedback = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [feedmessage, setFeeDmessage] = useState("");
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("success");
    const [message, setMessage] = useState("message");
    const [refresh, setRefresh] = useState(false);  

    // const navigate = useNavigate(); 
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    useEffect(() => { }, [refresh]);
    const navigate = useNavigate();
    const feedb = async (e) => {
        e.preventDefault();
        let res = await addFeedback({
            name: fullName,
            email: email,
            subject: subject,
            message: feedmessage,
            app_id: '618e5e2f339a8e2b1055fffb',
        })
        if (res && res.status === 1) {
            setType("success");
            setMessage(res.message);
            setOpen(true);
            setRefresh(true);
            setFullName("");
            setSubject("");
            setEmail("");
            setFeeDmessage("");
            document.getElementById("standard-basic1").value = "";
            document.getElementById("standard-basic2").value = "";
            document.getElementById("standard-basic3").value = "";
            document.getElementById("standard-basic4").value = "";
            setTimeout(() => 2000);
        } else {
            setType("error");
            setMessage(res.message);
            setOpen(true);
        }

        // fetch(`${baseUrl}/add_feedback`, {
        //     method: "POST",
        //     body: ({
        //         name: fullName,
        //         email: email,
        //         subject: subject,
        //         message: feedmessage,
        //         app_id: '618e5e2f339a8e2b1055fffb',
        //     }),
        // }).then((response) => {
        //     response.json().then((json) => {
        //         console.log(json);
        //         if (json && json.status === 1) {
        //             setType("success");
        //             setMessage(json.message);

        //             setOpen(true);
        //             setTimeout(() => 2000);

        //         } else {
        //             setType("error");
        //             setMessage(json.message);
        //             setOpen(true);
        //         }
        //     });
        // });

        // let res = await addFeedback({
        //     name: fullName,
        //     email: email,
        //     subject: subject,
        //     message: feedmessage,
        //     app_id: '618e5e2f339a8e2b1055fffb',

        // })
        // if (res.status === 1) {
        //     console.log(res)
        //     setType("success");
        //     setMessage(res.message);

        //     setOpen(true);
        //     setTimeout(() => 2000);

        // } else {
        //     setType("error");
        //     setMessage(res.message);
        //     setOpen(true);
        // }

    }


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

            <Navbar />
            <div className="container-fluid" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/beautiful-scenery-summit-mount-everest-covered-with-snow-white-clouds_181624-21317.jpg?w=740&t=st=1668690713~exp=1668691313~hmac=4e4699858732639ca9e2569c11c7fb5bf5ec04a636160c3218002ffad281414c)", backgroundRepeat: "no-repeat", backgroundSize: "cover", }}>
                <div className="row p-3">
                    <div className="col-sm-4 ms-auto me-auto pt-5  shadow-sm" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgba(275, 275, 275, 0.550)", borderRadius: "15px" }}>
                        <h4 className='text-center' style={{ fontWeight: "900", fontFamily: "segoe ui symbol" }}>Feedback <i class="fa-solid fa-paper-plane" style={{ color: "#640513" }} ></i></h4>
                        <p className='text-center mb-0' style={{ fontWeight: "700", fontFamily: "segoe ui symbol", fontSize: "14px" }}>Free Feel To Drop Us Your Feedback</p>
                        <form action="" className='ms-auto me-auto p-5 feedback-form' onSubmit={feedb}>
                            <div className='mb-4'>
                                <TextField id="standard-basic1" type={"text"} className='col-sm-12 w-100' label="Full Name" variant="standard" onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                            <div className='mb-4'>
                                <TextField id="standard-basic2" type={"email"} className='col-sm-12 w-100' label="Email Address" variant="standard" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='mb-4'>
                                <TextField id="standard-basic3" onChange={(e) => setSubject(e.target.value)} type={"text"} className='col-sm-12 w-100' label="Subject" variant="standard" required />
                            </div>
                            <div className='mb-4'>
                                <TextField id="standard-basic4" onChange={(e) => setFeeDmessage(e.target.value)} minRows={10} className='col-sm-12 w-100' label="Message" variant="standard" required />
                            </div>
                            <Button variant="contained" type='submit' className='w-100 mt-3 p-3 mb-5' style={{ backgroundColor: "#640513" }}>Send Message &nbsp;<i class="fa-solid fa-paper-plane" ></i></Button>

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Feedback