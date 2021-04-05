const Ship = require('./Ship');

const GameBoard = () => {
    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const ships = [
        Ship(5),
        Ship(3),
        Ship(2),
        Ship(1),
   ]
    const placeShipHorizontally = (coordinates, ship) => {
        let {row, col} = coordinates;
        for(let i = 0; i < ship.length; i++) {
            board[col].splice(row, 1, ship)
            row++
        }
    }

    const getRandomCoordinates = (ship) => {
        const row = Math.floor(Math.random() * (10-ship.length+1));
        const col = Math.floor(Math.random() * 10);
        return {row, col}
    }
    
    const placeShipsRandomly = () => {
        ships.forEach(ship => {
            let coordinates = getRandomCoordinates(ship)
            while(!validHorizontalCoordinates(board, coordinates, ship)){
                coordinates = getRandomCoordinates(ship)
            }
            placeShipHorizontally(coordinates, ship)
        })
    }
    placeShipsRandomly();

    const calculateShipPosition = (col, row) => {
        const ship = board[col][row]
        let i = 0
        let b = 0
        if (col ===9) {
            while(board[col][row+i] === ship || board[col][row+i] === 'sunk ship') i++ 
        } else {
            while(board[col][row+i] === ship || board[col][row+i] === 'sunk ship'){
                i++;
            }
            while(board[col+b][row] === ship || board[col+b][row] === 'sunk ship') {
                b++
            }
        }
        if (i > 1) {
            return ship.length - i
        }
        else if (b > 1) {
            return ship.length - b
        }
        else {
            return ship.length - i
        }
    }

    const receiveAttack = (col, row) => {
        if (typeof board[col][row] === 'object') {
            const position = calculateShipPosition(col, row)
            board[col][row].hit(position)
            board[col][row] = 'sunk ship'
        } else {
            board[col][row] = 'x'
        }
    }

    const allShipsSunk = () => {
        return ships.every(ship => ship.isSunk())
    }

const getShipsRemaining = () => {
    let acc = 0
    ships.forEach((ship) => {
        if(!ship.isSunk()) acc++
    })
    return acc
}

    const getBoard = () => board

    return {getBoard, receiveAttack, allShipsSunk, getShipsRemaining}
}


module.exports = GameBoard

const validHorizontalCoordinates = (board, coordinates, ship) => {
    let {row, col} = coordinates

    for (let i = 0; i <= ship.length; i++) {
        if(col === 0) {
            //check the sides
            if(typeof board[col][row+i] === 'object' || typeof board[col][row-1] === 'object') {
                return false
            }
        } else if(col === 9) {
            //checks the sides
            if(typeof board[col][row+i] === 'object' || typeof board[col][row-1] === 'object'){ 
                return false
            }
        } else {
            //checks the sides
            if(typeof(board[col][row+i]) === 'object' || typeof(board[col][row-1]) === 'object'){ 
                return false
            }
        }
    }
    return true
}
