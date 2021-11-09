// import logo from './logo.svg';
import Main from './components/MainComponent';
import './App.css';
import { Component } from 'react/cjs/react.production.min';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

// function App() {
class App extends Component {
  

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
              <Main />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
