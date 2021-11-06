import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff({staff}){
    return(
        <Card className="bg-light">
            <Link to={`/staff/${staff.id}`}>
                <CardImg src={staff.image} alt={staff.name}/>
                <CardText className="text-left"><b>{staff.name}</b></CardText>
            </Link>
        </Card>
    );
} 

//function StaffList(props)/({staffs})
const StaffList = ({staffs}) => {
    const staff = staffs.map((staff) => {
        return(
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                <RenderStaff staff={staff}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Nhân Viên</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                    {staff}
            </div>
        </div>
    );
}
export default StaffList;