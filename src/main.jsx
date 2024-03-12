import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout,Login } from './Componants/index.js'
import Home from './Componants/Pages/Home.jsx'
import AllPost from './Componants/Pages/AllPost.jsx'
import AddPost from './Componants/Pages/AddPost.jsx'
import Post from './Componants/Pages/Post.jsx'
import EditPost from './Componants/Pages/EditPost.jsx'
import SignUp from './Componants/SignUp.jsx'
const router  = createBrowserRouter([
  {
    path: '/',
    element:<App />,
    children:[
      {path:'/',
      element:<Home/>
      },
      {
        path:'/login',
        element:<AuthLayout authentication={false}>
          <Login/>
          </AuthLayout>
        
      },
      {
        path:'/signup',
        element:<AuthLayout authentication={false}>
          <SignUp/>
          </AuthLayout>
      },
      {
        path:'/all-posts',
        element:<AuthLayout authentication>
         {""}
         <AllPost/>
          </AuthLayout>
      },
      {
        path:'/addpost',
        element:<AuthLayout authentication>
          {""}
          <AddPost/>
          </AuthLayout>
      },
      {
        path:'/edit-post/:slug',
        element:<AuthLayout authentication>
          {""}
          <EditPost/>
          </AuthLayout>
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
