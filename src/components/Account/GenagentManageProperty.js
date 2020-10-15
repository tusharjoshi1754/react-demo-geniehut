/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Genprotabs from './Genprotabs';
import Icoprofile from '../../common/images/ico_profile.png';
import QnMarkDefault from '../../common/images/qn_mark_default.png';
import Profilebar from './Profilebar';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { appName } from "../Config/Config";
import SuccessMsg from '../../common/images/success-msg.png';
import ModalPopup from '../Layout/ModalPopup';
import GenPro_Content from '../Layout/GenPro';
import GenAgent_Content from '../Layout/GenAgent';
import GenRun_Content from '../Layout/GenRun';
import GenRedeem_Content from '../Layout/GenRedeem';
import EditProperty_Content from '../Layout/EditProperty';
import DetailProperty_Content from '../Layout/DetailProperty';
import AddProperty_Content from '../Layout/AddProperty';

import ManagePropImg from '../../common/images/ManageProp_img.jpeg';

import GenProEnable from '../Account/GenProEnable';

import { GET_REQUESTSERVICE, GET_GENRUNPROFILE, GET_SELECTRUNSERVICE } from '../../actions';

class GenagentManageProperty extends Component {
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
        modalGenRedeem: false,
        modalEditProperty: false,
        modalDetailProperty: false,
        modalAddProperty: false


    }
        this.toggleGenpro = this.toggleGenpro.bind(this);
        this.toggleGenAgent = this.toggleGenAgent.bind(this);
        this.toggleGenRun = this.toggleGenRun.bind(this);
        this.toggleGenRedeem = this.toggleGenRedeem.bind(this);
        this.toggleEditProperty = this.toggleEditProperty.bind(this);
        this.toggleDetailProperty = this.toggleDetailProperty.bind(this);
        this.toggleAddProperty = this.toggleAddProperty.bind(this);

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
  toggleEditProperty() {
    this.setState(prevState => ({
      modalEditProperty: !prevState.modalEditProperty
    }));
  }	
  toggleDetailProperty() {
    this.setState(prevState => ({
      modalDetailProperty: !prevState.modalDetailProperty
    }));
  }	
  toggleAddProperty() {
    this.setState(prevState => ({
      modalAddProperty: !prevState.modalAddProperty
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
                                        {this.state.activegr=='active'?'':<span className="sdm_enable_txt">Enable</span>}                      
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
                                    <li className="active">
                                         <Link to={"/genagent-manage-property"} title="Manage Property">Manage Property</Link>
                                    </li>
                                    <li>
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
                                <Link to={"/genagent-manage-property"} className="sdhmenu_mtabtrigger active" title="GenRun Details">Manage Property <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">                                    
                                    <div className="GenagentManageProperty_wrapper">
                                        <div className="GenTab_header">
                                            <h3>Manage Property</h3>
                                            <div>
                                            <button className="btn btn_green animate-btn2 add_property" type="button" onClick={this.toggleAddProperty}>Add Property</button>
                                            <div className="gen-table-sort">
                                                <label>Sort By:</label>
                                                <div className="re_select">
                                                    <Select  options={options} />
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="GenagentManageProperty_inner_wrapper">
                                            <div className="GM_property_box">
                                                <div className="GM_property_img">
                                                   <a href="javascript:void(0);"><img src={ManagePropImg} alt="GM_property_img" /></a>
                                                </div>
                                                <div className="GM_property_location">
                                                  <div>
                                                    <h2 className="GM_property_title"><a href="javascript:void(0);">Sales property</a></h2>
                                                    <p className="GM_property_address">D14 Eunos / Geylang / Paya Lebar</p>
                                                  </div>
                                                </div>
                                                <div className="GM_property_details">
                                                    <p>2 Beds | Magnificent above 25th floor</p>
                                                </div>
                                                <div className="GM_property_rate">
                                                    <p><i className="fa fa-usd" aria-hidden="true"></i> 4,500,000</p>
                                                </div>
                                                <div className="GM_property_action">
                                                    <div className="GM_property_action_btn">
                                                        <a href="javascript:void(0);" className="view" onClick={this.toggleDetailProperty}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="edit" onClick={this.toggleEditProperty}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="GM_property_box">
                                                <div className="GM_property_img">
                                                   <a href="javascript:void(0);"><img src={ManagePropImg} alt="GM_property_img" /></a>
                                                </div>
                                                <div className="GM_property_location">
                                                  <div>
                                                    <h2 className="GM_property_title"><a href="javascript:void(0);">Sales property</a></h2>
                                                    <p className="GM_property_address">D14 Eunos / Geylang / Paya Lebar</p>
                                                  </div>
                                                </div>
                                                <div className="GM_property_details">
                                                    <p>2 Beds | Magnificent above 25th floor</p>
                                                </div>
                                                <div className="GM_property_rate">
                                                    <p><i className="fa fa-usd" aria-hidden="true"></i> 4,500,000</p>
                                                </div>
                                                <div className="GM_property_action">
                                                    <div className="GM_property_action_btn">
                                                        <a href="javascript:void(0);" className="view" onClick={this.toggleDetailProperty}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="edit" onClick={this.toggleEditProperty}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="GM_property_box">
                                                <div className="GM_property_img">
                                                   <a href="javascript:void(0);"><img src={ManagePropImg} alt="GM_property_img" /></a>
                                                </div>
                                                <div className="GM_property_location">
                                                  <div>
                                                    <h2 className="GM_property_title"><a href="javascript:void(0);">Sales property</a></h2>
                                                    <p className="GM_property_address">D14 Eunos / Geylang / Paya Lebar</p>
                                                  </div>
                                                </div>
                                                <div className="GM_property_details">
                                                    <p>2 Beds | Magnificent above 25th floor</p>
                                                </div>
                                                <div className="GM_property_rate">
                                                    <p><i className="fa fa-usd" aria-hidden="true"></i> 4,500,000</p>
                                                </div>
                                                <div className="GM_property_action">
                                                    <div className="GM_property_action_btn">
                                                        <a href="javascript:void(0);" className="view" onClick={this.toggleDetailProperty}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="edit" onClick={this.toggleEditProperty}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="GM_property_box">
                                                <div className="GM_property_img">
                                                   <a href="javascript:void(0);"><img src={ManagePropImg} alt="GM_property_img" /></a>
                                                </div>
                                                <div className="GM_property_location">
                                                  <div>
                                                    <h2 className="GM_property_title"><a href="javascript:void(0);">Sales property</a></h2>
                                                    <p className="GM_property_address">D14 Eunos / Geylang / Paya Lebar</p>
                                                  </div>
                                                </div>
                                                <div className="GM_property_details">
                                                    <p>2 Beds | Magnificent above 25th floor</p>
                                                </div>
                                                <div className="GM_property_rate">
                                                    <p><i className="fa fa-usd" aria-hidden="true"></i> 4,500,000</p>
                                                </div>
                                                <div className="GM_property_action">
                                                    <div className="GM_property_action_btn">
                                                        <a href="javascript:void(0);" className="view" onClick={this.toggleDetailProperty}><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="edit" onClick={this.toggleEditProperty}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                        <a href="javascript:void(0);" className="delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={"/genagent-customer-leads"} className="sdhmenu_mtabtrigger" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-jobs"} className="sdhmenu_mtabtrigger" title="GenRun Details">Jobs <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genagent-reports"} className="sdhmenu_mtabtrigger" title="GenRun Details">Reports <i className="fa fa-angle-down"></i></Link>
                                
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
            
            <ModalPopup modal={this.state.modalEditProperty} toggle={this.toggleEditProperty} className="modal-width EditDetailProperty_popup EditProperty_popup" title="Edit Property" >
                <EditProperty_Content />
            </ModalPopup>	
            <ModalPopup modal={this.state.modalDetailProperty} toggle={this.toggleDetailProperty} className="modal-width EditDetailProperty_popup DetailProperty_popup" title="Property Details" >
                <DetailProperty_Content />
            </ModalPopup>	
            <ModalPopup modal={this.state.modalAddProperty} toggle={this.toggleAddProperty} className="modal-width EditDetailProperty_popup DetailProperty_popup" title="Add Property" >
                <AddProperty_Content />
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

export default GenagentManageProperty;