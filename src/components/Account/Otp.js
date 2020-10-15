/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { appName, apiUrl, baseUrl, fbAppId } from "../Config/Config";
import { isNumber } from "../Helpers/SettingHelper";


import { showAlert, showLoader, hideLoader, stripslashes } from "../Helpers/SettingHelper";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

import { GET_RESENDOTP, GET_IPDATA, GET_OTP} from '../../actions';

class Otp extends Component {

constructor(props) {
    super(props);
    this.state = {  
        user_otp: '',
        user_id:cookie.load('UserId'),
        errors: {},
        textinput : 'Edit',
        Loading:false
    };  
    this.getcounter();
    $('.resendotp').hide();
    this.handleotpFormSubmit = this.handleotpFormSubmit.bind(this);
}
getcounter(){
        $('.resendotp').hide();
        let timeleft = 15;
        const downloadTimer = setInterval(function(){
        $('.resendotp').hide();
        let timersec = "You can resend OTP in "+timeleft + " seconds remaining"
        $(".countdown").html(timersec);
        timeleft -= 1;
        if(timeleft <= 0){
        clearInterval(downloadTimer);
        $(".countdown").hide();
        $('.resendotp').show();
        }
        }, 1000);
}

handleResendotp = () => {
        
        var qs = require('qs');
        var user_id = this.state.user_id; 
        var postObject = {
            "app_name": appName,
            "user_id": user_id,
        };
        this.props.getResendotpData(qs.stringify(postObject));
    }

handleChangeTxt = (item, event) => {  
        this.setState({[item]:event.target.value}); 
 }
  closepopup(){

      
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      
      cookie.save("OTPSEND",'no');
    }

 componentWillReceiveProps(Props) {
  if(Object.keys(Props.resendotpdata).length > 0){
     if(Props.resendotpdata !== this.props.resendotpdata){
       if(Props.resendotpdata[0].status === "success"){
             $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-check-circle" ></i></div><p>'+Props.resendotpdata[0].message+'</p>');   
       }
       else{
              $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
               $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-times-circle" ></i></div><p>'+Props.resendotpdata[0].form_error+'</p>'); 
       }
    }
   }

    if(Object.keys(Props.otpdata).length > 0){
         if(Props.otpdata !== this.props.otpdata){
                if(Props.otpdata[0].status === "success"){
                    this.setState({Loading:true})
                    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-check-circle" ></i></div><p>'+Props.otpdata[0].message+'</p>');   
                      this.props.history.push('/setpassword');
                } else{
              $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
               $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-times-circle" ></i></div><p>'+Props.otpdata[0].form_error+'</p>'); 
          }
        }
    }
 }

 handleotpFormSubmit = (e) => {
  e.preventDefault();
        if(this.validateForm()){
            const formPayload = this.state;
            var qs = require('qs');
            var user_id = this.state.user_id; 
            var postObject = {
                "app_name": appName,
                "user_id": user_id,
                "user_otp": formPayload.user_otp,
            };
            this.setState({Loading:true})
			this.props.getOtpData(qs.stringify(postObject));
       }
    }
    
    validateForm() {
        
        const {user_otp} = this.state;
        
        let errors = {};
        let formIsValid = true;

        if (!user_otp) {
            formIsValid = false;
            $('.erroruserotp').html('<span class="errorspan">Please enter your OTP</span>');
        }else if(user_otp){
             $('.erroruserotp').html('');
        }

        return formIsValid;
    }
ComponentDidMount(){
    $('.resendotp').hide();
       if(cookie.load('OTPSEND') == 'yes'){
       $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
       $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-check-circle" ></i></div><p>Otp Send to your registered Mobile Number</p>');
    }
}
render() {
 
    return (
        <div>
            <Header />
                  <div className="wrapper_out account_bg_wrap">
                   <div className="container">
                        <div className="account-wrapper">
                            <div className="account-title-warpper">
                                <h2 className="title4"><span>OTP</span></h2>
                            </div>
                            <div>
                                <form onSubmit={ (e) => this.handleotpFormSubmit(e)}>
                                     <div className="form-group">
                                        <label>Please provide the OTP below</label>
                                        <input type="text" name="user_otp" id="user_otp" placeholder="Enter your otp number" className="form-control" value={this.state.user_otp} onChange={this.handleChangeTxt.bind(this, 'user_otp')} maxLength="6" onKeyPress={(e) => isNumber(e)}  />
                                        <div className="erroruserotp"></div>            
                                    </div>
                                    <div className="account-submit">

                                        <button className="btn btn_orange btn_minwid animate-btn2" type="submit" disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        } Verify
                                      </button>

                                    </div>
                                    <div className="countdown"></div>
                                    <div className="account-alter-link resendotp">
                                        <p>Don't recieved OTP? <a onClick={this.handleResendotp.bind(this)}>Resend the OTP</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                   </div>
               </div>
            <Footer />
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
    resendotpdata: state.resendotp ,
    ipaddress: state.ip,
    otpdata: state.otp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResendotpData: (formPayload) => {
      dispatch({ type: GET_RESENDOTP, formPayload });
    },
     getOtpData: (formPayload) => {
      dispatch({ type: GET_OTP, formPayload });
    },
    getIpData: (ipaddress) => {
        dispatch({ type: GET_IPDATA, ipaddress});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Otp));
