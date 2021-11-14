/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Modal, ModalHeader, ModalBody, Label, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
        console.log("Current State is: " + JSON.stringify(value));
        alert("Current State is: " + JSON.stringify(value));
        
        //
        // this.props.addComment(this.props.dishId, value.rating, value.author, value.comment);

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
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label forHTML="yourname">Rating</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        className="form-control"
                                        placeholder="Your name"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label forHTML="comment">Rating</Label>
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
        const comment = props.comments.map((commentElement)=>{
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
                        <Card>
                            <CardTitle>Comments</CardTitle>
                            {comment}
                        </Card>
                        <br/>
                        <CommentForm/>
                        {/* <CommentForm addComment={props.addComment} dishId={props.dish.id}/> */}
                    </div>
                </div>
            </div>
        );
    }else{
        return(<div></div>);
    }
}

export default DishDetail;