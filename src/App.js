import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
//import UserForm from './components/UserForm';
import CardGame from './components/CardGame';
import UserForm from './components/UserForm';
import UserForm_children from './components/UserForm_children';


class App extends Component {
  render() {
    return (
      <div className="App"> 
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={UserForm_children} /> 
            <Route exact={true} path="/2.0" component={UserForm} /> 
            <Route path="/card-game" component={CardGame} />
          </div> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
