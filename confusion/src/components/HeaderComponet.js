import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';
import React, { Component } from "react";

class Header extends Component{

    render(){
        return(
            <>
            <Navbar dark color="primary">
                <div className="container">
                <NavbarBrand href="/">
                    Ristorante Con Fustion
                </NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Con Fustion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            </>
        );
    }
}

export default Header;