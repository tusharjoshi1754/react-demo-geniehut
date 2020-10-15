/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import Async from 'react-select/async';
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

import GenProEnable from '../Account/GenProEnable';

import { GET_REQUESTSERVICE, GET_GENRUNPROFILE, GET_SELECTRUNSERVICE } from '../../actions';

class Editgenagent extends Component {
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
    this.props.getRequestService();
    this.enableactive = this.enableactive.bind(this);
    this.toggleGenproEnable = this.toggleGenproEnable.bind(this);
    this.toggleGenrunEnable = this.toggleGenrunEnable.bind(this);
    this.setselectedvalue = this.setselectedvalue.bind(this);
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
  

  componentDidMount(){

    if(!cookie.load('UserAuthToken')){
      window.location.href = "/logout";
      }
     const numbers = cookie.load('login_user_type');
     const listItems = numbers.map((number) =>
            this.enableactive(number)
    );

     this.props.getSelectrunService(cookie.load('UserAuthToken'),'GR');
  }

  enableactive(number){
        if(number == 'GC'){
           this.setState({activegc: ''})
        }
        if(number == 'GP'){
           this.setState({activegp: ''})
        }
        if(number == 'GR'){
           this.setState({activegr: ''})
        }
        if(number == 'GA'){
           this.setState({activega: 'active'})
        }
        if(number == 'GRD'){
           this.setState({activegrd: ''})
        }
}

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    if(this.state.selectedOptions!=''){
      $('.errorservices').html('');
    }
  }

    handleFormSubmit = () => {
    if(this.validateForm()){
          const formPayload = this.state;
          const numbers = formPayload.selectedOptions;
          var elements=[];
          const listItems = numbers.map((number) =>
            elements.push(number.value)
          );
          var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_token": formPayload.user_token,
          "assign_code": 'GR',
          "genrun_services": elements,
          "gen_serv": formPayload.selectedOptions,
          };
          this.props.getGenrunProfile(qs.stringify(postObject));
    }
  }
  

   validateForm(){
    const {selectedOptions} = this.state;
    let errors = {};
    let formIsValid = true;
    if (selectedOptions == '' || selectedOptions == null) {
      formIsValid = false;
      $('.errorservices').html('<span class="errorspan">Please Select any one services</span>');
    }else if(selectedOptions!=''){
      $('.errorservices').html('');
    }
    $(".editprofile_submit").removeClass('loading loading_data');
    return formIsValid;
  }

   closepopup(){
      cookie.save('EnableGenAgent','No')
      
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      
    }

 componentWillReceiveProps(Props) {


 }

 setselectedvalue(selectsers){
    const selectedArray = selectsers.map ((serviceName, index) => ({
    id: index,
    name: serviceName,
    }));
    // Dynamically create select list
    let selectedseservices = [];
    selectedArray.map(item =>
    selectedseservices.push({ label: item.name.label, value: item.name.value }),
    );
    this.setState({selectedOptions : selectedseservices})
}

render() {
const serviceslist = this.state.serviceslist;

const serviceArray = this.state.serviceslist.map ((serviceName, index) => ({
  id: index,
  name: serviceName,
}));
// Dynamically create select list
let options = [];
serviceArray.map(item =>
  options.push({ label: item.name.label, value: item.name.value }),
);

if(cookie.load('EnableGenAgent') == 'yes'){
            $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>GenRun  Enabled Successfully</p> ');
  }

  const { selectedOptions } = this.state;
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
                                    <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_general_info"></i></a>
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
                                    <Link to={this.state.activegp?"#":"/edit-gen-pro"} title="Genpro" className="sdmenu_list_left">
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
                                    <Link to={this.state.activegr?"#":"/edit-gen-run"} title="GenRun" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>        
                                    </Link>
                                   <span className="sdmenu_list_right">
                                         {this.state.activegr?<span className="sdm_enable_txt"><a href="javascript:void(0);" onClick={this.toggleGenrunEnable}>Enable</a></span>:''}                               
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRun}><i className="fa fa-question"></i></a>
                                   </span>
                                </li>
                                 <li className={this.state.activega}>
                                    <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genagent"></i></a>
                                   <Link to={this.state.activega!='active'?"/edit-general-info":"/edit-gen-agent"} title="GenProperty" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenProperty</b>   
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        {this.state.activega!='active'?<span className="sdm_enable_txt">Enable</span>:''}
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenAgent}><i className="fa fa-question"></i></a>
                                   </span>
                                </li>
                                <li className="enable">
                                    <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genredeem"></i></a>
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
                                    <li className="active">
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
                                     <li>
                                        <Link to={"/genagent-reports"} title="Reports">Reports</Link>
                                    </li>
                                </ul>

                                <Link to={"/edit-gen-agent"} className="sdhmenu_mtabtrigger active" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">                                    
                                    <form className="form_sec">
                                        <div className="general-info-tab-wrapper mb20">
                                            <div className="general-info-header">
                                                <div className="general-info-header-inner">                                                
                                                    <div className="gfh-flexbox-2">
                                                        <div className="gfh-progress-wrapper">
                                                            <div className="gfh-progress-bar">
                                                                <div className="gfh-progress-percent"><span>0%</span><span>{this.state.progressperc} %</span></div>
                                                                <ProgressBar now={this.state.progressperc} />
                                                                <div className="gfh-progress-update"><p>Updated <span>{this.state.progressperc} %</span></p></div>
                                                            </div>
                                                            <p>Update GenAgent Profile detail 100% to get <span className="gfh-green">300 GH Points</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="profile-note-wrapper">
                                            <div className="profile-note-inner-wrapper">
                                                <p>Licensed real estate salesperson can post more than <span className="profile-note-green">1 resales</span> and <span className="profile-note-green">1 rental</span> property listing. Accept 99.co Realpost and we transfer your property listings over to GenAgent.</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={12}>
                                                    <label>Are you a licensed real estate salesperson?</label>
                                                              <div className="custom_radio">
                                                                <input type="radio" name="Yn" defaultChecked /> <span>Yes</span>
                                                              </div>
                                                              <div className="custom_radio">
                                                                <input type="radio" name="Yn" /> <span>No</span>
                                                              </div>
                                                    
                                                    
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <label>
                                                        License Number <span className="required">*</span>
                                                    </label>
                                                    <input type="text" className="form-control"  name="nric" onChange={this.handleInputChange} value={this.state.nric} autoComplete="off"/>
                                                </Col>
                                                <Col md={6}>
                                                    <label>
                                                        Agency Number 
                                                        <div className="tooltip_ico">
                                                            <ButtonToolbar>
                                                              {['top'].map(placement => (
                                                                <OverlayTrigger
                                                                  key={placement}
                                                                  placement={placement}
                                                                  overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                      Agency Number
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                </OverlayTrigger>
                                                              ))}
                                                            </ButtonToolbar>
                                                        </div>
                                                    </label>
                                                    <input type="text" className="form-control"  name="nric" onChange={this.handleInputChange} value={this.state.nric} autoComplete="off"/>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                   <p className="info-website mt0">GenProperty Services</p>
                                                    <div className="check-input-wrap ciw-row ciw-inbl">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox"  name="" />
                                                            <span>Disable
                                                            </span>
                                                            <div className="tooltip_ico">
                                                                <ButtonToolbar>
                                                                  {['right'].map(placement => (
                                                                    <OverlayTrigger
                                                                      key={placement}
                                                                      placement={placement}
                                                                      overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                          Disable
                                                                        </Tooltip>
                                                                      }
                                                                    >
                                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                    </OverlayTrigger>
                                                                  ))}
                                                                </ButtonToolbar>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>



                                        <div className="form-group">
                                        <button className="btn btn_orange btn_minwid editprofile_submit animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)}>Update
                                              </button>
                                        </div>
                                    </form>
                                </div>
                                <Link to={"/genagent-manage-property"} className="sdhmenu_mtabtrigger" title="GenRun Details">Manage Property <i className="fa fa-angle-down"></i></Link>
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

const mapStateTopProps = (state) => {
  return {
  servicedata: state.service,
  genrunprofiledata: state.genrunprofile,
  selectrunservice: state.selectrunservice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestService: () => {
      dispatch({ type: GET_REQUESTSERVICE });
    },

    getGenrunProfile: (formPayload) => {
      dispatch({ type: GET_GENRUNPROFILE, formPayload});
    },

    getSelectrunService: (usertoken,usertype) => {
      dispatch({ type: GET_SELECTRUNSERVICE, usertoken,usertype});
    },

  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Editgenagent));