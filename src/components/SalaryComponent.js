import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock, Media } from 'reactstrap';
import { Link } from 'react-router-dom';


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
                        <div className="border align-bottom mt-5">
                            <p>Lương: {staff.salary}usd</p>
                        </div> 
                    </div> 
                </Media>
                <Media object src={staff.image} className="mt-3 mr-3 rounded-circle" width="80px"/>
        </Media>

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