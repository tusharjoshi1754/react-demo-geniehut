/* eslint-disable */
import React, { Component } from 'react';
import { Table  } from 'react-bootstrap';
import { appName } from "../Config/Config";
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_SAVEQUOTATION } from '../../actions';
import $ from 'jquery';
import SuccessMsg from '../../common/images/success-msg.png';
import ErrorMsg from '../../common/images/error-msg.png';

class QuotationDetailSave extends Component {
	constructor(props) {
		super(props);	
    this.state = {
          rows: this.props.servicedata,
          totalamount:this.props.totalamount,
          totalamountgst:this.props.totalamountgst,
          GST:this.props.quot_gst,
          quotationDeatils:'',
          template_name:''
      }
     this.handleInputChange = this.handleInputChange.bind(this);
	  }

 handleInputChange(event) {
    
      const {name, value} = event.target;
      this.setState({
          [name]: value
        });    
 }
 closepopup(){
  $('.genie-close-btn').click( function(event) {
    $(this).parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
  });
}
  sendquotation = () => {
    const formPayload = this.state;
      let quot_gst;
      if(formPayload.quot_gst === 1){
            quot_gst = 'Y' ;
      }else{
            quot_gst = 'N'
      }
       var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_token" : cookie.load('UserAuthToken'),
          "job_id": this.props.jobid,
          "quot_data": this.state.rows,
          "quot_gst": quot_gst,
          "total_amount": formPayload.totalamount,
          "total_amount_gst": formPayload.totalamountgst,
          "quot_id":this.props.quot_id,
          "inv_id":this.props.inv_id,
          "template_name":formPayload.template_name,
          "quote_mode": 'save_template',
          };
    this.props.getSaveQuotation(qs.stringify(postObject));

  }
 	componentWillReceiveProps(Props) {
    if(Object.keys(Props.savequotation).length > 0) {
        if(Props.savequotation !== this.props.savequotation){
          if(Props.savequotation[0].status === 'success'){
          if(Props.savequotation[0].message === 'save_templated'){
            $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
                $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Quotation Saved Successfully</p> ');
          }
         }else{
           $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="errorMsg" /></div><h2 class="title3">Success</h2><p>Quotation Saved Successfully</p> ');
         }
        }
      }
  }

  quotationtable() {
    const quotationdata = this.state.rows;
    if(quotationdata!== undefined && quotationdata!== null){
      if(Object.keys(quotationdata).length > 0) {
         const quotationDeatils = quotationdata.map((quotation, quotationIndex) => {
            return (
                        <tr key={quotation.sg_quot_det_id}>
                           <td>{quotation.quot_desc}</td>
                           <td>{quotation.quot_amount}</td>
                       </tr>

                    
                   );
    
     });
      return quotationDeatils;
     }
    } else {
      return false;
    }
  }

  render() {

    return (
	<div>
       <div className="GPCLD_wrapper">
           <div className="GPCLD_inner_wrapper">
               <div className="GPCLD_PDL_Template">
                   <form action="">
                        <div className="form-group">
                            <label>Template Name:</label>
                            <input type="text" name="template_name" autoComplete="off" onChange={this.handleInputChange} className="form-control" />
                        </div>
                   </form>
               </div>
               <div className="GPCLD_Tab_wrapper">
                  <div className="GPCLD_equotation_wrap GPCLD_JDEQ">
                      <div className="GPCLD_EQ_Fiedls">
                            <Table striped bordered hover id="tab_logic" className="GPCLD_EQF_table">
                                <thead>
                                  <tr>
                                    <th>Service Details</th>
                                    <th>Price</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                   {this.quotationtable()}
                                </tbody>
                            </Table>
                      </div>
                      <div className="GPCLD_EQ_Total_wrap GPCLD_E-QView_Total">
                         <ul>
                             <li><span className="GPCLD_EQ_Total_title">Subtotal</span><span className="GPCLD_EQ_Total_det">{this.state.totalamount} SGD</span></li>
                             <li><span className="GPCLD_EQ_Total_title">GST</span><span className="GPCLD_EQ_Total_det">{this.state.GST?7:''}%</span></li>
                             <li><span className="GPCLD_EQ_Total_title">Total Price ( GST INC )</span><span className="GPCLD_EQ_Total_det Big">{this.state.totalamountgst} SGD</span></li>
                         </ul>
                      </div>
                      <div className="GPCLD_EQoute_wrap">
                          <div className="JobStatusBtn">
                              <button onClick={this.sendquotation.bind(this)} className="btn btn_blue btn_minwid animate-btn2">Save</button>
                          </div>
                      </div>
                  </div>
               </div>
           </div>
       </div>

           <div className="genie-msg-popup-wrapper">
              <div className="genie-msg-popup-inner-wrapper">
                  <a onClick={this.closepopup} href="#"  className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
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
      savequotation: state.savequotation,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getSaveQuotation: (formPayload) => {
          dispatch({ type: GET_SAVEQUOTATION, formPayload });
      },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(QuotationDetailSave));
