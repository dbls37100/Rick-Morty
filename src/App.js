import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import Episodes from './components/Episodes/Episodes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App = (props) => {

  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/personnages" component={Home} />
        <Route exact path="/personnage/:id" component={Episodes}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
