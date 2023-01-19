import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext, useRef } from 'react';
import {PaystackButton} from "react-paystack"
import { userContext } from './usercontext';


function Landing() {
    const context = useContext(userContext)
    const [plans, setplans] = useState([{name:"international",amount:28,color:"#4db8ff"},
    {name:"family",amount:64,color:"#0099ff"},{name:"maternity",amount:239,color:"#006bb3"},{name:"pre_existing",amount:128,color:"#004d80"},{name:"corporate",amount:28,color:"#002e4d"}])
    const [states, setstates] = useState([{name:"lagos",amount:28,color:"grey"},
    {name:"ogun",amount:64,color:"pink"},{name:"osun",amount:239,color:"indianred"},{name:"oyo",amount:128,color:"red"},{name:"ekiti",amount:28,color:"#002e4d"}])
    const [section_img, setsection_img] = useState([
       {img: `https://www.powerdms.com/hs-fs/hubfs/powerdms-assets-photos-323-healthcare.jpg?width=996&name=powerdms-assets-photos-323-healthcare.jpg`},
       {img:`https://img.freepik.com/free-photo/african-american-cardiologist-doctor-showing-heart-radiohraphy-sick-patient-using-tablet-explaining-medication-treatment-during-clinical-appointment-hospital-office-people-with-medical-face-mas_482257-29163.jpg?w=2000`},
       {img:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE5nWxs7zijh8KBfKSQQVtxoGovO7cVa3WEaY1nqtQjNjEHLVASgTuIrD13dLKaDnladA&usqp=CAU`},
       {img:`https://img.freepik.com/free-photo/african-american-pediatrician-doctor-with-protection-face-mask-against-coronavirus-explaining-medical-treatment-family-during-clinical-appointment-hospital-office-health-care-service_482257-31852.jpg?w=2000`}

    ])
    const [imgtimer, setimagetimer] = useState(0)
    const [userdetails, setuserdetails] = context["userdetail"]
    const [payerr, setpayerr] = useState(false)
    const [successalert, setsuccessalert] = useState(false)
    const [config, setconfig] = useState( {
        reference: (new Date()).getTime().toString(),
      //  email: "user@example.com",
        text:"pay online",
        
    //    amount: 200000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_live_108d5aa4d51072bf2e643ae38e8b8d5d256a734b',
        onSuccess:(reference) => {
            console.log("reference",reference)
            if(Cookies.get("tktplc")){
          axios.get(`http://localhost:5000/payment_update?ref=${reference}&tkt=${Cookies.get("tktplc")}&payplan=${paymentplan}`)
          .then(res => {
            if(res.data.status=== "success"){
              setsuccessalert(true)
            }else{
                alert("an error occured")
            }
        })
          .catch(err => console.warn(err))
    }
        },
        onClose:() => {
          setpayerr(true)
        }
      })
      const [paymentselectionmodal, setpaymentselectionmodal] = useState(false)
      const [onlinepayment, setonlinepayment] = useState(false)
      const [offlinepayment, setofflinepayment] = useState(false)
      const [paymentplan, setpaymentplan]= useState("")
      const [redirect, setredirect] = context["redirect"]
      const [hovergrid, setHovergrid] = useState("unhoveredapp")
      const [displaymodal, setdisplaymodal] = useState(false)
      const [modaldetails, setmodaldetails] = useState("")
      const [currentPage, setCurrentPage] = context["currentpage"]

      const section3=useRef()

      useEffect(()=>{
        setCurrentPage("home")
      })

 useEffect(()=>{
  if(payerr){
   setTimeout(()=>{
    setpayerr(false)
   },5000)
  }
 },[payerr])
  useEffect(()=>{
   setconfig(prev => ({...prev, email:userdetails.email,metadata:{name:userdetails.name, phone:userdetails.contact}}))
  },[userdetails])
     useEffect(()=>{
        console.log("userdetails",userdetails)
        const nextindex = imgtimer === 3 ? 0 : imgtimer + 1
        const element = document.querySelector(".section_One")
       const intervalOne= setInterval(()=>{
            element.style.visibility ="hidden"
            element.style.opacity ="0"
         //   element.style.transform ="translateX(-100%)"
        },8000)
       const intervalTwo= setInterval(()=>{
            setimagetimer(nextindex)
            element.style.visibility ="visible"
            element.style.opacity ="1"
        //    element.style.transform ="translateX(0px)"
        },8500)
    return ()=>{
         clearInterval(intervalOne)
        clearInterval(intervalTwo)
    }
    })
     useEffect(()=>{
        const elements = document.querySelectorAll(".observeY")
        const elementsX = document.querySelectorAll(".observeX")
        const options = {
            root:null,
            rootMargin:"0px",
            threshold:0.3
        }
        const callback_x =(entries)=>{
            entries.forEach(entry =>{
                if(entry.isIntersecting){
                     entry.target.style.visibility ="visible"
                     entry.target.style.opacity ="1"
                     entry.target.style.transform ="translateX(0%)"       
                }
            })
          }
        const callback_y =(entries)=>{
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.style.visibility ="visible"
            entry.target.style.opacity ="1"
            entry.target.style.transform ="translateY(0%)" 
                }
            });
        }
        const observer = new IntersectionObserver( callback_y,options)
        const observer_x = new IntersectionObserver( callback_x,options)
       elements.forEach(element=>{
        observer.observe(element)
       })
       elementsX.forEach(element=>{
        observer.observe(element)
       })
    })
  const paymentsystemchange=(e)=>{
  if(e.target.name === "onlinepayment"){
    setofflinepayment(onlinepayment)
    setonlinepayment(!onlinepayment)
    console.log(onlinepayment)
  
  }
  else if(e.target.name === "offlinepayment"){
    setonlinepayment(offlinepayment)
    setofflinepayment(!offlinepayment)
   
  }
}
const order=(data)=>{
  if(!Cookies.get("tktplc") || userdetails === {}){
   setredirect(true)
  }else{
    setpaymentplan(data.name)
    setconfig(prev => ({...prev, amount:data.amount}))
    setpaymentselectionmodal(true)
  }
}
const hoverapp =()=>{
    setHovergrid("hoveredlandingapp")
}
const setmodal =(e)=>{
  setdisplaymodal(true)
 
  setmodaldetails(e.target.textContent)
}
    return ( 
        <div className='container-fluid' style={{backgroundColor:"rgba(245,245,245)",marginBottom:"100px",padding:"0",margin:"0",width:"100%"}}>
              <div style={{position:"fixed",display:`${displaymodal ? "block" : "none"}`,zIndex:"999900",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"30px",zIndex:"999900"}}>
           <span style={{float:"right",fontWeight:"lighter",color:"grey",fontSize:"25px"}} onClick={()=>setdisplaymodal(false)} className='fa fa-times'></span>
            <center>

              <h5 style={{fontWeight:"lighter"}}>{modaldetails}</h5>
              <br/>
             
              <p style={{fontWeight:"lighter",color:"grey"}}>{modaldetails} Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                 Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the</p>
            </center>
            </div>      
            </div>
             <div style={{display:`${paymentselectionmodal ? "block" : "none"}`,position:"fixed",zIndex:"90000",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"30px",zIndex:"900000"}}>
           <span className="fa fa-times" onClick={()=>setpaymentselectionmodal(false)} style={{fontWeight:"lighter",fontSize:"20px",position:"absolute",right:"20px"}}></span>
           <center>
            <p>Amount Due: {config.amount}</p>
           <small> <i style={{color:"indianred",display:`${payerr ? "block" : "none"}`}}>An Error Occured</i></small>
         <p style={{fontWeight:"lighter",padding:"0",margin:"0"}}>
           <input type="checkbox" checked={onlinepayment} name="onlinepayment" onChange={paymentsystemchange} /> I prefer Online Payment <span className='fa fa-credit-card'></span></p>
         <small style={{color:"grey",fontWeight:"lighter",fontSize:'12px'}}> * Please note that this payment is completely secured end-to-end and your details are inaccessible</small>
         <br/><br/>

         <p style={{fontWeight:"lighter",padding:"0",margin:"0"}}>
           <input type="checkbox" checked={offlinepayment} name="offlinepayment" onChange={paymentsystemchange} /> I would rather pay directly  <span className='fa fa-hand-o-right'></span></p>
         <small style={{color:"grey",fontWeight:"lighter",fontSize:'12px'}}>
          <p style={{color:"black",padding:"0",margin:"0"}}>* select your preferred means of communication the click "proceed"</p>
          <p style={{color:"black",padding:"0",margin:"0"}}> <span className='fa fa-phone-square'></span> 08169319476 <span style={{border:"1px solid grey",padding:"1px",borderRadius:"5px"}}> copy</span></p>
          <p className='mt-2' style={{color:"black",padding:"0",margin:"0"}}> <span className='fa fa-envelope'></span> yexies4ogb@gmail <span style={{border:"1px solid grey",padding:"1px",borderRadius:"5px"}}> copy</span></p>
           </small>
         <br/><br/>
         {onlinepayment ?              
               <PaystackButton className='paystackbtn' {...config} />
               : offlinepayment ? 
           <button className='paystackbtn' style={{backgroundColor:"green",color:"white"}}>
            Proceed 
           </button>
           : null}
           </center>
          </div>
          </div>
           <div className='row'>
             <div className='col-12 section_One' style={{height:"70vh",transition:"all linear 2s",width:'100%'}}>
             <div style={{height:"70vh",zIndex:"3000",width:'100%',backgroundColor:"rgba(0,0,0,0.4)",position:"absolute",left:"0px",top:"0px"}}>
             </div>
             <div style={{position:"absolute",zIndex:"99000",width:'100%',bottom:"30px"}}>
            <center>
            <h1 className='sect_onetext' style={{color:"white",fontWeight:"lighter",textTransform:"uppercase"}}>
                 Over 20 million registered nurses and doctors 
                 <br/>
                 <button className='btn btn-success' onClick={setmodal} style={{width:'100%'}}>
              Join Our Family 
             </button>
             </h1>
    
            </center>
             </div>
             <img style={{width:'100%',height:"70vh"}} src={section_img[imgtimer].img}/>
         </div>
           </div>
           <div className='container'>
            <button onClick={setmodal} className='btn' style={{position:"fixed",zIndex:"90",bottom:"20px",right:"10px",backgroundColor:"orange",color:'white'}}>
                contact us
            </button>
            
            <div className="row" style={{padding:"10px"}}>
                <div className='col-12 col-md-12 col-lg-8' style={{backgroundColor:"#007acc",color:'white',padding:"20px"}}>
                    <div>
                        <h2 style={{paddingBottom:"0",marginBottom:"0"}}>Compare Health Insurance</h2>
                        <small style={{fontSize:"14px"}}>We make getting a free quote simple. Use our powerful comparison tool to:</small>
                       <div className='row' style={{padding:"20px"}}>
                        <div className='col-7 mt-2'>
                            <p onClick={setmodal} style={{cursor:"pointer"}}><span className='fa fa-search fa-2x mr-1'></span> Identify your coverage needs</p><br/>
                            <p onClick={setmodal} style={{cursor:"pointer"}}><span className='fa fa-calendar fa-2x mr-1'></span>Review Health Care Plans</p><br/>
                            <p onClick={setmodal} style={{cursor:"pointer"}}><span className='fa fa-user fa-2x mr-1'></span> Speak With Our Insurance Advisors</p>
                        </div>
                        <div className='col-5' style={{padding:"20px"}}>
                            <div>
                                <img src={`https://www.pacificprime.com/assets/b/mo_side_entry.png`} />
                            </div>
                        </div>
                        <div className='col-12'>
                        <button className='btn' onClick={setmodal} style={{width:'100%',borderRadius:"40px",backgroundColor:"orange"}}>
                                          <p style={{padding:"0px 30px",fontSize:"20px",margin:"0",color:"white"}}>  Contact Us <span className='fa fa-chevron-circle-right'></span></p>
                                        </button>
                        </div>
                       </div>
                    </div>
                </div>
                <div className='d-none d-lg-block col-lg-4'>
                  <img style={{width:"100%",margin:"10px",borderRadius:"10px",boxShadow:"2px 2px 3px 3px lightgrey",height:"180px"}} src={`https://media.istockphoto.com/id/1005014108/photo/individual-health-insurance-policy-and-stethoscope.jpg?s=612x612&w=0&k=20&c=m10Up9PPs23BOOvTSKPCBhhNr0PneobgjLAHW05G2ek=`} />
                  <img style={{width:"100%",margin:"10px",borderRadius:"10px",boxShadow:"2px 2px 3px 3px lightgrey",height:"180px"}} src={`https://thumbs.dreamstime.com/b/stethoscope-text-health-insurance-screen-tablet-computer-written-its-table-full-charts-59782568.jpg`} />
                </div>
            </div>
           </div>
           <div style={{backgroundColor:"white",width:"100%",marginBottom:"50px"}}>
          <div className='container'>
          <div className='row' style={{padding:"30px",height:"100%",display:"flex"}}>
              <div className='col-12 col-md-12 col-lg-4' style={{padding:"10px"}}>
                <p onClick={setmodal} style={{fontSize:"30px",color:"black",fontWeight:"lighter"}}>Health Ins. Plans</p>
                <div>
  {plans.map(plan =>
   <div className='section_2div' onClick={()=>order(plan)}  style={{color:"white",cursor:"pointer",background:`${plan.color}`,border:"1px solid white",padding:"5px 20px",margin:"0"}}>
     <small style={{fontSize:"20px"}}>{plan.name}</small>
     <small style={{float:"right",fontSize:"20px"}}> <span style={{fontSize:"15px"}}>from</span> ₦{plan.amount},000</small>
   </div>
    )}
                </div>
              </div>
              <div className='col-12 col-md-12 col-lg-4' style={{padding:"10px"}}>
                <p style={{fontSize:"30px",color:"black",fontWeight:"lighter"}}>States</p>
                <div>
                {plans.map(plan =>
   <div onClick={()=>order(plan)} style={{color:"white",cursor:"pointer",backgroundColor:`${plan.color}`,border:"1px solid white",padding:"5px 20px",margin:"0"}}>
     <small style={{fontSize:"20px"}}>{plan.name}</small>
     <small style={{float:"right",fontSize:"20px"}}> <span style={{fontSize:"15px"}}>from</span> ₦{plan.amount},000</small>
   </div>
    )}
  
                </div>
              </div>
              <div className='col-12 col-md-12 col-lg-4' style={{padding:"10px",height:"100%"}}>
                <p style={{fontSize:"30px",color:"black",fontWeight:"lighter"}}>Prime Guides</p>
                <div>
                <div style={{color:"white",backgroundColor:"pink",height:"100px",border:"1px solid white",padding:"5px 20px",margin:"0"}}>
     <div className='row'>
        <div className='col-3'>
            <span className='fa fa-money fa-3x'></span>
        </div>
        <div className='col-9'>
           <small style={{fontSize:"30px"}}>Profile</small><br/>
           <small>State of Health Insurance 2021</small>
        </div>
     </div>
   </div>
   <div style={{color:"white",backgroundColor:"orange",height:"100px",border:"1px solid white",padding:"5px 20px",margin:"0"}}>
     <div className='row'>
        <div className='col-3'>
            <span className='fa fa-user fa-3x'></span>
        </div>
        <div className='col-9'>
           <small style={{fontSize:"30px"}}>Profile</small><br/>
           <small>State of Health Insurance 2021</small>
        </div>
     </div>
   </div>

                </div>
              </div>
            </div>
            <div className="row">
                <div className='col-12'>
                    <img style={{width:"100%",marginBottom:"20px"}} src={`https://www.pacificprime.com/assets/images/PPCOM's-and-PPSG's-homepage-banner2.jpg`} />
                  
                  
                  <center>
                  <div className='col-12 col-md-6'>
                    <button style={{width:'100%',color:"white",fontWeight:'lighter',borderRadius:"50px",backgroundColor:"#007acc"}} className='btn'>
                     <p >Learn More <span className='fa fa-chevron-circle-right mt-2' style={{float:'right'}}></span></p>
                    </button>
                  </div>
                  </center>
                </div>
            </div>
            <br/><br/>
            </div>
            </div>
           
     <div className="container">
     <div className='row mt-2'> 
                <div className='col-12 mb-2'>
                    <center><small style={{color:"orange",fontSize:'40px',fontWeight:"lighter"}}>The <span style={{fontWeight:"bolder"}}>Pacific Prime</span> Blog</small></center>
                    <center><small style={{color:"grey",fontSize:'30px',fontWeight:"lighter"}}>
                        News & Developments in international Health Insurance
                        </small></center>
                </div>
                <br/><br/>
                <div ref={section3}  className='observeX col-6 col-md-4 col-lg-3'>
                    <img src={`https://www.pacificprime.com/assets/images/s4-1.jpg?v=1`} />
                <p style={{fontSize:"18px",textAlign:"center",padding:"10px",fontWeight:"lighter"}}>Read Our Insurance Articles</p>
                </div>
                <div className='observeY col-6 col-md-4 col-lg-3'>
                    <img src={`https://www.pacificprime.com/assets/images/s4-2.jpg?v=1`} />
                <p style={{fontSize:"18px",textAlign:"center",padding:"10px",fontWeight:"lighter"}}>Read Our Articles On Group Insurance Solutions</p>
                </div>
                <div className='observeY col-6 col-md-4 col-lg-3'>
                    <img src={`https://www.pacificprime.com/assets/images/s4-3.jpg?v=1`} />
                <p style={{fontSize:"18px",textAlign:"center",padding:"10px",fontWeight:"lighter"}}>Read Our Latest News and Updates</p>
                </div>
                <div className='observeX col-6 col-md-4 col-lg-3'>
                    <img src={`https://www.pacificprime.com/assets/images/s4-2.jpg?v=1`} />
                <p style={{fontSize:"18px",textAlign:"center",padding:"10px",fontWeight:"lighter"}}>Read Our Articles On Group Insurance Solutions</p>
                </div>
            </div>
            <center>
                  <div className='col-12 col-md-4'>
                    <button style={{width:'100%',color:"white",fontWeight:'lighter',padding:"0px 10px",borderRadius:"50px",backgroundColor:"orange"}} className='btn'>
                     <p>Learn More <span className='fa fa-chevron-circle-right mt-2' style={{float:'right'}}></span></p>
                    </button>
                  </div>
                  </center>
                  <br/><br/>
     </div>
                  <div style={{backgroundColor:"white",width:"100%",marginBottom:"50px"}}>
                   <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-12 col-md-4 observeX'  style={{marginBottom:"40px",padding:"30px"}}>
                            <h5 onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>About Us</h5>
                            <p onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>View Our Profile</p>
                            <div onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
                                <div style={{position:"relative"}}>
                                    <div className='underdiv' style={{position:"absolute",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%"}}>
                                       
                                    </div>
                                <img style={{width:"100%",height:"180px"}} src={`https://www.pacificprime.com/assets/b/home_aboutus_01.jpg`} />
                                </div>
                                
                               <br/>
                                <small style={{fontWeight:"lighter"}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                 Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                                 <br/>
                           <span className='readmorebtn' style={{padding:"2px",fontWeight:"bolder",cursor:"pointer",color:"white",backgroundColor:"orange",border:"1px solid lightgrey",borderRadius:"5px"}}>read more ...</span></small>
                            </div>
                        </div>
                        <br/><br/>
                        <div className='col-12 col-md-4 observeY'  style={{padding:"30px",marginBottom:"40px"}}>
                            <h5 onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>Our Policy/Plans</h5>
                            <p onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>view Our Policies</p>
                            <div onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
                                <div style={{position:"relative"}}>
                                    <div className='underdiv' style={{position:"absolute",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%"}}>
                                       
                                    </div>
                                <img style={{width:"100%",height:"180px"}} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF9WIVIT6ufv7ipmIUbqz5CrUBkjXBG9l_RA&usqp=CAU`} />
                                </div>
                               <br/>
                                <small style={{fontWeight:"lighter"}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                 Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                                 <br/>
                           <span className='readmorebtn' style={{padding:"2px",fontWeight:"bolder",cursor:"pointer",color:"white",backgroundColor:"orange",border:"1px solid lightgrey",borderRadius:"5px"}}>read more ...</span>
                           <br/><br/></small>
                           <br/><br/>
                            </div>
                        </div>
                        <br/><br/>
                        <div className='col-12 col-md-4 observeX'  style={{marginBottom:"40px",padding:"30px"}}>
                            <h3 onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>Our Binding Power </h3>
                            <p onClick={setmodal} style={{fontWeight:"lighter",cursor:"pointer"}}>View What Binds us</p>
                            <div onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
                                <div style={{position:"relative"}}>
                                    <div className='underdiv' style={{position:"absolute",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%"}}>
                                       
                                    </div>
                                <img style={{width:"100%",height:"180px"}} src={`https://media.istockphoto.com/id/1344872631/photo/portrait-of-a-group-of-confident-young-businesspeople-working-together-in-a-modern-office.jpg?b=1&s=170667a&w=0&k=20&c=b5s611E4oqhs67lv8a8wSXuiqN8ZL3mFSdV_8ZE5AAQ=`} />
                                </div>
                                
                               <br/>
                                <small style={{fontWeight:"lighter"}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                 Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                                 <br/>
                           <span className='readmorebtn' style={{padding:"2px",fontWeight:"bolder",cursor:"pointer",color:"white",backgroundColor:"orange",border:"1px solid lightgrey",borderRadius:"5px"}}>read more ...</span></small>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div className='row' style={{marginTop:"50px"}}>
                        <div className='col-12'>
                            <center>
                                <h1 style={{fontSize:"50px",fontWeight:"lighter"}}>Currently <span style={{fontWeight:"bolder",color:"orange"}}>57,899+ </span>Plans From <span style={{fontWeight:"bolder",color:"orange"}}>50+ </span> Insurers</h1>
                                <p>Start by comparing the top health plans in your area</p>
                                <div className='row' >
                                    <div className='col-12 col-md-6' style={{marginBottom:"30px"}}>
                                        <button className='btn' style={{width:'100%',borderRadius:"40px",backgroundColor:"#007acc"}}>
                                        <p style={{padding:"0px 10px",color:"white"}}>   Get Quotes <span className='fa fa-chevron-circle-right'></span></p>
                                        </button>
                                    </div>
                                    
                                    <div className='col-12 col-md-6' style={{marginBottom:"20px"}}>
                                        <button className='btn ' style={{width:'100%',borderRadius:"40px",backgroundColor:"orange"}}>
                                          <p style={{padding:"0px 10px",color:"white"}}>  Contact Us <span className='fa fa-chevron-circle-right'></span></p>
                                        </button>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>
                   </div>
                    </div>
          <div className="footersm" style={{width:"100%",backgroundColor:"#002e4d"}}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-5'>
                    <small style={{fontSize:"50px",padding:"40px"}}>
                    <span style={{color:"white",fontWeight:"lighter"}}>Brand<span style={{color:"orange",fontWeight:"bold"}}>Icon</span></span>
                </small>
                    </div>
                    
                    <div className="col-12 col-md-7">
                        <input type="text" className='form-control' placeholder='complaints/feedback'></input><br/>
                        <div className='d-none d-md-block' style={{padding:"0",margin:"0"}}>
                        <button className='btn' style={{backgroundColor:"orange",width:'50%',color:"white"}}>
                            Send
                        </button>
                        </div>
                    </div>
                    <div className='d-done d-md-block col-md-7'></div>
                    <div className='col-12 d-md-none'>
                    <button className='btn' style={{backgroundColor:"orange",width:'100%',color:"white"}}>
                            Send
                        </button>
                    </div>
                </div>
                <br/><br/>
                <div className='row'>
                    <div className='col-6 col-md-3' style={{color:"white",padding:"20px"}}>
                     <h5>Our Profile</h5>
                     <div>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>About Us</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Partners</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Contact Us</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Our Focus</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Testimonies</p>
                     </div>
                    </div>
                    <div className='col-6 col-md-3' style={{color:"white",padding:"20px"}}>
                     <h5 >News</h5>
                     <div>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Latest</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Blogs</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Trending </p>
                     
                     </div>
                    </div>
                    <div className='col-6 col-md-3' style={{color:"white",padding:"20px"}}>
                    <h5><span className='fa fa-globe'></span> Location</h5>
                     <div>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Lagos</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Osun</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Ogun</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Ekiti</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}>Oyo</p>
                     </div>
                    </div>
                    <div className='col-6 col-md-3' style={{color:"white",padding:"20px"}}>
                   <h5>Socials</h5>
                     <div>
                        <p className="linker" style={{padding:"0",margin:"5px"}}><span style={{color:"skyblue",fontSize:"25px"}} className='fa fa-facebook-square '></span> Facebook</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}><span style={{color:"blue",fontSize:"25px"}} className='fa fa-twitter '></span> twitter</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}><span style={{color:"orange",fontSize:"25px"}} className='fa fa-instagram '></span> instagram</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}><span style={{color:"blue",fontSize:"25px"}} className='fa fa-linkedin fa-2x'></span> linkedin</p>
                        <p className="linker" style={{padding:"0",margin:"5px"}}><span style={{color:"lightgreen",fontSize:"25px"}} className='fa fa-whatsapp'></span> whatsapp</p>
                     </div>
                    </div>
                </div>
                <br/><br/><br/>
                <div className='col-12'>
                    <span style={{float:"right",color:"white"}}><small className='linker'>Home</small> | <small className='linker'>Terms of use</small> | <small className='linker'>Privacy</small> | <small className='linker'>Cookie policy</small> | <small className='linker'>faq</small></span>
                </div>
            </div>
          </div>
        </div>
     );
}

export default Landing;