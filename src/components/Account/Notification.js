/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, Modal, Table , ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import NotifyIco from '../../common/images/ManageProp_img.jpeg';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { GET_ALLNOTIFICATION, GET_DELETENOTIFICATION, GET_READNOTIFY } from '../../actions';
import { CheckAuth, LoadingSec, LoadImage } from "../Helpers/SettingHelper";
import cookie from 'react-cookies';
import Parser from 'html-react-parser';
import $ from 'jquery';
import SuccessMsg from '../../common/images/success-msg.png';
import ModalPopup from '../Layout/ModalPopup';

class Notification extends Component {

constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
        customerinner_notify:'',
        genruninner_notify:'',
        genproinner_notify:'',
        loading:true,
        cust_total:'',
        page : 0,
        loadMoreEnable:false,
        oldnotification:[],
        moreloading:false,
        notificationlist:'',
        modalmessage:false,
        deleteLoading:false
      }
      this.props.getAllNotification(cookie.load('UserAuthToken'),0);
      this.togglemessage = this.togglemessage.bind(this);
  }

componentDidMount(){
    
}


notificationAddclass(notify,notifyseen){
  $('.notification-cnt.key-'+notify).toggleClass("height-toggle");
  if(notifyseen === 'unread'){
   this.props.getReadNotify(cookie.load('UserAuthToken'), notify)
  }
}

DeleteAllNotify(notifyId){
    (notifyId)?$('#'+notifyId).remove():'';
    this.props.getDeleteNotification(cookie.load('UserAuthToken'), notifyId)
}
DeleteAll(){
  this.togglemessage();
}

togglemessage() {
       this.setState(prevState => ({
        modalmessage: !prevState.modalmessage
        }));
 }

AllowDelete(){
    this.setState({deleteLoading: true})
    this.props.getDeleteNotification(cookie.load('UserAuthToken'), 'deleteall')
    this.setState({notificationlist:''});
    this.setState(prevState => ({
      modalmessage: !prevState.modalmessage
    }));

  }
closepopup(){
     $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
     $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
}
componentWillReceiveProps(NextProps) {

      if(NextProps.notifyInner !==this.props.notifyInner){ 
            this.setState({loading:false});
            this.setState({moreloading:false});
            
            if(NextProps.notifyInner[0].status === 'success'){ 

            if(NextProps.notifyInner[0].result_set!== '' && NextProps.notifyInner[0].result_set!== null){

            const totalrecords =  NextProps.notifyInner[0].totalnotify;
            const limit = NextProps.notifyInner[0].limit;
            const loadMoreCount = totalrecords/limit;
            const pagecount = parseInt(this.state.page)+1;
            if(loadMoreCount> pagecount && totalrecords > limit) {
            this.setState({loadMoreEnable:true});
            }
            else {
            this.setState({loadMoreEnable:false});
            }

            let newnotification = '';
            if(this.state.oldnotification!=='') {
            let oldnotification = this.state.oldnotification;
            newnotification = oldnotification.concat(NextProps.notifyInner[0].result_set);
            }else {
            newnotification = NextProps.notifyInner[0].result_set;
            }
            this.setState({  oldnotification : newnotification,cust_total: NextProps.notifyInner[0].unreadtotal }, function () { this.getcustomernotify(newnotification) }.bind(this));

            this.getcustomernotify(NextProps.notifyInner[0].result_set)

            }else if(NextProps.notifyInner[0].status === 'error'){
              this.getcustomernotify();
            }
            }else if(NextProps.notifyInner[0].status === 'authenticfailed'){
            this.props.history.push('/logout');
            }
        }

        if(NextProps.deletenotify !==this.props.deletenotify){ 
              this.setState({loading:false});
              this.setState({deleteLoading:false})
            if(Object.keys(NextProps.deletenotify).length > 0) {

               if(NextProps.deletenotify[0].status === 'success'){
                      this.setState({cust_total : NextProps.deletenotify[0].cust_total})
                      $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                      $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
                      $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>'+NextProps.deletenotify[0].message+'</p> ');

               }else if(NextProps.deletenotify[0].status === 'authenticfailed'){
                    this.props.history.push('/logout');
               }
            }

        }


        if(NextProps.readnotify !==this.props.readnotify){ 
          if(Object.keys(NextProps.readnotify).length > 0) {
             if(NextProps.readnotify[0].status === 'success'){
                if(NextProps.readnotify[0].cust_total!==''){
                 this.setState({cust_total: NextProps.readnotify[0].cust_total})              
                }
             }else if(NextProps.readnotify[0].status === 'authenticfailed'){
                  this.props.history.push('/logout');
             }
          }

        }

 }

  getcustomernotify(customerinner_notify){
    var notifyArr = customerinner_notify;
     if(notifyArr!=='undefined' && notifyArr!==null && notifyArr!==''){
        if(Object.keys(notifyArr).length > 0) {
             const notificationDetails = notifyArr.map((notification, notificationIndex) => {         
                let current = this;
                let notify_id = notification.notification_id;               
                let readclass = '';
                if(notification.notification_seen == 'read'){
                    readclass = "read_background";
                }
                console.log(notification)
              return (
                         <div className={"notification-listbox "+readclass} id={notification.notification_id} key={notificationIndex}>
                                    <div className="notification-inner-box">
                                         {/* <div className="notification-img">
                                         <div><img src={LoadImage(notification.genprofile, 'avatar')} alt="" /></div>
                                        </div>*/}
                                        <div className={'notification-cnt key-'+notify_id} onClick={current.notificationAddclass.bind(current,notification.notification_id, notification.notification_seen)}>
                                           <a href="javascript:void(0);">
                                                <h3>{notification.username}<small>{notification.notify_date}</small></h3>
                                                {/*<p className="tn-para"><b>Transaction No:</b> {txn}</p><p><b>({notification.user_type})</b></p>*/}
                                                
                                                 {(notification.content!=='' && notification.content!==null)?Parser(notification.content):''} 
                                           </a>
                                        </div>
                                        <div className="notification-del">
                                           <a onClick={this.DeleteAllNotify.bind(this,notify_id)} ><i className="fa fa-trash" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                </div>
                     );
              });
                this.setState({notificationlist:notificationDetails});
    }else {
       this.setState({notificationlist:''});
     
    }
    
  }else {
    this.setState({notificationlist:''});
    }
 }

 StripTags(string) {

  var decoded_string = $("<div/>").html(string).text();
  return $("<div/>").html(decoded_string).text();

}

loadMore() {
  let page = parseInt(this.state.page)+1;
  this.setState({  page: page}, function () { this.loadnotification(); }.bind(this));  
}

loadnotification() {
  if(this.state.page>0) {
    this.setState({moreloading:true});
  } 
  this.props.getAllNotification(cookie.load('UserAuthToken'),this.state.page)
}

render() {
    return (
        <div>
            <Header custTotal={this.state.cust_total} />
            
            <div className="wrapper_out">
                <div className="container">
                    <div className="notification-wrapper">
                        <div className="notification-wrapper-head">
                           <h2>Notification</h2>
                           {(this.state.loading===false && this.state.notificationlist!=='') &&
                            <button className="btn btn_orange animate-btn2" onClick={this.DeleteAll.bind(this)} ><i className="fa fa-trash" aria-hidden="true"></i> Delete All</button>
                           }
                        </div>
                        <div className="notification-inner-wrapper">
                            <div className="notification-lists">
                                {(this.state.loading===true) ? (
                                    <div>
                                        {LoadingSec}
                                    </div>
                                    
                                ):(
                                    <div>
                                        {(this.state.notificationlist!=='')?this.state.notificationlist:'No records found'}
                                        <div className="text-center mt25">

                                        <a href="javascript:;" className="btn btn_orange animate-btn2"  onClick={this.loadMore.bind(this)} title="Load More" style={{display:(this.state.loadMoreEnable===false)?'none':''}}>
                                        {this.state.moreloading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }
                                        Load More</a>
                                        </div>
                                    </div>
                                )}
                                                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
             <ModalPopup modal={this.state.modalmessage} toggle={this.togglemessage} className="modal-width followers-msg-popup del-all-notify-popup" title="" disablefooter={1} >
                <div className="fmp-form-wrapper">
                       
                        <div className="fmp-add-members-wrapper">
                        <span>Do you want to delete all the notification?</span>
                        </div>
                        <div className="fmp-btns">
                            <button className='btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn' type="button" onClick={this.AllowDelete.bind(this)}>{this.state.deleteLoading ===true &&
                                <span className="load-data"></span> 
                                }Yes</button>
                            <button className="btn btn1 btn_sm btn_black animate-btn2 ab-none posabs-btn" type="button" onClick={this.togglemessage}>No</button>
                            
                        </div>
                   </div>
                </ModalPopup>

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
   notifyInner: state.notification,
   deletenotify: state.deletenotify,
   readnotify: state.readnotify
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getAllNotification: (usertoken, page) => {
        dispatch({ type: GET_ALLNOTIFICATION, usertoken, page});
      },
      getDeleteNotification: (usertoken, notifyId) => {
        dispatch({ type: GET_DELETENOTIFICATION, usertoken, notifyId});
      },
      getReadNotify: (usertoken, notifyId) => {
        dispatch({ type: GET_READNOTIFY, usertoken, notifyId});
      },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Notification));



