//declare gobal variable
let placementArr = [];
let win;

//Run once to update board when connected or refresh the page
window.addEventListener('load', function () {
    placementArr = window.initialArr;
    fetch('/updateboard', {
        method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            window.removeBoard();
            window.createBoard(data.match1);
            placementArr = data.match1;
            win = data.win;
            if (data.turn == 0) {
                turn = 1;
            } else {
                turn = data.turn;
            }
        })
    });

let turn;
const sendPlacementValue = (id, value, placementId = {}) => {
    //replace empty space with stone instantly 
    if (turn == 1 & window.location.pathname == '/player1') {
        window.replaceWithBlackStone(id, value);
        turn = 2;
        placementArr[id][value] = 1;
        window.conditionToWin(id, value, placementArr, turn);
        sendFetch(id, value, placementId = {}, win);
    } else if (turn == 2 & window.location.pathname == '/player1') {
        console.log("It is not your turn!")
    } else if (turn == 2 & window.location.pathname == '/player2'){
        window.replaceWithWhiteStone(id, value);
        turn = 1;
        placementArr[id][value] = 2;
        window.conditionToWin(id, value, placementArr, turn);
        sendFetch(id, value, placementId = {}, win);
    } else {
        console.log("It is not your turn!")
    }
}

//client send placementId and update board
const sendFetch = (id, value, placementId = {}, win) => {
    placementId[id] = value;
    fetch(document.URL, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(placementId)
})
    .then(res => {
    return res.json()
})
    .then(data => {
        window.removeBoard();
        window.createBoard(data.match1);
        placementArr = data.match1;
        turn = data.turn;
        //display win or not 
        win = data.win;
        if (win == 1 & window.location.pathname == '/player1'){
            window.youWin();
        } else if (win == 2 & window.location.pathname == '/player1') {
            window.youLose();
        } else if (win == 2 & window.location.pathname == '/player2') {
            window.youWin();
        } else if (win == 1 & window.location.pathname == '/player2') {
            window.youLose();
        }
    })
}

//send win request
const sendWin = (win, winObject = {}) => {
    winObject.win = win;
    fetch('/win', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(winObject)
})
    .then(res => {
    return res.json()
})
    .then(data => {
        win = data.win;
        if (win == 1 & window.location.pathname == '/player1'){
            window.youWin();
        } else if (win == 2 & window.location.pathname == '/player1') {
            window.youLose();
        } else if (win == 2 & window.location.pathname == '/player2') {
            window.youWin();
        } else if (win == 1 & window.location.pathname == '/player2') {
            window.youLose();
        }
    })
}