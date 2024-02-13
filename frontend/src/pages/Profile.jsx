import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const response = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(response));
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log(orders);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        <div className="border-test mx-auto mb-12 flex max-w-[24rem] flex-col rounded-2xl bg-gray-200 px-5 py-10 sm:px-10">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            My Profile
          </h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-stretch"
          >
            <div className="mb-4 flex flex-col">
              <label htmlFor="name" className="mb-1 font-medium">
                Name
              </label>
              <input
                className="rounded-lg px-3 py-2 outline-none"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email
              </label>
              <input
                className="rounded-lg px-3 py-2 outline-none"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium">
                New Password
              </label>
              <input
                className="rounded-lg px-3 py-2 outline-none"
                type="password"
                id="password"
                value={password}
                placeholder="Enter Your New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="confirmPassword" className="mb-1 font-medium">
                Confirm New Password
              </label>
              <input
                className="rounded-lg px-3 py-2 outline-none"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Your New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-6 rounded-lg bg-neutral-800 px-6 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
              type="submit"
              onClick={() => window.scrollTo(0, 0)}
            >
              Update Profile
            </button>
            {loadingUpdateProfile && <LoadingSpinner />}
          </form>
        </div>
      </div>

      <div className="border-test w-full overflow-auto">
        <h1 className="mb-6 text-center text-2xl font-semibold">My Orders</h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1>{error?.data?.message || error.error}</h1>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200 bg-neutral-200">
                <th className="py-2 pe-6 text-start">Order ID</th>
                <th className="py-2 pe-6 text-start">Date</th>
                <th className="py-2 pe-6 text-start">Total</th>
                <th className="py-2 pe-6 text-start">Payment Status</th>
                <th className="py-2 pe-6 text-start">Deliver Status</th>
                <th className="py-2 pe-6 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b-2 border-neutral-200">
                  <td className="py-2 pe-6">{order._id}</td>
                  <td className="py-2 pe-6">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 pe-6">฿{order.totalPrice}</td>
                  <td className="py-2 pe-6">
                    {order.isPaid ? (
                      <p className="text-green-600">
                        {order.paidAt.substring(0, 10)}
                      </p>
                    ) : (
                      <p className="text-red-600">Not Paid</p>
                    )}
                  </td>
                  <td className="py-2 pe-6">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <p className="text-red-600">Not Delivered</p>
                    )}
                  </td>
                  <td className="py-2 pe-6">
                    <Link to={`/order/${order._id}`}>
                      <button
                        className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-2 text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
