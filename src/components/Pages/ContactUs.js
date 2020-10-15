/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_CMSPAGE } from '../../actions';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import $ from 'jquery';
import BannerImg from '../../common/images/contact-banner.jpg';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {Row, Col, ProgressBar, Modal, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import { appName } from "../Config/Config";
import { GET_MOBILE_COUNTRY, GET_CONTACTUS, GET_IPDATA, GET_SITESETTINGS } from '../../actions';
import { PageTitle, scrollToTopValidate, CheckAuth } from "../Helpers/SettingHelper";


var Parser = require('html-react-parser');

class ContactUs extends Component {
constructor(props) {
    super(props);
    this.state = {
      contact_name:'',
      contact_no:'',
      contact_email:'',
      contact_msg:'',
      countrycode:'',
      errorContactno:'',
      errorname:'',
      erroremail:'',
      countryList:[],
      Loading:false,
      mobileError:0,
      validphone: '',
      siteemail:'',
      sitephone: '',
      showcontactmsg:''
      }

    this.props.getSiteSettings();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getipdetails();
  }

    getipdetails =() => {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        cookie.save("ipaddress",data.ip);
    });

    var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "ipaddress": cookie.load('ipaddress')
      };
    this.props.getIpData(qs.stringify(postObject));
  }

  componentDidMount(){
    document.title = PageTitle('Contact Us');
    this.props.getMobileCountry();
  }

  componentWillReceiveProps(Props) {

    this.setState({Loading:false});
    if(Props.mobilecountry !==this.props.mobilecountry){
      if(Props.mobilecountry[0].result_set!==''){
         this.setState({mobilecountry:Props.mobilecountry[0].result_set}, function() {
         this.loadCountryList();
         });
       }
     }
     if(Props.contactus !== this.props.contactus){
        if(Props.contactus[0].status == 'success'){

           this.setState({showcontactmsg:Parser('<span class="contactsuccessmsg"><p>'+Props.contactus[0].message+'</p></span>')})
               setTimeout(() => {
                    this.setState({showcontactmsg:''})
                },5000);
        }
     }

      if(Props.ipaddress !==this.props.ipaddress){
          if(Props.ipaddress[0]!=''){
            this.setState({clientip :Props.ipaddress[0]});
          } else {
            this.setState({clientip :'sg'});
          }
       }

        if(Props.sitesettings!== this.props.sitesettings){
        if(Props.sitesettings[0].result_set !== 'undefined' && Props.sitesettings[0].result_set !== null){
            if(Props.sitesettings[0].status === 'success'){
               const settingData = Props.sitesettings[0].result_set;
               if(settingData.settings_display_email !== ''){
                    this.setState({siteemail : settingData.settings_display_email})
               }
               if(settingData.settings_no !== ''){
                    this.setState({sitephone : settingData.settings_no})
               }
            }
        }
    }
 }

  loadCountryList() {
    var country= [];
    this.state.mobilecountry.map(function(countries){
        country.push(countries.short_code.toLowerCase());
    });
    this.setState({countryList:country});
  }



  handleInputChange(event) {
    const {name, value} = event.target;  
    this.setState({
        [name]: value
      });
    
  }


 handleChangeTxt = (valid, event,object) => { 
    this.setState({countrycode: object.dialCode});
    this.setState({contact_no :event });
    this.setState({validphone: valid});
 }

editform = (valid,inputphone,object,fullnumber)  => {
    this.setState({validphone: valid});
    this.setState({selectedcode : object.dialCode})
    this.setState({selectregion : object.iso2})
    let errors = {};
    let formIsValid = true;
    if(valid == false){
      this.setState({mobileError:1});
      formIsValid = false;
      $('.errorContactno').html('<span className="errorspan">Please enter valid mobile number</span>');
    }else if(valid == true){
      this.setState({mobileError:0});
      $('.errorContactno').html('');
    }
    this.setState({
      errors: errors
    });

    return formIsValid;
  }

   handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.validateForm()){

      this.setState({Loading:true});

      const formPayload = this.state;
      var qs = require('qs');


      if(this.state.countrycode!=''){
          var ccode =this.state.countrycode;
      }else{
         var ccode =formPayload.selectedcode;
      }

      var postObject = {
      "app_name": appName,
      "contact_name": formPayload.contact_name,
      "contact_email": formPayload.contact_email,
      "contact_no": '+'+ccode+formPayload.contact_no,
      "contact_msg": formPayload.contact_msg
     
      };
      this.props.getContactus(qs.stringify(postObject));
      
      this.setState({
      contact_name: '',
      contact_email:'',
      contact_no:'',
      contact_msg:''
      });
    }
  }
  validateForm(){

    const {contact_no,contact_name,contact_email,contact_msg,validphone} = this.state;

    let errors = {};
    let formIsValid = true;


    if(!contact_name) {
       this.setState({errorname:Parser('<span class="errorspan">Please fill the contact name</span>')})
       formIsValid = false;
    }else {
      this.setState({errorname:''});
    }

    if(!contact_email) {
       this.setState({erroremail:Parser('<span class="errorspan">Please fill the contact  email</span>')})
       formIsValid = false;
    }else {
      this.setState({erroremail:''});
    }

    if(!contact_msg) {
       this.setState({errormsg:Parser('<span class="errorspan">Please fill the description</span>')})
       formIsValid = false;
    }else {
      this.setState({errormsg:''});
    }


    if (!contact_no) {
      formIsValid = false;
      this.setState({mobileError:1});
      this.setState({errorContactno:Parser('<span class="errorspan">Please enter correct contact number</span>')})
    }else if(contact_no){
      this.setState({mobileError:0});
       this.setState({errorContactno:''});
    }

    if(validphone === false){
      formIsValid = false;
      this.setState({mobileError:1});
      this.setState({errorContactno:Parser('<span class="errorspan">Please enter correct contact number</span>')})
    }else if(validphone === true){
      this.setState({mobileError:0});
       this.setState({errorContactno:''});
    }

   if(formIsValid===false) {
     setTimeout(function(){  
        scrollToTopValidate();
       },1000);
    }
    return formIsValid;

   
  }


render() {
  let defaultip  = this.state.clientip;
  
   if(defaultip !=='' && typeof defaultip !== "undefined" ) {
     
    return (
      <>
        <div>
            <Header />
            <div className="cms-page-banner">
                 <div className="cms-innerpage-banner">
                      <img src={BannerImg} alt=""/>
                      <div className="cms-banner-caption">
                        <div className="container">
                              <h1>Contact Us</h1>
                        </div>
                      </div>
                 </div>
            </div>
            <div className="wrapper_out pptc_wrapper_out contact_wrapper_out">
                <div className="container">
                  <div className="contact-page-wrapper">
                      <div className="inner-contact-page-wrapper">
                        <Row>
                            <Col md={6}>
                               <div className="contact-form-wrapper">
                                   <h3>Fill the form we will get back you soon</h3>
                                    <form className="contact_form">
                                        <div className="form-group" >
                                            <label>Name <span className="required">*</span></label>
                                            <input type="text" name="contact_name" value={this.state.contact_name} className="form-control" onChange={this.handleInputChange}/>
                                           {this.state.errorname}
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" value={this.state.contact_email} name="contact_email" onChange={this.handleInputChange}/>
                                            {this.state.erroremail}
                                        </div>
                                        <div className="form-group">
                                            <div className="label-tag">
                                                Mobile Number <span className="required">*</span>
                                            </div>
                                            <div className="account-mobile-wrap">
                                                <div className="account-mobileno">
                                                        <IntlTelInput className="form-control" name="contact_no" 
                                                          defaultCountry={defaultip}
                                                          separateDialCode='true'
                                                          onPhoneNumberBlur={this.editform.bind(this)}
                                                          value={this.state.contact_no}
                                                          onPhoneNumberChange={this.handleChangeTxt.bind(this) }
                                                          onlyCountries={this.state.countryList}
                                                          />
                                                </div>
                                                {this.state.errorContactno}
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Message <span className="required">*</span></label>
                                             <textarea className="form-control" name="contact_msg" value={this.state.contact_msg} onChange={this.handleInputChange} autoComplete="off"></textarea>
                                            {this.state.errormsg}
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn_orange btn_minwid editprofile_submit animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }Submit
                                             </button>
                                        </div>
                                       <div className="successMsg">{this.state.showcontactmsg}</div>
                                    </form>
                               </div>
                            </Col>
                            <Col md={6}>
                               <div className="contact-detail-wrapper">
                                   {/*<h3>Our Location</h3> */}
                                    <ul className="contact-detail-list">
                                        <li className="contact-detail-heading">GenieHut</li>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i><a href={"tel:"+this.state.sitephone}>{this.state.sitephone}</a></li>
                                        <li><i className="fa fa-envelope" aria-hidden="true"></i><a href={"mailto:"+this.state.siteemail}>{this.state.siteemail}</a></li>
                                    </ul>
                               </div>
                            </Col>
                        </Row>
                      </div>
                  </div>
                </div>
                {/*<div className="container-fluid">
                    <div className="row">
                        <div className="contact-map-inner">
                            Iframe Map Section
                        </div>
                    </div>
                </div>*/}
            </div>
            <Footer />
        </div>
        </>
    );
}else{
  return (<div><div className="loading loading_separate"></div></div>);
}
}
}

const mapStateTopProps = (state) => {
  return {
  cmspage: state.cmspage,
  mobilecountry : state.mobilecountry,
  contactus: state.contactus,
  ipaddress   : state.ip,
  sitesettings: state.sitesettings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCmsPage: (slug) => {
      dispatch({ type: GET_CMSPAGE, slug});
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
    getContactus: (formPayload) => {
      dispatch({ type: GET_CONTACTUS, formPayload});
    },
    getIpData: (ipaddress) => {
      dispatch({ type: GET_IPDATA, ipaddress});
    },
    getSiteSettings: (slug) => {
      dispatch({ type: GET_SITESETTINGS, slug});
    },

  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(ContactUs));
