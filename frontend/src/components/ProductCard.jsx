import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  console.log(product.image);
  return (
    <div className="w-56">
      <Link to={`/product/${product._id}`}>
        <div className="h-56 w-full overflow-hidden rounded-xl transition-all duration-300 hover:brightness-50">
          <img
            src={product.image.replace("frontend\\public\\", "")}
            alt={product.name}
            className="h-full w-full object-cover"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </Link>

      <div className="my-4 flex w-full flex-col items-start">
        <Link
          to={`/product/${product._id}`}
          className="mb-1 overflow-hidden text-ellipsis font-bold hover:underline"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          {product.name}
        </Link>
        <div className="mb-3 flex">
          <Rating value={product.rating} />
          <div className="relative top-[1px] ms-1 text-xs">
            ({product.reviews.length})
          </div>
        </div>
        <div className="font-medium">฿{product.price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
