let deck = [];
let players = {};
const suits = ["♣", "♦", "♥", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(new card(suit, value))
        })
    });
}

function dealHands() {
    createDeck();
    createPlayers();
    shuffle();
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
    players = {};
    let numberOfPlayers = Number(document.getElementById("ddlPlayers").value);
    let emptyHand = [];

    for (let playerName = 0; playerName < numberOfPlayers; playerName++) {
        players.push(new player(playerName, emptyHand));
    }
}

function deal() {
    for (i = 0; i < players.length; i++) {
        if (deck.length === 0) {
            break;
        }
        let dealtCard = getCard();
        players[i].hand.push(dealtCard);
        console.log(`Player ${players[i].name} was dealt ${dealtCard.value}${dealtCard.suit}.`);
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
    // let pElement1 = document.createElement("P");
    // let pHands1 = document.createTextNode("Player 1: ");
    // pElement1.appendChild(pHands1);
    // divPlayerHands.appendChild(pElement1);

    // pElement1 = document.createElement("P");
    // pHands1 = document.createTextNode("Player 2: ");
    // pElement1.appendChild(pHands1);
    // divPlayerHands.appendChild(pElement1);

    console.log(`Players: ${players.length}`);
    console.log(`Deck Length: ${deck.length}`);
    players.forEach(p => {
        console.log(`Player ${p.name} card count: ${p.hand.length}`);
        p.hand.forEach(c => {
            // console.log(`Player ${p.name}: ${c.value}${c.suit}`);
        })


    //     let pElement = document.createElement("P");
    //     let playerTextNode = document.createTextNode(`Player ${player.name}: `);
        
    //     // pElement.appendChild(playerTextNode)
    //     // player.hand.forEach(card => {
    //     //     let cardTextNode = document.createTextNode(`${card.value}${card.suit}, `);
    //     //     pElement.appendChild(cardTextNode);
    //     // })
    //     // divPlayerHands.appendChild(pElement);
    })
}

function getCard() {
    return deck.pop();
}

function card(suit, value) {
    this.suit = suit;
    this.value = value;
}

function player(name, hand) {
    this.name = name;
    this.hand = hand;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
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