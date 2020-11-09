const textArea = document.querySelector('.formQuestion'); // jquery: $('.formQuestion)
const form = document.getElementById('form');   // $('#form)

// bbắt sự kiện
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    // lấy giá trị của textarea
    const content = textArea.value; // textArea.val()
    // b3: gửi lên sever
    $.ajax({
        url: 'http://localhost:3000/create-question',
        type: 'POST',
        data: {
            content
        },
        success: (res) =>{
            if(res.success){
                const idQuestion = res.data.id;
                window.location.href = 'http://localhost:3000/question/' + idQuestion;
            }
        },
        error: (res) =>{
            console.log(res)
        }
    })
})
textArea.addEventListener('input' , () =>{  // textArea.on('input, () =>{})
    const content = textArea.value;
    const restCharacterLength = 200 - content.length;

    const restSpan = document.getElementById('rest')
    restSpan.innerHTML = restCharacterLength;
})