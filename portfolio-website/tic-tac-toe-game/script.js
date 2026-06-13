console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        // [box1, box2, box3, translateX, translateY, rotate]
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.Info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            // Applying the transform coordinates
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        // Added !isgameover so you can't click after the game ends
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("Info")[0].innerText  = "Turn for " + turn;
            } 
        }
    })
})

// Reset button logic
const resetBtn = document.getElementById('reset'); 
resetBtn.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    // Fixed the selector (removed the dot)
    document.getElementsByClassName("Info")[0].innerText  = "Turn for " + turn;
    // Fixed unit from 0vm to 0px
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});