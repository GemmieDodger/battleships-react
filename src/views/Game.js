import { useEffect, useState } from "react"
import Gameboards from "../components/Gameboards"
import useGameLoop from '../components/Hooks/useGameLoop'
import styled from '@emotion/styled';

const Button = styled.button `
    display:flex;
    margin:20px auto;
    background-color: lightgreen;
    padding: 10px;
    font-weight: bolder;
`

const Menu = styled.div `
    margin:45px auto !important;
    display:flex;
    flex-direction:column;
    width:300px;
    position:static;
    @media(max-width:320px) {
        width:250px;
    }
`


const StateTurn = styled.h3 `
    text-align:center;
    margin-top:20px;
    grid-column:1/3;
    color: #ffffcc;
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
    background-color: black;
    color: white;
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
    const [renderGameboards, setRenderGameboards] = useState(false)
    const [renderWinner, setRenderWinner] = useState(false)
    const [renderMenu, setRenderMenu] = useState(true);

    useEffect(() => {
        winner ? setRenderWinner(true) : setRenderWinner(false)
    }, [winner])

    const handleNewGame = () => {
        startNewGame()
        setRenderMenu(false); 
        setRenderGameboards(true)
    }
    return (
        <>
        {renderMenu && 
            <Menu>
                <Button 
                    className='btn' 
                    onClick={() => handleNewGame()}>
                    New game
                </Button>
            </Menu>
        }

        {renderGameboards &&
            <Container>
                <StateTurn>{players.human.turn ? 'Your turn' : 'Computer\'s turn.'}</StateTurn>
                <Gameboards
                    cellOnClick={cellOnClick}
                    humanGameboard={players.human.getGameboard().getBoard()}
                    computerGameboard={players.computer.getGameboard().getBoard()}
                    shipsRemaining={remainingShips}
                />
            </Container>
        }

        {renderWinner &&
            <WinnerContainer 
            data-testid="winner-container"
            className=''>
                <Title>{winner === 'Human' ?  'You won' : 'You lost'}</Title> 
                <Button 
                    className='' 
                    onClick={()=> startNewGame()}>
                    Play again?
                </Button>
            </WinnerContainer>
        }
    </>
    )

}

export default Game