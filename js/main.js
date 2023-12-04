const data = {
    images: [
        { name: "cow" },
        { name: "horse" },
        { name: "goat" },
        { name: "hen" },
        { name: "dog" },
        { name: "duck" },
        { name: "pig" },
        { name: "cat" },
    ],
    players: [
        {
            name: "",
            score: 0
        },
        {
            name: "",
            score: 0
        }
    ],
    card1: undefined,
    card2: undefined,
    cardsLeft: 0,
    time: {
        min: 0,
        sec: 0
    }
}

const gameField = document.getElementById("game-field");
const txtPlayer1 = document.getElementById("player1");
const txtPlayer2 = document.getElementById("player2");
const timerText = document.getElementById("timer");
const chatBox = document.getElementById("chat-box");
let currentPlayer = Math.random() < 0.5 ? data.players[0] : data.players[1];
let timer = undefined;
let pause = false;


function init() {
if (!data.players[0].name) { data.players[0].name = prompt("Naam van speler 1") };
if (!data.players[1].name) { data.players[1].name = prompt("Naam van speler 2") };
    updateUI(data.time);
    data.cardsLeft = data.images.length;
    data.time.sec = 0;
    data.time.min = 0;
    data.card1 = undefined;
    data.card2 = undefined;
    let cardset = shuffle(data.images.concat(data.images));
    gameField.innerHTML = "";
    cardset.forEach(image => {
        let newCard = document.createElement("div");
        let newImage = document.createElement("img");
        let cover = document.createElement("div");
        newCard.setAttribute("data-card", image.name);
        newImage.src = `images/${image.name}.jpg`;
        cover.className = 'cover';
        newCard.append(newImage);
        newCard.append(cover);
        gameField.append(newCard);
    })
    timer = setInterval(() => {
        console.log("tick");
        updateClock(data.time);
    }, 1000);
    updateChat(`${currentPlayer.name} is aan zet!`);
}
function onTurnCard(event) {
    if (event.target.className === "cover" && !data.card1 && !pause) {
        console.log("card 1 clicked");
        event.target.className = "";
        data.card1 = event.target.parentNode;
    } else if (event.target.className === "cover" && data.card1 && !pause) {
        console.log("card 2 clicked");
        event.target.className = "";
        data.card2 = event.target.parentNode;
        pause = true;
        setTimeout(() => checkMatch(), 2000);
    }
    updateUI(data.time);
}

function checkMatch() {
    if (data.card1.dataset.card === data.card2.dataset.card) {  // de kaartjes matchen
        currentPlayer.score++;
        data.cardsLeft--;
        data.card1.style.visibility = "hidden";
        data.card2.style.visibility = "hidden";
        updateChat(`${currentPlayer.name} heeft een punt en blijft aan zet!`)
    } else {
        // console.log("else called")
        data.card1.children[1].className = "cover";
        data.card2.children[1].className = "cover";
        currentPlayer = currentPlayer === data.players[0] ? data.players[1] : data.players[0];
        updateChat(`${currentPlayer.name} is aan zet!`);

        console.log("current player : " + currentPlayer.name);
    }
    if (data.cardsLeft === 0) {
        restart()
    } else {
        data.card1 = undefined;
        data.card2 = undefined;
        pause = false;
    }
}

function updateChat(text) {
    //let chatText = document.createElement("p");
   // chatText.innerHTML = text;
    // chatBox.append(chatText);
    chatBox.innerHTML = `<p>${text}</p>`;
}

function restart() {
    console.log("restart!")
    clearInterval(timer);
    if (confirm("Nog een spel?")) {
        init();
    };
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function updateClock(time) {
    time.sec++
    if (time.sec === 60) {
        time.sec = 0;
        time.min++
    }

    updateUI(data.time);

}

function updateUI(time) {
    seconds = time.sec < 10 ? seconds = `0${time.sec}` : time.sec
    timerText.innerHTML = `<p>${time.min} : ${seconds}</p>`;
    txtPlayer1.innerHTML = `<p>${data.players[0].name} : ${data.players[0].score}</p>`;
    txtPlayer2.innerHTML = `<p>${data.players[1].name} : ${data.players[1].score}</p>`;
}

init();


