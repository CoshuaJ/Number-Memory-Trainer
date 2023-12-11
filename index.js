// imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// database constants
const appSettings = {
    databaseURL: "https://realtime-database-973f8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const scoresInDB = ref(database, "scores")

// game variables
const divElem = document.getElementById("div1")
let currLevel = 1
let magicNumber = -1
let currAnswer = -1
// start
drawHomeScreen()

//
function drawHomeScreen() {
    // clear div
    divElem.innerHTML = ""

    // add start btn
    let startBtnElem = document.createElement("button")
    startBtnElem.textContent = "Start"
    startBtnElem.addEventListener("click", function() {
        console.log("start btn clicked")
        // go to memorize screen
        drawMemorizeScreen()
    })
    divElem.append(startBtnElem)

    // add recent scores header
    let subtitleElem = document.createElement("h3")
    subtitleElem.textContent = "Recent Scores"
    divElem.append(subtitleElem)

    //
    let listElem = document.createElement("ul")
    listElem.id = "leaderboard-elem"
    listElem.innerHTML = "<li>test1</li><li>test2</li>"
    divElem.append(listElem)
}

//
function drawMemorizeScreen() {
    // clear div
    divElem.innerHTML = ""

    // generate new magic number
    magicNumber = generateRandNum(currLevel)
    console.log(magicNumber)

    // add memorize number header
    let subtitleElem = document.createElement("h3")
    subtitleElem.textContent = "Memorize the Magic Number:"
    divElem.append(subtitleElem)

    // add the magic number
    let magicNumElem = document.createElement("h3")
    magicNumElem.textContent = `${magicNumber}`
    divElem.append(magicNumElem)

    // add ready button
    let readyBtnElem = document.createElement("button")
    readyBtnElem.textContent = "Ready"
    readyBtnElem.addEventListener("click", function() {
        console.log("ready btn clicked")
        //
        drawResponseScreen()
    })
    divElem.append(readyBtnElem)

}

//
function drawResponseScreen() {
    // clear div
    divElem.innerHTML = ""

    // add enter number header
    let subtitleElem = document.createElement("h3")
    subtitleElem.textContent = "Enter the Magic Number:"
    divElem.append(subtitleElem)

    // add input box
    let inputElem = document.createElement("input")
    inputElem.type = "number"
    inputElem.placeholder= "123"
    divElem.append(inputElem)

    // add submit button
    let submitBtnElem = document.createElement("button")
    submitBtnElem.textContent = "Submit"
    submitBtnElem.addEventListener("click", function() {
        console.log("submit btn clicked")
        //
        currAnswer = parseInt(inputElem.value, 10)
        //
        drawResultScreen()
    })
    divElem.append(submitBtnElem)
}

//
function drawResultScreen() {
    // clear div
    divElem.innerHTML = ""

    // add curr level
    addH3(`Level ${currLevel}`)

    // correct number header
    addH3(`Magic Number: ${magicNumber}`)

    // user answer header
    addH3(`Your Answer: ${currAnswer}`)

    // right/wrong header
    if (magicNumber === currAnswer) {
        // increase currLevel
        currLevel += 1 
        addButton("Next", drawMemorizeScreen)

    } else {
        // add recent score to database

        // add home button
        console.log("wrong")
    }
    


}

//
function addH3(text) {
    let elem = document.createElement("h3")
    elem.textContent = text
    divElem.append(elem)
    return elem
}

function addButton(text, fn) {
    let elem = document.createElement("button")
    elem.textContent = text
    elem.addEventListener("click", fn)
    // note: add enter keypress detection
    divElem.append(elem)
    return elem
}

//
function generateRandNum(n) {
    let numString = ""
    // random integer 0-9
    
    for (let i = 0; i < n; i++) {
        numString += Math.floor(Math.random() * 10);
    }
    console.log(numString)

    return parseInt(numString, 10)
}


