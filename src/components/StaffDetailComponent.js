import React from "react";
import dateFormat from 'dateformat';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff({staff}){
    return(
        <Media>
            <Media left>
                <Media object src={staff.image} className="align-self-start mr-5" alt={staff.name}/>
            </Media>
            <Media body className="text-justify">
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
        <div className="Container">
             <div className="row">
                <RenderStaff staff={staff}/>
             </div>
        </div>
    );
}

export default StaffDetail;