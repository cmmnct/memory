const data = {
     images : [
    { name: "cow" },
    { name: "horse" },
    { name: "goat" },
    { name: "hen" },
    { name: "dog" },
    { name: "duck" },
    { name: "pig" },
    { name: "cat" },
    ],
    players : [
    {
        name: "Jack",
        score :  0
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
    data.images.forEach(image => {
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
}

function onTurnCard() {

}

function checkMatch() {

}

init();


