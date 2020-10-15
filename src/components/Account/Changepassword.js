/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import SuccessMsg from '../../common/images/success-msg.png';
import ErrorMsg from '../../common/images/error-msg.png';
import { appName } from "../Config/Config";
import { GET_CHANGEPASSWORD } from '../../actions';
import { PageTitle, CheckAuth } from "../Helpers/SettingHelper";


class Changepassword extends Component {

    constructor(props) {
        CheckAuth();
        super(props);
        this.state = {showload: false}
        this.state = {
            current_password: '',
            user_password: '',
            user_confirm_password: '',
            user_token: cookie.load('UserAuthToken'),
            new_pass_type: 'password',
            confrim_pass_type: 'password',
            pass_show_hide_icon: 'shown',
            confirm_show_hide_icon: 'shown',
            errors: {}
        }
        
        this.handlechangepassFormSubmit = this.handlechangepassFormSubmit.bind(this);
        this.new_pass_show_hide = this.new_pass_show_hide.bind(this);
        this.confim_pass_show_hide = this.confim_pass_show_hide.bind(this);
        this.closepopup = this.closepopup.bind(this);
    }

    componentDidMount(){
        document.title = PageTitle('Change Password');
    }
      
   handleChangeTxt = (item, event) => {  
        this.setState({[item]:event.target.value }); 
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
    handlechangepassFormSubmit = () => {
        
        if(this.validateForm()) {
            
            this.setState(prevState => ({
                showload: !prevState.showload
            }));
            
            const formPayload = this.state;
            var qs = require('qs');
            var user_token = this.state.user_token; 
            var postObject = {
                "app_name": appName,
                "user_id": user_token,
                "current_password": formPayload.current_password,
                "user_password": formPayload.user_password,
                "user_cpassword": formPayload.user_confirm_password
            }; 
            $(".change-btn").addClass('loading loading_data'); 
            this.props.getChangePassword(qs.stringify(postObject));
        }
    }
  validateForm() {        
        const {current_password,user_password,user_confirm_password} = this.state;
        let formIsValid = true;
        if (!current_password) {
            formIsValid = false;
             $('.currentpaswd').html('<span class="errorspan">Please enter old password</span>');
        }else if(current_password){
            $('.currentpaswd').html('');
        }

        if (!user_password) {
            formIsValid = false;
             $('.userpswd').html('<span class="errorspan">Please enter new password</span>');
        }else if(user_password){
            $('.userpswd').html('');
        }
        
        if (!user_confirm_password) {
            formIsValid = false;
            $('.usercpswd').html('<span class="errorspan">Please enter confirm password</span>');
        }else if(user_confirm_password){
            $('.usercpswd').html('');
        }
        if(user_password !== user_confirm_password){
            formIsValid = false;
             $('.usercpswd').html('<span class="errorspan">Password does not match</span>');
        }
        $(".change-btn").removeClass('loading loading_data');
        return formIsValid;
    }
    closepopup(){
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
        if(cookie.load('changepassword')!== undefined && cookie.load('changepassword')!==''){
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

    componentWillReceiveProps(Props) {
        if(Object.keys(Props.changepassworddata).length > 0){
             if(Props.changepassworddata !== this.props.changepassworddata){
                if(Props.changepassworddata[0].status === "success"){
                    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'"alt="ErrorMsg" /></div><h2 class="title3">Success</h2><p>'+Props.changepassworddata[0].message+'</p>');
                        cookie.save("changepassword",'yes');
                }else{
                    $(".change-btn").removeClass('loading loading_data'); 
                    $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'"alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.changepassworddata[0].message+'</p>');
                }
             }
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
                                <h2 className="title4"><span>Change Password</span></h2>
                            </div>
                            <div>
                                <form>
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input type="password" className="form-control" name="current_password" id="current_password" placeholder="Enter old password"  value={this.state.current_password} onChange={this.handleChangeTxt.bind(this, 'current_password')}/>
                                        <div className="currentpaswd"></div>
                                    </div>
                                    <div className="form-group eye-pad">
                                        <label>New Password</label>
                                        <input type={this.state.new_pass_type}  name="user_password" placeholder="Enter new password" className="form-control" value={this.state.user_password} onChange={this.handleChangeTxt.bind(this, 'user_password')}/>
                                        <span toggle="#password-field" className={this.state.pass_show_hide_icon} onClick={this.new_pass_show_hide}><i className="fa fa-eye" aria-hidden="true"></i></span>
                                        <div className="userpswd"></div>
                                    </div>
                                    <div className="form-group eye-pad">
                                        <label>Confirm Password</label>
                                        <input type={this.state.confrim_pass_type} name="user_confirm_password" id="user_confirm_password" placeholder="Enter confirm password" className="form-control" value={this.state.user_confirm_password} onChange={this.handleChangeTxt.bind(this, 'user_confirm_password')}/>
                                        <span toggle="#password-field" className={this.state.confirm_show_hide_icon} onClick={this.confim_pass_show_hide}><i className="fa fa-eye" aria-hidden="true"></i></span>
                                        <div className="usercpswd"></div>
                                    </div>
                                    <div className="account-submit cp-account-submit">  
                                        <button className="btn btn_orange btn_minwid change-btn animate-btn2" type="button" onClick={this.handlechangepassFormSubmit.bind(this)}>Submit
                                        <span className={this.state.showload ? "show" : "hide"} id="load_icon"><b></b></span>
                                        </button>
                                        <a href="/edit-general-info"><button className="btn btn_grey btn_minwid change-btn animate-btn2" type="button" >Cancel
                                        </button>
                                        </a>
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
    changepassworddata: state.changepassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChangePassword: (formPayload) => {
      dispatch({ type: GET_CHANGEPASSWORD, formPayload });
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Changepassword));
