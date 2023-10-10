//import { json } from "express";
import Board from "./board.js";

const board = new Board();

//board initial board
board.createBoard(board.initialArr)

//declare Board functions globally 
window.createBoard = (arr) => {
    board.createBoard(arr);
}
window.removeBoard = () => {
    board.removeBoard();
}
window.replaceWithBlackStone = (id, value) => {
    board.replaceWithBlackStone(id, value);
}
window.replaceWithWhiteStone = (id, value) => {
    board.replaceWithWhiteStone(id, value);
}
window.conditionToWin = (id, value, placementArr, turn) => {
    board.conditionToWin(id, value, placementArr, turn);
}
window.youWin = () => {
    board.youWin();
}
window.youLose = () => {
    board.youLose();
}
window.initialArr = board.initialArr;


