import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponet';
import Contact from './ContactComponet';
import Footer from './FooterComponent';
import Menu  from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { LEADERS } from './shared/leaders';
import { PROMOTIONS } from './shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
 
    }
  }

  render(){
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    return (
      <React.Fragment>
          <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
              {/* <Route exact path="/contactus" component={() => <Contact/>}/> */}
              <Route exact path="/contactus" component={Contact}/>
              <Redirect to="/home" />{/* if not map above, it's alway to redirect */}
            </Switch>
          <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
