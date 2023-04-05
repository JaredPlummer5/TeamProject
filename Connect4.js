
let Connect4Parent = document.getElementById("Connect4");
// Targets the div on the HTML file

let game = function (slots) {
    this.slots = slots; // // Array of all of the new slot objects
}


let slot = function (position) {
    this.position = position; // where it is on the board

    this.color = null; // changes to the color of the piece

}

// let winning = function (neighbors) {
//     this.neighbors = neighbors; // array surrounding pieces


// let column = function (clicks, coloumnHTML, placeHolderParentName) {
//     this.clicks = 1;
//     this.coloumnHTML = coloumnHTML;
//     this.placeHolderParentName = placeHolderParentName;
//     this.filledSlot = function () {
//         // //console.log("This is the filled Slot method");
//     }
// }


let slotsArray = new game([]);
// Creates an object that set the slots property equal to an empty array


let childArrays = [];


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

            placeHolder.className = `PlaceHolders`;
            // Adds a class name to each slot

            placeHolder.innerHTML = `PlaceHolder${j}x${i}`;
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

            //let matrix = []
        }
        //console.log(childArrays);
        slotsArray.slots.push(childArrays);
        childArrays = [];
        placeHolderParent.id = `PlaceHolder${j}Parent`;
        // Makes anm id for each column

        Connect4Parent.append(placeHolderParent);
        // Appends each column to the div on the body


        //==================GENERATING TABLE=========================================

        //===============ADDING ONCLICKS TO EACH COLUMN==================================
        placeHolderParent.addEventListener("click", function (event) {
            let slotToFill = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${placeHolderParent.clicks}`);
            // //console.log(slotToFill);
            // Sets a variable equal to the id and  x = (the number that reprensent the column) X  y = (how many times the user clicked).
            // Slices the column id to get the row and uses the clicks property for the hieght
            SelectedPlayer(slotToFill);
            // Calls the function that turns slotToFill red or blue depending on whose turn it is.




            placeHolderParent.clicks++;

            
        });
        //===============ADDING ONCLICKS TO EACH COLUMN==================================



    }

}
board();


console.log(slotsArray.slots);
// Array of all of the new slot objects




let Turn = 1;
// Set a variable to keep track of the users' turns

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
            //console.log(slotToFill.id, slotsArray.slots[k][j].placeHolder)
            if (slotToFill.id == slotsArray.slots[k][j].placeHolder) {

                slotsArray.slots[k][j].color = pieces;
                mappingTheWinnerCombinations(slotsArray.slots[k][j]);

                //console.log(slotsArray.slots)

            }
            // find the corresponding slot object in the slotsArray and set its color property

        }
    }

    Turn++;

}



let possibilities = [];
function winningPossibilities() {
    // All of the j values are the x axis

    // All of the i values are the y axis
    // Vertical wins

    for (let j = 0; j < 7; j++) {

        for (let i = 0; i < 4; i++) {
            possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j][i + 1], slotsArray.slots[j][i + 2], slotsArray.slots[j][i + 3]])
        }

    }

    //Horizontal winnings 
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 7; i++) {
            possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j + 1][i], slotsArray.slots[j + 2][i], slotsArray.slots[j + 3][i]]);
        }
    }

    //Diagnal win from the top Left to the right down
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
            possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j + 1][i + 1], slotsArray.slots[j + 2][i + 2], slotsArray.slots[j + 3][i + 3]]);
        }

    }

    // Diagonal wins from the top right to left down
    for (let j = 3; j < 7; j++) {
        for (let i = 0; i < 4; i++) {
            possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j - 1][i + 1], slotsArray.slots[j - 2][i + 2], slotsArray.slots[j - 3][i + 3]]);
        }
    }

    return possibilities;
}
let allWinningPossibilities = winningPossibilities();
console.log(allWinningPossibilities);

function mappingTheWinnerCombinations(filledSlot) {
    let filledSlotPosition = filledSlot.position
    let filledSlotColor = filledSlot.color

    //console.log(filledSlot, filledSlotColor);
    for (let k = 0; k < possibilities.length; k++) {
        for (let j = 0; j < possibilities[k].length; j++) {
            if (possibilities[k][j]) {
                if (possibilities[k][j].position.x == filledSlotPosition.x && possibilities[k][j].position.y == filledSlotPosition.y) {
                    //console.log(possibilities[k], possibilities[k][j].position.x, possibilities[k][j].position.y);
                    
                    
                    
                    if (possibilities[k][j] && possibilities[k][j+1] && possibilities[k][j+2] && possibilities[k][j+3] && possibilities[k][j].color == filledSlotColor) {
                        console.log(possibilities[k][j], possibilities[k][j+1], possibilities[k][j+2], possibilities[k][j+3])

                        if(possibilities[k][j].color == "red" && possibilities[k][j + 1].color == "red" && possibilities[k][j + 2].color == "red" && possibilities[k][j + 3].color == "red"){

                            console.log("Player 1 wins")

                        }else if(possibilities[k][j].color == "blue" && possibilities[k][j+1].color == "blue" && possibilities[k][j+2].color == "blue" && possibilities[k][j+3].color == "blue"){
                            console.log("Player 2 wins")
                        }else{

                            console.log("Keep playing");
                        }

                    }
                }
                //console.log("Are the colors the same",possibilities[k][j].color, filledSlotColor);
            }

        }
    }

}


console.log(slotsArray.slots)

//for(let k = 0; k < )