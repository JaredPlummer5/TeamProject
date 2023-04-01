let Connect4Parent = document.getElementById("Connect4");

let game = function () {
    this.slots = slots; // this should be an array
}

let slot = function (postition, color, neighbors) {
    this.postition = postition; // where it is on the board
    this.color = null; // changes to the color of the piece
    this.neighbors = neighbors; // array surrounding pieces

}

let column = function () {
    this.clicks = 0;
    this.coloumnHTML = coloumnHTML;
    this.filledSlot = function () {
        console.log("This is the filled Slot method");
    }


}
//game.slots = new slot({}, null, []);
//console.log(game.slots)


let slotsArray = [];



function board() {

    for (let j = 1; j <= 7; j++) {
        let placeHolderParent = document.createElement("div");
        placeHolderParent.clicks = 1;

        placeHolderParent.addEventListener("click", function (event) {
            let pieceHeight = placeHolderParent.clicks;
            let slotToFill = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${placeHolderParent.clicks}`)
            console.log('look', slotToFill)
            console.log(event.target.id.slice(-1), pieceHeight);
            console.log(event.target);
            SelectedPlayer(slotToFill);
            placeHolderParent.clicks++;
        });

        for (let i = 6; i >= 1; i--) {

            let placeHolder = document.createElement("div");

            placeHolder.id = `PlaceHolder${j}x${i}`;

            placeHolder.className = `PlaceHolders`;

            placeHolder.innerHTML = `PlaceHolder${j}x${i}`;

            placeHolderParent.className = `PlaceHoldersParent`;

            placeHolderParent.append(placeHolder);


            let newSlot = new slot({}, null, [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }]);
            newSlot.placeHolder = placeHolder.id


            newSlot.postition = { x: j, y: i };
            slotsArray.push(newSlot);

            // We need to create an array of objects and the index of i instead of putting object name

        }
        placeHolderParent.id = `PlaceHolder${j}Parent`;

        Connect4Parent.append(placeHolderParent);
    }

}
board();

console.log(slotsArray);

let Turn = 1;
function SelectedPlayer(slotToFill) {
    let pieces = null;
    if ((Turn % 2) === 1) {
        pieces = "red";

    } else if ((Turn % 2) === 0) {
        pieces = "blue";
    } else {
        pieces = null;
    }
    slotToFill.style.backgroundColor = pieces;
    Turn++
}

//Connect4Parent.addEventListener("click", SelectedPlayer)

