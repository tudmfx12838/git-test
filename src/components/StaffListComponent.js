import React, { Component, useState } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row, Modal, ModalBody, ModalHeader, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

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
const StaffList = (props) => {

const [isSearching, setisSearching] = useState(false);
const [searchedKeyWord, setsearchedKeyWord] = useState('');
const [isModalOpen, setisModalOpen] = useState(false);


// const [id, setid] = useState('');
// const [name, setname] = useState('');
// const [doB, setdoB] = useState('');
// const [salaryScale, setsalaryScale] = useState('');
// const [startDate, setstartDate] = useState('');
// const [department, setdepartment] = useState('');
// const [annualLeave, setannualLeave] = useState('');
// const [overTime, setoverTime] = useState('');
// const [salary, setsalary] = useState('');
// const [image, setimage] = useState('/assets/images/alberto.png');


var search;

function handleSearch(event){
    alert("value: " + search.value);
    if(search.value){
        setisSearching(true);
        setsearchedKeyWord(search.value.toUpperCase());
    }else{
        setisSearching(false);
        setsearchedKeyWord('');
    }
    event.preventDefault();
}

function toggleModal(event){
    setisModalOpen(!isModalOpen);
        // this.setState({
        //     isModalOpen: !this.state.isModalOpen
        // });
}

function handleSubmit(value){
    console.log("Current State is: " + JSON.stringify(value));
    alert("Current State is: " + JSON.stringify(value));
    setisModalOpen(!isModalOpen);
        
    //callback to return to Main Component
    //this.props.addStaff(this.state.newStaff);
    // event.preventDefault();
}

    var staff;
    if(isSearching){
        staff = props.staffs.map((staff) => {
            const temp = staff.name.toUpperCase();
            //Kiem tra co giong ten
            if(temp.endsWith(searchedKeyWord)){
                return(
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                        <RenderStaff staff={staff}/>
                    </div>
                );
            }//Kiem tra co giong ho
            else if(temp.startsWith(searchedKeyWord)){
                return(
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                        <RenderStaff staff={staff}/>
                    </div>
                );
            }
        });
    }else{
        staff = props.staffs.map((staff) => {
            return(
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                    <RenderStaff staff={staff}/>
                </div>
            );
        });
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-3">
                    <h3>Nhân Viên</h3>
                </div>
                <div className="col-6 col-md-3 mt-1">
                    <Button type="button" onClick={toggleModal}>
                        <span  className="fa fa-plus-square"></span>
                    </Button>
                </div>
                <div className="col-12 col-md-6 mt-1">
                    {/* <SearchStaff/> }*/}
                    <Form onSubmit={handleSearch}>
                        <FormGroup row>
                            <Col md={10}>
                                <Input type="text" id="search" name="search"
                                    innerRef={(input) => search = input} placeholder="Nhập tên nhân viên cần tìm"/>
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
            
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Thêm nhân viên</ModalHeader>
            <ModalBody>
                <div className="col-12 col-md-12 col-lg-9">
                    <LocalForm onSubmit={(value) => {handleSubmit(value)}}>
                        <Row className = "form-group">
                            <Label htmlFor="name" md={5}>Tên</Label>
                            <Col md={7}>
                                <Control.text model=".name" id="name" name="name"
                                    defaultValue="Nhập tên"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(30)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        minLength: ' Yêu cầu nhiều hơn 2 ký tự',
                                        maxLength: ' Yêu cầu ít hơn 30 ký tự'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                            <Col md={7}>
                                <Control type="date" model=".doB" id="doB" name="doB"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}                                    
                                />
                                <Errors
                                    type="date"
                                    className="text-danger"
                                    model=".doB"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                    }}
                                />
                            </Col>                        
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                            <Col md={7}>
                                <Control type="date" model=".startDate" id="startDate" name="startDate"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".startDate"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="department" md={5}>Phòng ban</Label>
                            <Col md={7}>
                                <Control.select model=".department" name="department"
                                        className="form-control" 
                                        //defaultChecked='Sale'
                                        defaultValue='Sale'
                                        >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                </Control.select>
                                
                            </Col>
                        </Row>

                        <Row className = "form-group">
                            <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                            <Col md={7}>
                                <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                    defaultValue="1.0"
                                    className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: "Yêu cầu nhập số từ 1.0 -> 3.0"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                            <Col md={7}>
                                <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                    defaultValue="0.0"
                                    className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".annualLeave"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: "Yêu cầu nhập là số ngày"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                            <Col md={7}>
                                <Control.text model=".overTime" id="overTime" name="overTime"
                                    defaultValue="0.0"
                                    className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".overTime"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: "Yêu cầu nhập là số ngày"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="salary" md={5}>Lương cơ bản</Label>
                            <Col md={7}>
                                <Control.text model=".salary" id="salary" name="salary"
                                    defaultValue="0"
                                    className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salary"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: "Yêu cầu nhập là số lương"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">              
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Thêm
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </ModalBody>
            </Modal>
        </div>
    );
    
}

export default StaffList;