import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import "./navbar.css";
import cartContext from "../context/cartContext";
import { get_product } from "../Repository/UserRepository";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";
import { removeFromCart } from "../Redux/shopping/shopping-action";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import profile from "../images/profile.gif";
import Menu from "@mui/material/Menu";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cartData = useSelector((state) => state.shopReducer);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const Remove_cart = (e, item) => {
    // e.preventDefault();

    console.log("this is item", item);
    dispatch(removeFromCart(item));
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    // console.log(id)
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm  sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand " to="/">
            {" "}
            <img src={logo} alt="" height={80} />{" "}
          </Link>
          <div className="text-center p-0 ms-3 ">
            <Link
              to="/cart"
              className="text-decoration-none mt-0 text-dark position-relative mobile-cart-link"
              style={{ fontWeight: "500", fontSize: "18px", display: "none" }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i class="fa fa-shopping-cart p-1"></i>
              <br></br>{" "}
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark">
                {cartData?.cart?.length}
                <span class="visually-hidden">unread messages</span>
              </span>
            </Link>
          </div>
          <button
            className="navbar-toggler border-0 mt-"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars fs-1 text-dark "></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-lg-0  me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link  text-dark"
                  aria-current="page"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropbtn"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Ldca Dop Exam
                </Link>
                <div class="dropdown-content">
                  <Link
                    to="/notification"
                    style={{ fontWeight: "500", fontSize: "14px" }}
                  >
                    Notifications &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Result &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Answer Key &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Exam Calender &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropbtn"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Useful For Postel
                </Link>
                <div class="dropdown-content">
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Forms &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Important Rules &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Study Material &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropbtn"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Amedments
                </Link>
                <div class="dropdown-content">
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Latest Rules &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Orders &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" style={{ fontWeight: "500", fontSize: "14px" }}>
                    Circular &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-dark dropbtn"
                  to="/feedback"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-dark"
                  to="/contact"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  {" "}
                  Contact us
                </Link>
              </li>
              <li className="ms-4 d-flex">
                <input
                  type="search"
                  className="form-control border-0 bg-light search"
                  placeholder="Search for Books, Test series and more"
                  style={{
                    position: "relative",
                    borderRadius: "0px",
                    width: "500px",
                  }}
                />
              </li>
            </ul>
            {isLoggedIn ? (
              <div className="d-flex">
                {/* <NavLink to="/profile">
                  <button className='btn btn-dark text-light'>account</button>
                </NavLink>
                 */}
                <Link to="">
                  <img
                    src={profile}
                    className="mb-0 mt-3  "
                    height={38}
                    alt=""
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Link>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    {" "}
                    <Link
                      to="/profile"
                      className="text-dark text-decoration-none"
                    >
                      {" "}
                      Profile{" "}
                    </Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}{" "}
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
                <div className=" desktop-cart-link text-center p-0 ms-3 mt-3">
                  <Link
                    to=" "
                    className="text-decoration-none  text-dark position-relative  mt-5"
                    style={{ fontWeight: "500", fontSize: "17px" }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <i class="fa fa-bag-shopping"></i>
                    <br></br>Cart{" "}
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark">
                      {cartData?.cart?.length}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center p-0">
                <Link
                  to="/login"
                  className="text-decoration-none mt-0 text-dark"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <br></br>Login/Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header shadow-sm">
          <h6
            class="offcanvas-title fw-bold"
            id="offcanvasRightLabel"
            style={{
              fontFamily: "segoe ui symbol",
            }}
          >
            Shopping Cart ({cartData?.cart?.length})
          </h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body p-0">
          {
            <div id="cart">
              <div className="cart_content">
                <div className="cart_head"></div>

                <div className="cart_body">
                  {cartData?.cart?.length < 1 ? (
                    <div
                      className="mt-5 pt-5"
                      style={{
                        textAlign: "center",
                        fontFamily: "segoe ui symbol",
                      }}
                    >
                      <img
                        src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg?w=740&t=st=1667813839~exp=1667814439~hmac=8a3f9d62e3fc2ef2e5f2e80da6ddce45dcefeca970b25ee888c40855cece48ab"
                        height={200}
                      />
                      <h6 className="fw-bold">{}</h6>
                    </div>
                  ) : (
                    cartData?.cart?.map((item) => {
                      const {
                        id,
                        thumbnail_image,
                        name,
                        price_without_tax,
                        qty,
                      } = item;
                      const itemTotal = price_without_tax * qty;

                      return (
                        <div className="cart_items mt-5 shadow-sm p-3" key={id}>
                          <figure className="cart_items_img mb-0 text-center ">
                            <img
                              src={thumbnail_image}
                              alt="product-img"
                              height={"150px"}
                              className="w-100"
                            />
                            <p
                              className=" text-center fw-bold mt-2 mb-0"
                              style={{ textTransform: "capitalize" }}
                            >
                              {name}
                            </p>
                            <p></p>
                          </figure>
                          <div className="cart_items_info ">
                            <div className=" foot mt-3 w-100">
                              {/* <Button /> */}
                              <h5
                                className="price fw-bold w-100 "
                                style={{
                                  marginTop: "-20px",
                                  fontFamily: "segoe ui symbol",
                                }}
                              >
                                ₹ {itemTotal.toLocaleString()}
                                <button
                                  type="button"
                                  className=" cart-checkout btn mb-4 fw-bolder text-dark mt-3  "
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title="Remove Cart"
                                  onClick={(e) => Remove_cart(e, item._id)}
                                  style={{
                                    borderRadius: "0px",
                                    backgroundColor: "lightgrey",
                                    marginLeft: "255px",
                                  }}
                                >
                                  <i class="fa-solid fa-xmark"></i>
                                </button>
                              </h5>
                            </div>
                            {/* <div className="cart_items_quantity">
                            <span onClick={() => decrementItem(id)}>
                              &#8722;
                            </span>
                            <b>{item?.quantity}</b>
                            <span onClick={() => incrementItem(id)}>&#43;</span>
                          </div> */}

                            {/* <Link
                            title="Remove Item"
                            className=" text-decoration-none text-dark"
                            style={{ textAlign: "right" }}
                            onClick={(e) => Remove_cart(item.id)}
                          >
                            <span>&times;</span>
                          </Link> */}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <Link to={`/billing/new`}>
                  <button
                    type="button"
                    disabled={cartData?.cart?.length === 0}
                    className=" cart-checkout btn w-100 mb-2 fw-bold text-light p-2 mt-5"
                    style={{ borderRadius: "0px", backgroundColor: "#640513" }}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
