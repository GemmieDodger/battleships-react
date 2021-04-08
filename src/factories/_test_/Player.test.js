const GameBoard = require('../GameBoard');
const Player = require ('../Player');
const ComputerPlayer = require ('../ComputerPlayer');

describe('player', () => {
    test('create normal player', () => {
        const board = GameBoard()
        const player = Player('Gemma', board);
        expect(player.getName()).toBe('Gemma')
        expect(player.turn).toBe(true)
    })
    test('create computer player', () => {
        const board = GameBoard()
        const player = ComputerPlayer('Computer', board);
        expect(player.getName()).toBe('Computer')
        expect(player.turn).toBe(false)
    })

})