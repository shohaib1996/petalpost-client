"use client";

import { useGetPremiumUserStatsFromDBQuery } from "@/redux/features/auth/auth.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { TPremiumUserStats } from "@/types/comment.type";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ICustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,

}: ICustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartOfUsers = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const { data: premiumMember, isLoading } = useGetPremiumUserStatsFromDBQuery({
    token,
  });

  if (isLoading) {
    return <div className="min-h-[50vh] min-w-[50vw] flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>;
  }

  const premiumData = premiumMember.data;
  const mappedData = premiumData.map((item: TPremiumUserStats) => ({
    name: item.premiumStatus,
    value: item.count,
  }));

  return (
    <div>
      <div>
        <h1 className="text-center lg:text-3xl text-xl font-bold">Pie chart of Premium <br />and not premium member(Who got verified)</h1>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={mappedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {mappedData.map((entry: TPremiumUserStats, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartOfUsers;
