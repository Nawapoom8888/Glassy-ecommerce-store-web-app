import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";

import { IoCartOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { resetCart } from "../slices/cartSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-16 w-full bg-neutral-800 text-gray-100">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          to={"/"}
          className="text-2xl font-semibold"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Glassy
        </Link>
        <div className="flex justify-between">
          <div className="flex">
            <div className="hidden lg:flex lg:items-center">
              <SearchBox />
              <Link
                to={"/cart"}
                className="ms-5 flex"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <IoCartOutline className="text-3xl" />
                <div className="relative -left-[10px] -top-[5px] flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-neutral-800">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </div>
              </Link>
              {userInfo ? (
                <>
                  {userInfo && userInfo.isAdmin ? (
                    <>
                      <Link
                        to={"/admin/product-list"}
                        className="ms-7"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Products
                      </Link>
                      <Link
                        to={"/admin/order-list"}
                        className="mx-7"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Orders
                      </Link>
                      <Link
                        to={"/admin/user-list"}
                        className="me-7"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Users
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={"/profile"}
                      className="me-4 ms-3 rounded-lg border-2 border-gray-100 px-3 py-1 transition-colors duration-200 hover:bg-gray-100 hover:text-neutral-900"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      {userInfo.name}
                    </Link>
                  )}
                  <Link
                    to={"/login"}
                    className="flex items-center"
                    onClick={() => {
                      logoutHandler();
                      window.scrollTo(0, 0);
                    }}
                  >
                    <IoLogInOutline className="text-3xl" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="ms-3"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    login
                  </Link>
                  <Link
                    to={"/signup"}
                    className="ms-6 rounded-lg border-2 border-gray-100 px-3 py-1 transition-colors duration-200 hover:bg-gray-100 hover:text-neutral-900"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    signup
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="">
              <LuMenu className="text-4xl" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full bg-neutral-800 px-6 py-6 lg:hidden">
          <div className="mx-auto mb-5 max-w-[30rem]">
            <SearchBox isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className="mx-auto flex max-w-[30rem] flex-col items-center gap-5">
            <Link
              to={"/cart"}
              className="flex items-center justify-center"
              onClick={() => {
                setIsOpen(!isOpen);
                window.scrollTo(0, 0);
              }}
            >
              <div className="me-2">Cart</div>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-neutral-800">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </div>
            </Link>
            {userInfo ? (
              <>
                {userInfo && userInfo.isAdmin ? (
                  <>
                    <Link
                      to={"/admin/product-list"}
                      className=""
                      onClick={() => {
                        setIsOpen(!isOpen);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Products
                    </Link>
                    <Link
                      to={"/admin/order-list"}
                      className=""
                      onClick={() => {
                        setIsOpen(!isOpen);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Orders
                    </Link>
                    <Link
                      to={"/admin/user-list"}
                      className=""
                      onClick={() => {
                        setIsOpen(!isOpen);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Users
                    </Link>
                  </>
                ) : (
                  <Link
                    to={"/profile"}
                    className="me-4 ms-3 rounded-lg border-2 border-gray-100 px-3 py-1 transition-colors duration-200 hover:bg-gray-100 hover:text-neutral-900"
                    onClick={() => {
                      setIsOpen(!isOpen);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {userInfo.name}
                  </Link>
                )}
                <Link
                  to={"/login"}
                  className="flex items-center"
                  onClick={() => {
                    logoutHandler();
                    setIsOpen(!isOpen);
                    window.scrollTo(0, 0);
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className=""
                  onClick={() => {
                    setIsOpen(!isOpen);
                    window.scrollTo(0, 0);
                  }}
                >
                  login
                </Link>
                <Link
                  to={"/signup"}
                  className="rounded-lg border-2 border-gray-100 px-3 py-1 transition-colors duration-200 hover:bg-gray-100 hover:text-neutral-900"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    window.scrollTo(0, 0);
                  }}
                >
                  signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
