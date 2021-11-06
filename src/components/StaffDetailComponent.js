import React from "react";
import dateFormat from 'dateformat';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff({staff}){
    return(
        <Media className="border p-1 bg-warning">
            <Media left>
                <Media object src={staff.image} width="100%" height="230" className="align-self-start mr-5" alt={staff.name}/>
            </Media>
            <Media body className="text-justify ml-3">
                <Media heading> Họ và tên: <i>{staff.name}</i></Media>
                <p> Ngày sinh: <i>{dateFormat(staff.doB, "dd/mm/yyyy")}</i></p>
                <p> Ngày vào công ty: <i>{dateFormat(staff.startDate, "dd/mm/yyyy")}</i></p>
                <p> Phòng ban: <i>{staff.department.name}</i></p>
                <p> Số ngày nghỉ còn lại: <i>{staff.annualLeave}</i></p>
                <p> Số ngày đã làm thêm: <i>{staff.overTime}</i></p>
            </Media>
        </Media>
    );
}

const StaffDetail = ({staff}) => {

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{staff.name}</h3>
                    <hr />
                </div>
            </div>
             <div className="row">
                <RenderStaff staff={staff}/>
             </div>
        </div>
    );
}

export default StaffDetail;