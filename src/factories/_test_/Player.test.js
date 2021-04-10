const Gameboard = require('../Gameboard');
const Player = require ('../Player');
const ComputerPlayer = require ('../ComputerPlayer');

describe('player', () => {
    test('create normal player', () => {
        const board = Gameboard()
        const player = Player('Gemma', board);
        expect(player.getName()).toBe('Gemma')
        expect(player.turn).toBe(true)
    })
    test('create computer player', () => {
        const board = Gameboard()
        const player = ComputerPlayer('Computer', board);
        expect(player.getName()).toBe('Computer')
        expect(player.turn).toBe(false)
    })

})