import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'


import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  // const isLoggedIn = useSelector();
  
 
  const [Profile, setProfile] = useState();
  


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  

  useEffect(() => {

    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
  
  
        if (res.data) {
          setProfile(res.data);  // ✅ Use res.data directly
        } else {
          console.error("Invalid API Response Format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetch()
  }, []);
  

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row gap-4 py-8 text-white'>
      {!Profile && <div className='flex items-center justify-center w-full h-screen'><Loader /></div>}
      {Profile && <>
        <div className=' w-full md:w-1/6 h-auto lg:h-screen'>
          <Sidebar data={Profile} />
          <MobileNav />
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet />
        </div>
      </>
      }
    </div>
  )
}

export default Profile