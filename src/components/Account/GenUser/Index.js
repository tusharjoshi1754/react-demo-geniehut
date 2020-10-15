/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import SecondaryHeader from '../../Layout/SecondaryHeader';
import ModalPopup from '../../Layout/ModalPopup';
import ChangeMobileNumber from '../../Layout/ChangeMobileNumber'
import Profilebar from '../Profilebar';
import Genleftmenu from '../../Layout/Genleftmenu';
import QnMarkDefault from '../../../common/images/qn_mark_default.png';
import cookie from 'react-cookies';

import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SuccessMsg from '../../../common/images/success-msg.png';

import { appName, landingUrl } from "../../Config/Config";
import { PageTitle, LoadingSec, scrollToTopValidate, CheckAuth, scrollToTop } from "../../Helpers/SettingHelper";
import { lang } from "../../Helpers/lang";
import { GET_IPDATA, GET_GENERALPROFILE, GET_USERPROFILE, GET_POSTALADDRESS, GET_POINTS} from '../../../actions';
var Parser = require('html-react-parser');
var QRCode = require('qrcode.react');
class Index extends Component {
  constructor(props) {
      CheckAuth();
      super(props);
      this.state = {
        user_mobile:'',
        user_fullname:'',
        user_nickname:'',
        user_email:'',
        selectedOption:'',
        selectedvalue:'',
        user_token: cookie.load('UserAuthToken'),
        user_dob:'',
        device_token:'',
        hearabout:'',
        selectedhear:'',
        selectedcode:'',
        selectregion:'',
        selectiso2:'',
        countrycode : '',
        emailchecked: true,
        phonechecked: true,
        smschecked: true,
        genmessagechecked: true,
        contactemail:'yes',
        contactphone:'yes',
        contactsms:'yes',
        contactgenmessage:'yes',
        enablevalue:'',      
        modalcc: false,
        user_url: '',
        progressperc :  '',
        qrcodevalue :'',
        user_postalcode:'',
        user_address:'',
        modalotppopup: false,
        modaldownloadapp: false,
        whatsappurl:'',
        fburl:'',
        twitterurl:'',
        instagramurl:'',
        wechaturl:'',
        skypeurl:'',
        linkedinurl:'',
        gmailurl:'',
        lineurl:'',
        reference_code:'',
        disclaimer:false,
        disclaimerState:'N',
        disabledrefmob: false,
        countrydetails:[],
        selectedCountry:'',
        countryvalue:'',
        errorusermobile:'',
        Loading:false,
        socilaLink:'',
        points:[],
        user_points:''
      }
      this.handleInputChange  = this.handleInputChange.bind(this);
      this.handleChangeDate   = this.handleChangeDate.bind(this);
      this.toggleMobileupdate = this.toggleMobileupdate.bind(this); 
      this.toggleMobileapp    = this.toggleMobileapp.bind(this); 
      this.convert = this.convert.bind(this);
      this.setselectedvalue = this.setselectedvalue.bind(this);
      
  }

  componentDidMount(){
      this.props.getUserProfile(cookie.load('UserAuthToken'));
      this.props.getPoints();
      document.title = PageTitle('Profile');
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
       if(Props.generalprofile !==this.props.generalprofile){
         this.setState({Loading:false});
         //scrollToTop();
         if(Props.generalprofile[0].status === "success"){
          const updatedata = Props.generalprofile[0].updatedata;

          this.setState({socilaLink:Props.generalprofile[0].shareurls});
          if(Props.generalprofile[0].url_key !== null){
            cookie.save("user_url", Props.generalprofile[0].url_key);
          }
          this.setState({progressperc:Props.generalprofile[0].progressperc});

          cookie.save("UserGender", Props.generalprofile[0]['updatedata'].user_gender);
          this.setState({selectedvalue: Props.generalprofile[0]['updatedata'].user_gender})
         
         if(Props.generalprofile[0].shortcode!=='' && Props.generalprofile[0].shortcode!== null){
            this.setState({selectiso2: Props.generalprofile[0].shortcode})
            cookie.save("selectiso2",Props.generalprofile[0].shortcode);
          }
          if(updatedata.user_points!=='' && updatedata.user_points!== null){
            this.setState({user_points: updatedata.user_points})
          }
          cookie.save("Hearabout",Props.generalprofile[0]['updatedata'].how_you_hear);
          if(updatedata.user_disclaimer==='Y') {
            this.setState({smschecked: false, phonechecked: false, emailchecked: false,genmessagechecked:false,  contactemail:'', contactphone:'', contactsms:'',contactgenmessage:'', disclaimerState: 'Y', disclaimer: true});
          }
          else {
           
            this.setState({
              contactemail: (updatedata.contactemail==="yes")?'yes':'',
              contactphone:(updatedata.contactphone==="yes")?'yes':'',
              contactsms:(updatedata.contactsms==="yes")?'yes':'',
              contactgenmessage:(updatedata.contactgenmessage==="yes")?'yes':'',
              smschecked: (updatedata.contactsms==="yes")?true:false,
              phonechecked: (updatedata.contactphone==="yes")?true:false,
              emailchecked: (updatedata.contactemail==="yes")?true:false,
              genmessagechecked: (updatedata.contactgenmessage==="yes")?true:false,
              disclaimerState:'N',
              disclaimer: false
            });
          }       
        
          $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
          $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
          $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>'+Props.generalprofile[0].message+'</p> ');
          }
       }
       if(Props.userprofile !== this.props.userprofile){
         if(Props.userprofile[0].status === 'success'){
           this.setState({socilaLink:Props.userprofile[0].shareurls});
            const formdata = Props.userprofile[0].result_user_set;
            if(formdata.user_disclaimer==='Y') {
              this.setState({smschecked: false, phonechecked: false, emailchecked: false,genmessagechecked:false, contactemail:'', contactphone:'', contactsms:'', contactgenmessage:'', disclaimerState: 'Y', disclaimer: true});
            }
            else {
              
              this.setState({
                contactemail: (formdata.contactemail==="yes")?'yes':'',
                contactphone:(formdata.contactphone==="yes")?'yes':'',
                contactsms:(formdata.contactsms==="yes")?'yes':'',
                contactgenmessage:(formdata.contactgenmessage==="yes")?'yes':'',
                smschecked: (formdata.contactsms==="yes")?true:false,
                phonechecked: (formdata.contactphone==="yes")?true:false,
                emailchecked: (formdata.contactemail==="yes")?true:false,
                genmessagechecked: (formdata.contactgenmessage==="yes")?true:false,
                disclaimerState:'N',
                disclaimer: false
              });
            }

            if(Props.userprofile[0].allcountry!== '' && Props.userprofile[0].allcountry!== null){
              this.setState({ countrydetails : Props.userprofile[0].allcountry})
            }
            if(Props.userprofile[0].selectpostalcn!== '' && Props.userprofile[0].selectpostalcn!== null){
              this.setselectedvalue(Props.userprofile[0].selectpostalcn)
              
            }
            if(Props.userprofile[0].selectpostalcn.length > 0){
            if(Props.userprofile[0].selectpostalcn[0].value!== '' && Props.userprofile[0].selectpostalcn[0].value!== null){
              this.setState({ selectedCountry : Props.userprofile[0].selectpostalcn[0]})
             }
           }
            
            if(formdata.user_fullname!==''){
                this.setState({ user_fullname : formdata.user_name})
            }
            if(formdata.user_nickname!==''){
                this.setState({ user_nickname : formdata.user_nickname})
            }
            if(formdata.user_email!==''){
                this.setState({ user_email : formdata.user_email})
            }
            if(formdata.user_mobile!==''){
                this.setState({ user_mobile : formdata.user_mobile})
            }

            if(formdata.user_points!==''){
                this.setState({ user_points : formdata.user_points})
            }
            if(formdata.device_token!=='' && formdata.device_token!==null){
                this.setState({ device_token : formdata.device_token})
            }
           /* if(formdata.user_country!=''){
              this.setState({ countrycode : formdata.user_country})
            }*/
            if(formdata.contactemail!== 'yes'){
                this.setState({ emailchecked : false})
                this.setState({ contactemail : ''})
            }else if(formdata.contactemail === 'yes'){
               this.setState({ emailchecked : true})
               this.setState({ contactemail : 'yes'})
            }


            if(formdata.contactphone!== 'yes'){
                this.setState({ phonechecked : false})
                this.setState({ contactphone : ''})
            }else if(formdata.contactphone === 'yes'){
               this.setState({ phonechecked : true})
               this.setState({ contactphone : 'yes'})
            }

            if(formdata.contactsms!== 'yes'){
                this.setState({ smschecked : false})
                this.setState({ contactsms : ''})
            }else if(formdata.contactsms === 'yes'){
               this.setState({ smschecked : true})
               this.setState({ contactsms : 'yes'})
            }

            if(formdata.reference_code!=='' && formdata.reference_code !== null){
              this.setState({ reference_code : formdata.reference_code })
            }
            if(formdata.url_key!=='' && formdata.url_key!==null){
               this.setState({ qrcodevalue : landingUrl+''+formdata.url_key})
               this.setState({ user_url : formdata.url_key })
            }else{
              this.setState({ user_url : '' })
            }
            if(formdata.user_gender !=='' && formdata.user_gender !== null){
              cookie.save('UserGender',formdata.user_gender)
              this.setState({selectedOption:{value: cookie.load('UserGender'), label: cookie.load('UserGender')}})
              this.setState({selectedvalue: formdata.user_gender})
            }
            if(formdata.user_address!==''){
              this.setState({user_address: formdata.user_address})
            }
            if(formdata.user_postalcode){
              this.setState({user_postalcode: formdata.user_postalcode})
            }
            if(Props.userprofile[0].shortcode!=='' && Props.userprofile[0].shortcode!== null){
              this.setState({selectiso2: Props.userprofile[0].shortcode})
              cookie.save("selectiso2",Props.userprofile[0].shortcode);
            }
            if(Props.userprofile[0].usercountryname!==''){
             cookie.save("countryname",Props.userprofile[0].usercountryname);
            }
           if(formdata.how_you_hear !=='' && formdata.how_you_hear!== null){
              cookie.save('Hearabout',formdata.how_you_hear)
              this.setState({hearabout:{value: cookie.load('Hearabout'), label: cookie.load('Hearabout')}})
            }
            if(Props.userprofile[0].progressperc){
              this.setState({ progressperc: Props.userprofile[0].progressperc })
            }
            if(formdata.user_dob!== '' && formdata.user_dob!== null && formdata.user_dob!== '0000-00-00'){

              var date = new Date(formdata.user_dob);
              var dates =date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
              cookie.save("setdate", dates);
              this.setState({ user_dob :  date})
            }
         }else if(Props.userprofile[0].status === 'authenticfailed'){
          cookie.remove("UserAuthToken");
                cookie.remove("login_user_type");
                cookie.remove("UserPoints");
                cookie.remove("UserMobile");
                cookie.remove("UserEmail");
                cookie.remove('UserFullname');
                cookie.remove('CountryCode');
            this.props.history.push('/logout');
         }
       }

      if(Props.postaladdress !== this.props.postaladdress){
        if(Props.postaladdress[0].status === 'success'){
          if(Props.postaladdress[0].result_set!==''){
            this.setState({ user_address: Props.postaladdress[0].result_set }, () => this.setAddress());
          }else{
             // this.setState({ user_address: ''});
          }
        }
      }
      if(Props.points !== this.props.points){
        this.setState({points:Props.points[0].result_set});
      }   
    }


  passedFunction = (flag) => {
    if(flag === 'yes'){
      this.props.getUserProfile(cookie.load('UserAuthToken'));
    }
  };
  toggleMobileupdate(){
   this.setState(prevState => ({
      modalotppopup: !prevState.modalotppopup
    }));
  }

  toggleMobileapp(){
  if(this.state.device_token==''){
   this.setState(prevState => ({
      modaldownloadapp : !prevState.modaldownloadapp
    }));
  }
  }
    
    handleChangeCheckemail  = (event) => {
     const {name, value} = event.target;
      this.setState({
          [name]: value
        }); 

      if(event.target.checked === true){
        this.setState({contactemail:'yes', disclaimerState: 'N', disclaimer: false})
      }
      else if(event.target.checked === false){
        this.setState({contactemail:''})
      }
           this.setState({emailchecked: !this.state.emailchecked});
    }

    handleChangeCheckphone  = (event) => {
       const {name, value} = event.target;
        this.setState({
            [name]: value
          }); 
      if(event.target.checked === true){
        this.setState({contactphone:'yes', disclaimerState: 'N', disclaimer: false})
      }
      else if(event.target.checked === false){
        this.setState({contactphone:''})
      }
       this.setState({phonechecked: !this.state.phonechecked});
   }

    handleChangeCheckgenmessage  = (event) => {
       const {name, value} = event.target;
        this.setState({
            [name]: value
          }); 
      if(event.target.checked === true){
        this.setState({contactgenmessage:'yes', disclaimerState: 'N', disclaimer: false})
        this.toggleMobileapp();
      }
      else if(event.target.checked === false){
        this.setState({contactgenmessage:''})
      }
       this.setState({genmessagechecked: !this.state.genmessagechecked});
   }


    handleChangeChecksms  = (event) => {
       const {name, value} = event.target;
        this.setState({
            [name]: value
          }); 
      if(event.target.checked === true){
        this.setState({contactsms:'yes', disclaimerState: 'N', disclaimer: false})
       
      }
      else if(event.target.checked === false){
        this.setState({contactsms:''})
     }
       this.setState({smschecked: !this.state.smschecked});
   }
    
  handlecheck =  (event) => {
    const {name, value} = event.target;
        this.setState({
            [name]: value
          }); 
      if(event.target.checked === true){
        this.setState({smschecked: false, phonechecked: false, emailchecked: false,genmessagechecked:false, contactemail:'', contactphone:'', contactsms:'',contactgenmessage:'', disclaimerState: 'Y'});
      }else if(event.target.checked === false){
        this.setState({smschecked: true, phonechecked: true, emailchecked: true,genmessagechecked:true, contactemail:'yes', contactphone:'yes', contactsms:'yes',contactgenmessage:'yes', disclaimerState: 'N'});
      }
    this.setState({disclaimer: !this.state.disclaimer});

  }

    handleInputChange(event) {
      const {name, value} = event.target;      
      if(name === 'user_postalcode' ){
        if(this.state.selectedCountry.value===154) {
        if(Object.keys(value).length > 4){
          var qs = require('qs');
            var postObject = {
            "app_name": appName,
            "postalcode": value
            };
          this.props.getPostalAddress(qs.stringify(postObject));
        }
      }
     }
      this.setState({
          [name]: value
        });
      
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
      this.setState({ selectedvalue : selectedOption.value });
      if(selectedOption.value !==''){
        $('.errorgender').html('');
      }
    };

    handleChangeCountry = selectedCountry => {
      this.setState({ selectedCountry });
      this.setState({ countryvalue : selectedCountry.value });
    }
    handlehearChange = hearabout => {
      this.setState({ hearabout });
      this.setState({ selectedhear : hearabout.value });
    };

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

  handleChangeTxt = (valid, event,object) => { 
    this.setState({countrycode: object.dialCode});
    this.setState({user_mobile :event });
   }

   /* for date picker */

    handleChangeDate(date) {
      this.setState({
        user_dob: date
      });
    }

   handleFormSubmit = () => {
    if(this.validateForm()){
      this.setState({Loading:true});
      const formPayload = this.state;
      var qs = require('qs');
      var gender = '';
      if(formPayload.selectedvalue === '' && formPayload.selectedvalue!== 0){
        gender =formPayload.selectedOption.value;
      }else{
        gender = formPayload.selectedvalue;
      }
      var hearvalue;
      if(formPayload.selectedhear === ''){
        hearvalue =formPayload.hearabout.value;
      }else{
        hearvalue = formPayload.selectedhear;
      }
      var countryvalue;
      if(formPayload.selectedCountry !== ''){
         countryvalue =formPayload.selectedCountry.value;
      }else{
        countryvalue =formPayload.countryvalue;
      }
      var ccode;
      if(this.state.countrycode!==''){
          ccode =this.state.countrycode;
      }else{
         ccode =formPayload.selectedcode;
      }
      var postObject = {
      "app_name": appName,
      "user_token": formPayload.user_token,
      "user_fullname": formPayload.user_fullname,
      "user_name": formPayload.user_nickname,
      "user_gender": gender,
      "user_email": formPayload.user_email,
      "user_mobile": formPayload.user_mobile,
      "user_country": ccode,
      "user_dob": formPayload.user_dob,
      "how_you_hear": hearvalue,
      "iso2": formPayload.selectregion,
      "contactemail":formPayload.contactemail,
      "contactphone":formPayload.contactphone,
      "contactsms":formPayload.contactsms,
      "contactgenmessage":formPayload.contactgenmessage,
      "user_postalcode": formPayload.user_postalcode,
      "user_address": formPayload.user_address,
      "user_disclaimer": formPayload.disclaimerState,
      "postal_country": countryvalue
      };
     this.props.getGeneralProfile(qs.stringify(postObject));
    }
  }
  validateForm(){
    const {user_mobile,user_fullname,selectedOption,  user_dob} = this.state;
    let error = 0;
    if(user_fullname==='') {
      this.setState({errorfullname:Parser('<span class="errorspan">Please enter full name</span>')});
      error++;
    }else {
      this.setState({errorfullname:''});
    }
    if(user_mobile==='') {
      this.setState({errorusermobile:Parser('<span class="errorspan">Please enter your mobile number</span>')});
      error++;
    }
    else {
      this.setState({errorusermobile:''});
    }
    if (selectedOption.value === undefined || selectedOption.value === '') {
      this.setState({errorgender:Parser('<span class="errorspan">Please Select Gender</span>')});
      error++;
    }
    else {
      this.setState({errorgender:''});
    }
    
    if(user_dob===''){
         this.setState({errordob:Parser('<span class="errorspan">Please select your birthday date</span>')});
         error++;
        }
        else {
          this.setState({errordob:''});
     }
   

    if(error>0) {
      setTimeout(function () {
			  scrollToTopValidate();
		  }, 100);
      return false;
    }
    else {
      return true;
    }
   
  }

  editform = (valid,inputphone,object,fullnumber)  => {
    this.setState({selectedcode : object.dialCode})
    this.setState({selectregion : object.iso2})
    let errors = {};
    let formIsValid = true;
    if(valid === false){
      formIsValid = false;
      $('.errorusermobile').html('<span className="errorspan">Please enter valid mobile number</span>');
    }else if(valid === true){
          $('.errorusermobile').html('');
    }
    this.setState({
      errors: errors
    });

    return formIsValid;
  }


  closepopup(){
     $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
     $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
  }

 
  
   setselectedvalue(selectsers){
    const countryArray = selectsers.map ((countryName, index) => ({
     id: index,
     name: countryName,
    }));
    // Dynamically create select list
    let selectedcountries = [];
    countryArray.map(item =>
    selectedcountries.push({ label: item.name.label, value: item.name.value }),
    );
    this.setState({selectedCountry : selectedcountries})
  }

setAddress(){
   //console.log(this.state.user_address)
}

 convert() {
  var date = new Date(this.state.user_dob);
  var dates =date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
  cookie.save("setdate", dates);
  this.setState({ user_dob :  date})

}

render() {

  const now = new Date();
  const bday = new Date(now.getFullYear() - 18, now.getMonth(), now.getDay());
  const countryArray = this.state.countrydetails.map ((countryName, index) => ({
    id: index,
    name: countryName,
  }));
  // Dynamically create select list
  let countries = [];
  countryArray.map(item =>
  countries.push({ label: item.name.label, value: item.name.value }),
  );

 const { selectedOption,hearabout, qrcodevalue, selectedCountry } = this.state;

 if(selectedOption.value === ''){
  this.setState({selectedOption : { value: '0', label: 'Select Gender' }})
 }


 if(hearabout.value === ''){
  this.setState({hearabout : { value: '0', label: 'Select' }})
 }
if(this.state.selectiso2 !== ''){ 

 return (
        <div>
            <Header userPoints={this.state.user_points}/>
            <SecondaryHeader />
           <Profilebar userPoints={this.state.user_points} />
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <Genleftmenu currentpage="GenUser" />
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                <div className="sdhmenu_content">
                                    <form className="form_sec">
                                        <div className="general-info-tab-wrapper">
                                            <div className="general-info-header">
                                                <div className="general-info-header-inner">
                                                <div className="gfh-flexbox-1">
                                                    <div className="gfh-flexbox1-text">
                                                            <div className="p-tag"><b>Referral Code</b>
                                                        <div className="tooltip_ico">
                                                            <ButtonToolbar>
                                                              {['bottom'].map(placement => (
                                                                <OverlayTrigger
                                                                  key={placement}
                                                                  placement={placement}
                                                                  overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                      Earn GH Points by sharing your referral code to your friends for new sign up
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                </OverlayTrigger>
                                                              ))}
                                                            </ButtonToolbar>
                                                        </div>: <span>{(this.state.reference_code).toUpperCase()}</span></div>
                                                            
                                                            <p><b>Share URL: </b><span><a href={landingUrl+""+this.state.user_url} target="_blank" rel="noopener noreferrer">{landingUrl+""+this.state.user_url}</a></span></p>
                                                            <div className="gfh-social-links">
                                                                <ul>
                                                                    <li className="description"><b>Share:</b></li>
                                                                    
                                                                   {(this.state.socilaLink.fb!=='' && typeof this.state.socilaLink.fb!=='undefined') &&
                                                                    <li><a href={this.state.socilaLink.fb} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                                   }
                                                                   {(this.state.socilaLink.twitter!=='' && typeof this.state.socilaLink.twitter!=='undefined') &&
                                                                    <li><a href={this.state.socilaLink.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                                    }
                                                                   {(this.state.socilaLink.linkedin!=='' && typeof this.state.socilaLink.linkedin!=='undefined') &&
                                                                    <li><a href={this.state.socilaLink.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                                     }
                                                                   {(this.state.socilaLink.whatsappp!=='' && typeof this.state.socilaLink.whatsappp!=='undefined') &&
                                                                    <li><a href={this.state.socilaLink.whatsappp} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                                     }
                                                                   {(this.state.socilaLink.skype!=='' && typeof this.state.socilaLink.skype!=='undefined') &&
                                                                    <li><a href={this.state.socilaLink.skype} target="_blank" rel="noopener noreferrer"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                                                                   }
                                                                </ul>
                                                                <p>Share your profile and get <span className="gfh-orange">{(this.state.points!=='' && this.state.points.SP!=='' && typeof this.state.points.SP!=='undefined')?this.state.points.SP:0} GH points</span></p>
                                                            </div>
                                                    </div>
                                                    <div className="gfh-flexbox1-img">
                                                         <QRCode value={qrcodevalue} />
                                                         <span>Scan and get profile URL</span>
                                                    </div>
                                                </div>
                                                <div className="gfh-flexbox-2 gfh-mb50">
                                                    <div className="gfh-progress-wrapper">
                                                        <div className="gfh-progress-bar">
                                                            <div className="gfh-progress-percent"><span>0%</span><span>100 %</span></div>
                                                            <ProgressBar now={this.state.progressperc} />
                                                            <div className="gfh-progress-update"><p>Updated <span>{this.state.progressperc} %</span></p></div>
                                                        </div>
                                                        {(this.state.progressperc<=99) &&
                                                          <p>Update General Profile detail 100% to get <span className="gfh-green">{(this.state.points!=='' && this.state.points.GCUPDATE!=='' && typeof this.state.points.GCUPDATE!=='undefined')?this.state.points.GCUPDATE:0} GH Points</span></p>
                                                        }
                                                        <p><b>Reminder:</b> Press “Update” button at the bottom of the page to save your input information before navigating to another page</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mandatory-box">
                                            <span>(*) fields are mandatory</span>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <label>Full Name <span className="required">*</span></label>
                                                    <input type="text" name="user_fullname" className="form-control" value={this.state.user_fullname} onChange={this.handleInputChange} autoComplete="off"/>
                                                    {this.state.errorfullname}
                                                </Col>
                                                <Col md={6}>
                                                    <label>Nick Name</label>
                                                    <input type="text" name="user_nickname" className="form-control" value={this.state.user_nickname} onChange={this.handleInputChange} autoComplete="off"/>
                                                    {/*<div className="errornickname"></div>*/}
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="label-tag">
                                                        Mobile Number <span className="required">*</span>
                                                    </div>
                                                    <div className="account-mobile-wrap">
                                                        <div className="account-mobileno">
                                                              <IntlTelInput className="form-control" name="user_mobile" 
                                                              id="user_mobile"
                                                              defaultCountry={this.state.selectiso2}
                                                              separateDialCode='true'
                                                              onPhoneNumberBlur={this.editform.bind(this)}
                                                              value={this.state.user_mobile}
                                                              onPhoneNumberChange={this.handleChangeTxt.bind(this)}
                                                              disabled={true}
                                                              />
                                                            <span className="account-mobileno-edit"><a href="javascript:void(0);" onClick={this.toggleMobileupdate}><i className="fa fa-pencil" aria-hidden="true"></i></a></span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label>Email Address</label>
                                                    <input type="email" className="form-control" name="user_email" value={this.state.user_email} onChange={this.handleInputChange} autoComplete="off"/>
                                                    <div className="erroremail"></div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <label>Gender <span className="required">*</span></label>
                                                    <div className="re_select">
                                                        <Select  options={lang.common.gender_option}  
                                                         value={selectedOption?selectedOption:{ value: '0', label: 'Select Gender' }}
                                                         onChange={this.handleChange}
                                                         placeholder="Select gender" />
                                                        {this.state.errorgender}
                                                    </div>
                                                </Col>
                                                <Col md={6}>                                                    
                                                    <label>Date of Birth <span className="required">*</span></label>
                                                      <DatePicker
                                                      placeholderText="select your DOB"
                                                      dateFormat="dd/MM/yyyy"
                                                      selected={this.state.user_dob}
                                                      className="form-control"
                                                      onChange={this.handleChangeDate}
                                                      maxDate={bday}
                                                      peekNextMonth
                                                      showMonthDropdown
                                                      showYearDropdown
                                                      dropdownMode="select"
                                                      />
                                                      {this.state.errordob}
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="form-group GH_flex_start">
                                            <Row>
                                              <Col md={6}>
                                                  <label> Country </label>
                                                    <div className="re_select">
                                                        <Select 
                                                         options={countries}  
                                                         value={selectedCountry?selectedCountry:{ value: '0', label: 'Select Country' }}
                                                         onChange={this.handleChangeCountry}
                                                         placeholder="Select country" />
                                                   
                                                    </div>
                                                    <label>Postal code</label>
                                                    <div className="account-mobile-wrap">
                                                        <div className="account-mobileno">
                                                               <input type="text" className="form-control" name="user_postalcode" value={this.state.user_postalcode} onChange={this.handleInputChange} autoComplete="off" maxLength="20" />
                                                               <div className="errorpostalcode"></div>
                                                        </div>
                                                    </div>
                                                    
                                                </Col>
                                               <Col md={6}>
                                                    <label>Address</label>
                                                    <textarea className="form-control" name="user_address" value={this.state.user_address} onChange={this.handleInputChange} autoComplete="off"></textarea>
                                                    <div className="erroraddress"></div>
                                                </Col>
                                                
                                            </Row>
                                        </div>
                                        <div className="form-group mb27">
                                            <Row>
                                                <Col md={6}>
                                                    <label>How did you hear about us?</label>
                                                    <div className="re_select">
                                                        <Select  options={lang.common.coming_source}
                                                         value={hearabout}
                                                         onChange={this.handlehearChange}/>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <h3 className="title5 mb17">Stay up to date / Unsubscribe</h3>
                                          <p>I consent to the use and disclosure of my personal information to Geniehut’s community and its 
                                          administrators for the following purposes:</p>
                                        <ul className="purpose_list">
                                            <li><i className="fa fa-angle-right" aria-hidden="true"></i> Send my contact number to the fellow GenUser when I use “Ask to call”</li>
                                            <li><i className="fa fa-angle-right" aria-hidden="true"></i> Receive marketing messages from Geniehut’s administrator</li>
                                        </ul>
                                        <div className="form-group mt20">
                                            <ul className="check_list purpose_check_list">
                                                <li>
                                                    <div className="custom_checkbox">
                                                         <input onChange={this.handleChangeChecksms.bind(this)} type="checkbox"  name="contactsms" checked={this.state.smschecked}/>
                                                           <span>Ask to call/sms</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom_checkbox">
                                                           <input onChange={this.handleChangeCheckemail.bind(this)} type="checkbox"  name="contactemail" checked={this.state.emailchecked}/>
                                                           <span>Email</span>
                                                    </div>
                                                </li>
                                                 <li>
                                                    <div className="custom_checkbox">
                                                           <input onChange={this.handleChangeCheckphone.bind(this)} type="checkbox"  name="contactphone" checked={this.state.phonechecked}/>
                                                           <span>Phone</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom_checkbox">
                                                           <input onChange={this.handleChangeCheckgenmessage.bind(this)} type="checkbox"  name="contactgenmessage" checked={this.state.genmessagechecked}/>
                                                           <span>Mobile App (Notification/GenMessage)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group mb27">
                                            <ul className="check_list">
                                                <li>
                                                    <div className="custom_checkbox">
                                                          <input type="checkbox"  name="user_disclaimer" checked={this.state.disclaimer} onChange={this.handlecheck.bind(this)} />
                                                           <span>I wish to UNSUBSCRIBE for future communication from the Geniehut's community. I understand that my contact number and review comments by other users will remain in the website.</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn_orange btn_minwid editprofile_submit animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }Update
                                              </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ModalPopup modal={this.state.modalotppopup} toggle={this.toggleMobileupdate} className="modal-width CMN_popup" title="Change Mobile Number" >
              <ChangeMobileNumber mobilenumber={this.state.user_mobile} passedFunction={this.passedFunction}/>
            </ModalPopup>

             <ModalPopup modal={this.state.modaldownloadapp} toggle={this.toggleMobileapp} className="modal-width CMN_popup" title="Install Geniehut app?" >
                <p className="geniehutapp_popup">if you enable GenMessage, should be install Geniehut App.</p>
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
  }else{
   return (
        <div>{LoadingSec}</div>
        )
  }

}
}
const mapStateTopProps = (state) => {
  return {
    ipaddress     : state.ip,
    points        : state.points,
    generalprofile: state.generalprofile,
    userprofile   : state.userprofile,
    postaladdress : state.postaladdress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
      dispatch({ type: GET_IPDATA, ipaddress});
    },
    getPoints: () =>{
       dispatch({ type: GET_POINTS});
    },
    getGeneralProfile: (formPayload) => {
      dispatch({ type: GET_GENERALPROFILE, formPayload});
    },
    getUserProfile: (usertoken) => {
      dispatch({ type: GET_USERPROFILE, usertoken});
    },
    getPostalAddress: (formPayload) =>{
       dispatch({ type: GET_POSTALADDRESS, formPayload});
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Index));
