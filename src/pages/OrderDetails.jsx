import { Button } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const OrderDetails = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid bg-light p-5" style={{ height: "105vh" }}>
                <div className="row">

                    <div className="col-sm-4">
                        <div className="card shadow-sm border-0 p-3 mb-3 " style={{ borderRadius: "0px", height: "180px" }}>
                            <h5 className='px-4 mb-4 fw-bold' style={{ fontFamily: "segoe ui symbol" }}>User Details</h5>
                            <div className='w-100 d-flex px-4'>
                                <h6>Name:</h6>
                                <h6 className='ms-auto'>Chirag Jangid</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Mobile:</h6>
                                <h6 className='ms-auto'>6375528478</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Email:</h6>
                                <h6 className='ms-auto' style={{ textWrap: "wrap" }}>Chirag.Jangid1702@gmail.com</h6>

                            </div>

                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-sm border-0 p-3 mb-3" style={{ borderRadius: "0px", height: "180px" }}>
                            <h5 className='px-4 mb-4 fw-bold' style={{ fontFamily: "segoe ui symbol" }}>Billing Address</h5>
                            <div className='w-100 d-flex px-4'>
                                <h6>State:</h6>
                                <h6 className='ms-auto'>Rajasthan</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>City:</h6>
                                <h6 className='ms-auto'>Jaipur</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Address:</h6>
                                <h6 className='ms-auto'>B-208</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Pincode:</h6>
                                <h6 className='ms-auto'>302021</h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-sm border-0 p-3 mb-3" style={{ borderRadius: "0px", height: "180px" }}>
                            <h5 className='px-4 mb-4 fw-bold' style={{ fontFamily: "segoe ui symbol" }}>Shipping Address</h5>
                            <div className='w-100 d-flex px-4'>
                                <h6>State:</h6>
                                <h6 className='ms-auto'>Rajasthan</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>City:</h6>
                                <h6 className='ms-auto'>Jaipur</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Address:</h6>
                                <h6 className='ms-auto'>B-208</h6>

                            </div>
                            <div className='w-100 d-flex px-4'>
                                <h6>Pincode:</h6>
                                <h6 className='ms-auto'>302015</h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 ms-auto me-auto ">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: "0px" }}>
                            <div className='table-responsive p-3'>
                                <table class="table table-borderless border-0 ">
                                    <thead className=''>
                                        <tr className='text-center'>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Id</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Product Name</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>MRP</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Discount(%)</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Tax(%)</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Quantity</th>
                                            <th scope="col-sm-3" className='text-muted' style={{ fontWeight: "700", fontFamily: "segoe ui symbol" }}>Amount</th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='text-center'>
                                            <th scope="row">1</th>
                                            <td>Hindi</td>
                                            <td>11</td>
                                            <td>2</td>
                                            <td>10</td>
                                            <td>2</td>
                                            <td>23.72</td>

                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                            <div className='col-sm-5 mt-5'>
                                <div className='w-100 d-flex px-4'>
                                    <h6>Sub Total:</h6>
                                    <h6 className='ms-auto'>23.72</h6>

                                </div>
                                <div className='w-100 d-flex px-4'>
                                    <h6>Shipping Charges:</h6>
                                    <h6 className='ms-auto'>50</h6>

                                </div>
                                <div className='w-100 d-flex px-4'>
                                    <h6>Total:</h6>
                                    <h6 className='ms-auto' style={{ textWrap: "wrap" }}>73.72</h6>

                                </div>
                            </div>
                            <div className='w-100 d-flex px-4'>

                                <h6 className='ms-auto'>
                                    <Button variant='contained'>Invoice</Button>
                                </h6>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderDetails