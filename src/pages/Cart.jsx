import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Cart = () => {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);


    return (
        <>
            <Navbar />
            <div className="container-fluid bg-light p-3">
                <h4 className=' mt-5 mb-5 fw-bold' style={{
                    fontFamily: "segoe ui symbol"
                }}>Shopping Cart</h4>
                <div className="row mt-4">




                    <div class="col-sm-3 m-2 card p-0 border-0 shadow-sm">
                        <img src="https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg" class="img-fluid rounded-start" style={{ height: "100%", width: "100%" }} alt="..." />
                        <div class="card-body">
                            <h5 className="card-title" style={{
                                // textOverflow: "ellipsis ",
                                // maxWidth: "300px",
                                // whiteSpace: "nowrap ",
                                // overflow: "hidden  "
                            }}>The Complete JavaScript Course 2022: From Zero to Expert!</h5>
                            <h6 className='mt-2' style={{ textAlign: "right !important" }}>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6>
                            <div className="col-lg-6 ">
                                <div class="input-group">
                                    <span className="input-group-btn">
                                        <button type="button" class="quantity-left-minus btn  btn-number" data-type="minus" style={{ borderRadius: "0px" }} data-field="" onClick={() => setCount(count - 1)}>
                                            <i className='fa fa-minus'></i>
                                        </button>
                                    </span>
                                    <div> {count}</div>
                                    <span class="input-group-btn">
                                        <button type="button" style={{ borderRadius: "0px" }} className="quantity-right-plus btn  btn-number" data-type="plus" onClick={() => setCount(count + 1)} data-field="">
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-3 m-2 card p-0 border-0 shadow-sm">
                        <img src="https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg" class="img-fluid rounded-start" style={{ height: "100%", width: "100%" }} alt="..." />
                        <div class="card-body">
                            <h5 className="card-title" style={{
                                // textOverflow: "ellipsis ",
                                // maxWidth: "300px",
                                // whiteSpace: "nowrap ",
                                // overflow: "hidden  "
                            }}>The Complete JavaScript Course 2022: From Zero to Expert!</h5>
                            <h6 className='mt-2' style={{ textAlign: "right !important" }}>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6>
                            <div className="col-lg-6 ">
                                <div class="input-group">
                                    <span className="input-group-btn">
                                        <button type="button" class="quantity-left-minus btn  btn-number" data-type="minus" style={{ borderRadius: "0px" }} data-field="" onClick={() => setCount1(count1 - 1)}>
                                            <i className='fa fa-minus'></i>
                                        </button>
                                    </span>
                                    <input type="text" id="quantity" style={{ borderRadius: "0px", textAlign: "center" }} name="quantity" className="form-control input-number" value={count1} />
                                    <span class="input-group-btn">
                                        <button type="button" style={{ borderRadius: "0px" }} className="quantity-right-plus btn  btn-number" data-type="plus" onClick={() => setCount1(count1 + 1)} data-field="">
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-3 m-2 card p-0 border-0 shadow-sm">
                        <img src="https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg" class="img-fluid rounded-start" style={{ height: "100%", width: "100%" }} alt="..." />
                        <div class="card-body">
                            <h5 className="card-title" style={{
                                // textOverflow: "ellipsis ",
                                // maxWidth: "300px",
                                // whiteSpace: "nowrap ",
                                // overflow: "hidden  "
                            }}>The Complete JavaScript Course 2022: From Zero to Expert!</h5>
                            <h6 className='mt-2' style={{ textAlign: "right !important" }}>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6>
                            <div className="col-lg-6 ">
                                <div class="input-group">
                                    <span className="input-group-btn">
                                        <button type="button" class="quantity-left-minus btn  btn-number" data-type="minus" style={{ borderRadius: "0px" }} data-field="" onClick={() => setCount2(count2 - 1)}>
                                            <i className='fa fa-minus'></i>
                                        </button>
                                    </span>
                                    <input type="text" id="quantity" style={{ borderRadius: "0px", textAlign: "center" }} name="quantity" className="form-control input-number" value={count2} />
                                    <span class="input-group-btn">
                                        <button type="button" style={{ borderRadius: "0px" }} className="quantity-right-plus btn  btn-number" data-type="plus" onClick={() => setCount2(count2 + 1)} data-field="">
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-3 m-2 card p-0 border-0 shadow-sm">
                        <img src="https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg" class="img-fluid rounded-start" style={{ height: "100%", width: "100%" }} alt="..." />
                        <div class="card-body">
                            <h5 className="card-title" style={{
                                // textOverflow: "ellipsis ",
                                // maxWidth: "300px",
                                // whiteSpace: "nowrap ",
                                // overflow: "hidden  "
                            }}>The Complete JavaScript Course 2022: From Zero to Expert!</h5>
                            <h6 className='mt-2' style={{ textAlign: "right !important" }}>₹449 <span className='text-muted'> <del>₹3,399</del> </span></h6>
                            <div className="col-lg-6 ">
                                <div class="input-group">
                                    <span className="input-group-btn">
                                        <button type="button" class="quantity-left-minus btn  btn-number" data-type="minus" style={{ borderRadius: "0px" }} data-field="" onClick={() => setCount3(count3 - 1)}>
                                            <i className='fa fa-minus'></i>
                                        </button>
                                    </span>
                                    <input type="text" id="quantity" style={{ borderRadius: "0px", textAlign: "center" }} name="quantity" className="form-control input-number" value={count3} />
                                    <span class="input-group-btn">
                                        <button type="button" style={{ borderRadius: "0px" }} className="quantity-right-plus btn  btn-number" data-type="plus" onClick={() => setCount3(count3 + 1)} data-field="">
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>






                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart