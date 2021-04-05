const GameBoard = require ('../GameBoard');


describe('board', () => {
    test('create board', () => {
        const board = GameBoard();
        expect(board.getBoard().length).toBe(10)
    })
    test('place 5 ships onto the board', () => {
        const board = GameBoard()
        let shipsSpacesTakenOnBoard = 0
        board.getBoard().forEach(arr => {
            const numberOfShipsOnBoard = arr.filter(value => typeof value === 'object')
            shipsSpacesTakenOnBoard += numberOfShipsOnBoard.length
        })
        expect(shipsSpacesTakenOnBoard).toBe(11)
    })
    test('receiveAttack attacks a ship or records the attack', () => {
        const board = GameBoard()
        expect(board.getBoard()[1][2] === 0 || typeof board.getBoard()[1][2] === 'object').toBeTruthy()
    board.receiveAttack(1,2)
    expect(board.getBoard()[1][2] === 'x' || board.getBoard()[1][2] === 'sunk ship').toBeTruthy()
    })    
    test('allShipsSunk detects when all ships were sunk', () => {
        const board = GameBoard();
        expect(board.allShipsSunk()).toBe(false);
        for(let i=0; i<10;i++){
            for(let b=0; b<10;b++){
                board.receiveAttack(i,b)
            }   
        }
        expect(board.allShipsSunk()).toBe(true);
    })
    
    test('Places the ships on random coordinates without touching each other', () => {
        const board = GameBoard();
        const grid = board.getBoard();
   
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