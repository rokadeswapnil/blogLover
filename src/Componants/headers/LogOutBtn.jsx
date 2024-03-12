import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Store/authStore';
const logoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button type="button" className={`text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
     onClick={logoutHandler}>Logout</button>
  )
}

export default logoutBtn
