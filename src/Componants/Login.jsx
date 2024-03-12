import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import{login as authLogin} from '../Store/authStore'
import {Button,Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")
    const login = async(data)=>{
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData)
                {dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className=' m-5 flex items-center justify-center w-full '>
      <div className={`mx-auto w-full max-w-lg bg-gradient-to-b from-rose-200 to-rose-300 rounded-xl p-10 border border-pink-900`}>
        <h2 className='text-center text-2xl font-bold leading-tight '>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have any account?&nbsp;
            <Link to="/signup" className='"font-medium text-primary transition-all duration-200 hover:underline'>
                Signup
            </Link>
        </p>
        {error && <p className=' text-red-800 mt-8 text-center'>
            {error}
        </p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatern:(value)=>{/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value)||
                    "Email address must be valid address"}
                    }
                })}
                />
                <Input 
                label="Password: "
                placeholder="Enter your Password"
                type="password"
                {...register("password",{
                    required:true,
                    validate:{
                        matchPatern:(value)=>{/(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])(?!.*\n).*$/.test(value)||
                    "Please Enter Valid Pasword"}
                    }
                })}
                /> 
                <Button type='submit' className='w-full bg-gradient-to-r from-rose-500 to-rose-500'>SignIn</Button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Login
