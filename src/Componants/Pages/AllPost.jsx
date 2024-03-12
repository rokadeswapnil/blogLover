import React,{useState,useEffect} from 'react'
import appWriteService from '../../appwrite/config'
import { PostCard } from '../index'
const AllPost = () => {
    const [post,setPost] = useState([])
    useEffect(()=>{
        appWriteService.getPosts([])
        .then((post)=>{
            if(post){
                setPost(post.documents);
            }
        })
    },[])

  return (
        <div>
            <div div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {post.map((post)=>(
                    <div key={post.$id} className='p-2 '>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
            </div>
  )
}

export default AllPost
