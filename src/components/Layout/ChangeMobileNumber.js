import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import cookie from 'react-cookies';
import $ from 'jquery';
import { appName } from "../Config/Config";
import SuccessMsg from '../../common/images/success-msg.png';
import ErrorMsg from '../../common/images/error-msg.png';
import { isNumber } from "../Helpers/SettingHelper";
import { GET_IPDATA, GET_USERPROFILE, GET_MOBILEUPDATE, GET_CHANGEMOBILE, GET_MOBILE_COUNTRY } from '../../actions';
import Parser from 'html-react-parser';

class ChangeMobileNumber extends Component {
	constructor(props) {
		super(props);	
            this.state = {
              clientip:'',
              user_mobile: this.props.mobilenumber,
              old_mobile: this.props.mobilenumber,
              selectiso2:'',
              selectedcode:'',
              selectregion:'',
              countrycode:'',
              mobile_change_otp:'',
              validphone: '',
              mobileError:0,
              completeotp:0,
              enableOTPEnter:0,
              startsendOTP:0,
              resendTime:15,
              resendOTPTime:15,
              enableResend:0,
              startresendOTP:0,
              Loading:false,
              countryList:[],
              responsemsgotp:''
              }
          this.props.getMobileCountry();
          this.getipdetails();
          this.handleInputChange = this.handleInputChange.bind(this);
	  }

componentDidMount(){
    if(!cookie.load('UserAuthToken')){
      window.location.href = "/logout";
    }
}

 handleInputChange(event) {
    
      const {name, value} = event.target;

      this.setState({
          [name]: value
      });

    /* if(name === 'mobile_change_otp'){
       var regexPattern=new RegExp(/^[0-9-+]+$/);
       if(!regexPattern.test(value)){
          $('.errorotp').html('<span class="errorspan">Please enter valid number</span>');
       }else{
          $('.errorvendormobile').html('');
       }
    }*/
      
 }

 /*   closepopup(){
      $('.genie-close-btn').parents("#genie-popup").removeClass("genie-popup-open");
    }*/

    getipdetails =() => {
    $.getJSON("http://jsonip.com?callback=?", function (data) {
        cookie.save("ipaddress",data.ip);
    });

    var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "ipaddress": cookie.load('ipaddress')
      };
    this.props.getIpData(qs.stringify(postObject));

  }
 /* send otp */ 
sendotp = () => {
    if(this.validateForm()){

      const formPayload = this.state;
      var qs = require('qs');
       var ccode;
      if(this.state.countrycode!==''){
          ccode =this.state.countrycode;
      }else{
          ccode =formPayload.selectedcode;
      }

      var postObject = {
      "app_name": appName,
      "user_token": cookie.load('UserAuthToken'), 
      "user_mobile": formPayload.user_mobile,
      "country_code": ccode,
      "iso2": formPayload.selectregion,
      "action":'send_otp'
    };
    
    
      this.props.getMobileUpdate(qs.stringify(postObject));
    }

  }

  validateForm(){
    const {user_mobile, validphone} = this.state;
    let formIsValid = true;
    if (!user_mobile) {
      formIsValid = false;
      this.setState({mobileError:1});
      $('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
    }else if(user_mobile){
      this.setState({mobileError:0});
      $('.errorusermobile').html('');
    }

    if(validphone === false){
      formIsValid = false;
      this.setState({mobileError:1});
      $('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
    }else if(validphone === true){
      this.setState({mobileError:0});
      $('.errorusermobile').html('');
    }

     return formIsValid;
  }
/* change phone number */
 changemobilenumber = () => {
     if(this.validateotp()){

      const formPayload = this.state;
      var qs = require('qs');
      var ccode;
      if(this.state.countrycode!==''){
          ccode =this.state.countrycode;
      }else{
          ccode =formPayload.selectedcode;
      }

      var postObject = {
      "app_name": appName,
      "user_token": cookie.load('UserAuthToken'), 
      "user_mobile": formPayload.user_mobile,
      "country_code": ccode,
      "iso2": formPayload.selectregion,
      "otp": formPayload.mobile_change_otp
    };
    this.setState({Loading:true});
      this.props.getChangeMobile(qs.stringify(postObject));
    }
 }

   validateotp(){
    const {mobile_change_otp} = this.state;
    let formIsValid = true;
    if (!mobile_change_otp) {
      formIsValid = false;
      $('.errorotp').html('<span class="errorspan">Please enter your otp</span>');
    }else if(mobile_change_otp){
      $('.errorotp').html('');
    }
     return formIsValid;
  }

  

 componentWillReceiveProps(Props) {
     if(Props.ipaddress !==this.props.ipaddress){
        if(Props.ipaddress[0]!==''){
          this.setState({clientip :Props.ipaddress[0]});
        }
     }

     if(Props.userprofile !== this.props.userprofile){
         if(Props.userprofile[0].status === 'success'){
            const formdata = Props.userprofile[0].result_user_set;
            
            if(formdata.user_mobile!==''){
                this.setState({ user_mobile : formdata.user_mobile})
            }
            if(Props.userprofile[0].shortcode!==''){
             cookie.save("selectiso2",Props.userprofile[0].shortcode);
            }
         }
    }
    if(Props.mobileupdate !== this.props.mobileupdate){
        this.setState({Loading:false});
         if(Props.mobileupdate[0].status === 'success'){
          const current = this;
          if(this.state.startsendOTP===0) {
            this.setState({startsendOTP:1, enableOTPEnter:1});
            setInterval(function(){ 
               let resendTime = current.state.resendTime-1;
               if(resendTime===0){ current.setState({enableResend:1, }); }
               if(resendTime>0){ current.setState({resendTime:resendTime}) }
            }, 1000);
          }
          else if(this.state.startsendOTP===1 && this.state.startresendOTP===0) {
            this.setState({completeotp:1});
          }              
              setTimeout(() => {
                this.setState({responsemsgotp:Parser('<h5 class="msg-text text-center">'+Props.mobileupdate[0].message+'</h5>') });
              }, 1000)
        }else{
                setTimeout(() => {
                this.setState({responsemsgotp:Parser('<h5 class="msg-text text-center">'+Props.mobileupdate[0].message+'</h5>') });
              }, 1000)
          }

    }
     if(Props.changemobile !== this.props.changemobile){
  
         if(Props.changemobile[0].status === 'success'){
            $("#genie-popup").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>'+Props.changemobile[0].message+'</p> ');
            this.props.passedFunction('yes');
            cookie.save("UserMobile",Props.changemobile[0].mobilenumber);
                 
        }else{
          $("#genie-popup").addClass("genie-popup-open");
          $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'"alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.changemobile[0].message+'</p>');
          }

    }
    if(Props.mobilecountry !==this.props.mobilecountry){
      this.setState({mobilecountry:Props.mobilecountry[0].result_set}, function() {
        this.loadCountryList();
      });
    }

  }
  loadCountryList() {
		var country= [];
		this.state.mobilecountry.map(function(countries){
				return country.push(countries.short_code.toLowerCase());
		});
    this.setState({countryList:country});
	}

 handleChangeTxt = (valid, event,object) => { 
    this.setState({countrycode: object.dialCode});
    this.setState({user_mobile :event });
    this.setState({validphone: valid});
 }

editform = (valid,inputphone,object,fullnumber)  => {
    this.setState({validphone: valid});
    this.setState({selectedcode : object.dialCode})
    this.setState({selectregion : object.iso2})
    let errors = {};
    let formIsValid = true;
    if(valid === false){
      this.setState({mobileError:1});
      formIsValid = false;
      $('.errorusermobile').html('<span class="errorspan">Please enter valid mobile number</span>');
    }else if(valid === true){
     this.setState({mobileError:0});
     $('.errorusermobile').html('');
    }
    this.setState({
      errors: errors
    });

    return formIsValid;
  }

	 
  render() {
  const defaultip  = this.state.clientip;
   if(defaultip !== '') {
    return (
        <>
                <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="account-mobile-wrap SOP_Style">
                      <div className="account-mobileno">
                         <IntlTelInput className="form-control" name="user_mobile" id="user_mobile"
                                defaultCountry={cookie.load('selectiso2')?cookie.load('selectiso2'):defaultip}
                                separateDialCode='true'
                                onPhoneNumberBlur={this.editform.bind(this)}
                                value={this.state.user_mobile}
                                onPhoneNumberChange={this.handleChangeTxt.bind(this) }
                                preferredCountries={this.state.countryList}
                          />
                           {(this.state.old_mobile!==this.state.user_mobile && this.state.mobileError===0 && this.state.completeotp===0) &&
                              <span className="account-mobileno-edit">
                                {(this.state.enableResend===0 && this.state.startsendOTP===0) &&
                                  <button className="account-editsave-link" type="button" onClick={this.sendotp.bind(this)}  disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span class="load-data">Loading</span> 
                                        } Send OTP</button>
                                }
                                {(this.state.resendTime>0 && this.state.startsendOTP===1 && this.state.enableResend===0) &&
                                <button className="account-editsave-link" type="button" >{this.state.resendTime}</button>
                                }

                                {(this.state.enableResend===1 && this.state.startresendOTP===0) &&
                                  <button className="account-editsave-link" type="button" onClick={this.sendotp.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span class="load-data">Loading</span> 
                                        } Re-Send OTP</button>
                                }
                              </span>
                           }
                          <div className="errorusermobile"></div>
                      </div>
                    </div>
                </div>
                { (this.state.startsendOTP===1) &&
                <div className="form-group">
                  
                  <div>
                    <label>Enter OTP</label>
                    <input type="text" className="form-control" name="mobile_change_otp"  placeholder="Enter OTP"  value={this.state.mobile_change_otp} onChange={this.handleInputChange} maxLength="6" onKeyPress={(e) => isNumber(e)}  />
                    <div className="errorotp"></div>
                    </div>
                  
                </div>
                }
                    {(this.state.old_mobile!==this.state.user_mobile && this.state.completeotp===1) && <button className="btn btn_blue btn_minwid change-btn animate-btn2" onClick={this.changemobilenumber.bind(this)} type="button">Submit</button>}
                    {this.state.responsemsgotp}
          {/* <div className="genie-msg-popup-wrapper" id="genie-popup">
              <div className="genie-msg-popup-inner-wrapper">
                  <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                    <div className="genie-msg-popup-body">
                  </div>
                   <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
              </div>
            </div>*/}
        </>
    );
  }else{
    return (<div><div className="loading loading-h-200"></div></div>);
  }
  }
}

const mapStateTopProps = (state) => {
  return {
    ipaddress     : state.ip,
    userprofile   : state.userprofile,
    mobileupdate  : state.mobileupdate,
    changemobile  : state.changemobile,
    mobilecountry	: state.mobilecountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
      dispatch({ type: GET_IPDATA, ipaddress});
    },
    getUserProfile: (usertoken) => {
      dispatch({ type: GET_USERPROFILE, usertoken});
    },
    getMobileUpdate: (formPayload) => {
      dispatch({ type: GET_MOBILEUPDATE, formPayload});
    },
    getChangeMobile: (formPayload) => {
      dispatch({ type: GET_CHANGEMOBILE, formPayload});
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(ChangeMobileNumber));
