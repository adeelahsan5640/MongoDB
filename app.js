const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users');
mongoose.connect('mongodb+srv://avenger:n2bM4mO8WtUVaM5U@cluster0.dihxr.mongodb.net/useracc?retryWrites=true&w=majority',
    {
        useNewUrlParsel: true,
        useUnifiedTopology: true
    }
);

app.get('/users',function(req,res){
    User.find().select('name').then((data)=>{
        res.status(201).json(data)
    })
})
app.listen(4000)
