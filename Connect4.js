
let Connect4Parent = document.getElementById("Connect4");
// Targets the div on the HTML file

let game = function (slots) {
    this.slots = slots; // this should be an array of objects that represent the place holders
}

let slot = function (postition) {
    this.postition = postition; // where it is on the board
    this.color = null; // changes to the color of the piece

}

let winning = function (neighbors) {
    this.neighbors = neighbors; // array surrounding pieces
}


let column = function (clicks, coloumnHTML, placeHolderParentName) {
    this.clicks = 1;
    this.coloumnHTML = coloumnHTML;
    this.placeHolderParentName = placeHolderParentName;
    this.filledSlot = function () {
        // console.log("This is the filled Slot method");
    }
}


let slotsArray = new game([]);
// Creates an object that set the slots property equal to an empty array

let columnArray = [];



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
  
            // Creates a new property equal to the id for each slot 


            newSlot.postition = { x: j, y: i };
            placeHolder.objectPositionX = j
            placeHolder.objectPositionY = i
            // Sets the position property of each slot object

            slotsArray.slots.push(newSlot);
            // Pushes each slot to an array(slots) of an object that's called slotsArray

        }
        placeHolderParent.id = `PlaceHolder${j}Parent`;
        // Makes anm id for each column

        Connect4Parent.append(placeHolderParent);
        // Appends each column to the div on the body
        //==================GENERATING TABLE=========================================

    //===============ADDING ONCLICKS TO EACH COLUMN==================================
        placeHolderParent.addEventListener("click", function (event) {
            let slotToFill = document.querySelector(`#PlaceHolder${placeHolderParent.id.slice(-7, -6)}x${placeHolderParent.clicks}`);
            // console.log(slotToFill);
            // Sets a variable equal to the id and  x = (the number that reprensent the column) X  y = (how many times the user clicked).
            // Slices the column id to get the row and uses the clicks property for the hieght
            SelectedPlayer(slotToFill);
            // Calls the function that turns slotToFill red or blue depending on whose turn it is.


            // console.log(slotToFill.attributes.style.nodeValue);

            let coloumnChildren = Array.from(placeHolderParent.children)
            // console.log(coloumnChildren);
            let columnObject = new column(1, coloumnChildren, placeHolderParent.id);
            columnArray.push(columnObject);
            // console.log(columnArray);

            placeHolderParent.clicks++;
            //Adds 1 to the clicked property if the user clicked the column
            for (let i = 6; i >= 1; i--) {
                if (placeHolderParent == event.target && placeHolder.id.slice(-2, -1) == placeHolderParent.clicks) {
                    // console.log(slotsArray.slots[i])
                    slotsArray.slots[i].color = slotToFill.attributes.style.nodeValue;
                }

            }

        });
    //===============ADDING ONCLICKS TO EACH COLUMN==================================


    }
}
board();


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
    let slotObject = slotsArray.slots.find(function (element){
        if(element.postition.x == slotToFill.objectPositionX && element.postition.y == slotToFill.objectPositionY){
            return true
        }else{
            return false
        }
    })
    slotObject.color = pieces
    console.log("slotObject", slotObject)
    // Set the background color equal to pieces reassigned value
    Turn++
    // Adds one to the Turn value each time the user clicks
}
