import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import { HelmetProvider } from "react-helmet-async";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Shipping from "./pages/Shipping.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import UserList from "./pages/admin/UserList.jsx";
import UserEdit from "./pages/admin/UserEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "page/:pageNumber",
        element: <Home />,
      },
      {
        path: "search/:keyword",
        element: <Home />,
      },
      {
        path: "search/:keyword/page/:pageNumber",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/shipping",
            element: <Shipping />,
          },
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "/order/:id",
            element: <Order />,
          },
        ],
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "admin/order-list",
            element: <OrderList />,
          },
          {
            path: "admin/product-list",
            element: <ProductList />,
          },
          {
            path: "admin/product-list/page/:pageNumber",
            element: <ProductList />,
          },
          {
            path: "admin/product/:id/edit",
            element: <ProductEdit />,
          },
          {
            path: "admin/user-list",
            element: <UserList />,
          },
          {
            path: "admin/user/:id/edit",
            element: <UserEdit />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </HelmetProvider>
  </Provider>,
);
