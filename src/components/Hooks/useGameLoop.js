import {useState, useEffect} from 'react';
import newGameboard from '../../factories/Gameboard';
import humanPlayer from '../../factories/Player';
import computerPlayer from '../../factories/ComputerPlayer';


const useGameLoop = () => {
    const [winner, setWinner] = useState(null);
    const [remainingShips, setRemainingShips] = useState();
    const [players, setPlayers] = useState({
        human: humanPlayer('Human', newGameboard()),
        computer: computerPlayer('Computer', newGameboard())
    });
    
    useEffect(() => {
        players && setRemainingShips({
            humanShips: players.human.getGameboard().getShipsRemaining(),
            computerShips: players.computer.getGameboard().getShipsRemaining()
        })
    }, [players])

    const startNewGame = () => {
        const newPlayers = {
            human: humanPlayer('Human', newGameboard()),
            computer: computerPlayer('Computer',newGameboard())
        }
        setPlayers(newPlayers);
        setWinner(null);
    }

    const changePlayersTurn = () => {
        setPlayers(prevState => ({
            human: {
                ...prevState.human,
                turn: !prevState.human.turn
            },
            computer:{
                ...prevState.computer,
                turn: !prevState.computer.turn
            }
        }))
    }

    const checkWinner = () => {
        if (players.human.getGameboard().allShipsSunk()){
            setWinner(players.computer.getName());
        } else if (players.computer.getGameboard().allShipsSunk()){
            setWinner(players.human.getName());
        }
    }

    const isShipHit = (enemyGameboard, column, row) => {
        const enemyBoard = enemyGameboard.getBoard();
        return (enemyBoard[column][row] === 'sunked ship');
    } 

    const computerPlay = () => {
        setTimeout(() => {
            const randomCoords = players.computer.randomAttack();
            const column = randomCoords[0];
            const row = randomCoords[1];
            const enemyGameboard = players.human.getGameboard();

            enemyGameboard.receiveAttack(column, row);
            if (isShipHit(enemyGameboard,column,row)) {
                setPlayers(prevState => ({...prevState}))
                checkWinner();
                setTimeout(() => {computerPlay()}, 300);
                return;
            }
            changePlayersTurn();
        }, 300);
    }

    const cellOnClick = (column, row) => {
        const enemyGameboard = players.computer.getGameboard();
        enemyGameboard.receiveAttack(column, row);

        if (isShipHit(enemyGameboard,column,row)) {
            setPlayers(prevState => ({...prevState}))
            checkWinner(); 
            return;
        }
        
        changePlayersTurn();
        computerPlay();
    }

    return {cellOnClick, players, winner, startNewGame, remainingShips}
}

export default useGameLoop;