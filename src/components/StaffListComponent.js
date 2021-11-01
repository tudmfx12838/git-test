import React, { Component } from 'react';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';

class StaffList extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            selectedStaff: null,
            selectedOption: null,
            myLayout: "col-12 col-sm-6 col-md-4 mt-2"
        }

        // this.handleChange = this.handleChange.bind(this);
    }

    onStaffSelect(staff){
        this.setState({
            selectedStaff: staff
        });
    }

    renderStaffList(staff){
        if(staff != null){
            return(
                <div className="col-12 col-sm-6 col-md-4 mt-5">
                    <Card className="text-left bg-success text-white">
                        <CardTitle> Họ và tên: <i>{staff.name}</i></CardTitle>
                        <CardText> Ngày sinh: <i>{dateFormat(staff.doB, "dd/mm/yyyy")}</i></CardText>
                        <CardText> Ngày vào công ty: <i>{dateFormat(staff.startDate, "dd/mm/yyyy")}</i></CardText>
                        <CardText> Phòng ban: <i>{staff.department.name}</i></CardText>
                        <CardText> Số ngày nghỉ còn lại: <i>{staff.annualLeave}</i></CardText>
                        <CardText> Số ngày đã làm thêm: <i>{staff.overTime}</i></CardText>
                    </Card>
                </div>
            );
        }else{
            return(
                <div className={this.state.myLayout}>
                    <p>Bấm vào tên nhân viên để xem thông tin</p>
                </div>
            );
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

        switch(parseInt(selectedOption.value)){
            case 0:
                this.setState({myLayout: "col-12 col-sm-6 col-md-4 mt-2"});
                break;
            case 1:
                this.setState({myLayout: "col-12 col-sm-12 col-md-12 mt-2"});
                break;
            case 2:
                this.setState({myLayout: "col-12 col-sm-6 col-md-6 mt-2"});
                break;
            case 3:
                this.setState({myLayout: "col-12 col-sm-4 col-md-4 mt-2"});
                break;
            case 4:
                this.setState({myLayout: "col-12 col-sm-3 col-md-3 mt-2"});
                break;
            case 6:
                this.setState({myLayout: "col-12 col-sm-2 col-md-2 mt-2"});
                break;
            default:
                break;
        }
        // alert(this.state.myLayout + "  " + selectedOption.value);
    }

    renderSelectedColn(){

    }

    render(){
        const staff = this.props.staffs.map((staff) => {
            return(
                <div key={staff.id} className={this.state.myLayout}>
                    <Card className="bg-light" onClick={()=> this.onStaffSelect(staff)}>
                        <CardText className="text-left"><b>{staff.name}</b></CardText>
                    </Card>
                </div>
            );
        });

        const options = [
            { value: '0', label: 'default' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '6', label: '6' },
          ];
          const { selectedOption } = this.state;
        return(
            <div className="container">
                <div className ="col-12 col-sm-6 col-md-4 mt-2">
                <Select
                    placeholder  ="Chọn số cột hiển thị"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
 
            </div>
                <div className="row">
                    {staff}
                </div>
                <div className="row">
                    {this.renderStaffList(this.state.selectedStaff)}
                </div>
            </div>
            
        );
    }
}
export default StaffList;