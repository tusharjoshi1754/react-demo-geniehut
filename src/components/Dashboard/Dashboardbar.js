/* eslint-disable */
import React, { Component } from 'react';
import {Row, Col, ProgressBar, Modal, OverlayTrigger, ButtonToolbar, Tooltip, Button, Table} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import DashboardService from '../../common/images/Dashboard_Service.png';
import DashboardServiceActive from '../../common/images/Dashboard_Service_Active.png';
import DashboardServiceDisable from '../../common/images/Dashboard_Service_Disable.png';
import ReviewsDefault from '../../common/images/Review-Default.jpg';

import cookie from 'react-cookies';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

class Dashboardbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeclass: '',
        activegenpro: '',
        activegenrun:'',
        activegenagent:'',
        pathname:window.location.pathname,
        login_user_type:cookie.load('login_user_type'),

    };
 
  }
  componentDidMount(){
    if(this.state.pathname === '/dashboard'){
      this.setState({activeclass:'DLB_service_box DLBS_Active'})
    }
    else if(this.state.pathname === '/genpro-dashboard'){
      this.setState({activegenpro:'DLB_service_box DLBS_Active'})
    }
    else if(this.state.pathname === '/genrun-dashboard'){
      this.setState({activegenrun:'DLB_service_box DLBS_Active'})
    }
    else if(this.state.pathname === '/genagent-dashboard'){
      this.setState({activegenagent:'DLB_service_box DLBS_Active'})
    }
  }

  render() {
    return (
      <div>
         <div className="DLB_services_bar DLB_default">
                                               <div className="DLB_services_header">
                                                   <h2>Dashboard of Services</h2>
                                               </div>
                                               <div className="DLB_services_body">
                                                   <div className={this.state.activeclass?this.state.activeclass:'DLB_service_box'}>
                                                      <Link to={"/dashboard"} >
                                                       <div className="DLB_service_title">GenUser</div>
                                                       <div className="DLB_service_img"><img src={this.state.activeclass?DashboardServiceActive:DashboardService} alt="" /></div>
                                                      </Link>
                                                   </div>
                                                   <div className={this.state.activegenpro?this.state.activegenpro:'DLB_service_box DLBS_Disable'}>
                                                   <Link to={(this.state.login_user_type && this.state.login_user_type.indexOf('GP')>=0)?"#":"#"}>
                                                       <div className="DLB_service_title">GenPro</div>

                                                         {(this.state.login_user_type && this.state.login_user_type.indexOf('GP')>=0)? (
                                                                <div>
                                                                  {this.state.activegenpro
                                                                      ? (
                                                                     <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  ) : (
                                                                     <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  )}
                                                                </div>
                                                              ) : (
                                                                 <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                              )} 
                                                      </Link>
                                                   </div>

                                                   <div className={this.state.activegenrun?this.state.activegenrun:'DLB_service_box DLBS_Disable'}>
                                                    <Link to={(this.state.login_user_type && this.state.login_user_type.indexOf('GR')>=0)?"#":"#"}>
                                                       <div className="DLB_service_title">GenRun</div>

                                                        {(this.state.login_user_type && this.state.login_user_type.indexOf('GR')>=0)? (
                                                                <div>
                                                                  {this.state.activegenrun
                                                                      ? (
                                                                    <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  ) : (
                                                                    <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  )}
                                                                </div>
                                                              ) : (
                                                                 <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                              )} 
                                                      </Link>
                                                   </div>

                                                   <div className={this.state.activegenagent?this.state.activegenagent:'DLB_service_box DLBS_Disable'}>
                                                   <Link to={(this.state.login_user_type && this.state.login_user_type.indexOf('GA')>=0)?"#":"#"}>
                                                       <div className="DLB_service_title">GenProperty</div>
                                                        {(this.state.login_user_type && this.state.login_user_type.indexOf('GA')>=0)? (
                                                                <div>
                                                                  {this.state.activegenagent
                                                                      ? (
                                                                    <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  ) : (
                                                                    <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                                  )}
                                                                </div>
                                                              ) : (
                                                                 <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                              )} 
                                                      </Link>
                                                   </div>
                                                   <div className="DLB_service_box DLBS_Disable">
                                                     <Link to={(this.state.login_user_type && this.state.login_user_type.indexOf('GAD')>=0)?"#":"#"}>
                                                       <div className="DLB_service_title">GenAds</div>
                                                       <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                      </Link>
                                                   </div>
                                               </div>
</div>
      </div>
    );
  }
}
const mapStateTopProps = (state) => {
  return {
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Dashboardbar));
