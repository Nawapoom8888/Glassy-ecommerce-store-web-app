import React from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-semibold">Orders</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <h1>Sorry, Some Error Happened!</h1>
      ) : (
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200 bg-neutral-200">
                <th className="py-2 text-start">Order ID</th>
                <th className="py-2 text-start">User</th>
                <th className="py-2 text-start">Date</th>
                <th className="py-2 text-start">Total</th>
                <th className="py-2 text-start">Payment Status</th>
                <th className="py-2 text-start">Deliver Status</th>
                <th className="py-2 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b-2 border-neutral-200">
                  <td className="py-2 pe-6">{order._id}</td>
                  <td className="py-2 pe-6">{order.user && order.user.name}</td>
                  <td className="py-2 pe-6">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 pe-6">฿{order.totalPrice}</td>
                  <td className="py-2 pe-6">
                    {order.isPaid ? (
                      <div className="text-green-600">
                        {order.paidAt.substring(0, 10)}
                      </div>
                    ) : (
                      <p className="text-red-600">Not Paid</p>
                    )}
                  </td>
                  <td className="py-2 pe-6">
                    {order.isDelivered ? (
                      <div className="text-green-600">
                        {order.deliveredAt.substring(0, 10)}
                      </div>
                    ) : (
                      <p className="text-red-600">Not Delivered</p>
                    )}
                  </td>
                  <td className="py-2 pe-6">
                    <Link to={`/order/${order._id}`}>
                      <button
                        className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-[2px] text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderList;
