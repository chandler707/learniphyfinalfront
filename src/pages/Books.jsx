import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/navbar.css";
import { get_product } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import HashLoader from "react-spinners/HashLoader";
import ReactPaginate from "react-paginate";
import { addToCart } from "../Redux/shopping/shopping-action";
import { useSelector, useDispatch } from "react-redux";

const Books = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  const dispatch = useDispatch();
  let pagesize = 8;

  useEffect(() => {
    Get_product();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [currentpage]);
  const Get_product = async () => {
    let res = await get_product({
      app_id: app_id,
      page: currentpage,
      pagesize: pagesize,
      is_all: true,
    });

    setProduct(res.data);

    setDataCount(res.count);
    let pageCount1 = Math.ceil(res.count / pagesize);

    setPageCount(pageCount1);
  };

  const onPageSubmit = (value) => {
    setCurrentPage(value.selected + 1);

    console.log("value", value.selected + 1);
  };

  const handleAddToCart = (e, item) => {
    // here, we cannot directly pass the `props` as it is, if we need to access the same value within the child component. So, we've to pass it as a different prop like this- `{...props}`
    // console.log("this is item", item);
    // addItem(item);
    // setIsAdded(true);
    dispatch(addToCart(item));
  };
  return (
    <>
      <Navbar />
      <div className="heading text-center">
        <h4 className=" mt-5 mb-5">Books</h4>
        <Link className="text-decoration-none text-muted fw-bold" to="/">
          Home
        </Link>
        &nbsp;<i class="fa-solid fa-angle-right text-muted"></i>&nbsp;
        <span className="text-decoration-none text-muted ">Books</span>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-sm-3">
            <div className="row mb-5 ">
              <div className="col-sm-10 p-2">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to=""
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Sort by{" "}
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Most Popular &nbsp;
                      <i
                        class="fa-solid fa-right-long"
                        style={{ color: "#f1f1f1" }}
                      ></i>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Highest Rated &nbsp;
                      <i
                        class="fa-solid fa-right-long"
                        style={{ color: "#f1f1f1" }}
                      ></i>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Newest &nbsp;
                      <i
                        class="fa-solid fa-right-long"
                        style={{ color: "#f1f1f1" }}
                      ></i>
                    </Link>
                  </div>
                </li>
              </div>
              <div className="col-sm-10 p-2 ">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to=""
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Ratings
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      {" "}
                      <span className="text-warning">
                        4.7 &nbsp;<i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <i class="fa-regular fa-star"></i> (10,000)
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      {" "}
                      <span className="text-warning">
                        4.7 &nbsp;<i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <i class="fa-regular fa-star"></i> (10,000)
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      {" "}
                      <span className="text-warning">
                        4.7 &nbsp;<i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <i class="fa-regular fa-star"></i> (10,000)
                    </Link>
                  </div>
                </li>
              </div>
              <div className="col-sm-10 p-2 ">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to="/"
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Video Duration{" "}
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      0-1 Hour <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      0-1 Hour <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      0-1 Hour <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      0-1 Hour <span>(2,114)</span>
                    </Link>
                  </div>
                </li>
              </div>
              <div className="col-sm-10 p-2">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to=""
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Topic
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Python <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Javascript <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Java <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Ios Development<span>(2,114)</span>
                    </Link>
                  </div>
                </li>
              </div>
              <div className="col-sm-10 p-2">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to=""
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Price
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Paid <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Free <span>(2,114)</span>
                    </Link>
                  </div>
                </li>
              </div>
              <div className="col-sm-10 p-2">
                <li className="nav-item dropdown d-flex">
                  <Link
                    className="nav-link text-dark dropbtn fw-bold"
                    to=""
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      fontFamily: "segoe ui symbol",
                    }}
                  >
                    Features
                  </Link>
                  <i class="fa-solid fa-plus ms-auto mt-2"></i>
                  <div class="dropdown-content">
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Subtitles <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Quizzes <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Coding Exercises <span>(2,114)</span>
                    </Link>
                    <Link style={{ fontWeight: "500", fontSize: "14px" }}>
                      Practice Tests <span>(2,114)</span>
                    </Link>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row ">
              {/* <div className="col-sm-3 mb-3">
                                <select class="form-select" aria-label="Default select example" style={{ borderRadius: "0px", border: "1px solid lightgrey" }}>
                                    <option value="">Default</option>
                                    <option value="1">Low To High</option>
                                    <option value="2">High To Low</option>

                                </select>
                            </div> */}
              {/* <div className="col-sm-9 text-right">
                                <p className='fw-bold text-muted mt-2' style={{
                                    fontFamily: "segoe ui symbol", fontSize: "14px"
                                }}>Showing  of 144 result</p>
                            </div> */}

              <div className="row">
                {product && product.length > 0 ? (
                  product.map((ele, index) => {
                    return (
                      <div key={index} className="col-sm-3">
                        <div className="card border-0 shadow mb-3">
                          <Link to="">
                            <div className="image-section">
                              <img
                                src={ele?.image[0]}
                                className="w-100"
                                height={200}
                                alt=""
                              />
                            </div>
                          </Link>
                          <div className="content p-2">
                            <h6
                              className="mt-2 mb-0 fw-bold"
                              style={{
                                fontFamily: "segoe ui symbol",
                                textOverflow: "ellipsis ",
                                // maxWidth: "600px",
                                whiteSpace: "nowrap ",
                                overflow: "hidden  ",
                              }}
                            >
                              {ele?.name}
                            </h6>
                            <p
                              className="m-0 text-muted"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              Avinash Jain, The Codex
                            </p>
                            <h6 className="mt-2">{ele?.mrp} </h6>

                            <button
                              className="btn w-100 mb-2 fw-bold text-light p-2 "
                              style={{
                                borderRadius: "0px",
                                backgroundColor: "#640513",
                              }}
                              onClick={(e) => handleAddToCart(e, ele)}
                            >
                              Add To Cart
                            </button>

                            <Link to={`/singleproduct/${ele._id}`}>
                              <button
                                className="btn w-100 mt-1 mb-2 text-dark fw-bold p-2"
                                style={{
                                  borderRadius: "0px",
                                  border: "1px solid black",
                                }}
                              >
                                Buy Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", color: "black" }}>
                    <div className="pt-5 ">
                      <HashLoader
                        className="ms-auto me-auto mt-5"
                        size={45}
                        color="#640513"
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "segoe ui symbol",
                      }}
                      className="mt-2 fw-bold"
                    >
                      Please Wait
                    </p>
                  </div>
                )}

                {/* pagination */}

                <div
                  className="py-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "50px",
                    borderRadius: "20px",
                  }}
                >
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<i class="fa-solid fa-arrow-right"></i>}
                    onPageChange={onPageSubmit}
                    pageRangeDisplayed={8}
                    pageCount={pageCount ? pageCount : 1}
                    previousLabel={<i class="fa-solid fa-arrow-left"></i>}
                    pageClassName="page-item"
                    pageLinkClassName="page-link  shadow p-2 px-4 border-0 m-2"
                    previousClassName="page-item "
                    previousLinkClassName="page-link  text-dark shadow p-2 px-4 border-0 m-2 border-rounded-circle"
                    nextClassName="page-item "
                    nextLinkClassName="page-link   text-dark shadow p-2 px-4 border-0 m-2 "
                    breakClassName="page-item p-3"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Books;
