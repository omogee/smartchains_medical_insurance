import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom"
import Cookies from "js-cookie"
import axios from 'axios';
import { userContext } from './usercontext';

function Login() {
  const context = useContext(userContext)
    const [passwordType, setpasswordType] = useState("fa-eye")
    const [passtype, setpassType] = useState("password")
    const [loading, setloading] = useState(false)
    const [modaldisplay, setmodaldisplay] = useState("none")
    const [alertmessage, setalertmessage] = useState("")
    const [inputs, setinputs] = useState({})
    const [servermsg, setservermsg] = useState({})
    const [currentPage, setCurrentPage] = context["currentpage"]
  
 useEffect(()=>{
  setCurrentPage("login")
 })

    const changeType=()=>{
      if(passwordType === "fa-eye"){
        setpasswordType("fa-eye-slash")
        setpassType("text")
      }else{
        setpasswordType("fa-eye")
        setpassType("password")
      }
    }
    const change=(e)=>{
      setinputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }
   
    const login =()=>{
      if(inputs.email && inputs.password){
      setloading(true)
      const input = inputs
      const print =[
        navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
        ,navigator.deviceMemory,navigator.connection]
        print.unshift(window.screen.width)
        print.push(window.screen.height)

        const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
        const realprint = mainprint.substring(1, mainprint.length-1)
        input.realprint = realprint
      axios.get(`http://localhost:5000/login?inputs=${JSON.stringify(input)}`)
      .then(res =>{
        if(res.data.status === "success"){
          setservermsg({status:res.data.status,message:res.data.message})

          const indexermain = res.data.client && res.data.client.smartccid 
          if(indexermain &&  !isNaN(indexermain)){
          Cookies.set("tktplc", indexermain, { expires: 0.3555 })
          setloading(false)
          setTimeout(()=>{
           if(window.location.pathname === "/login"){
          //  window.location.href="/"
           }else{
            window.location.href= window.location.href
           }
          },1000)
        }else{
          alert("An Error Occured, Please Try again in 3 minutes")
          setloading(false)
        }
        }else if(res.data.status === "failed"){
         setloading(false)
         setservermsg({status:res.data.status,message:res.data.message})

        }else{
          setloading(false)
          alert("an error occured")
        }
        setinputs(prev =>({...prev, password:""}))
      })
    }
  }
    return ( 
      <div>
            <div style={{backgroundImage:`url(https://img.freepik.com/free-photo/cheerful-woman-with-dark-wavy-hairstyle-black-striped-outfit-hat-laughing-looking-into-camera-pink-background_197531-29197.jpg?w=360)`,backgroundRepeat:"no-repeat",backgroundPosition:"center", position:"fixed",right:"0",height:"100%",width:"50%"}}>
            </div>
            {loading ? 
              <div style={{position:"fixed",top:"0",left:"0%",zIndex:"200000",backgroundColor:"rgba(242,242,242,0.3)",width:"100%",height:"100%"}}>
                   <div style={{position:"fixed",left:"40%", top:"30%"}}>
                   <center>
                      <img  src={`https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif`} />
                  </center>
                   </div>
              </div>
              : null}
          <div style={{width:"100%",height:"100%",position:"fixed",zIndex:"20",backgroundColor:"rgba(1,1,1,0.7)",left:"0px"}}>
       <div className='d-none d-lg-block'>
       <small style={{fontSize:"50px",padding:"50px"}}>
                    <span style={{color:"white"}}>Brand<span style={{color:"indianred",fontWeight:"bold"}}>Icon</span></span>
                </small>
       </div>
          <div className="logindiv">
                <div>
                <small className='d-lg-none' style={{fontSize:"30px"}}>
                    <span style={{color:"white"}}>Brand<span style={{color:"indianred",fontWeight:"bold"}}>Icon</span></span>
                </small>
                
                <i className='mb-2' style={{color:"white",fontWeight:"lighter",display:`${servermsg.message ? "block":"none"}`,backgroundColor:`${servermsg.status === "success" ? "green" : "indianred"}`,float:"right",borderRadius:"10px",padding:"3px 10px",width:"100%"}}>{servermsg.message}</i>
                   <br/>
                    <p style={{color:"lightgrey",fontWeight:'bold',fontSize:"25px"}}>SIGN IN <span style={{float:"right"}} className='fa fa-pencil '></span></p>
                </div>
              <div >
                <p className='zeropadding zeromargin'> Username : </p>
                <input  type="text" placeholder="Username Or Email" onChange={change} name="email" style={{backgroundColor:"rgba(255,255,255)"}} className='logininput form-control' />
                
                <p className='zeropadding zeromargin'> Password : </p>
                <div className='input-group logininput' style={{backgroundColor:"rgba(255,255,255)",border:"none",color:"lightgrey"}}>
                <div className='input-group-prepend'>
                    <p className='input-group-text' onClick={changeType} style={{backgroundColor:"rgba(255,255,255)",border:"none",fontSize:"20px"}}>
                        <span className={`fa ${passwordType}`}></span>
                    </p>
                </div>
                <input  type={`${passtype}`} onChange={change} name="password" placeholder="Enter Your Password" style={{backgroundColor:"rgba(255,255,255)",border:"none"}} className='logininput form-control' />
               
                </div>
                <br/>
                <button className='btn loginbtn' onClick={login}>
                    LOGIN
                </button>
                <small>
                  <div style={{display:"flex",color:"lightgrey"}}>
                   <div style={{width:"50%"}}>
                    <small style={{fontSize:"15px"}}>Need Help?</small>
                   </div>
                   <div style={{width:"50%"}}>
                    <small style={{fontSize:"15px",float:"right"}}><input type="checkbox" style={{backgroundColor:"red"}} /> Remember me</small>
                   </div>
                  </div>
                </small>
                <center style={{fontSize:"20px"}}>
                    <br/>
                    <small style={{color:"lightgrey"}}>Don't Have An Account?</small> 
                    <small><Link to="/register"> SIGN UP</Link></small>
                </center>
              </div>
            </div>
          </div>
      </div>
        
     );
}

export default Login;