import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutStep from "../components/CheckoutStep";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold">
        Shipping Information
      </h1>
      <CheckoutStep step1 step2 />
      <form
        onSubmit={submitHandler}
        className="mx-auto flex max-w-[28rem] flex-col rounded-2xl bg-gray-200 px-5 py-16 min-[300px]:px-10 min-[450px]:px-16"
      >
        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="address" className="mb-1 font-medium">
            Address
          </label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your address"
            id="address"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="city" className="mb-1 font-medium">
            City (or Province)
          </label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your address"
            id="city"
            name="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="postalCode" className="mb-1 font-medium">
            PostalCode
          </label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your address"
            id="postalCode"
            name="postalCode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="mb-12 flex w-full flex-col">
          <label htmlFor="country" className="mb-1 font-medium">
            Country
          </label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your address"
            id="country"
            name="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          className="w-full rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
          type="submit"
          onClick={() => window.scrollTo(0, 0)}
        >
          CONTINUE TO PAYMENT
        </button>
      </form>
    </div>
  );
}

export default Shipping;
