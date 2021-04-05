// import Grid from '../components/Grid';
import GameBoard from '../factories/GameBoard';
import Player from '../factories/Player';
import Header from '../components/Header';
function Board() {

    const playerBoard = GameBoard()
    const computerBoard = GameBoard()

    const player = Player('Gemma', playerBoard)
    const computer = Player('Computer', computerBoard)
    console.log(playerBoard.getBoard())
    const playerName = player.getName()
    const computerName = computer.getName()

    return (
      <div className="App">
        <Header/>
        <div>
            <h3>{playerName}</h3>
            <p>hello</p>
            {/* <Grid props={playerBoard}/> */}
        </div>
        <div>
            <h3>{computerName}</h3>  
            {/* <Grid props={computerBoard}/> */}
        </div>
      </div>
    );
  }
  
  export default Board;
  