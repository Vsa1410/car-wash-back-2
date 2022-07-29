const express = require('express')

const mongoose = require('mongoose')
var cors = require('cors')



const app = express();
 app.use(express.json());
 app.use(cors());

 app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });


 mongoose.connect('mongodb+srv://vsa1410:vsa141094@cluster0.zgp4mbh.mongodb.net/?retryWrites=true&w=majority/car-wash' , err => {
    if(err) return console.log(err)

    console.log("DB Connected")
 })

 
 //model creation
 const  userSchema = new mongoose.Schema({
    name:{
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
    name: {
        type: ObjectId,
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
    const {name, value} = req.body;

    const newUser = new User ({
        name,
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

    Model.find({ }, (err, books) =>{
        if(err) return res.status(400).send(err)

        res.send(books)
    })
 })

 app.post('/add', async (req,res) =>{
    const {name, date, clientName, servicePrice, servicePaid} = req.body;

   
    

    const newWash = new Model({
        name, 
        date, 
        clientName, 
        servicePrice, 
        servicePaid
    })
    Model.find({}).populate("user").exec((err, result) => {
        if(err){
            return  res.json({error :  err})
        }
        res.json({result :  result})
        });
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

 app.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
    
