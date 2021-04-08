import { useEffect, useState } from "react"
import GameBoards from "../components/GameBoards"
import useGameLoop from '../components/Hooks/useGameLoop'
import styled from '@emotion/styled';

const Button = styled.button `
    display:flex;
    margin:20px auto;
`

const StateTurn = styled.h3 `
    text-align:center;
    margin-top:20px;
    grid-column:1/3;
    @media(max-width:768px) {
        grid-row:2/3;
        grid-column:1/2;
        margin:2px;
    }
`

const WinnerContainer = styled.div `
    position:absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height:400px;
    width:500px;
    border:4px solid white;
    padding:2px;
    max-width:100vw;
`

const Title = styled.h4 `
    margin-top:20px;
    text-align:center;
`

const Container = styled.div `
    display:grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr 1fr;
    height: 500px;
    margin-top:20px;
    @media(max-width:768px) {
        grid-template-columns:1fr;
        height: 300px;
        grid-template-rows: 360px 30px 360px;
    }
    @media(max-width:320px) {
        grid-template-columns:1fr;
        height: 300px;
        grid-template-rows: 300px 30px 300px;
    }
`


const Game = () => {
    const {cellOnClick, players, winner, startNewGame, remainingShips} = useGameLoop()
    const [renderGameBoards, setRenderGameBoards] = useState(false)
    const [renderWinner, setRenderWinner] = useState(false)

    useEffect(() => {
        winner ? setRenderWinner(true) : setRenderWinner(false)
    }, [winner])

    const handleNewGame = () => {
        startNewGame()
        setRenderGameBoards(true)
    }
    return (
        <>
            <Button 
                 className='nes-btn' 
                onClick={() => handleNewGame()}>
                        New game
            </Button>
            {renderGameBoards &&
                <Container>
                    <StateTurn>{players.human.turn ? 'Your turn' : 'Computer\'s turn.'}</StateTurn>
                    <GameBoards
                        cellOnClick={cellOnClick}
                        humanGameBoard={players.human.getGameBoard().getBoard()}
                        computerGameBoard={players.computer.getGameBoard().getBoard()}
                        shipsRemaining={remainingShips}
                    />
                </Container>
            }
            {renderWinner &&
                <WinnerContainer
                data-testid="winner-container"
                className=''>
                    <Title> {winner === 'Human' ? 'You won!' : 'You lost'}</Title>
                    <Button onClick={() => startNewGame()}>
                    Play again?</Button>
                </WinnerContainer>
            }
        </>
    )

}

export default Game