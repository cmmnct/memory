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
    card2: undefined
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
        newCard.append(newImage);
        newCard.append(cover);
        gameField.append(newCard);


    })

}
function onTurnCard(event) {
    if (event.target.className === "cover" && !data.card1) {
        console.log("card 1 clicked");
        event.target.className = "";
        data.card1 = event.target.parentNode;
    } else if (event.target.className === "cover" && data.card1) {
        console.log("card 2 clicked");
        event.target.className = "";
        data.card2 = event.target.parentNode;
        if (data.card1.dataset.card === data.card2.dataset.card) {
            currentPlayer.score++;
            data.card1.style.visibility = "hidden";
            data.card2.style.visibility = "hidden";
        } else {
            console.log("else called")
            data.card1.children[1].className = "cover";
            data.card2.children[1].className = "cover";
        }
        data.card1 = undefined;
        data.card2 = undefined;
        currentPlayer = currentPlayer === data.players[0]? data.players[1] : data.players[0]
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


