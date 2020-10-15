import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { appName } from "../Config/Config";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GET_QUOTATION } from "../../actions";

class QuotationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.servicedata,
      customer_name: "",
      customer_phone: "",
      user_postalcode: "",
      service_name: "",
      totalamount: "",
      totalgst: "",
      quotationDate: "",
      vendor_name: "",
      vendor_phone: "",
      GST: "",
      quotationDeatils: "",
      user_address: "",
      user_unitno: "",
      quotNO: ""
    };
    this.getQuotationDetails();
  }

  getQuotationDetails = () => {
    const formPayload = this.props;
    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      job_id: formPayload.job_id,
      vendor_id: formPayload.vendor_id
    };
    this.props.getQuotation(qs.stringify(postObject));
  };

  componentWillReceiveProps(Props) {
    if (Object.keys(Props.quotation).length > 0) {
      if (Props.quotation !== this.props.quotation) {
        if (Props.quotation[0].status === "success") {
          const savequot = Props.quotation[0].result_set;
          this.setState({ customer_name: savequot.cust_res.user_name });
          this.setState({ user_address: savequot.cust_res.user_address });
          this.setState({
            user_unitno: savequot.cust_res.useruser_unitno_address
          });
          this.setState({ user_postalcode: savequot.cust_res.user_postalcode });

          this.setState({ customer_phone: savequot.cust_res.user_mobile });
          this.setState({ user_postalcode: savequot.cust_res.user_postalcode });
          this.setState({ vendor_name: savequot.ven_res.user_name });
          this.setState({ vendor_phone: savequot.ven_res.user_mobile });
          this.setState({
            vendor_postalcode: savequot.ven_res.user_postalcode
          });
          this.setState({ service_name: savequot.service_name });
          this.quotationtable(Props.quotation[0].result_set);
          this.setState({
            totalamount:
              Props.quotation[0].result_set.quot_res.quot_total_amount
          });
          this.setState({
            totalgst:
              Props.quotation[0].result_set.quot_res.quot_total_amount_gst
          });
          this.setState({
            quotNO: Props.quotation[0].result_set.quot_res.quot_no
          });
          this.setState({
            quotationDate:
              Props.quotation[0].result_set.quot_res.quot_created_on
          });
          if (Props.quotation[0].result_set.quot_res.quot_gst === "Y") {
            this.setState({ GST: 7 });
          } else {
            this.setState({ GST: "" });
          }
        }
      }
    }
  }

  quotationtable(quotations) {
    const quotationdata = quotations;
    if (quotationdata !== undefined && quotationdata !== null) {
      if (Object.keys(quotationdata.quot_det_res).length > 0) {
        const quotationDeatils = quotationdata.quot_det_res.map(quotation => {
          return (
            <tr key={quotation.sg_quot_det_id}>
              <td>{quotation.quot_desc}</td>
              <td>{quotation.quot_amount}</td>
            </tr>
          );
        });
        this.setState({ quotationDeatils: quotationDeatils });
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
            <div className="GPCLD_PDL_Header">
              <h3>{this.state.service_name}</h3>
              <p>
                <b>Date: </b> <span>{this.state.quotationDate}</span>
              </p>
              <p>
                <b>E - Quotation No: </b> <span>{this.state.quotNO}</span>
              </p>
            </div>
            <div className="GPCLD_PDL_box">
              <div className="GPCLD_PD GPCLD_PDL">
                <h3>Personal details</h3>
                <p>
                  <b>Name :</b>
                  <span>{this.state.vendor_name}</span>
                </p>
                <p>
                  <b>Mobile :</b>
                  <span>{this.state.vendor_phone}</span>
                </p>
              </div>
              {/*<div className="GPCLD_L GPCLD_PDL">
                <h3>Location</h3>
                <p>
                  <b>Address :</b>
                  <span>{this.state.user_address}</span>
                </p>
                <p>
                  <b>Unit number :</b>
                  <span>
                    {this.state.user_unitno !== "" &&
                    this.state.user_unitno !== null
                      ? this.state.user_unitno
                      : "-"}
                  </span>
                </p>
                <p>
                  <b>Postal code :</b>
                  <span>{this.state.user_postalcode}</span>
                </p>
              </div>*/}
            </div>
            <div className="GPCLD_Tab_wrapper">
              <div className="GPCLD_equotation_wrap GPCLD_JDEQ">
                <div className="GPCLD_EQ_Fiedls">
                  <Table
                    striped
                    bordered
                    hover
                    id="tab_logic"
                    className="GPCLD_EQF_table"
                  >
                    <thead>
                      <tr>
                        <th>Service Details</th>
                        <th>Price</th>
                        <th />
                      </tr>
                    </thead>
                    {this.state.quotationDeatils !== "" && (
                      <tbody>{this.state.quotationDeatils}</tbody>
                    )}
                  </Table>
                </div>
                <div className="GPCLD_EQ_Total_wrap GPCLD_E-QView_Total">
                  <ul>
                    <li>
                      <span className="GPCLD_EQ_Total_title">Subtotal</span>
                      <span className="GPCLD_EQ_Total_det">
                        {this.state.totalamount}SGD
                      </span>
                    </li>

                    <li>
                      <span className="GPCLD_EQ_Total_title">GST</span>
                      <span className="GPCLD_EQ_Total_det">
                        {this.state.GST !== "" && this.state.GST !== null
                          ? this.state.GST
                          : "0"}
                        %
                      </span>
                    </li>

                    <li>
                      <span className="GPCLD_EQ_Total_title">
                        Total Price ( GST INC )
                      </span>
                      <span className="GPCLD_EQ_Total_det Big">
                        {this.state.totalgst} SGD
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="GPCLD_EQoute_wrap">
                  <div className="JobStatusBtn">
                    <button
                      className="btn btn_blue btn_minwid animate-btn2"
                      onClick={this.props.toggle}
                    >
                      Ok
                    </button>
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

const mapStateTopProps = state => {
  return {
    quotation: state.quotation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuotation: formPayload => {
      dispatch({ type: GET_QUOTATION, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(QuotationDetail));
