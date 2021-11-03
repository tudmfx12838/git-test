import React, {Component} from 'react';
import Header from './HeaderComponet';
import Footer from './FooterComponent';
import Menu  from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from './shared/dishes';
// import { Component } from 'react/cjs/react.production.min';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }

  render(){
    return (
      // <div>
      <React.Fragment>
          <Header />
          <Menu dishes={this.state.dishes}
                onClick={(dishid) => this.onDishSelect(dishid)}
          />
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>

          <Footer />
      </React.Fragment>
      // </div>
    );
  }
}

export default Main;
