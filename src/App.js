import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Game from './views/Game';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/game" exact component={Game} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
