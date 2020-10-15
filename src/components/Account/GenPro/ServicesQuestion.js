/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import SecondaryHeader from '../../Layout/SecondaryHeader';
import AddMyService from '../../../common/images/myservice-add.png';
import Profilebar from '../Profilebar';
import Genleftmenu from '../../Layout/Genleftmenu';
import ModalPopup from '../../Layout/ModalPopup';
import $ from 'jquery';
import cookie from 'react-cookies';
import { GET_SELECTRUNSERVICE, GET_PROSERVICEUPDATE } from '../../../actions';
import { appName } from "../../Config/Config";
import SuccessMsg from '../../../common/images/success-msg.png';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import { CheckAuth } from "../../Helpers/SettingHelper";

class Services extends Component {

	constructor(props) {
        CheckAuth();
		super(props);
        this.state = {
            activegc:'',
            activegp:'',
            activega:'enable',
            activegr:'enable',
            activegrd:'enable',
            enablevalue:'',
            enablepopup:'no',
            currentStep: 1,
		}    
	}
    componentDidMount(){
              
        this.props.getSelectrunService(cookie.load('UserAuthToken'),'GP');
        
         $(".custom_textarea").hide();
         $(".ctw-toggle").click(function(){
            
             if($('input.ctw-toggle').is(":checked")) {
                  $('input.ctw-toggle').parents(".check-text-wrap").find(".custom_textarea").slideDown();
              }
              else
              {
                  $('input.ctw-toggle').parents(".check-text-wrap").find(".custom_textarea").slideUp();
              }
         })

    } 
    handleChangeCheck  = (event) => {
        if(event.target.checked == ''){
              var qs = require('qs');
              var postObject = {
              "app_name": appName,
              "user_token" : cookie.load('UserAuthToken'),
              "services_id": event.target.value,
              "action": 'DISABLE',
              };
              this.setState({enablepopup: 'yes'}, function () { this.props.getProServiceUpdate(qs.stringify(postObject)); }.bind(this)); 
             this.setState({
                  checked: false
             }); 
        }else{
             var qs = require('qs');
              var postObject = {
              "app_name": appName,
              "user_token" : cookie.load('UserAuthToken'),
              "services_id": event.target.value,
              "action": 'ENABLE',
              };
              this.setState({enablepopup: 'yes'}, function () { this.props.getProServiceUpdate(qs.stringify(postObject)); }.bind(this)); 
              this.setState({
                checked: true
              }); 
        }
    }



handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = event => {
    event.preventDefault()
    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 3? 4: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }
  
  _search = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 3? 4: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn animate-btn2 btn_grey ab-none btn_sm" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <4){
    return (
      <button 
        className="btn animate-btn2 btn_green ab-none float-right btn_sm" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}

searchButton(){
  let currentStep = this.state.currentStep;
  if(currentStep >3){
    return (
      <button 
        className="btn animate-btn2 btn_green float-right btn_sm" 
        type="button" onClick={this._search}>
      Search
      </button>        
    )
  }
  return null;
}



render() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <div>
            <Header />
             <SecondaryHeader />
             <Profilebar />
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <Genleftmenu currentpage="GenPro" />
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
								<ul className="sdhmenu_tablist">
                                    <li>
										<Link to={"/edit-gen-pro"} title="GenPro Details">Details</Link>
                                    </li>
                                    <li className="active">
                                        <Link to={"/genpro-my-services"} title="My Services">My Services</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genpro-customer-leads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                    <li>
										<Link to={"/genpro-jobs"} title="Jobs">Jobs</Link>
                                    </li>
                                </ul>
                                
                                <Link to={"/edit-gen-pro"} className="sdhmenu_mtabtrigger" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genpro-my-services"} className="sdhmenu_mtabtrigger active" title="GenPro Details">My Services <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">
                                
                                
                                      <div className="pro-service-question-innerblock">
                                          <div className="pro-service-question-wrap">
                                              <div className="psf-progress-wrapper">
                                                  <div className="psf-progress-text"><span>50%</span> Completed</div>
                                                  <ProgressBar now="50" />
                                                  <div className="psf-progress-percent"><span>0%</span><span>100 %</span></div>
                                              </div>
                                              <div className="pro-service-question-form">
                                                  <form onSubmit={this.handleSubmit}>
                                                    <Step1 
                                                      currentStep={this.state.currentStep} 
                                                      handleChange={this.handleChange}
                                                      email={this.state.email}
                                                    />
                                                    <Step2 
                                                      currentStep={this.state.currentStep} 
                                                      handleChange={this.handleChange}
                                                      username={this.state.username}
                                                    />
                                                    <Step3 
                                                      currentStep={this.state.currentStep} 
                                                      handleChange={this.handleChange}
                                                      password={this.state.password}
                                                    />
                                                    <Step4 
                                                      currentStep={this.state.currentStep} 
                                                      handleChange={this.handleChange}
                                                      password={this.state.password}
                                                    />
                                                  </form>
                                              </div>
                                              <div className="pro-service-form-navs">
                                                {this.previousButton()}
                                                {this.nextButton()}
                                                {this.searchButton()}
                                              </div>
                                          </div>
                                      </div>

                                
                                </div>
                                <Link to={"/genpro-customer-leads"} className="sdhmenu_mtabtrigger" title="GenPro Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genpro-jobs"} className="sdhmenu_mtabtrigger" title="GenPro Details">Jobs <i className="fa fa-angle-down"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 
        </div>
    );
}
}

const mapStateTopProps = (state) => {
  return {
  selectrunservice: state.selectrunservice,
  updateproservices: state.updateproservices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       getSelectrunService: (usertoken,usertype) => {
        dispatch({ type: GET_SELECTRUNSERVICE, usertoken, usertype});
      },
       getProServiceUpdate: (formPayload) => {
      dispatch({ type: GET_PROSERVICEUPDATE, formPayload });
     },

  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
   <div className="service-step-box">
        <div className="form-group">
            <Row>
                <Col md={12}>
                  <label htmlFor="username">Profile Description <span className="required">*</span></label>
                  <textarea class="form-control"></textarea>
                </Col>
            </Row>
        </div>
   </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
   <div className="service-step-box">
        <div className="form-group">
            <Row>
                <Col md={12}>
                    <label htmlFor="username">What type of services do you need? <span className="required">*</span></label>
                    <div className="custom_checkbox">
                       <input type="checkbox" /><span>Human Resources</span>
                    </div>
                    <div className="custom_checkbox">
                       <input type="checkbox" /><span>Marketing</span>
                    </div>
                </Col>
            </Row>
        </div>
   </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
   <div className="service-step-box">
        <div className="form-group">
            <Row>
                <Col md={12}>
                      <label htmlFor="username">Profile photo (Subject to review)</label>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                      <input type="file" class="form-control" />
                </Col>
                <Col md={6}>
                      <input type="text" class="form-control" />
                </Col>
            </Row>
        </div>
   </div>
  );
}


function Step4(props) {
  if (props.currentStep !== 4) {
    return null
  } 
  return(
   <div className="service-step-box">
        <div className="form-group">
            <Row>
                <Col md={12}>
                    <label htmlFor="username">What type of services do you need? <span className="required">*</span></label>
                    <div class="check-text-wrap">
                        <div className="custom_checkbox">
                           <input type="checkbox" /><span>Human Resources</span>
                        </div>
                        <div className="custom_textarea">
                            <textarea class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="check-text-wrap">
                        <div className="custom_checkbox">
                           <input type="checkbox" /><span>Human Resources</span>
                        </div>
                        <div className="custom_textarea">
                            <textarea class="form-control"></textarea>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
   </div>
  );
}


export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Services));


