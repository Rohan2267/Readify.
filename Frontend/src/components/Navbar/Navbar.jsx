import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux"

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },


  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log(isLoggedIn);

  const role = useSelector((state) => state.auth.role)

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }


  else if (isLoggedIn == true && role === "user") {
    links.splice(4, 1);
  }
  else if (isLoggedIn == true && role === "admin") {
    links.splice(2, 2);
  }
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between '>
        <Link to="/" className='flex items-center'>
          <img
            className="h-10 me-4 bg-yellow-100 rounded-full" src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-Bookstore-landscape-smashingstocks-detailed-outline-smashing-stocks.png" alt="logo" />

          <h1 className='text-2xl font-semibold'>Readify</h1></Link>
        <div className='nav-links-Readify block md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((items, i) => (
              <div className='flex justify-center items-center'>
                {items.title === "Profile" ||
                  items.title === "Admin Profile" ? (<Link to={items.link} className="px-4   font-semibold py-1 border border-slate-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300" key={i}>{items.title}</Link>) :( <Link to={items.link} className="hover:text-slate-300 transition-all duration-500" key={i}>{items.title}{" "}</Link>)}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className='hidden md:flex gap-4'>
              <Link to="/LogIn" className='px-4 py-1 border border-slate-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
              <Link to="/SignUp" className='px-4 py-1 bg-slate-400 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
            </div>
          )}
          <button onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
            className='block md:hidden text-white text-2xl hover:text-zinc-200'>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${MobileNav} text-white mb-8 text-4xl font-semibold hover:text-slate-300 transition-all duration-500`} key={i}
            onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>{items.title}{" "}</Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-slate-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
            <Link
              to="/SignUp"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-slate-400 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>

          </>
        )}
      </div>
    </>
  )
}

export default Navbar