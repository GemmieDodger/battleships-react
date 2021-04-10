const Gameboard = require ('../Gameboard');


describe('board', () => {
    test('create board', () => {
        const board = Gameboard();
        expect(board.getGameBoard().length).toBe(10)
    })
    test('place 5 ships onto the board', () => {
        const board = Gameboard()
        let shipsSpacesTakenOnBoard = 0
        board.getGameBoard().forEach(arr => {
            const numberOfShipsOnBoard = arr.filter(value => typeof value === 'object')
            shipsSpacesTakenOnBoard += numberOfShipsOnBoard.length
        })
        expect(shipsSpacesTakenOnBoard).toBe(11)
    })
    test('receiveAttack attacks a ship or records the attack', () => {
        const board = Gameboard()
        expect(board.getGameBoard()[1][2] === 0 || typeof board.getGameBoard()[1][2] === 'object').toBeTruthy()
    board.receiveAttack(1,2)
    expect(board.getGameBoard()[1][2] === 'x' || board.getGameBoard()[1][2] === 'sunk ship').toBeTruthy()
    })    
    test('allShipsSunk detects when all ships were sunk', () => {
        const board = Gameboard();
        expect(board.allShipsSunk()).toBe(false);
        for(let i=0; i<10;i++){
            for(let b=0; b<10;b++){
                board.receiveAttack(i,b)
            }   
        }
        expect(board.allShipsSunk()).toBe(true);
    })
    
    test('Places the ships on random coordinates without touching each other', () => {
        const board = Gameboard();
        const grid = board.getGameBoard();
   
        const checkValidity = (object,b,i) => {
            if (b === 9) {
                if(typeof grid[b-1][i] === 'object' && grid[b-1][i] !== object){
                    return false
                } else if( typeof grid[b][i-1] === 'object' && grid[b][i-1] !== object) {
                    return false
                } else if( typeof grid[b][i+1] === 'object' && grid[b][i+1] !== object) {
                    return false
                }
                return true;
            }else if (b === 0) {
                if (typeof grid[b+1][i] === 'object' && grid[b+1][i] !== object) {
                    return false
                } else if( typeof grid[b][i-1] === 'object' && grid[b][i-1] !== object) {
                    return false
                } else if( typeof grid[b][i+1] === 'object' && grid[b][i+1] !== object) {
                    return false
                }
                return true;
            } else {
                if(typeof grid[b-1][i] === 'object' && grid[b-1][i] !== object){
                    return false
                } else if (typeof grid[b+1][i] === 'object' && grid[b+1][i] !== object) {
                    return false
                } else if( typeof grid[b][i-1] === 'object' && grid[b][i-1] !== object) {
                    return false
                } else if( typeof grid[b][i+1] === 'object' && grid[b][i+1] !== object) {
                    return false
                }
                return true;
            }
        }
    })
})