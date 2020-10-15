/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, Modal, Table, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Icoprofile from '../../common/images/ico_profile.png';
import BarScan from '../../common/images/bar_scan.jpg';
import AddMyService from '../../common/images/myservice-add.png';
import ServiceCheck from '../../common/images/accounts/service_checkbox.png';
import cookie from 'react-cookies';
import GeneralUser from '../../common/images/accounts/generaluser.png';
import GeneralPro from '../../common/images/accounts/genpro.png';
import GeneralAgent from '../../common/images/accounts/genagent.png';
import GeneralRun from '../../common/images/accounts/genrun.png';
import GeneralRedeem from '../../common/images/accounts/genredeem.png';
import ModalPopup from '../Layout/ModalPopup';
import GenPro_Content from '../Layout/GenPro';
import GenAgent_Content from '../Layout/GenAgent';
import GenRun_Content from '../Layout/GenRun';
import GenRedeem_Content from '../Layout/GenRedeem';
import Profilebar from './Profilebar';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { GET_CUSTOMERLEADS } from '../../actions';

class Genagentcustomerleads extends Component {

 constructor(props) {
    super(props);
    this.state = {
        modalGenpro: false,
        modalGenAgent: false,
        modalGenRun: false,
        modalGenRedeem: false,
        loadMorebut: 'Load More',
        loadMorebutton: 1,
        defaultLimit: 4,
        loadmoreBut:0,

      }
        this.toggleGenpro = this.toggleGenpro.bind(this);
        this.toggleGenAgent = this.toggleGenAgent.bind(this);
        this.toggleGenRun = this.toggleGenRun.bind(this);
        this.toggleGenRedeem = this.toggleGenRedeem.bind(this);
        this.props.getCustomerLeads(cookie.load('UserAuthToken'));

  }

  toggleGenpro() {
    this.setState(prevState => ({
      modalGenpro: !prevState.modalGenpro
    }));
  }	
   toggleGenAgent() {
    this.setState(prevState => ({
      modalGenAgent: !prevState.modalGenAgent
    }));
  }
   toggleGenRun() {
    this.setState(prevState => ({
      modalGenRun: !prevState.modalGenRun
    }));
  }
   toggleGenRedeem() {
    this.setState(prevState => ({
      modalGenRedeem: !prevState.modalGenRedeem
    }));
  }

 componentDidMount(){
    if(!cookie.load('login_user_type') && !cookie.load('UserAuthToken')){
            window.location.href = "/logout";

    }
}
componentWillReceiveProps(Props) {
    if(Object.keys(Props.leaddata).length > 0){
        if(Props.leaddata[0]['status'] === 'success'){
            this.setState({
                leaddata: Props.leaddata[0]['result_set'],
                loadMorebut: 'Load More',
                totalrecords: Props.leaddata[0].total_records,
            });
            if(this.state.defaultLimit > Props.leaddata[0].total_records && this.state.loadmoreBut == 0) {
                this.setState({loadMorebutton: 2});
            }else{
                this.setState({loadMorebutton: 1});
            }
        }
    }
}

proleadlist(){
    var leaddata = this.props.leaddata[0];
     if(leaddata!='undefined' && leaddata!=null){
      if(leaddata.status == 'success')  { 
         if(Object.keys(leaddata).length > 0) {
                const leadinfoDetails = leaddata.result_set.map((leadlist, walltinfoIndex) => {
                                if(leadlist.sg_job_status == '0'){
                                var jobstatus = 'Requested';
                                }else if(leadlist.sg_job_status == '1'){
                                var jobstatus = 'Confirmed';
                                }else if(leadlist.sg_job_status == '2'){
                                var jobstatus = 'Completed';
                                }else if(leadlist.sg_job_status == '3'){
                                var jobstatus = 'Rejected';
                                }else if(leadlist.sg_job_status == '4'){
                                var jobstatus = 'No Longer';
                                }

                               var requestedDate =  moment(leadlist.sg_created_on, "YYYYMMDD").fromNow();
                               return (
                                        <tr key={leadlist.sg_job_id}>
                                            <td>
                                            <span class="gen-table-sp-img"><img src={GeneralRedeem} alt="" /></span> <span class="gen-table-sp-txt">
                                            <ButtonToolbar>
                                            {['top'].map(placement => (
                                            <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                            {leadlist.customer_name}
                                            </Tooltip>
                                            }
                                            >
                                            <Button variant="secondary">{leadlist.customer_name}</Button>
                                            </OverlayTrigger>
                                            ))}
                                            </ButtonToolbar>
                                            </span>
                                            </td>
                                            <td>{leadlist.services_title}</td>
                                            <td>{leadlist.sg_transaction_no}</td>
                                            <td>{requestedDate}</td>
                                             <td>{jobstatus}</td>
                                        </tr>
                                      );
                                });
                          return leadinfoDetails;
         }
      }else{
        return false;
      }
  }
}
render() {
        let loadMorebutton = '';
        
        if(this.state.loadMorebutton == 1){
            
            loadMorebutton =  <div className="gen-table-footer">
                                              <a href="javascript:void(0);" class="btn btn_orange btn_minwid btn-width animate-btn2" title="Button">{this.state.loadMorebut}</a>   
                                        </div>
        }else{
            loadMorebutton = '';
        }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <div>
            <Header />
            <Profilebar />
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <div className="sdmenu_tab">
                            <ul className="sdmenu_list">
                                <li>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_general_info"></i></a>
                                   <Link to={"/edit-general-info"} title="GenUser" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_general_info"></i>
                                        <b>GenUser</b>                                        
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn"><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genpro"></i></a>
                                   <Link to={"/edit-gen-pro"} title="Genpro" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genpro"></i>
                                        <b>GenPro</b> 
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenpro}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className="enable">
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genrun"></i></a>
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>                      
                                    </a>
                                   <span className="sdmenu_list_right">
                                        <span className="sdm_enable_txt">Enable</span>                  
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRun}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className="enable active">
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genagent"></i></a>
                                    <a href="#" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenProperty</b>   
                                    </a>
                                   <span className="sdmenu_list_right">
                                        <span className="sdm_enable_txt">Enable</span>                                     
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenAgent}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className="enable">
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genredeem"></i></a>
                                    <a href="#" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genredeem"></i>
                                        <b>GenAds</b>         
                                    </a>
                                   <span className="sdmenu_list_right">
                                        <span className="sdm_enable_txt">Enable</span>                               
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRedeem}><i className="fa fa-question"></i></a>
                                   </span>
                                </li>
                            </ul>
                        </div>
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                            
								<ul className="sdhmenu_tablist">
                                    <li>
                                         <Link to={"/edit-gen-agent"} title="GenAgent Details">Details</Link>
                                    </li>
                                    <li>
                                         <Link to={"/genagent-manage-property"} title="Manage Property">Manage Property</Link>
                                    </li>
                                    <li className="active">
                                        <Link to={"/genagent-customer-leads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genagent-jobs"} title="Jobs">Jobs</Link>
                                    </li>
                                     <li>
                                        <Link to={"/genagent-reports"} title="Reports">Reports</Link>
                                    </li>
                                </ul>
                                
                                <Link to={"/edit-gen-agent"} className="sdhmenu_mtabtrigger" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-manage-property"} className="sdhmenu_mtabtrigger" title="GenRun Details">Manage Property <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-customer-leads"} className="sdhmenu_mtabtrigger active" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">
                                    <div className="gen-table-wrapper">
                                        <div className="gen-table-header">
                                            <h3>Customer Leads</h3>
                                            <div className="gen-table-sort">
                                                <label>Sort By:</label>
                                                <div className="re_select">
                                                    <Select  options={options} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="gen-table-body">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Service Provider</th>
                                                        <th>Services</th>
                                                        <th>Transaction No</th>
                                                        <th>Requested Date</th>
                                                        <th>Job Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  {this.proleadlist()} 
                                                </tbody>
                                            </Table>
                                        </div>
                                       {loadMorebutton}
                                    </div>
                                </div>
                                <Link to={"/genagent-jobs"} className="sdhmenu_mtabtrigger" title="GenRun Details">Jobs <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-reports"} className="sdhmenu_mtabtrigger" title="GenRun Details">Reports <i className="fa fa-angle-down"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 

            <ModalPopup modal={this.state.modalGenpro} toggle={this.toggleGenpro} className="modal-width Genpro_popup Gen_popup" title="How Genpro works?" >				
                <GenPro_Content />				
            </ModalPopup>	  

            <ModalPopup modal={this.state.modalGenAgent} toggle={this.toggleGenAgent} className="modal-width GenAgent_popup Gen_popup" title="How GenProperty works?" >					
                <GenAgent_Content />		
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRun} toggle={this.toggleGenRun} className="modal-width GenRun_popup Gen_popup" title="How GenRun works?" >	
                <GenRun_Content /> 
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRedeem} toggle={this.toggleGenRedeem} className="modal-width GenRedeem_popup Gen_popup" title="How GenAds works?" >
                <GenRedeem_Content />
            </ModalPopup>	


        </div>
    );
}
}

const mapStateTopProps = (state) => {
  return {
      leaddata: state.customerleads,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getCustomerLeads: (UserToken) => {
          dispatch({ type: GET_CUSTOMERLEADS, UserToken });
        },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Genagentcustomerleads));
