import { useEffect, useState } from "react";
import { dummyPublishedImages } from "../assets/assets";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";


const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const {axios, token} = useAppContext();
  const fetchImages = async() => {
    try {
      const {data}= await axios.get("/api/user/published-images", {
                headers: {Authorization: token}
            }); 
      if(data.success){
        setImages(data.images)
      }else{
        toast.error(data.message)
      }     
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }

  }
  useEffect(() => {
    fetchImages();
  }, []);
  // console.log(loading);

  if(loading) return <Loading/>
  
  return (
    <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-screen mx-auto h-screen overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100"> Community Images</h2>
      {
        images.length === 0 ? <p className="text-center text-gray-600 dark:text-purple-200 text-2xl mt-10">No images published yet.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            {images.map((item, index) => (
              <a href={item.imageUrl} target="_blank" key={index} className="group border border-gray-200 dark:border-purple-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
                <img src={item.imageUrl} alt={`Published ${index}`} className="w-full h-auto group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                <p className="absolute bottom-0 right-0 text-sm bg-black/50 backdrop-blur rounded-tl-full overflow-hidden opacity-0 text-white px-4 py-1 group-hover:opacity-100 transition-all duration-300">Create by {item.userName}</p>
              </a>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Community
