import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import "./navbar.css";
import cartContext from "../context/cartContext";
import { get_product } from "../Repository/UserRepository";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { removeFromCart } from "../Redux/shopping/shopping-action";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import profile from "../images/profile.gif"
import Menu from "@mui/material/Menu";
import Button from '@mui/material/Button';
import AOS from "aos";
import "aos/dist/aos.css";
import Avatar from '@mui/material/Avatar';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState(``);
  const [list, setList] = useState([
    'Go to the store',
    'Wash the dishes',
    'Learn some code',
  ]);
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

    console.log(Remove_cart)
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

    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm  sticky-top" data-aos={"fade-down"}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand " to="/">
            {" "}
            <img src={logo} alt="" height={70} />{" "}
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
          <button class="btn border-0 hamburger fs-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-sharp fa-solid fa-bars-staggered"></i></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-lg-0  me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link  text-dark fw-bold"
                  aria-current="page"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropbtn fw-bold"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Ldca Dop Exam
                </Link>
                <div class="dropdown-content">
                  <Link
                    to="/notification"
                    className="fw-bold"
                    style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                  >
                    Notifications &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Result &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Answer Key &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                  className="nav-link text-dark dropbtn fw-bold"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Useful For Postel
                </Link>
                <div class="dropdown-content">
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Forms &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Important Rules &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                  className="nav-link text-dark dropbtn fw-bold"
                  to="/"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Amedments
                </Link>
                <div class="dropdown-content">
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Latest Rules &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                    Orders &nbsp;
                    <i
                      class="fa-solid fa-right-long"
                      style={{ color: "#f1f1f1" }}
                    ></i>
                  </Link>
                  <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                  className="nav-link text-dark dropbtn fw-bold"
                  to="/feedback"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-bold"
                  to="/contact"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  {" "}
                  Contact us
                </Link>
              </li>
              <section className='section'>
                <input
                  type='text'
                  className='input'
                  onChange={e => setSearch(e.target.value)}
                  placeholder='Search...'
                />
                <ul>
                  {list
                    .filter(li => li.toLowerCase().includes(search.toLowerCase()))
                    .map((item, key) => (
                      <li key={key}>
                        {item}{' '}
                        <span className='delete' onClick={() => handleDelete(item)} />
                      </li>
                    ))}
                </ul>
              </section>
            </ul>
            {isLoggedIn ? (
              <div className="d-flex">
                {/* <NavLink to="/profile">
                  <button className='btn btn-dark text-light'>account</button>
                </NavLink>
                 */}
                <Link to="">
                  {/* <img
                    src={profile}

                  /> */}
                  <Avatar alt="Remy Sharp" className="mb-0 mt-3  "
                    height={38}

                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick} />
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
                    <Link to="/profile" className="text-dark text-decoration-none">
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
                    style={{ fontWeight: "500", fontSize: "13px" }}
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
                  className="text-decoration-none mt-0 text-dark fw-bold"
                  style={{ fontWeight: "500", fontSize: "14px" }}
                >
                  <i className="fa-solid fa-right-to-bracket fw-bold"></i>
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
                      <h6 className="fw-bold">{ }</h6>
                    </div>
                  ) : (
                    cartData?.cart?.map((item) => {
                      const { id, thumbnail_image, name, price_without_tax, qty } = item;
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
                            <p className=" text-center fw-bold mt-2 mb-0" style={{ textTransform: "capitalize" }}>{name}</p>
                            <p></p>

                          </figure>
                          <div className="cart_items_info ">
                            <div className=" foot mt-3 w-100">
                              {/* <Button /> */}
                              <h5 className="price fw-bold w-100 " style={{ marginTop: "-20px", fontFamily: "segoe ui symbol" }}>
                                ₹ {itemTotal.toLocaleString()}
                                <button
                                  type="button"
                                  className=" cart-checkout btn mb-4 fw-bolder text-dark mt-3  " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove Cart"
                                  onClick={(e) => Remove_cart(item.id)}
                                  style={{ borderRadius: "0px", backgroundColor: "lightgrey", marginLeft: "255px" }}
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



      <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header bg-light">
          <h6 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"><Link className="navbar-brand " to="/">
            {" "}
            <img src={logo} alt="" height={50} />{" "}
          </Link>Dobwal Classes</h6>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul className="navbar-nav text-center mt-3">
            <li className="nav-item">
              <Link
                className="nav-link  text-dark fw-bold"
                aria-current="page"
                to="/"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link text-dark dropbtn fw-bold"
                to="/"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                Ldca Dop Exam
              </Link>
              <div class="dropdown-content">
                <Link
                  to="/notification"
                  className="fw-bold"
                  style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
                >
                  Notifications &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Result &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Answer Key &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                className="nav-link text-dark dropbtn fw-bold"
                to="/"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                Useful For Postel
              </Link>
              <div class="dropdown-content">
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Forms &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Important Rules &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                className="nav-link text-dark dropbtn fw-bold"
                to="/"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                Amedments
              </Link>
              <div class="dropdown-content">
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Latest Rules &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
                  Orders &nbsp;
                  <i
                    class="fa-solid fa-right-long"
                    style={{ color: "#f1f1f1" }}
                  ></i>
                </Link>
                <Link to="/" className="fw-bold" style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}>
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
                className="nav-link text-dark dropbtn fw-bold"
                to="/feedback"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-dark fw-bold"
                to="/contact"
                style={{ fontWeight: "500", fontSize: "14px", fontFamily: "segoe ui symbol" }}
              >
                {" "}
                Contact us
              </Link>
            </li>
            <li className=" mt-5 d-flex">
              <input
                type="search"
                className="form-control  bg-light search "
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
            <div className="text-center">
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
                  <Link to="/profile" className="text-dark text-decoration-none">
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
            <div className="text-center p-0 hstack   gap-3 text-center " style={{ marginTop: '150px' }}>
              <Button variant="contained" className="w-50 p-2" style={{ backgroundColor: "#640513" }}>
                <Link to="/login" className="text-decoration-none text-light  w-50">
                  Login
                </Link>
              </Button>
              <Button variant="contained" className="w-50 p-2 bg-dark">
                <Link to="/signup" className="text-decoration-none text-light w-50">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
