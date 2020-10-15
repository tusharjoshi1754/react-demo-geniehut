/* eslint-disable */
import React, { Component } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';
import $ from 'jquery';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import {  GET_IPDATA, GET_FORGETPASSWORD, GET_MOBILE_COUNTRY} from '../../actions';
import { appName } from "../Config/Config";

class Forgetpassword extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            user_mobile: '',
            password: '',       
            countrycode:'',
            logindata:'',
            clientip:'',
            errors: {}, 
            Loading:false,
        };
        this.props.getMobileCountry();
        this.getipdetails();
    }

    componentWillReceiveProps(Props) {
        if(Props.ipaddress !==this.props.ipaddress){
                if(Props.ipaddress[0]!=''){
                    this.setState({clientip :Props.ipaddress[0]});
                }
            }
        if(Object.keys(Props.forgetpassword).length > 0){
            this.setState({Loading:false});
            if(Props.forgetpassword !== this.props.forgetpassword){
                if(Props.forgetpassword[0].status === "success"){
                    $(".forget_submit").removeClass('loading loading_data');
                    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-check-circle" ></i></div><p>'+Props.forgetpassword[0].message+'</p>');
                    cookie.save('UserId',Props.forgetpassword[0].user_id)
                    this.props.history.push('/otp');
                }else{

                    $(".forget_submit").removeClass('loading loading_data');
                    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-times-circle" ></i></div><p>'+Props.forgetpassword[0].message+'</p>');
                }
            }
        }
        if(Props.mobilecountry !==this.props.mobilecountry){
            this.setState({mobilecountry:Props.mobilecountry[0].result_set}, function() {
                this.loadCountryList();
            });
        }
    }

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

    loginform = (valid,inputphone,object,fullnumber)  => {
        let errors = {};
        let formIsValid = true;
        if(valid == false){
            formIsValid = false;
            $('.errormobile').html('<span class="errorspan">Please Enter Valid Mobile Number</span>');
        }else{
            $('.errormobile').html('');
        }
        this.setState({
            errors: errors
        });

        return formIsValid;
    }
    handleChangeTxt = (valid, event,object) => {  
        this.setState({countrycode :object.dialCode });
        this.setState({user_mobile :event });
    }

    closepopup(){
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");            
    }
    
    loadCountryList() {
		var country= [];
		this.state.mobilecountry.map(function(countries){
				country.push(countries.short_code.toLowerCase());
		});
    this.setState({countryList:country});
	}
    handleforgetpassFormSubmit = () => {
        if(this.validateForm()){
            this.setState({Loading:true});
            const formPayload = this.state;
                var qs = require('qs');
                var postObject = {
                "app_name": appName,
                "user_mobile_number": formPayload.user_mobile,
                "user_country_code": formPayload.countrycode
                };
                $(".forget_submit").addClass('loading loading_data');
            this.props.getForgetPassword(qs.stringify(postObject));
        }
    }

    validateForm() {
        $('.errorvalid').removeClass('errorMsg');
        const {user_mobile} = this.state;        
        let errors = {};
        let formIsValid = true;
        if (!user_mobile) {
            formIsValid = false;
            $('.errormobile').html('<span class="errorspan">Please enter your mobile number.</span>');
        }else if (user_mobile) {
            $('.errormobile').html('');
        }
        
        this.setState({
            errors: errors
        });
        $(".forget_submit").removeClass('loading loading_data');
        return formIsValid;
    }

render() {
   const defaultip  = this.state.clientip;
   if(defaultip != '') {
    return (
        <div>
            <Header />
               <div className="wrapper_out account_bg_wrap">
                   <div className="container">
                        <div className="account-wrapper">
                            <div className="account-title-warpper">
                                <h2 className="title4"><span>Forgot Password</span></h2>
                            </div>
                            <div>
                                <form>
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
                                             <div className="errormobile"></div>
                                        </div>
                                    </div>
                                    <div className="account-submit">
                                        <button className="btn btn_orange btn_minwid forget_submit animate-btn2" onClick={this.handleforgetpassFormSubmit.bind(this)} type="button" disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        } Submit</button>	
                                    </div>
                                    <div className="account-backreset-wrap">
                                    <a href="/login"><i className="fa fa-angle-left" aria-hidden="true"></i> Back to Login</a>   
                                    </div>
                                </form> 
                            </div>
                        </div>
                   </div>
               </div>
            <Footer />
            <div className="genie-msg-popup-wrapper">
            <div className="genie-msg-popup-inner-wrapper">
                <a href="" onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                    <div className="genie-msg-popup-body">
                </div>
            </div>
        </div>
        </div>
    );
    }else {

return (<div className="loading loading_separate"></div>);

}
}
}

const mapStateTopProps = (state) => {
  return {
    ipaddress       : state.ip,
    forgetpassword  : state.forgetpassword,
    mobilecountry	: state.mobilecountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
        dispatch({ type: GET_IPDATA, ipaddress});
    },
    getForgetPassword: (formPayload) => {
        dispatch({ type: GET_FORGETPASSWORD, formPayload});
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Forgetpassword));
