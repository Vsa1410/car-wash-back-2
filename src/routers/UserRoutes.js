const User = require( '../Model/UserSchema');

const app = require('express');
const router = app.Router();

const cors = require('cors')

const app = express()

app.use(cors({
    
    origin:'*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }
));


router.post('/addnew', async (req,res) =>{
    const {userName, value} = req.body;

    const newUser = new User ({
        userName,
        value
     })
    newUser.save()
    .then(console.log("sucess"))

 })

  //Send users(washers) info to the Front End
  router.get('/receiveusers', async (req,res)=> {
    User.find({ }, (err, users) =>{
        if(err) return res.status(400).send(err)

        res.send(users)
    })
 })
//Delete a user from DataBase        
router.delete('/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        
        await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({ success: true, msg: 'Product Deleted' })}catch(err){
            console.log(err)
        }
})  


//Change the balance value of the serviceName1      
router.patch('/:id', async(req,res)=>{
    try {
        
        
        
        let doc = await User.findByIdAndUpdate(req.params.id,req.body);
        
        
        console.log(doc)
    } catch (error) {
        console.log(error)
    }

    
    
})

//Change the balance value of the serviceName2
router.patch('/user2/:id', async(req,res)=>{
    try {
        
        
        
        let doc = await User.findByIdAndUpdate(req.params.id,req.body);
        
        
        console.log(doc)
    } catch (error) {
        console.log(error)
    }

    
    
})


 module.exports = router