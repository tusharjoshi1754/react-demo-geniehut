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
import GenProAddservice from '../../Account/GenProAddservice';
import noimgserv from "../../../common/images/provider.jpeg";
import Questions from './Questions';
import $ from 'jquery';
import cookie from 'react-cookies';
import { GET_SELECTRUNSERVICE, GET_PROSERVICEUPDATE } from '../../../actions';
import { appName, serviceImage, servicemediaImage } from "../../Config/Config";
import SuccessMsg from '../../../common/images/success-msg.png';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import { CheckAuth, LoadImage, LoadingSec } from "../../Helpers/SettingHelper";
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
            modalAddservice: false,
            checked: false,
            enablevalue:'',
            enablepopup:'no',
            serviceID:'',
            selectedlistservice: "",
            selectservice:'',
            loadService: true
		}    
	    this.toggleGenProAddservice = this.toggleGenProAddservice.bind(this);
        this.toggleQuestions = this.toggleQuestions.bind(this);
	}
    
    componentDidMount(){
              
        this.props.getSelectrunService(cookie.load('UserAuthToken'),'GP');

		$(document).click(function(e) {		
        if (!$(e.target).is('.genie-msg-popup-wrapper, .genie-popup-open * ')) {
            if ($('.genie-msg-popup-wrapper').is(":visible")) {                
				$(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
            }
        }
		});
    if($(window).width() <= 767){
      $("html, body").animate({scrollTop: $(".sdmenu_wrapper").offset().top-60}, 1000);
    }
    } 
     toggleGenProAddservice() {
        this.setState(prevState => ({
        modalAddservice: !prevState.modalAddservice
        }));
    }
    toggleQuestions() {
        this.setState(prevState => ({
        modalQuestions: !prevState.modalQuestions
        }));
    }

    loadQuestion(serviceID) {
        this.setState({serviceID:serviceID}, function() {
            this.toggleQuestions();
        });
    }

    updateQuestion(status) {
        if(status!="" && typeof status!=="undefined" && status==="success") {
             this.toggleQuestions();
             $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
             $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
             $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Question Updated Successfully</p> ');
        }
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

    closepopup(){
        cookie.save('EnableGenPro','No')
        $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
        $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
        window.location.href="/genpro-my-services";
    }

    componentWillReceiveProps(Props) {
    if(Props.updateproservices!='undefined' && Props.updateproservices!=null  && this.state.enablepopup==='yes'){
        if(Object.keys(Props.updateproservices).length > 0) {
            if(Props.updateproservices[0].status === 'actionsuccess'){
                $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
                $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>'+Props.updateproservices[0].message+'</p> ');
                }
            }
        }
          if (Props.selectrunservice != this.props.selectrunservice) {
          this.setState({ loadService: false });
          if (Props.selectrunservice[0].status === "success") {
          this.setState(
          { selectservice: Props.selectrunservice },
          function() {
          this.ListServices();
          }.bind(this)
          );
          }
          }
      }
  ListServices(){
    var serviceListArr = this.state.selectservice[0];
     if (
      serviceListArr != "undefined" &&
      serviceListArr != null &&
      Object.keys(serviceListArr).length > 0
    ) {
      if(serviceListArr.status == 'success'){
             const serviceDetails = serviceListArr.getAllServices.map((services, serviceIndex) => {

               if(services.vendor_service_status == 'A' ){
                    var checked = true;    
                }else if(services.vendor_service_status == 'I') {
                    var checked = false;
                }
                var imgservice = services.services_default_icon;
                var imgsrc;
                if(imgservice !== null && imgservice !== ''){
                imgsrc = servicemediaImage+services.services_background_img+"";
                }else{
                imgsrc = noimgserv+"";
                }
                    return (
                        <div className="gen-myservices-box" key={serviceIndex}>
                           <div className="gen-myservices-innerbox" key={services.services_id} onClick={this.loadQuestion.bind(this, services.services_id)}>
                                <div className="gen-myservices-img">
                                    <img src={imgsrc} alt="" />
                                </div>
                                <div className="gen-myservices-text">
                                    {services.services_title}
                                </div>
                           </div>
                           <div className="gen-toggle">
                                <div className="yn_check">
                                     <input type="checkbox" defaultChecked ={checked} onClick={this.handleChangeCheck.bind(this)} value={services.services_id} />
                                     <span></span>
                                </div>
                           </div>
                        </div>
                     );
              }
              );
               this.setState({ selectedlistservice: serviceDetails });
    } else {
      this.setState({ selectedlistservice: "" });
    }
  }
 }
render() {

  if(cookie.load('EnableGenPro') == 'yes'){
        $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
        $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
        $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>GenPro Enabled Successfully</p> ');
  }

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

                                    {this.state.loadService === true && LoadingSec}
                                    {this.state.selectedlistservice === "" &&
                                    this.state.loadService === false && (
                                    <div className="gen-atl-service">
                                    Please select at least one service!
                                    </div>
                                    )}

                                   <div className="gen-myservices-wrapper">
                                       <div className="gen-myservices-inner-wrapper">
                                            {this.state.loadService === false && (
                                            <p>
                                            Press the service icon and spend about 15 mins to input more information about your service (Profile Description, Profile photo, Photo gallery, district to serve, minimum starting price, price range, operating hours etc). Update “Details” to publish your services online.
                                            </p>
                                            )}
                                            {this.state.selectedlistservice !== ""
                                            ? this.state.selectedlistservice
                                            : ""}
                                            {this.state.loadService === false && (
                                              <div
                                              className="gen-myservices-box gen-add-service"
                                              onClick={this.toggleGenProAddservice}
                                              style={{
                                              display:
                                              this.state.selectedlistservice === true ? "none" : ""
                                              }}
                                              >
                                              <div>
                                              <div className="gen-myservices-img">
                                              <img src={AddMyService} alt="Add" />
                                              </div>
                                              <div className="gen-myservices-text">
                                              Add New Service
                                              </div>
                                              </div>
                                              </div>
                                              )}
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
          
			     <div>
                <div className="genie-msg-popup-wrapper">
                <div className="genie-msg-popup-inner-wrapper">
                <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                <div className="genie-msg-popup-body">
                </div>
                <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
                </div>
                </div>
            </div>
				
		<ModalPopup modal={this.state.modalAddservice} toggle={this.toggleGenProAddservice} className="modal-width Genpro_popup AddService_popup" title="Add Services" >						 
			<GenProAddservice />				
		</ModalPopup>

        <ModalPopup modal={this.state.modalQuestions} toggle={this.toggleQuestions} keyboard={true} backdrop={'static'} className="modal-width Genpro_popup service_qn_popup" title="Display under Add to compare" >						 
			<Questions serviceID={this.state.serviceID} updateQuestion={this.updateQuestion.bind(this)} />				
		</ModalPopup>

			
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Services));


