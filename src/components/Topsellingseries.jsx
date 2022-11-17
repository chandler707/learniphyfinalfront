import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";


const Topsellingseries = () => {
    var settings = {
        dots: true,
        // infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    cssEase: "linear",

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    cssEase: "linear",

                }
            }
        ]
    };
    return (
        <>
            <div className="container mt-5 mb-3">
                <div className="row">
                    <h4 className=' mt-5 fw-bold' style={{
                        fontFamily: "segoe ui symbol"
                    }}>Live Classes</h4>
                    <div className="row mt-5">
                        <Slider {...settings}>
                            <div className=''>
                                <div className="col-sm-11  text-center" >
                                    <div className="card live-classes border-0 bg-light shadow-sm mb-3">
                                        <Link to="/">
                                            <div className="image-section">
                                                <img src="https://1.bp.blogspot.com/-Mt1yr_XSJTo/YM5G6xWut_I/AAAAAAAAcYk/q9thLPMyAx4vu5xBevIR_jPrfGNSkrWgACLcBGAsYHQ/s1280/WhatsApp%2BImage%2B2021-06-19%2Bat%2B00.19.02.webp" className='w-100' height={185} alt="" />
                                            </div>
                                        </Link>
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol"
                                            }}>Ldce Ps Group "B" Exam 2023</h6>
                                            {/* <p className='m-0 text-muted' style={{
                                                fontSize: "13px"
                                            }}>Avinash Jain, The Codex</p>
                                            <h6 className='mt-2'>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6> */}
                                            <a href="https://play.google.com/store/games">
                                                <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-11">
                                    <div className="card live-classes border-0 bg-light shadow-sm  mb-3">
                                        <Link to="/">
                                            <div className="image-section">
                                                <img src="https://assets.thehansindia.com/h-upload/2022/06/21/1298918-scr.jpg" height={185} className='w-100' alt="" />
                                            </div>
                                        </Link>
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol", textOverflow: "ellipsis ",
                                                // maxWidth: "600px",
                                                whiteSpace: "nowrap ",
                                                overflow: "hidden  "
                                            }}>Ldca Ipo Exam 2023</h6>
                                            {/* <p className='m-0 text-muted' style={{
                                                fontSize: "13px"
                                            }}>Avinash Jain, The Codex</p>
                                            <h6 className='mt-2'>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6> */}
                                            <a href="https://play.google.com/store/games">
                                                <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-11">
                                    <div className="card live-classes border-0 bg-light shadow-sm  mb-3">
                                        <Link to="/">
                                            <div className="image-section">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAleZVWySyFQfMYIGcd9vcRnECNXznyE-jOw&usqp=CAU" height={185} className='w-100' alt="" />
                                            </div>
                                        </Link>
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol", textOverflow: "ellipsis ",
                                                // maxWidth: "600px",
                                                whiteSpace: "nowrap ",
                                                overflow: "hidden  "
                                            }}>Ldca Pa / Sa / Lgo Exam 2023</h6>
                                            {/* <p className='m-0 text-muted' style={{
                                                fontSize: "13px"
                                            }}>Avinash Jain, The Codex</p>
                                            <h6 className='mt-2'>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6> */}
                                            <a href="https://play.google.com/store/games">
                                                <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-11">
                                    <div className="card live-classes border-0  bg-light shadow-sm mb-3">
                                        <Link to="/">
                                            <div className="image-section">
                                                <img src="https://informativeinstitute.com/wp-content/uploads/2021/03/GDS-to-postman-syllabus-aaa.jpg" height={185} className='w-100' alt="" />
                                            </div>
                                        </Link>
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol", textOverflow: "ellipsis ",
                                                // maxWidth: "600px",
                                                whiteSpace: "nowrap ",
                                                overflow: "hidden  "
                                            }}>Ldce Postman / Mg / Mts Commom Exam 2023</h6>
                                            {/* <p className='m-0 text-muted' style={{
                                                fontSize: "13px"
                                            }}>Avinash Jain, The Codex</p>
                                            <h6 className='mt-2'>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6> */}
                                            <a href="https://play.google.com/store/games">
                                                <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-11">
                                    <div className="card live-classes border-0 bg-light shadow-sm mb-3">
                                        <Link to="/">
                                            <div className="image-section">
                                                <img src="https://qph.cf2.quoracdn.net/main-qimg-433ab15948bde6293ff1b425cc15e30d-pjlq" className='w-100' height={185} alt="" />
                                            </div>
                                        </Link>
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol", textOverflow: "ellipsis ",
                                                // maxWidth: "600px",
                                                whiteSpace: "nowrap ",
                                                overflow: "hidden  "
                                            }}>Ldce Accountant Exam 2023</h6>
                                            {/* <p className='m-0 text-muted' style={{
                                                fontSize: "13px"
                                            }}>Avinash Jain, The Codex</p>
                                            <h6 className='mt-2'>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6> */}
                                            <a href="https://play.google.com/store/games">
                                                <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Slider>





                    </div>
                </div>
            </div>
        </>
    )
}

export default Topsellingseries