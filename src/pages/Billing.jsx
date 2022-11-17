import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  get_product,
  get_city,
  get_state,
  Get_address,
  updateAddress,
  placeOrder,
  razorPaypayment,
  GetSetting,
  veryfyPayment,
} from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import swal from 'sweetalert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Billing = () => {
  const cartData = useSelector((state) => state.shopReducer);
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState({});
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState("");
  const [addressData, setAddressData] = useState({});
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("message");
  const [cityListShip, setCityListShip] = useState([]);
  const [cityListBill, setCityListBill] = useState([]);
  const [cod, setCod] = useState(false);
  const [razorpay, setRazorpay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    let finalAmount = 0;
    if (paymentMethod !== "cod") {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      const result = await razorPaypayment({
        app_id: app_id,
        final_amount: 200,
        order_data: { ...addressData },
        order_items: cartData,
      });

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      console.log("result data", result.data);
      const { amount, order_id, currency } = result.data;
      console.log("datatattta", amount, currency);

      let setting = await GetSetting({ app_id: app_id });
      if (setting && setting.status !== 1) {
        return;
      }
      const options = {
        key: setting.data.rzp_key_id, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Dobwal classess",
        description: "Test Transaction",

        order_id: order_id,
        handler: async function (response) {
          console.log("resspponsdd", response);
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          console.log("jinisjidhasbjkdb");

          let finalAmount1 = 0;
          let finalAmount12 = 0;
          if (url !== "new") {
            console.log("this is total sdaaaaaaaaaaaaaaf");
            finalAmount =
              (parseFloat(product?.mrp) *
                ((100 - parseFloat(product?.discount)) / 100) *
                (100 + product?.tax)) /
              100;
          } else {
            console.log("this is total", cartData);
            if (cartData.cart.length > 0) {
              cartData.cart.map((ele) => {
                finalAmount =
                  finalAmount +
                  ele.qty *
                  ((parseFloat(ele?.mrp) *
                    ((100 - parseFloat(ele?.discount)) / 100) *
                    (100 + ele?.tax)) /
                    100);
              });
            }
          }

          let result = await placeOrder({
            transaction_status: "success",
            razorpay_order_id: data.razorpayOrderId,
            transaction_type: "ecommerce",
            payment_method: "razorpay",
            payment_id: data.razorpayPaymentId,
            app_id: app_id,
            final_ammount: finalAmount,

            user_id: userId,
            order_data: { ...addressData },
            order_items: cartData,
          });
          console.log("razorpay", result.message);

          // alert(result.message);


          // swal({
          //   title: "Are you sure?",
          //   text: "",
          //   icon: "info",
          //   buttons: true,
          // })
          //   .then((willDelete) => {
          //     if (willDelete) {
          //       swal(result.message, {
          //         icon: "success",
          //       });
          //     } else {
          //       swal(result.message);
          //     }
          //   });


          swal({
            icon: "success",
            text: result.message
          });

          // swal({
          //   title: "Good job!",
          //   text: "You clicked the button!",
          //   icon: "success",
          // });
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "6377879472",
        },
        notes: {},
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      if (url !== "new") {
        console.log("this is total sdaaaaaaaaaaaaaaf");
        finalAmount =
          (parseFloat(product?.mrp) *
            ((100 - parseFloat(product?.discount)) / 100) *
            (100 + product?.tax)) /
          100;
      } else {
        console.log("this is total", cartData);
        if (cartData.cart.length > 0) {
          cartData.cart.map((ele) => {
            finalAmount =
              finalAmount +
              ele.qty *
              ((parseFloat(ele?.mrp) *
                ((100 - parseFloat(ele?.discount)) / 100) *
                (100 + ele?.tax)) /
                100);
          });
        }
      }
      let result = await placeOrder({
        transaction_status: "success",

        transaction_type: "ecommerce",
        payment_method: "cod",

        app_id: app_id,
        final_ammount: finalAmount,

        user_id: userId,
        order_data: { ...addressData },
        order_items: cartData,
      });
      console.log("razorpay", result.message);

      // alert();
      swal({
        title: "Are you sure?",
        text: "We Confirm Your Order",
        icon: "warning",
        // buttons: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal(result.message, {
              icon: "success",
            });
          }
        });
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("data", cartData.cart);
    let id = window.location.pathname.split("/").pop();
    if (id !== "new") {
      Get_product(id);
    } else {
      setUrl("new");
    }

    window.scrollTo(0, 0);
    states();
  }, []);
  const submitCheckout = async () => { };
  useEffect(() => {
    let userId = localStorage.getItem("user_id");

    if (userId) {
      setUserId(userId);
      console.log("running");

      const getAddress = async () => {
        let res = await Get_address({ app_id: app_id, user_id: userId });
        if (res && res.status === 1) {
          setAddressData(res.data);
        }
      };
      getAddress();
    }
  }, []);

  const submitDataAddress = async (e) => {
    e.preventDefault();

    let res = await updateAddress(addressData);
    if (res && res.status === 1) {
      setLoading(false);
      setType("success");
      setMessage(res.message);
      setOpen(true);
    } else {
      setLoading(false);
      setType("error");
      setMessage(res.message);
      setOpen(true);
    }
  };
  const states = async () => {
    let res = await get_state({ is_all: true, app_id: app_id });
    setStateList(res.data);
  };
  const onchangeState = async (e) => {
    console.log(e.target.value);
    setState(e.target.value);
    let res = await get_city({
      is_all: true,
      app_id: app_id,
      state_id: e.target.value,
    });
    if (res.status === 1) {
      setCityList(res.data);
      console.log(res.data);
    }
  };

  const Get_product = async (id) => {
    let res = await get_product({ app_id: app_id, product_id: id });
    setProduct(res.data);
    console.log("this is res", res);
  };

  useEffect(() => {

    let token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="container-fluid ">

        {isLoggedIn ? (
          <div className="row p-3 ">
            <div className="col-sm-8 m-1 bg-white mt-5 p-3 shadow-sm">
              <div class="accordion " id="accordionExample">
                <div class="accordion-item border-0">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button bg-light m-2 shadow-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h6
                        className=""
                        style={{
                          fontFamily: "segoe ui symbol",
                          fontWeight: "bolder",
                        }}
                      >
                        Shipping Address
                      </h6>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form
                        action=""
                        onSubmit={submitDataAddress}
                        className="mt-2"
                      >
                        <div className="row">
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              State
                            </label>
                            <select
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your State "
                              aria-describedby="emailHelp"
                              value={addressData?.shipping_state}
                              style={{ borderRadius: "0px" }}
                              onChange={async (e) => {
                                setAddressData({
                                  ...addressData,
                                  shipping_state: e.target.value,
                                });

                                let res = await get_city({
                                  state_id: e.target.value,
                                  app_id: app_id,
                                });
                                if (res && res.status === 1) {
                                  setCityListShip(res.data);
                                }
                              }}
                              required
                            >
                              <option value="">select state</option>
                              {stateList.length > 0
                                ? stateList.map((ele) => {
                                  return (
                                    <option value={ele._id}>
                                      {ele.state_name}
                                    </option>
                                  );
                                })
                                : ""}
                            </select>
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              City
                            </label>
                            <select
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your City "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  shipping_city: e.target.value,
                                });
                              }}
                              required
                            >
                              <option value="">select city</option>
                              {cityListShip.length > 0
                                ? cityListShip.map((ele) => {
                                  return (
                                    <option value={ele._id}>
                                      {ele.city_name}
                                    </option>
                                  );
                                })
                                : ""}
                            </select>
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                        </div>
                        <div className="row">
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              Pincode
                            </label>
                            <input
                              type="text"
                              defaultValue={
                                addressData ? addressData.shipping_pin_code : ""
                              }
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your Pincode "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  shipping_pin_code: e.target.value,
                                });
                              }}
                              required
                            />
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              Locality/Landmark
                            </label>
                            <input
                              type="text"
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your Locality/Landmark  "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              defaultValue={
                                addressData ? addressData.shipping_landmark : ""
                              }
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  shipping_landmark: e.target.value,
                                });
                              }}
                              required
                            />
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                        </div>
                        <div className="row">
                          <label
                            for="floatingTextarea2"
                            style={{ fontSize: "13px" }}
                            className="text-muted"
                          >
                            Address
                          </label>

                          <div class="form-floating">
                            <textarea
                              class="form-control"
                              defaultValue={
                                addressData ? addressData.shipping_address : ""
                              }
                              placeholder="Leave a comment here"
                              id="floatingTextarea2"
                              style={{ height: "150px", borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  shipping_address: e.target.value,
                                });
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          className="btn mt-4 p-2 text-light "
                          type="submit"
                          style={{
                            backgroundColor: "#640513",
                            borderRadius: "0px",
                            fontSize: "13px",
                          }}
                        >
                          Save & Continue
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="accordion-item border-0">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed bg-light m-2 shadow-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <h6
                        className=""
                        style={{
                          fontFamily: "segoe ui symbol",
                          fontWeight: "bolder",
                        }}
                      >
                        Billing Address
                      </h6>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form
                        action=""
                        onSubmit={submitDataAddress}
                        className="mt-2"
                      >
                        <div className="row">
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              State
                            </label>
                            <select
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your State "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              value={addressData ? addressData.billing_state : ""}
                              onChange={async (e) => {
                                setAddressData({
                                  ...addressData,
                                  billing_state: e.target.value,
                                });
                                let res = await get_city({
                                  state_id: e.target.value,
                                  app_id: app_id,
                                });
                                if (res && res.status === 1) {
                                  setCityListBill(res.data);
                                }
                              }}
                              required
                            >
                              <option value="">select state</option>
                              {stateList.length > 0
                                ? stateList.map((ele) => {
                                  return (
                                    <option value={ele._id}>
                                      {ele.state_name}
                                    </option>
                                  );
                                })
                                : ""}
                            </select>

                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              City
                            </label>
                            <select
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your City "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              defaultValue={
                                addressData ? addressData.billing_city : ""
                              }
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  billing_city: e.target.value,
                                });
                              }}
                              required
                            >
                              <option value="">select city</option>
                              {cityListBill.length > 0
                                ? cityListBill.map((ele) => {
                                  return (
                                    <option value={ele._id}>
                                      {ele.city_name}
                                    </option>
                                  );
                                })
                                : ""}
                            </select>
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                        </div>
                        <div className="row">
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              Pincode
                            </label>
                            <input
                              type="text"
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your Pincode "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              defaultValue={
                                addressData ? addressData.billing_pin_code : ""
                              }
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  billing_pin_code: e.target.value,
                                });
                              }}
                              required
                            />
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                          <div class="mb-3 col-sm-6">
                            <label
                              for="exampleInputEmail1"
                              style={{ fontSize: "13px" }}
                              class="form-label mb-0 text-muted"
                            >
                              Locality/Landmark
                            </label>
                            <input
                              type="text"
                              class="form-control p-2"
                              id="exampleInputEmail1"
                              placeholder="Enter Your Locality/Landmark  "
                              aria-describedby="emailHelp"
                              style={{ borderRadius: "0px" }}
                              defaultValue={
                                addressData ? addressData.billing_landmark : ""
                              }
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  billing_landmark: e.target.value,
                                });
                              }}
                              required
                            />
                            {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                          </div>
                        </div>
                        <div className="row">
                          <label
                            for="floatingTextarea2"
                            style={{ fontSize: "13px" }}
                            className="text-muted"
                          >
                            Address
                          </label>

                          <div class="form-floating">
                            <textarea
                              class="form-control"
                              placeholder="Leave a comment here"
                              id="floatingTextarea2"
                              defaultValue={
                                addressData ? addressData.billing_address : ""
                              }
                              style={{ height: "150px", borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddressData({
                                  ...addressData,
                                  billing_address: e.target.value,
                                });
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          className="btn mt-4 p-3 text-light "
                          type="submit"
                          style={{
                            backgroundColor: "#640513",
                            borderRadius: "0px",
                            fontSize: "13px",
                          }}
                        >
                          Save & Continue
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="accordion-item border-0">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed bg-light m-2 shadow-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <h6
                        className=""
                        style={{
                          fontFamily: "segoe ui symbol",
                          fontWeight: "bolder",
                        }}
                      >
                        Payment Method
                      </h6>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul
                        class="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li class="nav-item" role="presentation">
                          <Button
                            class="nav-link active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                            onClick={(e) => setPaymentMethod("cod")}
                            variant="contained"
                            style={{ borderRadius: "0px" }}
                          >
                            Cash On Delivery
                          </Button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <Button
                            class="nav-link"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                            onClick={(e) => setPaymentMethod("razorpay")}
                            variant="contained"
                            style={{ borderRadius: "0px" }}
                          >
                            Razorpay
                          </Button>
                        </li>
                      </ul>
                      {/* <div class="tab-content" id="pills-tabContent">
                         <div
                           class="tab-pane fade show active"
                           id="pills-home"
                           role="tabpanel"
                           aria-labelledby="pills-home-tab"
                           tabindex="0"
                         >
                           <div className="w-100">
                            
   
                             <Button
                               variant="contained"
                               className="p-3 px-5 m-2"
                               onClick={(e) => setCod(true)}
                             >
                               {" "}
                               <i class="fa fa-house"></i>&nbsp;Cash On delivery
                             </Button>
                           </div>
                         </div>
                         <div
                           class="tab-pane fade"
                           id="pills-profile"
                           role="tabpanel"
                           aria-labelledby="pills-profile-tab"
                           tabindex="0"
                         >
                           <div className="w-100">
                             <small>Rezorpay</small>
                             <Button
                               variant="contained"
                               onClick={(e) => setRazorpay(true)}
                               className="p-3 px-5  m-2"
                             >
                               <i class="fa-solid fa-money-bill"></i>&nbsp;Razorpay
                             </Button>
                           </div>
                         </div>
                       </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-3 bg-white m-1 mt-5 p-3 shadow-sm">
              <h5
                style={{
                  fontFamily: "segoe ui symbol",
                  fontWeight: "bolder",
                }}
              >
                Product Summary{" "}
              </h5>
              {url !== "new" ? (
                <div className="row mt-3">
                  {/* <div className="col-sm-12 text-center">
                                       <img src={product?.thumbnail_image} className="w-100" style={{ height: "150px" }} alt="" />
                                   </div> */}
                  <div className="col-sm-12">
                    <h5
                      className="text-muted mt-3 fw-bolder"
                      style={{
                        fontSize: "14px",
                        textAlign: "justify",
                        fontFamily: "segoe ui symbol",
                      }}
                    >
                      {product?.name}
                    </h5>
                  </div>
                  <div className="row mt-5">
                    <div className="w-100 d-flex">
                      <div className="w-50 text-center">
                        <p
                          className="text-muted fw-bolder"
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          Quantity :
                        </p>
                      </div>
                      <div
                        className="w-50 "
                        style={{
                          fontSize: "14px",
                          textAlign: "right",
                          fontFamily: "segoe ui symbol",
                        }}
                      >
                        {1}
                      </div>
                    </div>
                    <div className="w-100 d-flex">
                      <div className="w-50 text-center">
                        <p
                          className="text-muted fw-bolder"
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          Tax :
                        </p>
                      </div>
                      <div
                        className="w-50 "
                        style={{
                          fontSize: "14px",
                          textAlign: "right",
                          fontFamily: "segoe ui symbol",
                        }}
                      >
                        {product?.tax}%
                      </div>
                    </div>
                    <div className="w-100 d-flex">
                      <div className="w-50 text-center">
                        <p
                          className="text-muted fw-bolder"
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          Original price :
                        </p>
                      </div>
                      <div
                        className="w-50 "
                        style={{
                          fontSize: "14px",
                          textAlign: "right",
                          fontFamily: "segoe ui symbol",
                        }}
                      >
                        {product?.mrp}
                      </div>
                    </div>
                    <div className="w-100 d-flex">
                      <div className="w-50 text-center">
                        <p
                          className="text-muted fw-bolder"
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          Discount :
                        </p>
                      </div>
                      <div
                        className="w-50 "
                        style={{
                          fontSize: "14px",
                          textAlign: "right",
                          fontFamily: "segoe ui symbol",
                        }}
                      >
                        {product?.discount}%
                      </div>
                    </div>
                    <hr className="m-2 "></hr>
                    <div className="w-100 d-flex">
                      <div className="w-50 text-center">
                        <h5
                          className=" fw-bolder"
                          style={{
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          Total :
                        </h5>
                      </div>
                      <div
                        className="w-50  fw-bolder"
                        style={{
                          textAlign: "right",
                          fontFamily: "segoe ui symbol",
                        }}
                      >
                        ₹
                        {parseFloat(product?.mrp) +
                          ((100 - parseFloat(product?.discount)) / 100) *
                          product?.tax}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                cartData?.cart.map((ele) => {
                  return (
                    <div className="row mt-3">
                      <div className="col-sm-12 text-center">
                        <img
                          src={ele?.thumbnail_image}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="col-sm-12">
                        <h5
                          className="text-muted mt-3 fw-bolder"
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            fontFamily: "segoe ui symbol",
                          }}
                        >
                          {ele?.name}
                        </h5>
                      </div>
                      <div className="row mt-3">
                        <div className="w-100 d-flex">
                          <div className="w-50 text-center">
                            <p
                              className="text-muted fw-bolder"
                              style={{
                                fontSize: "14px",
                                textAlign: "justify",
                                fontFamily: "segoe ui symbol",
                              }}
                            >
                              Quantity :
                            </p>
                          </div>
                          <div
                            className="w-50 "
                            style={{
                              fontSize: "14px",
                              textAlign: "right",
                              fontFamily: "segoe ui symbol",
                            }}
                          >
                            {ele?.qty}
                          </div>
                        </div>
                        <div className="w-100 d-flex">
                          <div className="w-50 text-center">
                            <p
                              className="text-muted fw-bolder"
                              style={{
                                fontSize: "14px",
                                textAlign: "justify",
                                fontFamily: "segoe ui symbol",
                              }}
                            >
                              Tax :
                            </p>
                          </div>
                          <div
                            className="w-50 "
                            style={{
                              fontSize: "14px",
                              textAlign: "right",
                              fontFamily: "segoe ui symbol",
                            }}
                          >
                            {ele?.tax}%
                          </div>
                        </div>
                        <div className="w-100 d-flex">
                          <div className="w-50 text-center">
                            <p
                              className="text-muted fw-bolder"
                              style={{
                                fontSize: "14px",
                                textAlign: "justify",
                                fontFamily: "segoe ui symbol",
                              }}
                            >
                              Original price :
                            </p>
                          </div>
                          <div
                            className="w-50 "
                            style={{
                              fontSize: "14px",
                              textAlign: "right",
                              fontFamily: "segoe ui symbol",
                            }}
                          >
                            {ele?.mrp}
                          </div>
                        </div>
                        <div className="w-100 d-flex">
                          <div className="w-50 text-center">
                            <p
                              className="text-muted fw-bolder"
                              style={{
                                fontSize: "14px",
                                textAlign: "justify",
                                fontFamily: "segoe ui symbol",
                              }}
                            >
                              Discount :
                            </p>
                          </div>
                          <div
                            className="w-50 "
                            style={{
                              fontSize: "14px",
                              textAlign: "right",
                              fontFamily: "segoe ui symbol",
                            }}
                          >
                            {ele?.discount}%
                          </div>
                        </div>
                        <hr className="m-2 "></hr>
                        <div className="w-100 d-flex">
                          <div className="w-50 text-center">
                            <h5
                              className=" fw-bolder"
                              style={{
                                textAlign: "justify",
                                fontFamily: "segoe ui symbol",
                              }}
                            >
                              Total :
                            </h5>
                          </div>
                          <div
                            className="w-50  fw-bolder"
                            style={{
                              textAlign: "right",
                              fontFamily: "segoe ui symbol",
                            }}
                          >
                            ₹{" "}
                            {(parseFloat(ele.mrp) *
                              ele.qty *
                              (100 - parseFloat(ele.discount)) *
                              (100 + parseFloat(ele.tax))) /
                              10000}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <Button
              variant="contained"
              className="p-3 px-4 mt-2"
              style={{ width: "67%", backgroundColor: "#640513" }}
              onClick={displayRazorpay}
            >
              {" "}
              Pay Now
            </Button>
          </div>
        ) : (
          <div className="row ">
            <div className="col-sm-6 ms-auto me-auto text-center p-3">
              <img src="https://img.freepik.com/premium-vector/login-access-denied-vector-illustration-system-refuses-password-error-entry-computer-device-showing-user-does-have-permission-website-mobile-development_2175-1277.jpg?w=740" height={250} />
              <h5 className="mt-3 fw-bold" style={{ fontFamily: "segoe ui symbol" }}>You Need To Login First For Order This Product</h5>
              <Link className="text-decoration-none" to="/login">
                <Button variant="contained" className="px-4 p-2">Login</Button>
              </Link>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default Billing;
