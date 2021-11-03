import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({dish}) {
    return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>   
    );
}

function RenderComments({comments}) {
    return(
        <CardText>{comments.comment} <br></br>
        --{comments.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</CardText>
    );
};


const DishDetail = (props) => {
    if(props.dish != null){
        const comment = props.dish.comments.map((commentElement)=>{
            return(
                <div key={commentElement.id}>
                        <RenderComments comments={commentElement}/>
                    <br></br>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardTitle>Comments</CardTitle>
                            {comment}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }else{
        return(<div></div>);
    }
}

export default DishDetail;