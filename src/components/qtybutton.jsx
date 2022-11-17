import React from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";
import { removeFromCart } from "../Redux/shopping/shopping-action";
import { useDispatch } from "react-redux";


function qtybutton() {
    const cartData = useSelector((state) => state.shopReducer);

    const [count, setCount] = useState(0);
    return (
        <>
            <div class="input-group ms-auto">
                <span className="input-group-btn  ">
                    <button type="button" class="quantity-left-minus btn text-dark btn-number " data-type="minus" style={{ borderRadius: "0px", border: "1px solid lightgrey" }} data-field="" onClick={(e) => setCount(count - 1)}>
                        <i className='fa fa-minus'></i>
                    </button>
                </span>
                <div className='py-1 px-4 ' style={{ border: "1px solid lightgrey" }}> {count}</div>
                <span class="input-group-btn me-auto">
                    <button type="button" style={{ borderRadius: "0px", border: "1px solid lightgrey" }} className="quantity-right-plus btn  text-dark btn-number " data-type="plus" onClick={(e) => setCount(count + 1)} data-field="">
                        <i className='fa fa-plus'></i>
                    </button>
                </span>
            </div>
        </>
    )
}

export default qtybutton