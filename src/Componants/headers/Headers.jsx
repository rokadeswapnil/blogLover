import React,{useState}from "react";
import { Container, Logo, LogOutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "AddPost",
      slug: "/addpost",
      active: authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];
 

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
       <nav className="backdrop-blur-lg bg-gradient-to-r from-rose-300 to-rose-400 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 h-10 w-10">
           <Logo/>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none focus:text-black"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16V5H4v1zm0 6h16v-1H4v1zm0 6h16v-1H4v1z"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <ul className="text-sm flex px-2">
            {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className="px-2">
                      {" "}
                      <button onClick={() => navigate(item.slug)} className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogOutBtn />
                  </li>
                )}
               </ul>
          </div>
        </div>
      </div>
          {isOpen && (
          <div className="lg:hidden">
              <ul className="px-2 pt-2 pb-3">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className="">
                      {" "}
                      <button onClick={() => navigate(item.slug)} className="block mt-1 w-full py-1 rounded-md text-base font-medium text-white bg-gray-900 hover:bg-slate-300 hover:text-gray-800">
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>  
                    <LogOutBtn />
                  </li>
                )}
              </ul>
            </div>
          )}
      </nav>
  );
};

export default Headers;
