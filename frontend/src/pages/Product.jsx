import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import {
  useCreateReviewMutation,
  useGetProductDetailQuery,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeListener } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Metadata from "../components/Metadata";

import { IoIosArrowBack } from "react-icons/io";
import LoadingSpinner from "../components/LoadingSpinner";

function Product() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  console.log(product);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Metadata title={product.name} />
          <div className="grid w-full grid-cols-1 px-6 max-[962px]:items-center">
            <div className="mb-6 flex">
              <Link
                to={"/"}
                className="flex items-center gap-1 text-lg font-semibold transition-colors duration-150 hover:text-neutral-500"
              >
                <IoIosArrowBack />
                back
              </Link>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-12">
              <div className="h-96 w-96 overflow-hidden rounded-3xl">
                <img
                  src={product.image.replace("frontend\\public\\", "")}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex w-[30rem] flex-col">
                <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
                <h1 className="mb-4 text-2xl font-bold">฿{product.price}</h1>

                <div className="flex">
                  <Rating value={product.rating} />
                  <div className="relative top-[1px] ms-1 text-xs">
                    ({product.reviews.length})
                  </div>
                </div>

                <h1 className="mt-4 text-lg font-semibold">
                  {product.inStock > 0 ? "In Stock" : "Out Of Stock"}
                </h1>
                <input
                  type="number"
                  className="mt-2 w-16 border-2 border-neutral-300 ps-4"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                  className="my-6 max-w-[16rem] bg-neutral-800 px-12 py-3 font-medium text-gray-100 transition-colors duration-100 hover:bg-neutral-600"
                  disabled={product.inStock === 0}
                  onClick={() => {
                    addToCartHandler();
                    window.scrollTo(0, 0);
                  }}
                >
                  ADD TO CART
                </button>
                <p className="">{product.description}</p>
              </div>
            </div>

            <div className="mt-16">
              <div className="mb-4 border-b-2 border-neutral-200 pb-2">
                <h1 className="text-xl font-semibold">Reviews</h1>
              </div>

              {product.reviews.length === 0 && <div>No Reviews.</div>}

              <div className="mt-2 ">
                <div className="">
                  {product.reviews.map((review) => (
                    <div
                      className="w-full max-w-[34rem] border-b-2 border-neutral-200 py-4"
                      key={review._id}
                    >
                      <div className="flex justify-between">
                        <h1 className="font-bold">{review.name}</h1>
                        <Rating value={review.rating} />
                      </div>
                      <p className="text-sm font-medium">
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p className="mt-4">{review.comment}</p>
                    </div>
                  ))}
                  <div className="mt-20 max-w-[34rem]">
                    <h1 className="mb-2 text-xl font-semibold">
                      Write a comment
                    </h1>
                    {loadingProductReview && <LoadingSpinner />}
                    {userInfo ? (
                      <form className="w-full" onSubmit={submitHandler}>
                        <textarea
                          type="text"
                          name="comment"
                          className="h-[12rem] w-full resize-none rounded-xl bg-gray-100 px-4 py-3 outline-none"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />

                        <div className="mt-4 flex items-center">
                          <label htmlFor="rating" className="font-semibold">
                            Rating :
                          </label>
                          <select
                            name="rating"
                            id="rating"
                            value={rating}
                            className="ms-2 rounded-lg border-2 border-neutral-200"
                            onChange={(e) => setRating(e.target.value)}
                            required
                          >
                            <option value="">Select</option>
                            <option value="5">5 - Very Satisfied</option>
                            <option value="4">4 - Satisfied</option>
                            <option value="3">3 - Neutral</option>
                            <option value="2">2 - Dissatisfied</option>
                            <option value="1">1 - Very Dissatisfied</option>
                          </select>
                        </div>
                        <button
                          className="mt-3 bg-neutral-800 px-12 py-3 font-medium  text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
                          type="submit"
                          disabled={loadingProductReview}
                        >
                          SEND
                        </button>
                      </form>
                    ) : (
                      <div className="rounded-lg border-2 border-neutral-200 px-4 py-3">
                        <Link
                          to={"/login"}
                          className="underline hover:font-medium"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Login
                        </Link>{" "}
                        to write a review
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
