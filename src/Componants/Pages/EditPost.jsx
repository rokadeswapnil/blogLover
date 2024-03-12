import React,{useState, useEffect} from 'react'
import {Container,PostForm} from '../index'
import appWriteServices from '../../appwrite/config'
import { useParams,useNavigate } from 'react-router-dom'


const EditPost = () => {
    const navigate = useNavigate()
    const {slug} = useParams()
    const [post,setPosts] = useState(null)
    useEffect(()=>{
        if(slug){
            appWriteServices.getPost(slug)
            .then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
    <Container>
        <PostForm post={post}/>
    </Container>
    </div>
  ) : null
}

export default EditPost
