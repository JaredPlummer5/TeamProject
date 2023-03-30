let Connect4Parent = document.getElementById("Connect4");

function board() {
    for (let j = 1; j < 43; j++) {
        let placeHolderParent = document.createElement("div")

        for (let i = 0; i < 42; i++) {
            let placeHolder = document.createElement("div")
            placeHolder.id = `PlaceHolder${j}`;
            placeHolder.className = `PlaceHolders`;
            placeHolder.innerHTML = `PlaceHolder${j}`;
            placeHolderParent.append(placeHolder);
            break;
        }
        placeHolderParent.id = `PlaceHolder${[j]}Parent`;
        placeHolderParent.className = `PlaceHoldersParent`;
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

