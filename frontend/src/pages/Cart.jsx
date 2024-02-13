import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

import { BsCartXFill, BsTrash3 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const addToCartHandler = async (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="border-test flex w-full flex-col items-center">
          <div className="mb-12 flex flex-col items-center gap-5">
            <BsCartXFill className="relative -left-1 text-7xl text-neutral-600" />
            <h1 className="text-center text-xl text-neutral-600">
              No Item in the cart.
            </h1>
          </div>

          <Link
            to={"/"}
            className="flex items-center gap-1 rounded-lg bg-neutral-800 px-6 py-2 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <IoIosArrowBack />
            GO BACK
          </Link>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center gap-x-10 gap-y-5 border-b-2 border-neutral-200 py-5 md:flex-row"
            >
              <div className="h-28 w-28 overflow-hidden rounded-2xl">
                <img
                  src={item.image.replace("frontend\\public\\", "")}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <Link
                to={`/product/${item._id}`}
                className="w-[60%] text-center font-bold hover:underline md:text-start"
              >
                {item.name}
              </Link>

              <h1 className="w-16 font-bold">฿{item.price}</h1>

              <div className="flex items-center gap-x-10 gap-y-5">
                <input
                  type="number"
                  className="w-16 rounded-md border-2 border-neutral-200 px-2 py-1"
                  value={item.quantity}
                  onChange={(e) => {
                    addToCartHandler(item, Number(e.target.value));
                  }}
                />
                <button
                  className="flex items-center gap-2 rounded-md border-2 border-neutral-200 px-2 py-2 transition-colors duration-150 hover:bg-neutral-200"
                  onClick={() => {
                    removeFromCartHandler(item._id);
                  }}
                >
                  <BsTrash3 />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-12 flex justify-center md:justify-end">
            <div className="flex w-60 flex-col gap-4 rounded-lg border-2 border-neutral-200 p-3">
              <div className="flex justify-between font-bold">
                <div className="">Total : </div>฿
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </div>
              <button
                className="w-full rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
                onClick={() => {
                  checkoutHandler();
                  window.scrollTo(0, 0);
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
