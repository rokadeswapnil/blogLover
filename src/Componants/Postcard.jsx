    import React from 'react'
    import { Link } from 'react-router-dom'
    const Postcard = ({$id,title,featuredImage}) => {
      return (
         <div className="w-60  bg-white shadow-md rounded py-3 grid grid-flow-row">
           <img className="w-full lg:h-40 sm:h-36 bg-cover" src={featuredImage} alt={title}/>
         <div className="px-6 py-4 overflow-hidden border-b-2 shadow-md">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="text-center mt-4 mb-6">
                    <Link to={`/post/${$id}`}> <button className="bg-blue-500 border-none hover:bg-blue-700 text-white font-bold py-2 outline-none px-4 rounded-full">
                        Read More
                    </button></Link>
               </div>
        </div>
      )
    }
    
    export default Postcard
    