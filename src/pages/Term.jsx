import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { get_term } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";



const Term = () => {
    const [term, setTerm] = useState("");
    useEffect(() => {
        Getterm();
        window.scrollTo(0, 0);
    }, []);

    const Getterm = async () => {
        let res = await get_term({ app_id: app_id });
        if (res.status === 1) {
            setTerm(res.data.contact_us);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h5>Terms & Conditions</h5>
                    <p>{term}</p>
                </div>
            </div>
        </>

    )
}

export default Term