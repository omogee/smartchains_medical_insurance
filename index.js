const express = require("express")
const app = express()
const conn = require("./conn")

app.get(`/register`, (req, res)=>{
    console.log(JSON.parse(req.query.inputs))
    const input = JSON.parse(req.query.inputs)
    conn.query(`select * from smartcc where email =?`,[input.email], (err, existing_client)=>{
        if (err) throw err;
        if(existing_client && existing_client.length > 0){
            res.json({status:"failed",message:"email already exist"})
        }else{
            conn.query(`insert into smartcc (fullname, email,contact,password,time) values (?,?,?,?,?)`,
            [input.fullname,input.email, input.contact,input.password,Date.now()],(err, inserted)=>{
                if (err) throw err;
             if(inserted){
                res.json({status:"success",message:"data recieved successfully"})
             }else{
                res.json({status:"failed",message:"An error occured"})
             }
            })
        }
    })
   
})
app.get(`/login`,(req,res)=>{
    console.log(JSON.parse(req.query.inputs))
    const input = JSON.parse(req.query.inputs)
    conn.query(`select * from smartcc where email=? && password=?`,[input.email,input.password],(err, existing_client)=>{
        if (err) throw err;
        if(existing_client && existing_client.length > 0){
            conn.query(`update smartcc set navigator=?`,[input.realprint],(err, updated)=>{
                if (err) throw err;
                if(updated){
                    res.json({status:"success",client:existing_client[0],message:"login successful"})
                }else{
                res.json({status:"failed",message:"an error occured"})
                }
            })
        }else{
            res.json({status:"failed",message:"email/password mismatch"})
        }
    })
    
})
app.get(`/fetch_client`, (req, res)=>{
    conn.query(`select * from smartcc where smartccid =?`,[req.query.tkt], (err, client)=>{
        if (err) throw err;
        if(client && client.length > 0){
            res.json({status:"success",client:client[0]})
        }else{
            res.json({status:"failed",message:`client doesnt exist`})
        }
    })
})
app.get(`/payment_update`, (req, res)=>{
    const tkt = req.query.tkt;
    conn.query(`update customer set paystatus =?,payplan=?, payref=?,payment_time=? where customerId= 1`, ["paid", req.query.payplan,req.query.ref,Date.now(),tkt], (err, updated)=>{
        if (err) throw err;
        if(updated){
            res.json({status:"success", message:`payment has been received successfully`})
        }else{
            res.json({status:"failed", message:"An Error Occured, kindly give us a few minutes to rectify this"})
        }
    })
})
const port = 5000 || process.env.Port
app.listen(port,()=>{
 console.log("listening on port 5000")
})