import React from 'react'
import Search from "../components/Search";

const Filters = () => {
  return (
    <div className="w-full h-12 border-2 border-gray-100 rounded-lg
    flex items-center justify-between relative
    ">
        <div><Search/></div>
        <div>currency</div>
        <div>sorting</div>

    </div>
  )
}

export default Filters