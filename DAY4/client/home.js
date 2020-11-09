//lấy id câu hỏi


let idQuestion;

const getRandomQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/random-question/`,
        method: 'get',
        success: (res) => {
            if (res.success) {
                const question = res.data;
                const { content, yesCount, noCount, id } = question;

                // nhiệm vụ render client
                idQuestion = id;


                document.getElementById('contentQuestion').innerHTML = question.content; // $('#contentQuestion').html(question.content)
            }
        },
        error: (res) => {
            console.log(res)
        }
    })
}
getRandomQuestion();

document.getElementById('ortherQuestion').addEventListener('click', () => {  //$('#ortherQuestion').on('click'), () =>{}
    getRandomQuestion();
})

const sendRequestVote = (type) =>{
    $.ajax({
        url: `http://localhost:3000/vote-question/${idQuestion}/${type}`,
        method: 'get',
        success: (res) => {
            console.log(res);
            window.location.href = `http://localhost:3000/question/${idQuestion}`
        }
    })
};
document.getElementById('noBtn').addEventListener('click', () => {
    // gọi lên server request
    // $.ajax({
    //     url: `http://localhost:3000/vote-question/${idQuestion}/no`,
    //     method: 'get',
    //     success: (res) => {
    //         console.log(res);
    //         window.location.href = `http://localhost:3000/question/${idQuestion}`
    //     }
    // })
    sendRequestVote('no');
});
document.getElementById('yesBtn').addEventListener('click', () => {
    // gọi lên server request

    // $.ajax({
    //     url: `http://localhost:3000/vote-question/${idQuestion}/yes`,
    //     method: 'get',
    //     success: (res) => {
    //         console.log(res);
    //         window.location.href = `http://localhost:3000/question/${idQuestion}`
    //     }
    // })
    sendRequestVote('yes');
})
