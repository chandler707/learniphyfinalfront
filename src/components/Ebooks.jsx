import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { get_product } from "../Repository/UserRepository";
import { app_id } from "../Repository/Repository";
import HashLoader from "react-spinners/HashLoader";
import cartContext from "../context/cartContext";
import { addToCart } from "../Redux/shopping/shopping-action";
import { useSelector, useDispatch } from "react-redux";

const Ebooks = (props) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useContext(cartContext);
  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const GetProduct = async () => {
      let res = await get_product({ app_id: app_id, page: 1, pagesize: 4 });
      if (res && res?.status === 1) {
        setProductList(res?.data);
      }
    };
    GetProduct();
  }, []);

  const handleAddToCart = (e, item) => {
    // here, we cannot directly pass the `props` as it is, if we need to access the same value within the child component. So, we've to pass it as a different prop like this- `{...props}`
    // console.log("this is item", item);
    // addItem(item);
    // setIsAdded(true);
    dispatch(addToCart(item));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className=" mb-5 booksheading d-flex" style={{ width: "100%" }}>
            <div className=" head1" style={{ width: "50%" }}>
              {" "}
              <h4
                className=" mt-5  fw-bold "
                style={{
                  fontFamily: "segoe ui symbol",
                }}
              >
                Online Books Order
              </h4>
            </div>
            <div
              className=" head2 mt-5"
              style={{ width: "50%", textAlign: "right" }}
            >
              <Link
                to={`/books/`}
                className="  ms-auto text-decoration-none text-dark fw-bold"
                style={{ fontFamily: "segoe ui symbol" }}
              >
                View More&nbsp;<i class="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          {productList && productList.length > 0 ? (
            productList.map((element, index) => {
              return (
                <div className="col-sm-3">

                  <div className="card border-0 shadow mb-3">
                    <Link to={`/singleproduct/${element._id}`}>
                      <div className="image-section">
                        <img
                          src={element?.thumbnail_image}
                          className="w-100"
                          height={185}
                          alt="product image"
                        />
                      </div>
                    </Link>

                    <div className="content p-3">
                      <h6
                        className="mt-2 mb-0 fw-bold"
                        style={{
                          fontFamily: "segoe ui symbol",
                          textOverflow: "ellipsis ",
                          // maxWidth: "600px",
                          whiteSpace: "nowrap ",
                          overflow: "hidden  ",
                        }}
                      >
                        {element?.name}
                      </h6>
                      <p
                        className="m-0 text-muted "
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Published By : {element?.publisher_name?.name}
                      </p>
                      <h6 className="mt-2 ">
                        ₹{" "}
                        {(parseFloat(element?.mrp) *
                          (100 - parseFloat(element?.discount))) /
                          100}{" "}
                        <span className="text-muted">
                          {" "}
                          <del>₹ {element?.mrp}</del>{" "}
                        </span>
                      </h6>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, element)}
                        className="btn w-100 mb-2 fw-bold text-light p-2"
                        style={{
                          borderRadius: "0px",
                          backgroundColor: "#640513",
                        }}
                      >
                        Add To cart
                      </button>


                      {/* <button
                        className="btn w-100 mt-1 text-dark fw-bold p-2"
                        style={{
                          borderRadius: "0px",
                          border: "1px solid black",
                        }}
                      >
                        Buy Now
                      </button> */}

                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div style={{ textAlign: "center", color: "black" }}>
              <div className="pt-5 ">
                <HashLoader
                  className="ms-auto me-auto mt-5"
                  size={45}
                  color="#640513"
                />
              </div>
              <p
                style={{
                  fontFamily: "segoe ui symbol",
                }}
                className="mt-2 fw-bold"
              >
                Please Wait
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Ebooks;
