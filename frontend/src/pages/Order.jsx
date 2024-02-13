import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

function Order() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "THB",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Pay Successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Pay Successfully!");
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliveredOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : error ? (
    <h1>Sorry, Some Error Happened!</h1>
  ) : (
    <div className="border-test mx-auto grid max-w-[60rem] grid-cols-1 gap-y-16 sm:grid-cols-2">
      <div className="border-test me-auto max-w-full px-2">
        <div className="overflow-x-auto border-b-2 border-neutral-200 py-4">
          <h1 className="mb-2 text-start text-lg font-bold">Shipping</h1>
          <p className="flex">
            <div className="font-semibold">Order ID : &nbsp;</div>
            {order._id}
          </p>
          <p className="flex">
            <div className="font-semibold">Name : &nbsp;</div>
            {order.user.name}
          </p>
          <p className="flex">
            <div className="font-semibold">Email : &nbsp;</div>
            {order.user.email}
          </p>
        </div>

        <div className="border-b-2 border-neutral-200 py-4">
          <h1 className="mb-2 text-start text-lg font-bold">Deliver</h1>
          <p className="flex items-center gap-2">
            {order.isDelivered ? (
              <div className="w-full rounded-lg bg-green-200 px-3 py-2 text-sm font-semibold text-green-800">
                Delivered
              </div>
            ) : (
              <div className="w-full rounded-lg bg-red-200 px-3 py-2 text-sm font-semibold text-red-800">
                Not Delivered
              </div>
            )}
          </p>
        </div>

        <div className="border-b-2 border-neutral-200 py-4">
          <h1 className="mb-2 text-start text-lg font-bold">Payment</h1>
          <h1 className="">
            <p className="mb-2 flex">
              <div className="font-semibold">Method : &nbsp;</div>
              {order.paymentMethod}
            </p>
            <p className="">
              {order.isPaid ? (
                <div className="w-full rounded-lg bg-green-200 px-3 py-2 text-sm font-semibold text-green-800">
                  Paid On {order.paidAt}
                </div>
              ) : (
                <div className="w-full rounded-lg bg-red-200 px-3 py-2 text-sm font-semibold text-red-800">
                  Not Paid
                </div>
              )}
            </p>
          </h1>
        </div>

        <div className="border-b-2 border-neutral-200 py-4">
          <h1 className="mb-2 text-start text-lg font-bold">Order</h1>
          <div className="">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 [&:not(:last-child)]:mb-5"
              >
                <img
                  src={item.image.replace("frontend\\public\\", "")}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="text-sm">
                  <p className="font-bold">{item.name}</p>
                  <p className="">Price : ฿{item.price}</p>
                  <p className="">Amount : {item.quantity}</p>
                  <p className="">
                    Total Price : ฿{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-test">
        <div className="mx-auto flex max-w-[16rem] flex-col gap-4 self-start rounded-lg border-2 border-neutral-200 p-3">
          <h1 className="text-center text-lg font-bold">Order Summary</h1>
          <div className="">
            <h1 className="flex justify-between font-bold">
              <div className="">Items : </div>฿{order.itemsPrice}
            </h1>
            <h1 className="flex justify-between font-bold">
              <div className="">Shipping : </div>฿{order.shippingPrice}
            </h1>
            <h1 className="flex justify-between font-bold">
              <div className="">Tax : </div>฿{order.taxPrice}
            </h1>
            <h1 className="flex justify-between border-t-2 pt-4 font-bold">
              <div className="">Total : </div>฿{order.totalPrice}
            </h1>
          </div>
          <div className="">
            {!order.isPaid && (
              <div className="">
                <div>
                  {loadingPay && <LoadingSpinner />}
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="relative z-0">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </div>
              </div>
            )}
            {loadingDeliver && <LoadingSpinner />}
            <div className="">
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    className="w-full rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
                    onClick={() => {
                      deliveredOrderHandler();
                      window.scrollTo(0, 0);
                    }}
                  >
                    Mark As Delivered
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
