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
import Dashboardbar from './Dashboardbar';
import cookie from 'react-cookies';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { appName } from "../Config/Config";
import { GET_PRODASHBOARD } from '../../actions';


class Dashboard extends Component {
constructor(props) {
    super(props);
    this.state = {
      jobs: '',
      leads:'',
      pending:'',
      cust_view:'',
      compare:'',
      user_points:'',
      walletInfoDetails:'',
      servicedetails:'',
      pendingJobs:'',
      totalrating:0,
      activegp:''
    };
    this.props.getProDashboard(cookie.load('UserAuthToken'))
    this.enableactive = this.enableactive.bind(this); 
}
  


componentDidMount(){
    if(!cookie.load('UserAuthToken')){
      window.location.href = "/login";
    }
    if(cookie.load('login_user_type')!=''){
      const numbers = cookie.load('login_user_type');
       const listItems = numbers.map((number) =>
              this.enableactive(number)
      );
   }
}

enableactive(number){
        
        if(number == 'GP'){
           this.setState({activegp: 'yes'})
        }
        
}

componentWillReceiveProps(Props) {
  if(Props.prodashboard !==this.props.prodashboard){
          if(Props.prodashboard[0].status == "success"){
            this.setState({jobs:Props.prodashboard[0].result_set.job_state.jobs})
            this.setState({leads:Props.prodashboard[0].result_set.job_state.leads})
            this.setState({pending:Props.prodashboard[0].result_set.job_state.pending})
            this.setState({cust_view: Props.prodashboard[0].result_set.pro_info.cust_view})
            this.setState({compare: Props.prodashboard[0].result_set.pro_info.compare})
            if(Props.prodashboard[0].userdetails!== null){
              this.setState({user_points: Props.prodashboard[0].userdetails.user_points})
            }
          }
          if(Props.prodashboard[0].walletinfo !== ''){
            this.getWalletinfo(Props.prodashboard[0].walletinfo)
          }
          if(Props.prodashboard[0].result_set.lead_res!==''){
            this.servicedetails(Props.prodashboard[0].result_set.lead_res)
          }
          if(Props.prodashboard[0].result_set.jobs!==''){
            this.pendingJobs(Props.prodashboard[0].result_set.jobs)
          }
     }
}
getWalletinfo(walletInfo){
  const walletInfodata = walletInfo;
    if(walletInfodata!== undefined && walletInfodata!== null){
      if(Object.keys(walletInfodata).length > 0) {
         const walletInfoDetails = walletInfodata.map((walletinfo, walletIndex) => {
             var text;
          if(walletinfo.points_action == 'A'){
            text = 'Added';
          }else{
            text = 'Used';
          }
            return (
                     <li key={walletinfo.points_id}><span className="DRB_points"><b>{Math.round(walletinfo.points_total)}</b> {text}</span><span className="DRB_points_date">{walletinfo.points_updated}</span></li>
                   );
    
       });
      this.setState({walletInfoDetails:walletInfoDetails});
     }
    } else {
      return false;
    }

}
pendingJobs(jobInfo){
  const jobInfodata = jobInfo;
    if(jobInfodata!== undefined && jobInfodata!== null){
      if(Object.keys(jobInfodata).length > 0) {
         const jobInfodataDetails = jobInfodata.map((jobInfo, jobIndex) => {
            return (
                     <li key={jobInfo.qcsd_id}><b>{jobInfo.customer_name}</b><span className="">{jobInfo.services_title}</span></li>
                   );
    
     });
      this.setState({pendingJobs:jobInfodataDetails});
     }
    } else {
      return false;
    }

}

servicedetails(serviceInfo){

    const serviceInfodata = serviceInfo;
   
    if(serviceInfodata!== undefined && serviceInfodata!== null){
		
      if(Object.keys(serviceInfodata).length > 0) {
		  
         const serviceInfo = serviceInfodata.map((serviceinfo, serviceIndex) => {

           var requestedDate =  moment(serviceinfo.sg_created_on, "YYYYMMDD").fromNow();
           let type = '';
            if(serviceinfo.sg_job_status == 0){
               type = 'Pending';
            }
            return (
                    <tr key={serviceinfo.sg_job_id}>  
                    <td>{serviceinfo.customer_name}</td>
                    <td>{serviceinfo.services_title}</td>
                    <td>{requestedDate} </td>
                    <td>{type}</td>
                      </tr>
                   );
    
     });
      this.setState({servicedetails:serviceInfo});
     }else{
		 const serviceInfo = <div className="table_notfound">No Customer leads found.</div>;
		 this.setState({servicedetails:serviceInfo});
	 }
    }

}

render() {
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
                                         <Dashboardbar />
                                           <div className="DLB_reviews_bar DLB_default">
                                              <div className="DLB_reviews_rating">
                                                  <span className="Grr_title">Review</span>
                                                  <span className="Grr_star"><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></span>
                                                  <span className="Grr_point">{this.state.totalrating!=0?this.state.totalrating:''}</span>
                                                  <span className="Grr_text">0 ratings and 0 reviews</span>
                                              </div>
                                           </div>
                                           <div className="DLB_services_status_bar">
                                             <div className="DLB_status_inner">
                                                  <div className="DLB_services_status_wrap SS_bar_5">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of Customer Leads</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>{this.state.leads}</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_6">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of Jobs</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>{this.state.jobs}</h3>
                                                      </div>
                                                  </div>
                                                 {/* <div className="DLB_services_status_wrap SS_bar_7">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of Profile Views</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>{this.state.cust_view}</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_8">
                                                      <div className="DLB_services_status_header">
                                                          <h2>No of Add to compare</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>{this.state.compare}</h3>
                                                      </div>
                                                  </div>*/}
                                                  <div className="DLB_services_status_wrap SS_bar_9">
                                                      <div className="DLB_services_status_header">
                                                          <h2>Pending Jobs</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                          <h3>{this.state.pending}</h3>
                                                      </div>
                                                  </div>
                                                  <div className="DLB_services_status_wrap SS_bar_white">
                                                      <div className="DLB_services_status_header">
                                                          <h2>Recent Jobs</h2>
                                                      </div>
                                                      <div className="DLB_services_count">
                                                           <ul className="">
                                                               {this.state.pendingJobs?this.state.pendingJobs:'No Recent Jobs Found'}
                                                             </ul>
                                                      </div>
                                                  </div>
                                             </div>
                                           </div>
                                           <div className="DLB_table_bar DLB_default">
                                               <div className="DLB_services_header">
                                                   <h2>All Projects</h2>
                                                   <a href={this.state.activegp?'/genpro-customer-leads':''} className="DLBS_header_link">View My Jobs</a>
                                               </div>
                                               <div className="DLB_jobs_table">
                                                   <div className="DLB_jobs_table_wrap">
                                                    <Table hover className="DLB_jobs_table">
                                                        <thead>
                                                            <tr>
                                                                <th>Service Provider</th>
                                                                <th>Services</th>
                                                                <th>Requested Date</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.servicedetails}
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
                                                   <h3>{Math.round(this.state.user_points)}<small>GH points</small></h3>
                                               </div>
                                           </div>
                                           <div className="Dash_wallet_box DRB_default">
                                               <h2>GH points history</h2>
                                               <ul className="DRB_points_list">
                                               {this.state.walletInfoDetails}
                                               </ul>
                                               <div className="DRB_link">
                                                   <a href="/wallet">View All</a>
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
    prodashboard: state.prodashboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProDashboard: (usertoken) => {
      dispatch({ type: GET_PRODASHBOARD, usertoken});
    },
    
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Dashboard));
