// import logo from './logo.svg';
import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
//import { Component } from 'react/cjs/react.production.min';
import { BrowserRouter } from 'react-router-dom';

// function App() {

class App extends Component {
  

  render(){
    return (
      <BrowserRouter>
        <div>
            <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;