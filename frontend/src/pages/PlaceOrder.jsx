import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CheckoutStep from "../components/CheckoutStep";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

import { MdLocalShipping } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import LoadingSpinner from "../components/LoadingSpinner";

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
      console.log(err.error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-semibold">Place Order</h1>
      <CheckoutStep step1 step2 step3 step4 />
      <div className="border-test mx-4 grid grid-cols-1 gap-x-32 gap-y-16 sm:grid-cols-2">
        <div className="border-test">
          <div className="border-b-2 border-neutral-200 py-4">
            <h1 className="mb-2 text-start text-lg font-bold">Shipping</h1>
            <p className="flex items-center">
              <MdLocalShipping className="me-2 text-2xl" />
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="border-b-2 border-neutral-200 py-4">
            <h1 className="mb-2 text-start text-lg font-bold">Payment</h1>
            <p className="flex items-center">
              <MdPayment className="me-2 text-2xl" />
              {cart.paymentMethod}
            </p>
          </div>
          <div className="border-b-2 border-neutral-200 py-4">
            <h1 className="mb-2 text-start text-lg font-bold">Order Items</h1>
            {cart.cartItems.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <div className="">
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-5 min-[300px]:flex-row [&:not(:last-child)]:mb-5"
                  >
                    <img
                      src={item.image.replace("frontend\\public\\", "")}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="text-sm">
                      <Link
                        to={`/product/${item._id}`}
                        className="font-bold hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="">Price : ฿{item.price}</p>
                      <p className="">Amount : {item.quantity}</p>
                      <p className="">
                        Total Price : ฿{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-test w-full">
          <div className="mx-auto flex max-w-[16rem] flex-col gap-4 self-end rounded-lg border-2 border-neutral-200 p-3 sm:ms-auto">
            <h1 className="text-center text-lg font-bold">Order Summary</h1>
            <div className="flex justify-between font-bold">
              <p className="">Items :</p>฿{cart.itemsPrice}
            </div>
            <div className="flex justify-between font-bold">
              <p className="">Shipping Fee :</p>฿{cart.shippingPrice}
            </div>
            <div className="flex justify-between font-bold">
              <p className="">Tax (VAT7%) :</p>฿{cart.taxPrice}
            </div>
            <div className="flex justify-between border-t-2 pt-4 font-bold">
              <p className="">Total :</p>฿{cart.totalPrice}
            </div>

            <div className="">{error && <p>{error}</p>}</div>

            <button
              className="w-full rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
              disabled={cart.cartItems === 0 || isLoading}
              onClick={() => {
                placeOrderHandler();
                window.scrollTo(0, 0);
              }}
            >
              Place Order
            </button>
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
