import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom"
import {userContext} from "./usercontext"

function Register() {
    const context = useContext(userContext)
    const [inputerr, setinputerr] = useState({})
    const [inputs, setinputs] = useState({})
    const [termsandconditions, settermsandconditions] = useState(false)
    const [newsupdatesubscription, setnewsupdatesubscription] = useState(false)
    const [servermsg, setservermsg] = useState({})
    const [validatedinputs, setvalidatedinputs] = useState(true)
    const [currentPage, setCurrentPage] = context["currentpage"]
  
    useEffect(()=>{
     setCurrentPage("register")
    })
    const change=(e)=>{
        if(e.target.name === "email"){
            setinputerr(prev =>({...prev,email:false}))
            setvalidatedinputs(true)
        }
        if(e.target.name === "password"){
            setinputerr(prev =>({...prev,password:false}))
            setvalidatedinputs(true)
        }
      setinputs(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    const checkchange=(e)=>{
        if(e.target.name === "newsupdatesubscription"){
            setnewsupdatesubscription(!newsupdatesubscription)
            setinputs(prev => ({...prev, newsupdatesubscription:!newsupdatesubscription}))
            }
            if(e.target.name === "termsandconditions"){
                settermsandconditions(!termsandconditions)
                setinputs(prev => ({...prev, termsandconditions:!termsandconditions}))
                }
    }
    const save=()=>{
        if(!inputs.fullname){
            alert("fullname")
            setinputerr(prev=>({...prev, fullname:true}))
        }
        if(!inputs.contact){
            alert("fullname")
          setinputerr(prev=>({...prev, contact:true}))
          }
      if(inputs.email && inputs.password && validatedinputs){
        console.log("inputs",inputs)
        axios.get(`http://localhost:5000/register?inputs=${JSON.stringify(inputs)}`)
        .then (res =>{
            if(res.data.status ==="success"){
                setservermsg({status:"success", message:res.data.message})
                setinputs({})
            }else if(res.data.status === "failed"){
                setservermsg({status:"failed", message:res.data.message})
           if(res.data.message === "email already exist"){
            setinputs(prev =>({...prev, email:""}))
           }else{
            setinputs({})
           }
            }
        })
        .catch(err => console.warn(err))
      }else{
        if(!inputs.email.includes("@") || !inputs.email.includes(".com")){
            setinputerr(prev =>({...prev, email:true}))
            setvalidatedinputs(false)
        }
        if(inputs.password.length < 8){
        setinputerr(prev =>({...prev, password:true}))
        setvalidatedinputs(false)
        }
      }
    }
    const validateInput=()=>{
        const inputs_avail = inputs.email || inputs.password
        if(inputs_avail){
            if(!inputs.email.includes("@") || !inputs.email.includes(".com")){
                setinputerr(prev =>({...prev, email:true}))
                setvalidatedinputs(false)
            }
            if(inputs.password && inputs.password.length < 8){
            setinputerr(prev =>({...prev, password:true}))
            setvalidatedinputs(false)
            }
        }else{
            setvalidatedinputs(false)
        }
    }
    return ( 
        <div>
              <div style={{backgroundColor:"white"}}>
 
          <div style={{width:"100%",paddingTop:"10px"}} className="lgpadding">
            <div style={{backgroundColor:"white",boxShadow:"2px 2px 3px 4px lightgrey",padding:"20px",position:"relative"}}>
            <div style={{position:"absolute",zIndex:"1000000",top:"30%"}}>
            <div className='row'>
                <div className='d-none d-md-block col-md-6'>
                <small style={{fontSize:"45px"}}>
                    <span>Bran<span style={{color:"red",fontWeight:"bold"}}>dIcon</span></span>
                </small>
                </div>
            </div>
         </div>
         <div className='row' style={{padding:"0",margin:"0"}}>
                <div className='col-12 d-md-none' style={{padding:"0",margin:"0"}}>
                <small style={{fontSize:"30px"}}>
                    <span>Bran<span style={{color:"red",fontWeight:"bold"}}>dIcon</span></span>
                </small>
                </div>
               
            </div>
              <div style={{position:"relative"}}>
              <center>
              <span style={{fontSize:"40px",display:"none",backgroundColor:"pink",borderRadius:"50%",border:"2px solid indianred",padding:"10px",color:"indianred"}} className='fa fa-user-plus'></span>
                 </center>             
              </div>
               <center className='lgpadding'>
               <div className='col-12'>
                    <center>
                        <p style={{fontStyle:"italic",color:`${servermsg.status === "success" ? "green" : "indianred"}`}}>{servermsg.message}</p>
                    </center>
                </div>
            <div style={{transitionProperty:"transform, opacity",transitionDuration:"2s",transitionTimingFunction:"linear",width:"100%",overflow:"hidden",height:"100%"}}>
            <div className='col-12 col-md-6'>
                <input type="text" onBlur={validateInput} value={inputs.fullname ? inputs.fullname : ""} name="fullname" style={{boxShadow:"none",border:`${inputerr.fullname ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder="fullname"></input>
                <small style={{color:"red", fontStyle:"italic",display:`${inputerr.fullname ? "block" : "none"}`}}>please enter your name</small>
                </div>
                <br/>
                    <div className='col-12 col-md-6'>
                <input type="text" onBlur={validateInput} value={inputs.email ? inputs.email : ""} name="email" style={{boxShadow:"none",border:`${inputerr.email ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder="email"></input>
                <small style={{color:"red", fontStyle:"italic",display:`${inputerr.email ? "block" : "none"}`}}>Enter a valid email</small>
                </div>
                <br/>
                <div className='col-12 col-md-6'>
                <input type="text" onBlur={validateInput} value={inputs.contact ? inputs.contact : ""} name="contact" style={{boxShadow:"none",border:`${inputerr.contact ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder="contact"></input>
                <small style={{color:"red", fontStyle:"italic",display:`${inputerr.contact ? "block" : "none"}`}}>Enter a valid phone number</small>
                </div>
               
                <br/>
                <div className='col-12 col-md-6'>
                <input type="password" onBlur={validateInput} value={inputs.password ? inputs.password : ""} name="password" style={{boxShadow:"none",border:`${inputerr.password ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder='enter 8-digit password'></input>
                <small style={{color:"red", fontStyle:"italic",display:`${inputerr.password ? "block" : "none"}`}}>Password must be atleast 8 characters</small>  
              </div>
              <div className='col-12 col-6 mt-1'>
                <input type="checkbox" onChange={checkchange} checked={newsupdatesubscription} name="newsupdatesubscription" /> <small style={{fontWeight:"lighter"}}>Subscribe to our news letter</small>
              </div>
              <div className='col-12 col-6 mt-1'>
                <input type="checkbox" onChange={checkchange} checked={termsandconditions} name="termsandconditions" /> <small style={{fontWeight:"lighter"}}>Accept Our terms and conditions</small>
              </div>
                <br/>

                <p style={{color:"indianred",fontWeight:"bold"}}>Step 1 of 3</p>
            </div>
                <br/>
           <small>
           <div>
                <center>
                    <h3 style={{color:"grey"}}>Confirm Your Email</h3>
                    <p style={{padding:"20px"}}>Smartchains is personalized for you.<br/> Create a password and proceed to confirm your email address.</p>
                   <div style={{padding:"10px",width:"60%"}}>
                   <small style={{ textTransform:"capitalize",fontWeight:"bold",color:"indianred"}}>* by clicking continue kindly open your mail address to confirm your email and proceed to register</small>
                   </div>
                </center>
                </div>
           </small>
                <div className='col-12 col-md-6'>
               <button onClick={termsandconditions ? save : null} className={`${!termsandconditions ? `btn disabled` : 'btn loginbtn'}`} style={!termsandconditions ? {width:"80%",backgroundColor:"grey"} :{width:"80%"}}>
                    SAVE / CONTINUE <span>{!termsandconditions ?   <span className="fa fa-ban"></span> : null}</span>
                </button>
               </div>
               </center>
     
                <center>
                    <br/>
                    <small>ALREADY Have An Account?</small><br/>
                    <small><Link to="/login">LOGIN</Link></small>
                </center>
               </div>
           </div>
       </div>
        </div>
     );
}

export default Register;