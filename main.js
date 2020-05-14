document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.form')
  const gameOver = document.querySelector('.game-over')
  // const btnSelectColorSnake = document.querySelectorAll('.select-color-snake button')
  // const btnBlue = document.querySelector('btn-blue')
  // const btnRed = document.querySelector('btn-red')
  // const btnGreen = document.querySelector('btn-green')
  // const btnRandom = document.querySelector('btn-random')

  // btnSelectColorSnake.forEach((btn, index) => {
  //   btn.addEventListener('click', e => {
  //     let nameColor = e.target.name
  //     if(nameColor == 'red') {
  //       document.querySelector('.snake').style.backgroundColor = '#e00'
  //     } else if(nameColor == 'blue') {
  //       document.querySelector('.snake').style.backgroundColor = '#00f'
  //     } else if(nameColor == 'green') {
  //       document.querySelector('.snake').style.backgroundColor = '#0c0'
  //     } else {
  //       const hex = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
  //       let strHex = '#';
  //       for(let i = 0; i <= 6; i++) strHex += i
  //       document.querySelector('.snake').setAttribute('style', `color:${strHex}`)
  //     }
  //   })
  // })


  const width = 10
  let
    player = '',
    currentSnake = [1,0],
    // currentIndex = 0,
    appleIndex = 0,
    speed = 0.9,
    direction = 1,
    interval = 0,
    intervalTime = 0,
    score = 0

  function startGame(e) {
    e.preventDefault()
    currentSnake.forEach(i => squares[i].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)

    score = 0
    randomApple()
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [1,0]
    currentIndex = 0
    currentSnake.forEach(i => squares[i].classList.add('snake'))
    console.log('Hello')
    console.log('Hello below snake')
    interval = setInterval(moveSnake, intervalTime)
    gameOver.innerText = ''
  }

  function moveSnake() {
    if(
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      gameOver.innerText = 'Game Over'
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    let tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.innerText = score
      clearInterval(interval)
      intervalTime *= speed
      interval = setInterval(moveSnake, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random()*squares.length)
    } while(squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
  }

  function controlSnake(e) {
    if(e.keyCode == 37) direction = -1// left
    if(e.keyCode == 38) direction = -width// up
    if(e.keyCode == 39) direction = 1// right
    if(e.keyCode == 40) direction = width// down
  }

  document.addEventListener('keyup', controlSnake)
  startBtn.addEventListener('submit', startGame)

})
