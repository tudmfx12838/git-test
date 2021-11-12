import React, { Component } from 'react';
import dateFormat from 'dateformat';
// import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label, Col, Row, Modal, ModalBody, ModalHeader, FormFeedback } from 'reactstrap';
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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Nhập tên"
                                        value={this.state.newStaff.name}
                                        onChange={this.handleAddStaffChange}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        />
                                    <FormFeedback>{errors.name}</FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Input type="date" id="doB" name="doB"
                                        value={this.state.newStaff.doB}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        />
                                    <FormFeedback>{errors.doB}</FormFeedback> 
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Input type="date" id="startDate" name="startDate"
                                        value={this.state.newStaff.startDate}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        />
                                    <FormFeedback>{errors.startDate}</FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                {/* {{size: 3, offset: 1}} */}
                                <Col md={7}>
                                    <Input type="select" id="department" name="department"
                                            value={this.state.staffDepartment}
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
                                    <Input type="text" id="salaryScale" name="salaryScale"
                                        // placeholder="1"
                                        value={this.state.newStaff.salaryScale}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        onBlur={this.handleBlur('salaryScale')}
                                        // onClick={this.handleClick}
                                        // mouseDown={this.handleClick('salaryScale')}
                                        />
                                    <FormFeedback>{errors.salaryScale}</FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Input type="text" id="annualLeave" name="annualLeave"
                                        // placeholder="0"
                                        value={this.state.newStaff.annualLeave}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.annualLeave === ''}
                                        invalid={errors.annualLeave !== ''}
                                        onBlur={this.handleBlur('annualLeave')}
                                        />
                                    <FormFeedback>{errors.annualLeave}</FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Input type="text" id="overTime" name="overTime"
                                        // placeholder="0"
                                        value={this.state.newStaff.overTime}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.overTime === ''}
                                        invalid={errors.overTime !== ''}
                                        onBlur={this.handleBlur('overTime')}
                                        />
                                    <FormFeedback>{errors.overTime}</FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salary" md={5}>Lương cơ bản</Label>
                                <Col md={7}>
                                    <Input type="text" id="salary" name="salary"
                                        placeholder="0"
                                        value={this.state.newStaff.salary}
                                        onChange={this.handleAddStaffChange} 
                                        valid={errors.salary === ''}
                                        invalid={errors.salary !== ''}
                                        onBlur={this.handleBlur('salary')}
                                        />
                                    <FormFeedback>{errors.salary}</FormFeedback> 
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