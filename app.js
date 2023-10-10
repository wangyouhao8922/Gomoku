const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const { deleteOne } = require('./models/stonesplacement');
const StonePlacement = require('./models/stonesplacement');

//change const here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const dbURI = 'mongodb+srv://stanleylol:oiuytrewedf@cluster0.hxpeu4r.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority';

//connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//set public avalible
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//send board.html to browser
app.get('/player1', (req, res) => {
    res.sendFile(__dirname + '/public/board.html');
});

app.get('/player2', (req, res) => {
    res.sendFile(__dirname + '/public/board.html');
});

//create database for a match
let placementObject;
let win = 0;
app.get('/', (req, res) => {
    StonePlacement.deleteOne({'__v':0})
    .then((result) => {
        console.log(result)
        })
        turn = 1;
    const stonePlacement = new StonePlacement({
        'match1': [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        'win': 0
    });
    stonePlacement.save()
    .then((result) => {
        placementObject = result;
        res.redirect('/player1')
    })
    
});

app.post('/win', (req, res) => {
    win = req.body.win;
    placementObject.win = win;
    res.json(placementObject);
})

let turn;
app.post('*', (req, res) => {
    if(req.originalUrl == "/player1") {
//update placement of player1 to database
        let i = Object.keys(req.body);
        let j = Object.values(req.body);
        placementObject.match1[i][j] = 1;
//placementObject.win = win;
        let matchId = placementObject._id;
        StonePlacement.findById(matchId)
        .updateOne(placementObject)
        .then((result) => {
            console.log(result)
        })
//if turn == player1 then send the response
        turn = 2;
        const intervalid = setInterval(() => {
            if (turn == 1 || win == 1) {
                placementObject.turn = 1;
                res.json(placementObject);
            clearInterval(intervalid);
        } 1000});
        
    } else if (req.originalUrl == "/player2") {
//update placement of player1 to database
        let i = Object.keys(req.body);
        let j = Object.values(req.body);
        placementObject.match1[i][j] = 2;
//placementObject.win = win;
        let matchId = placementObject._id;
        StonePlacement.findById(matchId)
        .updateOne(placementObject)
        .then((result) => {
            console.log(result)
        })
//if turn == player2 then send the response
        turn = 1;
        const intervalid = setInterval(() => {
            if (turn == 2 || win == 2) {
                placementObject.turn = 2;
                res.json(placementObject);
                clearInterval(intervalid);
            } 1000
        });
    }
});

//update board without any limitation
app.get('/initialUpdateBoard', (req, res) => {
    placementObject.turn = turn;
    res.json(placementObject);
});

//update board only when it is players turn
app.get('/player1/turnUpdateBoard', (req, res) => {
    const intervalid = setInterval(() => {
    if (turn == 1) {
        placementObject.turn = 1;
        res.json(placementObject);
        clearInterval(intervalid);
    } 1000});
})
app.get('/player2/turnUpdateBoard', (req, res) => {
    const intervalid = setInterval(() => {
    if (turn == 2) {
        placementObject.turn = 2;
        res.json(placementObject);
        clearInterval(intervalid);
    } 1000});
})
