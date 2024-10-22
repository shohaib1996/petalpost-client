import React from "react";
import dynamic from "next/dynamic";

const BarChartOfTopAuthor = dynamic(
  () => import("../BarChart/BarChartOfTopAuthor"),
  { ssr: false }
);
const PieChartOfUsers = dynamic(() => import("../PieChart/PieChartOfUsers"), {
  ssr: false,
});

const DashboardComponent = () => {
  return (
    <div className="flex items-center justify-center mt-14 lg:p-10 p-5 lg:flex-row flex-col">
      <div className="flex-1">
        <BarChartOfTopAuthor />
      </div>
      <div className="flex-1" style={{ width: "100%", height: 400 }}>
        <PieChartOfUsers />
      </div>
    </div>
  );
};

export default DashboardComponent;
