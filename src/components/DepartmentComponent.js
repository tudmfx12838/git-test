import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDepartment({department}){
    return(
        <div className="border p-3 bg-warning">
            <h2>{department.name}</h2>
            <p  className="text-center">Số lượng nhân viên: {department.numberOfStaff}</p>
        </div>
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