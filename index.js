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
    clearDiv()

    // add start button
    addButton("Start", drawMemorizeScreen)

    // add recent scores header
    addH3("Recent Scores")

    // add recent scores list
    // NOTE: need db integration
    let listElem = document.createElement("ul")
    listElem.id = "leaderboard-elem"
    listElem.innerHTML = "<li>test1</li><li>test2</li>"
    divElem.appendChild(listElem)
}


function drawMemorizeScreen() {
    // clear div
    clearDiv()

    // generate new magic number
    magicNumber = generateRandNum(currLevel)

    addH3("Memorize the Magic Number:")

    // add the magic number
    addH3(`${magicNumber}`)

    // add ready button
    addButton("Ready", drawResponseScreen)
}

//
function drawResponseScreen() {
    // clear div
    clearDiv()

    // add enter number header
    addH3("Enter the Magic Number:")

    // add input box
    let inputElem = addInput("number")

    // add submit button
    addButton("Submit", function() {
        currAnswer = parseInt(inputElem.value, 10)
        drawResultScreen()
    })
}

//
function drawResultScreen() {
    // clear div
    clearDiv()

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
        addButton("Home", drawHomeScreen)
    }
}

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

function addInput(type) {
    let inputElem = document.createElement("input")
    inputElem.type = type
    divElem.appendChild(inputElem);
    return inputElem;
}

function clearDiv() {
    divElem.innerHTML = "";
}

function generateRandNum(n) {
    let numString = ""
    // generate n digits
    for (let i = 0; i < n; i++) {
        // random integer 0-9
        numString += Math.floor(Math.random() * 10);
    }
    return parseInt(numString, 10)
}


