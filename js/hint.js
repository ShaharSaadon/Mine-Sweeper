'use strict'

var gIsHintMode
var gLastHintnum
var gIsMegaHint = 0
var gMegaHintPositions = []

function hint(hintNum) {
    if (gIsHintMode) return
    gIsHintMode = true
    hintSound.play()
    gLastHintnum = hintNum
    var elHint = document.querySelector(`#hint${hintNum}`)
    elHint.style.backgroundColor = 'yellow'
}

function hintMove(board, rowIdx, colIdx) {
    //CR - Never use arr for varibale name!
    var tempArr = []
    var tempCell
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            tempCell = board[i][j].isShown
            tempArr.push(tempCell)
            board[i][j].isShown = true
            renderBoard(board)
        }
    }
    console.log(tempArr)
    setTimeout(hintHide, 1000, board, rowIdx, colIdx, tempArr)
    hintHide()
}

function hintHide(board, rowIdx, colIdx, tempArr) {
    var isShownBefore
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            isShownBefore = tempArr.shift()
            board[i][j].isShown = isShownBefore
        }
    }

    renderBoard(gBoard)
    gIsHintMode = false
    console.log(`${gLastHintnum}`)
    setTimeout(() => {
        var elHint = document.querySelector(`#hint${gLastHintnum}`)
        elHint.style.display = 'none'
    }, 1000);


}

function megaHint() {
    gIsMegaHint++
    if (gMegaHintPositions.length === 2) return
    alert('You are In Mega-Hint move! Pay attention, you have this tool only once in a game. The first click is the upper left edge of the rectangle and the second click is the right and lower edge of the rectangle that will revealds for a second')
}

function onCellClickedMegaHint(elCell, i, j) {
    gBoard[i][j].isShown = true
    renderBoard(gBoard)
    gMegaHintPositions.push({ i, j })
    console.log(gMegaHintPositions)
    gIsMegaHint++
    if (gMegaHintPositions.length === 2) megaHintMove()
}

function megaHintMove() {
    var tempArr = []
    var tempCell

    var firstRow = gMegaHintPositions[0].i
    var firstCol = gMegaHintPositions[0].j
    var lastRow = gMegaHintPositions[1].i
    var lastCol = gMegaHintPositions[1].j
    console.log(firstRow, firstCol + " aa", lastRow, lastCol)

    for (var i = firstRow; i <= lastRow; i++) {
        for (var j = firstCol; j <= lastCol; j++) {
            tempCell = gBoard[i][j].isShown
            tempArr.push(tempCell)
            gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard)
    setTimeout(megaHintHide, 1000, tempArr)

}

function megaHintHide(tempArr) {
    var isShownBefore
    var firstRow = gMegaHintPositions[0].i
    var firstCol = gMegaHintPositions[0].j
    var lastRow = gMegaHintPositions[1].i
    var lastCol = gMegaHintPositions[1].j

    for (var i = firstRow; i <= lastRow; i++) {
        for (var j = firstCol; j <= lastCol; j++) {
            isShownBefore = tempArr.shift()
            gBoard[i][j].isShown = isShownBefore
        }
    }
    gBoard[firstRow][firstCol].isShown=false
    gBoard[lastRow][lastCol].isShown=false
    renderBoard(gBoard)
    gIsMegaHint=0

}
