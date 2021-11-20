import React, {Component} from 'react';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import Header from './HeaderComponet';
import Contact from './ContactComponet';
import Footer from './FooterComponent';
// import { STAFFS, DEPARTMENTS } from '../shared/staffs';

//withRouter cau hinh ket noi React voi Redux
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchStaffs, fetchDepartments } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())}
});

class Main extends Component {
  
  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDepartments();
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
      return(
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                      departments={this.props.departments.departments}/>      
      );
    }

    return (
      <React.Fragment>
          <Header />
          <Switch>
            {/* Adding exact that mean when render more links with the same path of head Ex: /staff/1 /staff/2....*/}
            <Route exact path="/staff" component={()=><StaffList staffs={this.props.staffs.staffs} 
                                                                 staffsLoading={this.props.staffs.isLoading}
                                                                 staffsErrMess={this.props.staffs.errmess}
                                                                 departments={this.props.departments.departments} addStaff={(value)=>this.getNewStaff(value)}/>}/>
            {/* In case not adding exact, Although render more links /staff/1 /staff/2...., It's alway to /staff*/}
            <Route path="/department" component={()=><Department departments={this.props.departments.departments}/>}/>
            <Route path="/salary" component={()=><Salary staffs={this.props.staffs}/>}/>
            <Route path="/staff/:staffId" component={StaffWithId}/>

            {/* <Route exact path="/contactus" component={() => <Contact/>}/> */}
            <Route exact path="/contactus" component={Contact}/>
            <Redirect to="/staff" />{/* if not map above links, it's alway to redirect*/}
          </Switch>
          <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
