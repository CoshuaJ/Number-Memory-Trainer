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
let currScore = 0
let magicNumber = 0
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

    // add memorize number header
    let subtitleElem = document.createElement("h3")
    subtitleElem.textContent = "Memorize this number!"
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

    // add input box

    // add submit button
}




