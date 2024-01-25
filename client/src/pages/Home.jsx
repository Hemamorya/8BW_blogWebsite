import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { IF, URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
 

const Home = () => {
  
  const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])



  return (
    <>
      <Navbar />
      <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
      
        <div className="absolute inset-0 bg-slate-300 opacity-50"></div>

        <div className="px-4 md:px-8 lg:px-12 xl:px-16 min-h-[80vh] relative z-10">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : !noResults ? (
            posts.map((post) => (
              <Link
                key={post._id}
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePosts post={post} />
              </Link>
            ))
          ) : (
            <h3 className="text-center font-bold mt-16 text-white">No posts available</h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;