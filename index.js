const winningOptions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const winnerOfTheGame = document.querySelector(".winner-reveal");
let boxSelected = 0;

const containerElement = document.querySelector('.container');
const boxElements = containerElement.querySelectorAll(".box");

let crossOrcircle = "cross";

function createcross (parentElement){

    console.log(parentElement.value);
    if(parentElement.value !== undefined)
        return null;

    const newElement1 = document.createElement("div");
    const newElement2 = document.createElement("div");
    newElement1.setAttribute("class", "tilted-x-line");
    newElement2.setAttribute("class", "tilted-x-line");

    parentElement.appendChild(newElement1);
    parentElement.appendChild(newElement2);
    parentElement.value = "cross";

}

console.log(boxElements);

function createCircle (parentElement){

    console.log(parentElement.value);

    if(parentElement.value !== undefined)
        return null;
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "circle");
    
    parentElement.appendChild(newElement);
    parentElement.value = "circle";


}

for(const element of boxElements) {
    element.addEventListener("click", (e) => {
        
        e.preventDefault();
       
        if(crossOrcircle === "cross"){
            if(createcross(element) !== null)
                crossOrcircle = "circle";
        }
        else{
            if(createCircle(element) !== null)
            crossOrcircle = "cross";
        }

        boxSelected++;

        const winner = findWinner();
        if(winner !== "none")
        {
            console.log(winner);
            // setTimeout(() => {
            //     for(const element of boxElements){
            //         while (element.firstChild) {
            //             element.value = undefined;
            //             element.removeChild(element.firstChild);
            //           }
            //     }
            //     crossOrcircle = "cross";
            // },2000);

            winnerOfTheGame.innerHTML = winner === "cross" ? `X is the winner` : `O is the winner`;

            setTimeInterval(e);

        }

        if(boxSelected === 9){
            winnerOfTheGame.innerHTML = "drawn";
            setTimeInterval(e);
        }

        console.log(boxSelected);
        
    })   
}

const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", resetGame);

function setTimeInterval(e) {
    setTimeout(() => {
        resetGame(e);
    },1000)
}

function resetGame(event){
    boxSelected = 0;
    winnerOfTheGame.innerHTML = "tic-tac-toe";
    event.preventDefault();
    for(const element of boxElements){
        while (element.firstChild) {
            element.value = undefined;
            element.removeChild(element.firstChild);
          }
    }
    crossOrcircle = "cross";
}

function findWinner(){
    
    for(const option of winningOptions){
        console.log(option);
        const box1 = boxElements[option[0]].value;
        const box2 = boxElements[option[1]].value;
        const box3 = boxElements[option[2]].value;

        // console.log(box1+" "+box2+" "+box3);

        if(box1 === box2 && box1 === box3 && (box1 === "cross" || box1 === "circle"))
            return box1;
        
    }

    return "none";
}