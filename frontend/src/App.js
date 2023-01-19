import logo from './logo.svg';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom"
import Landing from "./landingpage"
import React, { useState, useEffect } from 'react';
import { userContext } from './usercontext';
import Login from "./login"
import Register from "./register"
import "./main.css"
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './navbar';

function App() {
  const [userdetails, setuserdetails] = useState({})
  const [redirect, setredirect] = useState(false)
  const [currentPage, setCurrentPage] = useState("")
 
useEffect(()=>{
  //hello world
 if(Cookies.get("tktplc")){
  axios.get(`http://localhost:5000/fetch_client?tkt=${Cookies.get("tktplc")}`)
  .then(res=>{
    if(res.data.status === "success"){
      setuserdetails(res.data.client)
    }else{
      setredirect(true)
    }
  })
  .catch(err => console.warn(err))
 }
},[])
  if(redirect){
    return(
      <userContext.Provider >
        <Router>
          <Login />     
        </Router>
   </userContext.Provider>
    )
  }
  return (
    <div >
      <userContext.Provider value={{
        "redirect":[redirect, setredirect],
        "userdetail":[userdetails, setuserdetails],
        "currentpage":[currentPage, setCurrentPage]
      }}>
      <Router>
      {(currentPage === "login" || currentPage === "register")  ?
       null
       : <Navbar>
        </Navbar>}
        <Routes>  
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
