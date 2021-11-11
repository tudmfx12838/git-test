import React, { Component } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';


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
class StaffList extends Component{

    constructor(props){
        super(props);
        this.state={
            isSearching: false,
            searchedKeyWord: '',
            isModalOpen: false,
            newStaff: {
                id: '',
                name: '', 
                doB: '',
                salaryScale: 0,
                startDate: '',
                department: '',
                annualLeave: 0,
                overTime: 0,
                image: '/assets/images/alberto.png', 
                salary: 0, 
            },
            staffListLength: this.props.staffs.length,
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddStaffChange = this.handleAddStaffChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch(event){
        //alert("value: " + this.search.value);
        this.setState({
            searchedKeyWord: this.search.value,
            isSearching: true,  
        });
        event.preventDefault();
    }

    toggleModal(event){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(event){
        // alert(this.props.staffs.length);
        // const department = DEPARTMENTS.find(department => department.id === this.state.department);
        // const newStaff = {

        //     id:this.props.staffs.length,
        //     name: this.state.fullname,
        //     doB: this.state.dob,
        //     salaryScale: this.state.salaryScale,
        //     startDate: this.state.startDate,
        //     department: department,
        //     annualLeave: this.state.annualLeave,
        //     overTime: this.state.overTime,
        //     image: '/assets/images/alberto.png',

        // };
        alert(JSON.stringify(this.state.newStaff));
 
        // this.props.staffs[this.props.staffs.length]=this.state.newStaff;
        // this.setState({
        //     newStaff: {
        //         id: '',
        //         name: '', 
        //         doB: '',
        //         salaryScale: 0,
        //         startDate: '',
        //         department: '',
        //         annualLeave: 0,
        //         overTime: 0,
        //         image: '/assets/images/alberto.png', 
        //         salary: 0, 
        //     },
        // });
        event.preventDefault();
    }
    handleAddStaffChange(event){
        const target = event.target;
        const name = target.name;
        var value = target.value
        // value = 1;
        // alert(value);
        

        // value=='Sale'||value=='HR'||value=='Marketing'||value=='IT'||value=='Finance'
        if(target.type=='select-one'){
            // alert(target.type);
            // alert(JSON.stringify(this.props.departments));
            // this.setState(prevState => ({
            //     newStaff: {                   // object that we want to update
            //         ...prevState.newStaff, 
            //         id: this.props.staffs.length,  // keep all other key-value pairs
            //         [name]: department      // update the value of specific key
            //     }
            // }))
            const department = this.props.departments.find((department) => department.name == value);
            value = department;
        }

        this.setState(prevState => ({
            newStaff: {                   // object that we want to update
                ...prevState.newStaff, 
                id: this.props.staffs.length,  // keep all other key-value pairs
                [name]: value      // update the value of specific key
            }
        }))
        
    }


    render(){
        const staff = this.props.staffs.map((staff) => {
            if(this.state.isSearching){
                //Logic Altholigm in here



                //reder searching result in here
                return(
                    <div><h1>{this.state.searchedKeyWord}</h1></div>
                );
            }else{ 
                return(
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                        <RenderStaff staff={staff}/>
                    </div>
                );
            }
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-3">
                        <h3>Nhân Viên</h3>
                    </div>
                    <div className="col-6 col-md-3 mt-1">
                        <Button type="button" onClick={this.toggleModal}>
                            <span  className="fa fa-plus-square"></span>
                        </Button>
                    </div>
                    <div className="col-12 col-md-6 mt-1">
                        {/* <SearchStaff/> }*/}
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
                    </div>
                </div>
                <hr />
                <div className="row">
                        {staff}
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                <ModalBody>
                    <div className="col-12 col-md-12 col-lg-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Nhập tên"
                                        value={this.state.newStaff.name}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Input type="date" id="doB" name="doB"
                                        value={this.state.newStaff.doB}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Input type="date" id="startDate" name="startDate"
                                        value={this.state.newStaff.startDate}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                {/* {{size: 3, offset: 1}} */}
                                <Col md={7}>
                                    <Input type="select" id="department" name="department"
                                            value={this.state.newStaff.department}
                                            onChange={this.handleAddStaffChange} 
                                            >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Input type="salaryScale" id="salaryScale" name="salaryScale"
                                        placeholder="0"
                                        value={this.state.newStaff.salaryScale}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Input type="annualLeave" id="annualLeave" name="annualLeave"
                                        placeholder="0"
                                        value={this.state.newStaff.annualLeave}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Input type="overTime" id="overTime" name="overTime"
                                        placeholder="0"
                                        value={this.state.newStaff.overTime}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salary" md={5}>Lương cơ bản</Label>
                                <Col md={7}>
                                    <Input type="salary" id="salary" name="salary"
                                        placeholder="0"
                                        value={this.state.newStaff.salary}
                                        onChange={this.handleAddStaffChange} 
                                        />
                                </Col>
                            </FormGroup>
                            <FormGroup row>               
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default StaffList;