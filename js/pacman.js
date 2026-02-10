let direction = { i: 1, j: 0 }
let frame = 1
let animationDirection = "left"

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
  if (!gGameState.isOn) return
  if (gBoard[pacmanPos.i + direction.i][pacmanPos.j + direction.j].tileType === "wall") return

  if (gBoard[pacmanPos.i + direction.i][pacmanPos.j + direction.j]?.ghost) {
    gGameState.changeGameState(false)
    return
  }

  handleScore(gBoard[pacmanPos.i + direction.i][pacmanPos.j + direction.j].item)

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

function handleScore(item) {
  if (item === "empty") return
  if (item === "dot") gGameState.addScore(1)
  if (item === "apple") gGameState.addScore(15)
  if (item === "strawberry") gGameState.addScore(25)
}
