const rows = 20
const cols = 20
const boxSize = 25
let board
let context
let foodX
let foodY
let snakeX = 5 * rows
let snakeY = 5 * cols
let velocityX = 0
let velocityY = 0
let snakeBody = []
let gameOver = false

window.onload = function () {
    board = document.getElementById('board')
    board.height = rows * boxSize
    board.width = cols * boxSize
    context = board.getContext("2d")

    randomFoodPlace()
    window.addEventListener('keyup', changeDirection)
    setInterval(() => {
        update()
    }, 100);
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = 'blue'
    context.fillRect(foodX, foodY, boxSize, boxSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        randomFoodPlace()
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeY += velocityY * boxSize
    snakeX += velocityX * boxSize
    context.fillRect(snakeX, snakeY, boxSize, boxSize)

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize)        
    }

    if (snakeX < 0 || snakeY < 0 || snakeX > cols*boxSize || snakeY > rows*boxSize) {
        gameOver = true
        alert('Game Over')
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert('Game over')
        }
    }
}

function changeDirection(e) {
    if (e.key == 'ArrowUp' && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key == 'ArrowDown' && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key == 'ArrowRight' && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function randomFoodPlace() {
    foodX = Math.floor(Math.random() * cols) * boxSize
    foodY = Math.floor(Math.random() * rows) * boxSize
}