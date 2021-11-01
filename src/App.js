// import logo from './logo.svg';
import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import MySelectLayout from './components/LayoutComponent';
import { STAFFS } from './shared/staffs';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        staffs: STAFFS
    };

  };

  render(){

    return (
      <div>

          <Navbar dark color="success">
            <div className="container">
              <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
            </div>
          </Navbar>
          {/* <MySelectLayout staffs={this.state.staffs}/> */}
          <StaffList staffs={this.state.staffs}/>

      </div>
    );
  }
}

export default App;
