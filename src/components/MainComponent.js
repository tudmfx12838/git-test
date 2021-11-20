import React, {Component} from 'react';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import Header from './HeaderComponet';
import Contact from './ContactComponet';
import Footer from './FooterComponent';
import DepartmentDetail from './DepartmentDetailComponent';
// import { STAFFS, DEPARTMENTS } from '../shared/staffs';

//withRouter cau hinh ket noi React voi Redux
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchStaffs, fetchDepartments, fetchStaffsSalary, postStaff, fetchDeleteStaff, putStaff } from '../redux/ActionCreators';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
  fetchDeleteStaff: (staffId) => {dispatch(fetchDeleteStaff(staffId))},
  postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)),
  putStaff: (staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => dispatch(putStaff(staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary))
});

class Main extends Component {
  
  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();

    // for(let id = 14; id <= 32; id++)
    // fetch('https://rjs101xbackend.herokuapp.com/staffs/' + id, {
    //   method: 'DELETE',
    //   })
    //   .then(res => res.text()) // or res.json()
    //   .then(res => console.log(res))
  }

  // getNewStaff(newStaff){
  //   // alert("invoked")
  //   // alert(JSON.stringify(newStaff));
  //   //Add newStaff to database, but if page reload, it'll be removed.
  //   this.props.staffs.push(newStaff);
  //   //STAFFS.push(newStaff);
  // }

  render(){
    const StaffWithId = ({match}) => {
      // alert("invoked StaffDetail ");
      return(
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                      departments={this.props.departments.departments}/>      
      );
    }

    const DepartmentWithId = ({match}) => {
      // alert("invoked DepartmentWithId ");
      // alert(match.params.departmentId);
      // alert(this.props.departments.departments.filter((department) => department.id === parseInt(match.params.departmentId,10))[0]);
      return(
        <DepartmentDetail department={this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0]}
                          staffs={this.props.staffs.staffs}/>      
      );
    }

    return (
      <React.Fragment>
          <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                {/* Adding exact that mean when render more links with the same path of head Ex: /staff/1 /staff/2....*/}
                <Route exact path="/staff" component={()=><StaffList staffs={this.props.staffs.staffs} 
                                                                    staffsLoading={this.props.staffs.isLoading}
                                                                    staffsErrMess={this.props.staffs.errmess}
                                                                    departments={this.props.departments.departments} 
                                                                    postStaff={this.props.postStaff}
                                                                    putStaff={this.props.putStaff}
                                                                    fetchDeleteStaff={this.props.fetchDeleteStaff}
                                                                    //  addStaff={(value)=>this.getNewStaff(value)}
                                                                    />}/>
                {/* In case not adding exact, Although render more links /staff/1 /staff/2...., It's alway to /staff*/}
                <Route exact path="/department" component={()=><Department departments={this.props.departments.departments}
                                                                departmentsLoading={this.props.departments.isLoading}
                                                                departmentsErrMess={this.props.departments.errmess}
                                                                />}/>
                                                                    
                <Route path="/salary" component={()=><Salary staffs={this.props.staffsSalary.staffsSalary}
                                                            staffsSalaryLoading={this.props.staffsSalary.isLoading}
                                                            staffsSalaryErrMess={this.props.staffsSalary.errmess}
                                                            />}/>

                <Route path="/staff/:staffId" component={StaffWithId}/>
                <Route path="/department/:departmentId" component={DepartmentWithId}/>

                {/* <Route exact path="/contactus" component={() => <Contact/>}/> */}
                <Route exact path="/contactus" component={Contact}/>
                <Redirect to="/staff" />{/* if not map above links, it's alway to redirect*/}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
