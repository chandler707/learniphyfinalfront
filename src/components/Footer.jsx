import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/Logo.png";
const Footer = () => {
    return (
        <>
            <div className="container-fluid mt-5 " style={{ backgroundColor: "#1c1d1f" }}>
                <div className="row p-5">
                    <div className="col-sm-3 p-3">
                        <img src={logo} height="80" className='ms-5' alt="" />
                        <p className='text-light ms-5 mt-3 ' style={{ fontSize: "13px" }}>&copy;2022 Dobwal Classes, Inc.</p>
                    </div>
                    <div className="col-sm-3">
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none ' to="/books">Book Business</Link>
                        </div>
                        <div className='m-2'>
                            <a href='https://play.google.com/store/games' className='text-light text-decoration-none ' >Get the app</a>
                        </div>
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none ' to="/about">About us</Link>
                        </div>
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none ' to="/contact">Contact us</Link>
                        </div>


                    </div>
                    <div className="col-sm-3">

                        <div className='m-2'>
                            <Link className='text-light text-decoration-none'>Help and Support</Link>
                        </div>
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none'>Affiliate</Link>
                        </div>
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none'>Investors</Link>
                        </div>

                    </div>
                    <div className="col-sm-3">
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none' to="/terms">Terms & Conditions</Link>
                        </div>
                        <div className='m-2'>
                            <Link className='text-light text-decoration-none'>Privacy policy</Link>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer