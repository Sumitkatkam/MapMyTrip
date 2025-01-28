import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-10 flex items-center justify-center text-gray-500'>
        <Link to={"https://github.com/Sumitkatkam?tab=repositories"}>
        <h2>Created By Sumit Katkam</h2>
        </Link>
    </div>
  )
}

export default Footer