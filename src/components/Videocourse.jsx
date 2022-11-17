import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { GetVideoes } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';


const Videocourse = () => {
    const [videoList, setVideoList] = useState([])
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

    useEffect(() => {
        const getVideoes = async () => {
            let res = await GetVideoes({ app_id: app_id, page: 1, pagesize: 4 })
            if (res && res?.status === 1) {
                setVideoList(res?.data)
            }
        }
        getVideoes()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <h4 className='  mt-5 fw-bold' style={{
                        fontFamily: "segoe ui symbol"
                    }}>Online Recorded Course 2023</h4>

                    <div className="row mt-5">
                        <Slider {...settings}>
                            {videoList && videoList.length > 0 ?
                                videoList.map((ele, index) => {
                                    return <div>
                                        <div className="col-sm-11">
                                            <div className="card border-0 bg-light shadow-sm mb-3">
                                                <Link to="">
                                                    <div className="image-section " >
                                                        <img src={ele?.thumbnail_url} alt="" className='w-100' height={185} />
                                                    </div>



                                                </Link>
                                                <div className="content ms-2">
                                                    <h6 className='mt-2 mb-0 fw-bold' style={{
                                                        fontFamily: "segoe ui symbol"
                                                    }}>{ele?.name}</h6>
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
                                }) : ""
                            }







                        </Slider>








                    </div>
                </div >
            </div >
        </>
    )
}

export default Videocourse