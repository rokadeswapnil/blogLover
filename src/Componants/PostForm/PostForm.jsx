import React,{useCallback, useEffect} from 'react'
import {useForm} from  "react-hook-form";
import {Button,Input,Select,RTE} from '../index'
import appWriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';


const PostForm = ({post}) => {
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
          defaultValues:{
          title:post?.title || "",
          slug: post?.$id || "",
          featuredImage:post?.featuredImage || null,
          content:post?.content ||"",
          status:post?.status ||"active",
        },
    });
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)
    const submit = async(data)=>{
        console.log(data);
        if(post){
           const dbPost = await appWriteService.updatePost(post.$id,{
            ...data })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
           }
           else{
                const dbPost =await appWriteService.createPost({...data, userId:userData.$id})
                if(dbPost)
                {
                    navigate(`/post/${dbPost.$id}`)
                }
           }
        }
        const slugTransform = useCallback ((value)=>{
            if (value && typeof value ==="string") {
           return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
             
            }
            return ""
        },[])
        useEffect(() => {
            const subscription = watch((value,{name})=>{
                if(name ==="title"){
                  setValue("slug", slugTransform(value.title),{shouldValidate:true})
                }
            })
            return ()=>{
                subscription.unsubscribe();
            }
        },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-full p-2'>
            <Input
            label='title :'
            placeholder = "Title"
            className = "mb-2"
            {...register("title",{required:true})}
            />
            <Input
            label='slug :'
            placeholder = "Slug"
            className = "mb-4"
            {...register("slug",{required:true})}
            onInput = {(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true});
            }}
           />
            <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValues={getValues("content")}
        />
        </div>
        <div className='w-full px-2'>
            <Input
            label="featuredImage"
            type="text"
            className= 'mb-4'
            {...register("featuredImage",{required:true})}
            />
    
            {post && (
                <div className='w-full mb-4'>
                    <img
                    src={post.featuredImage}
                    alt={post.title}
                    className='rounded-lg'
                   />
                   </div>
                    ) } 
            <Select 
                label="Status"
                options={["active","inactive"]}
                className="mb-4"
                {...register("status",{required:true})}/>
                    <Button 
                    type='submit'
                    bgColor={post ? "bg-green-500" : undefined}
                    className='w-full'>
                        {post ?"update":"submit"}
                    </Button>
            </div>
    </form>
  )
}


export default PostForm
