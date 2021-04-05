
import { Link } from 'react-router-dom';

function Game() {
    return (
      <div className="Game">
        <p>Test your tactics in a game of battleships</p>
        <Link to="/board" className="Play-Button link">Play Game</Link>
      </div>
    );
  }
  
  export default Game;