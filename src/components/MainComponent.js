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

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {
  
  constructor(props){
    super(props);

  }

  getNewStaff(newStaff){
    // alert("invoked")
    // alert(JSON.stringify(newStaff));

    //Add newStaff to database, but if page reload, it'll be removed.
    this.props.staffs.push(newStaff);
    //STAFFS.push(newStaff);
  }

  render(){
    const StaffWithId = ({match}) => {
      return(
        <StaffDetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}/>      
      );
    }

    return (
      <React.Fragment>
          <Header />
          <Switch>
            {/* Adding exact that mean when render more links with the same path of head Ex: /staff/1 /staff/2....*/}
            <Route exact path="/staff" component={()=><StaffList staffs={this.props.staffs} departments={this.props.departments} addStaff={(value)=>this.getNewStaff(value)}/>}/>
            {/* In case not adding exact, Although render more links /staff/1 /staff/2...., It's alway to /staff*/}
            <Route path="/department" component={()=><Department departments={this.props.departments}/>}/>
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

export default withRouter(connect(mapStateToProps)(Main));
