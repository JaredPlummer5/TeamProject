let Connect4Parent = document.getElementById("Connect4");

let slot = function (postition, filledState, neighbors) {
    this.postition = postition;// where it is on the board
    this.filledState = null;// changes to the color of the piece
    this.neighbors = neighbors;// array surrounding pieces

}

let game = function(){
    this.slots = slots;// this should be an array
}


let objectName = new slot({}, null, [{x: 1, y: 2},{x: 2, y: 1},{x: 2, y: 2}]);

function board() {

    for (let j = 1; j <= 7; j++) {
        let placeHolderParent = document.createElement("div")

        for (let i = 6; i >= 1; i--) {

            let placeHolder = document.createElement("div")
            placeHolder.id = `PlaceHolder${j}x${i}`;
            placeHolder.className = `PlaceHolders`;
            placeHolder.innerHTML = `PlaceHolder${j}x${i}`;
            placeHolderParent.className = `PlaceHoldersParent`;
            placeHolderParent.append(placeHolder);
            objectName.postition = {x: j, y: i};
            // We need to create an array of objects and the index of i instead of putting object name

        }
        placeHolderParent.id = `PlaceHolder${j}Parent`;
        Connect4Parent.append(placeHolderParent);
    }

}
board()

let Turn = 1;
function SelectedPlayer(event) {
    let pieces = undefined;
    let ClasslistArray = Array.from(event.target.classList)
    if (ClasslistArray.includes("PlaceHolders")) {
        if (event.target.style.backgroundColor == "") {
            console.log(event.target.style)
            if ((Turn % 2) === 1) {
                pieces = "red";

            } else {
                pieces = "blue";
            }
            event.target.style.backgroundColor = pieces
            Turn++
        }
    }
}

Connect4Parent.addEventListener("click", SelectedPlayer)

