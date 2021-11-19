/* eslint-disable no-useless-constructor */
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

//Import Action from ActionCreator.js
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreator';

//
import { actions } from 'react-redux-form';

//
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//get state and returd state as parameter
//Anh xa thanh props
const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
//Anh xa thanh props
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  //
  fetchComments: ()=>{dispatch(fetchComments())},
  fetchPromos: ()=>{dispatch(fetchPromos())},

  //actions.reset('feedback') nhung form co label, model la 'feedback' se bi reset
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  
  constructor(props){
    super(props);
  }
//ActionCreator.js
//   export const fetchDishes = () => (dispatch) => {
//     //Thunk se lam 2 viec
//     //1. Ktra dishes lam gi trong thoi ngan
//     dispatch(dishesLoading(true));
//     //2. sau do 2s se day dishes vao state cua store
//     setTimeout(()=>{
//         dispatch(addDishes(DISHES));
//     }, 2000);
// }
//su dung React life cycle khi mount xong thi goi fetchDishes
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}

        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}

        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    // match is react-router's default param
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}

        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}

        //Them comment
        postComment={this.props.postComment}
        />
      );
    }

    return (
      <React.Fragment>
          <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
                <Route path="/menu/:dishId" component={DishWithId}/>
                {/* <Route exact path="/contactus" component={() => <Contact/>}/> */}
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                <Redirect to="/home" />{/* if not map above, it's alway to redirect */}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
      </React.Fragment>
    );
  }
}
//cach ket component to react-router
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

