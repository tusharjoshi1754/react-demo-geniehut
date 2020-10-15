/* eslint-disable */
import React, { Component } from 'react';
import {Modal, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import QnMarkDefault from '../../common/images/qn_mark_default.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';
import $ from 'jquery';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ModalPopup from '../Layout/ModalPopup';
import InfoContent from '../Layout/InfoContent';
import { lang } from '../Helpers/lang';
import ServiceCheck from '../../common/images/accounts/service_checkbox.png';
import GeneralUser from '../../common/images/accounts/generaluser.png';
import GeneralPro from '../../common/images/accounts/genpro.png';
import GeneralAgent from '../../common/images/accounts/genagent.png';
import GeneralRun from '../../common/images/accounts/genrun.png';
import GeneralUserActive from '../../common/images/accounts/generaluser_active.png';
import GeneralProActive from '../../common/images/accounts/genpro_active.png';
import GeneralAgentActive from '../../common/images/accounts/genagent_active.png';
import GeneralRunActive from '../../common/images/accounts/genrun_active.png';
import { appName, apiUrl, baseUrl, fbAppId } from "../Config/Config";
import { showAlert, showLoader, hideLoader, stripslashes, emailValidate, scrollToTopValidate } from "../Helpers/SettingHelper";
import { GET_IPDATA,GET_REGISTRATION, GET_MOBILE_COUNTRY} from '../../actions';

class Signup extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			infoRunType:'',
			user_fullname: '',	
			user_nickname: '',	
			user_email: '',
			user_mobile: '',	
			referral_mobile: '',
			referral_code: '',
			user_services: ['GC'],
			errors: {},
			countrycode:'',
			clientip:'',
			referralcountrycode:'',
			disabled: false,
			disabledrefmob: false,
			isChecked: true,
			countryList:[],
			MobileValid:0,
			RefMobileValid:0,
			Loading:false
		}		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.props.getMobileCountry();
		this.getipdetails();
		this.handleblurChange = this.handleblurChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}

	
  componentDidMount(){
		if(cookie.load('UserAuthToken')){
			window.location.href = "/";
		}
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

	informations = (e, infoRunType) => {
     e.preventDefault();
        this.setState({infoRunType:infoRunType, popupType:1, popuptitle:lang.info[infoRunType].title}, function() {
            this.toggleInfo();
        });
    }

    toggleInfo = toggleInfo => {
        this.setState(prevState => ({
        modalEnable: !prevState.modalEnable,
        }));
    }

	closepopup(){
				$('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");			
    }
    
   componentWillReceiveProps(Props) {

   	  if(Props.ipaddress !==this.props.ipaddress){
	        if(Props.ipaddress[0]!=''){
	        	this.setState({clientip :Props.ipaddress[0]});
	        } else {
	        	this.setState({clientip :'sg'});
	        }
	     }
			if(Props.registration !==this.props.registration){
				if(Props.registration[0].status === 'success'){
					this.setState({Loading:false})
					cookie.save("UserId", Props.registration[0].user_id);
					cookie.load("user_url", Props.registration[0].user_url);
					cookie.save('OTPSEND','yes');
					this.props.history.push('/otp');
				}else{
						$(".register_submit").removeClass('loading loading_data');
						$(".genie-msg-popup-wrapper").addClass("genie-popup-open");
						$('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-times-circle" ></i></div><p>'+Props.registration[0].form_error+'</p>');
						this.setState({Loading:false})

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
	handleSubmitForm = (e) => {
		e.preventDefault();
		if(this.validateForm()){
			const formPayload = this.state;
			var qs = require('qs');
			var postObject = {
			"app_name": appName,
			"user_fullname": formPayload.user_fullname,
			"user_mobile": formPayload.user_mobile,
			"user_country": formPayload.countrycode,
			"user_nickname": formPayload.user_nickname,
			"user_email": formPayload.user_email,
			"user_services": formPayload.user_services,
			"referral_mobile": formPayload.referral_mobile,	
			"referral_code": formPayload.referral_code,
			"referralcountrycode": formPayload.referralcountrycode
			};
			console.log("postObject:",qs.stringify(postObject))
			this.setState({Loading:true})
			this.props.getRegistration(qs.stringify(postObject));
		}
	}

   handleChangeTxt = (valid, event,object) => {  
		this.setState({countrycode :object.dialCode });
	    this.setState({user_mobile :event });
    }

    handlereferalTxt = (valid, event,object) => {  
    	if(event!=''){
    		this.setState({disabled :true });
    	}else if(event ==''){
    		this.setState({disabled :false });
    	}
		this.setState({referralcountrycode :object.dialCode });
	    this.setState({referral_mobile :event });
	    
    }

	registerForm = (valid,inputphone,object,fullnumber)  => {
		let errors = {};
      	let formIsValid = true;
		cookie.save('valid',valid);
		if(valid == false){
			formIsValid = false;
			this.setState({MobileValid:1});
			
			$('.errorusermobile').html('<span class="errorspan">Please enter valid mobile number</span>');
		}else if(valid == true){
          $('.errorusermobile').html('');
          this.setState({MobileValid:0});
		}

		return formIsValid;
	}
	
	referralmobile = (valid,inputphone,object,fullnumber)  => {
		let errors = {};
      	let formIsValid = true;

        if(inputphone == ''){
      		 $('.errorrefmobile').html('');
      	}else if(valid == false){
			formIsValid = false;
		
			this.setState({RefMobileValid:1});
			//$('.errorrefmobile').html('<span class="errorspan">Please enter valid mobile number</span>');
		}else if(valid == true){
          $('.errorrefmobile').html('');
          this.setState({RefMobileValid:0});
		}
		return formIsValid;
	}
	

	validateForm() {
		
		const { user_fullname, user_email, user_mobile,referral_mobile} = this.state;
		
		let errors = {};
      	let formIsValid = true;
      	if (!user_fullname) {
			formIsValid = false;
			$('.errorusername').html('<span class="errorspan">Please enter your full name</span>');
		}else if (user_fullname) {
			$('.errorusername').html('');
		}
		if (user_email!=='') {
			if(emailValidate(user_email)===false) {
				formIsValid = false;
				$('.erroremail').html('<span class="errorspan">Please enter your valid email address</span>');
			}else {
				$('.erroremail').html('');
			}
			
		}
		if (!user_mobile) {
			formIsValid = false;
			$('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
		}else if (user_mobile) {
			if(isNaN(user_mobile))
    		{
    			formIsValid = false;
				$('.errorusermobile').html('<span class="errorspan">Please enter your valid mobile number</span>');
			}
			else {
				if(this.state.MobileValid===1) {
					formIsValid = false;
					$('.errorusermobile').html('<span class="errorspan">Please enter your valid mobile number</span>');
				}
				else {
					$('.errorusermobile').html('');
				}

			 
			}
		}
		if (referral_mobile) {
			if(isNaN(referral_mobile))
    		{
    			formIsValid = false;
				$('.errorrefmobile').html('<span class="errorspan">Please enter your valid referral mobile number</span>');
			}
			else {
				if(this.state.RefMobileValid===1) {	
					formIsValid = false;
					$('.errorrefmobile').html('<span class="errorspan">Please enter your valid referral mobile number</span>');
				}
				else{
					$('.errorrefmobile').html('');
				}
			  
			}
		}
		/*if (typeof user_email !== "undefined") {
			//regular expression for email validation
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(user_email)) {
				formIsValid = false;
				$('.erroremail').html('<span class="errorspan">Please enter valid email address</span>');
			}else{
				$('.erroremail').html('');
			}
		}*/
		
		this.setState({
			errors: errors
		});
		$(".register_submit").removeClass('loading loading_data');
		 if(formIsValid===false) {
      if($('.errorspan').length>0) {
        scrollToTopValidate();
      }
      
    }
		return formIsValid;
	}
	
	handleInputChange(event) {
	  const {name, value} = event.target;
	  console.log("value and name:",this.state)
	  if(name == 'referral_code'){
		  this.setState({[name]: value});
			 if(Object.keys(this.state.referral_code).length > 1){
			 	this.setState({disabledrefmob :true });
			  }else if(Object.keys(this.state.referral_code).length == 1){
			  	this.setState({disabledrefmob :false });
			  }
	  }
	  this.setState({
        [name]: value
      });
      
    }

    handleblurChange(event){
    	const {name, value} = event.target;
    	 if(name == 'referral_code'){
		  this.setState({[name]: value});
			 if(Object.keys(this.state.referral_code).length > 1){
			 	this.setState({disabledrefmob :true });
			 	this.setState({classname : "form-control disabled"})
			  }else if(Object.keys(this.state.referral_code).length == 0){
			  	this.setState({disabledrefmob :false });
			  	this.setState({classname : "form-control"})
			  }
	   }
    }

   handleChangeCheck  = (event) => {
    var serviceArr = [...this.state.user_services];
	const value = event.target.value
	console.log("value:",event.target.value)
	const index = serviceArr.findIndex(user_services => user_services === value);
	if(index > -1) {
	serviceArr = [...serviceArr.slice(0, index), ...serviceArr.slice(index + 1)]
	} else {
	serviceArr.push(value);
	}
	this.setState({user_services: serviceArr});
   }


render() {
 let defaultip  = this.state.clientip;
//  defaultip = (defaultip != '') ?defaultip:'sg';
 if(this.state.countryList && defaultip != '' &&  Object.keys(this.state.countryList).length > 0) {

    return (
		<div className="sign-up-div">
			<Header />
			<div className="wrapper_out account_bg_wrap">
				<div className="container">
					<div className="account-wrapper">
						<div className="account-title-warpper">
							<h2 className="title4"><span>Registration</span></h2>
						</div>
						<div>
						 <form className="user_register" id="user_register" onSubmit={ (e) => this.handleSubmitForm(e)}>
								{/*<div className="account-services-wrapper">
								  <div className="form-group">
									<label>Select your services:</label>
									<div className="account-services-inner-wrapper">
										<div className="account-services-col">
										   <div className="services-inner-box">    
												<input type="checkbox" name="user_generaluser" value="GC" checked={this.state.isChecked}/>
												<label className="account-services-checkbox-label">
												<img src={ServiceCheck} alt="" className="service-checktik" />
												<span className="default-img"><img src={GeneralUser} alt="" /></span>
                                                <span className="active-img"><img src={GeneralUserActive} alt="" /></span>
												
												<span className="services-caption">GenUser</span>
												</label>
										   </div>
										</div>
										<div className="account-services-col">
										   <div className="services-inner-box"> 
												<input onClick={this.handleChangeCheck.bind(this)} type="checkbox"  name="user_generaluser" value="GP" />
												<label className="account-services-checkbox-label">
												<img src={ServiceCheck} alt="" className="service-checktik" />
												<span className="default-img"><img src={GeneralPro} alt="" /></span>
                                                <span className="active-img"><img src={GeneralProActive} alt="" /></span>
                                                <span className="services-caption">GenPro</span>
												</label>
										   </div>										   
											  <span className="service-alterlink">
											  How <a href="javascript:void(0);" onClick={ e => this.informations(e, 'pro') }>GenPro</a> works?
											  </span>
										</div>
										<div className="account-services-col">
										   <div className="services-inner-box">    
												<input type="checkbox" name="user_services" value="GR" onClick={this.handleChangeCheck.bind(this)}/>
												<label className="account-services-checkbox-label">
												<img src={ServiceCheck} alt="" className="service-checktik" />
												<span className="default-img"><img src={GeneralRun} alt="" /></span>
                                                <span className="active-img"><img src={GeneralRunActive} alt="" /></span>
                                                <span className="services-caption">GenRun</span>
												</label>
										   </div>
											  <span className="service-alterlink">
											  How <a href="javascript:void(0);" onClick={ e => this.informations(e, 'run') }>GenRun</a> works?
											  </span>
										</div>
										<div className="account-services-col">
										   <div className="services-inner-box">    
												<input type="checkbox" name="user_services" value="GA" onClick={this.handleChangeCheck.bind(this)}/>
												<label className="account-services-checkbox-label">
												<img src={ServiceCheck} alt="" className="service-checktik" />
												<span className="default-img"><img src={GeneralAgent} alt="" /></span>
                        <span className="active-img"><img src={GeneralAgentActive} alt="" /></span>
                        <span className="services-caption">GenProperty</span>
												</label>
										   </div>
											  <span className="service-alterlink">
											  How <a href="javascript:void(0);" onClick={ e => this.informations(e, 'property') }>GenProperty</a> works?
											  </span>
										</div>
									</div>
								   </div>
								</div>*/}
								<div className="form-group account-row">
									<div className="account-col-2">
										<label>Full Name <sup className="account-req">*</sup></label>
										<input type="text" name="user_fullname" className="form-control" tabindex="1" onChange={this.handleInputChange} autoComplete="off" />
										<div className="errorusername"></div>
									</div>
									<div className="account-col-2">
										<label>Nick Name    
											<div className="tooltip_ico">
													<ButtonToolbar>
														{['right'].map(placement => (
															<OverlayTrigger
																key={placement}
																placement={placement}
																overlay={
																	<Tooltip id={`tooltip-${placement}`}>
																		Nickname is used as a username for your profile
																	</Tooltip>
																}
															>
																<Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
															</OverlayTrigger>
														))}
													</ButtonToolbar>
											</div>
    								</label>
										<input type="text" name="user_nickname"  tabindex="2" className="form-control" onChange={this.handleInputChange}  autoComplete="off"/>
									</div>
								</div>
								<div className="form-group account-row">
									<div className="account-col-2">
										<label>Email Address</label>
										<input type="email" name="user_email"  tabindex="3" className="form-control" onChange={this.handleInputChange}  autoComplete="off"/>
										<div className="erroremail"></div>
									</div>
									<div className="account-col-2">
										<label>Mobile Number  <sup className="account-req">*</sup>
												<div className="tooltip_ico">
														<ButtonToolbar>
															{['right'].map(placement => (
																<OverlayTrigger
																	key={placement}
																	placement={placement}
																	overlay={
																		<Tooltip id={`tooltip-${placement}`}>
																			Mobile number is used in your login credentials
																		</Tooltip>
																	}
																>
																	<Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
																</OverlayTrigger>
															))}
														</ButtonToolbar>
												</div>
										</label>
										<div className="account-mobile-wrap">
											<div className="account-mobileno">
												<IntlTelInput className="form-control" name="user_mobile" id="user_mobile"
                          defaultCountry={defaultip}
												  separateDialCode='true'
												  onPhoneNumberBlur={this.registerForm.bind(this)}
												  value={this.state.user_mobile}
												  onPhoneNumberChange={this.handleChangeTxt.bind(this)}
												  preferredCountries={this.state.countryList}
											 />
												<div className="errorusermobile"></div>
											</div>
										</div>
									</div>
								</div>
								
								<div className="form-group account-row">
									<div className="account-col-2">
										<label>Referral Mobile Number 
											<div className="tooltip_ico">
													<ButtonToolbar>
														{['right'].map(placement => (
															<OverlayTrigger
																key={placement}
																placement={placement}
																overlay={
																	<Tooltip id={`tooltip-${placement}`}>
																		Give reference mobile number, get more points
																	</Tooltip>
																}
															>
																<Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
															</OverlayTrigger>
														))}
													</ButtonToolbar>
											</div>
										</label>
										<div className="account-mobile-wrap">
											<div className="account-mobileno">
												<IntlTelInput containerClassName="intl-tel-input" 
												  inputClassName={this.state.classname} 
												  name="referral_mobile"
												  defaultCountry={defaultip}
                         						  separateDialCode='true'
												  onPhoneNumberBlur={this.referralmobile.bind(this)}
												  value={this.state.referral_mobile}
												  onPhoneNumberChange={this.handlereferalTxt.bind(this)} 
												  disabled={this.state.disabledrefmob}
												  preferredCountries={this.state.countryList}
												/>
												<div className="errorrefmobile"></div>

											</div>
										</div>
									</div>
									<div className="account-col-2">
										<label>Referral Code 
											<div className="tooltip_ico">
													<ButtonToolbar>
														{['right'].map(placement => (
															<OverlayTrigger
																key={placement}
																placement={placement}
																overlay={
																	<Tooltip id={`tooltip-${placement}`}>
																			Give reference code, get more points
																	</Tooltip>
																}
															>
																<Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
															</OverlayTrigger>
														))}
													</ButtonToolbar>
											</div>
										</label>									
										<input type="text" name="referral_code" className="form-control" onBlur={this.handleblurChange} onChange={this.handleInputChange} disabled={this.state.disabled} />
									</div>
              				    <div className="or-divide">(or)</div>
								</div>
								<div className="account-disclaimer">
									<label>Disclaimer:</label>
									<div className="custom-control custom-checkbox"><input type="checkbox" id="custom-checkbox" className="custom-control-input" checked={this.state.isChecked}/> <label title="" type="checkbox" htmlFor="custom-checkbox" className="custom-control-label"><a href="http://geniehut.com/" target="_blank">Geniehut.com</a> is a free online community to connect between the users including our client (3rd party service provider). By proceeding with the registration, you agreed that you will not hold the website any form of responsibility or liabilities for the service performed by other users. Moreover, you authorize the sharing of your data other users as and when deem necessary by the Geniehut administrator unless you "Unsubscribe" after you login.</label>
									</div>
								</div>
								<div className="account-submit">
								<button className="btn btn_orange btn_minwid animate-btn2" type="submit" disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        } Sign Up
								</button>

								</div>
								<div className="account-alter-link">
									<p>Already have an account? <a href="/login">Login</a></p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		<ModalPopup modal={this.state.modalEnable} toggle={this.toggleInfo} className={(this.state.infoRunType=='how_geniehut_works_video')?'modal-width HowGenWorksVideo_popup':'modal-width Genpro_popup enable_popup'} title={this.state.popuptitle} >
				{this.state.popupType===1  &&
						<InfoContent pagename={this.state.infoRunType} />
				}
		</ModalPopup>
		<div className="genie-msg-popup-wrapper">
			<div className="genie-msg-popup-inner-wrapper">
			  <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
			<div className="genie-msg-popup-body"></div>
			</div>
		</div>
		
		
		</div>

    );
}else{
return (<div><div className="loading loading_separate"></div></div>);
}
}
}

const mapStateTopProps = (state) => {
  return {
		ipaddress			: state.ip,
		registration	: state.registration,
		mobilecountry	: state.mobilecountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
    	dispatch({ type: GET_IPDATA, ipaddress});
    },
    getRegistration: (formPayload) => {
      dispatch({ type: GET_REGISTRATION, formPayload });
    },
	getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
		
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Signup));

