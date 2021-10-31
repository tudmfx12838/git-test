import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu  from './components/MenuComponent';
import { DISHES } from './components/shared/dishes';
import './App.css';
import { Component } from 'react/cjs/react.production.min';

// function App() {

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES
    }
  }

  render(){
    return (
      <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">
                  Ristorante Con Fustion
              </NavbarBrand>
            </div>
          </Navbar>
          <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}

export default App;
