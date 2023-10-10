export default class Board {
    constructor (){
        this.initialArr =[
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
        ];
    }
//create board
    createBoard (arr){
        const boardElement = document.getElementById("board");
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] == 0) {
                const createPosition = document.createElement("button");
                createPosition.className = "stoneplace";
                createPosition.setAttribute("id", i);
                createPosition.setAttribute("value", j);
                createPosition.setAttribute("name", i + '-' + j);
                createPosition.setAttribute("onclick", 'sendPlacementValue(id, value)');
                boardElement.appendChild(createPosition);
                const createVerticalLine = document.createElement("div");
                const createHorizontalLine = document.createElement("div");
                createPosition.appendChild(createVerticalLine);
                createPosition.appendChild(createHorizontalLine);
                createVerticalLine.setAttribute('class', 'vertical')
                createHorizontalLine.setAttribute('class', 'horizontal')
                } else if (arr[i][j] == 1) {
                const createBlack = document.createElement("div");
                createBlack.classList.add('black');
                boardElement.appendChild(createBlack);
                } else {
                const createWhite = document.createElement("div");
                createWhite.classList.add('white');
                boardElement.appendChild(createWhite);
                }
            }
        }   
    }
//remove old board
    removeBoard (){
        document.getElementById('board')
        .remove();
        const boardedge = document.getElementById('boardedge');
        const createBoardElement = document.createElement("div");
        createBoardElement.setAttribute("id", 'board');
        boardedge.appendChild(createBoardElement);
    }
//replace empty space with stone instantly 
    replaceWithBlackStone = (id, value) => {
        const getButton = document.getElementsByName(id + '-' + value)[0];
        const blackStone = document.createElement("div");
        getButton.parentNode.replaceChild(blackStone, getButton);
        blackStone.classList.add('black');
    }
    replaceWithWhiteStone = (id, value) => {
        const getButton = document.getElementsByName(id + '-' + value)[0];
        const whiteStone = document.createElement("div");
        getButton.parentNode.replaceChild(whiteStone, getButton);
        whiteStone.classList.add('white');
    }
//condition to win
    conditionToWin = (id, value, placementArr, turn) => {
        let yAxial = [];
        let xAxial = [];
        let upperLeftAxial = [];
        let upperRightAxial = [];
        id = parseInt(id);
        value = parseInt(value);
        for (let i = 0; i < 15; i++) {
            yAxial.push(placementArr[i][value]);
            xAxial.push(placementArr[id][i]);
        };
        for (let i = 0; i < 15-Math.abs(id-value); i++) {
            if(id-value >= 0) {
                upperLeftAxial.push(placementArr[id-value+i][i]);
            } else if(id-value < 0) {
                upperLeftAxial.push(placementArr[i][value-id+i]);
            };
        };
        for (let i = 0; i < 15-Math.abs(id+value-14); i++) {
            if(id+value >= 14) {
                upperRightAxial.push(placementArr[id+value-14+i][14-i]);
            } else if(id+value < 14) {
                upperRightAxial.push(placementArr[i][id+value-i]);
            };
        };
        //check if have 5 same stone in a row
        const checkBlackARow = (...args) => {
            let score = 0;
            for(let i = 0; i < [...args].length; i++) {
                for(let j = 0; j < [...args][i].length; j++) {
                    if([...args][i][j] == 1) {
                        score++;
                        if(score >= 5) {
                            sendWin(1);
                        }
                    } else {
                        score = 0;
                    }
                }
            }
        }
        const checkWhiteARow = (...args) => {
            let score = 0;
            for(let i = 0; i < [...args].length; i++) {
                for(let j = 0; j < [...args][i].length; j++) {
                    if([...args][i][j] == 2) {
                        score++;
                        if(score >= 5) {
                            sendWin(2);
                        }
                    } else {
                        score = 0;
                    }
                }
            }
        }
        if (turn == 2) {
            checkBlackARow(yAxial, xAxial, upperLeftAxial, upperRightAxial);
        } else {
            checkWhiteARow(yAxial, xAxial, upperLeftAxial, upperRightAxial);
        }
    }
    youWin = () => {
//Display You win!
        const display = document.getElementById('display');
        display.innerHTML = 'You win!';
//Disable all the button when match is over
        const disableStoneplace = document.getElementsByTagName('button');
        for (let i = 0; i < disableStoneplace.length; i++) {
            disableStoneplace[i].disabled = true;
        }
    }
    youLose = () => {
//Display You lose!
        const display = document.getElementById('display');
        display.innerHTML = 'You lose!';
//Disable all the button when match is over
        const disableStoneplace = document.getElementsByTagName('button');
        for (let i = 0; i < disableStoneplace.length; i++) {
            disableStoneplace[i].disabled = true;
        }
    }
}



