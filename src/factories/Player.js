
const Player = ( name, Gameboard ) => {
    const getName = () => name
    const getGameboard = () => Gameboard
    let turn = true

    return {getName, turn, getGameboard}
}

module.exports = Player