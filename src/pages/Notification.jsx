import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { get_content } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import { pdf } from "../Repository/Repository";
import { useLocation } from "react-router-dom";

const Notification = () => {
  const [pdfList, setPdfList] = useState([]);

  const opendoc = (e, url) => {
    window.open(pdf + url, "_blank");
  };

  useEffect(() => {
    let type = window.location.pathname.split("/").pop();
    const GetPdf = async () => {
      let res = await get_content({
        app_id: app_id,
        page: 1,
        pagesize: 10,
        type: type,
      });
      if (res && res?.status === 1) {
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
          {pdfList && pdfList.length > 0
            ? pdfList.map((pdf, index) => {
              return (
                <Link>
                  <div className="col-sm-3">
                    <div className="card border-0 bg-light shadow-sm mb-3">
                      <div className="content ms-2">
                        <h6
                          className="mt-2 mb-0 fw-bold"
                          style={{
                            fontFamily: "segoe ui symbol",
                          }}
                          onClick={(e) => opendoc(e, pdf.pdf_url)}
                        >
                          {pdf?.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
            : ""}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
