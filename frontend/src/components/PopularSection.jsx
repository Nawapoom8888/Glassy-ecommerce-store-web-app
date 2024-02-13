import React from "react";
import { useGetPopularProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";

import { IoMdStar } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";

function PopularSection() {
  const { data: products, isLoading, error } = useGetPopularProductsQuery();
  return isLoading ? (
    <LoadingSpinner />
  ) : error ? (
    <h1 className="">Sorry, Some Error Happened!</h1>
  ) : (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          to={`product/${product._id}`}
          key={product._id}
          className="group relative h-[30rem]"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={product.image.replace("frontend\\public\\", "")}
            alt=""
            className="h-full w-full  object-cover transition-all duration-300 group-hover:brightness-50"
          />
          <div className="absolute top-0 m-4 flex items-center gap-1 bg-neutral-800 px-3 py-1 text-gray-100">
            <IoMdStar className="relative -top-[1px] text-xl text-amber-500" />
            {product.rating}
          </div>
          <div className="absolute bottom-0 left-1/2 my-4 w-[90%] -translate-x-1/2 bg-neutral-800 px-3 py-2 text-center font-medium text-gray-100">
            {product.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PopularSection;
