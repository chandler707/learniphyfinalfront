import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import { get_paper } from '../Repository/UserRepository'
import { getExamcategory } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';


const Toptestseries = () => {

    const [catList, setCatList] = useState([])
    useEffect(() => {
        const GetCategory = async () => {
            let res = await getExamcategory({ app_id: app_id, page: 1, pagesize: 4 })
            if (res && res?.status === 1) {
                setCatList(res?.data)
            }
        }
        GetCategory()
    }, [])

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
                <div className="row pt-4">
                    <h4 className=' mt-5 fw-bold' style={{
                        fontFamily: "segoe ui symbol"
                    }}>Online Test Series</h4>
                    <div className="row mt-5">

                        {catList && catList.length > 0 ?
                            catList.map((ele, index) => {
                                return <div className='col-sm-3' key={index}>
                                    <div className="col-sm-12" >
                                        <div className="card border-0 bg-light shadow-sm  mb-3">
                                            <a href="https://play.google.com/store/games">
                                                <div className="image-section">
                                                    <img src={ele?.image} className='w-100' height={185} alt="" />
                                                </div>
                                            </a>
                                            <div className="content ms-2">
                                                <h6 className='mt-2 mb-0 fw-bold' style={{
                                                    fontFamily: "segoe ui symbol"
                                                }}>{ele?.name}</h6>
                                                <a href="https://play.google.com/store/games">
                                                    <button className='btn btn text-dark w-100 mb-2 mt-2 p-2 mt-3 fw-bold' style={{ borderRadius: "0px", border: "1px solid black", fontSize: "13px" }}><i class="fa-solid fa-eye"></i>  &nbsp;View More</button>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Toptestseries