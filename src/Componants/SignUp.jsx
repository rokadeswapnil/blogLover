import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {login} from '../Store/authStore'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button,Input} from './index'
const SignUp = () => {
  const [error,setError] = useState("");
  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const create=async(data)=>{
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if(userData){
       const userData= await authService.getCurrentUser()
       if(userData) dispatch(login(userData))
       navigate('/')
      }
      
    } catch (error) {
      setError(error.message)
    }

  }
  return (
    <div className='flex items-center justify-center w-full m-5'>
      <div className={`mx-auto w-full max-w-lg bg-gradient-to-b from-rose-200 to-rose-300 rounded-xl p-10 border border-black/10`}>
        <h2 className='text-center text-2xl font-bold leading-tight '>Sign Up your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Already have an account?&nbsp;
            <Link to="/login" className='"font-medium text-primary transition-all duration-200 hover:underline'>
                SignIn
            </Link>
        </p>
        {error && <p className=' text-red-800 mt-8 text-center'>
            {error}
        </p>}
        <form onSubmit={handleSubmit(create)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="FullName: "
                placeholder="Enter your Full Name"
                type="text"
                {...register("name",{
                    required:true
                })}
                />
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
                    required:true
                })}
                /> 
                <Button type='submit' className='w-full bg-gradient-to-r from-rose-500 to-rose-500'>Create Account</Button>
            </div>

        </form>
        </div>
        </div>
  )
}

export default SignUp