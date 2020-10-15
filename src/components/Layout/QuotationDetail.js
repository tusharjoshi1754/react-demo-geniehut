import React, { Component } from 'react';
import { Table  } from 'react-bootstrap';
import { appName } from "../Config/Config";
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_SAVEQUOTATION } from '../../actions';

class QuotationDetail extends Component {
	constructor(props) {
		super(props);	
            this.state = {
                 rows: this.props.servicedata,
                 customer_name:'',
                 customer_phone:'',
                 user_postalcode:'',
                 service_name:'',
                 totalamount:'',
                 totalgst:'',
                 quotationDate:'',
                 vendor_name:'',
                 vendor_phone:'',
                 GST:'',
                 quotationDeatils:'',
                 quotNO:'',
              }
        this.savetemplate();
	  }
	
  savetemplate = () => {
    const formPayload = this.props;
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
          "job_id": formPayload.jobid,
          "quot_data": this.state.rows,
          "quot_gst": quot_gst,
          "total_amount": formPayload.totalamount,
          "total_amount_gst": formPayload.totalamountgst,
          "quot_id":formPayload.quot_id,
          "inv_id":formPayload.inv_id,
          "quote_mode": 'preview',
          };
       this.props.getSaveQuotation(qs.stringify(postObject));

  }

  componentWillReceiveProps(Props) {
     if(Object.keys(Props.savequotation).length > 0) {
      if(Props.savequotation !== this.props.savequotation){
        if(Props.savequotation[0].status === 'success'){
          const savequot = Props.savequotation[0].result_set;
          this.setState({customer_name: savequot.cust_res.user_name})
          this.setState({customer_phone: savequot.cust_res.user_mobile})
          this.setState({user_postalcode: savequot.cust_res.user_postalcode})
          this.setState({vendor_name: savequot.ven_res.user_name})
          this.setState({vendor_phone: savequot.ven_res.user_mobile})
          this.setState({vendor_postalcode: savequot.ven_res.user_postalcode})
          this.setState({service_name: savequot.service_name})
          this.quotationtable(Props.savequotation[0].result_set)
          this.setState({totalamount: Props.savequotation[0].result_set.quot_res.quot_total_amount})
          this.setState({totalgst: Props.savequotation[0].result_set.quot_res.quot_total_amount_gst})
          this.setState({quotNO: Props.savequotation[0].result_set.quot_res.quot_no})
          this.setState({quotationDate: Props.savequotation[0].result_set.quot_res.quot_created_on})
          if(Props.savequotation[0].result_set.quot_res.quot_gst === 'Y'){
              this.setState({GST: 7})
          }else{
            this.setState({GST: ''})
          }
        }
      }
    }
  }

quotationtable(quotations) {
  const quotationdata = quotations;
    if(quotationdata!== undefined && quotationdata!== null){
      if(Object.keys(quotationdata).length > 0) {
         const quotationDeatils = quotationdata.quot_det_res.map((quotation, quotationIndex) => {
            return (
                        <tr key={quotation.sg_quot_det_id}>
                           <td>{quotation.quot_desc}</td>
                           <td>{quotation.quot_amount}</td>
                       </tr>

                    
                   );
    
     });
      this.setState({quotationDeatils:quotationDeatils});
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
               <div class="GPCLD_PDL_Header">
                   <h3>{this.state.service_name}</h3>
                   <p><b>Date: </b> <span>{this.state.quotationDate}</span></p>
                   <p><b>E - Quotation No: </b> <span>{this.state.quotNO}</span></p>
               </div>
               <div className="GPCLD_PDL_box">
                   <div className="GPCLD_PD GPCLD_PDL">
                       <h3>Personal details</h3>
                        <p><b>Name :</b><span>{this.state.vendor_name}</span></p>
                       <p><b>Mobile :</b><span>{this.state.vendor_phone}</span></p>
                   </div>
                   <div className="GPCLD_L GPCLD_PDL">
                       <h3>E - Quotation For</h3>
                       <p><b>Name :</b><span>{this.state.customer_name}</span></p>
                       <p><b>Mobile :</b><span>{this.state.customer_phone}</span></p>
                   </div>
               </div>
               <div class="GPCLD_Tab_wrapper">
                  <div class="GPCLD_equotation_wrap GPCLD_JDEQ">
                      <div class="GPCLD_EQ_Fiedls">
                            <Table striped bordered hover id="tab_logic" className="GPCLD_EQF_table">
                                <thead>
                                  <tr>
                                    <th>Service Details</th>
                                    <th>Price</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                {this.state.quotationDeatils}
                                </tbody>
                            </Table>
                      </div>
                      <div class="GPCLD_EQ_Total_wrap GPCLD_E-QView_Total">
                         <ul>
                             <li><span class="GPCLD_EQ_Total_title">Subtotal</span><span class="GPCLD_EQ_Total_det">{this.state.totalamount}SGD</span></li>
                             <li><span class="GPCLD_EQ_Total_title">GST</span><span class="GPCLD_EQ_Total_det">{this.state.GST}%</span></li>
                             <li><span class="GPCLD_EQ_Total_title">Total Price ( GST INC )</span><span class="GPCLD_EQ_Total_det Big">{this.state.totalgst} SGD</span></li>
                         </ul>
                      </div>
                      <div class="GPCLD_EQoute_wrap">
                          <div class="JobStatusBtn">
                              <button className="btn btn_blue btn_minwid animate-btn2">Ok</button>
                          </div>
                      </div>
                  </div>
               </div>
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(QuotationDetail));
