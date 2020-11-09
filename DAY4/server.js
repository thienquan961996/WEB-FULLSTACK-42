const express = require('express');
const path = require('path')
const bodyparser = require('body-parser')
const app = express();
const fs = require('fs');


app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static('client'))

app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/home.html')
    res.sendFile(pathFile)
})

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/random-question', (req,res) =>{
    fs.readFile('data.json', (err, data) =>{
        if(err) return res.send({ success : 0});

        const questions = JSON.parse(data)

        const randomIndex =getRandomInt(0, questions.length);
        const foundQuesion = questions[randomIndex];

        res.send({ success: 1, data: foundQuesion })
    })
})


app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname + '/client/create-question.html')
    res.sendFile(pathFile)
})

// app.get('/create-question.css', (req, res) =>{
//     const pathFile = path.resolve(__dirname + '/client/create-question.css')
//     res.sendFile(pathFile)
// })

app.listen(3000, (err) => {
    if (err) throw err;

    console.log('sever started')
})

app.post('/create-question', (req, res) => {
    const { content } = req.body; // cách 1
    // const content = req.body.content // cách 2

    // input: content
    //output: new question lưu trong data.json
    // đọc list question cũ trong file
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 })
        const oldQuestions = JSON.parse(data);

        // bước2: tạo 1 question
        const newQuestion = {
            id: oldQuestions.length,
            content,
            yesCount: 0,
            noCount: 0
        }
        //bước3: add new question vào cuối array
        // oldQuestions.push(newQuestion)
        const newQuestions = [...oldQuestions, newQuestion]

        fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
            if (err) return res.send({ success: 0 })

            res.send({ success: 1, data: newQuestion })
        })
    })
})

app.get('/question/:id', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './client/detail-question.html'))
})

app.get('/detail-question/:id', (req, res) => {
    const idQuestion = req.params.id;

    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        const questions = JSON.parse(data);
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));
        if (!foundQuestion) {
            return res.send({ success: 0 });
        }
        return res.send({ success: 1, data: foundQuestion })
    })

})

app.get('/vote-question/:idQuestion/:voteType', (req,res) =>{
    const { idQuestion, voteType } = req.params;
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        const questions = JSON.parse(data);
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));
        if (!foundQuestion) {
            return res.send({ success: 0 });
        }

        // thay đổi vote
        // cách 1:

        // if(voteType === 'no') {
        //     foundQuestion.noCount++;
        // } else if(voteType === 'yes'){
        //     foundQuestion.yesCount++;
        // }

        //cách 2 :

        foundQuestion[`${voteType}Count`]++
        
        //lưu lại question
        fs.writeFileSync('data.json' , JSON.stringify(questions))
        return res.send({ success: 1, data: foundQuestion })
    })
}); 

app.get('*', (request, response) => {
    response.send({ say: '404' });
})