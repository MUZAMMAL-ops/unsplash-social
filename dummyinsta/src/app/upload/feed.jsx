'use client'

import React from 'react'
import Link from 'next/link'
const Feed = () => {
  return (
    <div className='flex justify-end mt-4 mr-8'>
         <Link href={'/image'}>feed</Link>
    </div>
  )
}

export default Feed