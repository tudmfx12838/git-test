import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText,Breadcrumb, BreadcrumbItem } from "reactstrap";

const RenderDepartmentDetail = ({department, staffs}) => {
    var departmentStaff = staffs.map((staff) => {
        if(staff.departmentId === department.id){
            return(
                <div className="col-6 col-md-4 col-lg-2 my-1">
                    <Card className="bg-warning">
                        <Link to={`/staff/${staff.id}`}>
                            <CardImg src={staff.image} alt={staff.name} className="mr-5"/>
                            <CardText className="text-center"><b>{staff.name}</b></CardText>
                        </Link>
                    </Card>
                </div>
            );
        }
    });

    return departmentStaff;
}

const DepartmentDetail = ({department, staffs}) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/department">Phòng Ban</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{department.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{department.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDepartmentDetail department={department}
                                        staffs={staffs} />
            </div>
        </div>
    );
}

export default DepartmentDetail;