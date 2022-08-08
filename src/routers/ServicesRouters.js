const Model  = require('../Model/ServiceSchema');
const express = require('express')

const router = express.Router();
const cors = require('cors')

const app = express()

app.use(cors({
    
    origin:'*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }
));
//Add a new user (washer) to the DataBase





//Send services information to FrontEnd
router.get("/receiveServices", (req,res) =>{

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

//Add a new Service to the Database
router.post('/add', async (req,res) =>{
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

//Delete a service from database
router.delete('/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        
        await Model.findByIdAndRemove(req.params.id);
        return res.status(200).json({ success: true, msg: 'Product Deleted' })}catch(err){
            console.log(err)
        }
})




 module.exports = router