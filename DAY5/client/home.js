
const form = $('#btn');

form.on('click', (event) =>{
    event.preventDefault();

    const player1 = $('#player1').val();
    const player2 = $('#player2').val();
    const player3 = $('#player3').val();
    const player4 = $('#player4').val();

   $.ajax({
    url: 'http://localhost:2000/create-game',
    type: 'POST',
    data: {
      user1: player1,
      user2: player2,
      user3: player3,
      user4: player4
    },
    success: (res) => {
      if (res.success) {
        const idGame = res.data.id;
        window.location.href = "http://localhost:2000/game/" + idGame;
      }
    },
    error: (res) => {
      console.log(res);
    }
   })

}) 