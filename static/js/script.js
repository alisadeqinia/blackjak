/* blackJak game scripts
write by AliSadeqinia */

// Define global vars for each round scores
var playerSum = 0;
var botSum = 0;
// Define card objects to pick cards randomly
let cards = [
    {
        1:"static/image/clubs/1.jpg",
        2:"static/image/clubs/2.jpg",
        3:"static/image/clubs/3.jpg",
        4:"static/image/clubs/4.jpg",
        5:"static/image/clubs/5.jpg",
        6:"static/image/clubs/6.jpg",
        7:"static/image/clubs/7.jpg",
        8:"static/image/clubs/8.jpg",
        9:"static/image/clubs/9.jpg",
        10:"static/image/clubs/10.jpg",
        11:"static/image/clubs/j.jpg",
        12:"static/image/clubs/q.jpg",
        13:"static/image/clubs/k.jpg",
    },
    {
        1:"static/image/diamonds/1.jpg",
        2:"static/image/diamonds/2.jpg",
        3:"static/image/diamonds/3.jpg",
        4:"static/image/diamonds/4.jpg",
        5:"static/image/diamonds/5.jpg",
        6:"static/image/diamonds/6.jpg",
        7:"static/image/diamonds/7.jpg",
        8:"static/image/diamonds/8.jpg",
        9:"static/image/diamonds/9.jpg",
        10:"static/image/diamonds/10.jpg",
        11:"static/image/diamonds/j.jpg",
        12:"static/image/diamonds/q.jpg",
        13:"static/image/diamonds/k.jpg",
    },
    {
        1:"static/image/hearts/1.jpg",
        2:"static/image/hearts/2.jpg",
        3:"static/image/hearts/3.jpg",
        4:"static/image/hearts/4.jpg",
        5:"static/image/hearts/5.jpg",
        6:"static/image/hearts/6.jpg",
        7:"static/image/hearts/7.jpg",
        8:"static/image/hearts/8.jpg",
        9:"static/image/hearts/9.jpg",
        10:"static/image/hearts/10.jpg",
        11:"static/image/hearts/j.jpg",
        12:"static/image/hearts/q.jpg",
        13:"static/image/hearts/k.jpg",
    },
    {
        1:"static/image/spades/1.jpg",
        2:"static/image/spades/2.jpg",
        3:"static/image/spades/3.jpg",
        4:"static/image/spades/4.jpg",
        5:"static/image/spades/5.jpg",
        6:"static/image/spades/6.jpg",
        7:"static/image/spades/7.jpg",
        8:"static/image/spades/8.jpg",
        9:"static/image/spades/9.jpg",
        10:"static/image/spades/10.jpg",
        11:"static/image/spades/j.jpg",
        12:"static/image/spades/q.jpg",
        13:"static/image/spades/k.jpg",
    }
];
// Get HTML element first in order to reduce requests
let playerSumBox = document.getElementById('playerSum');
let botSumBox = document.getElementById('botSum');
let winBox = document.getElementById('win');
let loseBox = document.getElementById('lose');
let drawBox = document.getElementById('draw');
let statusBox = document.getElementById('status');
let playerBox = document.getElementById('playerBox');
let botBox = document.getElementById('botBox');

//Define a function to make counters that count each round result.
function makeCounter() {
    let i = 0;
    function counter() {
        i+=1;
        return i;
    }
    return counter;
}
// Creat counters.
var draw = makeCounter();
var win = makeCounter();
var lose = makeCounter();

// Define hit function to choose how pick and show a card and calculate player score.
function hit() {
    // Pick card.
    let cardNo = Math.floor(Math.random()*13)+1;
    // Choose card classes.
    let cardClass = Math.floor(Math.random()*4);
    // Find picked card's src image address.
    let card = cards[cardClass][cardNo];
    // Show card image.
    let cardImage = document.createElement('img');
    cardImage.src = card;
    playerBox.appendChild(cardImage);
    // Score calculation and determine player situation.
    switch (cardNo) {
        case 1:
            if (playerSum >= 11) {
                playerSum += 1;
            }else {
                playerSum += 11;
            break;
            }
        case 2: case 3: case 4: case 5: case 6: case 7: case 8:
        case 9:
            playerSum += cardNo;
            break;
        case 10: case 11: case 12:
        case 13:
            playerSum += 10;
            break;
        case "بیشتر شد":
            break;
    }
    // Show player situation in current round.
    if (playerSum <= 21) {
        playerSumBox.innerHTML = playerSum;
    }else {
        playerSum = "بیشتر شد";
        playerSumBox.innerHTML = playerSum;
        playerSumBox.style.color = "red";
    }
    const hitSound = new Audio("static/sounds/swish.m4a");
    hitSound.play();
}


// With Stand function bot runs to play.
function stand() {
    // it's 15 to prevent BUST bot every time. with change this number botAI decision will be change.
    while (botSum <= 15) {
        let cardNo = Math.floor(Math.random()*13)+1;
        let cardClass = Math.floor(Math.random()*4);
        let card = cards[cardClass][cardNo];
        let cardImage = document.createElement('img');
        cardImage.src = card;
        botBox.appendChild(cardImage);
        switch (cardNo) {
            case 1:
                if (botSum >= 11) {
                    botSum += 1;
                }else {
                    botSum += 11;
                break;
                }
            case 2: case 3: case 4: case 5: case 6: case 7: case 8:
            case 9:
                botSum += cardNo;
                break;
            case 10: case 11: case 12:
            case 13:
                botSum += 10;
                break;
        }
    }
    // Show bot situation in current round.
    if (botSum > 21) {
        botSum = "بیشتر شد";
        botSumBox.style.color = 'red';
    }
    botSumBox.innerHTML = botSum;
    // Decide who wins and add result in table.
    if (botSum === playerSum) {
        drawBox.innerHTML = draw();
        statusBox.innerHTML = "مساوی شدید"
    }else if (botSum < playerSum) {
        winBox.innerHTML = win();
        statusBox.innerHTML = "شما بردی"
        statusBox.style.color = 'aqua';
        const winSound = new Audio("static/sounds/cash.mp3");
        winSound.play();
    }else {
        loseBox.innerHTML = lose();
        statusBox.innerHTML = "شما باختی"
        statusBox.style.color = 'red';
        const loseSound = new Audio("static/sounds/aww.mp3");
        loseSound.play();
    }
}


// Set all boxes, variables and styles to first state to start new round.
function deal() {
    botSumBox.innerHTML = 0;
    botSumBox.style.color = 'white';
    playerSumBox.innerHTML = 0;
    playerSumBox.style.color = 'white';
    statusBox.innerHTML = "نامشخص";
    statusBox.style.color = 'white';
    playerSum = 0;
    botSum = 0;
    // Delete card pictures.
    playerBox.innerHTML = "";
    botBox.innerHTML = "";
}

// Reset the game for new game.
function reset() {
    deal();
    winBox.innerHTML = 0;
    loseBox.innerHTML = 0;
    drawBox.innerHTML = 0;
    win = makeCounter();
    lose = makeCounter();
    draw = makeCounter();
}


