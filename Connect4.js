
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


async function board() {

    for (let j = 1; j <= 7; j++) {
        let placeHolderParent = document.createElement("div");
        // This div represents the columns
        placeHolderParent.clicks = 1;
        // Put a property on each column for how many clicks each column has. 
        // And sets 1 as the beginning value.



        //==================GENERATING TABLE=========================================



        placeHolderParent.addEventListener("click", function (event) {
            let slotToFill = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${placeHolderParent.clicks}`);
            // Sets a variable equal to the id and  x = (the number that reprensent the column) X  y = (how many times the user clicked).
            // Slices the column id to get the row and uses the clicks property for the hieght
            let pieces = null;
            // Set a varible equal to null 
            if ((Turn % 2) === 1) {
                pieces = "red";
                // Reassigns the value if Turn is an odd number
        
            } else if ((Turn % 2) === 0) {
                pieces = "blue";
                // Reassigns the value if Turn is an even number
            } else {
                pieces = null;
                // Set the variable equal to null if the first to cases are not true
            }
            // slotToFill.style.backgroundColor = pieces;
            for (let i = 6; i >= placeHolderParent.clicks; i--) {

                setTimeout(() => {
                    let lastlAnimationTest = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${i+1}`)
                    lastlAnimationTest.style.backgroundColor = "white"
                    let animationTest = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${i}`);
                    animationTest.style.backgroundColor = pieces
                    // Calls the function that turns slotToFill red or blue depending on whose turn it is.

                    //Adds 1 to the clicked property if the user clicked the column
                    console.log("g", animationTest)
                }, 1000 * (7/(i+1)))


            }
            placeHolderParent.clicks++;
            // SelectedPlayer(slotToFill);
            Turn++





        });


       

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
            //Adds 1 to the clicked property if the user clicked the column
            for (let i = 6; i >= 1; i--) {
                if (placeHolderParent == event.target && placeHolder.id.slice(-2, -1) == placeHolderParent.clicks) {
                    // //console.log(slotsArray.slots[i])
                    slotsArray.slots[i].color = slotToFill.attributes.style.nodeValue;
                }

            }

            // let colorsArray = slotsArray.slots.map(function (colors) {
            //     return colors.color
            // });
            // for (let k = 0; k < 4; k++) {
            //     for (let i = 0; i < colorsArray.length; i++) {
            //         for (let j = 1; j < colorsArray.length; j++) {
            //             if (colorsArray[i] == colorsArray[j]) {
            //                 //console.log("a player has won")
            //             }
            //         }

            //     }
            // }
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
    let pieces = null;
    if ((Turn % 2) === 1) {
        pieces = "red";
    } else if ((Turn % 2) === 0) {
        pieces = "blue";
    } else {
        pieces = null;
    }
    slotToFill.style.backgroundColor = pieces;

    let slotObject = slotsArray.slots.find(function (element) {
        
        if (element && element.position && element.position.x == slotToFill.objectPositionX && element.position.y == slotToFill.objectPositionY) {
            return true
        } else {
            return false
        }
    })
    if (slotObject) {
        slotObject.color = pieces
        console.log("slotsArray!!!!!!", slotsArray.slots);
    }

    Turn++
}


function winningPossibilities() {
    // All of the j values are the x axis

    // All of the i values are the y axis
    let possibilities = [];
    // Vertical wins

    for (let j = 0; j < 6; j++) {

        for (let i = 0; i < 4; i++) {
            var verticalWins = possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j][i + 1], slotsArray.slots[j][i + 2], slotsArray.slots[j][i + 3]])
        }

    }
    console.log("This is the horizontal win", horizontalWins);
    //Horizontal winnings 
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 7; i++) {
            var horizontalWins = possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j + 1][i], slotsArray.slots[j + 2][i], slotsArray.slots[j + 3][i]]);
        }
    }

    console.log("This is the vertical wins", horizontalWins);

    //Diagnal win from the top left to the right bottom

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
            var diagnalFromTheLeftDown = possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j + 1][i + 1], slotsArray.slots[j + 2][i + 2], slotsArray.slots[j + 3][i + 3]]);
        }

    }
    console.log("This the diaganol wins", diagnalFromTheLeftDown);

    // Diagonal top right to the bottom left
    for (let j = 3; j < 6; j++) {
        for (let i = 0; i < 4; i++) {
            var diaganolFromTopRight = possibilities.push([slotsArray.slots[j][i], slotsArray.slots[j - 1][i + 1], slotsArray.slots[j - 2][i + 2], slotsArray.slots[j - 3][i + 3]]);
        }
    }
    //console.log("This is the diaganolFromTopRight possibility array",possibilities);
    console.log(diaganolFromTopRight);
    return possibilities;
}
let allWinningPossibilities = winningPossibilities();
console.log(allWinningPossibilities);


