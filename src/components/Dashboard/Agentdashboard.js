/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {Row, Col, ProgressBar, Modal, OverlayTrigger, ButtonToolbar, Tooltip, Button, Table} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import GenProEnable from '../Account/GenProEnable';
import Icoprofile from '../../common/images/ico_profile.png';
import BarScan from '../../common/images/bar_scan.jpg';
import QnMarkDefault from '../../common/images/qn_mark_default.png';
import DashboardService from '../../common/images/Dashboard_Service.png';
import DashboardServiceActive from '../../common/images/Dashboard_Service_Active.png';
import DashboardServiceDisable from '../../common/images/Dashboard_Service_Disable.png';
import ReviewsDefault from '../../common/images/Review-Default.jpg';
import cookie from 'react-cookies';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import DatePicker from "react-datepicker";
import AcocuntsFlag from '../../common/images/accounts/flag.png';
import "react-datepicker/dist/react-datepicker.css";
import SuccessMsg from '../../common/images/success-msg.png';
import ErrorMsg from '../../common/images/error-msg.png';
var QRCode = require('qrcode.react');
import { appName } from "../Config/Config";

import { GET_USERWALLETINFO } from '../../actions';


class Dashboard extends Component {
constructor(props) {
    super(props);
    this.state = {
      selectedvalue: ''
    };
    this.handleChange = this.handleChange.bind(this);
}
  
handleChange = selectedOption => {
      this.setState({ selectedvalue : selectedOption.value });
      if(selectedOption.value == 'credit'){
        var action = 'A';
      }else if(selectedOption.value == 'debit'){
        var action = 'S';
      }else{
        var ptsType = selectedOption.value;
      }
      var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "user_token" : cookie.load('UserAuthToken'),
      "action" : action,
      "pointtype" : ptsType,
      }
      this.props.getUserwalletInfo(qs.stringify(postObject));
};

componentDidMount(){
    if(!cookie.load('UserAuthToken')){
      window.location.href = "/logout";
    }
      var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "user_token" : cookie.load('UserAuthToken'),
      }
      this.props.getUserwalletInfo(qs.stringify(postObject));
}

render() {
    const options = [
        { value: 'all', label: 'All' },
        { value: 'credit', label: 'Credit' },
        { value: 'debit', label: 'Debit' },
        { value: 'ref', label: 'Referral' },
        { value: 'asktocall', label: 'Ask to call' },
        { value: 'topup', label: 'Topup' },
        { value: 'promotion', label: 'Promotion'},
      ];
    return (
        <div>
            <Header />
            <div className="wrapper_out wallet_wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper Dashboard_wrapper">
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                               <div className="Dashboard_box_wrapper">
                                   <div className="Dashboard_box_inner_wrapper">
                                       <div className="Dashboard_Leftbox">
                                           <div className="DLB_services_bar DLB_default">
                                               <div className="DLB_services_header">
                                                   <h2>Dashboard of Services</h2>
                                               </div>
                                               <div className="DLB_services_body">
                                                   <div className="DLB_service_box">
                                                      <Link to={"/dashboard"} >
                                                       <div className="DLB_service_title">GenUser</div>
                                                       <div className="DLB_service_img"><img src={DashboardService} alt="" /></div>
                                                      </Link>
                                                   </div>
                                                   <div className="DLB_service_box">
                                                      <Link to={"/genpro-dashboard"} >
                                                       <div className="DLB_service_title">GenPro</div>
                                                       <div className="DLB_service_img"><img src={DashboardService} alt="" /></div>
                                                      </Link>
                                                   </div>
                                                   <div className="DLB_service_box">
                                                      <Link to={"/genrun-dashboard"} >
                                                       <div className="DLB_service_title">GenRun</div>
                                                       <div className="DLB_service_img"><img src={DashboardService} alt="" /></div>
                                                      </Link>
                                                   </div>
                                                   <div className="DLB_service_box DLBS_Active">
                                                      <Link to={"/genagent-dashboard"} >
                                                       <div className="DLB_service_title">GenProperty</div>
                                                       <div className="DLB_service_img"><img src={DashboardServiceActive} alt="" /></div>
                                                      </Link>
                                                   </div>
                                                   <div className="DLB_service_box DLBS_Disable">
                                                      <Link to={"#"} >
                                                       <div className="DLB_service_title">GenAds</div>
                                                       <div className="DLB_service_img"><img src={DashboardServiceDisable} alt="" /></div>
                                                      </Link>
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="DLB_services_status_bar">
                                             <div className="DLB_status_inner">
                                                  <div className="DLB_services_status_wrap SS_bar_4">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of property list</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>500</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_3">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of transaction history</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>220</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_1">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of resales property list</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>50</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_9">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of rental property list</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>150</h3>
                                                      </div>
                                                  </div>
                                             </div>
                                           </div>
                                           <div className="DLB_table_bar DLB_default">
                                               <div className="DLB_services_header">
                                                   <h2>Property list</h2>
                                                   <a href="#" className="DLBS_header_link">View My Jobs</a>
                                               </div>
                                               <div className="DLB_jobs_table">
                                                   <div className="DLB_jobs_table_wrap">
                                                    <Table hover className="DLB_jobs_table">
                                                        <thead>
                                                            <tr>
                                                                <th>Properties Name</th>
                                                                <th>Property Type</th>
                                                                <th>Property Budget</th>
                                                                <th>Districts</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>16 Marine terrace</td>
                                                                <td>Sales</td>
                                                                <td><i className="fa fa-usd" aria-hidden="true"></i> 5,000,000</td>
                                                                <td>City hall/Clarke quay</td>
                                                            </tr>
                                                            <tr>
                                                                <td>16 Marine terrace</td>
                                                                <td>Sales</td>
                                                                <td><i className="fa fa-usd" aria-hidden="true"></i> 5,000,000</td>
                                                                <td>City hall/Clarke quay</td>
                                                            </tr>
                                                            <tr>
                                                                <td>16 Marine terrace</td>
                                                                <td>Sales</td>
                                                                <td><i className="fa fa-usd" aria-hidden="true"></i> 5,000,000</td>
                                                                <td>City hall/Clarke quay</td>
                                                            </tr>
                                                            <tr>
                                                                <td>16 Marine terrace</td>
                                                                <td>Sales</td>
                                                                <td><i className="fa fa-usd" aria-hidden="true"></i> 5,000,000</td>
                                                                <td>City hall/Clarke quay</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="Dashboard_Rightbox">
                                           <div className="Dash_wallet_box DRB_default">
                                               <h2>Wallet Points</h2>
                                               <p>Currently available in your account</p>
                                               <div className="Dash_point_wrap">
                                                   <h3>1500<small>GH points</small></h3>
                                               </div>
                                           </div>
                                           <div className="Dash_wallet_box DRB_default">
                                               <h2>GH points history</h2>
                                               <ul className="DRB_points_list">
                                                   <li><span className="DRB_points"><b>150</b> GH poinits added</span><span className="DRB_points_date">20/08/2019</span></li>
                                                   <li><span className="DRB_points"><b>300</b> GH poinits added</span><span className="DRB_points_date">24/08/2019</span></li>
                                                   <li><span className="DRB_points"><b>500</b> GH poinits added</span><span className="DRB_points_date">31/08/2019</span></li>
                                                   <li><span className="DRB_points"><b>100</b> GH poinits added</span><span className="DRB_points_date">02/09/2019</span></li>
                                                   <li><span className="DRB_points"><b>200</b> GH poinits added</span><span className="DRB_points_date">07/09/2019</span></li>
                                               </ul>
                                               <div className="DRB_link">
                                                   <a href="#">View All</a>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
}
const mapStateTopProps = (state) => {
  return {
      walletinfo: state.userwalletinfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserwalletInfo: (formPayload) => {
      dispatch({ type: GET_USERWALLETINFO, formPayload});
    },
    
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Dashboard));
