/* eslint-disable */
import React, { Component } from 'react';
import {Row, Col, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';
import $ from 'jquery';
import { appName } from "../Config/Config";

import { GET_IPDATA, GET_MOBILE_COUNTRY, GET_JOBAPPLIED} from '../../actions';
import {  emailValidate } from "../Helpers/SettingHelper";
import Parser from 'html-react-parser';


class ApplyNow extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            name: '',
            email: '',
            mobile:'',
            content:'',
            resume: [],
            resume_name: "",
            MobileValid:0,
            Loading : false,
            careertitle: this.props.careertitle,
            showcontactmsg:''
            };
      
        this.props.getMobileCountry();
        this.getipdetails();
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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


    componentWillReceiveProps(Props) {

     
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

             if(Props.jobapplied !==this.props.jobapplied){
                if(Props.jobapplied[0].status == 'success'){

                        this.setState({showcontactmsg:Parser('<span class="contactsuccessmsg"><p>'+Props.jobapplied[0].message+'</p></span>')})
                        setTimeout(() => {
                        this.setState({showcontactmsg:''})
                        },5000);

                }else if(Props.jobapplied[0].status == 'error'){
                     $('.errorresume').html('<span class="errorspan">Please upload CV as doc,docx,pdf only</span>');
                    this.setState({Loading:false})

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

    applyForm = (valid,inputphone,object,fullnumber)  => {
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

     handleChangeTxt = (valid, event,object) => {  
        this.setState({countrycode :object.dialCode });
        this.setState({mobile :event });
    }

     onChangeHandler=event=>{
        let reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            resume_name: file.name,
            resume: file
          });
        };

        reader.readAsDataURL(file);
    }

     handleSubmitForm = (e) => {
        e.preventDefault();
            if(this.validateForm()){
                
                const formPayload = this.state;
                var qs = require('qs');
                var postObject = {
                "name": formPayload.name,
                "mobile_no": formPayload.mobile,
                "user_country": formPayload.countrycode,
                "email": formPayload.email,
                "message": formPayload.content,
                "file": formPayload.resume, 
                "job_name": formPayload.careertitle
                };

                const config = {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
                };
             
                let formData = new FormData();
                for(let k in postObject) {
                formData.append(k, postObject[k]);
                }
                this.props.getJobapplied(formData,config);

                this.setState({name:'',email:'',content:'',mobile:''})

            }
     }

     validateForm() {
            
            const { name, email, mobile, content, resume_name} = this.state;
            
            let errors = {};
            let formIsValid = true;

            if (!name) {
                formIsValid = false;
                $('.errorusername').html('<span class="errorspan">Please enter your name</span>');
            }else if (name) {
                $('.errorusername').html('');
            }
            if (email!=='') {
                if(emailValidate(email)===false) {
                    formIsValid = false;
                    $('.erroremail').html('<span class="errorspan">Please enter your valid email address</span>');
                }else {
                    $('.erroremail').html('');
                }
                
            }
            if (!mobile) {
                formIsValid = false;
                $('.errorusermobile').html('<span class="errorspan">Please enter your mobile number</span>');
            }else if (mobile) {
                if(isNaN(mobile))
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

            if (!content) {
                formIsValid = false;
                $('.errorcontent').html('<span class="errorspan">Please fill the message</span>');
            }else if (content) {
                $('.errorcontent').html('');
            }

            if (!resume_name) {
                formIsValid = false;
                $('.errorresume').html('<span class="errorspan">Please upload your CV</span>');
            }else if (resume_name) {
                $('.errorresume').html('');
            }
            
            this.setState({
                errors: errors
            });
            return formIsValid;
        }



  render() {
  let defaultip  = this.state.clientip;
  if(this.state.countryList && defaultip != '') {
    return (
        <div>
            <div className="applynow-form-wrap">
                <div className="applynow-inner-form-wrap">
                     <form className="user_register" id="user_register" onSubmit={ (e) => this.handleSubmitForm(e)}>
                        <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Name <span className="required">*</span></label>
                                <input type="text" name="name"  tabindex="3" className="form-control" onChange={this.handleInputChange}  autoComplete="off"/>
                            </Col>
                        </Row>
                        <div className="errorusername"></div>
                        </div>
                        <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Email <span className="required">*</span></label>
                                <input type="email" name="email"  tabindex="3" className="form-control" onChange={this.handleInputChange}  autoComplete="off"/>
                            </Col>
                        </Row>
                        <div className="erroremail"></div>
                        </div>
                        <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Upload CV <span className="required">*</span> (docx, doc, pdf)</label>
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                            </Col>
                        </Row>
                        <div className="errorresume"></div>
                        </div>
                        <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Mobile Number <span className="required">*</span></label>
                                <div className="account-mobile-wrap">
                                          <IntlTelInput className="form-control" name="mobile" id="mobile"
                                                  defaultCountry={defaultip}
                                                  separateDialCode='true'
                                                  preferredCountries={this.state.countryList}
                                                  onPhoneNumberBlur={this.applyForm.bind(this)}
                                                  value={this.state.mobile}
                                                  onPhoneNumberChange={this.handleChangeTxt.bind(this)}

                                                 
                                             />
                                </div>
                            </Col>
                        </Row>
                        <div className="errorusermobile"></div>
                        </div>
                        <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Message <span className="required">*</span></label>
                                <textarea className="form-control" name="content" onChange={this.handleInputChange}  autoComplete="off"></textarea>
                            </Col>
                        </Row>
                        <div className="errorcontent"></div>
                        </div>
                        <div className="form-group txt-center mb0">
                        <button className="btn btn_orange btn_minwid animate-btn2 mt10" type="submit" disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                        <span className="load-data">Loading</span> 
                                        } Submit
                        </button>
                        </div>
                        <div className="successMsg">{this.state.showcontactmsg}</div>
                    </form>
                </div>
            </div>
        </div>
    );
   
  }else {
   return (<div><div className="loading loading-h-200"></div></div>);
  }
 }
}

const mapStateTopProps = (state) => {
  return {
    ipaddress       : state.ip,
    mobilecountry   : state.mobilecountry,
    jobapplied      : state.jobapplied
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
        dispatch({ type: GET_IPDATA, ipaddress});
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
   getJobapplied: (formPayload,config) => {
      dispatch({ type: GET_JOBAPPLIED, formPayload,config});
   },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(ApplyNow));

