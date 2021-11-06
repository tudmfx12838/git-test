import React, {Component} from 'react';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import Header from './HeaderComponet';
import Contact from './ContactComponet';
import Footer from './FooterComponent';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    }
  }

  render(){

    const StaffWithId = ({match}) => {
      return(
        <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}/>      
      );
    }

    return (
      <React.Fragment>
          <Header />
          <Switch>
            {/* Adding exact that mean when render more links with the same path of head Ex: /staff/1 /staff/2*/}
            <Route exact path="/staff" component={()=><StaffList staffs={this.state.staffs} />}/>
            <Route path="/department" component={()=><Department departments={this.state.departments}/>}/>
            <Route path="/salary" component={()=><Salary staffs={this.state.staffs}/>}/>
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

export default Main;
