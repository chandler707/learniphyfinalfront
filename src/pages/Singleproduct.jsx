import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { get_product } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/shopping/shopping-action";
import { useSelector, useDispatch } from "react-redux";

// import { Link } from 'react-router-dom';
const Singleproduct = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let id = window.location.pathname.split("/").pop();

    Get_product(id);

    window.scrollTo(0, 0);
  }, []);

  const Get_product = async (id) => {
    let res = await get_product({ app_id: app_id, product_id: id });
    setProduct(res.data);
    console.log("this is res", res);
  };
  const handleAddToCart = (e, item) => {
    dispatch(addToCart(item));
  };
  return (
    <>
      <Navbar />
      <div
        className="container-fluid product-content"
        style={{
          backgroundImage: `url(${product?.image})`,
          height: "300px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <div
          className="row p-5"
          style={{ backgroundColor: "rgba(0,0,0,0.8)", height: "300px" }}
        >
          <div className="col-sm-6">
            <Link
              to="/"
              className="text-decoration-none text-light"
              style={{ fontSize: "12px" }}
            >
              Home
            </Link>
            &nbsp;&nbsp;
            <i
              class="fa-solid fa-chevron-right text-light"
              style={{ fontSize: "12px" }}
            ></i>
            &nbsp;&nbsp;
            <span
              className="text-decoration-none text-light"
              style={{ fontSize: "12px" }}
            >
              {product?.name}
            </span>
            <h3
              className="text-white mt-3"
              style={{
                fontFamily: "segoe ui symbol",
                fontWeight: "bolder",
              }}
            >
              {product?.name}
            </h3>
            <p
              className="mb-1 text-light"
              style={{
                fontFamily: "segoe ui symbol",
              }}
            >
              {product?.name}
            </p>
            <p class="card-text" style={{ color: "" }}>
              <small class="text-muted" style={{ color: "" }}>
                Updated at: {product?.createdAt}
              </small>
            </p>
          </div>
          <div className="col-sm-6 ">
            <div
              className=" col-sm-6  image-section bg-light shadow "
              style={{ marginLeft: "150px" }}
            >
              <img src={product?.image} className="w-100" height={180} alt="" />
              <div className="p-2">
                <span
                  style={{
                    fontFamily: "segoe ui symbol",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  ₹
                  {(parseFloat(product?.mrp) *
                    (100 - parseFloat(product?.discount))) /
                    100}
                </span>
                &nbsp;
                <span
                  className="text-danger"
                  style={{
                    fontFamily: "segoe ui symbol",
                    fontWeight: "bolder",
                    fontSize: "13px",
                  }}
                >
                  ₹<del>{product?.mrp}</del>
                </span>
                <br></br>
                {/* <p  style={{
                  fontFamily: "segoe ui symbol", fontWeight: "bolder"
                }}>{product?.discount}%off</p> */}
                <p
                  className="mt-3 mb-2 text-muted"
                  style={{
                    fontFamily: "segoe ui symbol",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <i class="fa-solid fa-arrow-trend-up"></i> In Stock :{" "}
                  {product?.stock}
                </p>
                <p
                  className="mb-2 text-success"
                  style={{
                    fontFamily: "segoe ui symbol",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <i class="fa-solid fa-percent text-dark"></i>&nbsp; Discount:{" "}
                  {product?.discount}%Off
                </p>
                {/* <p className='text-muted' style={{
                  fontFamily: "segoe ui symbol", fontWeight: "bold", fontSize: "14px"
                }}><i class="fa fa-money-bills"></i> Price Without Tax {product?.price_without_tax}</p> */}
                <button
                  className="btn w-100 mb-2 fw-bold text-light p-2"
                  style={{ borderRadius: "0px", backgroundColor: "#640513" }}
                >
                  Add To Cart
                </button>
                <Link to={`/billing/new`}>
                  <button
                    className="btn w-100 mt-1 fw-bold p-2"
                    style={{ borderRadius: "0px", border: "1px solid black" }}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-2 description-container">
        <div className="row">
          <div className="col-sm-7 ">
            <h5
              className="text-dark description-heading"
              style={{
                textAlign: "justify",
                fontFamily: "segoe ui symbol",
                fontWeight: "bold",
              }}
            >
              Description
            </h5>
            <p
              className="text-muted"
              style={{
                fontSize: "14px",
                textAlign: "justify",
                fontFamily: "segoe ui symbol",
                fontWeight: "bold",
              }}
            >
              {product?.description}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Singleproduct;
