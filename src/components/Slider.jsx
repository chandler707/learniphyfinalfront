import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css";
import  online  from "../images/learning.gif"

const Slider = () => {
  return (
    <>
      <div id="carouselExampleFade" class="carousel slide carousel-fade mt-5" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div className="row ">
              <div className="col-sm-6 text-center">
                <img src={online} height={400} alt="" />
              </div>
              <div className="col-sm-6 mt-5 content-part">
                <div className="col-sm-7 mt-5 shadow px-4 py-3" style={{
                  fontFamily: "segoe ui symbol"
                }}>
                  <h3 className='fw-bold'>New to Dobwal Classes? Lucky you.</h3>
                  <p>Courses start at ₹449. Get your new-student offer before it expires.</p>
                  <Link to="/signup"> <button className='btn text-light' style={{ borderRadius: "0px", backgroundColor: "#640513" }}>Sign Up</button></Link>
                </div>

              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div className="row">
              <div className="col-sm-6 text-center">
                <img src="https://img.freepik.com/free-vector/audiobook-concept-illustration_114360-6994.jpg?w=360&t=st=1665388568~exp=1665389168~hmac=f33022d6eb3e78892d153be714e0571f84399d0b1cfbecd88ccb6a730542f69d" height={400} alt="" />
              </div>
              <div className="col-sm-6 mt-5 content-part">
                <div className="col-sm-7 mt-5 shadow px-4 py-3" style={{
                  fontFamily: "segoe ui symbol"
                }}>
                  <h3 className='fw-bold'>Transform your life through education.</h3>
                  <p>Courses start at ₹449. Get your new-student offer before it expires.</p>
                  <Link to="/signup"> <button className='btn text-light' style={{ borderRadius: "0px", backgroundColor: "#640513" }}>Sign Up</button></Link>
                </div>

              </div>
            </div>
          </div>
          {/* <div class="carousel-item">
            <div className="row">
              <div className="col-sm-6 text-center">
                <img src="" height={400} alt="" />
              </div>
              <div className="col-sm-6 mt-5">
                <div className="col-sm-7 mt-5 shadow px-4 py-3" style={{
                  fontFamily: "SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol"
                }}>
                  <h3 className=''>New to Ebook Store? Lucky you.</h3>
                  <p>Courses start at ₹449. Get your new-student offer before it expires.</p>
                  <Link to="/signup"> <button className='btn text-light' style={{ borderRadius: "0px", backgroundColor: "#5E17EB" }}>Sign Up</button></Link>
                </div>

              </div>
            </div>
          </div> */}
        </div>
        <button class="carousel-control-prev bg-dark ms-2 " style={{ height: "50px", width: "50px", borderRadius: "50%", marginTop: "150px" }} type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next bg-dark me-2" style={{ height: "50px", width: "50px", borderRadius: "50%", marginTop: "150px" }} type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

export default Slider