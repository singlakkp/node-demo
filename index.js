const express = require("express") //minimalist web framework of node
const cors = require("cors")//to prevent unauthorized access  on a web page from different origins
const mongoose = require("mongoose")

const app = express()
//app.use is middleware to the application’s request
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemadata = mongoose.Schema({
    name:String,
    email:String,
    phonenumber:Number,
},{
    timestamps: true
})

//link with db model
const userModel = mongoose.model("user",schemadata)

app.get("/",async(req,res)=>{
    const data =  await userModel.find({})
    console.log(data)
    res.json({success:true,data:data})
})

//save data in db
app.post("/create",async (req,res)=>{
    console.log(req.body)
    const data = userModel(req.body)
    await data.save()
    res.send({success:true,message:"new user is created"})
})


app.put("/update",async(req,res)=>{
    console.log(req.body);      

    //static values
    //await userModel.updateone({_id:req.body.id},{name:"aemily"})
    
    const {_id,...rest} = req.body
    console.log(rest);
    const data = await userModel.updateOne({_id:_id},rest)

    res.send({success: true,message:"user information updated successfully",data:data})
})

app.delete("/delete/:id",async(req,res)=>{
    const id =  req.params.id
    console.log(id)

    const data = await userModel.deleteOne({_id:id})

    res.send({success:true,message:"user is deleted",data:data})

})

// Define a GET route
// app.get("/",(req,res)=>{
//    // res.send('Welcome to the Express.js Tutorial');
//     res.json({message:"server is runiinng"})
// })

//mongoose.connect("mongodb://localhost:27017/crudoperation")
mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(() => {
    console.log('Connected to MongoDB...')
    app.listen( PORT,()=>console.log("SERVER IS running"))
})
.catch(err => console.log('Could not connect to MongoDB...', err));
