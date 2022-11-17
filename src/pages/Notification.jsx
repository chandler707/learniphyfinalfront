import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { get_content } from '../Repository/UserRepository';
import { app_id } from '../Repository/Repository';

const Notification = () => {

    const [pdfList, setPdfList] = useState([]);

    useEffect(() => {
        const GetPdf = async (type) => {
            let res = await get_content({ app_id: app_id, page: 1, pagesize: 4, type: Notification })
            if (res && res?.status === 1) {
                setPdfList(res?.data)
            }
        }
        GetPdf()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">

                    {pdfList && pdfList.length > 0 ?
                        pdfList.map((pdf, index) => {
                            return <Link>
                                <div className="col-sm-3">
                                    <div className="card border-0 bg-light shadow-sm mb-3">
                                        <div className="content ms-2">
                                            <h6 className='mt-2 mb-0 fw-bold' style={{
                                                fontFamily: "segoe ui symbol"
                                            }}>{pdf?.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }) : ""
                    }



                </div>
            </div>
            <Footer />

        </>
    )
}

export default Notification