import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderSalary({staff}){
    return(
        <Card className="bg-light container-fluid">
                <CardTitle>{staff.name}</CardTitle>
                <CardText className="text-left">Mã nhân viên: {staff.id}</CardText>
                <CardText className="text-left">Hệ số lương: {staff.salaryScale}</CardText>
                <CardText className="text-left">Số giờ làm thêm: {staff.overTime}</CardText>
                <Card>
                    <CardText className="text-left">Lương: {staff.salary}usd</CardText>
                </Card>
        </Card>
    );
} 

//function Department(props)/({staffs})
const Salary = ({staffs}) => {
    const department = staffs.map((staff) => {
        return(
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
                <RenderSalary staff={staff}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Bảng Lương</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                    {department}
            </div>
        </div>
    );
}
export default Salary;