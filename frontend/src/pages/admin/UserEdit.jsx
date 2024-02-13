import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoIosArrowBack } from "react-icons/io";

function UserEdit() {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  console.log(user);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      refetch();
      toast.success("Updated User Successfully!");
      navigate("/admin/user-list");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex">
        <Link
          to={"/admin/user-list"}
          className="flex items-center gap-1 text-lg font-semibold transition-colors duration-150 hover:text-neutral-500"
        >
          <IoIosArrowBack />
          back
        </Link>
      </div>
      <div className="">
        {loadingUpdate && <LoadingSpinner />}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1>Sorry, Some Error Happened!</h1>
        ) : (
          <form
            className="mx-auto flex max-w-[28rem] flex-col rounded-2xl bg-gray-200 px-5 py-16 min-[300px]:px-10 min-[450px]:px-16"
            onSubmit={submitHandler}
          >
            <h1 className="mb-6 text-center text-xl font-semibold ">
              Edit User
            </h1>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="name" className="mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="role" className="mb-1 font-medium">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </select>
            </div>
            <button
              className="mt-10 w-full rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
              type="submit"
              onClick={() => window.scrollTo(0, 0)}
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserEdit;
