/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import DivSection from '../Layout/DivSection';
import ModalPopup from '../Layout/ModalPopup';
import InfoPopup from '../Layout/InfoPopup';
import CustomerFeedback from '../Customer/CustomerFeedback';
import cookie from 'react-cookies';
import ErrorMsg from   '../../common/images/error-msg.png';
import { appName } from "../Config/Config";
import { LoadingSec, LoadImage, CheckAuth} from '../Helpers/SettingHelper';
import { GET_ASKTOCALL, GET_CALLREQUEST, GET_AVAILTRANSACTION } from '../../actions';


class SearchList extends Component {

    constructor(props) {
        CheckAuth();
        super(props);   
        this.state = {
                runsearchlist: this.props.location.state.runserachlist,
                UserAuthToken:cookie.load('UserAuthToken'),
                runlist:'',
                callText:'Ask to Call',
                callrequestData:'',
                TransId: this.props.location.state.TransId,
                serviceId: this.props.location.state.serviceId,
                CustomerFeedback: false,
                Loading:false,
                pointPopup:false,
                UserPoints: this.props.location.state.runserachlist.user_points,
                genmessageLoading: false,
                asktocallLoading: false,
                popuptext:'',
                points:''
            }
        this.CustomerFeedback = this.CustomerFeedback.bind(this);
        }
	componentDidMount(){
        
        if(this.props.location.state.runserachlist!=="" && typeof this.props.location.state.runserachlist!=='undefined') {
            this.props.getCallRequest(this.state.UserAuthToken, this.state.runsearchlist.transactionId, this.state.runsearchlist.services_id_txt)
            this.loadrunsearchlist();
        }
    
        if(this.props.location.state.TransId!=="" && this.props.location.state.serviceId!==""  && typeof this.props.location.state.TransId!=='undefined' && typeof this.props.location.state.serviceId!=='undefined'){
            this.setState({Loading:true});
            this.props.getAvailTransaction(this.state.UserAuthToken,this.props.location.state.TransId, this.props.location.state.serviceId)
        }
        
	}

  componentWillReceiveProps(Props) {

  if(Props.callrequest!== this.props.callrequest){
    if(Props.callrequest[0].status === 'Success'){
      if(Props.callrequest[0].result_set.callrequest_arr !== ''){
        this.getCallrequest(Props.callrequest[0].result_set.callrequest_arr);
      }
    }else if(Props.callrequest[0].status === 'authenticfailed'){
        this.props.history.push('/logout');
    }
  }
  if(Props.asktocall !== this.props.asktocall){
    if(Props.asktocall[0].status === 'success'){
      if(Props.asktocall[0].userId !== '' && Props.asktocall[0].calltype == 'asktocall'){
		      this.setState({pointPopup:true});
          $('#'+Props.asktocall[0].userId+ ' .showrequested').show();
          $('#'+Props.asktocall[0].userId+ " .showasktocall").hide();
          $('#asktocall_'+Props.asktocall[0].userId).removeClass('load-data');
      }else if(Props.asktocall[0].userId !== '' && Props.asktocall[0].calltype == 'genmessage'){
         // this.setState({pointPopup:true});
          $('#'+Props.asktocall[0].userId+ ' .showgenrequested').show();
          $('#'+Props.asktocall[0].userId+ " .showgenmessage").hide();
          $('#genmessage_'+Props.asktocall[0].userId).removeClass('load-data');
      }
    }else{
      this.setState({pointPopup : false });
      if( Props.asktocall[0].calltype == 'asktocall'){
        $('#asktocall_'+Props.asktocall[0].userId).removeClass('load-data');
      }else{
        $('#genmessage_'+Props.asktocall[0].userId).removeClass('load-data');
      }
      
      $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
      $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.asktocall[0].message+'</p> ');
	}
  }
  if(Props.availtransaction!== this.props.availtransaction){
    if(Props.availtransaction[0].status === 'Success'){
        this.setState({Loading:true});
      this.setState({ runsearchlist: Props.availtransaction[0].result_set }, function () { this.loadrunsearchlist() }.bind(this));
    }
  }
 }
 getCallrequest(callrequestlist){
  callrequestlist.map((list) => {
    if(list.sg_asktocall === 'yes'){
        $('#'+list.sg_provider_id+ ' .showrequested').show();
        $('#'+list.sg_provider_id+ " .showasktocall").hide();
    }
     if(list.sg_genmessage === 'yes'){
       $('#'+list.sg_provider_id+ ' .showgenrequested').show();
        $('#'+list.sg_provider_id+ " .showgenmessage").hide();
    }
  });
 }
  astocall(userID, calltype) {
		var qs = require('qs');
		var postObject ={
      "app_name"         :  appName,
      "user_token"       :  this.state.UserAuthToken,
      "type"             :  'cust',
      "calltype"         :  calltype,
      "trans_id"         :  this.state.runsearchlist.transactionId,
      "provider_user_id" :  userID
		};
    if(calltype === 'genmessage'){
      this.setState({popuptext:'GenMessage',points:this.state.runsearchlist.genmessage})
      $('#genmessage_'+userID).addClass('load-data');
      this.loadrunsearchlist();
    }
    if(calltype === 'asktocall'){
      $('#asktocall_'+userID).addClass('load-data');
      this.setState({popuptext:'Sent SMS to this GenUser to call you back. Used '+this.state.runsearchlist.asktocall+' GH points'})
      this.loadrunsearchlist();
    }
    this.props.getAsktocall(qs.stringify(postObject));
  }

   aboutmecontent(userID) {
   
    if($('#listabout_'+userID).hasClass("h-toggle") ===  false){
        $('#listabout_'+userID).addClass('h-toggle');
        $('#listabout_'+userID).next(".readmore").text('Read More');
      }else{
        $('#listabout_'+userID).removeClass('h-toggle');
        $('#listabout_'+userID).next(".readmore").text('Read Less');
    }
  }

  loadPopupStatus = (pointPopup) => {
    this.setState({pointPopup:pointPopup});
  }

  loadrunsearchlist(){
      if(this.state.runsearchlist.genrun_list!=='' && typeof this.state.runsearchlist.genrun_list!=='undefined') {
       const searchlist = this.state.runsearchlist.genrun_list.map((searchlist, searchlistIndex) => {
            let Profileimage = '';
            if(searchlist.user_profile_image!== null && searchlist.user_profile_image!== ''){
                 Profileimage =searchlist.user_profile_image;
            }
            var userId = searchlist.user_id;
            var callrequested="";
            if(searchlist.callrequested!== ''  && searchlist.callrequested!== null  && searchlist.callrequested!==undefined){
             callrequested  =searchlist.callrequested;
            }
            var callgenmessage ='';
             if(searchlist.callgenmessage!== ''  && searchlist.callgenmessage!== null  && searchlist.callgenmessage!==undefined){
             callgenmessage  =searchlist.callgenmessage;
            }
            return (
                      <div className="gen-search-jobList" key={searchlistIndex} id={userId}>
                        <div className="gsj-listimg">
                          <img src={LoadImage(Profileimage, 'profilelist')} alt="GenJobImg" />
                        </div>
                        <div className="gsj-listtxt">
                        <div className="gsj-list-content">
                        <h3><a href="javascript:void(0);">{(searchlist.user_nickname!=='' && searchlist.user_nickname!==null)?searchlist.user_nickname:searchlist.user_name}</a></h3>
                        <p><b>Gender:</b>{(searchlist.publishgender==='1')?searchlist.user_gender:'N/A'}</p>
                        
                        <p id={'listabout_'+userId} className="gsj-list-about h-toggle"><b>About Me:</b>{(searchlist.publishyourself==='1')?searchlist.attribute_value:'N/A'}</p>
                        {(searchlist.attribute_value!=='' && searchlist.attribute_value!==null && searchlist.attribute_value.length > 200) ?<a href ="javascript:void(0);" className='readmore' onClick={this.aboutmecontent.bind(this, userId)}>Read More</a>:''}
                        {(searchlist.contactgenmessage != 'yes') && (searchlist.contactsms != 'yes') && <p class="unsubscribe">GenUser Unsubscribe</p>}
                        </div>
                        <div className="gsj-cfac-box">
                        <p><i className="fa fa-tags" aria-hidden="true"></i><a href="javascript:void(0);" onClick={this.Customer_Feedback.bind(this, searchlist.user_id)}>Customer Feedback</a></p>
                        <div>
                        {(searchlist.contactgenmessage === 'yes')?<a href="javascript:void(0);" className="btn btn_green animate-btn2 a2c showgenmessage ab-none" onClick={this.astocall.bind(this, userId, 'genmessage')} style={{display:(callgenmessage!=='')?'none':'inline-block'}} ><span id={'genmessage_'+userId}></span>GenMessage</a>:''}

                        <span className="btn btn_green animate-btn2 a2c showgenrequested ab-none" style={{display:(callgenmessage!=='')?'inline-block':'none'}}>Requested</span>

                        {(searchlist.contactsms === 'yes')?<a href="javascript:void(0);" className="btn btn_orange animate-btn2 a2c showasktocall ab-none"  onClick={this.astocall.bind(this, userId, 'asktocall')} style={{display:(callrequested!=='')?'none':'inline-block'}}><span id={'asktocall_'+userId}></span>Ask to call</a>:''}

                        <span className="btn btn_orange animate-btn2 a2c showrequested ab-none" style={{display:(callrequested!=='')?'inline-block':'none'}}>Requested</span>

                        </div>
                        </div>
                        </div>
                     </div>
            );

        });
         this.setState({runlist:searchlist});
      }
  }
  Customer_Feedback(userID) {
    this.setState({userID:userID}, function() {
        this.CustomerFeedback();
    });   
  }
  CustomerFeedback() {
      this.setState(prevState => ({
        CustomerFeedback: !prevState.CustomerFeedback
      }));
  }
  closepopup(){
      $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
  }


  render() {
    return (
          <div>
              <Header userPoints= {(this.state.UserPoints!=='' && this.state.UserPoints!==undefined) && this.state.UserPoints}/>
              <DivSection activepage='run' />
              <div className="innerpage-head-banner">
                  <div className="container">
                      <div className="innerpage-head-wrapper">
                          <h2>You have chosen <span>{this.state.runsearchlist.service_name_txt},</span></h2>
                          <p>Once you complete your request we will get best list of GenRun</p>
                      </div>
                  </div>
              </div>
              <div className="gen-jobs-bar">
                  <div className="container">
                      <div className="gen-jobs-innerbar">
                          <span></span>
                            <Link to={{ pathname: '/customer/genruntranscation-list' }} className="btn btn_white animate-btn2" title="More Info">Search history</Link>
                      </div>
                  </div>
              </div>
              <div className="gen-search-jobList-wrapper">
                  <div className="container">
                      {/*<div className="sq-msg-section">
                          <b>Note: </b>Service each Request to Call fee {(typeof this.state.runsearchlist!=='undefined' && typeof this.state.runsearchlist.service_pointsvalues!=='undefined')?this.state.runsearchlist.service_pointsvalues:''} points
                      </div>*/}
                      <div className="gen-search-jobList-inner">
                          {this.state.runlist?this.state.runlist:LoadingSec}
                      </div>
                  </div>
              </div>
              <Footer />           
            <ModalPopup modal={this.state.CustomerFeedback} toggle={this.CustomerFeedback} className="modal-width customerFeedback_popup Gen_popup" title="Customer Feedback" >				
                <CustomerFeedback userID={this.state.userID} />				
            </ModalPopup>
            {(this.state.pointPopup===true) &&
            <div>
            <InfoPopup popupcontent={this.state.popuptext} loadPopupStatus={this.loadPopupStatus.bind(this)}  />
            </div>
            }
            
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
    asktocall: state.asktocall,
    callrequest: state.callrequest,
    availtransaction: state.availtransaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAsktocall: (formPayload) => {
       dispatch({ type: GET_ASKTOCALL, formPayload});
    },
    getCallRequest: (UserToken, trans_id, service_id) => {
          dispatch({ type: GET_CALLREQUEST, UserToken, trans_id , service_id});
    },
    getAvailTransaction: (UserToken, trans_id, service_id) => {
          dispatch({ type: GET_AVAILTRANSACTION, UserToken, trans_id , service_id});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SearchList));
