const GameBoard = require('../GameBoard');
const Player = require ('../Player');

describe('player', () => {
    test('create normal player', () => {
        const board = GameBoard()
        const player = Player('Gemma', board);
        expect(player.getName()).toBe('Gemma')
        expect(player.turn).toBe(true)
    })
    test('create computer player', () => {
        const board = GameBoard()
        const player = Player('Computer', board);
        expect(player.getName()).toBe('Computer')
        expect(player.turn).toBe(false)
    })
    test('randomAttack for computer', () => {
        const board = GameBoard()
        const player = Player('Computer', board);
        const originalLength = player.coordinates.length
        expect(originalLength).toBe(player.coordinates.length)
        player.randomAttack()
        expect(originalLength).not.toBe(player.coordinates.length)
        player.randomAttack()
        expect(originalLength).not.toBe(player.coordinates.length)
    })
})