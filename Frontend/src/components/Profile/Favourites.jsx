import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import axios from 'axios'

const Favourites = () => {

  const [FavouriteBooks, setFavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers })
      setFavouriteBooks(response.data.data);

    }
    fetch()


  }, [FavouriteBooks])

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className='text-5xl font-semibold text-zinc-500 w-full items-center justify-center h-[100%] flex flex-col'>No Favourite Books
        
        <img src="https://cdn3.iconfinder.com/data/icons/user-manual-rich-series/256/Bookmark-1024.png" className='h-50 w-60 m-4' alt="" /></div>
      )}
      <div className='grid grid-cols-3 gap-4'>

        {FavouriteBooks && FavouriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>

  )
}

export default Favourites