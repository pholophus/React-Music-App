import React from 'react';
import Songlist from './Components/Songlist';
import Search from './Components/Search';
import Album from './Components/Album';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Artist from './Components/Artist';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Search></Search>
        <Switch>
          <Route path="/songlist/:q" component={Songlist}/>
          <Route path="/artist/:id" component={Artist}/>
          <Route path="/album/:id" component={Album}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
