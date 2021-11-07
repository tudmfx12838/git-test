import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component {
    constructor(props){
        super(props);
        this.state={
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        //Kiem tra xem co phai input type checkbox thi tra ve checked, con cac loai type khac thi tra ve value
        //const value = target.value;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //setSate theo name cua input
        this.setState({
            [name] : value
        });
    }

    handleSubmit(event){
        console.log("Current State is: " + JSON.stringify(this.state));
        alert("Current State is: " + JSON.stringify(this.state));
        
        event.preventDefault();//ngan khong cho nhay toi new page
    }

    // Truyen param dang field onBlur={this.handleBlur('email')} co cap ngoac ' '
    handleBlur = (field) => (event) =>{
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(firstname, lastname, telnum, email){
       const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }

        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if(this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if(this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if(this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';


        const reg = /^\d+$/;
        if(this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';
        else if(this.state.touched.telnum && telnum.length > 11)
            errors.lastname = 'Tel. Number should be <= 10 numbers';

       // const reg1 = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
       if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        return errors;
    }

    render(){
        const error = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Send us your feedback</h3>
                        </div>
                        <div className="col-12 col-md-9">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="firstname" md={3}>First Name</Label>
                                    <Col md={9}>
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            value={this.state.firstname}
                                            valid={error.firstname === ''}
                                            invalid={error.firstname !== ''}
                                            onBlur={this.handleBlur('firstname')}
                                            onChange={this.handleInputChange}
                                            />
                                        <FormFeedback>{error.firstname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="lastname" md={3}>Last Name</Label>
                                    <Col md={9}>
                                        <Input type="text" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            value={this.state.lastname}
                                            valid={error.lastname === ''}
                                            invalid={error.lastname !== ''}
                                            onBlur={this.handleBlur('lastname')}
                                            onChange={this.handleInputChange}
                                            />
                                        <FormFeedback>{error.lastname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="telnum" md={3}>Contact Tel.</Label>
                                    <Col md={9}>
                                        <Input type="tel" id="telnum" name="telnum"
                                            placeholder="Tel. Number"
                                            value={this.state.telnum}
                                            valid={error.telnum === ''}
                                            invalid={error.telnum !== ''}
                                            onBlur={this.handleBlur('telnum')}
                                            onChange={this.handleInputChange}
                                            />
                                        <FormFeedback>{error.telnum}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={3}>Email</Label>
                                    <Col md={9}>
                                        <Input type="email" id="email" name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            valid={error.email === ''}
                                            invalid={error.email !== ''}
                                            onBlur={this.handleBlur('email')}
                                            onChange={this.handleInputChange}
                                            />
                                        <FormFeedback>{error.email}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size:6, offset:2}}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name ="agree"
                                                    checked={this.state.agree}
                                                    onChange={this.handleInputChange}
                                                />{' '} <strong>May we contact you?</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={{size:3, offset:1}}>
                                        <Input type="select" name="contactType"
                                                value={this.state.contactType}
                                                onChange={this.handleInputChange}>
                                                <option>Tel.</option>
                                                <option>Email</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="feedback" md={3}>Your Feedback</Label>
                                    <Col md={9}>
                                        <Input type="textarea" id="message" name="message"
                                            rows="12"
                                            value={this.state.message}
                                            onChange={this.handleInputChange}
                                            />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size:10, offset:5}}>
                                        <Button typye="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;