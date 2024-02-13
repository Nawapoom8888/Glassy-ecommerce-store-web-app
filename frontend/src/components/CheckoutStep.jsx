import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { Link } from "react-router-dom";

function CheckoutStep({ step1, step2, step3, step4 }) {
  return (
    <div className="mx-auto my-12 grid max-w-[36rem] grid-cols-1 gap-x-14 gap-y-5 sm:grid-cols-4">
      <div className="">
        {step1 ? (
          <Link
            className="flex flex-col items-center gap-3"
            to={"/cart"}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-800">
              <FaCartArrowDown className="text-3xl text-neutral-800" />
            </div>
            <h1 className="font-semibold text-neutral-800">Add To Cart</h1>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-300 ">
              <FaCartArrowDown className="text-3xl text-neutral-300" />
            </div>
            <h1 className="font-semibold text-neutral-300">Add To Cart</h1>
          </div>
        )}
      </div>
      <div className="">
        {step2 ? (
          <Link
            className="flex flex-col items-center gap-3"
            to={"/shipping"}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-800">
              <MdLocalShipping className="text-3xl text-neutral-800 " />
            </div>
            <h1 className="font-semibold text-neutral-800">Shipping</h1>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-300 ">
              <MdLocalShipping className="text-3xl text-neutral-300 " />
            </div>
            <h1 className="font-semibold text-neutral-300">Shipping</h1>
          </div>
        )}
      </div>
      <div className="">
        {step3 ? (
          <Link
            className="flex flex-col items-center gap-3"
            to={"/payment"}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-800">
              <MdPayment className="text-3xl text-neutral-800 " />
            </div>
            <h1 className="font-semibold text-neutral-800">Payment</h1>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-300 ">
              <MdPayment className="text-3xl text-neutral-300 " />
            </div>
            <h1 className="font-semibold text-neutral-300">Payment</h1>
          </div>
        )}
      </div>
      <div className="">
        {step4 ? (
          <Link
            className="flex flex-col items-center gap-3"
            to={"/placeorder"}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-800">
              <MdBorderColor className="text-3xl text-neutral-800 " />
            </div>
            <h1 className="font-semibold text-neutral-800">Place Order</h1>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-300 ">
              <MdBorderColor className="text-3xl text-neutral-300 " />
            </div>
            <h1 className="font-semibold text-neutral-300">Place Order</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutStep;
