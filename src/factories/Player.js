
const Player = ( name, gameBoard ) => {
    const getName = () => name
    const getGameBoard = () => gameBoard
    let turn = true

    return {getName, turn, getGameBoard}
}

module.exports = Player