import React, { Component, useState } from "react";
import { Button, Input, Row, Col, Form, Label, FormGroup } from 'reactstrap';

class RenderInputFeatures extends Component{
    constructor(props){
        super(props);
        this.handlesSubmit = this.handlesSubmit.bind(this);
    }

    handlesSubmit(event){
        alert(JSON.stringify(this.username.value));
        this.props.addInput(this.username.value);
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                <Form onSubmit={this.handlesSubmit}>
                    <Row>
                        <Col>
                            <Label htmlFor="username">Input</Label>
                        </Col>
                        <Col>
                        <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input}/>
                        </Col>
                        <Col>
                        <Button type="submit" value="Submit" color="success">Login</Button>
                        </Col>
                    </Row>  
                </Form>
            </React.Fragment>
        )
    }
}

const RenderView = ({practicestate}) => {
    const temp = practicestate.map((tmp)=>{
        return(
            <div key={tmp.id}>
                {tmp}
            </div>
        )
    });
    return(
        <React.Fragment>
            {/* {practicestate} */}
            {temp}
        </React.Fragment>
    )
}

const Practice = (props) => {
    
    return(
        <div className="container">
            <div className="row">
                <RenderInputFeatures addInput={props.addInput}/>
            </div>
            <div className="row">
                <RenderView practicestate={props.practicestate}/>
            </div>
        </div>
    )
}

export default Practice;