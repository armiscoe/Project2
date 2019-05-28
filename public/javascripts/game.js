const startButton = document.getElementById("start-button")
const instructions = document.getElementById("instructions-text")
const fighter = document.getElementById("player-controlled-shooter")
const mainPlayArea = document.getElementById("main-play-area")
const title = document.getElementById("title")
const scoreboard = document.querySelector('#score span')
const jimAnimations = ['images/chomper.gif', 'images/spinjim.gif', 'images/ohcanada.gif']
const restartShow = document.getElementById('restart')
const danceJim = document.createElement('img')
const jimWin = document.getElementById("jimWin")
jimWin.style.display = 'none';


let jimInterval 
startButton.addEventListener("click", (event) => { playGame() })

function flyBitch(event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault()
        moveUp()
    } else if (event.key === "ArrowRight") {
        event.preventDefault()
        moveDown()
    } else if (event.key === " ") {
        event.preventDefault()
        fireBlaster()
    }
    
}

function moveUp() {

    //this function calls a method that return the pixel property value
    let  topPosition = window.getComputedStyle(fighter).getPropertyValue('top')
    // dont let object go past "0px"
    if (fighter.style.top === "0px") {
        return
    } else {
        let position = parseInt(topPosition)
        position -= 4
        fighter.style.top = `${position}px`
    }
}

function moveDown() {
    let topPosition = window.getComputedStyle(fighter).getPropertyValue('top')
    if (fighter.style.top === "360px") {
        return
    } else {
        let position = parseInt(topPosition)
        position += 4
        fighter.style.top = `${position}px`
        
    }
}

function fireBlaster() {
    let blaster = createBlaster()
    mainPlayArea.appendChild(blaster)
    moveBlaster(blaster)
}

function createBlaster() {
    let xPos = parseInt(window.getComputedStyle(fighter).getPropertyValue('left'))
    let yPos = parseInt(window.getComputedStyle(fighter).getPropertyValue('top'))
    let newBlast = document.createElement('img')    
    newBlast.src = 'images/blaster.png'
    newBlast.classList.add('blaster')
    let blastSound = new Audio ('sounds/laserBlast.wav')
    blastSound.play()
    newBlast.style.left = `${xPos}px`
    newBlast.style.top = `${yPos - 10}px`
    return newBlast
}

function moveBlaster(blaster) {
    let blastInterval = setInterval(() => {
        let xPos = parseInt(blaster.style.left)
        let jims = document.querySelectorAll(".jim")
        jims.forEach(jim => {
            if (checkBlasterCollision(blaster, jim)) {
                let jimHit = new Audio('sounds/scream.mp4')
                jimHit.play()
                jim.src = "images/poofjim.gif"
                jim.classList.remove("jim")
                jim.classList.add("dead-jim")
                scoreboard.innerText = parseInt(scoreboard.innerText) + 100
            }
        })
        if (xPos === 340) {
        
            blaster.remove()
            
        } else {
            blaster.style.left = `${xPos + 4}px`
        }
    }, 10)
}

function createJim() {
    let newJim = document.createElement('img')
    let jimFaceImg = jimAnimations[Math.floor(Math.random()*jimAnimations.length)]
    newJim.src = jimFaceImg
    newJim.classList.add('jim')
    newJim.classList.add('jimDead-transition')
    newJim.style.left = '340px'
    newJim.style.top = `${Math.floor(Math.random() * 330) + 30}px`
    mainPlayArea.appendChild(newJim)
    moveJim(newJim)
}

function moveJim(jim) {
    let moveJimInterval = setInterval(() => {
        let xPos = parseInt(window.getComputedStyle(jim).getPropertyValue('left'))
        if (xPos <= 50) {
            if (Array.from(jim.classList).includes("dead-jim")) {
            jim.remove()    
            
        } else {
            gameOver()
        }
        } else {
            jim.style.left = `${xPos - 4}px`
        }
    }, 38)
}

function  checkBlasterCollision(blaster, jim)
  {
    let blasterLeft = parseInt(blaster.style.left)
    let blasterTop = parseInt(blaster.style.top)
    let blasterBottom = blasterTop - 40
    let jimTop = parseInt(jim.style.top) + 20
    let jimBottom = jimTop - 40
    let jimLeft = parseInt(jim.style.left)
    if (blasterLeft != 340 && blasterLeft - 40 >= jimLeft) {
        if ( (blasterTop <= jimTop && blasterTop >= jimBottom) ) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}


function gameOver () {
    window.removeEventListener("keydown", flyBitch)
    
    clearInterval(jimInterval)
   
    let blasters = document.querySelectorAll(".blaster")
    blasters.forEach(blaster => blaster.remove())
    let jims = document.querySelectorAll(".jim")
    jims.forEach(jim => jim.remove())
    setTimeout(() => {
        let jimLaugh = new Audio ('sounds/witchCackle.wav')
        jimLaugh.play()
        jimWin.style.display = 'block'
        mainPlayArea.appendChild(jimWin)
       fighter.style.display = 'none'
       restartShow.style.display = 'block'
       restartShow.innerText = `You scored ${scoreboard.innerText} points`
       restartShow.style.left = '40px'
       restartShow.style.top = '-110px'
       startButton.style.display = "block"
       scoreboard.innerText = 0;
    
    }, 1000)

}



function playGame() {
    
    fighter.style.display = 'initial'
    restartShow.style.display = 'none'
    jimWin.style.display = 'none'
    startButton.style.display = 'none'
    instructions.style.display = 'none'
    title.style.display = 'none'
    dancingJim.style.display = 'none'
    dancingJim2.style.display = 'none'
    window.addEventListener("keydown", flyBitch);
    jimInterval = setInterval(() => { createJim() }, 1700)

}
