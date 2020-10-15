/* eslint-disable */
import React, { Component } from 'react';
import {OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';
import $ from 'jquery';
import {Modal} from 'react-bootstrap';
import moment from 'moment';
import Footer from '../Layout/Footer';
import SuccessMsg from '../../common/images/success-msg.png';
//import ErrorMsg from '../../common/images/error-msg.png';
import { appName, apiUrl, baseUrl, fbAppId, Accessrunsearch } from "../Config/Config";
import { showAlert, showLoader, hideLoader, stripslashes } from "../Helpers/SettingHelper";
import { GET_LOGINDATA, GET_IPDATA, GET_MOBILE_COUNTRY} from '../../actions';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {	
			user_mobile: '',
			password: '',		
			countrycode:'',
			logindata:'',
			clientip:'',
			errors: {},	
			errorhideshow: 'none',
			selectedcode:'',
			accessrunsearch: Accessrunsearch,
			Loading:false,
            errorMsg:'',
            countryList:[],
		};
		cookie.save('Registered','');
		this.props.getMobileCountry();
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

	handleChangeTxt = (valid, event,object) => {  
		//this.setState({countrycode :object.dialCode });
	    this.setState({user_mobile :event });
    }

    handleChangePswd = (item, event) => {  
		this.setState({password :event.target.value }); 
		if(this.state.password){
			$('.errorpassword').html('');
		}
	}

  /* Country Code Validation */
	loginform = (valid,inputphone,object,fullnumber)  => {
		this.setState({selectedcode : object.dialCode})
		let errors = {};
      	let formIsValid = true;
      	cookie.save('valid',valid);
		if(valid == false){
			formIsValid = false;
			$('.errorusermobile').html('<span class="errorspan">Please enter valid mobile number</span>');
		}else if(valid == true){
          $('.errorusermobile').html('');
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	}
  /* Login Form Submit */
	 handleFormSubmit = () => {
		if(this.validateForm()){
			this.setState({Loading:true});
			const formPayload = this.state;
			if(this.state.countrycode!=''){
			var ccode =this.state.countrycode;
			}else{
			var ccode =formPayload.selectedcode;
			}
			var qs = require('qs');
			var postObject = {
			"app_name": appName,
			"user_mobile": formPayload.user_mobile,
			"user_password": formPayload.password,
			"user_country": ccode
			};
			$(".login_submit").addClass('loading loading_data');
			this.props.getLoginData(qs.stringify(postObject));
		}
	}

  /* Validate Login Form */
	validateForm() {
		const {user_mobile,password} = this.state;
		let errors = {};
      	let formIsValid = true;
		if (!user_mobile) {
			formIsValid = false;
			$('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
		}else if(user_mobile){
		  $('.errorusermobile').html('');
		}
		
		
		if (!password) {
			formIsValid = false;
			$('.errorpassword').html('<span class="errorspan">Please enter your password</span>');
		}else if(password){
			$('.errorpassword').html('');
		}

		if(cookie.load('valid') == "false"){
			formIsValid = false;
			$('.errorusermobile').html('<span class="errorspan">Please Enter valid mobie number</span>');
		}
		this.setState({
			errors: errors
		});

		$(".login_submit").removeClass('loading loading_data');
		return formIsValid;
    }

   
	componentDidMount(){
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
		  if(Props.logindata !==this.props.logindata){
			  this.setState({Loading:false});
	        if(Props.logindata[0].status == "success"){
					this.setState({errorMsg : '' });
					this.doLogin(Props.logindata[0]);
					this.props.toggle();
			    }else{
			  	this.setState({errorMsg : Props.logindata[0].message }); 
	        }
	     }
	     if(Props.ipaddress !==this.props.ipaddress){
	        if(Props.ipaddress[0]!=''){
	        	this.setState({clientip :Props.ipaddress[0]});
	        } else {
	        	this.setState({clientip :'sg'});
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
				country.push(countries.short_code.toLowerCase());
		});
    	this.setState({countryList:country});
	}
    doLogin(userdetails){
      
    	 if (userdetails.status === "success") {
    	 	cookie.save("CountryCode", userdetails.result_set.user_country, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("UserPoints",userdetails.result_set.user_points, { expires: new Date(moment().add(180, 'm').format()) });
    	 	//cookie.save("UserAuthToken",userdetails.result_set.token, { maxAge: 1800 });
    	 	cookie.save("UserAuthToken", userdetails.result_set.token, { expires: new Date(moment().add(180, 'm').format()) })
    	 	cookie.save("login_user_type",userdetails.login_user_type, { expires: new Date(moment().add(180, 'm').format()) }); 
    	 	cookie.save("Userverify",userdetails.result_set.user_verify, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("reference_code",userdetails.result_set.reference_code, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("shortcode",userdetails.result_set.shortcode, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("UserFullname",userdetails.result_set.user_name, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("UserMobile",userdetails.result_set.user_mobile, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("UserNickname",userdetails.result_set.user_nickname, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("countryname",userdetails.result_set.usercountryname, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("Gcnotifycount",userdetails.notificationcount, { expires: new Date(moment().add(180, 'm').format()) });
    	 	cookie.save("GPtotal",userdetails.usertypetotal, { expires: new Date(moment().add(180, 'm').format()) })
            this.props.loginresponse(userdetails.result_set.token, userdetails.result_set.user_name);
    	 }
    }

    render() {
    
      let defaultip  = this.state.clientip;
      //  defaultip = (defaultip != '') ?defaultip:'sg';
      if(defaultip != '' && this.state.countryList) {
        return (
          <div>
          <div className="wrapper_out account_bg_wrap">
                <div className="container">
                      <div className="account-wrapper">
                          <div>
                              <form className="login" id="login" onSubmit={ e => { this.handleFormSubmit(this); e.preventDefault(); }}>
                                  <div className="form-group">
                                      <label>Mobile Number</label>
                                      <div className="account-mobile-wrap">
                                          <IntlTelInput className="form-control" name="user_mobile" id="user_mobile"
                                                        defaultCountry={defaultip}
                                                  separateDialCode='true'
                                                  onPhoneNumberBlur={this.loginform.bind(this)}
                                                  value={this.state.user_mobile}
                                                  onPhoneNumberChange={this.handleChangeTxt.bind(this)}
                                                  preferredCountries={this.state.countryList}
                                            />
                                          <div className="errorusermobile"></div>
                                      </div>
                                  </div>
                                  <div className="form-group">
                                      <label>Password</label>
                                      <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleChangePswd.bind(this, 'password')} />
                                      <div className="errorpassword"></div>
                                  </div>
                                  <div className="account-forgot-psw">
                                      <a href="/forgot-password">Forgot Password?</a>
                                  </div>
                                  <div className="account-submit">
                                    <button className="btn btn_orange btn_minwid login_submit animate-btn2" type="submit"  disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                      <span className="load-data">Loading</span> 
                                              } Login
                                    </button>
                                  </div>
                                  {this.state.errorMsg}
                                  <div className="account-alter-link">
                                      <p>Don't have an account? <a href="/signup">Sign Up for Free</a></p>
                                  </div>
                              </form>
                          </div>
                      </div>
                </div>
              </div>
          </div>
          );

      }else {
        return (
          <div>
           <div className="wrapper_out account_bg_wrap">
                <div className="container">
                      <div className="account-wrapper">
                        <div className="loading loading_separate"></div>
                      </div>
                </div>
            </div>
        </div>);
      }
    }
}

const mapStateTopProps = (state) => {
  return {
	logindata: state.login ,
	ipaddress: state.ip,
	mobilecountry	: state.mobilecountry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
	getLoginData: (formPayload) => {
      dispatch({ type: GET_LOGINDATA, formPayload });
    },

	getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
    getIpData: (ipaddress) => {
    	dispatch({ type: GET_IPDATA, ipaddress});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Login));
