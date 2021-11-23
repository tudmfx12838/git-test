import React, { Component, useState } from "react";
import { Button } from 'reactstrap';

class RenderFeatures extends Component{

    render(){
        return(
            <React.Fragment>
                Hello
            </React.Fragment>
        )
    }
}

const RenderView = () => {
    return(
        <React.Fragment>
            Hi
        </React.Fragment>
    )
}

const Practice = (props) => {
    
    return(
        <div className="container">
            <div className="row">
                <RenderFeatures />
            </div>
            <div className="row">
                <RenderView />
            </div>
        </div>
    )
}

export default Practice;