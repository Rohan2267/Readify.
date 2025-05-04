import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Profile from '../../pages/Profile'

const Settings = () => {

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value })
  }

  const submitAddress = async () => {
    const res = await axios.put("http://localhost:1000/api/v1/update-address", Value, { headers })
    alert(res.data.message);

  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const [Value, setValue] = useState({ address: "" })
  const [ProfileData, setProfileData] = useState()
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-information",
        { headers }
      )
      setProfileData(res.data)
      setValue({ address: res.data.address });

    }
    fetch()
  }, [])

  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>

          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows="5"
              name='adderss'
              value={Value.address}
              onChange={change} />
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'
              onClick={submitAddress}>
              Update
            </button>

          </div>

        </div>
      )}
    </>
  )
}

export default Settings