const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let userWidth, userHeight
let direcao = 'y'
let snakeTail = []
let positionTail = {}
let touchs = []

const snakeHead = {
    width: 1,
    height: 1,
    color: 'green',
    velocity: 1,
    position: {
        x: 15,
        y: 15
    }
}

const food = {
    width: 1,
    height: 1,
    color: 'red',
    position: {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    }
}

document.addEventListener('keydown', e => chageMoviment(e))
document.addEventListener('touchstart', e => catchTouchStart(e.changedTouches[0].pageX, e.changedTouches[0].pageY))
document.addEventListener('touchend', e => catchEndTouch(e.changedTouches[0].pageX, e.changedTouches[0].pageY))

function catchTouchStart(x, y) {
    touchs.splice(0, 2)
    let touchStart = { x, y }
    touchs.push(touchStart)
}

function catchEndTouch(x, y) {
    let endTouch = { x, y }
    touchs.push(endTouch)

    let moduleX = touchs[1].x - touchs[0].x
    let moduleY = touchs[1].y - touchs[0].y

    if (Math.abs(moduleX) > Math.abs(moduleY)) {
        if (direcao != 'x') {
            direcao = 'x'
            if (moduleX < 0) {
                moviment = e => snakeHead.position.x -= snakeHead.velocity
            } else {
                moviment = e => snakeHead.position.x += snakeHead.velocity
            }
        }
    } else {
        if (direcao != 'y') {
            direcao = 'y'
            if (moduleY < 0) {
                moviment = e => snakeHead.position.y -= snakeHead.velocity
            } else {
                moviment = e => snakeHead.position.y += snakeHead.velocity
            }
        }
    }
}

function drawBackground() {
    userWidth = window.innerWidth
    userHeight = window.innerHeight
    canvas.width = Math.floor(userWidth / 10)
    canvas.height = Math.floor(userHeight / 10)
}

function drawHead() {
    context.fillStyle = snakeHead.color
    context.fillRect(snakeHead.position.x, snakeHead.position.y, snakeHead.width, snakeHead.height)
}

function drawFood() {
    context.fillStyle = food.color
    context.fillRect(food.position.x, food.position.y, food.width, food.height)
}

function drawTail() {
    for (a in snakeTail) {
        context.fillStyle = snakeHead.color
        context.fillRect(snakeTail[a].x, snakeTail[a].y, snakeHead.width, snakeHead.height)
    }
}

function rules() {
    if (snakeHead.position.x >= Math.floor(userWidth / 10)) {
        snakeHead.position.x = 0
    }
    if (snakeHead.position.x < 0) {
        snakeHead.position.x = Math.floor(userWidth / 10) - 1
    }
    if (snakeHead.position.y < 0) {
        snakeHead.position.y = Math.floor(userHeight / 10) - 1
    }
    if (snakeHead.position.y >= Math.floor(userHeight / 10)) {
        snakeHead.position.y = 0
    }
    for (a in snakeTail) {
        if (snakeHead.position.x == snakeTail[a].x && snakeHead.position.y == snakeTail[a].y) {
            snakeTail.splice(1, snakeTail.length)
        }
    }
}

let moviment = function () {
    snakeHead.position.y -= snakeHead.velocity
}

function chageMoviment(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direcao != 'y') {
                moviment = e => snakeHead.position.y -= snakeHead.velocity
                direcao = 'y'
            }
            break
        case 'ArrowDown':
            if (direcao != 'y') {
                moviment = e => snakeHead.position.y += snakeHead.velocity
                direcao = 'y'
            }
            break
        case 'ArrowRight':
            if (direcao != 'x') {
                moviment = e => snakeHead.position.x += snakeHead.velocity
                direcao = 'x'
            }
            break
        case 'ArrowLeft':
            if (direcao != 'x') {
                moviment = e => snakeHead.position.x -= snakeHead.velocity
                direcao = 'x'
            }
            break
    }
}

function eatFood() {
    if (snakeHead.position.x == food.position.x && snakeHead.position.y == food.position.y) {
        food.position.x = Math.floor(Math.random() * userWidth / 10)
        food.position.y = Math.floor(Math.random() * userHeight / 10)
    } else {
        snakeTail.pop()
    }
}

function render() {
    drawBackground()
    rules()

    drawFood()

    positionTail = {
        x: snakeHead.position.x,
        y: snakeHead.position.y
    }

    snakeTail.unshift(positionTail)

    moviment()

    drawHead()

    drawTail()

    eatFood()
}
setInterval(render, 80)
function test(){
    if(window.innerHeight > window.innerWidth){
        alert('BOTA O CELL DE LADO AI EDUARDINHA')
        snakeHead.velocity = 0
    } else{
        snakeHead.velocity = 1
    }
}setInterval(test, 3000)