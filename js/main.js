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
    ]
}

const gameField = document.getElementById("game-field");
let currentPlayer = Math.random() < 0.5 ? data.players[0] : data.players[1];

function init() {

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

}
function onTurnCard(event) {
    if (event.target.className === "cover") {
        console.log("card clicked");
        event.target.className = "";
    }

}

function checkMatch() {

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

init();


