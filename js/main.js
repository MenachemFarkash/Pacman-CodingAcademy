const SIZE = { width: 28, height: 29 }
let wallsCoords
let gBoard
let gGameState = {
  isOn: true,
  score: 0,
  isPacmanSuper: false,

  addScore: function (amountToAdd) {
    this.score += amountToAdd
  },
  activateSuper: function () {
    this.isPacmanSuper = true
  },
  disableSuper: function () {
    this.isPacmanSuper = false
  },
  changeGameState: function (newState = this.isOn) {
    this.isOn = newState
  },
}
let pacmanPos = { i: 23, j: 19 }
const ghosts = [
  { name: "blinky", pos: { i: 20, j: 21 }, cellContent: "dot" },
  { name: "clyde", pos: { i: 8, j: 21 }, cellContent: "dot" },
  { name: "inky", pos: { i: 5, j: 6 }, cellContent: "dot" },
  { name: "pinky", pos: { i: 23, j: 6 }, cellContent: "dot" },
]

wallsCoords = getWalls()
gBoard = createBoard(SIZE)
renderBoard()

function createBoard(size) {
  const newBoard = []
  for (let i = 0; i < size.height; i++) {
    newBoard[i] = []
    for (let j = 0; j < size.width; j++) {
      if (i === 0 || i === size.height - 1 || j === 0 || j === size.width - 1) {
        newBoard[i].push({ tileType: "wall" })
      } else {
        newBoard[i].push({ tileType: "floor", item: "dot" })
      }
    }
  }

  wallsCoords.forEach((wall) => {
    newBoard[wall.i][wall.j] = { tileType: "wall" }
  })

  newBoard[14][6] = { tileType: "floor", item: "apple" }
  newBoard[14][21] = { tileType: "floor", item: "strawberry" }
  newBoard[pacmanPos.i][pacmanPos.j] = { tileType: "floor", item: "pacman" }

  ghosts.forEach((ghost) => {
    newBoard[ghost.pos.i][ghost.pos.j] = { tileType: "floor", item: "dot", ghost: ghost.name }
  })

  return newBoard
}

function renderBoard() {
  let boardHTML = ""
  let cellCounter = 0
  for (let i = 0; i < SIZE.height; i++) {
    for (let j = 0; j < SIZE.width; j++) {
      const currentCell = gBoard[i][j]
      if (currentCell.tileType === "floor" && currentCell?.ghost) {
        console.log("there is ghost")
        boardHTML += `<td class="cell cell-${i}-${j} ${currentCell.tileType}">
            <img src="images/ghosts/${currentCell.ghost}.png" />
            </td>`
      } else if (currentCell.tileType === "floor" && currentCell.item === "pacman") {
        boardHTML += `<td class="cell cell-${i}-${j} ${currentCell.tileType}">
            <img src="images/pacman-left/1.png" />
            </td>`
      } else if (currentCell.tileType === "floor" && currentCell.item !== "empty") {
        boardHTML += `<td class="cell cell-${i}-${j} ${currentCell.tileType}">
            <img src="images/floor/${currentCell.tileType === "floor" ? currentCell.item : ""}.png" />
            </td>`
      } else {
        boardHTML += `<td class="cell cell-${i}-${j} ${currentCell.tileType}">
            </td>`
      }
      cellCounter++
    }
    boardHTML += cellCounter === SIZE.width ? `</tr>` : `</tr><tr>`
  }

  document.querySelector("tbody").innerHTML = boardHTML
}

function renderCell(cellPos, content, frame, direction) {
  const cell = document.querySelector(`.cell-${cellPos.i}-${cellPos.j}`)
  if (content === "empty") {
    cell.innerHTML = ""
    return
  }

  if (content === "pacman") {
    cell.innerHTML = `<img src="images/pacman-${direction}/${frame}.png" />`
    return
  }
  if (content === "ghost") {
    cell.innerHTML = `<img src="images/ghosts/${gBoard[cellPos.i][cellPos.j]?.ghost}.png" />`
    return
  }

  cell.innerHTML = `<img src="images/floor/${content}.png" />`
}
