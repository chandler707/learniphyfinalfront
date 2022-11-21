import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { get_content } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { pdf } from "../Repository/Repository";
import { useLocation } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const Notification = () => {
  const [pdfList, setPdfList] = useState([]);
  const [loading, setLoading] = useState(false);
  const opendoc = (e, url) => {
    window.open(pdf + url, "_blank");
  };

  useEffect(() => {
    let type = window.location.pathname.split("/").pop();
    const GetPdf = async () => {
      setLoading(true)
      let res = await get_content({
        app_id: app_id,
        page: 1,
        pagesize: 10,
        type: type,
      });
      if (res && res?.status === 1) {
        setLoading(false)
        setPdfList(res?.data);
      }
    };
    GetPdf();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {pdfList && pdfList.length > 0 ? (
            pdfList.map((pdf, index) => {
              return (

                <div className="col-sm-3 notification mt-3">
                  <Link className="text-decoration-none" onClick={(e) => opendoc(e, pdf.pdf_url)} >
                    <div className="card border-0 bg-light shadow-sm mb-3 p-5">
                      <div className="content ms-2">
                        <h6
                          className="mt-2 mb-0 fw-bold text-center "
                          style={{
                            fontFamily: "segoe ui symbol",
                          }}

                        >
                          {pdf?.name}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>

              );
            })
          ) : (
            <div style={{ textAlign: "center", color: "black" }}>
              <div className='pt-5 '>
                <HashLoader className='ms-auto me-auto mt-5' size={45} color="#640513" />
              </div>
              <p style={{
                fontFamily: "segoe ui symbol"
              }} className='mt-2 fw-bold'>Please Wait</p>
            </div>
          )
          }

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
