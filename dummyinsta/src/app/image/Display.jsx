"use client"

import React from 'react'

const DisplayComments = ({Email,comm}) => {
  return (
    <>
      <div className='text-fuchsia-700'>{Email}</div>
      <div>
      <p className=' text-balance text-slate-700'>{comm}</p>
      </div>
    </>
  )
}

export default DisplayComments