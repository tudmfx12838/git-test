import React, {Component} from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Header from './HeaderComponet';
import Contact from './ContactComponet';
import Footer from './FooterComponent';
import Menu  from './MenuComponent';
import DishDetail from './DishdetailComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
//withRouter cau hinh ket noi React component voi Redux
import { connect } from 'react-redux';

//
import { addComment } from '../redux/ActionCreator';

//get state and returd state as parameter
const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {
  
  constructor(props){
    super(props);

  }

  render(){
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    // match is react-router's default param
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        
        //
        addComment={this.props.addComment}
        />
      );
    }

    return (
      <React.Fragment>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
            <Route path="/menu/:dishId" component={DishWithId}/>
            {/* <Route exact path="/contactus" component={() => <Contact/>}/> */}
            <Route exact path="/contactus" component={Contact}/>
            <Redirect to="/home" />{/* if not map above, it's alway to redirect */}
          </Switch>
          <Footer />
      </React.Fragment>
    );
  }
}
//cach ket component to react-router
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

