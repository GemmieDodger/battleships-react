
const Player = ( name, board ) => {
    const getName = () => name
    const getBoard = () => board
    let turn = true

    if( name === 'Computer' ) {
        turn = false
        let coordinates = []
        for(var i = 0; i < 10; i++ ){
            for(var j = 0; j < 10; j++ ){
                coordinates.push([ i, j ])  
            }
        }
        const randomAttack = () => {
            const randomIndex = Math.floor(Math.random() * coordinates.length);
            const randomCoordinate = coordinates[randomIndex]
            coordinates.splice(randomIndex, 1)
            return [randomCoordinate[0], randomCoordinate[1]]
        }

        return {turn, getName, getBoard, randomAttack, coordinates}
    }
    return {getName, turn, getBoard}
}

module.exports = Player