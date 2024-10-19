"use client";

import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useUnfollowMutation,
} from "@/redux/features/followers/followers.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
}
interface Follower {
  _id: string;
  userId: User;
}
interface FollowingUser {
  _id: string;
  name: string;
  email: string;
}

const Followers = () => {
  const user = useTypedSelector((state) => state.auth.user);
  const token = useTypedSelector((state) => state.auth.token);
  const [unfollow] = useUnfollowMutation();

  const userId = user?.id;
  const { data: followers, isLoading } = useGetFollowersQuery({
    token,
    userId,
  });
  const {
    data: followings,
    isLoading: followingLoading,
    refetch,
  } = useGetFollowingsQuery({ token, userId },  { skip: !followers?.data?.length } );

  useEffect(() => {
    if (followers?.data?.length && userId && token) {
      refetch();
    }
  }, [followers, userId, token, refetch]);

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (followingLoading) {
    return <p>Loading....</p>;
  }



  const handleUnFollow = async (id: string) => {
    console.log(id);

    const updatedData = {
      userId: user?.id,
      followingId: id,
    };
    try {
      const res = await unfollow({ token, updatedData });
      if (res.data.success === true) {
        toast.success("You have successfully unfollowed");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto">
      <h1 className=" text-xl lg:text-4xl font-bold text-center">
        Followers and Following
      </h1>
      <div className="flex justify-around items-center mt-12 flex-col lg:flex-row">
        <div className="space-y-5">
          <h1 className="font-bold lg:text-2xl text-xl">Follower User</h1>
          <div>
            {followers?.data.map((follower: Follower) => (
              <p
                className="w-[250px] border-2 p-1 rounded-md m-1"
                key={follower._id}
              >
                {follower.userId.name}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <h1 className="font-bold lg:text-2xl text-xl lg:mt-0 mt-5">
            Following User
          </h1>
          <div>
            {followings?.data.map((following: FollowingUser) => (
              <div key={following._id}>
                <div className="flex gap-2 justify-center items-center">
                  <p className="w-[250px] border-2 p-1 rounded-md m-1">
                    {following.name}
                  </p>
                  <button
                    onClick={() => handleUnFollow(following._id)}
                    className="btn btn-sm bg-[#2DA64D] hover:bg-green-500 text-white"
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
