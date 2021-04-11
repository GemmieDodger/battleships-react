import React from 'react'
import uniqid from 'uniqid'
import styled from '@emotion/styled';
//ACCESS THE NAME TO SAY YOU HAVE SUNK THIS SHIP
//CMPUTER TO BE CLEVER...

const Board = styled.div `
    display:grid;
    grid-template-rows: repeat(11, 1fr);
    grid-template-columns: repeat(11, 1fr);
    grid-auto-flow: column;
    width:500px;
    height:500px;
    margin:0 auto;
    line-height:0;
    @media(max-width:1366px) {
        width:400px;
        height:400px;
    }
    @media(max-width:1024px) {
        width: 300px;
        height: 300px;
    }
    @media(max-width:768px) {
        width: 250px;
        height: 250px;
    }
    @media(max-width:320px) {
        width: 200px;
        height: 200px;
    }
`

const Wrapper = styled.section `
    margin:10px;
    @media(max-width:1366px) {
        margin:10px 20px; 
    }
    @media(max-width:1024px) {
        margin:0;
    }
    @media(max-width:768px) {
        margin:0;
    }
    @media(max-width:320px) {
        margin:0;
    }
`

const Row = styled.div `
    grid-column: 1/12;
    display:grid;
    grid-template-columns: repeat(11, 1fr);
`

const Cell = styled.div `
    display:flex;
    border:1px solid #002c66;
    background-color: #2389da;
    &:hover{
        background-color: yellow;
    }
`

const CellNoHover = styled.div `
    display:flex;
    border:1px solid #002c66;
    background-color: #2389da;
`

const MissedShot = styled.div `
    background-color: #ffa31a;
    border:1px solid #002c66;
    display:flex;
    align-items:center;
    justify-content:center;
    @media(max-width:768px) {
        font-size: 14px;
    }
`

const HitShip = styled.div `
    background-color: red;
    border:1px solid #002c66;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:'Roboto';
`

const Ship = styled.div `
    border:1px solid #002c66;
    background-color:blue;
`

const Title = styled.h3 `
    text-align:center;
    margin-top:20px;
    margin-bottom:20px;
    @media(max-width:768px) {
        font-size: 14px;
        margin:4px 0;
    }
`

const Coordinates = styled.div `
    background-color:#eee;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Lives = styled.p `
    margin-top:10px;
    color: #ffffcc;
    text-align:center;
    @media(max-width:768px) {
        font-size:14px;
        margin:25px 0;
    }
`


const Gameboards = (props) => {
    const {humanGameboard, computerGameboard, cellOnClick, shipsRemaining, humanSunkShipName, computerSunkShipName} = props;
    return(
        <>
            <Wrapper>
                <Title style={{color:'green'}}>Your board</Title>
                <Board  data-testid='human-gameboard'>
                    {humanGameboard.map((row,i)=>
                    <React.Fragment key={uniqid()}>
                        <Row key={uniqid()}>
                            {row.map((element, i) => 
                                typeof element === 'object' ?
                                <Ship data-testid='ship' key={uniqid()}> </Ship> 
                                : element === 0 ?
                                    <CellNoHover 
                                        data-testid='cell-no-hover' 
                                        key={uniqid()}>
                                    </CellNoHover>
                                : element === 'x' ? 
                                    <MissedShot 
                                        data-testid='missed-shot' 
                                        key={uniqid()}>
                                    ×</MissedShot>
                                : element === 'sunk ship' &&
                                    <HitShip 
                                        data-testid='hit-ship'
                                        key={uniqid()}>
                                    !</HitShip>
                                )
                            }
                            <Coordinates key={uniqid()}>{String.fromCharCode(65+i)}</Coordinates>
                        </Row>
                            <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Your ships alive: {shipsRemaining.humanShips}</Lives>
                {humanSunkShipName !== '' ? <Lives>Your {humanSunkShipName} sank</Lives> : ''} 
                
            </Wrapper>    

            <Wrapper>
                <Title style={{color:'red'}}>Enemy board</Title>
                <Board data-testid='computer-gameboard'>
                    {computerGameboard.map((row,i) => 
                    <React.Fragment key={uniqid()}>
                        <Row key={uniqid()}>
                            {row.map((cell, i) => 
                                typeof cell === 'object' || cell === 0 ? 
                                    <Cell 
                                    data-testid='cell'
                                    className='nes-pointer'
                                    key={uniqid()}
                                    data-cord1={computerGameboard.indexOf(row)}
                                    data-cord2={i}
                                    onClick={(e) => cellOnClick(Number(e.target.dataset.cord1),Number(e.target.dataset.cord2))}
                                    data-player={props.player} 
                                    />
                                : cell === 'x' ? 
                                    <MissedShot 
                                        data-testid='missed-shot'
                                        key={uniqid()}>
                                    ×</MissedShot> 
                                : cell === 'sunk ship' &&
                                    <HitShip
                                        data-testid='hit-ship'
                                        key={uniqid()}>
                                    !</HitShip>
                            )}
                            <Coordinates key={uniqid()}>{String.fromCharCode(65+i)}</Coordinates>
                        </Row>
                        <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Enemy ships alive: {shipsRemaining.computerShips}</Lives>
                {computerSunkShipName !== '' ? <Lives>You sank your enemies {computerSunkShipName}!</Lives> : ''} 
            </Wrapper>
        </>
    )
}

export default Gameboards;