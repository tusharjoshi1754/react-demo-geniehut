/* eslint-disable */
import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Table} from 'react-bootstrap';
import $ from 'jquery';
import ModalPopup from '../Layout/ModalPopup';
import QuotationDetail from '../Layout/QuotationDetail';
import QuotationDetailSave from '../Layout/QuotationDetailSave';
import { appName } from "../Config/Config";
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuccessMsg from '../../common/images/success-msg.png';
import ErrorMsg from '../../common/images/error-msg.png';
import { GET_JOBCONFIRMREQUEST, GET_LEADINFO, GET_SAVEQUOTATION, GET_CONTACT } from '../../actions';
import { Encrypt } from "../Helpers/SettingHelper";
var Parser = require('html-react-parser');

class GenProCustomerLeadDetail extends Component {
  constructor(props) {
    super(props); 
            this.state = {
                 rows: [{}],
                
                 modalQuotationDetail: false,
                 modalQuotationDetailSave: false,
                 jobid: this.props.jobid,
                 customer_name:'',
                 customer_phone:'',
                 user_postalcode:'',
                 service_name:'',
                 quote_status:'',
                 checkedgst:false,
                 displaygst:'',
                 gstvalue:'',
                 quot_id:'',
                 inv_id:'',
                 quot_det_res:'',
                 quot_gst:'',
                 totalamount:'',
                 totalamountgst:'',
                 Loading:false,
                 ven_id:'',
                 ref_id:'',
                 progenmessage:0
              }
        this.toggleQuotationDetail = this.toggleQuotationDetail.bind(this);
        this.toggleQuotationDetailSave = this.toggleQuotationDetailSave.bind(this);
        this.props.getLeadInfo(cookie.load('UserAuthToken'), this.props.jobid);
    }
    
   toggleQuotationDetail() {
       if(this.state.rows[0].service_desrc !==  undefined){
          this.setState(prevState => ({
            modalQuotationDetail: !prevState.modalQuotationDetail
          }));
          $('.errornotfilled').html('');
         }else{
            $('.errornotfilled').html('<span class="errorspan">Please enter fill the field</span>');
         }
  }
   toggleQuotationDetailSave() {
    if(this.state.rows[0].service_desrc !==  undefined){
          this.setState(prevState => ({
            modalQuotationDetailSave: !prevState.modalQuotationDetailSave
          }));
          $('.errornotfilled').html('');
         }else{
             $('.errornotfilled').html('<span class="errorspan">Please enter fill the field</span>');
         }
  }

 closepopup(){
  $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
}

  handleChange = idx => e => {

    const { name, value } = e.target;
    const rows = [...this.state.rows];
   /* rows[idx] = {
      [name]: value,
    };*/

    Object.assign(rows[idx], { [name]: value});

    this.setState({
      rows
    });
  };
  handleAddRow = () => {
    const item = {
      service_desrc: "",
      serv_price: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }   


  handleCancelJob = () => {
       const formPayload = this.state;
          var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_token" : cookie.load('UserAuthToken'),
          "Jobid": formPayload.jobid,
          "actiontype": 'reject',
          };
       this.props.getJobconfirmRequest(qs.stringify(postObject));
  }
 

  handleConfirmJob = () => {

          const formPayload = this.state;
          var qs = require('qs');
          var postObject = {
            "app_name": appName,
            "user_token" : cookie.load('UserAuthToken'),
            "Jobid": formPayload.jobid,
            "actiontype": 'accept',
          };
      this.props.getJobconfirmRequest(qs.stringify(postObject));

  }
sendquotation = () =>{

if(this.state.rows[0].service_desrc !==  undefined && this.state.rows[0].service_desrc !== ''){

   $('.errornotfilled').html('');
   const formPayload = this.state;
     let quot_gst;
      if(formPayload.checkedgst === true && formPayload.gstvalue !==''){
            quot_gst = 'Y' ;
      }else{
            quot_gst = 'N'
      }

  let totalprice;
  if(this.state.rows){

  const totprice = this.state.rows;
  const PriceTotal = totprice.reduce((TotalServicePrice, meal) => TotalServicePrice + parseFloat(meal.serv_price, 10), 0);

  if(isNaN(parseFloat(PriceTotal)) === false){
    totalprice = PriceTotal;
  }
  }

  if(formPayload.totalamount > 0){
     var Totamount = formPayload.totalamount;
  }else{
     var Totamount = totalprice;
  }


  let totalgstprice = 0;
  if(this.state.checkedgst === true){
    totalgstprice = totalprice + (totalprice*7)/100;
  }


  let Totgstamt;
  if(formPayload.totalamountgst > 0){
     Totgstamt = formPayload.totalamountgst;
  }else{
     Totgstamt = totalgstprice;
  }


  let quot_data;
  
  if(formPayload.quot_det_res.length > 0){
     quot_data  = formPayload.quot_det_res;
  }else{
      quot_data  = formPayload.rows;
  }
  var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_token" : cookie.load('UserAuthToken'),
          "job_id": formPayload.jobid,
          "quot_data": quot_data,
          "quot_gst": quot_gst,
          "total_amount": Totamount,
          "total_amount_gst": Totgstamt,
          "quot_id":formPayload.quot_id,
          "inv_id":formPayload.inv_id,
          "quote_mode": 'save',
          };
     this.props.getSaveQuotation(qs.stringify(postObject));
     this.setState({Loading:true});

  }else{
    $('.errornotfilled').html('<span class="errorspan">Please enter fill the field</span>');
    this.setState({Loading:false});

  }

}

  /* Validate quotation Form */
/*  validateForm() {
    let errors = {};
        let formIsValid = true;
    let totalprice;
    if(this.state.rows){

    const totprice = this.state.rows;
    const PriceTotal = totprice.reduce((TotalServicePrice, meal) => TotalServicePrice + parseFloat(meal.serv_price, 10), 0);

    if(isNaN(parseFloat(PriceTotal)) === false){
      this.setState({errorprice:''})
    }else{
      //this.setState({errorprice:'Please enter the valid number format'});
    }

    }
    this.setState({
      errors: errors
    });

    $(".login_submit").removeClass('loading loading_data');
    return formIsValid;
    }*/


componentWillReceiveProps(Props) {

      if(Object.keys(Props.leadinfo).length > 0) {
        if(Props.leadinfo !== this.props.leadinfo){
            if(Props.leadinfo[0].status ===  "success"){
              const leadinfoData = Props.leadinfo[0].result_set;
              this.setState({ven_id: leadinfoData.ven_res.user_id})
              this.setState({customer_name: leadinfoData.cust_res.user_name})
              this.setState({customer_phone: leadinfoData.cust_res.user_mobile})
              this.setState({user_postalcode: leadinfoData.cust_res.user_postalcode})
              this.setState({service_name: leadinfoData.service_name})
              if(leadinfoData.quote_status  !== null){
                this.setState({ref_id : leadinfoData.quote_status.sg_ref_id})
                if(leadinfoData.quote_status.sg_vendor_quot_status === 'A'){
                 this.setState({quote_status: leadinfoData.quote_status.sg_vendor_quot_status})
                }
              if(leadinfoData.quote_status.sg_progenmessage!== null && leadinfoData.quote_status.sg_progenmessage!==''){
                this.setState({progenmessage : leadinfoData.quote_status.sg_progenmessage})
              }
             }
              if(leadinfoData.quot_res!=='' && leadinfoData.inv_res!== null && leadinfoData.quot_det_res!==''){
                this.setState({quot_id: leadinfoData.quot_res.sg_quot_id})
                this.setState({inv_id: leadinfoData.inv_res.sg_inv_id})
                this.setState({rows: leadinfoData.quot_det_res}) 
              }
              this.setState({quot_det_res: leadinfoData.quot_det_res})     
              if(leadinfoData.quot_res.quot_gst === 'Y'){
                this.setState({checkedgst: true})
              }else{
                this.setState({checkedgst: false})
              }
              this.setState({quot_gst: leadinfoData.quot_res.quot_gst})     
              this.setState({totalamount: leadinfoData.quot_res.quot_total_amount}) 
              this.setState({totalamountgst: leadinfoData.quot_res.quot_total_amount_gst}) 
                       
            }
          }
        }
    if(Object.keys(Props.savequotation).length > 0) {
        if(Props.savequotation !== this.props.savequotation){
            if(Props.savequotation[0].status === 'success'){
              this.setState({Loading:false});
              if(Props.savequotation[0].message === 'quotation_sent'){
                $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Quotation Sent Successfully</p> ');
              }
          }else{
           $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="errorMsg" /></div><h2 class="title3">Success</h2><p>Quotation Saved Successfully</p> ');
         }
        }
      }
      if(Object.keys(Props.jobconfirmrequest).length > 0) {
        if(Props.jobconfirmrequest !== this.props.jobconfirmrequest){
            if(Props.jobconfirmrequest[0].status === 'success'){
              if(Props.jobconfirmrequest[0].message === 'accepted'){
                var accepted = 'Job accepted'
                $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                    $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>"'+accepted+'"</p> ');
              }
          }else{
           $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="errorMsg" /></div><h2 class="title3">Success</h2><p>Job Cancelled</p> ');
         }
        }
      }

         if(Props.procontact !== this.props.procontact){

              if(Props.procontact[0].status == 'success'){

                console.log(Props.procontact[0])

                if(Props.procontact[0].user_id !== '' && Props.procontact[0].type == 'A'){
                  this.setState({pointPopup:true});
                  $('#'+Props.procontact[0].user_id+ ' .showrequested').show();
                  $('#'+Props.procontact[0].user_id+ " .showasktocall").hide();
                  $('#asktocall_'+Props.procontact[0].user_id).removeClass('load-data');
                }else if(Props.procontact[0].user_id !== '' && Props.procontact[0].type == 'G'){
                  this.setState({pointPopup:false});
                  $('#'+Props.procontact[0].user_id+ ' .showgenrequested').show();
                  $('#'+Props.procontact[0].user_id+ " .showgenmessage").hide();
                  $('#genmessage_'+Props.procontact[0].user_id).removeClass('load-data');
                }
              }else{
              if( Props.procontact[0].type == 'A'){
                $('#asktocall_'+Props.procontact[0].user_id).removeClass('load-data');
              }else if(Props.procontact[0].type == 'G'){
                $('#genmessage_'+Props.procontact[0].user_id).removeClass('load-data');
              }

              $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
              $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.procontact[0].message+'</p> ');
             }
      }
  }
componentDidMount(){
    if(!cookie.load('UserAuthToken')){
      window.location.href = "/logout";
    }
}
    handleChangeCheck  = (event) => {
     // const {name, value} = event.target;
      
        if(event.target.checked === true){
            this.setState({checkedgst: !this.state.checkedgst});
          this.setState({displaygst: 1})
          this.setState({gstvalue: 7})
        }else{
            this.setState({checkedgst: !this.state.checkedgst});
          this.setState({displaygst: 0})
          this.setState({gstvalue:''})
        }

  }
  
   addContact(ven_id, type) {

    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = cookie.load('UserAuthToken');
    postdata["ref_id"] = Encrypt(this.state.ref_id, "e");
    postdata["pro_id"] = Encrypt(ven_id, "e");
    postdata["type"] = type;
    postdata["sendtype"] = "genpro";

     if(type === 'proaskforcall'){
      $('#asktocall_'+ven_id).addClass('load-data');
     }else if(type === 'progenmessage'){
      $('#genmessage_'+ven_id).addClass('load-data');
     }
     this.props.getContact(postdata);

   }
 closepopup(){
      $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      //$(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
  }
  getcustans_res(){
    var leadcustinfo = this.props.leadinfo[0];
    if(leadcustinfo!== undefined && leadcustinfo!== null){


      if(Object.keys(leadcustinfo).length > 0) {
        let prev_ques_id = '';

         const ansdetails = leadcustinfo.result_set.cust_ans_res.map((quesanswer, quesanswerIndex) => {

          let ques_id = quesanswer.quiz_id;
          let quiz_answer_type = quesanswer.quiz_answer_type;
          let question =quesanswer.quiz_question;

          let ques_label =  quesanswer.ques_content;
          let ques_remarks =  quesanswer.ques_remarks;
          let total_ans_label_count =  quesanswer.total_ans_count;

          if(ques_id !== prev_ques_id) {
            if(prev_ques_id !== '') {
               
            }
            /*question*/
            var ptag = Parser('<p><b>'+question+'</b></p>');
          }
          let ans_content = '';
          var label = '';
          if(quiz_answer_type === 'textbox' || quiz_answer_type === 'textarea') {
                              
                              if(total_ans_label_count > 1) { 
                                  label = Parser('<p>'+ques_label+'</p>');
                              }
                     ans_content =  Parser(quesanswer.customer_ans_content);
                              
                  if(ques_remarks === "Y") {
                              
                     //var remarks = '<p>'+'Remarks:'+quesanswer.customer_ans_remark_content+'</p>';
                              
                  }
           }else if((quiz_answer_type === 'radio' || quiz_answer_type === 'checkbox') && quesanswer.customer_ans_content !== '') {
                              
                             label = Parser('<p>'+ques_label+'</p>');
                              if(ques_remarks === "Y") {
                              
                              // var remarks = '<p>'+'Remarks:'+quesanswer.customer_ans_remark_content+'</p>';
                              
                              }
                              ans_content = '';
                              } else {}
          return (
            <li key={quesanswer.ques_id}>
                {ptag}
                {label}
                {ans_content}
            </li>
            );
          //prev_ques_id = ques_id;
         });
         return ansdetails;
       }
    }
    else {
      return '';
    }
  }        
render() {
let totalprice;
if(this.state.rows){
const totprice = this.state.rows;
const PriceTotal = totprice.reduce((TotalServicePrice, meal) => TotalServicePrice + parseFloat(meal.serv_price, 10), 0);

if(isNaN(parseFloat(PriceTotal)) === false){
   totalprice = PriceTotal;
}else{
   totalprice= '';
}
}
let totalgstprice;
if(this.state.checkedgst === true){
  totalgstprice = totalprice + (totalprice*7)/100;
}
let str = this.state.customer_phone.replace(/\d(?=\d{4})/g, "X");
return (
  <div>
       <div className="GPCLD_wrapper" >
           <div className="GPCLD_inner_wrapper">
               <div className="GPCLD_PDL_box">
                   <div className="GPCLD_PD GPCLD_PDL">
                       <h3>Personal details</h3>
                       <p><b>Name :</b><span>{this.state.customer_name}</span></p>
                       <p><b>Mobile :</b><span>{str}</span></p>
                   </div>
                    <div className="GPCLD_L GPCLD_PDL" id={this.state.ven_id}>
                            <a
                            href="javascript:void(0);"
                            onClick={this.addContact.bind(
                            this,
                            this.state.ven_id,
                            "proaskforcall"
                            )}
                            className="btn btn1 btn_sm btn_orange animate-btn2 ab-none showasktocall"
                            ><span id={'asktocall_'+this.state.ven_id}></span>Ask
                            for Call
                            </a>
                           <a
                            href="javascript:void(0);"
                            onClick={this.addContact.bind(
                            this,
                            this.state.ven_id,
                            "progenmessage"
                            )}
                            className="btn btn1 btn_sm btn_green animate-btn2 ab-none showgenmessage" style={{display:(this.state.progenmessage == 0)?'inline-block':'none'}}
                            ><span id={'genmessage_'+this.state.ven_id}></span>GenMessage
                            </a>

                            <span className="btn btn_green animate-btn2 a2c showgenrequested ab-none" style={{display:(this.state.progenmessage && this.state.progenmessage !== 0 && this.state.progenmessage == 'yes')?'inline-block':'none'}}>Requested</span>
                   </div>
               </div>
               <div className="GPCLD_Tab_wrapper">
                <Tabs defaultActiveKey="jobdetails" id="uncontrolled-tab-example">
                  <Tab eventKey="jobdetails" title="Job Details">
                      <div className="GPCLD_JobDetail_wrap GPCLD_JDEQ">
                          <h4><b>Service Name :</b> {this.state.service_name}</h4>
                          <div className="GPCLD_JobDetail_Qn">
                          <ul className="">
                            {this.getcustans_res()}
                          </ul>
                           </div>
                      </div>
                  </Tab>
                  {this.state.quote_status &&
                  <Tab eventKey="equotation" title="E Quotation">
                      <div className="GPCLD_equotation_wrap GPCLD_JDEQ">
                          <h4><b>Service Name :</b> {this.state.service_name}</h4>
                          <div className="GPCLD_EQ_Fiedls">
                                <Table striped bordered hover id="tab_logic" className="GPCLD_EQF_table">
                                    <thead>
                                      <tr>
                                        <th>Service Details</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                        <th />
                                      </tr>
                                    </thead>
                                    <tbody>

                                      {this.state.rows.map((item, idx) => (
                                        <tr id="addr0" key={idx} className="GPCLD_EQF_tbody">
                                          <td>
                                            <input
                                              type="text"
                                              name="service_desrc"
                                              autoComplete="off"
                                              value={this.state.rows[idx].service_desrc}
                                              onChange={this.handleChange(idx)}
                                              className="form-control"
                                              placeholder="Service descrpition"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              name="serv_price"
                                              autoComplete="off"
                                              value={this.state.rows[idx].serv_price}
                                              onChange={this.handleChange(idx)}
                                              className="form-control"
                                              placeholder="Service price"
                                            />
                                          </td>
                                          {this.state.errorprice}
                                          <td>
                                            <button
                                              className="btn GPCLD_EQ_action_remove"
                                              onClick={this.handleRemoveSpecificRow(idx)}
                                            >
                                              <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                </Table>
                                  <div className="errornotfilled"></div>
                          </div>

                          <div className="GPCLD_EQ_action_box">
                              <div className="custom_checkbox">
                              <input type="checkbox" onClick={this.handleChangeCheck.bind(this)}  name="displaygst" checked={this.state.checkedgst}/><span>GST {this.state.gstvalue} %</span>
                              </div>
                              <button onClick={this.handleAddRow} className="btn btn_blue animate-btn2">Add Row</button>
                          </div>
                          <div className="GPCLD_EQ_Total_wrap">
                             <ul>
                                 <li><span className="GPCLD_EQ_Total_title">Subtotal</span><span className="GPCLD_EQ_Total_det">{totalprice} SGD</span></li>
                                 <li><span className="GPCLD_EQ_Total_title">GST</span><span className="GPCLD_EQ_Total_det">{this.state.gstvalue}%</span></li>
                                 <li><span className="GPCLD_EQ_Total_title">Total Price ( GST INC )</span><span className="GPCLD_EQ_Total_det">{totalgstprice?totalgstprice:totalprice} SGD</span></li>
                             </ul>
                          </div>
                          <div className="GPCLD_EQ_submit_Btns">
                             {/* <button className="btn btn_blue btn_minwid animate-btn2 login_submit" onClick={this.sendquotation.bind(this)}>Send Quote</button>*/}

                              <button className="btn btn_blue btn_minwid animate-btn2 login_submit" onClick={this.sendquotation.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                      <span className="load-data">Loading</span> 
                                              } Send Quote
                                    </button>

                              <button onClick={this.toggleQuotationDetail} className="btn btn_orange btn_minwid animate-btn2">Preview</button>
                              <button onClick={this.toggleQuotationDetailSave} className="btn btn_green btn_minwid animate-btn2">Save Template</button>
                          </div>
                          
                      </div>
                  </Tab>
                   }
                  <Tab eventKey="jobstatus" title="Job Status">
                  <div className="GPCLD_jobstatus_wrap GPCLD_JDEQ">
                      <div className="JobStatusBtn">
                            <button className="btn btn_orange btn_minwid btn-width" onClick={this.handleConfirmJob.bind(this)}>Confirm Request
                            </button>
                             <button className="btn btn_orange btn_minwid btn-width" onClick={this.handleCancelJob.bind(this)}>Cancel Request
                            </button>
                      </div>
                  </div>
                  </Tab>
                </Tabs>
               </div>
           </div>
       </div>
        <ModalPopup modal={this.state.modalQuotationDetail} toggle={this.toggleQuotationDetail} className="modal-width QuotationDetail_popup EditDetailProperty_popup" title="E - Quotation Details" >
            <QuotationDetail quote_mode='preview' servicedata={this.state.rows} jobid={this.state.jobid} quot_gst={this.state.displaygst} totalamount={totalprice} totalamountgst={totalgstprice} quot_id={this.state.quot_id} inv_id={this.state.inv_id}/>
        </ModalPopup>  
        <ModalPopup modal={this.state.modalQuotationDetailSave} toggle={this.toggleQuotationDetailSave} className="modal-width QuotationDetailSave_popup EditDetailProperty_popup" title="E - Quotation Details" >
            <QuotationDetailSave quote_mode='save_template_preview' servicedata={this.state.rows} jobid={this.state.jobid} quot_gst={this.state.displaygst} totalamount={totalprice} totalamountgst={totalgstprice} quot_id={this.state.quot_id} inv_id={this.state.inv_id}/>
        </ModalPopup>  


        <div className="genie-msg-popup-wrapper">
              <div className="genie-msg-popup-inner-wrapper">
                  <a href="javascript:void(0)" onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
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
      procontact: state.procontact,
      jobconfirmrequest: state.jobconfirmrequest,
      leadinfo: state.leadinfo,
      savequotation: state.savequotation,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getContact: formPayload => {
        dispatch({ type: GET_CONTACT, formPayload });
      },
     getJobconfirmRequest: (formPayload) => {
          dispatch({ type: GET_JOBCONFIRMREQUEST, formPayload });
      },
      getLeadInfo: (UserToken, jobID) => {
          dispatch({ type: GET_LEADINFO, UserToken, jobID });
      },
       getSaveQuotation: (formPayload) => {
          dispatch({ type: GET_SAVEQUOTATION, formPayload });
      },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenProCustomerLeadDetail));
