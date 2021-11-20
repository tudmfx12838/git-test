import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse,Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            isNavOpen: false
        }
        
        this.togglesNav = this.togglesNav.bind(this);
    }

    togglesNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render(){
        return(
            <React.Fragment>
            <Navbar dark expand="md">
                <div className="container">
                {/* NavbarToggler show list button when the srceen size is following <Navbar dark expand="md"> (sm,lg..) */}
                <NavbarToggler onClick={this.togglesNav}/>
                <NavbarBrand className="mr-auto" href="/">
                    <img src="asset/images/logo.png" height="30" width="41" alt="Ristorante Con Fustion"/>
                </NavbarBrand>
                {/* Collapse hide and show by dropdowing, following <Navbar dark expand="md"> (sm,lg..) */}
                {/* if isNavOpen is true, show Nav 
                if is isNavOpen is false, hide Nav*/}
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/staff">
                                <span className="fa fa-users fa-lg"></span>Nhân Viên
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/department">
                                <span className="fa fa-id-card-o fa-lg"></span>Phòng Ban
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/salary">
                                <span className="fa fa-money fa-lg"></span>Bảng Lương
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-address-card fa-lg"></span>Liên hệ
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;