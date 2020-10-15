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
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import SuccessMsgImg from '../../common/images/success-msg.png';
import ErrorMsgImg from '../../common/images/error-msg.png';
import QnMarkDefault from '../../common/images/qn_mark_default.png';

import AcocuntsFlag from '../../common/images/accounts/flag.png';

import { appName, apiUrl, baseUrl, fbAppId, Accessrunsearch } from "../Config/Config";

import { showAlert, showLoader, hideLoader, stripslashes, ClosePopup, removePopup } from "../Helpers/SettingHelper";


import { GET_LOGINDATA, GET_IPDATA, GET_MOBILE_COUNTRY, GET_RUNSEARCHLIST} from '../../actions';


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
			countryList:[],
			searchdata: (this.props.location.state && this.props.location.state.Searchformdata!=="" && typeof this.props.location.state.Searchformdata!=='undefined')?this.props.location.state.Searchformdata:'', 
			genprodata: (this.props.location.state && this.props.location.state.genprosearchdata!=="" && typeof this.props.location.state.genprosearchdata!=='undefined')?this.props.location.state.genprosearchdata:'', 
			quesFrm:  (this.props.location.state && this.props.location.state.quesFrm!=="" && typeof this.props.location.state.quesFrm!=='undefined')?this.props.location.state.quesFrm:'', 
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
		//console.log(object.dialCode)
		//this.setState({countrycode :object.dialCode });
	    this.setState({user_mobile :event });
    }

    handleChangePswd = (item, event) => {  
		this.setState({password :event.target.value }); 
		if(this.state.password){
			$('.errorpassword').html('');
		}
	}
	loginform = (valid,inputphone,object,fullnumber)  => {
		if(this.state.user_mobile!='') {
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
	}
	

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


	validateForm() {
		const {user_mobile,password} = this.state;
		let errors = {};
      	let formIsValid = true;
		$('.errorusermobile').html('');
		if (!user_mobile) {
		
			formIsValid = false;
			$('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
		}else if(user_mobile){		
			if(cookie.load('valid') == "false"){
				formIsValid = false;
				$('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
			}
			else {
				$('.errorusermobile').html('');
			}	  
		}
		
		if (!password) {
			formIsValid = false;
			$('.errorpassword').html('<span class="errorspan">Please enter your password</span>');
		}else if(password){
			$('.errorpassword').html('');
		}

		
		
		this.setState({
			errors: errors
		});

		$(".login_submit").removeClass('loading loading_data');
		return formIsValid;
    }

   
	componentDidMount(){		
		/*if(cookie.load('UserAuthToken')){
			window.location.href = "/";
		}*/
		removePopup();
	}

    componentWillReceiveProps(Props) {

		  if(Props.logindata !==this.props.logindata){
			  this.setState({Loading:false});
	        if(Props.logindata[0].status == "success"){
	        	this.setState({validmsg : Props.logindata[0].message }); 
		    	$(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsgImg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>'+Props.logindata[0].message+'</p> ');
				this.doLogin(Props.logindata[0]);
             	}else{
			  	this.setState({validmsg : Props.logindata[0].message }); 
	        	$(".login_submit").removeClass('loading loading_data');	
                $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
                $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsgImg+'"alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.logindata[0].message+'</p>');
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

		/* searchdata from form props*/
		 if(Props.runsearchlist !== this.props.runsearchlist){
           if(Props.runsearchlist[0].status==='success') {
            var resultset = Props.runsearchlist[0].result_set;
              if(Object.keys(resultset.genrun_list).length > 0){
                   this.props.history.push({ pathname: '/customer/search_list',state: { runserachlist: Props.runsearchlist[0].result_set }})
               }
           }else if(Props.runsearchlist[0].status==='authenticfailed'){
                 this.props.history.push('/logout');
           }else if(Props.runsearchlist[0].status==='error'){
	         this.props.history.push({pathname: '/customer/genrun/service/'+this.state.searchdata.service_id,state: { noresult: Props.runsearchlist[0].message } })
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
    doLogin(userdetails){
    	 $(".login_submit").removeClass('loading loading_data');
    	 $(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
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
			if(localStorage.getItem('Transdetailid')!=='' && localStorage.getItem('Transdetailid')!==null) {
				let transid = localStorage.getItem('Transdetailid');
				this.props.history.push('/genrun-customer-leads-detail/'+transid);
			}else if(this.state.searchdata !=='' && this.state.searchdata !=='undefined' && this.state.searchdata!==null){
						const formdata = this.props.location.state.Searchformdata;
						var qs = require('qs');    
						var postObject = {
						"app_name"         : appName,
						"user_token"       : cookie.load('UserAuthToken'),
						"service_id"       : formdata.service_id, 
						"service_desc"     : formdata.service_desc,
						"service_subtitle" : formdata.service_subtitle,
						"service_startdate": formdata.service_startdate,
						"service_enddate"  : formdata.service_enddate,
						"service_district" : formdata.service_district,
						"gender"           : formdata.gender,
						"fee"              : formdata.fee,
						"page"             : formdata.page,
						"action"           : 'add_lead'
						};
						this.props.getRunSearchList(qs.stringify(postObject));
						this.setState({Loading:true});
			
			}else if(this.state.genprodata !=='' && this.state.genprodata !=='undefined' && this.state.genprodata!==null){

						     let current = this;

							const searchdata = this.state.genprodata;


							var result = searchdata.split('&');

					        let formData = new FormData(); //formdata object

					         result.map((prodata, Index) => {
					         	let var1 = prodata.split("=");
					         	if(var1[0] == 'user_token'){
					         		formData.append(var1[0], cookie.load('UserAuthToken'));	
					         	}else{
					         		formData.append(decodeURI(var1[0]),$.trim(var1[1]));
					         	}
					         });

					        let frm1 = this.state.quesFrm;
							$.ajax({
							url: apiUrl + "genpro/searchgenpro",
							data: formData,
							cache: false,
							async: false,
							contentType: false,
							processData: false,
							dataType: "JSON",
							type: "POST",
							success: function(result, textStatus, jqXHR) {
							if (result.status === "success") {
							current.props.history.push({
							pathname: "/customer/pro-search-list",
							state: {
							runserachlist: result.data,
							questionFrm1: frm1
							}
							});
							}
							}
							});
			}else{
    	 		this.props.history.push('/edit-general-info');
    	    }
    	 }else{

    	 }
    }

render() {
 
  let defaultip  = this.state.clientip;
//  defaultip = (defaultip != '') ?defaultip:'sg';
 if(this.state.countryList && defaultip != '' &&  Object.keys(this.state.countryList).length > 0) {
	return (
		<div>
			<Header />
		<div className="wrapper_out account_bg_wrap">
           <div className="container">
                <div className="account-wrapper">
                    <div className="account-title-warpper">
                        <h2 className="title4"><span>Login</span></h2>
                        {/*<div className="account-subtitle-wrapper">
                        </div>*/}
                    </div>
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
								<button className="btn btn_orange btn_minwid login_submit animate-btn2" type="submit" disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        } Login
								</button>	
                            </div>
                            <div className="account-alter-link">
                                <p>Don't have an account? <a href="/signup">Sign Up for Free</a></p>
                            </div>
                        </form>
                    </div>
                </div>
           </div>
        </div>
		<Footer />
		<div className="genie-msg-popup-wrapper">
            <div className="genie-msg-popup-inner-wrapper">
                <a onClick={ClosePopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                	<div className="genie-msg-popup-body">
                </div>
                 <div onClick={ClosePopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
            </div>
        </div>
	</div>	

    );

}else {
return (<div><div className="loading loading_separate"></div></div>);
}
}
}

const mapStateTopProps = (state) => {
  return {
	logindata		: state.login ,
	ipaddress		: state.ip,
	mobilecountry	: state.mobilecountry,
	runsearchlist   : state.runsearchlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
	getLoginData: (formPayload) => {
      dispatch({ type: GET_LOGINDATA, formPayload });
    },
    getIpData: (ipaddress) => {
    	dispatch({ type: GET_IPDATA, ipaddress});
    },
	getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
    getRunSearchList: (formPayload) => {
      dispatch({ type: GET_RUNSEARCHLIST, formPayload});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Login));
