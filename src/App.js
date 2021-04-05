import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom';
import './App.css';

import Board from './views/Board';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/board" exact component={Board} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
