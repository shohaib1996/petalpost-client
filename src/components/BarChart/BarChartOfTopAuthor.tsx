"use client";

import { useGetTopAuthorQuery } from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { AuthorUpvote } from "@/types/comment.type";
import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];



const BarChartOfTopAuthor = () => {
  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const token = useTypedSelector((state) => state.auth.token);

  const { data: topAuthor, isLoading } = useGetTopAuthorQuery({ token });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const topAuthorData = topAuthor.data;

  const  mappedData= topAuthorData.map((author: AuthorUpvote) => ({
    name: (author.authorDetails?.name as string).split(" ")[0],
    uv: author.totalUpvotes, // Upvotes
    pv: Math.floor(Math.random() * 5000) + 1000,
    amt: Math.floor(Math.random() * 5000) + 2000,
  }));

  return (
    <BarChart
      width={500}
      height={300}
      data={mappedData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="uv"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {mappedData.map((entry: AuthorUpvote, index: number) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartOfTopAuthor;
