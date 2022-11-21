import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import {
  update_profile,
  Get_address,
  getUserProfile,
  get_state,
  get_city,
  updateAddress,
  get_order,
} from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import app from "../firebase";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [alterNumber, setAlterNumber] = useState("");
  const [state, setState] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityListShip, setCityListShip] = useState([]);
  const [cityListBill, setCityListBill] = useState([]);
  const [city, setCity] = useState("");
  const [shipState, setShipState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [userdata, setUserData] = useState({});
  const [message, setMessage] = useState("message");
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({});
  const [orderdetail, setorderDetail] = useState([]);
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    let userId = localStorage.getItem("user_id");

    if (userId) {
      setUserId(userId);
      console.log("running");

      const getProfile = async () => {
        let res = await getUserProfile({ user_id: userId, app_id: app_id });
        console.log(res.data);

        if (res && res.status === 1) {
          setUserData(res.data[0]);
          console.log(res.data[0]);
        }
      };
      getProfile();
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

  const addressDetail = async () => {
    let res = await Get_address({ app_id: app_id, user_id: userId });
    if (res && res.status === 1) {
      setAddressData(res.data);

      if (res.data.shipping_state) {
        let res1 = await get_city({
          app_id: app_id,
          state_id: res.data.shipping_state,
        });

        if (res1 && res1.status === 1) {
          setCityListShip(res1.data);
          console.log("hkjsd", res1.data);
        }
      }
      if (res.data.billing_state) {
        let res1 = await get_city({
          app_id: app_id,
          state_id: res.data.billing_state,
        });

        if (res1 && res1.status === 1) {
          setCityListBill(res1.data);
          console.log("hkjsd", res1.data);
        }
      }
    }
    let res2 = await get_state({ is_all: true, app_id: app_id });
    if (res2 && res2.status === 1) {
      console.log("hit in state");
      setStateList(res2.data);
    }
    console.log("rs", res);
  };
  const orderDetail = async () => {
    let res = await get_order({
      page: 1,
      pagesize: 100,
      app_id: app_id,
      user_id: userId,
    });
    if (res && res.status === 1) {
      setorderDetail(res.data);
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res = await update_profile({
      fname: name,
      email: email,
      user_id: userId,

      app_id: "618e5e2f339a8e2b1055fffb",
    });
    if (res.status === 1) {
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
        <div className="row ">
          <div className="col-sm-8  p-0 mt-5 ms-auto me-auto">
            <ul
              class="nav nav-pills mb-3 ms-auto me-auto"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active "
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  style={{ borderRadius: "0px" }}
                >
                  Profile Settings
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  style={{ borderRadius: "0px" }}
                  onClick={addressDetail}
                >
                  Personal Details
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                  style={{ borderRadius: "0px" }}
                  onClick={orderDetail}
                >
                  Order Details
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                {" "}
                <div className=" m-1 bg-white  p-3 shadow-sm">
                  <h5
                    className="mb-2"
                    style={{
                      fontFamily: "segoe ui symbol",
                      fontWeight: "bolder",
                    }}
                  >
                    Basic Detail :
                  </h5>
                  <form action="">
                    <div className="row">
                      <div class="mb-3 col-sm-5">
                        <label
                          for="exampleInputEmail1"
                          style={{ fontSize: "13px" }}
                          class="form-label mb-0 text-muted"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          class="form-control p-2"
                          id="exampleInputEmail1"
                          defaultValue={
                            userdata
                              ? userdata?.fname + " " + userdata?.lname
                              : ""
                          }
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Your Full Name"
                          aria-describedby="emailHelp"
                          style={{ borderRadius: "0px" }}
                          required
                        />
                        {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                      </div>
                      <div class="mb-3 col-sm-5">
                        <label
                          for="exampleInputEmail1"
                          style={{ fontSize: "13px" }}
                          class="form-label mb-0 text-muted"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          class="form-control p-2"
                          id="exampleInputEmail1"
                          defaultValue={userdata ? userdata.email : ""}
                          placeholder="Enter Your Email "
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ borderRadius: "0px" }}
                          required
                        />
                        {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                      </div>
                      <div class="mb-3 col-sm-5">
                        <label
                          for="exampleInputEmail1"
                          style={{ fontSize: "13px" }}
                          class="form-label mb-0 text-muted"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          class="form-control p-2"
                          id="exampleInputEmail1"
                          value={userdata?.mobile}
                          placeholder="Enter Your Email "
                          aria-describedby="emailHelp"
                          style={{ borderRadius: "0px" }}
                          required
                          disabled
                        />
                        {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
                      </div>
                      {/* <div class="mb-3 col-sm-6">
                        <label
                          for="exampleInputEmail1"
                          style={{ fontSize: "13px" }}
                          class="form-label mb-0 text-muted"
                        >
                          Select Your Profile Picture
                        </label>
                        <input
                          type="file"
                          class="form-control p-3"
                          id="exampleInputEmail1"
                          placeholder=""
                          aria-describedby="emailHelp"
                          style={{ borderRadius: "0px" }}
                          required
                        />
                      
                      </div> */}
                    </div>

                    <button
                      onClick={submitData}
                      className="btn mt-4 p-3 text-light "
                      style={{
                        backgroundColor: "#640513",
                        borderRadius: "0px",
                        fontSize: "13px",
                      }}
                    >
                      SAVE AND CONTINUE
                    </button>
                  </form>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabindex="0"
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className=" m-1 bg-white  p-3 shadow-sm">
                      <h5
                        className="mb-2"
                        style={{
                          fontFamily: "segoe ui symbol",
                          fontWeight: "bolder",
                        }}
                      >
                        Shipping Address
                      </h5>

                      <form
                        action=""
                        onSubmit={submitDataAddress}
                        className="mt-5"
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
                                setShipState(e.target.value);
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
                              value={addressData?.shipping_city}
                              onChange={(e) => {
                                setCity(e.target.value);
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
                                setPincode(e.target.value);
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
                                setLandmark(e.target.value);
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
                              style={{ height: "100px", borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setAddressData({
                                  ...addressData,
                                  shipping_address: e.target.value,
                                });
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          className="btn mt-4 p-2 w-100 text-light "
                          type="submit"
                          style={{
                            backgroundColor: "#640513",
                            borderRadius: "0px",
                            fontSize: "13px",
                          }}
                        >
                          {loading ? (
                            <>
                              <div
                                class="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                              &nbsp;Loading...
                            </>
                          ) : (
                            <>Save & Continue</>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className=" m-1 bg-white  p-3 shadow-sm">
                      <h5
                        className="mb-2"
                        style={{
                          fontFamily: "segoe ui symbol",
                          fontWeight: "bolder",
                        }}
                      >
                        Billing Address
                      </h5>

                      <form
                        action=""
                        onSubmit={submitDataAddress}
                        className="mt-5"
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
                              value={
                                addressData ? addressData.billing_state : ""
                              }
                              onChange={async (e) => {
                                setState(e.target.value);
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
                              value={addressData?.billing_city}
                              onChange={(e) => {
                                setCity(e.target.value);
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
                                setPincode(e.target.value);
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
                                setLandmark(e.target.value);
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
                              style={{ height: "100px", borderRadius: "0px" }}
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setAddressData({
                                  ...addressData,
                                  billing_address: e.target.value,
                                });
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          className="btn mt-4 p-2 w-100 text-light "
                          type="submit"
                          style={{
                            backgroundColor: "#640513",
                            borderRadius: "0px",
                            fontSize: "13px",
                          }}
                        >
                          {loading ? (
                            <>
                              <div
                                class="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                              &nbsp;Loading...
                            </>
                          ) : (
                            <>Save & Continue</>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabindex="0"
              >
                {orderdetail && orderdetail.length != 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Index</th>
                          <th>Order ID</th>
                          <th>User Name</th>

                          <th>Order Date</th>
                          <th>Payment Method </th>
                          <th>Total </th>
                          <th>Order Status </th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderdetail.map((element, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{element._id}</td>
                              <td>
                                {element?.user_info?.fname +
                                  " " +
                                  element?.user_info?.lname}
                              </td>

                              <td>
                                {moment(element?.createdAt).format(
                                  "DD MMM YYYY  h:mm:ss a"
                                )}
                              </td>
                              <td>
                                {element?.transaction_info?.payment_method}
                              </td>
                              <td>{element?.total?.toFixed(2)}</td>
                              <td>{element?.order_status}</td>
                              <td>
                                <Link to={`/orderdetails/${element._id}`}>
                                  <i className="fas fa-edit"></i>
                                </Link>{" "}
                              </td>

                              <td>
                                {/* <Link to={`/order/edit/${element._id}`}>
                                  <i className="fas fa-edit"></i>
                                </Link>{" "} */}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  "no data"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
