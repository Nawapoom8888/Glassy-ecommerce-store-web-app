import React, { useEffect, useState } from "react";
import { usePayOrderMutation } from "../../slices/ordersApiSlice";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoIosArrowBack } from "react-icons/io";

function ProductEdit() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");

  // Fetch the product details when this component mounts.
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  console.log(product);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setInStock(product.inStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      inStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Update Product Successfully!");
      navigate("/admin/product-list");
    }
  };

  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex">
        <Link
          to={"/admin/product-list"}
          className="flex items-center gap-1 text-lg font-semibold transition-colors duration-150 hover:text-neutral-500"
        >
          <IoIosArrowBack />
          back
        </Link>
      </div>
      <div className="mb-1 font-medium">
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
            <h1 className="mb-6 text-center text-xl font-semibold">
              Edit Product
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
              <label htmlFor="image" className="mb-1 font-medium">
                Image
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
              <input
                type="file"
                className="mt-4"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingSpinner />}
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="price" className="mb-1 font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="brand" className="mb-1 font-medium">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="category" className="mb-1 font-medium">
                Category
              </label>
              <input
                type="text"
                id="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="inStock" className="mb-1 font-medium">
                In Stock
              </label>
              <input
                type="number"
                id="inStock"
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none"
              />
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label htmlFor="description" className="mb-1 font-medium">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[14rem] resize-none overflow-auto rounded-lg px-3 py-2 outline-none"
              />
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

export default ProductEdit;
