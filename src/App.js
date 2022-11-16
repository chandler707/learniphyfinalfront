import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap/dist/css/bootstrap.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upsc from './syllabus/Upsc';
import Cart from './pages/Cart';
import Contactus from './pages/Contactus';
import Books from './pages/Books';
// import React , { useEffect } from 'react';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Singleproduct from './pages/Singleproduct';
// import React, { useEffect, useState } from 'react';
// import HashLoader from "react-spinners/HashLoader";
import Pagenotfound from './pages/Pagenotfound';
import Feedback from './pages/Feedback';
import "./components/navbar.css";
import Billing from './pages/Billing';
import Notification from './pages/Notification';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import Shipping from './pages/Shipping';



function App() {
  return (
    <>

      <Router>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/upsc' element={<Upsc />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/books' element={<Books />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/category' element={<Category />} />
          <Route path='/subcategory/:id' element={<Subcategory />} />
          <Route path='/singleproduct/:id' element={<Singleproduct />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/billing/:id' element={<Billing />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/Shipping' element={<Shipping />} />

        </Routes>

      </Router>



    </>
  );
}

export default App;