const express = require('express')

const mongoose = require('mongoose')
var cors = require('cors')



const app = express();
 app.use(express.json());


 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://car-wash-back.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 mongoose.connect('mongodb+srv://vsa1410:vsa141094@cluster0.zgp4mbh.mongodb.net/?retryWrites=true&w=majority/car-wash' , err => {
    if(err) return console.log(err)

    console.log("DB Connected")
 })

 
 //model creation
 const  userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,

    },
    value:{
        type: String,
        defaultValue:0
    }

 })

 const User = mongoose.model("user", userSchema)

 const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    serviceName2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: String,
        required: true 
    },
    clientName: {
        type:String,
        required: true
    },
    servicePrice:{
        type: Number
    },
    servicePaid:{
        type: Boolean
    }
 })
 const Model = mongoose.model('service', serviceSchema)

 app.post('/addnewuser', async (req,res) =>{
    const {userName, value} = req.body;

    const newUser = new User ({
        userName,
        value
     })
    newUser.save()
    .then(console.log("sucess"))

 })

 app.get('/receiveusers', async (req,res)=> {
    User.find({ }, (err, users) =>{
        if(err) return res.status(400).send(err)

        res.send(users)
    })
 })




 app.get("/", (req,res) =>{

    Model
    .find({})
    .populate('serviceName')
    .populate('serviceName2')
    .exec(function(err, users) {
        if(err) console.log(err);
        //this will log all of the users with each of their posts 
        else res.send(users);
    }) 

})

 app.post('/add', async (req,res) =>{
    const {serviceName,serviceName2, date, clientName, servicePrice, servicePaid} = req.body;

   
    

    const newWash = new Model({
        serviceName,
        serviceName2, 
        date, 
        clientName, 
        servicePrice, 
        servicePaid
    })
    
    newWash.save()
    .then(console.log("sucess"))

 })

 app.delete('/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        
        await Model.findByIdAndRemove(req.params.id);
        return res.status(200).json({ success: true, msg: 'Product Deleted' })}catch(err){
            console.log(err)
        }
        })

app.delete('/deleteuser/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        
        await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({ success: true, msg: 'Product Deleted' })}catch(err){
            console.log(err)
        }
        })       

app.patch('/:id', async(req,res)=>{
    try {
        
        
        
        let doc = await User.findByIdAndUpdate(req.params.id,req.body);
        
        
        console.log(doc)
    } catch (error) {
        console.log(error)
    }

    
    
})
app.patch('/user2/:id', async(req,res)=>{
    try {
        
        
        
        let doc = await User.findByIdAndUpdate(req.params.id,req.body);
        
        
        console.log(doc)
    } catch (error) {
        console.log(error)
    }

    
    
})

 app.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
    
