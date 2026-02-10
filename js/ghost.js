function pickRandomDirection() {
  let randDirection = getRandomInt(0, 4)
  switch (randDirection) {
    case 0:
      ghostDirection = { i: -1, j: 0 }
      break
    case 1:
      ghostDirection = { i: 1, j: 0 }
      break
    case 2:
      ghostDirection = { i: 0, j: -1 }
      break
    case 3:
      ghostDirection = { i: 0, j: 1 }
      break
  }

  return ghostDirection
}

function moveGhosts() {
  ghosts.forEach((ghost) => {
    const ghostDirection = pickRandomDirection()
    moveGhost(ghost, ghostDirection)
  })
}

function moveGhost(ghost, ghostDirection) {
  const nextPos = { i: ghost.pos.i + ghostDirection.i, j: ghost.pos.j + ghostDirection.j }
  if (gBoard[nextPos.i][nextPos.j].tileType === "wall" || gBoard[nextPos.i][nextPos.j]?.ghost) {
    return
  }
  if (gBoard[nextPos.i][nextPos.j].item === "pacman") {
    handleGameOver()
    return
  }
  gBoard[ghost.pos.i][ghost.pos.j] = { tileType: "floor", item: ghost.cellContent }
  renderCell(ghost.pos, ghost.cellContent)

  ghost.cellContent = gBoard[nextPos.i][nextPos.j].item
  ghost.pos = nextPos
  gBoard[ghost.pos.i][ghost.pos.j] = {
    tileType: "floor",
    item: ghost.cellContent,
    cellContent: gBoard[ghost.pos.i][ghost.pos.j].item,
    ghost: ghost.name,
  }
  renderCell(ghost.pos, "ghost")
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}
