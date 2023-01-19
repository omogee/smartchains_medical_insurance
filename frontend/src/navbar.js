import React, { useState, useEffect , useContext} from 'react';
 import {userContext} from "./usercontext"
 import {Link, useNavigate} from "react-router-dom"
 import Cookies from 'js-cookie';

function Navbar() {
    const context = useContext(userContext)
    const [userdetails, setuserdetails] = context["userdetail"]
    const [currentPage, setCurrentPage] = useState("")
    const [displaylogout, setdisplaylogout] = useState(false)
    const [navbarclass, setnavbarclass] = useState("fa-bars")

 const navigate = useNavigate()

    const logout=()=>{
        Cookies.remove("tktplc")
        navigate(`/login`)
       }
    return ( 
              <div style={{position:"sticky",borderBottom:"1px solid rgba(242,242,242,0.6)",top:"0px",zIndex:"9900000000",backgroundColor:"rgba(255,255,255)"}}>
                <div className='navdiv' style={{display:"flex",padding:"0",margin:"0",flexWrap:"wrap"}}>
                <div className='branddiv'>
                <span className={`fa ${navbarclass} mr-1`} style={{color:"orange",fontSize:"35px",fontWeight:"lighter"}}></span>
                <small style={{fontSize:"40px"}}>
                    <span>Brand<span style={{color:"orange",fontWeight:"bold"}}>Icon</span></span>
                </small>
             </div>
                 <div className='searchinputdiv mt-2'>
                  
                 </div>
                 {Cookies.get("tktplc") ?
                 <div className='navimage '>
             <div className='userimage mt-2 mr-2' style={{width:"100%",backgroundColor:"grey",border:"1px solid grey",borderRadius:"45%"}}>
             <center><b onClick={()=>setdisplaylogout(!displaylogout)} style={{fontWeight:"bolder",color:"white",padding:"5px 0px",cursor:"pointer"}}>EO</b></center>
             </div>
             </div>
             : null}
                 <div className='navlinks mt-2' style={{margin:"0px",justifyContent:"space-evenly", flexWrap:"nowrap",padding:"0px"}}>
                <div><p className='mt-2'>
                  <Link to={`/`}  style={currentPage === "home" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",textDecoration:"none"} : {color:"black",textDecoration:"none"}} className="linker" >Home</Link>
                  </p>
                  </div>
                <div style={{padding:"0",margin:"0",cursor:"pointer"}} >
                <Link to={`/clients`} style={currentPage === "clients" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",textDecoration:"none"} : {color:"black",textDecoration:"none"}} className="linker"><p style={{padding:"0",color:"black"}}  className='mt-2'>Clients <small style={{fontSize:"8px",color:"grey"}}></small></p></Link>
                </div>
                <div>
                  <p className='mt-2'>
                  <Link to={`/profile`} className="linker" style={currentPage === "dashboard" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",color:"grey",textDecoration:"none"} : {color:"black",textDecoration:"none"}}>Dashboard</Link>
                </p>
                </div>
                <div>
                <p className='mt-2'>
                <Link to={`/login`}  className="linker" style={currentPage === "login" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",color:"grey",textDecoration:"none"} : {color:"black",textDecoration:"none"}}>Login</Link></p>
               </div>
                <div>
                  <p className='mt-2'>
                <Link to={`/register`}  className="linker" style={currentPage === "register" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",color:"grey",textDecoration:"none"} : {color:"black",textDecoration:"none"}}>Register</Link></p>
             </div>
             </div>
             {Cookies.get("tktplc") ?
             <div className='lgnavimage '>
             <div className='userimage mt-2 mr-2' style={{width:"100%",backgroundColor:"grey",border:"1px solid grey",borderRadius:"45%"}}>
             <center><b onClick={()=>setdisplaylogout(!displaylogout)} style={{fontWeight:"bolder",color:"white",padding:"5px 0px",cursor:"pointer"}}>EO</b></center>
             </div>
             </div>
             : null}
                <div style={{width:"20%",marginTop:"10px",display:"none"}}>
                
                    <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
                   
                    <div style={{width:"10%",position:"relative"}}>
                  <center> <span >
                    
                        </span></center>
                 </div>
                 <div style={{marginTop:"10px",width:"38%"}}>
                 <small style={{marginLeft:"10px",textTransform:"capitalize"}}>.{userdetails && userdetails.firstname}</small>
                 </div>
                 <div style={{width:"50%"}}>
                      <center style={{fontWeight:"bold",color:"black",padding:"0px",margin:"0px"}}>
                        <small style={{fontSize:"11px"}}><span style={{fontSize:"15px"}} className='fa fa-globe' ></span> | Support  | <a href="/login"  style={{color:"black",textDecoration:"none",fontWeight:"bold"}}>Login</a></small><br/>
                     <a href="/register" >
                     <button style={{backgroundColor:"indianred",fontWeight:"bold",border:"none",margin:"0px",borderRadius:"20px",color:"white",padding:"5px 8px "}}>
                        <small style={{fontWeight:"bold",fontSize:"10px"}}>SIGN UP FOR FREE</small>
                      </button>
                     </a>
                  </center>
                 </div>
                 </div>
                </div>
                </div>
                <div className='smsearchinput mb-2' style={{width:'100%',display:"none",padding:"0px 5px 5px 5px"}}>
               <div style={{display:"flex",flexWrap:"nowrap"}}>
                <div style={{width:"10%"}}>
                  <span  style={{color:"lightgrey",padding:"5px"}} className='fa fa-arrow-circle-o-left fa-2x'></span>
                </div>
                <div >
                <form >
                  
                   </form>
                   </div>
                  
               </div>
           </div>
           <div style={{position:"absolute",display:`${displaylogout ? "block" : "none"}`,padding:"8px 20px",top:"100%",zIndex:"99999999999999999",backgroundColor:"black",color:'white',right:"20px"}}>
                       <p className='linker'><span className='fa fa-user mr-1'></span> Profile</p>
                       <p className='linker' onClick={logout}> <span className='fa fa-sign-in mr-1'></span>Log Out</p>
                   </div>
        </div>

     );
}

export default Navbar;