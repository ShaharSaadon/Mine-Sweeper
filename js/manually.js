function manuallyCreate() {
    onInit()
    //@CR - Clear sad variables from code (they are gray because they are not used)
    var isUnderstand = confirm('You are going to manually create mode, which means you will decided where located the mines. Pay attention you are at the level that you want before. \n  \n Are you sure you want to get in Mannualy Mode?')
    //i want to hide the other things on the page but later.
    var elGameMode = document.querySelector('h2 span')
    elGameMode.innerHTML = `!@#Manuallly mode!@# /n <button class="manually" onclick="finishManually()">Finish Manually Mode</button> ${MINE_IMG}`
    gGame.isManuallyMode++

}

function onCellClickedManually(elCell, i, j) {

    if (gGame.shownCount < gLevel.MINES) {
        const cell = gBoard[i][j]
        cell.isMine = true
        cell.isShown = true
        gGame.shownCount++
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)


    } else {
        gIsFirstMove = false
        gGame.isManuallyMode--
        for (var row = 0; row < gBoard.length; row++) {
            for (var col = 0; col < gBoard[0].length; col++) {
                if (gBoard[row][col].isShown) {
                    gBoard[row][col].isShown = false
                    gGame.shownCount--
                    renderBoard(gBoard)

                }
            }
        }
        if (!gGame.isManuallyMode) {
            gClickTime = Date.now()
            gInterval = setInterval("timeUp(gClickTime)", 1000)
            alert('now you can start playing')
            onCellClicked(elCell, i, j)
        }
    }
}

function finishManually(){
    gGame.isManuallyMode = false
    
    for (var row = 0; row < gBoard.length; row++) {
        for (var col = 0; col < gBoard[0].length; col++) {
            if (gBoard[row][col].isShown) {
                gBoard[row][col].isShown = false
                gGame.shownCount--
                renderBoard(gBoard)

            }
        }
    }
}