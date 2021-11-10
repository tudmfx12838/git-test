import React, { Component } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class SearchStaff extends Component{
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

    }

    handleSearch(event){
        alert("value: " + this.search.value);
        event.preventDefault();
    }

    render(){
        return(
            <Form onSubmit={this.handleSearch}>
                <FormGroup row>
                    <Col md={10}>
                        <Input type="text" id="search" name="search"
                            innerRef={(input) => this.search = input} placeholder="Nhập tên nhân viên cần tìm"/>
                    </Col>
                    <Col md={2}>
                        <Button  type="submit" value="submit" color="primary">
                            Tìm
                        </Button>
                    </Col>
            </FormGroup>
            </Form>
        );
    }
}


function RenderStaff({staff}){
    return(
        <Card className="bg-warning">
            <Link to={`/staff/${staff.id}`}>
                <CardImg src={staff.image} alt={staff.name} className="mr-5"/>
                <CardText className="text-center"><b>{staff.name}</b></CardText>
            </Link>
        </Card>
    );
} 


//function StaffList(props)/({staffs})
var temp = {};
const StaffList = ({staffs}) => {
    const staff = staffs.map((staff) => {
        return(
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                <RenderStaff staff={staff}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-3">
                    <h3>Nhân Viên</h3>
                </div>
                <div className="col-6 col-md-3 mt-1">
                    <Col>
                        <Button type="button">
                            <span  className="fa fa-plus-square"></span>
                        </Button>
                    </Col>
                </div>
                <div className="col-12 col-md-6 mt-1">
                    <SearchStaff/>
                </div>
            </div>
            <hr />
            <div className="row">
                    {staff}
            </div>

        </div>
    );
}
export default StaffList;