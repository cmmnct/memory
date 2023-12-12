const data = {
    images: [
        { name: "cow" },
        { name: "pig" },
        { name: "horse" },
        { name: "cat" },
        { name: "goat" },
        { name: "dog" },
        { name: "duck" },
        { name: "hen" }
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
    timer: undefined,
    time: {
        min: 0,
        sec: 0
    }
}

const gameField = document.getElementById("game-field");
const gameTimer = document.getElementById("game-timer");
const textPlayer1 = document.getElementById("player-1");
const textPlayer2 = document.getElementById("player-2");
const gameChat = document.getElementById("chat");
let currentPlayer = Math.random() < 0.5 ? data.players[0] : data.players[1]  // ternairy operator

function init() {
    let cardSet = shuffle(data.images.concat(data.images));
    gameField.innerHTML = "";
    cardSet.forEach(image => {
        let newCard = document.createElement("div");
        newCard.setAttribute("data-card", image.name)
        let newImage = document.createElement("img");
        let cover = document.createElement("div");
        newImage.src = `/images/${image.name}.jpg`;
        cover.className = "cover";
        newCard.append(newImage, cover);
        gameField.append(newCard);

    })
    data.time.sec = 0;
    data.time.min = 0;
    data.timer = setInterval(updateTime, 1000);
    if (data.players[0].name === "") {
        data.players[0].name = prompt("Naam speler 1", "speler 1");
    }
    if (data.players[1].name === "") {
       data.players[1].name = prompt("Naam speler 2", "speler 2");
    }
    gameChat.innerHTML = `<p>${currentPlayer.name} is aan zet!</p>`;
}

function onTurnCard(event) {
    if (event.target.className === "cover" && !data.card2) {
        console.log("card clicked");
        event.target.className = "";
        if (!data.card1) {
            data.card1 = event.target.parentElement;
            console.log(data.card1);
        } else if (data.card1) {
            data.card2 = event.target.parentElement;
            console.log(data.card2);
            setTimeout(() => checkMatch(), 1000);
        }

    }
}

function checkMatch() {
    if (data.card1.dataset.card === data.card2.dataset.card) {
        currentPlayer.score++;
        gameChat.innerHTML = `<p>${currentPlayer.name} heeft een punt! Je mag nog een keer!</p>`;
        data.card1.style.visibility = "hidden";
        data.card2.style.visibility = "hidden";

        if (data.images.length === data.players[0].score + data.players[1].score) {
            reset();
        }
        // punt voor speler, kaartjes wegnemen, checken of er nog kaartjes liggen dan door, anders spel stoppen
    } else {
        data.card1.children[1].className = "cover";
        data.card2.children[1].className = "cover";
        currentPlayer === data.players[0] ? currentPlayer = data.players[1] : currentPlayer = data.players[0];
        gameChat.innerHTML = `<p>${currentPlayer.name} is nu aan zet</p>`;
        // kaartjes terugdraaien en verder met de volgende speler
    }
    data.card1 = undefined;
    data.card2 = undefined;
}

function reset() {
    clearInterval(data.timer);
    if (confirm("Nog een spel?")) {
        init();
    }
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

function updateTime() {
    data.time.sec++;
    let sec_f = data.time.sec;
    if (sec_f === 60) {
        data.time.sec = 0;
        data.time.min++;
    }
    if (sec_f < 10) sec_f = `0${sec_f}`;
    console.log(`${data.time.min} : ${sec_f}`);
    gameTimer.innerHTML = `<p>${data.time.min} : ${sec_f}</p>`;
    textPlayer1.innerHTML = `<p>${data.players[0].name} : ${data.players[0].score}</p>`;
    textPlayer2.innerHTML = `<p>${data.players[1].name} : ${data.players[1].score}</p>`;


}

init()