import React from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

import { IoCreateOutline } from "react-icons/io5";
import LoadingSpinner from "../../components/LoadingSpinner";

function ProductList() {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    console.log("Delete =>", id);
    if (window.confirm("Do you sure to delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Do you sure you want to add a new product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Deleted Product Successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-6 text-center text-2xl font-semibold">Products</h1>
      <button
        className="mb-6 flex items-center gap-2 self-center rounded-md bg-neutral-800 px-3 py-1 text-gray-100 transition-colors duration-150 hover:bg-neutral-700 md:self-end"
        onClick={createProductHandler}
      >
        Add Product
        <IoCreateOutline className="relative -top-[1px] text-xl" />
      </button>
      {loadingCreate && <LoadingSpinner />}
      {loadingDelete && <LoadingSpinner />}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <h1>Sorry, Some Error Happened!</h1>
      ) : (
        <>
          <div className="w-full overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200 bg-neutral-200">
                  <th className="py-2 text-start">Product ID</th>
                  <th className="py-2 text-start">Name</th>
                  <th className="py-2 text-start">Brand</th>
                  <th className="py-2 text-start">Category</th>
                  <th className="py-2 text-start">Price</th>
                  <th className="py-2 text-start"></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b-2 border-neutral-200"
                  >
                    <td className="py-2 pe-6">{product._id}</td>
                    <td className="py-2 pe-6">{product.name}</td>
                    <td className="py-2 pe-6">{product.brand}</td>
                    <td className="py-2 pe-6">{product.category}</td>
                    <td className="py-2 pe-6">฿{product.price}</td>
                    <td className="flex items-center gap-2 py-2">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button
                          className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
}

export default ProductList;
