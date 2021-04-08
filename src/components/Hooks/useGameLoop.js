import { useState, useEffect } from 'react';
import newGameBoard from '../../factories/GameBoard';
import Player from '../../factories/Player';
import ComputerPlayer from '../../factories/ComputerPlayer';

const useGameLoop = () => {
    const [winner, setWinner] = useState(null);
    const [remainingShips, setRemainingShips] = useState();
    const [players, setPlayers] = useState({
        human: Player('Human', newGameBoard()),
        computer: ComputerPlayer('Computer', newGameBoard())
    });

    useEffect(() => {
        players && setRemainingShips({
            humanShips: players.human.getGameBoard().getShipsRemaining(),
            computerShips: players.computer.getGameBoard().getShipsRemaining()
        })
    }, [players])

    const startNewGame = () => {
        const newPlayers = {
            human: Player('Human', newGameBoard()),
            computer:  ComputerPlayer('Computer', newGameBoard())
        }
        setPlayers(newPlayers)
        setWinner(null)
    }

    const changePlayersTurn = () => {
        setPlayers(prevState => ({
            human: {
                ...prevState.human,
                turn: !prevState.human.turn
            },
            computer: {
                ...prevState.computer.turn
            }
        }))
    }

    const checkWinner = () => {
        if (players.human.getGameBoard().allShipsSunk()){
            setWinner(players.computer.getName())
        } else if (players.computer.getGameBoard().allShipsSunk()) {
            setWinner(players.human.getName())
        }
    }

    const isShipHit = (enemyGameBoard, col, row) => {
        const enemyBoard = enemyGameBoard.getBoard();
        return(enemyBoard[col][row] === 'sunk ship');
    }

    const computerPlay = () => {
        setTimeout(() => {
            const randomCoords = players.computer.randomAttack();
            const col = randomCoords[0]
            const row = randomCoords[1]
            const enemyGameBoard = players.human.getGameBoard()
            enemyGameBoard.receiveAttack(col, row)
            if(isShipHit(enemyGameBoard, col, row)) {
                setPlayers(prevState => ({...prevState}))
                checkWinner()
                setTimeout(() => {computerPlay()}, 300)
                return
            }
            changePlayersTurn()
        }, 300)
    }

    const cellOnClick = (col, row) => {
        const enemyGameBoard = players.computer.getGameBoard()

        enemyGameBoard.receiveAttack(col, row)

        if(isShipHit(enemyGameBoard, col, row)) {
            setPlayers(prevState => ({ ...prevState}))
            checkWinner()
            return
        }
        changePlayersTurn()
        computerPlay();
    }
    
    return {cellOnClick, players, winner, startNewGame, remainingShips}


}

export default useGameLoop