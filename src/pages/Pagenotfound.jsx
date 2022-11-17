import React from 'react'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row pt-5">
                    <div className="col-sm-6 ms-auto me-auto mt-5 text-center">

                        <img src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?w=740&t=st=1666012314~exp=1666012914~hmac=f5652d72fd810b6bba286b6e5be0ffe93f41d85eacbc8f120cba94eff1c3270f" height={300} alt="" />
                        <div className="text-center mt-4">
                            <Link to="/">
                                <button className='btn btn text-light btn-block mb-2' style={{ borderRadius: "0px", backgroundColor: "#5E17EB", fontSize: "15px" }}><i class="fa fa-arrow-left"></i>  &nbsp;Back To Homepage</button>
                            </Link></div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Pagenotfound