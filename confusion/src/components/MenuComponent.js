import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component{

    constructor(props){
        super(props); //init father's constructor
        
        this.state = {   
            selectedDish: null
        }
        console.log("constructor is invoked");       
    }

    componentDidMount(){
        console.log("componentDidMount is invoked");
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }

    renderDish(dish){
        if(dish != null){
            const comment = dish.comments.map((commentElement)=>{
                return(
                    <div key={commentElement.id}>
                        <CardText>{commentElement.comment}</CardText>
                        <CardText>--{commentElement.author}, {commentElement.date}</CardText>
                        <br></br>
                    </div>
                );
            });

            return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card >
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-5 m-1"> 
                    <CardTitle className="text-center">Comments</CardTitle>
                    {comment}
                </div>
            </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    render(){
        console.log("render is invoked"); 

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        //return view for component
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                
                {this.renderDish(this.state.selectedDish)}
                
            </div>
        );
    }
}

export default Menu;