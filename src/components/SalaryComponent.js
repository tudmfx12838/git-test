import React, { Component } from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';


function RenderSalary({staff}){
    return(
        // <Card className="bg-light">
        //         <CardTitle>{staff.name}</CardTitle>
        //         <div className="p-2">
        //             <CardText className="text-left">Mã nhân viên: {staff.id}</CardText>
        //             <CardText className="text-left">Hệ số lương: {staff.salaryScale}</CardText>
        //             <CardText className="text-left">Số giờ làm thêm: {staff.overTime}</CardText>
        //             <Card>
        //                 <CardText className="text-left">Lương: {staff.salary}usd</CardText>
        //             </Card>
        //         </div>
        //         <CardImg src={staff.image} alt={staff.name}/>
        // </Card>
        <Media className="border p-3 bg-warning">
                <Media body>
                    <Media heading>{staff.name}</Media>
                    <div className="p-3">
                        <p>--Mã nhân viên: {staff.id}</p>
                        <p>--Hệ số lương: {staff.salaryScale}</p>
                        <p>--Số giờ làm thêm: {staff.overTime}</p>
                        <div className="border align-bottom mt-5 pt-3 pl-4">
                            <p>Lương: {staff.salary}usd</p>
                        </div> 
                    </div> 
                </Media>
                <Media object src={staff.image} className="mt-2 mr-2 rounded-circle" width="80px"/>
        </Media>
    );
} 

//function Salary(props)/({staffs})
//const Salary = () => {}
class Salary extends Component{
    constructor({props}){
        super(props);

        this.state={
            selectedSort: 0,
        };
        //  this.handleChange = this.handleChange.bind(this);
    }

    
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    
        switch(parseInt(selectedOption.value)){
            case 0:
                this.setState({selectedSort: 0});
                break;
            case 1:
                this.setState({selectedSort: 1});
                break;
            case 2:
                this.setState({selectedSort: 2});
                break;
            case 3:
                this.setState({selectedSort: 3});
                break;
            default:
                break;
        }
    }

    render(){
        var salary = [];
        switch(this.state.selectedSort){
            case 0:
                salary = this.props.staffs.map((staff) => {
                    return(
                        <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
                            <RenderSalary staff={staff}/>
                        </div>
                    );
                });
                break;
            case 1:
                salary = this.props.staffs.map((staff) => {
                    return(
                        <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
                            <RenderSalary staff={staff}/>
                        </div>
                    );
                }).reverse();
                break;
            case 2:
                var mimToMaxSalary = [];
                for(let i=0; i < this.props.staffs.length ;i++){
                    mimToMaxSalary[i] = this.props.staffs[i].salary;
                }   
                mimToMaxSalary.sort(function(a, b){return a-b});
                
                for(let i = 0; i < mimToMaxSalary.length ;i++){
                    salary[i] = this.props.staffs.map((staff) => {
                        if(staff.salary==mimToMaxSalary[i]){
                            return(
                                <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
                                    <RenderSalary staff={staff}/>
                                </div>
                            );
                        }
                    });                    
                }
                break;
            case 3:
                var mimToMaxSalary = [];
                for(let i=0; i < this.props.staffs.length ;i++){
                    mimToMaxSalary[i] = this.props.staffs[i].salary;
                }   
                mimToMaxSalary.sort(function(a, b){return b-a});
                
                for(let i = 0; i < mimToMaxSalary.length ;i++){
                    salary[i] = this.props.staffs.map((staff) => {
                        if(staff.salary==mimToMaxSalary[i]){
                            return(
                                <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
                                    <RenderSalary staff={staff}/>
                                </div>
                            );
                        }
                    });                    
                }
                break;
            default:
                break;
        }
        
        const options = [
            { value: '0', label: 'Sắp xếp theo thứ tự nhân viên (thuận)' },
            { value: '1', label: 'Sắp xếp theo thứ tự nhân viên (nghịch)' },
            { value: '2', label: 'Sắp xếp theo lương tăng dần' },
            { value: '3', label: 'Sắp xếp theo lương giảm dần'}
        ];
        const { selectedOption } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Bảng Lương</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className ="col-12 col-sm-6 col-md-4 mt-2">
                    <Select
                        placeholder  ="Chọn sắp xếp nhân viên"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
                    </div>
                </div>

                <div className="row">
                        {salary}
                </div>
            </div>
        );
    }
}
export default Salary;