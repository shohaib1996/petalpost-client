"use client";

import {
  useGetAllUserQuery,
  useUserRoleUpdateMutation,
} from "@/redux/features/auth/auth.api";

import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { TTableUser } from "@/types/comment.type";
import React from "react";
import toast from "react-hot-toast";

const AllUser = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const [updateRole] = useUserRoleUpdateMutation();

  const { data, isLoading, refetch } = useGetAllUserQuery({ token });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const allUser = data?.data || [];

  const handleAdmin = async (id: string) => {
    const updateInfo = {
      role: "admin",
    };

    try {
      const res = await updateRole({ token, updateInfo, userId: id });
      console.log(res);
      if (res.data.success === true) {
        toast.success("Update the role successfully");
        refetch();
      }
    } catch (error) {}
  };

  const handleUser = async (id: string) => {
    const updateInfo = {
      role: "user",
    };

    try {
      const res = await updateRole({ token, updateInfo, userId: id });
      if (res.data.success === true) {
        toast.success("Update the role successfully");
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center mt-8 font-bold text-3xl">All Users</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>isPremium</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allUser.map((user: TTableUser, index: number) => {
            console.log(user.isPremium);

            return (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isPremium ? "true" : "false"}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleUser(user._id)}
                      className="btn btn-sm "
                    >
                      Make User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-sm "
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
