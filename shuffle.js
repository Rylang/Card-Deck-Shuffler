let deck = [];
let players = [];
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

function createDeck() {
    const deck = [];

    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(new card(suit, value))
        })
    });

    return deck;
}

function dealHands() {
    createPlayers();
    shuffle();
    deal();
}

function shuffle() {
    // Credit to Richard Durstenfeld for the shuffle alogorithm implemented below.
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    } 
}

function createPlayers() {
    let numberOfPlayers = Number(document.getElementById("ddlPlayers").value);
    let emptyHand = [];

    for (let playerName = 1; playerName <= numberOfPlayers; playerName++) {
        players.push(new player(playerName, emptyHand));
    }
}

function deal() {
    while (true) {
        for (i = 0; i < players.length; i++) {
            console.log(i);
            // players[i].card.push(getCard());
            if (i = players.length - 1 && deck.length > 0) {
                console.log("Restart looping through players.")
                console.log("i equals players.length");
                continue;
            }
            else {
                console.log("Done Looping");
                break;
            }
        }
    }
}

function getCard() {
    if (deck.length > 0) {
        return deck.pop();
    }
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
    deck = createDeck();

    let select = document.getElementById("ddlPlayers"); 

    for(let i = 1; i < deck.length + 1; i++) {
        let element = document.createElement("option");
        element.textContent = i;
        element.value = i;
        select.appendChild(element);
    }
}

window.onload = load;