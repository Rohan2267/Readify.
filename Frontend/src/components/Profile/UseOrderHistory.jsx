import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UseOrderHistory = () => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const [OrderHistory, setOrderHistory] = useState()
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/get-order-history",
        { headers }
      )
      setOrderHistory(res.data.data);

    }
    fetch()
  }, [])

  return (
    <>
      {!OrderHistory && <div className='flex items-center justify-center h-[100%] '><Loader /></div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              No Order History
            </h1>
            <img src="/emptybox_5117.png" alt=""
              className='h-[20vh] mb-8' />

          </div>
        </div>
      )
      }
      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex  flex-wrap gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>
                Sr.
              </h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>
                Books
              </h1>
            </div>
            <div className='w-[40%]'>
              <h1 className=''>
                Description
              </h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>
                Price
              </h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>
                Status
              </h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>
                Mode
              </h1>
            </div>
            {OrderHistory.map((items, i) => (
              <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className='w-[3%]'>
                  <h1 className='text-center'>
                    {i + 1}
                  </h1>
                </div>
                <div className='w-[22%]'>
                  {items.book ? (
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className="hover:text-blue-300"
                    >
                      {items.book.title}
                    </Link>
                  ) : (
                    <span className="text-red-500 italic">Book Deleted</span>
                  )}
                </div>
                <div className='w-[40%]'>
                  <h1>
                    {items.book && items.book.desc ? `${items.book.desc.slice(0, 50)}...` : "No description"}
                  </h1>
                </div>
                <div className='w-[9%]'>
                  <h1>₹ {items.book ? items.book.price : "N/A"}</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className='font-semibold text-green-500'>
                    {items.status === "Order placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div>{items.status}</div>
                    ) : (items.status)}
                  </h1>
                </div>
                <div className='w-none md:w-[5%] hidden md:block'>
                  <h1 className='text-sm text-zinc-400'>
                    COD
                  </h1>
                </div>
              </div>
            ))}


          </div>

        </div>
      )

      }

    </>

  )
}

export default UseOrderHistory