const deck = [];
let isAnimating = false
let flippedCards = []
const healthContainer = document.querySelector('.lives-container');
const maxHealth = 3;
let currentHealth = maxHealth;
const playAgainButton = document.querySelector('.play-again');

 


document.addEventListener('DOMContentLoaded', function() {
    const allCards = [
        { name: "Kthulu-snake", img: "/Card-1.png" },
        { name: "merMan", img: "/Card 2.png" },
        { name: "beholder", img: "/Card 3.png" },
        { name: "strife", img: "/Card 4.png" },
        { name: "griphon", img: "/Card 5.png" },
        { name: "octopusMan", img: "/card 6.png" },
        { name: "Kthulu-snake", img: "/Card-1.png" },
        { name: "merMan", img: "/Card 2.png" },
        { name: "beholder", img: "/Card 3.png" },
        { name: "strife", img: "/Card 4.png" },
        { name: "griphon", img: "/Card 5.png" },
        { name: "octopusMan", img: "/card 6.png" }
    ];


    

    const cardPositions = [
        {x: 25, y: 20}, {x: 290, y: 20}, {x: 550, y: 20},
        {x: 810, y: 20}, {x: 1070, y: 20}, {x: 1330, y: 20},
        {x: 25, y: 385}, {x: 290, y: 385}, {x: 550, y: 385},
        {x: 810, y: 385}, {x: 1070, y: 385}, {x: 1330, y: 385}
    ];

  
    


   
2
    const startButton = document.querySelector('.start');

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        const sound = new Audio("/Click-2.mp3");
        sound.play();
        startGame();
        shuffleDeck(deck)

        setUpCardPosition();
        showHealth()
        setTimeout(function() {
            flipAllCards(true); // Automatically flip all cards after 1 second
        }, 2000);
        
        setTimeout(flipAllCardsBack, 4000);
        
        // Using a regular function expression for the setTimeout
        setTimeout(function() {
            cardFlipOnClick();
        }, 5000);
        
        
    });



    function startGame() {
        const cardWidth = '250px';
        const cardHeight = '350px';

       

        // Create the card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.height = '800px';
        cardContainer.style.width = '1600px';
       
        document.body.appendChild(cardContainer);

        for (let i = 0; i < allCards.length; i++) {
            const card = document.createElement('div');
            card.className = 'card';

            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            cardInner.style.height = cardHeight;
            cardInner.style.width = cardWidth; 

            const cardFront = document.createElement('img');
            cardFront.className = 'card-face card-front';
            cardFront.src = allCards[i].img;
            cardFront.style.height = cardHeight;
            cardFront.style.width = cardWidth;

            const cardBack = document.createElement('img');
            cardBack.className = 'card-face card-back';
            cardBack.src = '/black_and_white_deck_of_cards_inked_hp_lovecraft_ink_on_old_parchment_559433871.png';
            cardBack.style.height = cardHeight;
            cardBack.style.width = cardWidth;

         


            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            cardContainer.appendChild(card);
           
            deck.push(card);

        }
    }

   

    function setUpCardPosition() {
        for (let i = 0; i < deck.length; i++) {
            const card = deck[i];
            const pos = cardPositions[i];
            if (pos) {
                card.style.position = 'absolute';
                card.style.left = `${pos.x}px`;
                card.style.top = `${pos.y}px`;
            }
        }
    }
});

function flipAllCards(isInitialFlip = false) {
    deck.forEach(card => {
      if(isInitialFlip){
        card.classList.add('flipped')
      } else{
        card.classList.toggle('flipped')
      }
       setTimeout(function(card){
        card.classList.remove('flipping');
       }.bind(null,card), 600);
       })
      
    };


function flipAllCardsBack() {
    deck.forEach(card => {
        card.classList.remove('flipped'); // Remove the 'flipped' class to revert to the original state
    });
}



function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

function cardFlipOnClick() {
    deck.forEach(card => {
        card.addEventListener('click', function() {
            if (isAnimating || flippedCards.includes(this)) return; // Prevent actions if animating or card already flipped

            if (flippedCards.length < 2) {
                this.classList.toggle('flipped');
                flippedCards.push(this); // Add card to flippedCards array

                if (flippedCards.length === 2) {
                    checkForMatch(); // Check if two flipped cards match
                }
            }
        });
    });
}

function checkForMatch() {
    if (flippedCards.length !== 2) return; // Ensure exactly two cards are flipped

    isAnimating = true;

    const [card1, card2] = flippedCards;

    if (!card1 || !card2) {
        console.error("One or both cards are undefined");
        isAnimating = false;
        flippedCards = [];
        return;
    }

    const card1Front = card1.querySelector('.card-front');
    const card2Front = card2.querySelector('.card-front');

    if (card1Front && card2Front) {
        if (card1Front.src === card2Front.src) {
            // Cards match
            card1.classList.add('card-disabled'); // Apply CSS class
            card2.classList.add('card-disabled'); // Apply CSS class
            flippedCards = [];
            isAnimating = false;

            // Check for win condition
            if (deck.every(card => card.classList.contains('card-disabled'))) {
                youWin();
            }
        } else {
            // Cards don't match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                isAnimating = false;
                currentHealth--;
                updateHealth();
            }, 1000);
        }
    } else {
        console.error("Card elements missing front faces");
        isAnimating = false;
        flippedCards = [];
    }
}


function updateHealth(){

setTimeout(() => {

    const healthImages = healthContainer.querySelectorAll('img');
    for(let i = 0; i < healthImages.length; i++){
        if(i < currentHealth){
            healthImages[i].style.display = 'block';
        } else{
            healthImages[i].style.display = 'none';
        }
    }

    if(currentHealth === 0){
        gameOver();
    }

}, 600)
}

function youWin(){
    const winImage = document.querySelector('.win-image');
    winImage.style.display = 'block'
    playAgainButton.style.display = 'block'
    
}

    



function gameOver(){
    const gameOverImage = document.querySelector('.game-over-image');
    gameOverImage.style.display = 'block';
    playAgainButton.style.display = 'block';
}

playAgainButton.addEventListener('click', ()=>{
    location.reload();
});


function showHealth() {
    healthContainer.style.display = 'flex';
}