import React, { useContext } from "react";
import "./CouponPage.css";
import Swal from "sweetalert2"; // Import the Swal library
import { LoginContext } from "../context/ContextProvider";
import axios from "axios";

const CouponPage = () => {
  const { account, setAccount } = React.useContext(LoginContext);
  const coupons = [
    { id: 1, imageUrl: "https://rukminim2.flixcart.com/fk-p-www/500/500/promos/05/09/2022/b8777150-a49e-40f8-8d97-21a90470c7c8.png?q=50", price: "10 FGM", iconUrl: "./gem.png" },
    { id: 2, imageUrl: "https://rukminim2.flixcart.com/fk-p-www/500/500/promos/13/08/2023/1357173a-1c84-4521-b241-93dc570469aa.png?q=50", price: "20 FGM", iconUrl: "./gem.png" },
    { id: 3, imageUrl: "https://rukminim2.flixcart.com/fk-p-www/500/500/promos/01/08/2023/a0669428-600c-4e64-aeac-2a2d0412fc42.png?q=50", price: "10 FGM", iconUrl: "./gem.png" },
    { id: 4, imageUrl: "https://rukminim2.flixcart.com/fk-p-www/500/500/promos/25/07/2023/9f0a8b8e-1182-490b-b34f-4566a7e9777b.png?q=50", price: "30 FGM", iconUrl: "./gem.png" },
    // ... Add more coupons
  ];

  const handleCouponClick = async (couponId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/deductcoupen`, {
        method: "POST",
        body: JSON.stringify({ coupen_id: couponId, userId: account._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Coupon successfully fetched
        Swal.fire("Coupon Successfully Bought!", "", "success");
      } else {
        // Handle error response
        Swal.fire(
          "Coupon Error",
          "There was an issue buying the coupon.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="coupon-page">
      <h1 className="coupon-title">Exclusive Offers</h1>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon">
            <div className="coupon-details">
              <img
                src={coupon.imageUrl}
                alt={`Coupon ${coupon.id}`}
                className="coupon-image"
              />
            </div>
            <button
              className="coupon-button"
              onClick={() => handleCouponClick(coupon.id)}
            >
              <div className="coupon-content" style={{display:'flex', justifyContent:'center', alignItems:'center', marginRight:'0.5rem', paddingTop:'0.2rem',paddingBottom:'0.2rem'}}>
                <img
                  src={coupon.iconUrl}
                  alt="Coupon Icon"
                  className="coupon-icon"
                //   style={{}}
                />
                <span >{coupon.price}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponPage;
