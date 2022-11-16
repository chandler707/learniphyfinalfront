import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Contactus = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row mb-5">
                    <div className="col-sm-6 ">
                        <h3 className='mt-5 pt-5 ms-5'>Connecting people with knowledge</h3>
                        <a href="#contact">
                            <button className='btn btn text-light btn-block mb-2 ms-5' style={{ borderRadius: "0px", backgroundColor: "#640513" }}><i class="fa-solid fa-phone"></i> &nbsp;Contact Us</button>
                        </a>
                    </div>
                    <div className="col-sm-6 text-center">
                        <img src="https://about.udemy.com/wp-content/uploads/2021/07/company.png" height={300} alt="" />
                    </div>
                </div>
            </div>

            <div className="container mt-5" id='contact'>
                <div className="row mt-5">
                    <h2 className='text-center fw-bold mt-5 mb-5' style={{
                        fontFamily: "segoe ui symbol"
                    }}>Contact Us</h2>
                    <div className="col-sm-6 ms-auto me-auto">

                        <form action="" className=''>
                            <div className="row">
                                <div className="col-sm-6 ">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" style={{ fontSize: "14px" }} class="form-label">Full Name</label>
                                        <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ borderRadius: "0px", border: "1px solid black" }} placeholder="Enter Full Name" />

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" style={{ fontSize: "14px" }} class="form-label">Email address</label>
                                        <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ borderRadius: "0px", border: "1px solid black" }} placeholder="Enter Email Address" />

                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" style={{ borderRadius: "0px", border: "1px solid black" }} rows="6"></textarea>
                            </div>
                            <button className='btn btn text-light btn-block mb-2 p-3' style={{ borderRadius: "0px", backgroundColor: "#640513" }}><i class="fa-solid fa-phone"></i> &nbsp;Contact Us</button>



                        </form>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contactus