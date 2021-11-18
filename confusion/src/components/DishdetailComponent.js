/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Modal, ModalHeader, ModalBody, Label, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{   
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
            // rating: null,
            // yourname: '',
            // comment: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(value){
        // console.log("Current State is: " + JSON.stringify(value));
        // alert("Current State is: " + JSON.stringify(value));

        this.props.postComment(this.props.dishId, value.rating, value.author, value.comment);

        this.setState({
            isModalOpen: !this.state.isModalOpen //false to close Modal
        });
    }

    render(){
        return(
            <React.Fragment>
                <Button outline type="button" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <div className="container">
                                <Row className="form-group">
                                    <Label forHTML="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        defaultValue={1}
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label forHTML="author">Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        placeholder="Your name"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label forHTML="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows="6"
                                    />
                                </Row>
                                <Row className = "form-group">
                                        {/* <Col md={{size:10, offset:0}}> */}
                                            <Button typye="submit" color="success">
                                                Submit
                                            </Button>
                                        {/* </Col> */}
                                </Row>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


function RenderDish({dish}) {
    return(
        <FadeTransform in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function RenderComments({comments, postComment, dishId}) {
    const comment = comments.map((comment)=>{
        return(
            <Stagger in>
                    <div key={comment.id}>
                        <Fade in>
                                <CardText>{comment.comment} <br></br>
                                    --{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    {/* {dateFormat(comment.date, "dd/mm/yyyy")} */}
                                </CardText>
                            <br></br>
                        </Fade>
                    </div>
            </Stagger>
        );
    });
    return (
        <React.Fragment>
            <Card>
                <CardTitle>Comments</CardTitle>           
                    {comment}
            </Card>
            <br/>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </React.Fragment>
     
    );
};


const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }else{
        return(<div></div>);
    }
}

export default DishDetail;