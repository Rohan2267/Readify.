import React, { useEffect } from 'react'
import Home from './pages/home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from "react-router-dom"
import AllBooks from './pages/AllBooks'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { authActions } from './store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Favourites from './components/Profile/Favourites'
import UseOrderHistory from './components/Profile/UseOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (<Route index element={<Favourites />} />) : (<Route index element={<AllOrders />} />)}
          {role === "admin" &&          <Route path='/profile/add-book' element={<AddBook />} />}
          <Route path='/profile/orderHistory' element={<UseOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route>

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App