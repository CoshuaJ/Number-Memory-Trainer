// imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

// recent scores leaderboard
let scoresListElem = document.createElement("ul")
const maxNumScores = 5

// keep scoresListElem up to date with db
onValue(scoresInDB, function(snapshot) {
    if (snapshot.exists()) {
        // extract db key/value pairs
        let scoresArray = Object.entries(snapshot.val())
        
        // clear listElem contents
        scoresListElem.innerHTML = ""
        // check if scores cull required
        let cullActive = false
        let numScores = scoresArray.length
        if (numScores > maxNumScores) {
            cullActive = true
        }
        // add scores from db to listElem
        for (let i = 0; i < scoresArray.length; i++) {
            let currScore = scoresArray[i]
            if (false /*cullActive && i >= maxNumScores*/) {
                // delete db entry
                let dbRef = ref(database, `scores/${currScore[0]}`)
                remove(dbRef)
            } else {
                appendScoreToListElem(currScore)
            }
        }
        //
    } else {
        // no scores in db
        scoresListElem.innerHTML = "No scores available"
    }
})

function appendScoreToListElem(scoreArr) {
    let id = scoreArr[0]
    let score = scoreArr[1]

    let liElem = document.createElement("li")
    liElem.textContent = score

    scoresListElem.append(liElem)
}

// start
drawHomeScreen()

//
function drawHomeScreen() {
    // reset currLevel
    currLevel = 1

    // clear div
    clearDiv()

    // add start button
    addButton("Start", drawMemorizeScreen)

    // add recent scores header
    addH3("Recent Scores")

    // add recent scores list
    divElem.appendChild(scoresListElem)
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
        // add enter name prompt
        addH3("Enter your initials")
        // add initials input field
        let inputElem = addInput("text")
        inputElem.maxLength = 3        
        
        // add home button
        addButton("Home", function() {
            // add recent score to database
            if (inputElem.value !== "") {
                let nameScoreStr = `${inputElem.value} - ${currLevel}`.toUpperCase()

                //
                let scoreObject = {
                    score: nameScoreStr,
                    timestamp: serverTimestamp()
                }

                push(scoresInDB, scoreObject)
                console.log(scoreObject)
            }
            drawHomeScreen()
        }) 
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


