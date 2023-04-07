'use strict'

let Connect4Parent = document.getElementById("Connect4");
let PlaceHolderParentClassName = document.querySelectorAll(".PlaceHoldersParent")
// Targets the div on the HTML file

let game = function (slots) {
    this.slots = slots; // // Array of all of the new slot objects
}


let slot = function (position) {
    this.position = position; // where it is on the board

    this.color = null; // changes to the color of the piece

}

let slotsArray = new game([]);
// Creates an object that set the slots property equal to an empty array
let childArrays = [];

let screenBlocker = document.createElement("div");
function board() {

    for (let j = 1; j <= 7; j++) {
        let placeHolderParent = document.createElement("div");
        // This div represents the columns
        placeHolderParent.clicks = 1;
        // Put a property on each column for how many clicks each column has. 
        // And sets 1 as the beginning value.


        //==================GENERATING TABLE=========================================
        for (let i = 6; i >= 1; i--) {

            var placeHolder = document.createElement("div");

            // Creates the slots
            placeHolder.id = `PlaceHolder${j}x${i}`;
            // Adds an id to the slots depending on the position
            // let hr = document.createElement("hr");
            // hr.id = "hr"
            // placeHolder.append(hr);
            placeHolder.className = `PlaceHolders`;
            // Adds a class name to each slot

            //placeHolder.innerHTML = `PlaceHolder${j}x${i}`;
            // Helps the development team keep track of the position of the div

            placeHolderParent.className = `PlaceHoldersParent`;
            // Adds a class name for each column

            placeHolderParent.append(placeHolder);
            // Appends the rows to the columns

            let newSlot = new slot({}, null);
            // Creates a new object for each slot with the position and color properties

            newSlot.placeHolder = placeHolder.id



            //console.log("Added the property placeholder to newSlot", newSlot.placeHolder)


            // Creates a new property equal to the id for each slot 




            newSlot.position = { x: j, y: i };

            // Sets the position property of each slot object

            placeHolder.objectPositionX = j;
            // Adds a property To each slot for the X position
            //console.log("Did it change?", placeHolder)
            placeHolder.objectPositionY = i;
            // Adds a property To each slot for the Y position
            // Pushes each slot to an array(slots) of an object that's called slotsArray

            childArrays.push(newSlot);


        }
        slotsArray.slots.push(childArrays);
        childArrays = [];
        placeHolderParent.id = `PlaceHolder${j}Parent`;
        // Makes anm id for each column

        Connect4Parent.append(placeHolderParent);
        // Appends each column to the div on the body
        //==================GENERATING TABLE=========================================


        //===============ADDING ONCLICKS TO EACH COLUMN==================================
        placeHolderParent.addEventListener("click", function filledSlot(event) {
            let slotToFill = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${placeHolderParent.clicks}`);

            let fallingDiv = document.getElementById('fallingDiv');
            let slotRect = slotToFill.getBoundingClientRect();
            console.log(slotRect);
            
            //let columns = document
            
            // Set the position of the falling div to the same position as the slotToFill element
            //fallingDiv
            fallingDiv.style.position = 'absolute';
            fallingDiv.style.left = slotRect.left + 'px';
            fallingDiv.style.top = slotRect.top + 'px';
            
            let position = 0;
            let id = null;
            console.log(id)
            //clearInterval(id);
            id = setInterval(frame, 0);
            function frame() {
                if (position == slotRect.top) {
                    console.log("You've made it")
                    clearInterval(id);
                    screenBlocker.remove();
                } else {
                    position++;
                    djProofFunction(screenBlocker);
                    fallingDiv.style.top = position + "px";
                }
            }
            
            SelectedPlayer(slotToFill);
            fallingDiv.style.backgroundColor = slotToFill.style.backgroundColor
            placeHolderParent.clicks++;
        });
    }
}
board();

console.log(slotsArray.slots);
// Array of all of the new slot objects

let djProofFunction = function(screenBlocker){
    screenBlocker.id = "screenBlokerForFallingDiv";
    document.body.append(screenBlocker)

} 


let Turn = 1;
// Set a variable to keep track of the users' turns

let pieces = null;



function SelectedPlayer(slotToFill) {
    if (!slotToFill) {
        return;
    }

    let pieces = null;
    if ((Turn % 2) === 1) {
        pieces = "red";
    } else if ((Turn % 2) === 0) {
        pieces = "blue";
    } else {
        pieces = null;
    }

    slotToFill.style.backgroundColor = pieces;

    for (let k = 0; k < slotsArray.slots.length; k++) {
        for (let j = 0; j < 6; j++) {

            if (slotToFill.id == slotsArray.slots[k][j].placeHolder) {

                slotsArray.slots[k][j].color = pieces;
                mappingTheWinnerCombinations(slotsArray.slots[k][j]);
            }
            // find the corresponding slot object in the slotsArray and set its color property

        }
    }

    Turn++;

}


let verticalWinsForHr = []
let horizontalWinsForHr = []
let DiagonalFromTheTopLeftToTheBottomRightWinsForHr = [];
let DiagnalWinsFromTheTopRightToLeftDownForHr = [];

let possibilities = [];
function winningPossibilities() {
    // All of the j values are the x axis

    // All of the i values are the y axis


    // Vertical wins
    for (let j = 0; j < 7; j++) {

        for (let i = 0; i < 4; i++) {
            let verticalWins = [slotsArray.slots[j][i], slotsArray.slots[j][i + 1], slotsArray.slots[j][i + 2], slotsArray.slots[j][i + 3]];
            let reverseVerticalWins = verticalWins.slice().reverse();
            verticalWinsForHr.push(verticalWins, reverseVerticalWins)
            possibilities.push(verticalWins, reverseVerticalWins);
        }

    }

    //Horizontal winnings 
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 7; i++) {
            let HorizontalWins = [slotsArray.slots[j][i], slotsArray.slots[j + 1][i], slotsArray.slots[j + 2][i], slotsArray.slots[j + 3][i]];
            let reverseHorizontalWins = HorizontalWins.slice().reverse();
            horizontalWinsForHr.push(HorizontalWins, reverseHorizontalWins);
            possibilities.push(HorizontalWins, reverseHorizontalWins);

        }
    }
    //Diagnal win from the top Left to the right down
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            let DiagonalFromTheTopLeftToTheBottomRightWins = [slotsArray.slots[j][i], slotsArray.slots[j + 1][i + 1], slotsArray.slots[j + 2][i + 2], slotsArray.slots[j + 3][i + 3]];
            let reverseDiagonalFromTheTopLeftToTheBottomRightWins = DiagonalFromTheTopLeftToTheBottomRightWins.slice().reverse();
            DiagonalFromTheTopLeftToTheBottomRightWinsForHr.push(DiagonalFromTheTopLeftToTheBottomRightWins, reverseDiagonalFromTheTopLeftToTheBottomRightWins)
            possibilities.push(DiagonalFromTheTopLeftToTheBottomRightWins, reverseDiagonalFromTheTopLeftToTheBottomRightWins);
        }

    }


    // Diagonal wins from the top right to left down
    for (let j = 3; j < 7; j++) {
        for (let i = 0; i < 4; i++) {
            let DiagnalWinsFromTheTopRightToLeftDown = [slotsArray.slots[j][i], slotsArray.slots[j - 1][i + 1], slotsArray.slots[j - 2][i + 2], slotsArray.slots[j - 3][i + 3]]
            let reverseDiagnalWinsFromTheTopRightToLeftDown = DiagnalWinsFromTheTopRightToLeftDown.slice().reverse();

            DiagnalWinsFromTheTopRightToLeftDownForHr.push(DiagnalWinsFromTheTopRightToLeftDown, reverseDiagnalWinsFromTheTopRightToLeftDown);
            possibilities.push(DiagnalWinsFromTheTopRightToLeftDown, reverseDiagnalWinsFromTheTopRightToLeftDown);
        }
    }

    console.log("Possibilities", possibilities);

    return possibilities;

}
winningPossibilities();

console.log("Vertical", verticalWinsForHr, "Horizontal", horizontalWinsForHr, "DiagonalFromTheTopLeftToTheBottomRightWinsForHr", DiagonalFromTheTopLeftToTheBottomRightWinsForHr, "DiagnalWinsFromTheTopRightToLeftDownForHr", DiagnalWinsFromTheTopRightToLeftDownForHr)

function mappingTheWinnerCombinations(filledSlot) {
    let filledSlotPosition = filledSlot.position
    let filledSlotColor = filledSlot.color

    //console.log(filledSlot, filledSlotColor);
    for (let k = 0; k < possibilities.length; k++) {
        for (let j = 0; j < possibilities[k].length; j++) {
            if (possibilities[k][j]) {
                if (possibilities[k][j].position.x == filledSlotPosition.x && possibilities[k][j].position.y == filledSlotPosition.y) {
                    //console.log(possibilities[k], possibilities[k][j].position.x, possibilities[k][j].position.y);



                    if (possibilities[k][j] && possibilities[k][j + 1] && possibilities[k][j + 2] && possibilities[k][j + 3] && possibilities[k][j].color == filledSlotColor) {
                        console.log(possibilities[k][j], possibilities[k][j + 1], possibilities[k][j + 2], possibilities[k][j + 3])

                        if (possibilities[k][j].color == "red" && possibilities[k][j + 1].color == "red" && possibilities[k][j + 2].color == "red" && possibilities[k][j + 3].color == "red") {

                            console.log("Player 1 wins")
                            let screenBlocker = document.createElement("div");
                            
                            console.log(verticalWinsForHr[k])
                            if (verticalWinsForHr[k].includes(possibilities[k][j] && possibilities[k][j + 1] && possibilities[k][j + 2] && possibilities[k][j + 3]) || verticalWinsForHr[k] !== undefined) {
                                let winningPlaceHoders = document.querySelector(`#${possibilities[k][j].placeHolder}`)
                                let winningPlaceHoders2 = document.querySelector(`#${possibilities[k][j + 1].placeHolder}`)
                                let winningPlaceHoders3 = document.querySelector(`#${possibilities[k][j + 2].placeHolder}`)
                                let winningPlaceHoders4 = document.querySelector(`#${possibilities[k][j + 3].placeHolder}`)
                                console.log(winningPlaceHoders)
                                let hr = document.createElement("hr");
                                let hr2 = document.createElement("hr");
                                let hr3 = document.createElement("hr");
                                let hr4 = document.createElement("hr");
                                hr.id = "hr";

                                winningPlaceHoders.append(hr);
                                winningPlaceHoders2.append(hr2);
                                winningPlaceHoders3.append(hr3);
                                winningPlaceHoders4.append(hr4);

                                hr.style.rotate = "90deg";
                                hr2.style.rotate = "90deg";
                                hr3.style.rotate = "90deg";
                                hr4.style.rotate = "90deg";

                                screenBlocker.id = "screenBlockerId";
                                let pTagRed = document.createElement("p");
                                pTagRed.style.backgroundColor = "black"
                                pTagRed.style.color = "red"
                                pTagRed.style.borderRadius = "10px"
                                pTagRed.style.padding = "15px"
                                pTagRed.innerHTML = "Player 1 Wins"
                                screenBlocker.append(pTagRed)
                                document.body.append(screenBlocker)

                            }
                            // else if (verticalWinsForHr[k] == undefined) {
                            //     for (let h = 0; h < horizontalWinsForHr.length; h++) {
                            //         if (horizontalWinsForHr[h].includes((possibilities[k][j] && possibilities[k][j + 1] && possibilities[k][j + 2] && possibilities[k][j + 3]))) {

                            //             console.log("true");

                            //         }
                            //     }
                            // }






































                            else if (possibilities[k][j].color == "blue" && possibilities[k][j + 1].color == "blue" && possibilities[k][j + 2].color == "blue" && possibilities[k][j + 3].color == "blue") {
                                console.log("Player 2 wins")
                                let screenBlocker = document.createElement("div")

                                screenBlocker.id = "screenBlockerId"
                                let pTagBlue = document.createElement("p")
                                pTagBlue.style.backgroundColor = "black"
                                pTagBlue.style.borderRadius = "10px"
                                pTagBlue.style.color = "blue"
                                pTagBlue.style.padding = "15px"
                                pTagBlue.innerHTML = "Player 2 Wins"
                                screenBlocker.append(pTagBlue)
                                document.body.append(screenBlocker)


                            }
                            else if (Turn == 42) {
                                console.log("Tie")
                                let screenBlocker = document.createElement("div");

                                screenBlocker.id = "screenBlockerId";
                                let pTagBlue = document.createElement("p");
                                pTagBlue.style.backgroundColor = "black";
                                pTagBlue.style.borderRadius = "10px";
                                pTagBlue.style.color = "white";
                                pTagBlue.style.padding = "15px";
                                pTagBlue.innerHTML = "Yall both suck";
                                screenBlocker.append(pTagBlue);
                                document.body.append(screenBlocker);

                            }
                        }

                    }
                }

            }

        }
    }

}


console.log(slotsArray.slots);