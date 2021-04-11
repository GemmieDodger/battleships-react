import {useState, useEffect} from 'react';
import newGameboard from '../../factories/Gameboard';
import humanPlayer from '../../factories/Player';
import computerPlayer from '../../factories/ComputerPlayer';


const useGameLoop = () => {
    const [winner, setWinner] = useState(null);
    const [remainingShips, setRemainingShips] = useState();
    const [humanSunkShipName, setHumanSunkShipName] = useState('');
    const [computerSunkShipName, setComputerSunkShipName] = useState('');
    const [players, setPlayers] = useState({
        human: humanPlayer('Human', newGameboard()),
        computer: computerPlayer('Computer', newGameboard())
    });
    
    useEffect(() => {
        players && setRemainingShips({
            humanShips: players.human.getGameboard().getShipsRemaining(),
            computerShips: players.computer.getGameboard().getShipsRemaining()
        }) && setHumanSunkShipName(players.human.getGameboard().getSunkShipName())
         && setComputerSunkShipName(players.computer.getGameboard().getSunkShipName())
    }, [players])

    const startNewGame = () => {
        const newPlayers = {
            human: humanPlayer('Human', newGameboard()),
            computer: computerPlayer('Computer',newGameboard())
        }
        setHumanSunkShipName('')
        setComputerSunkShipName('')
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

    const isShipHit = (enemyGameboard, col, row) => {
        const enemyBoard = enemyGameboard.getBoard();
        return (enemyBoard[col][row] === 'sunk ship');
    } 

    const computerPlay = () => {
        setTimeout(() => {
            setHumanSunkShipName('')
            const randomCoords = players.computer.randomAttack();
            const col = randomCoords[0];
            const row = randomCoords[1];
            const enemyGameboard = players.human.getGameboard();

            enemyGameboard.receiveAttack(col, row);


            if (isShipHit(enemyGameboard,col,row)) {
                if (enemyGameboard.getSunkShipName() !== '') {
                    setHumanSunkShipName(enemyGameboard.getSunkShipName())
                } 
                setPlayers(prevState => ({...prevState}))
                checkWinner();
                setTimeout(() => {computerPlay()}, 300);
                return;
            } else {
                enemyGameboard.missedShip()
            }
            
            changePlayersTurn();
        }, 300);
    }

    const cellOnClick = (col, row) => {
        setComputerSunkShipName('')
        const enemyGameboard = players.computer.getGameboard();
        enemyGameboard.receiveAttack(col, row);

        if (isShipHit(enemyGameboard,col,row)) {
            if (enemyGameboard.getSunkShipName() !== '') {
                setComputerSunkShipName(enemyGameboard.getSunkShipName())
            } 
            setPlayers(prevState => ({...prevState}))
            checkWinner(); 
            return;
        } else {
            enemyGameboard.missedShip()
        }
        
        changePlayersTurn();
        computerPlay();
    }

    return {cellOnClick, players, winner, startNewGame, remainingShips, humanSunkShipName, computerSunkShipName}
}

export default useGameLoop;