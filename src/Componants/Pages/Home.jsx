import React, { useEffect, useState } from "react";
import appWriteService from "../../appwrite/config";
import landing from "../../images/landing.png"
import { Query } from "appwrite";
import { PostCard } from "../index";
import DynamicCarousel from "../Carousel/DynamicCarousel";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const query = [Query.equal("status", "active"), Query.limit(8)];
    appWriteService.getPosts(query).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
  }, []);
  if (posts.length === 0) {
    return (

     <section className="text-black dark:bg-white">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 md:grid-cols-1">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-black"> Publish Your Passions,Your way </h1>
            <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl dark:text-black-400">Create a unique and beautiful blog easily</p>
            <a href="/login" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-purple-600 text-gray-900 border border-black-300 rounded-lg hover:bg-black-100 focus:ring-4 focus:ring-black dark:text-white dark:border-white-700 dark:hover:bg-purple-800 dark:focus:ring-gray-800">
                Sign In
            </a> 
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex ">
            <img src={landing} alt="mockup"/>
        </div>                
    </div>
</section> 
    );
  }
  return (
    <div>
      <DynamicCarousel items={posts} />
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-4 mt-10 mb-5">
          {posts.map((post) => (
            <div key={post.$id} className=" gap-2 grid shadow-md">
              <PostCard {...post} />
            </div>
          ))}
        </div>
        </div>
  );
};

export default Home;
