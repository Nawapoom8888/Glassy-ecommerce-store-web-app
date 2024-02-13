import React, { useEffect, useState } from "react";
import CheckoutStep from "../components/CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

import { BsCreditCardFill } from "react-icons/bs";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="w-full items-center">
      <h1 className="text-center text-2xl font-semibold">Payment</h1>
      <CheckoutStep step1 step2 step3 />
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={submitHandler}
      >
        <div className="flex items-center">
          <input
            type="radio"
            className="cursor-pointer"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <BsCreditCardFill className="ms-4 text-2xl" />
          <label htmlFor="PayPal" className="ms-2">
            PayPal or Credit Card
          </label>
        </div>

        <button
          className="rounded-lg bg-neutral-800 px-6 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
          type="submit"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          CONTINUE TO PLACE ORDER
        </button>
      </form>
    </div>
  );
}

export default Payment;
