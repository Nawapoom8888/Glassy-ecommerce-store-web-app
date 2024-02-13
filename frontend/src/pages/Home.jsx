import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PopularSection from "../components/PopularSection";
import Metadata from "../components/Metadata";
import { IoIosArrowBack } from "react-icons/io";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="w-full">
          {!keyword ? (
            <div className="mb-12 grid w-full grid-cols-1">
              <div
                className="mb-12 flex h-[30rem] w-full items-center justify-start rounded-2xl bg-cover bg-center p-6 min-[300px]:p-12"
                style={{
                  backgroundImage: "url(assets/hero-bg.jpg)",
                }}
              >
                <div className="grid w-[28rem] grid-cols-1 text-center sm:text-start">
                  <h1 className="mb-4 text-2xl font-bold tracking-normal text-white shadow-black drop-shadow-xl min-[300px]:text-3xl min-[400px]:text-4xl">
                    Welcome to Glassy
                  </h1>
                  <h3 className="min-[300px]:text-md text-sm text-white shadow-black drop-shadow-xl min-[400px]:text-xl">
                    Discover premium sunglasses that combine fashion and
                    function for the perfect accessory to elevate your look.
                  </h3>
                  <a href="#products" className="">
                    <button className="mb-6 mt-10 rounded-md bg-neutral-800 px-6 py-3 text-sm font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700 min-[400px]:text-base">
                      SHOP NOW
                    </button>
                  </a>
                </div>
              </div>
              <h1 className="mb-8 text-center text-2xl font-semibold">
                Our Top Products
              </h1>
              <div className="">
                <PopularSection />
              </div>
            </div>
          ) : (
            <div className="mb-6 flex">
              <Link
                to={"/"}
                className="flex items-center gap-1 text-lg font-semibold transition-colors duration-150 hover:text-neutral-500"
              >
                <IoIosArrowBack />
                back
              </Link>
            </div>
          )}

          <h1 className="mb-8 text-center text-2xl font-semibold" id="products">
            All Our Products
          </h1>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {data.products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
          {data.products.length === 0 && (
            <h1 className="h-[90vh] text-center">No Result</h1>
          )}
          <Pagination
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
