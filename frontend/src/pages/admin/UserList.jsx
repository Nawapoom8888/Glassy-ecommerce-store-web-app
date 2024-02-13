import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

function UserList() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    console.log("delete user id =>", id);

    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("Deleted User Successfully!");
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-semibold">Users</h1>

      {loadingDelete && <LoadingSpinner />}

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <h1>Sorry, Some Error Happened!</h1>
      ) : (
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200 bg-neutral-200">
                <th className="py-2 text-start">User ID</th>
                <th className="py-2 text-start">Username</th>
                <th className="py-2 text-start">Email</th>
                <th className="py-2 text-start">Role</th>
                <th className="py-2 text-start"></th>
                <th className="py-2 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b-2 border-neutral-200">
                  <td className="py-2 pe-6">{user._id}</td>
                  <td className="py-2 pe-6">{user.name}</td>
                  <td className="py-2 pe-6">
                    <a href={`mailto:${user.email}`} className="">
                      {user.email}
                    </a>
                  </td>
                  <td className="py-2 pe-6">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="flex items-center gap-2">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button
                        className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="flex items-center justify-center rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-100 transition-colors duration-150 hover:bg-neutral-700"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
