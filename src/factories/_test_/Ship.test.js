const Ship = require ('../Ship')

describe('ship', () => {
    test('create ship', () => {
        const ship = Ship(2)
        expect(ship.length).toBe(2)
        expect(ship.name).toBe("Battleship")
    })
})