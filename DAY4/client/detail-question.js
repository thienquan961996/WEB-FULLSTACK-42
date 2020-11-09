//lấy id câu hỏi

const pathname = window.location.pathname
let idQuestion = pathname.split('/').pop()

$.ajax({
    url: `http://localhost:3000/detail-question/${idQuestion}`,
    method: 'get',
    success: (res) =>{
        const question = res.data;
        const { content, yesCount, noCount} = question;
        const total = parseInt(yesCount) + parseInt(noCount)
        const percentYes = total !==0 ? (parseInt(yesCount) / total *100).toFixed(2) : parseFloat(50).toFixed(2)
        const percentNo = (100 - percentYes).toFixed(2)
        
        document.getElementById('contentQuestion').innerHTML = content; // $('#contentQuestion').html(content)
        document.getElementById('percentYes').innerHTML = percentYes;   // $('#percentYes').html(percentYes)
        document.getElementById('percentNo').innerHTML = percentNo; // $('#percentNo').html(percentNo)
        document.getElementById('totalVote').innerHTML = total; // $('#totalVote').html(total)
    },
    error: (res) =>{
        console.log(res)
    }
})

