import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { get_order, getInvoice } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { useState } from "react";
import moment from "moment";
import { invoice } from "../Repository/Repository";
const OrderDetails = () => {
  const [orderData, setOrderData] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const order = async (type) => {
    let res = await get_order({
      app_id: app_id,
      order_id: type,
      user_id: localStorage.getItem("user_id"),
    });
    if (res && res.status === 1) {
      setOrderData(res.data?.[0]);
      if (res.data.length > 0 && res.data[0].order_item.length > 0) {
        let subTotal = 0;
        res.data[0].order_item.map((element) => {
          subTotal =
            subTotal +
            (((element?.quantity *
              parseFloat(element?.product_info?.mrp) *
              (100 - element?.product_info?.discount)) /
              100) *
              (100 + element?.product_info?.tax)) /
              100;
        });
        setSubtotal(subTotal.toFixed(2));
        setTotal((subTotal + res?.data[0].shipping_charges).toFixed(2));
      }
    }
  };
  useEffect(() => {
    let type = window.location.pathname.split("/").pop();
    if (type) {
      order(type);
    }
  }, []);

  const GetInvoice = async () => {
    const res = await getInvoice({
      app_id: app_id,

      invoice_id: orderData?._id,
      address: {
        shipping_address: orderData?.shipping_address,
        shipping_city: orderData?.shipping_city_info?.city_name,
        shipping_state: orderData?.shipping_state_info?.state_name,
        shipping_pincode: orderData?.shipping_pincode,

        billing_address: orderData?.billing_address,
        billing_city: orderData?.billing_city_info?.city_name,
        billing_state: orderData?.billing_state_info?.state_name,
        billing_pincode: orderData?.billing_pincode,
      },
      name: orderData?.user_info?.fname + " " + orderData?.user_info?.lname,
      product: orderData?.order_item,
      date: moment(orderData?.createdAt).format("MMM-DD-YYYY, h:mm:ss a"),
      payment_method: orderData?.transaction_info?.payment_method,
      order_status: orderData?.order_status,
      total: subtotal,
      shipping_charges: orderData?.shipping_charges,
      final: total,
    });
    if (res.status === 1) {
      console.log("url", `${invoice}/${res.data}`);
      window.open(`${invoice}/${res.data}`, "_blank");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light p-5" style={{ height: "105vh" }}>
        <div className="row">
          <div className="col-sm-4">
            <div
              className="card shadow-sm border-0 p-3 mb-3 "
              style={{ borderRadius: "0px", height: "180px" }}
            >
              <h5
                className="px-4 mb-4 fw-bold"
                style={{ fontFamily: "segoe ui symbol" }}
              >
                User Details
              </h5>
              <div className="w-100 d-flex px-4">
                <h6>Name:</h6>
                <h6 className="ms-auto">{orderData?.user_info?.fname}</h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Mobile:</h6>
                <h6 className="ms-auto">{orderData?.user_info?.mobile}</h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Email:</h6>
                <h6 className="ms-auto" style={{ textWrap: "wrap" }}>
                  {orderData?.user_info?.email}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div
              className="card shadow-sm border-0 p-3 mb-3"
              style={{ borderRadius: "0px", height: "180px" }}
            >
              <h5
                className="px-4 mb-4 fw-bold"
                style={{ fontFamily: "segoe ui symbol" }}
              >
                Billing Address
              </h5>
              <div className="w-100 d-flex px-4">
                <h6>State:</h6>
                <h6 className="ms-auto">
                  {orderData?.billing_state_info?.state_name}
                </h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>City:</h6>

                <h6 className="ms-auto">
                  {" "}
                  {orderData?.billing_city_info?.city_name}
                </h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Address:</h6>
                <h6 className="ms-auto">{orderData?.billing_address}</h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Pincode:</h6>
                <h6 className="ms-auto">{orderData?.billing_pincode}</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div
              className="card shadow-sm border-0 p-3 mb-3"
              style={{ borderRadius: "0px", height: "180px" }}
            >
              <h5
                className="px-4 mb-4 fw-bold"
                style={{ fontFamily: "segoe ui symbol" }}
              >
                Shipping Address
              </h5>
              <div className="w-100 d-flex px-4">
                <h6>State:</h6>
                <h6 className="ms-auto">
                  {orderData?.shipping_state_info?.state_name}
                </h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>City:</h6>
                <h6 className="ms-auto">
                  {orderData?.shipping_city_info?.city_name}
                </h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Address:</h6>
                <h6 className="ms-auto">{orderData?.shipping_address}</h6>
              </div>
              <div className="w-100 d-flex px-4">
                <h6>Pincode:</h6>
                <h6 className="ms-auto">{orderData?.shipping_pincode}</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-12 ms-auto me-auto ">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "0px" }}
            >
              {orderData?.order_item && orderData?.order_item.length != 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name </th>
                        <th>MRP </th>
                        <th>Discount (%) </th>
                        <th>Tax (%) </th>
                        <th>Quantity </th>
                        <th>Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.order_item.map((element, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element?.product_info?.name}</td>
                            <td>
                              ₹&nbsp;
                              {parseFloat(element?.product_info?.mrp)}
                            </td>
                            <td>{element?.product_info?.discount}</td>
                            <td>{element?.product_info?.tax}</td>
                            <td>{element?.quantity}</td>
                            <td>
                              ₹&nbsp;
                              {(
                                (((element?.quantity *
                                  parseFloat(element?.product_info?.mrp) *
                                  (100 - element?.product_info?.discount)) /
                                  100) *
                                  (100 + element?.product_info?.tax)) /
                                100
                              ).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <br />
                </div>
              ) : (
                "no data"
              )}
              <div className="col-sm-5 mt-5">
                <div className="w-100 d-flex px-4">
                  <h6>Sub Total:</h6>
                  <h6 className="ms-auto">{subtotal}</h6>
                </div>
                <div className="w-100 d-flex px-4">
                  <h6>Shipping Charges:</h6>
                  <h6 className="ms-auto">{orderData?.shipping_charges}</h6>
                </div>
                <div className="w-100 d-flex px-4">
                  <h6>Total:</h6>
                  <h6 className="ms-auto" style={{ textWrap: "wrap" }}>
                    {total}
                  </h6>
                </div>
              </div>
              <div className="w-100 d-flex px-4">
                <h6 className="ms-auto">
                  <Button variant="contained" onClick={GetInvoice}>
                    Invoice
                  </Button>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
