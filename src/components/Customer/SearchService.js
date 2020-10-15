/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import Select from 'react-select';
import {Row, Col, OverlayTrigger, ButtonToolbar, Tooltip, Button, InputGroup, FormControl } from 'react-bootstrap';
import QnMarkDefault from '../../common/images/qn_mark_default.png';
import 'react-intl-tel-input/dist/main.css';
import $ from 'jquery';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ModalPopup from '../Layout/ModalPopup';
import Login from '../Account/Login';
import HowtoUse from '../Customer/HowtoUse';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cookie from 'react-cookies';
import Parser from 'html-react-parser';
import { lang } from '../Helpers/lang';                                               
import { GET_REQUESTSERVICE, GET_DISTRICT, GET_RUNSEARCHLIST, GET_PRETRANSACTION, GET_SUBTITLE} from '../../actions';
import { appName } from "../Config/Config";
import {isNumber, scrollToTopValidate} from '../Helpers/SettingHelper';
import moment from 'moment';
import { addDays } from 'date-fns';

const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'No preferences', label: 'No preferences' },
    
  ];


class SearchService extends Component {

    constructor(props) {
        super(props); 
        const ServiceID = (typeof this.props.match.params.ServiceID === 'undefined') ? '' : this.props.match.params.ServiceID;
        const date = new Date();
        date.setDate(date.getDate() + 1);
        this.state = {
            userToken:  cookie.load('UserAuthToken'),
            modalHowtoUse: false,
            modalLogin: false,
            service:[],
            selected_service:'',
            service_desc:'',
            service_subtitle:'',
            service_startdate:date,
            service_enddate:'',
            service_district:'',
            service_gender:'',
            service_fee:'',
            service_id: ServiceID,
            page:0,
            errorDesc:'',
            errorStartDate:'',
            errorDistrict:'',
            errorFee:'',
            Loading: false,
            runsearchList:'',
            errorsubtitle:'',
            platformfee: 0,
            transId:(typeof props.location.state!=='undefined')?props.location.state.transId2:'',
            noresult:(props.location.state.noresult!=='undefined' && props.location.state.noresult!=='')?props.location.state.noresult:'',
            ServiceList:[],
            errorEndDate:'',
            searchListService:'',
            existSearch:0,
            errorMsg:'',
            user_points:''
            }
      this.toggleLogin = this.toggleLogin.bind(this);
      this.toggleHowtoUse = this.toggleHowtoUse.bind(this);
      this.props.getRequestService('genrun',cookie.load('UserAuthToken'));
      this.props.getDistrict();
      this.props.getSubtitle(ServiceID);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
      
    }
   componentDidMount(){
    $('body').click(function(evt){ 
       if(evt.target.className!='services-search-list') {
          $('.services-search-list').hide();
       }

  });
    if(this.state.transId!== ''){
      this.props.getPreTransaction(this.state.transId)
    }
   }
    componentWillReceiveProps(Props){
        this.setState({Loading: false})
        if(Props.runsearchlist !== this.props.runsearchlist){
           if(Props.runsearchlist[0].status==='success') {
            var resultset = Props.runsearchlist[0].result_set;
              if(Object.keys(resultset.genrun_list).length > 0){
                   this.props.history.push({ pathname: '/customer/search_list',state: { runserachlist: Props.runsearchlist[0].result_set }})
               }
           }else if(Props.runsearchlist[0].status==='authenticfailed'){
                 this.props.history.push('/logout');
           }else {
                  this.setState({noresult:Props.runsearchlist[0].message});
           }
        }
        if(Props.servicedata !== this.props.servicedata){
            if(Props.servicedata[0].status==='success') {
              this.setState({ServiceList:Props.servicedata[0].result_set});
              this.loadService(Props.servicedata[0].result_set);
            }
        }
        if(Props.districtdata !== this.props.districtdata){
            if(Props.districtdata[0].status==='success') {    
                const alldist = [{value:'0', label: 'No meet is required'}];
                Props.districtdata[0].district_list.map(function(item){  
                  alldist.push({
                        value: item.value,
                        label: item.label
                    });
                });
              this.setState({district:alldist});
          }
        }
        if(Props.pretransaction !== this.props.pretransaction){
          if(Props.pretransaction[0].status === 'Success'){
            const transDetails = Props.pretransaction[0].result_set.trans_detail;
            this.setState({service_desc:transDetails.trans_desc }) 
            this.setState({service_fee:transDetails.trans_fee })
            if(Props.pretransaction[0].result_set.districtlist!== '' && Props.pretransaction[0].result_set.districtlist!== null){
              this.setState({service_district:Props.pretransaction[0].result_set.districtlist })
            }
           if(transDetails.trans_subtitle!== '' && transDetails.trans_subtitle!== null){
              this.setState({service_subtitle:transDetails.trans_subtitle })
            }
            if(transDetails.trans_gender!=='' && transDetails.trans_gender!== null){
              if(transDetails.trans_gender === 'M'){
                this.setState({service_gender: { value: 'Male', label: 'Male' }})
              }else{
                this.setState({service_gender: { value: 'Female', label: 'Female' }})
              }
            }
          }
        }
    }

    handleChangeDate(date) {
      this.setState({
        service_startdate: date
      });
    }

    handleChangeEndDate(date) {
      this.setState({
        service_enddate: date
      });
    }


    handleChange = selected_service => {
      
      this.setState({ selected_service }, function() {
        this.loadPoints();
      });
    };

    loadPoints() {
        this.state.ServiceList.map((item) =>{
        if(item.services_id === this.state.selected_service.value){
        
          this.setState({platformfee:
          item.promo_amount
          })
        }
        
      });
    }

    handledistrict = service_district => {
      this.setState({ service_district });
    };
    handlegender = service_gender => {
      this.setState({ service_gender });
    };

    loginresponse = (userToken, name) => {
      if(userToken!=='' && typeof userToken!=='undefined') {   
          
        this.setState({userToken:userToken, UserFullname:name}, function() {          
            this.handleFormSubmit();
        });
      }
    }

    handleChangeTxt = (item, event) => {
        this.setState({ [item]:event.target.value });  
        if(item === 'service_subtitle'){
          $('.services-search-list').show();
           this.searchListService();
        }         
    }



    loadService(service) {
      let serviceList = [];
      service.map((item) =>{
        if(item.services_id === this.state.service_id){
          this.setState({selected_service:
          {value:item.services_id,
          label:item.services_title}
          }) 
          this.setState({platformfee:
          item.promo_amount
          })
        }
        serviceList.push({
          value:item.services_id,
          label:item.services_title
        })
      });
      this.setState({service:serviceList});    
    }
   
    
    toggleHowtoUse() {
    this.setState(prevState => ({
      modalHowtoUse: !prevState.modalHowtoUse
    }));
    }

    toggleLogin() {
      
    this.setState(prevState => ({
      modalLogin: !prevState.modalLogin
    }));
    }
     

     handleFormSubmit = () => {      
        this.setState({noresult:''});
        if(this.validateForm()){
        
          if(this.state.userToken!=='' && typeof this.state.userToken!=="undefined"){
          const formPayload = this.state;
          var qs = require('qs');                
          this.setState({Loading:true});
          var postObject = {
          "app_name"         : appName,
          "user_token"       : this.state.userToken,
          "service_id"       : formPayload.selected_service.value, 
          "service_desc"     : formPayload.service_desc,
          "service_subtitle" : formPayload.service_subtitle,
          "service_startdate": formPayload.service_startdate?moment(formPayload.service_startdate).format('YYYY-MM-DD'):'',
          "service_enddate"  : formPayload.service_enddate?moment(formPayload.service_enddate).format('YYYY-MM-DD'):'',
          "service_district" : formPayload.service_district.value,
          "gender"           : formPayload.service_gender.value?formPayload.service_gender.value:'',
          "fee"              : formPayload.service_fee,
          "page"             :formPayload.page,
          "action"           :'add_lead'
        };
         
          this.props.getRunSearchList(qs.stringify(postObject));
        }
        else {
          //this.toggleLogin();
            const formPayload = this.state;
            var qs = require('qs');                
            this.setState({Loading:true});
            var postObject = {
            "app_name"         : appName,
            "user_token"       : this.state.userToken,
            "service_id"       : formPayload.selected_service.value, 
            "service_desc"     : formPayload.service_desc,
            "service_subtitle" : formPayload.service_subtitle,
            "service_startdate": formPayload.service_startdate?moment(formPayload.service_startdate).format('YYYY-MM-DD'):'',
            "service_enddate"  : formPayload.service_enddate?moment(formPayload.service_enddate).format('YYYY-MM-DD'):'',
            "service_district" : formPayload.service_district.value,
            "gender"           : formPayload.service_gender.value?formPayload.service_gender.value:'',
            "fee"              : formPayload.service_fee,
            "page"             :formPayload.page,
            "action"           :'add_lead'
            };

          this.props.history.push({
              pathname: '/login',
              state: {Searchformdata: postObject}  
          })
        }
      }       
  }
  validateForm(){
      const {service_desc,service_subtitle, service_district,service_fee} = this.state;
      let formIsValid = true;

      if (!service_desc) {
      formIsValid = false;
      this.setState({errorDesc:Parser('<span class="errorspan">Please fill the description</span>')})
      }else if(service_desc){
      this.setState({errorDesc:''})
      }

      if(Object.keys(service_subtitle).length >=30){
        formIsValid = false;
        this.setState({errorsubtitle:Parser('<span class="errorspan">Subtitle should be within 30 letters</span>')})
      }else{
        this.setState({errorsubtitle:''})
      }
      


      if (!service_district) {
      formIsValid = false;
      this.setState({errorDistrict:Parser('<span class="errorspan">Select district</span>')})
      }else if(service_district){
      this.setState({errorDistrict:''})
      }

      if (!service_fee) {
      formIsValid = false;
        this.setState({errorFee:Parser('<span class="errorspan">Please enter the fee</span>')})
      }else{
        this.setState({errorFee:''})    
      }

      if(formIsValid===false) {
         setTimeout(function() {
            if($('.errorspan').length>0) {
              scrollToTopValidate();
          }
        }, 300);
      }
      return formIsValid;
  }



  searchListService() {
    let subtitle ='';
    let existSearch = 0;
        if(this.props.subtitle!=='') {
             const service_subtitle = this.state.service_subtitle;
              subtitle = this.props.subtitle[0].result_set.map((item, index) => {
              let result = item.trans_subtitle.toLowerCase().indexOf(service_subtitle.toLowerCase());
                  if(result>=0) {
                      existSearch++;
                        return (
                            <li key={index} onClick={this.selectService.bind(this, item.trans_id, item.trans_subtitle)} >{item.trans_subtitle}</li>
                        );
                  }
              });
        }
        if(existSearch===0) {
        this.setState({searchListService:'', existSearch:existSearch});
        }
        else {
           this.setState({searchListService:subtitle, existSearch:existSearch});
        }

    }

    selectService(trans_id, trans_subtitle) {
        this.setState({trans_id:trans_id, searchListService:'', errorMsg:'', service_subtitle:trans_subtitle, existSearch:0});
    }

  render() {
    return (
          <div>
            <Header UserAuthToken={this.state.userToken} UserFullname={this.state.UserFullname} />
            <div className="innerpage-head-banner">
                  <div className="container">
                      <div className="innerpage-head-wrapper">
                          <h2>You have chosen <span>{this.state.selected_service.label},</span></h2>
                          <p>Once you complete your request we will get best list of GenRun</p>
                      </div>
                  </div>
              </div>
            <div className="run-erand-block">
                  <div className="container">
                      <div className="run-erand-innerblock">
                          <div className="run-erand-content">
                              <p>Run-errand is for simple task that we expect from an inexperienced part timer. Detail description and reasonable initial offer give a better chance for GenRun to pick up the job. <a href="javascript:void(0)" onClick={this.toggleHowtoUse}>How to Use</a></p>
                          </div>
                          <div className="run-erand-form-wrap">
                                <div className="form-group">
                                    <Row>
                                        <Col md={12}>
                                            <label>Category <span className="required">*</span>
                                            <span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          Please choose the GenRun part timer category that fits your requirement. Whatsapp +6598256258 if there are new GenRun part timer category that you want to recommend.
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>
                                            </label>
                                            <div className="re_select">
                                                <Select 
                                                 options={this.state.service}
                                                 value={this.state.selected_service}
                                                 onChange={this.handleChange}
                                                 placeholder="Select Service" tabIndex="1"/>
                                            </div>
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={12}>
                                            <label>I Need GenRun to <span className="required">*</span>
                                            <span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          Please describe the details of the run-errand activities/ part time jobs for the GenRun. Kindly note that any contact details/ email address detects by the system in the description will be omitted.
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>
                                            </label>
                                            <textarea className="form-control" placeholder="I Need Someone to ……. Please Contact Me +65XXXXXXX at XXXXX@gmail.com (All Contacts will be blocked before Acceptance)" onChange={this.handleChangeTxt.bind(this, 'service_desc')} tabIndex="2" value={this.state.service_desc} />
                                            {this.state.errorDesc}
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={12}>
                                            <label>Subtitle
                                          
                                            </label>
                                           {/*<input type="text" className="form-control" onChange={this.handleChangeTxt.bind(this, 'service_subtitle')} name="service_subtitle" placeholder="Enter Subtitle" value={this.state.service_subtitle} tabIndex="3" autoComplete="off"/>*/}

                                         <InputGroup className="mb-3">
                                            <FormControl
                                            placeholder={lang.search.subtitle}
                                            value={this.state.service_subtitle}
                                            onChange={this.handleChangeTxt.bind(this, 'service_subtitle')}
                                            tabIndex = "3"
                                            />
                                        </InputGroup>
                                        {(this.state.errorsubtitle!=="") &&
                                            <div className="cus_home_error">
                                                {this.state.errorsubtitle}
                                            </div>  
                                        }
                                        { (this.state.searchListService!=='') &&
                                            <div className="services-search-list">
                                                <div className="inner-services-search-list">
                                                    <ul>
                                                        {this.state.searchListService}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={6}>
                                            <label>Service Starts Date <span className="required">*</span>
                                            <span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          When do you want to start the service?
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>
                                            </label>
                                         

                                              <DatePicker
                                                onChange={this.handleChangeDate}
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.service_startdate}
                                                className="form-control"
                                                minDate={new Date()}
                                                maxDate={addDays(new Date(), 30)}
                                                placeholderText="Select service startDate"
                                                tabIndex="4"
                                              />
                                            {this.state.errorStartDate}
                                        </Col>
                                        <Col md={6}>
                                            <label>Service End Date
                                            <span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          When do you want to end the service?
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>
                                            </label>
                                              <DatePicker
                                                onChange={this.handleChangeEndDate}
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.service_enddate}
                                                className="form-control"
                                                minDate={this.state.service_startdate}
                                                maxDate={addDays(new Date(), 30)}
                                                placeholderText="Select service EndDate"
                                                tabIndex="4"
                                              />

                                            {this.state.errorEndDate}
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={6}>
                                            <label>District <span className="required">*</span>
                                            {/*<span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          Please mention the job district and No meet up is required
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>*/ }
                                            </label>
                                            <div className="re_select">
                                                <Select  options={this.state.district}  
                                                value={this.state.service_district}
                                                 placeholder="Select Service"
                                                 onChange={this.handledistrict} tabIndex="6"/>
                                                 {this.state.errorDistrict}

                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <label>Gender</label>
                                            <div className="re_select">
                                                <Select  options={gender}
                                                value={this.state.service_gender}
                                                onChange={this.handlegender}
                                                 placeholder="Select Service" tabIndex="7"/>
                                            </div>
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={6}>
                                            <label>Service fee (Your first offer and not including material cost) <span className="required">*</span>
                                            <span className="tooltip_ico">
                                                <ButtonToolbar>
                                                  {['bottom'].map(placement => (
                                                    <OverlayTrigger
                                                      key={placement}
                                                      placement={placement}
                                                      overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                          Service fee (Your first offer and not including material cost)
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                    </OverlayTrigger>
                                                  ))}
                                                </ButtonToolbar>
                                            </span>
                                            </label>
                                           <input type="text" className="form-control" placeholder="$100" value={this.state.service_fee} onChange={this.handleChangeTxt.bind(this, 'service_fee')}  tabIndex="8" onKeyPress={(e) => isNumber(e)} />
                                           {this.state.errorFee}
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <Row>
                                        <Col md={12}>
                                           <div className="txt-center mb0 mt20 fw-500">Platform Fees will be <span className="gfh-orange">{(this.state.platformfee!=='' && typeof this.state.platformfee!=='undefined' && this.state.platformfee!==null)?this.state.platformfee:0} GH Points</span>
                                          
                                            </div>
                                        </Col>
                                    </Row>
                                 </div>
                                 <div className="form-group">
                                    <div className="divider-dash"></div>
                                    <p className="txt-center txt-appendix">By pressing “Submit”, you agreed that will not hold Geniehut.com responsibility for any damages caused by GenRun</p>
                                 </div>
                                 <div className="form-group txt-center mb0">
                                      <button className="btn btn_orange btn_minwid animate-btn2" type="button mt10" onClick={this.handleFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }Submit
                                      </button>
                                      <div className="error-color large-font">{this.state.noresult}</div>
                                 </div>
                          </div>
                      </div>
                  </div>
              </div>
            <Footer />
            <ModalPopup modal={this.state.modalHowtoUse} toggle={this.toggleHowtoUse} className="modal-width HowtoUse_popup Gen_popup" title="How to Use?" >
                <HowtoUse />
            </ModalPopup> 
           {/*<ModalPopup modal={this.state.modalLogin} toggle={this.toggleLogin} className="modal-width login_popup Gen_popup" title="Login" disablefooter={1}  >
              <Login  loginresponse={this.loginresponse}  toggle={this.toggleLogin} />  
            </ModalPopup>*/ }
            
          </div>
    );
  }
}


const mapStateTopProps = (state) => {
  return {
     servicedata     : state.service,
     districtdata    : state.district,
     runsearchlist   : state.runsearchlist,
     pretransaction  : state.pretransaction,
     subtitle        : state.subtitle 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDistrict: () => {
      dispatch({ type: GET_DISTRICT});
    },
    getRequestService: (addservice, usertoken) => {
        dispatch({ type: GET_REQUESTSERVICE, addservice, usertoken});
    },
    getRunSearchList: (formPayload) => {
      dispatch({ type: GET_RUNSEARCHLIST, formPayload});
    },
    getPreTransaction: (transId) => {
      dispatch({ type: GET_PRETRANSACTION, transId});
    },
    getSubtitle: (service_id) => {
      dispatch({ type: GET_SUBTITLE, service_id});
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SearchService));
