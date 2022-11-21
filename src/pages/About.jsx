import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const About = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h5 className='text-center mt-5'>About US</h5>
                    <p className='' style={{ justifyContent: "space-around" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque esse et molestiae atque nulla mollitia doloremque. Soluta provident odit ab dolore accusantium veritatis explicabo, excepturi ipsum ratione tempore in non.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About