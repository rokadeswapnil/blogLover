import React from 'react'
const Logo = ({width="100px"}) => {
  return (
    <div className=" w-full h-full text-xl font-semibold whitespace-nowrap dark:text-black flex justify-center items-center ml-8 drop-shadow-2xl" >
      <img src="https://www.svgrepo.com/show/22752/ads.svg" alt='logo' width={width} className='bg-blend-screen drop-shadow-lg mr-1 '/>
      <h1 className="font-bold drop-shadow">Blog Lover</h1>
    </div>
  )
}

export default Logo
