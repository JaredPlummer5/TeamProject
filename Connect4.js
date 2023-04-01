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
            let rowNumber = event.target.id.slice(-1);
            let pieceHeight = placeHolderParent.clicks;
            let slotClassArray = Array.from(event.target.classList)
            if (slotClassArray.includes('PlaceHolders')) {
                
                console.log(event.target.id.slice(-1), pieceHeight);
                if (rowNumber == pieceHeight) {
                    
                    console.log(event.target);
                    SelectedPlayer(event);
                    placeHolderParent.clicks++;
                }

            }

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

            //console.log(newSlot);
            newSlot.postition = { x: j, y: i };
            slotsArray.push(newSlot);
            //console.log(newSlot.postition);
            // We need to create an array of objects and the index of i instead of putting object name

        }
        placeHolderParent.id = `PlaceHolder${j}Parent`;

        Connect4Parent.append(placeHolderParent);
    }

}

board();

console.log(slotsArray);

let Turn = 1;
function SelectedPlayer(event) {
    let pieces = null;
    let ClasslistArray = Array.from(event.target.classList)
    if (ClasslistArray.includes("PlaceHolders")) {
        if (event.target.style.backgroundColor == "") {
            console.log(event.target.style)
            if ((Turn % 2) === 1) {
                pieces = "red";

            } else if ((Turn % 2) === 0) {
                pieces = "blue";
            } else {
                pieces = null;
            }


            event.target.style.backgroundColor = pieces;
            //let positionArray = slotsArray.map(postition => postition.postition)
            //console.log("This is a array of positions",positionArray);


            for (let i = 0; i < slotsArray.length; i++) {

                if (slotsArray[i].color !== pieces && event.target.id == slotsArray[i].placeHolder) {

                    slotsArray[i].color = pieces;

                }
                else {
                    console.log("youre here")
                }


            }
            console.log(slotsArray);
            Turn++
        }
    }
}
//Connect4Parent.addEventListener("click", SelectedPlayer)

