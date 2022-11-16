import React, { useEffect, useState } from 'react';
import { get_product, get_city, get_state } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Shipping = () => {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    states();
  }, [])


  const states = async () => {
    let res = await get_state({ is_all: true, app_id: app_id });
    setStateList(res.data);
  };
  const onchangeState = async (e) => {
    console.log(e.target.value);
    setState(e.target.value);
    let res = await get_city({ is_all: true, app_id: app_id, state_id: e.target.value });
    if (res.status === 1) {
      setCityList(res.data);
      console.log(res.data)
    }
  };
  return (
    <>
      <Navbar />
      <div className="container p-4 shadow">
        <form action="">
          <h5>Shipping Details</h5>
          <div className="row">
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted">Full Name</label>
              <input type="text" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Your Full Name' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >Email Address</label>
              <input type="email" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Your Email ' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted">Mobile Number</label>
              <input type="number" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Your Mobile Number' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >Alternate Mobile Number</label>
              <input type="number" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Alternate Mobile Number ' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >State</label>
              <select class="form-select p-3" aria-label="Default select example" style={{ borderRadius: "0px" }} onChange={onchangeState} required>
                <option selected style={{ fontSize: "13px" }} >Select State</option>
                {stateList?.map((ele, index) => {
                  return (
                    <option style={{ fontSize: "13px" }} key={index} value={ele._id}>
                      {ele.state_name}
                    </option>
                  );
                })}
              </select>
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >City</label>
              <select class="form-select p-3" aria-label="Default select example" style={{ borderRadius: "0px" }} onChange={(e) => setCity(e.target.value)} required>
                <option selected style={{ fontSize: "13px" }} >Select City</option>
                {cityList?.map((ele, index) => {
                  return (
                    <option style={{ fontSize: "13px" }} key={index} value={ele._id}>
                      {ele.city_name}
                    </option>
                  );
                })}
              </select>
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >Pincode</label>
              <input type="text" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Your Pincode ' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
            <div class="mb-3 col-sm-6">
              <label for="exampleInputEmail1" style={{ fontSize: "13px" }} class="form-label mb-0 text-muted" >Locality/Landmark</label>
              <input type="text" class="form-control p-3" id="exampleInputEmail1" placeholder='Enter Your Locality/Landmark  ' aria-describedby="emailHelp" style={{ borderRadius: "0px" }} required />
              {/* <div id="emailHelp" class="form-text" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="row">
            <label for="floatingTextarea2" style={{ fontSize: "13px" }} className="text-muted">Address</label>

            <div class="form-floating">
              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "150px", borderRadius: "0px" }}></textarea>
            </div>
          </div>
          <button className='btn mt-4 p-3 text-light ' style={{ backgroundColor: "#640513", borderRadius: "0px" }}>SAVE AND CONTINUE</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Shipping