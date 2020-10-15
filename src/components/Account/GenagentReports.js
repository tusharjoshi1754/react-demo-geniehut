/* eslint-disable */
import React, { Component } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Profilebar from './Profilebar';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import ModalPopup from '../Layout/ModalPopup';
import GenPro from '../Layout/GenPro';
import GenAgent from '../Layout/GenAgent';
import GenRun from '../Layout/GenRun';
import GenRedeem from '../Layout/GenRedeem';
import GenProEnable from '../Account/GenProEnable';
class GenagentReports extends Component {
constructor(props) {
    super(props);
    this.state = {
      activegc:'enable',
      activegp:'enable',
      activega:'active enable',
      activegr:'enable',
      activegrd:'enable',
      selectedOptions:null,
      user_token: cookie.load('UserAuthToken'),
      serviceslist:[],
      selectedservices:[],
      progressperc: '',
        modalGenpro: false,
        modalGenAgent: false,
        modalGenRun: false,
        modalGenRedeem: false


    }
    this.toggleGenproEnable = this.toggleGenproEnable.bind(this);
    this.toggleGenrunEnable = this.toggleGenrunEnable.bind(this);
        this.toggleGenpro = this.toggleGenpro.bind(this);
        this.toggleGenAgent = this.toggleGenAgent.bind(this);
        this.toggleGenRun = this.toggleGenRun.bind(this);
        this.toggleGenRedeem = this.toggleGenRedeem.bind(this);

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
    
    toggleGenproEnable() {
    this.setState(prevState => ({
      modalGenproEnable: !prevState.modalGenproEnable,
      enablevalue: 'GP'
     }));
   }
   toggleGenrunEnable(){
    this.setState(prevState => ({
      modalGenrunEnable: !prevState.modalGenrunEnable,
      enablevalue: 'GR'
     }));
   }
  
render() {
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
                                 <li className={this.state.activegp}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genpro"></i></a>
                                   <Link to={this.state.activegp?"/edit-gen-run":"/edit-gen-pro"} title="Genpro" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genpro"></i>
                                        <b>GenPro</b> 
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        {this.state.activegp?<span className="sdm_enable_txt"><a href="javascript:void(0);" onClick={this.toggleGenproEnable}>Enable</a></span>:''}                                       
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenpro}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                               <li className={this.state.activegr}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genrun"></i></a>
                                   <Link to={"/edit-gen-run"} title="GenRun" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>        
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        {this.state.activegr==='active'?'':<span className="sdm_enable_txt">Enable</span>}                      
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRun}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className={this.state.activega}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genagent"></i></a>
                                    <a href="#" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenProperty</b>   
                                    </a>
                                   <span className="sdmenu_list_right">
                                        {this.state.activega?<span className="sdm_enable_txt">Enable</span>:''}                                   <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenAgent}><i className="fa fa-question"></i></a>
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
                                    <li>
                                        <Link to={"/genagent-customer-leads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genagent-jobs"} title="Jobs">Jobs</Link>
                                    </li>
                                     <li className="active">
                                        <Link to={"/genagent-reports"} title="Reports">Reports</Link>
                                    </li>
                                </ul>

                                <Link to={"/edit-gen-agent"} className="sdhmenu_mtabtrigger" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-manage-property"} className="sdhmenu_mtabtrigger" title="GenRun Details">Manage Property <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-customer-leads"} className="sdhmenu_mtabtrigger" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-jobs"} className="sdhmenu_mtabtrigger" title="GenRun Details">Jobs <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-reports"} className="sdhmenu_mtabtrigger active" title="GenRun Details">Reports <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">                                    
                                    <div className="GenTab_header">
                                        <h3>Reports</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPopup modal={this.state.modalGenproEnable} toggle={this.toggleGenproEnable} className="modal-width Genpro_popup enable_popup" title="Update GenPro?" >            
            <GenProEnable enablevalue={this.state.enablevalue} usertoken={cookie.load('UserAuthToken')}/>     
            </ModalPopup>

            <ModalPopup modal={this.state.modalGenrunEnable} toggle={this.toggleGenrunEnable} className="modal-width GenRun_popup enable_popup" title="Update GenRun?" >             
            <GenProEnable enablevalue={this.state.enablevalue} usertoken={cookie.load('UserAuthToken')}/>     
            </ModalPopup>
            <Footer />
            
            
            <ModalPopup modal={this.state.modalGenpro} toggle={this.toggleGenpro} className="modal-width Genpro_popup Gen_popup" title="How Genpro works?" >				
                <GenPro />				
            </ModalPopup>	  

            <ModalPopup modal={this.state.modalGenAgent} toggle={this.toggleGenAgent} className="modal-width GenAgent_popup Gen_popup" title="How GenProperty works?" >					
                <GenAgent />		
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRun} toggle={this.toggleGenRun} className="modal-width GenRun_popup Gen_popup" title="How GenRun works?" >	
                <GenRun /> 
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRedeem} toggle={this.toggleGenRedeem} className="modal-width GenRedeem_popup Gen_popup" title="How GenAds works?" >
                <GenRedeem />
            </ModalPopup>	

            
            <div className="genie-msg-popup-wrapper">
            <div className="genie-msg-popup-inner-wrapper">
                <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                  <div className="genie-msg-popup-body">
                </div>
                 <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
            </div>
        </div>
        </div>
    );
}
}

export default GenagentReports;