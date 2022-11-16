import React from 'react'
import Ebooks from '../components/Ebooks'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Topsellingseries from '../components/Topsellingseries'
import Toptestseries from '../components/Toptestseries'
import Videocourse from '../components/Videocourse';
import "../components/navbar.css";
import { CartProvider } from '../context/cartContext';


const Home = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Slider />
        <Ebooks />
        <Toptestseries />
        <Topsellingseries />
        <Videocourse />
        <Footer />
      </CartProvider>

    </>

  )
}

export default Home