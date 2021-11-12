import React, { Component } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row, Modal, ModalBody, ModalHeader, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
                department: this.props.departments.find((department) => department.name == 'Sale'),
                annualLeave: 0,
                overTime: 0,
                image: '/assets/images/alberto.png', 
                salary: 0, 
            },
            staffDepartment: 'Sale',
            staffListLength: this.props.staffs.length,

            touched: {
                name: false,
                doB: false,
                startDate: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
                salary: false
            }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddStaffChange = this.handleAddStaffChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    handleSearch(event){
        //alert("value: " + this.search.value);
        if(this.search.value){
            this.setState({
                searchedKeyWord: this.search.value.toUpperCase(),
                isSearching: true,  
            });
        }else{
            this.setState({
                searchedKeyWord: '',
                isSearching: false,  
            });
        }
        event.preventDefault();
    }

    toggleModal(event){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(event){
        // alert(this.props.staffs.length);
        // alert(JSON.stringify(this.state.newStaff));
        
       //callback to return to Main Component
        this.props.addStaff(this.state.newStaff);
        this.setState({
            newStaff: {
                id: '',
                name: '', 
                doB: '',
                salaryScale: 0,
                startDate: '',
                department: this.props.departments.find((department) => department.name == 'Sale'),
                annualLeave: 0,
                overTime: 0,
                image: '/assets/images/alberto.png', 
                salary: 0, 
            }, 
            isModalOpen: false,
        });
        event.preventDefault();
    }
    handleAddStaffChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        // alert(value);
        
        if(target.type=='select-one'){
            // alert(target.type);
            // alert(JSON.stringify(this.props.departments));
            const department = this.props.departments.find((department) => department.name == value);
            this.setState(prevState => ({
                newStaff: {                   // object that we want to update
                    ...prevState.newStaff,   // keep all other key-value pairs
                    department: department      // update the value of specific key
                }
            }))
            this.setState({
                staffDepartment: value
            });
        }else{
            this.setState(prevState => ({
                newStaff: {                   // object that we want to update
                    ...prevState.newStaff,  // keep all other key-value pairs
                    id: this.props.staffs.length,  
                    [name]: value      // update the value of specific key
                }
            }));
        }   
    }

     
    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }, // keep all other key-value pairs and update the value of specific key
        });
        
    }

    // handleClick(event){
    //     const target = event.target;
    //     const name = target.name;
    //     //alert(name);
    //     this.setState({
    //         newStaff: { ...this.state.newStaff, [name]: '1.0->3.0000' }
    //     });
    // }

    // handleClick = (field) => (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     var show;

    //     if(name=='salaryScale'){
    //         show = '1.0 -> 3.00000';
    //     }else if(name=='annualLeave'||name=='overTime'){
    //         show = '0.0';
    //     }else if(name=='salary'){
    //         show = '0usd'
    //     }

    //     //Dung field hay event cung dung duoc
    //     //Muc dich hieu bai nen dung tron ca 2
    //     this.setState({
    //         newStaff: { ...this.state.newStaff, [field] : show}
    //     });
        
    // }

    validate(name, doB, startDate, salaryScale, annualLeave, overTime, salary) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
            salary: ''
        };

        if(this.state.touched.name && name=='')
            errors.name = 'Yêu cầu nhập';
        else if (this.state.touched.name && name.length < 3)
            errors.name = 'Yêu cầu nhiền hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Yêu cầu ít hơn 30 ký tự';

        if (this.state.touched.doB && doB=='')
            errors.doB = 'Yêu cầu nhập';

        if (this.state.touched.startDate && startDate=='')
            errors.startDate = 'Yêu cầu nhập';

        if (this.state.touched.salaryScale && salaryScale=='')
            errors.salaryScale = 'Yêu cầu nhập (1.0 -> 3.0)';

        if (this.state.touched.annualLeave && annualLeave=='')
            errors.annualLeave = 'Yêu cầu nhập';
        
        if (this.state.touched.overTime && overTime=='')
            errors.overTime = 'Yêu cầu nhập';

        if (this.state.touched.salary && salary=='')
            errors.salary = 'Yêu cầu nhập';

        
        // const reg = /^\d+$/;
        // if (this.state.touched.telnum && !reg.test(telnum))
        //     errors.telnum = 'Tel. Number should contain only numbers';

        // if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
        //     errors.email = 'Email should contain a @';

        return errors;
    }


    render(){
        const errors = this.validate(this.state.newStaff.name, this.state.newStaff.doB, this.state.newStaff.startDate, this.state.newStaff.salaryScale, 
            this.state.newStaff.annualLeave, this.state.newStaff.overTime, this.state.newStaff.salary);

        var staff;
        if(this.state.isSearching){
            staff = this.props.staffs.map((staff) => {
                const temp = staff.name.toUpperCase();
                //Kiem tra co giong ten
                if(temp.endsWith(this.state.searchedKeyWord)){
                    return(
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                            <RenderStaff staff={staff}/>
                        </div>
                    );
                }//Kiem tra co giong ho
                else if(temp.startsWith(this.state.searchedKeyWord)){
                    return(
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                            <RenderStaff staff={staff}/>
                        </div>
                    );
                }
            });
        }else{
            staff = this.props.staffs.map((staff) => {
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
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row>
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Control.text model=".name" id="name" name="name"
                                        //placeholder="Nhập tên"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                        onChange={this.handleAddStaffChange}
                                        onBlur={this.handleBlur('name')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Control.date model=".doB" id="doB" name="doB"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        onChange={this.handleAddStaffChange} 
                                        onBlur={this.handleBlur('doB')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            <Row>
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Control.date model=".startDate" id="startDate" name="startDate"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        onChange={this.handleAddStaffChange} 
                                        onBlur={this.handleBlur('startDate')}
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
                            <Row>
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                {/* {{size: 3, offset: 1}} */}
                                <Col md={7}>
                                    <Control.select model=".department" name="department"
                                            className="form-control" >
                                            <option>Sale</option>
                                            <option>HR</option>
                                            <option>Marketing</option>
                                            <option>IT</option>
                                            <option>Finance</option>
                                    </Control.select>
                                   
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                        //placeholder="Nhập tên"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                        onChange={this.handleAddStaffChange}
                                        onBlur={this.handleBlur('salaryScale')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        //placeholder="Nhập tên"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                        onChange={this.handleAddStaffChange}
                                        onBlur={this.handleBlur('annualLeave')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        //placeholder="Nhập tên"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                        onChange={this.handleAddStaffChange}
                                        onBlur={this.handleBlur('overTime')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".overTime"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="salary" md={5}>Lương cơ bản</Label>
                                <Col md={7}>
                                    <Control.text model=".salary" id="salary" name="salary"
                                        //placeholder="Nhập tên"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                        onChange={this.handleAddStaffChange}
                                        onBlur={this.handleBlur('salary')}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salary"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>               
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
}

export default StaffList;