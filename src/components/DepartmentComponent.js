import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDepartment({department}){
    return(
        <Card className="bg-light container-fluid">
                <CardTitle>{department.name}</CardTitle>
                <CardText className="text-left">Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Card>
    );
} 

//function Department(props)/({staffs})
const Department = ({departments}) => {
    const department = departments.map((department) => {
        return(
            <div key={department.id} className="col-12 col-md-6 col-lg-4 my-1">
                <RenderDepartment department={department}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Phòng Ban</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                    {department}
            </div>
        </div>
    );
}
export default Department;