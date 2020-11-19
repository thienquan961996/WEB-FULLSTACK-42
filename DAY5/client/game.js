const pathName = window.location.pathname;
const idGame = pathName.split('/').pop();

let gamePlay = {
    players: [],
    rounds: [],
    Point: 0,
    PointPlayer: [0,0,0,0],
    id:0
}

// $.ajax({
//     url: `http://localhost:2000/game/` + idGame,
//     method: 'GET',
//     success: (res) =>{
//         gamePlay.players = res.game.players
//         gamePlay.rounds = res.game.rounds
//         gamePlay.id = res.game._id

// })

