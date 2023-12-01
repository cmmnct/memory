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
            name: "Jack",
            score: 0
        },
        {
            name: "Jill",
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
let currentPlayer = Math.random() < 0.5 ? data.players[0] : data.players[1];
let timer = undefined;
let pause = false;

function init() {
    data.cardsLeft = data.images.length;
    data.time.sec = 0;
    data.time.min = 0;
    let cardset = shuffle(data.images.concat(data.images))
    cardset.forEach(image => {
        let newCard = document.createElement("div");
        let newImage = document.createElement("img");
        let cover = document.createElement("div");
        newCard.setAttribute("data-card", image.name);
        newImage.src = `images/${image.name}.jpg`;
        cover.className = 'cover';
        newCard.appendChild(newImage);
        newCard.appendChild(cover);
        gameField.appendChild(newCard);



    })
    timer = setInterval(() => {
        console.log("tick");
        updateClock(data.time);
    }, 1000);

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
}

function checkMatch() {
    if (data.card1.dataset.card === data.card2.dataset.card) {
        currentPlayer.score++;
        data.cardsLeft--;
        data.card1.style.visibility = "hidden";
        data.card2.style.visibility = "hidden";
    } else {
        console.log("else called")
        data.card1.children[1].className = "cover";
        data.card2.children[1].className = "cover";
    }
    data.card1 = undefined;
    data.card2 = undefined;
    currentPlayer = currentPlayer === data.players[0] ? data.players[1] : data.players[0]

    if (data.cardsLeft === 0) {
        restart()
    } else {
        data.card1 = undefined;
        data.card2 = undefined;
        currentPlayer = currentPlayer === data.players[0] ? data.players[1] : data.players[0]
        pause = false;
    }
}

function restart() {
    console.log("restart!")
    clearInterval(timer);
    init();
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
    seconds = time.sec < 10 ? seconds = `0${time.sec}` : time.sec
    console.log(`${time.min} : ${seconds}`)

}

init();


