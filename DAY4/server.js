const express = require('express');
const path = require('path')
const bodyparser = require('body-parser')

const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./models/question')


// kết nối mongoodb server

mongoose.connect('mongodb://localhost:27017/quyetde', { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('connect mongodb successfully');
});

const app = express();

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

app.get('/random-question', async (req, res) => {
    // fs.readFile('data.json', (err, data) =>{
    //     if(err) return res.send({ success : 0});

    //     const questions = JSON.parse(data)

    //     const randomIndex =getRandomInt(0, questions.length);
    //     const foundQuesion = questions[randomIndex];

    //     res.send({ success: 1, data: foundQuesion })
    // })

    // monggodb c1:  
    // const questions = await QuestionModel.find();
    // const randomIndex =getRandomInt(0, questions.length);
    // const foundQuesion = questions[randomIndex];
    // return res.send({ success: 1, data: foundQuesion })
    // monggodb c2:

    const questions = await QuestionModel.aggregate([
        { $sample: { size: 1 } }
    ]);
    if (questions.length) {
        const foundQuestion = questions[0];
        return res.send({
            success: 1, data: {
                ...foundQuestion,
                id: foundQuestion._id,
            }
        });
    }
    return res.sendFile({ success: 0 })
})


app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname + '/client/create-question.html')
    res.sendFile(pathFile)
})

app.get('/search', (req, res) => {
    const pathFile = path.resolve(__dirname + '/client/search.html')
    res.sendFile(pathFile)
})

app.get('/create-question.css', (req, res) => {
    const pathFile = path.resolve(__dirname + '/client/create-question.css')
    res.sendFile(pathFile)
})



app.listen(3000, (err) => {
    if (err) throw err;

    console.log('sever started')
})

app.get('/search-question', async (req, res) => {
    const { keyword } = req.query;
    
    const newRegex = new RegExp(keyword, 'i');
    const questions = await QuestionModel.find({ content: { $regex: newRegex } });

    return res.send({ success: 1, data: questions })
})

app.post('/create-question', async (req, res) => {
    // const { content } = req.body; // cách 1
    // // const content = req.body.content // cách 2

    // // input: content
    // //output: new question lưu trong data.json
    // // đọc list question cũ trong file
    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 })
    //     const oldQuestions = JSON.parse(data);

    //     // bước2: tạo 1 question
    //     const newQuestion = {
    //         id: oldQuestions.length,
    //         content,
    //         yesCount: 0,
    //         noCount: 0
    //     }
    //     //bước3: add new question vào cuối array
    //     // oldQuestions.push(newQuestion)
    //     const newQuestions = [...oldQuestions, newQuestion]

    //     fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
    //         if (err) return res.send({ success: 0 })

    //         res.send({ success: 1, data: newQuestion })
    //     })
    // })

    //monggodb:

    const { content } = req.body;

    const newQuestionData = { content };
    const newQuestion = await QuestionModel.create(newQuestionData);

    res.send({
        success: 1, data: {
            ...newQuestion,
            id: newQuestion._id,
        }
    })
})



app.get('/question/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/detail-question.html'))
})

app.get('/detail-question/:id', async (req, res) => {
    const idQuestion = req.params.id;

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));
    //     if (!foundQuestion) {
    //         return res.send({ success: 0 });
    //     }
    //     return res.send({ success: 1, data: foundQuestion })
    // })

    // monggodb:

    const foundQuestion = await QuestionModel.findById(idQuestion);
    if (!foundQuestion) {
        return res.send({ success: 0 });
    }
    return res.send({ success: 1, data: foundQuestion });

})

app.get('/vote-question/:idQuestion/:voteType', async (req, res) => {
    const { idQuestion, voteType } = req.params;
    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));
    //     if (!foundQuestion) {
    //         return res.send({ success: 0 });
    //     }

    //     // thay đổi vote
    //     // cách 1:

    //     // if(voteType === 'no') {
    //     //     foundQuestion.noCount++;
    //     // } else if(voteType === 'yes'){
    //     //     foundQuestion.yesCount++;
    //     // }

    //     //cách 2 :

    //     foundQuestion[`${voteType}Count`]++

    //     //lưu lại question
    //     fs.writeFileSync('data.json' , JSON.stringify(questions))
    //     return res.send({ success: 1, data: foundQuestion })
    // })

    //  monggodb c1:

    // const question = await QuestionModel.findById(idQuestion);

    // if (question) {
    //     question[`${voteType}Count`]++;
    //     await question.save();
    //     return  res.send({ success: 1, data: question })
    // }
    // return  res.send({ success: 0});

    // monggodb c2:

    const question = await QuestionModel
        .findByIdAndUpdate(
            idQuestion,
            {
                $inc: { [`${voteType}Count`]: 1 }
            },
            {
                new: true
            }

        );
    return res.send({ success: 1, data: question })
});

app.get('*', (request, response) => {
    response.send({ say: '404' });
})