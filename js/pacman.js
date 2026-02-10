let pacmanMovementIntervalId

let direction = { i: 1, j: 0 }
let frame = 1
let animationDirection = "left"
pacmanMovementIntervalId = setInterval(movePacman, 150)

function changeDirection(ev) {
  switch (ev.key) {
    case "ArrowUp":
      direction = { i: -1, j: 0 }
      animationDirection = "up"
      break
    case "ArrowDown":
      direction = { i: 1, j: 0 }
      animationDirection = "down"
      break
    case "ArrowLeft":
      direction = { i: 0, j: -1 }
      animationDirection = "left"
      break
    case "ArrowRight":
      direction = { i: 0, j: 1 }
      animationDirection = "right"
      break
  }
}

function movePacman() {
  if (gBoard[pacmanPos.i + direction.i][pacmanPos.j + direction.j].tileType === "wall") return
  genFrame()
  gBoard[pacmanPos.i][pacmanPos.j] = { tileType: "floor", item: "empty" }
  renderCell(pacmanPos, "empty")
  pacmanPos = { i: pacmanPos.i + direction.i, j: pacmanPos.j + direction.j }
  gBoard[pacmanPos.i][pacmanPos.j] = { tileType: "floor", item: "pacman" }
  renderCell(pacmanPos, "pacman", frame, animationDirection)
}

function genFrame() {
  if (frame === 3) {
    frame = 1
    return
  }
  frame++
}
