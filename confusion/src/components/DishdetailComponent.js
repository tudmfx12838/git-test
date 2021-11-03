import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);

        console.log("DishDetail's constructor is invoked");       
    }

    renderDish(dish){
        if(dish != null){
            const comment = dish.comments.map((commentElement)=>{
                return(
                    <div key={commentElement.id}>
                        <CardText>{commentElement.comment}</CardText>
                        <CardText>--{commentElement.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentElement.date)))}</CardText>
                        {/* {commentElement.date} */}
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
        return(
            <div className="container">
                {this.renderDish(this.props.dish)}
            </div>

            );
    }
}

export default DishDetail;