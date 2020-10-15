/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import QnMarkDefault from '../../../common/images/qn_mark_default.png';
import ModalPopup from '../../Layout/ModalPopup';
import Profilebar from '../Profilebar';
import Genleftmenu from '../../Layout/Genleftmenu';
import cookie from 'react-cookies';
import $ from 'jquery';
import { appName } from "../../Config/Config";
import SuccessMsg from '../../../common/images/success-msg.png';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import SecondaryHeader from '../../Layout/SecondaryHeader';
import GenProEnable from '../../Account/GenProEnable';
import SubscriptionMore_Content from './SubscriptionMore';

import { GET_GENPROPROFILE, GET_PROUSERDETAILS, GET_SUBSCRIPTIONDATA, GET_POINTS } from '../../../actions';

import { scrollToTopValidate, CheckAuth } from "../../Helpers/SettingHelper";

class Index extends Component {
  constructor(props) {
    CheckAuth();
      super(props);
      this.state = {
        user_token: cookie.load('UserAuthToken'),
        serviceslist:[],
        selectedbstruct: null,
        nric:'',
        nostaffs:'',
        amountspend:'',
        userpoints:'',
        selectcompany:'',
        selectoutsource:'',
        selectedoutsourced:null,
        enablevalue:'',
        progressperc: '',
        vendor_mobile:'',
        vendor_webaddress:'',
        vendor_company_address:'',
        disable_displayname: true,
        disable_vendoremail: true,
        disable_vendormobile: true,
        disable_website: true,
        disable_comapnyaddr:true,
        displaycheck: false,
        emailcheck: false,
        mobilecheck: false,
        webaddresscheck: false,
        companyaddrcheck: false,
        vendor_displayname:'',
        vendor_email:'',
        checked: false,
        ProtypeText: 'Disable',
        modalSubscriptionMore: false,
        asktext: 'Enable',
        equotext:'Enable',
        premiumtext:'Enable',
        Loading:false,
        points:[],
      }
      this.toggleSubscriptionMore = this.toggleSubscriptionMore.bind(this);    
      this.handleInputChange = this.handleInputChange.bind(this);
      this.selectcompanytype = this.selectcompanytype.bind(this);   
      this.selectmarketoutsource = this.selectmarketoutsource.bind(this);   
      this.props.getSubscriptiondata(cookie.load('UserAuthToken'));
  }

  componentDidMount(){
   
    this.props.getPoints();
    this.props.getProUserDetails(cookie.load('UserAuthToken'));        
    $(document).click(function(e) {		
      if (!$(e.target).is('.genie-msg-popup-wrapper, .genie-popup-open * ')) {
          if ($('.genie-msg-popup-wrapper').is(":visible")) {                
              $(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
              $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
          }
      }
    });
  }
  componentWillReceiveProps(Props) {
      if(Props.servicedata !==this.props.servicedata){
          if(Props.servicedata[0].status === "success"){
            this.setState({serviceslist:Props.servicedata[0].result_set})
          }
      }

      if(Props.genproprofiledata !==this.props.genproprofiledata){
          if(Props.genproprofiledata[0].status === "success"){
            this.setState({Loading: false})
                cookie.remove("UserPoints");
                $("#genie-msg-popup").addClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
                $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Successfully GenPro Profile updated</p> ');
                this.setState({ progressperc :  Props.genproprofiledata[0].progressperc })
                cookie.save("UserPoints",Props.genproprofiledata[0].user_points)
                this.setState({user_points: Props.genproprofiledata[0].user_points})
                this.setState({nric: Props.genproprofiledata[0].vendor_details['vendor_reg_code_nric']})
            }
      }

        /* get updated details */
        if(Props.updateprodetails !==this.props.updateprodetails){
        //if(Object.keys(Props.updateprodetails).length > 0){
          this.setState({Loading:false});
            if(Props.updateprodetails[0].status === "success"){
              if(Props.updateprodetails[0].prostatus === 'A'){
                this.setState({ProtypeText: 'Disable'});
                this.setState({checked:false});
              }else if(Props.updateprodetails[0].prostatus === 'I'){
                this.setState({ProtypeText: 'Enable'})
                this.setState({
                              checked: true
                })
              }
              const formdata = Props.updateprodetails[0].result_set;
              if(Props.updateprodetails[0].Userdetails[0] &&
                Props.updateprodetails[0].Userdetails[0].user_nickname !== '' && Props.updateprodetails[0].Userdetails[0].user_nickname !== 'undefined'){
                this.setState({vendor_displayname: Props.updateprodetails[0].Userdetails[0].user_nickname})
              }
              if(Props.updateprodetails[0].Userdetails[0] && Props.updateprodetails[0].Userdetails[0].user_email !== ''){
                this.setState({vendor_email: Props.updateprodetails[0].Userdetails[0].user_email})
              }
              if (formdata['vendor_reg_code_nric']!='') {
                  this.setState({nric: Props.updateprodetails[0].result_set['vendor_reg_code_nric']})
              }

              if (formdata['vendor_spend_on_marketing']!='') {
                  this.setState({amountspend: Props.updateprodetails[0].result_set['vendor_spend_on_marketing']})
              }

              if (formdata['vendor_staffs_in_industry']!='') {
                  this.setState({nostaffs: Props.updateprodetails[0].result_set['vendor_staffs_in_industry']})
              }
              if(formdata['vendor_company_address']!=''){
                  this.setState({vendor_company_address: Props.updateprodetails[0].result_set['vendor_company_address']})
              }
              if(formdata['vendor_company_contact_no']!=''){
                  this.setState({vendor_mobile: Props.updateprodetails[0].result_set['vendor_company_contact_no']})
              }
              if(formdata['publishLandline'] == 1){
                  this.setState({mobilecheck: true});
                  this.setState({disable_vendormobile: false});
              }
              if(formdata['publishcompanyaddr'] == 1){
                  this.setState({companyaddrcheck: true});
                  this.setState({disable_comapnyaddr : false});
              }
              if(formdata['publishemail'] == 1){
                this.setState({emailcheck: true});
                this.setState({disable_vendoremail : false});
              }
              if(formdata['publishWebAddress'] == 1){
                this.setState({webaddresscheck: true});
                this.setState({disable_website : false});
              }
              if(formdata['publishName'] == 1){
                this.setState({displaycheck: true});
                this.setState({disable_displayname : false});
              }
              if(formdata['vendor_webaddress']!=''){
                  this.setState({vendor_webaddress: Props.updateprodetails[0].result_set['vendor_webaddress']})
              }
              if(!this.state.selectcompany){
                  this.setState({selectcompany: Props.updateprodetails[0].result_set['vendor_company_type']})
              }
              if(Props.updateprodetails[0].result_set['vendor_company_type'] !='')
              {
                var companyty = Props.updateprodetails[0].result_set['vendor_company_type'];
                this.selectcompanytype(companyty)
              }
              if(Props.updateprodetails[0].result_set['vendor_marketing_employee_outsourced']){
                var marketoutsource = Props.updateprodetails[0].result_set['vendor_marketing_employee_outsourced'];
                this.selectmarketoutsource(marketoutsource)
              }
              this.setState({ progressperc :  Props.updateprodetails[0].progressperc })
          //}
        }
      }

      if(Object.keys(Props.subscriptiondata).length > 0) {
            if(Props.subscriptiondata !== this.props.subscriptiondata){
                if(Props.subscriptiondata[0].status ===  "success"){
                  const SubscrData = Props.subscriptiondata[0].result_set;
                  {/*for list out the pro featured type*/}
                    if(SubscrData.smscallback_status !== ''  && SubscrData.smscallback_status.length > 0 ){
                      if(SubscrData.smscallback_status[0].featured_type === 'S') {
                        this.setState({asktext :'Enable'})
                      }else{
                        this.setState({asktext: 'Disable'})
                      }
                    }else{
                        this.setState({asktext: 'Disable'})
                    }
                    if(SubscrData.quotation_status !== '' && SubscrData.quotation_status.length > 0){
                      if(SubscrData.quotation_status[0].featured_type === 'E') {
                        this.setState({equotext :'Enable'})
                      }else{
                        this.setState({equotext: 'Disable'})
                      }
                    }else{
                        this.setState({equotext: 'Disable'})
                    }

                    if(SubscrData.prem_listing_status !== '' && SubscrData.prem_listing_status.length > 0 ){
                      if(SubscrData.prem_listing_status[0].featured_type === 'F') {
                        this.setState({premiumtext :'Enable'})
                      }else{
                        this.setState({premiumtext: 'Disable'})
                      }
                    }
                    else{
                        this.setState({premiumtext: 'Disable'})
                    }

                  
                }
            }
        }
        if(Props.points !== this.props.points){
            this.setState({points:Props.points[0].result_set});
        }
    }
    
    toggleSubscriptionMore() {
      this.setState(prevState => ({
        modalSubscriptionMore: !prevState.modalSubscriptionMore
      }));
    }
    handleChangeCheck  = (event) => {
        const {name, value} = event.target;
        if(name === 'enablevendor_displayname'){
          this.setState({displaycheck: !this.state.displaycheck});
          this.setState({disable_displayname: !this.state.disable_displayname});
        }else if(name === 'enablevendor_email'){
          this.setState({emailcheck: !this.state.emailcheck});
          this.setState({disable_vendoremail: !this.state.disable_vendoremail});
        }else if(name === 'enablevendor_mobile'){
          this.setState({mobilecheck: !this.state.mobilecheck});
          this.setState({disable_vendormobile: !this.state.disable_vendormobile});
        }else if(name === 'enable_website'){
          this.setState({webaddresscheck: !this.state.webaddresscheck});
          this.setState({disable_website: !this.state.disable_website});
        }else if(name === 'enable_companyaddress'){
          this.setState({companyaddrcheck: !this.state.companyaddrcheck});
          this.setState({disable_comapnyaddr: !this.state.disable_comapnyaddr})
        }
    }
  handledisable = (event) => {
    
    const{name,value} = event.target;
    if(event.target.checked == true){
      this.setState({ProtypeText:'Disable'})
    }
    else if(event.target.checked == false){
      this.setState({ProtypeText:'Enable'})
    }
     this.setState({checked: !this.state.checked});
  }

handleInputChange(event) {
    const {name, value} = event.target;
    if(name === 'vendor_mobile'){
       var regexPattern=new RegExp(/^[0-9-+]+$/);
       if(!regexPattern.test(value)){
          $('.errorvendormobile').html('<span class="errorspan">Please enter valid number</span>');
       }else{
          $('.errorvendormobile').html('');
       }
    }
    if(name === 'vendor_webaddress'){
      var re = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/
      if(!re.test(value)){
          $('.errorwebsite').html('<span class="errorspan">Please enter valid website adress</span>');
       }else{
          $('.errorwebsite').html('');
       }
    }
    this.setState({
        [name]: value
      });
    }
  handleBstruct = selectedbstruct => {
    this.setState({ selectedbstruct });
    if(this.state.selectedbstruct!=''){
      $('.errorbusstruct').html('');
    }
  };

  handleOutsourced = selectedoutsourced => {
       this.setState({ selectedoutsourced });
  }

  closepopup(){
      $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade"); 
  }


    handleFormSubmit = () => {
    if(this.validateForm()){
      this.setState({Loading:true});
          const formPayload = this.state;
          var qs = require('qs');
          if(formPayload.checked == true){
            var disablePro = 'yes';
          }else{
            var disablePro = 'no';
          }
          if(formPayload.displaycheck == true){
            var publishName = 1;
          }else{
            var publishName = '';
          }
          if(formPayload.mobilecheck == true){
            var publishLandline = 1;
          }else{
            var publishLandline = '';
          }
          if(formPayload.webaddresscheck == true){
            var publishWebAddress = 1;
          }else{
            var publishWebAddress = '';
          }
          if(formPayload.companyaddrcheck == true){
            var publishcompanyaddr = 1;
          }else{
            var publishcompanyaddr = '';
          }
          if(formPayload.emailcheck == true){
            var publishemail = 1;
          }else{
            var publishemail = '';
          }
          var postObject = {
          "app_name": appName,
          "user_token": formPayload.user_token,
          "assign_code": 'GP',
          "vendor_spend_on_marketing": formPayload.amountspend,
          "vendor_staffs_in_industry": formPayload.nostaffs,
          "vendor_marketing_employee_outsourced": formPayload.selectedoutsourced,
          "vendor_company_type": formPayload.selectedbstruct,
          "vendor_reg_code_nric": formPayload.nric,
          "vendor_company_address": formPayload.vendor_company_address,
          "vendor_company_contact_no": formPayload.vendor_mobile,
          "vendor_webaddress": formPayload.vendor_webaddress,
          "vendor_displayname": formPayload.vendor_displayname,
          "vendor_email": formPayload.vendor_email,
          "disablePro": disablePro,
          "publishLandline": publishLandline,
          "publishWebAddress": publishWebAddress,
          "publishcompanyaddr": publishcompanyaddr,
          "publishemail": publishemail,
          "publishName": publishName
        }
       this.props.getGenproProfile(qs.stringify(postObject));
    }
  }

   validateForm(){
    const {selectedbstruct, vendor_company_address,webaddresscheck,displaycheck,emailcheck,mobilecheck,companyaddrcheck,vendor_webaddress,vendor_mobile,vendor_displayname,vendor_email} = this.state;
    let errors = {};
    let formIsValid = true;
    if (selectedbstruct == '' || selectedbstruct == null) {
      formIsValid = false;
      $('.errorbusstruct').html('<span class="errorspan">Please Select any one bussiness structure</span>');
    }else if(selectedbstruct!=''){
      $('.errorbusstruct').html('');
    }

    if (vendor_mobile) {
      if(isNaN(vendor_mobile))
        {
          formIsValid = false;
        $('.errorvendormobile').html('<span class="errorspan">Please enter your valid Number</span>');
      }
      else {
       $('.errorvendormobile').html('');
      }
    }
    if(webaddresscheck == true){
      if(vendor_webaddress == undefined){
        formIsValid = false;
        $('.errordisplayweb').html('<span class="errorspan">Please enter webaddress</span>');
      }else{
         $('.errordisplayweb').html('');
      }
    }

    if(displaycheck == true){
      if(vendor_displayname == undefined || vendor_displayname == ''){
        formIsValid = false;
        $('.errordisname').html('<span class="errorspan">Please enter the name</span>');
      }else{
         $('.errordisname').html('');
      }
    }

    if(emailcheck == true){
      if(vendor_email == undefined || vendor_email == ''){
        formIsValid = false;
         $('.errorvenemail').html('<span class="errorspan">Please enter the email</span>');
      }else{
         $('.errorvenemail').html('');
      }
    }

    if(mobilecheck == true){
      if(vendor_mobile == undefined){
        formIsValid = false;
         $('.errorvenmob').html('<span class="errorspan">Please enter the mobile</span>');
      }else{
         $('.errorvenmob').html('');
      }
    }
    if(companyaddrcheck == true){
      if(vendor_company_address == undefined || vendor_company_address == ''){
        formIsValid = false;
         $('.errorcom').html('<span class="errorspan">Please enter the company address</span>');
      }else{
         $('.errorcom').html('');
      }
    }

    $(".editprofile_submit").removeClass('loading loading_data');
    if(formIsValid===false) {
      if($('.errorspan').length>0) {
        scrollToTopValidate();
      }
      
    }
    return formIsValid;
  }

  


selectcompanytype(companyty){

  if(!this.state.selectedbstruct){
      if(companyty == 'C'){
            this.setState({selectedbstruct:{ value: 'C', label: 'Company' }})
         }else if(companyty == 'SP'){
            this.setState({selectedbstruct:{ value: 'SP', label: 'Sole Proprietorship' }})
        }else if(companyty == 'P'){
           this.setState({selectedbstruct:{ value: 'P', label: 'Partnership' }})
        }else if(companyty == 'F'){
            this.setState({selectedbstruct:{ value: 'F', label: 'Freelance' }})
        }
    }
 }

 selectmarketoutsource(marketoutsource){

  if(!this.state.selectedoutsourced){
      if(marketoutsource == 'marketing employee'){
            this.setState({selectedoutsourced:{ value: 'marketing employee', label: 'Marketing Employee' }})
         }else if(marketoutsource == 'outsourced marketing'){
            this.setState({selectedoutsourced:{ value: 'outsourced marketing', label: 'Outsourced Marketing' }})
        }else if(marketoutsource == 'marketing yourself'){
           this.setState({selectedoutsourced:{ value: 'marketing yourself', label: 'Marketing Yourself' }})
        }else if(marketoutsource == 'no marketing'){
            this.setState({selectedoutsourced:{ value: 'no marketing', label: 'No Marketing' }})
        }
    }
 }


render() {
    if(this.state.checked == true){
      var IsDisable = 'form_sec disable_section_wrap';
    }else{
      var IsDisable = 'form_sec';
    }

    const { selectedoutsourced, ProtypeText } = this.state;
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

    const bussstruc = [
      { value: 'C', label: 'Company' },
      { value: 'SP', label: 'Sole Proprietorship' },
      { value: 'P', label: 'Partnership' },
      { value: 'F', label: 'Freelance' }
    ];

    const marketemploye = [
      { value: 'marketing employee', label: 'Marketing Employee' },
      { value: 'outsourced marketing', label: 'Outsourced Marketing' },
      { value: 'marketing yourself', label: 'Marketing Yourself' },
      { value: 'no marketing', label: 'No Marketing' }
    ];
    return (
        <div>
        <Header />
        <SecondaryHeader />
          <Profilebar userPoints={this.state.user_points} />
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <Genleftmenu currentpage="GenPro" />
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                <ul className="sdhmenu_tablist">
                                    <li className="active">
                                      <Link to={"/edit-gen-pro"} title="GenPro Details">Details</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genpro-my-services"} title="My Services">My Services</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genpro-customer-leads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                    <li>
                                         <Link to={"/genpro-jobs"} title="Jobs">Jobs</Link>
                                    </li>
                                </ul>

                                <Link to={"/edit-gen-pro"} className="sdhmenu_mtabtrigger active" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                
                                <div className="sdhmenu_content">                                    
                                    <form className={IsDisable}>
                                        <div className="general-info-tab-wrapper mb20">
                                            <div className="general-info-header">
                                                <div className="general-info-header-inner">                                                
                                                    <div className="gfh-flexbox-2">
                                                        <div className="gfh-progress-wrapper">
                                                            <div className="gfh-progress-bar">
                                                                <div className="gfh-progress-percent"><span>0%</span><span>100 %</span></div>
                                                               
                                                                <ProgressBar now={this.state.progressperc} />
                                                                <div className="gfh-progress-update"><p>Updated <span>{this.state.progressperc} %</span></p></div>
                                                               
                                                            </div>
                                                            { (this.state.progressperc<=99) &&
                                                            <p>Update GenPro Profile detail 100% to get <span className="gfh-green">{(this.state.points!=='' && this.state.points.GPUPDATE!=='' && typeof this.state.points.GPUPDATE!=='undefined')?this.state.points.GPUPDATE:0} GH Points</span></p>
                                                            }
                                                            <p><b>Reminder:</b> Press “Update” button at the bottom of the page to save your input information before navigating to another page</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
  <div className="form-group">
                                             <div className="p-tag info-website">Information to publish on the website 
                                                <div className="tooltip_ico">
                                                    <ButtonToolbar>
                                                      {['bottom'].map(placement => (
                                                        <OverlayTrigger
                                                          key={placement}
                                                          placement={placement}
                                                          overlay={
                                                            <Tooltip id={`tooltip-${placement}`}>
                                                             If you tick the boxes, we publish the selected details on the website
                                                            </Tooltip>
                                                          }
                                                        >
                                                          <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                        </OverlayTrigger>
                                                      ))}
                                                    </ButtonToolbar>
                                                </div>
                                             </div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox" onChange={this.handleChangeCheck.bind(this)}  name="enablevendor_displayname" checked={this.state.displaycheck}/><span>Display Name</span>
                                                        </div>
                                                        
                                                        <div className="account-mobile-wrap">
                                                        <div className="custom_inputbox">
                                                            <div className="account-mobileno">
                                                                <input type="text" className="form-control" name="vendor_displayname" value={this.state.vendor_displayname} onChange={this.handleInputChange} autoComplete="off" disabled={this.state.disable_displayname}/>
                                                            </div>
                                                        </div>
                                                         <div className="errordisname"></div>
                                                        </div>    
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox"  name="enablevendor_email"  onChange={this.handleChangeCheck.bind(this)} checked={this.state.emailcheck}/><span>Email Address</span>
                                                        </div>
                                                        <div className="custom_inputbox">
                                                        <div className="account-mobile-wrap">
                                                            <div className="account-mobileno">
                                                                <input type="email" placeholder=""className="form-control" name="vendor_email" value={this.state.vendor_email} onChange={this.handleInputChange}  autoComplete="off" disabled={this.state.disable_vendoremail}/>
                                                            </div>
                                                        </div>
                                                         <div className="errorvenemail"></div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox"  name="enablevendor_mobile" onChange={this.handleChangeCheck.bind(this)} checked={this.state.mobilecheck} /><span>Display number</span>
                                                        </div>
                                                        <div className="custom_inputbox">
                                                        <input type="text" placeholder="XXXX9944" name="vendor_mobile" className="form-control" onChange={this.handleInputChange} value={this.state.vendor_mobile} autoComplete="off" disabled={this.state.disable_vendormobile} />
                                                        </div>
                                                         <div className="errorvenmob"></div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox" name="enable_website"
                                                              onChange={this.handleChangeCheck.bind(this)} checked={this.state.webaddresscheck} /><span>Website Address</span>
                                                        </div>
                                                        <div className="custom_inputbox">
                                                        <input type="url" placeholder="https://www.geniehut.com/" name="vendor_webaddress" className="form-control" onChange={this.handleInputChange} value={this.state.vendor_webaddress} autoComplete="off" disabled={this.state.disable_website}/>
                                                        </div>
                                                        <div className="errordisplayweb"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group mb27">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                            <input type="checkbox"  name="enable_companyaddress"  onChange={this.handleChangeCheck.bind(this)} checked={this.state.companyaddrcheck} /><span>Shop address / Fixed Location</span>
                                                        </div>
                                                        <div className="custom_inputbox">
                                                        <input type="text" placeholder="shop address" name="vendor_company_address" className="form-control" onChange={this.handleInputChange} value={this.state.vendor_company_address} autoComplete="off" disabled={this.state.disable_comapnyaddr}/>
                                                        </div>
                                                        <div className="errorcom"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                     <p className="info-website">Subscription</p>
                                                     {/*<ul className="GenPSub_Settings_List">
                                                        <li>
                                                        <span>Ask to call
                                                        <div className="tooltip_ico">
                                                            <ButtonToolbar>
                                                              {['bottom'].map(placement => (
                                                                <OverlayTrigger
                                                                  key={placement}
                                                                  placement={placement}
                                                                  overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                      Customer mobile phone will be sent via SMS
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                </OverlayTrigger>
                                                              ))}
                                                            </ButtonToolbar>
                                                        </div></span>
                                                        <span className="GenPSub_enable_txt GenPSub_Disabled">{this.state.asktext}</span>                               
                                                        </li>
                                                        <li>
                                                        <span>E-quotation
                                                        <div className="tooltip_ico">
                                                            <ButtonToolbar>
                                                              {['bottom'].map(placement => (
                                                                <OverlayTrigger
                                                                  key={placement}
                                                                  placement={placement}
                                                                  overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                     You can customize E-quotation and send to the customers
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                </OverlayTrigger>
                                                              ))}
                                                            </ButtonToolbar>
                                                          </div></span>
                                                        <span className="GenPSub_enable_txt GenPSub_Disabled">{this.state.equotext}</span>                               
                                                        </li>
                                                        <li>
                                                        <span>Premium listing
                                                        <div className="tooltip_ico">
                                                            <ButtonToolbar>
                                                              {['bottom'].map(placement => (
                                                                <OverlayTrigger
                                                                  key={placement}
                                                                  placement={placement}
                                                                  overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                      Boost listings to be displayed at the top of the search
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                </OverlayTrigger>
                                                              ))}
                                                            </ButtonToolbar>
                                                        </div></span>
                                                        <span className="GenPSub_enable_txt GenPSub_Disabled">{this.state.premiumtext}</span>                    
                                                        </li>
                                                     </ul>*/}
                                                     <button className="btn animate-btn2 btn_trans_blue GenPSubBtn" type="button"  onClick={this.toggleSubscriptionMore}>Subscribe More</button>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        {/*normal information */}

                                         <div className="form-group">
                                          <div className="p-tag info-website">Other Information</div>
                                            <Row>
                                                <Col md={6}>
                                                    <label>Business structure <span className="required">*</span></label>
                                                    <div className="re_select">
                                                        <Select  
                                                          value={this.state.selectedbstruct}
                                                          onChange={this.handleBstruct}
                                                          options={bussstruc} />
                                                          <div className="errorbusstruct"></div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label>
                                                        Company registration code 
                                                    </label>
                                                    <input type="text" className="form-control"  name="nric" value={this.state.nric} onChange={this.handleInputChange} autoComplete="off" />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <label>
                                                        Update landline number
                                                   </label>
                                                    <div className="account-mobile-wrap">
                                                        <div className="account-mobileno">
                                                            <input type="text" placeholder="XXXXX X123" name="vendor_mobile" className="form-control" onChange={this.handleInputChange} value={this.state.vendor_mobile} autoComplete="off" />
                                                          <div className="errorvendormobile"></div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label>
                                                        How many staffs do you have (including yourself)?
                                                   </label>
                                                        <input type="text" placeholder="No of Staffs"  name="nostaffs" className="form-control" onChange={this.handleInputChange} value={this.state.nostaffs} autoComplete="off" />
                                                                       

                                                </Col>
                                            </Row>
                                        </div>        
                                        <div className="form-group fai-end">
                                            <Row>
                                                <Col md={6}>
                                                    <label> How much did you spend (Singapore dollars) on marketing annually?</label>
                                                    <input type="text" placeholder="$2,000" name="amountspend" className="form-control" onChange={this.handleInputChange}  value={this.state.amountspend} autoComplete="off"/>
                                                </Col>
                                                <Col md={6}>
                                                    <label>Marketing contact</label>
                                                    <div className="re_select">
                                                        <Select  
                                                        options={marketemploye}
                                                        value={selectedoutsourced}
                                                        onChange={this.handleOutsourced} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                      
                                    </form>
                                     <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                   <p className="info-website mt0">GenPro Services</p>
                                                    <div className="check-input-wrap ciw-row ciw-inbl">
                                                        <div className="custom_checkbox">
                                                         <input
                                                          type="checkbox"
                                                          checked={this.state.checked}
                                                          onChange={this.handledisable.bind(this)} 
                                                          name="enablepro_services"
                                                           />
                                                            <span>{this.state.ProtypeText?'Disable':'Enable'}</span>
                                                            <div className="tooltip_ico">
                                                                <ButtonToolbar>
                                                                  {['top'].map(placement => (
                                                                    <OverlayTrigger
                                                                      key={placement}
                                                                      placement={placement}
                                                                      overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                          {this.state.ProtypeText?'Remove this web services listing from the website search':'You want to enable Your Genpro type '}
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
                                             <button className="btn btn_lg btn_orange btn_minwid editprofile_submit animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)}disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span class="load-data">Loading</span> 
                                        }Update
                                              </button>
                                        </div>
                                </div>

                                <Link to={"/genpro-my-services"} className="sdhmenu_mtabtrigger" title="GenPro Details">My Services <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genpro-customer-leads"} className="sdhmenu_mtabtrigger" title="GenPro Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genpro-jobs"} className="sdhmenu_mtabtrigger" title="GenPro Details">Jobs <i className="fa fa-angle-down"></i></Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />            
            <ModalPopup modal={this.state.modalSubscriptionMore} toggle={this.toggleSubscriptionMore} className="modal-width Gen_popup SubMore_popup" title="Subscription More" >				
                <SubscriptionMore_Content />				
            </ModalPopup>	  
      
            <div className="genie-msg-popup-wrapper" id="genie-msg-popup">
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
    points            : state.points,
    genproprofiledata : state.genproprofile,
    updateprodetails  : state.updateprodetails,
    subscriptiondata  : state.subscriptiondata
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getPoints: () =>{
        dispatch({ type: GET_POINTS});
      },
      getGenproProfile: (formPayload) => {
        dispatch({ type: GET_GENPROPROFILE, formPayload});
      },
       getProUserDetails: (usertoken) => {
        dispatch({ type: GET_PROUSERDETAILS, usertoken});
      },
      getSubscriptiondata: (usertoken) => {
          dispatch({ type: GET_SUBSCRIPTIONDATA, usertoken });
      },

  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Index));
