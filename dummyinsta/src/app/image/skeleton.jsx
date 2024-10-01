"use client"

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Skeleton1 = () => {
  return (
    <>
        <div className="flex flex-col p-4  rounded-md shadow-sm max-w-lg ml-120">
  {/* Header: Profile Picture and Username */}
  <div className="flex items-center space-x-4 mb-4">
    {/* Profile Picture */}
    <Skeleton className="rounded-full" height={50} width={50} />
    {/* Username */}
    <Skeleton className="rounded" height={20} width={120} />
  </div>

  {/* Image Section */}
  <Skeleton className="rounded-md" height={300} width={400} />

  {/* Footer: Like, Comment, and Caption */}
  <div className="flex flex-col mt-4 space-y-2">
    {/* Like & Comment Bar */}
    <Skeleton className="rounded" height={20} width={60} />
    <Skeleton className="rounded" height={20} width={80} />

    {/* Caption */}
    <Skeleton className="rounded" height={20} width={300} />
    <Skeleton className="rounded" height={20} width={250} />
  </div>
</div>

    </>
  )
}

export default Skeleton1