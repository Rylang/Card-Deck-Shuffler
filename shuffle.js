let deck = [];
let players = [];
const suits = ["♣", "♦", "♥", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(new card(suit, value));
        });
    });
}

function dealHands() {
    createDeck();
    shuffle();
    createPlayers();
    deal();
    renderHands();
}

function shuffle() {
    // Credit to Richard Durstenfeld for the shuffle alogorithm implemented below.
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    } 
}

function createPlayers() {
    players = [];
    let numberOfPlayers = Number(document.getElementById("ddlPlayers").value);

    for (let playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
        players.push(new player(playerNumber + 1));
    }
}

function deal() {
    for (i = 0; i < players.length; i++) {
        if (deck.length === 0) {
            break;
        }
        let dealtCard = getCard();
        players[i].hand.push(dealtCard);
        if (i === players.length - 1 && deck.length > 0) {
            i=-1; continue;
        }
    }
}

function renderHands() {
    let divPlayerHands = document.getElementById("divPlayerHands");

    while (divPlayerHands.lastChild) {
        divPlayerHands.removeChild(divPlayerHands.lastChild);
    }
    
    players.forEach(player => {
        let playerHandText = `${player.name}: `;

        player.hand.forEach(card => {
            let cardText = `${card.value}${card.suit}, `;
            playerHandText = playerHandText.concat(cardText);
        })

        let pElement = document.createElement("P");
        let playerTextNode = document.createTextNode(playerHandText.slice(0, -2));
        pElement.appendChild(playerTextNode);
        divPlayerHands.appendChild(pElement);
    });
}

function getCard() {
    return deck.pop();
}

function card(suit, value) {
    this.suit = suit;
    this.value = value;
}

function player(number) {
    this.name = `Player ${number}`;
    this.hand = [];
}

function load() {
    let select = document.getElementById("ddlPlayers"); 

    for(let i = 1; i < 53; i++) {
        let element = document.createElement("option");
        element.textContent = i;
        element.value = i;
        select.appendChild(element);
    }
}

window.onload = load;