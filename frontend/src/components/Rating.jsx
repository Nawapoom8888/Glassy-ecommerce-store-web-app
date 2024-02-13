import React from "react";

import { IoMdStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

function Rating(props) {
  return (
    <div className="flex items-center">
      <span className="text-amber-500">
        {props.value >= 1 ? (
          <IoMdStar />
        ) : props.value >= 0.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>

      <span className="text-amber-500">
        {props.value >= 2 ? (
          <IoMdStar />
        ) : props.value >= 1.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>

      <span className="text-amber-500">
        {props.value >= 3 ? (
          <IoMdStar />
        ) : props.value >= 2.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>

      <span className="text-amber-500">
        {props.value >= 4 ? (
          <IoMdStar />
        ) : props.value >= 3.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>

      <span className="text-amber-500">
        {props.value >= 5 ? (
          <IoMdStar />
        ) : props.value >= 4.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
    </div>
  );
}

export default Rating;
