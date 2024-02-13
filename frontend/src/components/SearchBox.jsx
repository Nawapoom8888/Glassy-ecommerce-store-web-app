import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MdSearch } from "react-icons/md";

function SearchBox({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
    setIsOpen(!isOpen);
  };

  return (
    <form
      className="flex items-center justify-between overflow-hidden rounded-2xl bg-gray-100"
      onSubmit={submitHandler}
    >
      <input
        className="h-full w-[18rem] bg-gray-100 px-3 py-1 text-sm text-neutral-900 outline-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        autoComplete="off"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="pe-1">
        <MdSearch className="text-lg text-neutral-900" />
      </button>
    </form>
  );
}

export default SearchBox;
