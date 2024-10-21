import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div>
            <Link href="/">
              <button className="btn cursor-pointer bg-[#2DA64D] hover:bg-green-800 text-white font-bold w-full">
                Petal Post
              </button>
            </Link>
          </div>
          <div className="mt-10">
            <Link href="/dashboard/all-user">
              <li className="text-xl font-bold btn bg-transparent border-0 w-full">User Management</li>
            </Link>
            <Link href="/dashboard/all-post">
              <li className="text-xl font-bold btn bg-transparent border-0 w-full">Content Moderation</li>
            </Link>
            <Link href="/dashboard">
              <li className="text-xl font-bold btn bg-transparent border-0 w-full">Analytics</li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
