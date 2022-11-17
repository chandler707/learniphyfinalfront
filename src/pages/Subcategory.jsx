import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import { get_subcategory } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Subcategory = () => {

    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        let id = window.location.pathname.split("/").pop();

        Get_subcategory(id);

    }, []);
    const Get_subcategory = async (id) => {
        let res = await get_subcategory({ app_id: app_id, cat_id: id });
        setSubCategory(res.data);
        console.log("this is res", res)

    };


    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <h4 className='text-center fw-bold mt-5 p-5' style={{
                        fontFamily: "segoe ui symbol"
                    }}>Sub Category</h4>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {
                        subCategory.map((ele, index) => {
                            return (

                                <div className="col-sm-3 mb-4" style={{ color: "black " }}>
                                    <div className="course-card col-sm-12">
                                        <Link to={`/books/${ele._id}`} className='text-decoration-none'>
                                            <Card
                                                className="shadow border-0 text-center"
                                                style={{ height: "300px" }}
                                            >
                                                <CardActionArea>

                                                    
                                                    <img src={ele?.image} height="200" alt="" />
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            <br></br>
                                                            <small
                                                                className="text-center mt-5 text-dark text-center"
                                                                style={{ fontSize: "15px" }}
                                                            >
                                                                {" "}
                                                                {ele?.name}
                                                            </small>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Subcategory