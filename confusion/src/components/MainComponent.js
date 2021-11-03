import { Navbar, NavbarBrand } from 'reactstrap';
import Menu  from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from './shared/dishes';
import { Component } from 'react/cjs/react.production.min';

// function App() {

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
      <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">
                  Ristorante Con Fustion
              </NavbarBrand>
            </div>
          </Navbar>
          <Menu dishes={this.state.dishes}
                onClick={(dishid) => this.onDishSelect(dishid)}
          />
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
      </div>
    );
  }
}

export default Main;
