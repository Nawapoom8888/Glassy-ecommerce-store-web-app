import React, { useState } from "react";
import { Link } from "react-router-dom";

function Pagination({ pages, page, isAdmin = false, keyword = "" }) {
  const [pageNum, setPageNum] = useState(1);

  return (
    <div className="mt-24">
      <div className="flex justify-center gap-1">
        {pages > 1 &&
          [...Array(pages).keys()].map((x) => (
            <Link
              className={`flex h-10 w-10 items-center justify-center border-2 border-neutral-800 ${
                pageNum === x + 1 ? "bg-neutral-800 text-gray-100" : ""
              } `}
              onClick={() => {
                setPageNum(x + 1);
              }}
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/product-list/page/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Pagination;
