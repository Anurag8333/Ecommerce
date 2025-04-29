import React,{useEffect, useState} from 'react'
import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Additems from '../components/Additems';
import Userinfo from '../pages/Userinfo';
import AddToCart from '../pages/Addtocart';
import {VegFru} from '../pages/VegFru';
import Bakery from '../pages/Bakery';
import Frozen from '../pages/Frozen';
import Munchies from '../pages/Munchies';
import  Search  from '../components/Search';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';


function Allroutes() {
  let[admin,setAdmin] = useState();
  let[user,setUser] = useState();
  let[adminlogin,setAdminLogin] = useState(false);
  let[login,setLogin] = useState(false);

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem('admin'))||null);
  }, [adminlogin]); 

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user'))||null);
  }, [login]); 

  let[searchdata,setSearchData]=useState([]);
  console.log(searchdata);

  return (
  <>
   <Header user={user} setLogin={setLogin} setSearchData={setSearchData} admin={admin} setAdminLogin={setAdminLogin} />
  <main className='h- w-full'>
  <Routes>
    <Route path="/" element={<Home user={user} />} />
    <Route path="/login" element={<Login  setLogin={setLogin}/>} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/additems' element={<Additems/>}/>
    <Route path='/useracc' element={<Userinfo user={user}/>}/>
    <Route path='/cart' element={<AddToCart user={user}/>}/>
    <Route path='/vegfru' element={<VegFru  user={user}/> } />
    <Route path='/munchies' element={<Munchies user={user}/> } />
    <Route path='/frozen' element={<Frozen  user={user}/> } />
    <Route path='/bakery' element={<Bakery  user={user}/> } />
    <Route path='/search' element={<Search data={searchdata} user={user} />} />
    <Route path='/adminlogin' element={<AdminLogin setAdminLogin={setAdminLogin}/>}/>
    <Route path='/admin' element={<AdminDashboard admin={admin} />}/>
  </Routes>
  </main>
  </>
  )
}

export default Allroutes