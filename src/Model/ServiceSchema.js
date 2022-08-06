const mongoose = require('mongoose')
const express = require('express')

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

 module.exports = Model