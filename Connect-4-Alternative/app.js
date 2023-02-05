while (!player1){
    var player1 = prompt('Player One: Enter your name. You will be red.');
};
var player1Color = 'red';

while (!player2){
    var player2 = prompt('Player Two: Enter your name. You will be yellow.');
};
var player2Color = 'yellow';

while (!player3){
    var player3 = prompt('Player Three: Enter your name. You will be blue.');
};
var player3Color = 'blue';

while (!player4){
    var player4 = prompt('Player Four: Enter your name. You will be green.');
};
var player4Color = 'green';

// Selectors


var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
const resetBtn = document.querySelector('.reset');


var currentPlayer = 1;
let winner;
playerTurn.textContent = `${player1}'s turn!`

// Log cell coordinates when clicked

for (i = 0; i < tableData.length; i ++){
    tableData[i].addEventListener('click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};


// Functions

function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;
    let row = [];

    for (i = 8; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            
            //player 1 win condition
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            }
            //player 2 win condition
            else if (currentPlayer === 2){
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player3}'s turn`;
                    return currentPlayer = 3;
                }
                
            }
            //player 3 win condition
            else if (currentPlayer === 3){
                row[0].style.backgroundColor = 'blue';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player3} WINS!!`;
                    playerTurn.style.color = player3Color;
                    return alert(`${player3} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player4}'s turn`;
                    return currentPlayer = 4;
                }
                
            }
            //player 4 win condition
            else if (currentPlayer === 4){
                row[0].style.backgroundColor = 'green';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player4} WINS!!`;
                    playerTurn.style.color = player4Color;
                    return alert(`${player4} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }
                
            }
        }
    }
   
}

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < tableRow.length; row++){
        for (let col =0; col < 9; col++){
           if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 12; col++){
        for (let row = 0; row < 6; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 9; col++){
        for (let row = 0; row < 6; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 9; col++){
        for (let row = 8; row > 6; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < tableData.length; i++){
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length){
        return true;
    }
}


resetBtn.addEventListener('click', () => {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });
    playerTurn.style.color = 'black';
    return (currentPlayer === 1);
});