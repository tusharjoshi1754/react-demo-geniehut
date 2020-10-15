import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../Layout/Footer';
import WebChatBanner from '../../common/images/web-chat-banner.png';
import SendBtn from '../../common/images/send_icon.png';
import { GET_GEN_MESSAGE, GET_CREATE_MESSAGE } from '../../actions';
import {LoadingSec, LoadImage, chartDate, formatAMPM, Capitalize} from '../Helpers/SettingHelper';
import $ from 'jquery';
class GenMessage extends Component {
    constructor(props) {
        super(props);
        if(typeof this.props.match.params.MessageID==="undefined" || this.props.match.params.MessageID==="") {
            this.props.history.push({ pathname: '/'});
        }
        this.state = {
            MessageID:this.props.match.params.MessageID,
            message:'',
            keywords:'',
            mloading:true,
            firstLoad:true,
            old_Date:'',
            NewMessage:'',
            error:'',
            chat_points:'',
            hidechat: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);      
    }
    componentDidMount() {
        const MessageID =  (this.state.MessageID).split('_');
        this.props.getGenMessage(MessageID[2],MessageID[3]);
       
    }
    componentWillReceiveProps(Props) {
        if(Props.genmessage!== this.props.genmessage){
            this.setState({mloading:false});
            if(Props.genmessage[0].status === 'success'){
                if(Props.genmessage[0].result_set.transaction_details!== null && Props.genmessage[0].result_set.transaction_details!==''){
                const current = this;
                const MessageID3 =  (this.state.MessageID).split('_');
                setTimeout(function(){ current.props.getGenMessage(MessageID3[2],MessageID3[3]); }, 5000);                
                this.setState({NewMessage:'',transDetails:Props.genmessage[0].result_set.transaction_details,chat_points:Props.genmessage[0].result_set.chat_points, history:Props.genmessage[0].result_set.call_history}, function() {
                    this.mesgInfo();
                    this.displayMessage();
                });

                if(Props.genmessage[0].result_set.transaction_details.receiver_points < Props.genmessage[0].result_set.chat_points) {
                    this.setState({ hidechat : true})
                }

            }
          }
        }
        if(Props.createmessage!== this.props.createmessage){
            this.setState({keywords:''});            
        }
    }

    handleInputChange(event) {
      const {name, value} = event.target;
      this.setState({[name]: value});      
    }

    displayMessage() {
        let message = '';
        if(this.state.history!=='' && typeof this.state.history!=="undefined" && this.state.history.length>0) {
            const MessageID2 =  (this.state.MessageID).split('_');
            let old_Date = '';
            message = this.state.history.map((item, index)=> {
                let classDetails = '';
                if(MessageID2[1]!==item.sender_type) {
                  
                    classDetails = 'web-chat-row wcr-right';
                }
                else {
                    classDetails = 'web-chat-row wcr-left';

                }
                let photo = "";
                if(item.sender_type==="c") {
                    photo = this.state.transDetails.reciever_img;
                }
                else {
                    photo = this.state.transDetails.provider_img;
                }
                let cdate = chartDate(item.created_on);

                return (
                    <div key={index}>
                        { (old_Date!==cdate) &&
                            <div class="web-chat-time-row">
                                <div class="webtime-box">
                                    {cdate}
                                    <span style={{display:'none'}}>{old_Date = cdate}</span>
                                </div>
                            </div>
                        }
                        <div className={classDetails} key={index}>
                            <div className="web-chat-row-inner">
                                <div className="web-chat-text">
                                    <p>{item.genmessage}</p>
                                    <div class="time-box">
                                        {formatAMPM(item.created_on)}
                                    </div>
                                </div>
                                <img src={LoadImage(photo, 'profile')} alt="" className="wcr-icon" />
                            </div>
                        </div>
                    </div>
                );
            });
        }
        else {
            message = (
                <div>Chat starts here!</div>
            )
        }
        this.setState({message:message}, function() {
             if(this.state.firstLoad===true) {
                this.scrollMessage();
             }
             this.setState({firstLoad:false});
        });
    }
    loadOlddata(old_Date) {
        this.setState({old_Date:old_Date});
    }
    createMessage(){
        if(this.state.keywords!=='') {
            this.setState({error:''});
            const MessageID1 =  (this.state.MessageID).split('_');
            const formPayload = {
                call_id    : MessageID1[2],
                type       : MessageID1[1],
                chattype   : MessageID1[3],
                message    : this.state.keywords,
            };
            this.scrollMessage();
            let photo = "";
            if(MessageID1[1]==="c") {
                photo = this.state.transDetails.provider_img;           
            }
            else {
                photo = this.state.transDetails.reciever_img;
            }
            /*let msg = (<div>
                <div class="web-chat-row wcr-right">
                    <div class="web-chat-row-inner">
                        <div class="web-chat-text">
                            <p>{this.state.keywords}</p>
                            <div class="time-box">{formatAMPM(new Date())}</div>
                        </div>
                        <img src={LoadImage(photo, 'profile')} alt="" class="wcr-icon" />
                    </div>
                </div>
                </div>);
            $('.web-chat-inner-body').append(msg);
            this.setState({NewMessage:msg});*/
           this.props.getCreateMessage(formPayload);
           this.props.getGenMessage(MessageID1[2], MessageID1[3]);
           this.setState({mloading:true});

        }
        else {
            this.setState({error:1});
        }
    }
    mesgInfo() {
        const MessageID5 =  (this.state.MessageID).split('_');
        let name;
        if(MessageID5[1]==='gr') {
            name = this.state.transDetails.provider;
        }
        else {
            name = this.state.transDetails.receiver;
        }

         let mesgInfo = (
         <div>
            <h2>
            <b>{Capitalize(name)}</b>
            {/*<span className="gen-status active"></span>*/}
            <span className="gen-category">{(MessageID5[1]==='gr')?'Part-timer / Pro':'Customer'}, {this.state.transDetails.services_title}</span>
            </h2>
         
                {this.state.transDetails.sg_expired !== "yes" ? (
                <div>
                {this.state.transDetails.trans_status!=='' && typeof this.state.transDetails.trans_status!=='undefined' && this.state.transDetails.trans_status==="CO" ? (
                <div className="job-status">Complete</div>
                ) : (
                <div className="job-status">Pending</div>
                )}
                </div>
                ) : (
                <div className="job-status">Expired</div>
                )}
         </div>
         );
        this.setState({mesgInfo:mesgInfo});
    }
    scrollMessage() {
        $(".web-chat-inner-body").animate({ scrollTop: ($('.web-chat-row').height()*$('.web-chat-row').length)}, 1000);
    }
    render() {
        return (
            <div>
               <div className="gen-message-wrapper">
                   <div className="gen-message-banner">
                       <img src={WebChatBanner} alt="" />
                   </div>
                   <div className="gen-message-box-wrapper">
                       <div className="web-chat-box">
                           <div className="web-chat-heading">
                               {(this.state.mloading===true) ? (
                                    <span>Loading...</span>
                                    ) : (
                                    this.state.mesgInfo
                                    )}
                                
                           </div>
                           <div className="web-chat-body">
                                <div className="web-chat-inner-body">
                                    {(this.state.mloading===true) ? (
                                    LoadingSec
                                    ) : (
                                    this.state.message
                                    )}
                                    {this.state.NewMessage}
                                </div>
                           </div>
                            {(this.state.mloading===false) &&
                           (this.state.transDetails.trans_status!=='' && typeof this.state.transDetails.trans_status!=='undefined' && (this.state.transDetails.trans_status!=="CO" && this.state.transDetails.sg_expired !=='yes'))?<div className="web-chat-footer">
                                    <div className="gen-wcf-wrapper">
                                        <div className="gen-wcf-input">
                                            <input type="text" className="form-control" name="keywords" placeholder="Text you message here.." onChange={this.handleInputChange} value={this.state.keywords}  />
                                            {(this.state.error===1) &&
                                                <span className="errorspan">Please enter message</span>
                                            }
                                        </div>
                                        <div className="gen-wcf-button">
                                        <button type="button" className="btn gen-wcf-btn" onClick={this.createMessage.bind(this)} ><img src={SendBtn} alt="" className="SendBtn-icon" /></button>
                                        </div>
                                    </div>
                                </div>:''                       
                            }
                            {this.state.chat_points && this.state.transDetails.trans_status!=="CO"  && this.state.transDetails.sg_expired !=='yes' && <div className="mandatory-box"><span>For each message will deduct {this.state.chat_points} points</span></div>}
                        
                       </div>
                       <div className="wcf-close">
                            <Link to={'/'}><button type="button" className="btn btn_orange btn_minwid register_submit animate-btn2">Close</button></Link>
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
    genmessage      : state.genmessage,
    createmessage   : state.createmessage,
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenMessage: (call_id, chattype) => {
       dispatch({ type: GET_GEN_MESSAGE, call_id, chattype});
    },
    getCreateMessage: (formPayload) => {
       dispatch({ type: GET_CREATE_MESSAGE, formPayload});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenMessage));