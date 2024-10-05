"use client"

import { useGetAllPostQuery } from '@/redux/features/posts/posts.api'
import React from 'react'

const AllPosts = () => {
    const {data} = useGetAllPostQuery(undefined)

    console.log(data);
    
  return (
    <div>AllPosts</div>
  )
}

export default AllPosts