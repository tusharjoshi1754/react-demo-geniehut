/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import moment from 'moment';
import { appName, apiUrl, baseUrl, fbAppId } from "../Config/Config";
import { showAlert, showLoader, hideLoader, stripslashes } from "../Helpers/SettingHelper";
import { GET_SETPASSWORD, GET_LOGINDATA } from '../../actions';
class Setpassword extends Component {

constructor(props) {
    super(props);
    this.state = {
            user_password: '',
            user_confirm_password: '',
            user_id: cookie.load('UserId'),
            new_pass_type: 'password',
            confrim_pass_type: 'password',
            pass_show_hide_icon: 'shown',
            confirm_show_hide_icon: 'shown',
            errors: {},
            Loading: false,
        } 

        if(cookie.load('UserAuthToken')){
            window.location.href = "/";
        }

        this.handlechangepassFormSubmit = this.handlechangepassFormSubmit.bind(this);
        this.new_pass_show_hide = this.new_pass_show_hide.bind(this);
        this.confim_pass_show_hide = this.confim_pass_show_hide.bind(this);

    if(cookie.load('SETPASSWORD') == 'yes'){
    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
    $('.genie-msg-popup-body').html('<div class="state_img text-center"><i class="fa fa-check-circle" ></i></div><p>Please set Password</p>');
    }
}
  new_pass_show_hide = () => {
    this.setState({
         new_pass_type: this.state.new_pass_type === 'input' ? 'password' : 'input',
         pass_show_hide_icon: this.state.new_pass_type === 'input' ? 'shown' : 'hiden'
        });
    }
    
    confim_pass_show_hide = () => {
    this.setState({
         confrim_pass_type: this.state.confrim_pass_type === 'input' ? 'password' : 'input',
         confirm_show_hide_icon: this.state.confrim_pass_type === 'input' ? 'shown' : 'hiden'
        });
    }
      
    handleChangeTxt = (item, event) => {  
        this.setState({[item]:event.target.value }); 
    }


     handlechangepassFormSubmit = () => {
        if(this.validateForm()){
           const formPayload = this.state;
            var qs = require('qs');
            var user_id = this.state.user_id; 
            var postObject = {
                "app_name": appName,
                "user_id": user_id,
                "user_password": formPayload.user_password,
                "user_confirm_password": formPayload.user_confirm_password
            };
            this.setState({Loading: true})
            this.props.getSetPassword(qs.stringify(postObject));
        }
    }
    componentWillReceiveProps(Props) {
      this.setState({Loading: false})
        if(Object.keys(Props.setpassworddata).length > 0){
             if(Props.setpassworddata !== this.props.setpassworddata){
                if(Props.setpassworddata[0].status === "success"){
                      this.doLogin(Props.setpassworddata[0].user_details);
                }
             }
        }

        if(Props.logindata !==this.props.logindata){
          if(Props.logindata[0].status == "success"){
            this.SuccessLogin(Props.logindata[0]);
          }
       }

    }

    SuccessLogin(userdetails){
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
        this.props.history.push('/edit-general-info');
       }
    }

    doLogin(userdetails){
          const formPayload = userdetails;
          let countrycode = formPayload.user_country;
          var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_mobile": formPayload.user_mobile,
          "user_password": formPayload.user_password,
          "user_country": countrycode
          };
         this.props.getLoginData(qs.stringify(postObject));
    }
    validateForm() {
        
        const {user_password,user_confirm_password} = this.state;
        
        let errors = {};
        let formIsValid = true;

        if (!user_password) {
            formIsValid = false;
             $('.userpswd').html('<span class="errorspan">Please enter your password</span>');
        }else if(user_password){
            $('.userpswd').html('');
        }
        
        if (!user_confirm_password) {
            formIsValid = false;
            $('.usercpswd').html('<span class="errorspan">Please enter your confirm password</span>');
        }else if(user_confirm_password){
            $('.usercpswd').html('');
        }
        if(user_password != user_confirm_password){
            formIsValid = false;
             $('.usercpswd').html('<span class="errorspan">Password doesnot match</span>');
        }
        $(".setpswd_submit").removeClass('loading loading_data');
        return formIsValid;
    }
      closepopup(){

      
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      
      cookie.save("SETPASSWORD",'no');
    }


render() {

    return (
        <div>
            <Header />
               <div className="wrapper_out account_bg_wrap">
                   <div className="container">
                        <div className="account-wrapper">
                            <div className="account-title-warpper">
                                <h2 className="title4"><span>Change Password</span></h2>
                            </div>
                            <div>
                                <form>
                                    <div className="form-group right-icon-padding">
                                        <label>New Password</label>
                                            <input type={this.state.new_pass_type} className="form-control" name="user_password" id="user_password" placeholder="Enter your password" value={this.state.user_password} onChange={this.handleChangeTxt.bind(this, 'user_password')}/>
                                                 <span toggle="#password-field" className={this.state.pass_show_hide_icon} onClick={this.new_pass_show_hide}><i className="fa fa-eye" aria-hidden="true"></i></span>
                                                 <div className="userpswd"></div>
                                    </div>
                                    <div className="form-group right-icon-padding">
                                        <label>Confirm Password</label>
                                        <input type={this.state.confrim_pass_type}  name="user_confirm_password" id="user_confirm_password" placeholder="Enter confirm password" className="form-control required" value={this.state.user_confirm_password} onChange={this.handleChangeTxt.bind(this, 'user_confirm_password')}/>
                                         <span toggle="#password-field" className={this.state.confirm_show_hide_icon} onClick={this.confim_pass_show_hide}><i className="fa fa-eye" aria-hidden="true"></i></span>
                                          <div className="usercpswd"></div>
                                    </div>
                                    <div className="account-submit">
                                        <button className="btn btn_orange btn_minwid animate-btn2" type="button" onClick={this.handlechangepassFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}>{this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }Submit
                                        </button>    
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
                 <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
            </div>
        </div>
        </div>
    );
}
}
const mapStateTopProps = (state) => {
  return {
    logindata: state.login,
    setpassworddata: state.setpassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginData: (formPayload) => {
      dispatch({ type: GET_LOGINDATA, formPayload });
    },
    getSetPassword: (formPayload) => {
      dispatch({ type: GET_SETPASSWORD, formPayload });
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Setpassword));