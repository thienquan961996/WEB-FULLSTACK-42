const express = require('express');
const path = require('path')
const bodyparser = require('body-parser')

const fs = require('fs');
const mongoose = require('mongoose');
const GameModel = require('./models/game')
 

mongoose.connect('mongodb://localhost:27017/miniHack', { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('connect mongodb successfully');
});

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('client'));


app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/home.html')
    res.sendFile(pathFile)
})



app.get('/game/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/game.html'))
})



app.listen(2000, (err) => {
    if (err) throw err;

    console.log('sever started')
})

app.post('/create-game', async (req, res) =>{
    const { user1, user2, user3, user4 } = req.body;

    const newGameData = { 
        players: [user1, user2, user3, user4]
     };
     console.log(newGameData)
    const newGame = await GameModel.create(newGameData);

    res.send({
        success: 1, data: {
            ...newGame,
            id: newGame._id,
        }
    })
});