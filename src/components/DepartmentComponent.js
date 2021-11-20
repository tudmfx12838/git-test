import React from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, CardBlock } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderDepartment({departments}){
    const department = departments.map((department) => {
        return(

                <div key={department.id} className="col-12 col-md-6 col-lg-4 my-1">
                    <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>

                        <div className="border p-3 bg-warning">
                            <Link to={`/department/${department.id}`}>
                                <h2>{department.name}</h2>
                                <p  className="text-center">Số lượng nhân viên: {department.numberOfStaff}</p>
                            </Link>
                        </div>
                        
                    </FadeTransform>
                </div>
            
        );
    });

    return department;
} 

//function Department(props)/({staffs})
const Department = (props) => {

    var department;
    if(props.departmentsLoading){
        department = <Loading />;
    }else if(props.departmentsErrMess){
        department = <h4>{props.departmentsErrMess}</h4>;
    }else{
        department = <RenderDepartment departments={props.departments}/>;
    }

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