function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}

function countNegs(rowIdx, colIdx, mat) {
    var neighborsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine === true) neighborsCount++
        }
    }
    return neighborsCount
}

function timeUp(gClickTime) {
    var nowTime = Date.now()
    var strText
    var time = Math.round(((nowTime) - (gClickTime)) / 1000)
    strText = time
    renderTime(strText)
}

function renderTime(time) {
    var elH2Time = document.querySelector('.time span')
    elH2Time.innerText = time
    gGame.secsPassed = +time

}

function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        var currEL
        for (var j = 0; j < mat[0].length; j++) {
            currEL = mat[i][j]
            newMat[i][j] = currEL
        }
    }
    return newMat
}

