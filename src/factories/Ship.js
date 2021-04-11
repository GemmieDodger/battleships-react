const Ship = (length) => {
        const shipLife = new Array(length).fill('o')

        function findShipName(length) {  
        if (length === 1) {
            const shipName =  'Tug'
            return shipName
        } else if (length === 3) {
            const shipName =  'Submarine'
            return shipName
        } else if (length === 5) {
            const shipName =  'Cruiser'
            return shipName
        } else {
            const shipName =  'Battleship'
            return shipName
        }
    }
    const name = findShipName(length)

    const hit = (position) =>{
        shipLife.splice(position, 1, 'hit')
    }
    const shipFlagged = false

    const isSunk = () => shipLife.every((val) => val === 'hit')
    
const getShipName = () => name
const getShipLife = () => shipLife

    return {length, hit, isSunk, getShipName, getShipLife, shipFlagged}
}

module.exports = Ship

// theodinproject.com/courses/javascript/lessons/battleship

// https://github.com/daxas-boop/battleship-tdd/tree/master/src/factories