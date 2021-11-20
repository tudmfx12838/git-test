import React, { Component, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row, Modal, ModalBody, ModalHeader, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const minVar= (len) => (val) => val && (val >= len);
const maxVar = (len) => (val) => val && (val <= len);
const isNumber = (val) => !isNaN(Number(val));

function RenderStaff({staff}){
    return(
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card className="bg-warning">
                <Link to={`/staff/${staff.id}`}>
                    <CardImg src={staff.image} alt={staff.name} className="mr-5"/>
                    <CardText className="text-center"><b>{staff.name}</b></CardText>
                </Link>
            </Card>
        </FadeTransform>
    );
} 


//function StaffList(props)/({staffs})
const StaffList = (props) => {

const [isSearching, setisSearching] = useState(false);
const [searchedKeyWord, setsearchedKeyWord] = useState('');
const [isModalOpen, setisModalOpen] = useState(false);
const [isSelecting, setisSelecting] = useState(false);
const [selectOrDelete, setselectOrDelete] = useState({type: 'Chọn', color:'primary'});
// const [newStaffs, setNewStaffs] = useState([]);

var search;
var select = [];
// var selectOrDeleteButton = 'Chọn';

// const fetchNewData = ()=>{
//     return fetch(baseUrl + 'staffs')
//         .then(respone => {
//             if(respone.ok){
//                 return respone;
//             }else{
//                 var error = new Error('Error' + respone.status + ' : ' + respone.statusText);
//                 error.respone = respone;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
        
//         .then(respone => respone.json())
//         .then(staffs => setNewStaffs(staffs))
// }

function handleSelect(event){
    setisSelecting(!isSelecting);
    if(isSelecting){
        setselectOrDelete({type: 'Chọn', color:'primary'})

        for(let id=0; id < select.length; id++){
            if(select[id].checked){
                // fetch('https://rjs101xbackend.herokuapp.com/staffs/' + select[id].name, {
                //   method: 'DELETE',
                //   })
                //   .then(res => res.text()) // or res.json()
                //   .then(res => console.log(res))
                props.fetchDeleteStaff(select[id].name);
            }
        }
    }else{
        setselectOrDelete({type: 'Xóa', color:'danger'})
    }
}

function getSelectedStaff(event){
    // for(let i=0; i<select.length; i++){
    //     alert(select[i].name);}
}

function handleSearch(event){
    // alert("value: " + search.name);
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
    setisSearching(false);
    setsearchedKeyWord('');
    //console.log("Current State is: " + JSON.stringify(value));
    setisModalOpen(!isModalOpen);


    // postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)
    const department = props.departments.find((department) => department.name == value.department);
    const image = '/asset/images/alberto.png';
    props.postStaff(value.name, value.doB, value.salaryScale, value.startDate, department.id,
                         value.annualLeave, value.overTime, image ,value.salary);
    // fetchNewData()                     
    
}

// useEffect(() => {
//   fetchNewData()
// }, [])


        var staff;
        if(props.staffsLoading){
            staff = <Loading />;
        }else if(props.staffsErrMess){
            staff = <h4>{props.staffsErrMess}</h4>;
        }else{

            if(isSearching){
                // staff = newStaffs&&newStaffs
                // staff = props.staffs.map((staff) =>
                staff = props.staffs.map((staff) =>
                 {
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
            }else if(isSelecting){
                staff = props.staffs.map((staff)=> {
                    return(
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                            <Input type="checkbox" id={staff.id} name={staff.id} 
                                innerRef={(check) => select[select.length] = (check)} onChange={getSelectedStaff}/>
                            <RenderStaff staff={staff}/>
                        </div>
                    );
                });
            }else{ 
                // staff = newStaffs&&newStaffs
                //staff = props.staffs.map((staff)
                staff = props.staffs.map((staff)=> {
                    return(
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                            <RenderStaff staff={staff}/>
                        </div>
                    );
                });
            }
        }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-3">
                    <h3>Nhân Viên</h3>
                </div>
                <div className="col-3 col-md-2 mt-1">
                    <Button type="button" onClick={toggleModal}>
                        <span  className="fa fa-plus-square"></span>
                    </Button>
                </div>
                <div className="col-3 col-md-2 mt-1">
                    <Button type="button" color={selectOrDelete.color} onClick={handleSelect}>
                        {selectOrDelete.type}
                    </Button>
                </div>
                <div className="col-12 col-md-5 mt-1">
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
                <div className="col-12 col-md-12 col-lg-12">
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
                                        required, isNumber, minVar: minVar(1.0), maxVar: maxVar(3.0)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập ',
                                        isNumber: "Yêu cầu nhập số ",
                                        minVar: "Yêu cầu nhập số từ 1.0 -> 3.0 ",
                                        maxVar: "Yêu cầu nhập số từ 1.0 -> 3.0 "
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