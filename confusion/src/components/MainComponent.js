import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponet';
import Footer from './FooterComponent';
import Menu  from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from './shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
 
    }
  }

  render(){
    const HomePage = () => {
      return(
        <Home />
      )
    }
    return (
      <React.Fragment>
          <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
              <Redirect to="/home" />{/* if not map above, it's alway to redirect */}
            </Switch>
          <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
