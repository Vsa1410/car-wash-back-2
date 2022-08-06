const express = require('express')
const userRoutes = require('./src/routers/UserRoutes')
const serviceRoutes = require('./src/routers/ServicesRouters')

const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser')




const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));



 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 mongoose.connect('mongodb+srv://vsa1410:vsa141094@cluster0.zgp4mbh.mongodb.net/?retryWrites=true&w=majority/car-wash' , err => {
    if(err) return console.log(err)

    console.log("DB Connected")
 })

 

//Routes to resolve user data
    app.use('/user', userRoutes);

//Routes to resolve service data
    app.use('/services', serviceRoutes)  



//Start the server
 app.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
    
