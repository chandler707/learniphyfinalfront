import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { get_category } from "../Repository/UserRepository";
import { Link } from 'react-router-dom';
import { app_id } from '../Repository/Repository';

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  let pagesize = 8;

  useEffect(() => {
    Get_category();


  }, []);

  const Get_category = async () => {
    let res = await get_category({ is_all: true, app_id: app_id });
    setCategoryList(res.data);

  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <h4 className='text-center fw-bold mt-5 p-5' style={{
            fontFamily: "segoe ui symbol"
          }}>All Category</h4>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {
            categoryList.map((ele, index) => {
              return (

                <div className="col-sm-3 mb-4" style={{ color: "black " }}>
                  <div className="course-card col-sm-12">
                    <Link to={`/subcategory/${ele._id}`} className='text-decoration-none'>
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

export default Category