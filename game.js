CARDS = document.querySelectorAll('.memory-card');

let flippedCard = false;
let lockBoard = false
let firstCard;
let secondCard;
let moveCounter = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        flippedCard = false;
        secondCard = this;
checkMatch();
    }
    moveCounter++;
    console.log(moveCounter);
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function checkMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
    disableCard();
    } else {
    unflipCard()
    }
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    CARDS.forEach(card => {
        let randomNumber = Math.floor(Math.random() * 13);
        card.style.order = randomNumber;
    });
})();
CARDS.forEach(card => card.addEventListener('click', flipCard));

