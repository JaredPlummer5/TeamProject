
let Connect4Parent = document.getElementById("Connect4");
// Targets the div on the HTML file

let game = function (slots) {
    this.slots = slots; // this should be an array of objects that represent the place holders
}

let slot = function (postition, color) {
    this.postition = postition; // where it is on the board
    this.color = null; // changes to the color of the piece

}

let winning = function (neighbors) {
    this.neighbors = neighbors; // array surrounding pieces
}


let column = function () {
    this.clicks = 0;
    this.coloumnHTML = coloumnHTML;
    this.filledSlot = function () {
        console.log("This is the filled Slot method");
    }
}


let slotsArray = new game([]);
// Creates an object that set the slots property equal to an empty array




async function board() {

    for (let j = 1; j <= 7; j++) {
        let placeHolderParent = document.createElement("div");
        // This div represents the columns
        placeHolderParent.clicks = 1;
        // Put a property on each column for how many clicks each column has. 
        // And sets 1 as the beginning value.

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

        for (let i = 6; i >= 1; i--) {
            let placeHolder = document.createElement("div");
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
            // Creates a new property equal to the id for each slot 


            newSlot.postition = { x: j, y: i };
            // Sets the position property of each slot object

            slotsArray.slots.push(newSlot);
            // Pushes each slot to an array(slots) of an object that's called slotsArray

        }
        placeHolderParent.id = `PlaceHolder${j}Parent`;
        // Makes anm id for each column

        Connect4Parent.append(placeHolderParent);
        // Appends each column to the div on the body
    }

}
board();

console.log(slotsArray.slots);
// Array of all of the new slot objects

let Turn = 1;
// Set a variable to keep track of the users' turns

function SelectedPlayer(slotToFill) {
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
    slotToFill.style.backgroundColor = pieces;
    // Set the background color equal to pieces reassigned value
    // for (let i = 0; i < slotsArray.slots.length; i++) {
    //     // Loops for length of the slot array
    //     if (slotsArray.slots[i].color !== pieces && slotToFill == slotsArray.slots[i].placeHolder) {
    //         slotsArray.slots[i].color = pieces
    //         // if the color property is not equal to pieces and if what ever the user clicked equal the placeHolder property 

    //         console.log("Fred",slotsArray.slots);
    //         console.log(slotsArray.slots[i]);
    //     }

    // }
    Turn++
    // Adds one to the Turn value each time the user clicks
}

