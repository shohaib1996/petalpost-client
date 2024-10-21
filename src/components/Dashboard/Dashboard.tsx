import React from "react";
import dynamic from "next/dynamic";

const BarChartOfTopAuthor = dynamic(() => import("../BarChart/BarChartOfTopAuthor"), { ssr: false });

const DashboardComponent = () => {
  return (
    <div>
      <BarChartOfTopAuthor />
    </div>
  );
};

export default DashboardComponent;
