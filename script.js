const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

document.addEventListener('keydown', e => chageMoviment(e))

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

let direcao = 'y'
let snakeTail = []
let positionTail = {}

function drawBackground(){
    context.fillStyle = 'white'
    context.fillRect(0, 0, 30, 30)
}

function drawHead() {
    context.fillStyle = snakeHead.color
    context.fillRect(snakeHead.position.x, snakeHead.position.y, snakeHead.width, snakeHead.height)
}

function drawFood() {
    context.fillStyle = food.color
    context.fillRect(food.position.x, food.position.y, food.width, food.height)
}

function drawTail(){
    for (a in snakeTail) {
        context.fillStyle = snakeHead.color
        context.fillRect(snakeTail[a].x, snakeTail[a].y, snakeHead.width, snakeHead.height)
    }
}

function rules(){
    if(snakeHead.position.x > 30){
        snakeHead.position.x = -1
    }
    if(snakeHead.position.x < -1){
        snakeHead.position.x = 30
    }
    if(snakeHead.position.y < -1){
        snakeHead.position.y = 30
    }
    if(snakeHead.position.y > 30){
        snakeHead.position.y = -1
    }
    for(a in snakeTail){
        if(snakeHead.position.x == snakeTail[a].x && snakeHead.position.y == snakeTail[a].y){
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
                direcao = 'y'
                moviment = e => snakeHead.position.y -= snakeHead.velocity
            }
            break
        case 'ArrowDown':
            if (direcao != 'y') {
                direcao = 'y'
                moviment = e => snakeHead.position.y += snakeHead.velocity
            }
            break
        case 'ArrowRight':
            if (direcao != 'x') {
                direcao = 'x'
                moviment = e => snakeHead.position.x += snakeHead.velocity
            }
            break
        case 'ArrowLeft':
            if (direcao != 'x') {
                direcao = 'x'
                moviment = e => snakeHead.position.x -= snakeHead.velocity
            }
            break
    }
}

function eatFood(){
    if (snakeHead.position.x == food.position.x && snakeHead.position.y == food.position.y) {
        food.position.x = Math.floor(Math.random() * 30)
        food.position.y = Math.floor(Math.random() * 30)
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
setInterval(render, 100)