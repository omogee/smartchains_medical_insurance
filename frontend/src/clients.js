import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext } from 'react';
import { userContext } from './usercontext';
import {formater} from "./formatTime"


function Clients() {
    const context = useContext(userContext)
    const [clients, setclients] = useState([])
    const [redirect, setredirect] = context["redirect"]
    const [currentPage, setCurrentPage] = context["currentpage"]

    useEffect(()=>{
        document.title="smart chains clients"
      setCurrentPage("clients")
        if(Cookies.get("tktplc")){
    axios.get(`http://localhost:5000/fetch_clients?tkt=${Cookies.get("tktplc")}`)
        .then(res =>{
            if(res.data.status === "success"){
                setclients(res.data.clients)
            }else if(res.data.status === "failed"){
              setredirect(true)
            }
        })
        .catch(err => console.warn (err))
}
    },[])
    return ( 
        <div className='container'>
           <center>
           <h5>Registered Clients</h5>
           
           </center>
                 <div  className="row" style={{padding:"20px"}}>
          {clients.map(client=>
              
                   <div key={client.smartccid} className='col-12 col-md-6' style={{padding:"20px"}}>
                   <div style={{padding:"20px",border:'1px solid lightgrey'}}>
                   <p>Name: {client.fullname}</p>
                   <p>Email: {client.email}</p>
                   <p>Contact: {client.contact}</p>
                   <p>Payment Plan: {client.payplan || "null"}</p>
                   <p>Payment status: {client.paystatus || "null"}</p>
                   <p>Time Joined: <span style={{color:"grey"}}>{client.time ? formater(client.time) : "null"}</span></p>
                   </div>
                   </div>
              )}
                </div>
        </div>
     );
}

export default Clients;