const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
mongoose.connect('mongodb+srv://avenger:n2bM4mO8WtUVaM5U@cluster0.dihxr.mongodb.net/useracc?retryWrites=true&w=majority',
    {
        useNewUrlParsel: true,
        useUnifiedTopology: true
    }
);

app.get('/users', function (req, res) {
    User.find().select('email').then((data) => {
        res.status(201).json(data)
    })
})
app.post('/user', jsonParser, function (req, res) {
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })
    data.save().then((result) => {
        res.status(201).json(result)
    })
        .catch((error) => console.warn(error))
})
app.delete('/user/:id', function (req, res) {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result)
    }).catch((error) => console.warn(error))
})
app.put('/user/:id', jsonParser, function (req, res) {
    User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address
            }
        }).then((result) => {
            res.status(200).json(result)
        }).catch((error) => console.warn(error))
})
app.get('/search/:name', function (req, res) {
    var regex = new RegExp(req.params.name, 'i');
    User.find({ name: regex }).then((result) => {
        res.status(200).json(result)
    })
})
app.listen(4000)
