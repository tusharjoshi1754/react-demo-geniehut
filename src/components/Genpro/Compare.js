/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { appName } from "../Config/Config";
import { GET_COMPARE_LIST, GET_CONTACT } from "../../actions";
import cookie from "react-cookies";
import { StickyTable, Row, Cell } from "react-sticky-table";
import {
  LoadImage,
  LoadingSec,
  Encrypt,
  CheckAuth
} from "../Helpers/SettingHelper";
import $ from "jquery";
class Compare extends Component {
  constructor(props) {
    super(props);
    CheckAuth();
    this.state = {
      UserAuthToken: cookie.load("UserAuthToken"),
      ref_id: this.props.qcsdID,
      service_id: this.props.service_id,
      pro_id: this.props.pro_id,
      vendorsdetails: "",
      vendorsaddress: "",
      vendorswebsite: "",
      vendorsrating: "",
      vendorsquiz: "",
      loading: true,
      comppro_id: "",
      contactID: ""
    };
  }
  componentDidMount() {
    let params = [];
    params["user_token"] = this.state.UserAuthToken;
    params["app_name"] = appName;
    params["ref_id"] = this.state.ref_id;
    params["pro_id"] = this.state.pro_id;
    var qs = require("qs");
    this.props.getCompareList(qs.stringify(params));
  }
  componentWillReceiveProps(Props) {
    if (Props.compareList !== this.props.compareList) {
      this.setState({ loading: false });
      if (Props.compareList[0].status === "success") {
        this.setState(
          { compareList: Props.compareList[0].result_set },
          function() {
            this.displayVendors();
            this.loadvendorquze();
          }
        );
      }
    }
    if (Props.procontact !== this.props.procontact) {
      if (Props.procontact[0].status === "success") {
        //if(Props.procontact[0].email!=='' && typeof Props.procontact[0].email!=="undefined") {
        $("#" + this.state.comppro_id + " .psdc-bottom .contact").html(
          "Contacted"
        );
        $("#" + this.state.comppro_id + " .contactInfo").show();
        this.setState({ comppro_id: "" });

        this.setState(
          { contactID: Props.procontact[0].user_id },
          function() {
            this.displayVendors();
          }
        );

        //}
      }
    }
  }

  displayVendors() {
    let vendorsdetails,
      vendorsaddress,
      vendorshopaddr,
      vendorswebsite,
      vendorsrating,
      moreDetails;
      console.log(this.state.compareList.list_all)
    if (
      this.state.compareList.list_all !== "" &&
      typeof this.state.compareList.list_all !== undefined
    ) {
      vendorsdetails = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let vendors = item[1].info;
          let contactedId = '';
          if(this.state.contactID!== '' && this.state.contactID!== null){
            contactedId = this.state.contactID;  
          }
          let indexs = '';
          if(contactedId == item[0]){
            indexs = 'yes';
          }else{
            indexs = 'no';
          }
          
          return (
            <Cell key={index} id={item[0]}>
              <div class="pro-compare-header">
                {/*<a href="javascript:void(0);" class="pch-delete" onClick={this.removeCompare.bind(this, item[0])} ><i class="fa fa-trash" aria-hidden="true"></i></a>*/}
                <div className="psdc-img">
                  <img
                    src={LoadImage(vendors.user_profile_image, "profile")}
                    alt=""
                  />
                </div>
                <div className="psdc-txt">
                  <div class="psdc-content">
                    <h3>{vendors.user_name}</h3>
                    <div
                      style={{
                        display:
                          indexs == "yes"
                            ? ""
                            : "none"
                      }}
                      className="contactInfo"
                    >
                      <p>
                        <a href={"tel:" + vendors.user_mobile}>
                          {vendors.user_mobile}
                        </a>
                        <br />
                        <a href={"mailto:" + vendors.vendor_email}>
                          {vendors.vendor_email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="psdc-bottom">
                  {indexs == "yes" ? (
                    <a
                      href="javascript:void(0);"
                      class="btn btn1 btn_sm btn_blue animate-btn2 ab-none"
                    >
                      Contacted
                    </a>
                  ) : (
                    <a
                      href="javascript:void(0);"
                      class="btn btn1 btn_sm btn_blue animate-btn2 ab-none contact"
                      onClick={this.addContact.bind(this, item[0], "contact")}
                    >
                      Contact
                    </a>
                  )}

                  {vendors.feature_sms_callback === "Y" ? (
                  <span>
                    {vendors.askforcall !== "" && vendors.askforcall !== null ? (
                            
                                <a href="javascript:void(0);"
                                class="btn btn1 btn_sm btn_orange animate-btn2 ab-none">
                                Requested
                                </a>
                            ) : (
                                <a href="javascript:void(0);"
                                class="btn btn1 btn_sm btn_orange animate-btn2 ab-none"
                                onClick={this.addContact.bind(
                                this,
                                item[0],
                                "askforcall"
                                )}
                                >
                                Ask for Call
                                </a>
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                {vendors.contactgenmessage === "yes" ? (
                  <span>
                      {vendors.genmessage !== "" && vendors.genmessage !== null ? (
                            
                                <a href="javascript:void(0);"
                                class="btn btn1 btn_sm btn_green animate-btn2 ab-none">
                                requested
                                </a>
                            ) : (
                                <a href="javascript:void(0);"
                                class="btn btn1 btn_sm btn_green animate-btn2 ab-none"
                                onClick={this.addContact.bind(
                                this,
                                item[0],
                                "genmessage"
                                )}
                                >
                                GenMessage
                                </a>
                            )}
                          </span>
                        ) : (
                          ""
                    )} 
          
                </div>
              </div>
            </Cell>
          );
        }
      );
      vendorsaddress = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let vendors = item[1].info;
          return (
            <Cell key={index}>
              <div class="compare-weblink">
                {vendors.vendor_email !== "" &&
                vendors.vendor_email !== null ? (
                  <a href={"mailto:" + vendors.vendor_email}>
                    {vendors.vendor_email}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </Cell>
          );
        }
      );

    vendorshopaddr = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let vendors = item[1].info;
          return (
            <Cell key={index}>
              <div class="compare-weblink">
                {vendors.publishcompanyaddr >0  && vendors.vendor_company_address !== "" &&
                vendors.vendor_company_address !== null ? (
                    vendors.vendor_company_address
                ) : (
                  "N/A"
                )}
              </div>
            </Cell>
          );
        }
      );

      vendorswebsite = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let vendors = item[1].info;
          let vendor_webaddress = "";
          if (
            vendors.vendor_webaddress !== "" &&
            vendors.vendor_webaddress !== null
          ) {
            if (vendors.vendor_webaddress.indexOf("http") >= 0) {
              vendor_webaddress = vendors.vendor_webaddress;
            } else {
              vendor_webaddress = "http://" + vendors.vendor_webaddress;
            }
          }

          return (
            <Cell key={index}>
              <div class="compare-weblink">
                {vendor_webaddress !== "" && vendor_webaddress !== null ? (
                  <a
                    href={vendor_webaddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {vendors.vendor_webaddress}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </Cell>
          );
        }
      );
      vendorsrating = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let vendors = item[1].info;
          return (
            <Cell key={index}>
              <div class="compare-rr">
                <span class="crr-rating">
                  {parseFloat(vendors.user_ratings)}{" "}
                  <i
                    class={
                      vendors.user_ratings > 0 ? "fa fa-star" : "fa fa-star-o"
                    }
                    aria-hidden="true"
                  ></i>
                </span>{" "}
                <span> / {vendors.vendor_reviews_count} Reviews</span>
              </div>
            </Cell>
          );
        }
      );
      moreDetails = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          return (
            <Cell key={index}>
              <Link
                to={{
                  pathname:
                    "/customer/pro-service-detail/" +
                    Encrypt(item[0], "e") +
                    "/" +
                    Encrypt(this.state.compareList.ref_id, "e")
                }}
                class="btn btn1 btn_sm btn_green animate-btn2 ab-none table-compare-more"
                target="_blank"
              >
                More Details
              </Link>
            </Cell>
          );
        }
      );
    }
    this.setState({
      vendorsdetails: vendorsdetails,
      vendorsaddress: vendorsaddress,
      vendorshopaddr: vendorshopaddr,
      vendorswebsite: vendorswebsite,
      vendorsrating: vendorsrating,
      moreDetails: moreDetails
    });
  }
  loadvendorquze() {
    let vendorsquiz = "";
    if (
      this.state.compareList.list_all !== "" &&
      typeof this.state.compareList.list_all !== undefined
    ) {
      vendorsquiz = Object.entries(this.state.compareList.ques_all).map(
        (item, index) => {
          let quiz = item[1];
          return (
            <Row key={index}>
              <Cell>
                <b>{quiz.quiz_question}</b>
              </Cell>
              {this.loadanswer(quiz.quiz_id, quiz.quiz_answer_type)}
            </Row>
          );
        }
      );
    }
    this.setState({ vendorsquiz: vendorsquiz });
  }
  loadanswer(quiz_id, quiz_answer_type) {
    let answer = "";
    if (
      this.state.compareList.list_all !== "" &&
      typeof this.state.compareList.list_all !== undefined
    ) {
      answer = Object.entries(this.state.compareList.list_all).map(
        (item, index) => {
          let answerList = item[1].question;
          return (
            <Cell key={index}>
              {answerList[quiz_id] !== "" &&
              typeof answerList[quiz_id] !== undefined
                ? this.loadMultiAnswer(answerList[quiz_id], quiz_answer_type)
                : "<span>N/A</span>"}
            </Cell>
          );
        }
      );
    }
    return answer;
  }

  loadMultiAnswer(answerList, quiz_answer_type) {
    let ansList = "";
    if (answerList !== "" && typeof answerList !== undefined) {
      ansList = Object.entries(answerList).map((item, index) => {
        return (
          <ul class="table-compare-listing" key={index}>
            <li>
              {item[1].answer}
              {item[1].remark !== "" && typeof item[1].remark !== undefined && (
                <span>{item[1].remark}</span>
              )}
            </li>
          </ul>
        );
      });
    }
    return ansList;
  }

  addContact(pro_id, type) {
    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = this.state.UserAuthToken;
    postdata["ref_id"] = Encrypt(this.state.compareList.ref_id, "e");
    postdata["pro_id"] = Encrypt(pro_id, "e");

    postdata["type"] = type;
    postdata["sendtype"] = 'customer';
    this.setState({ comppro_id: pro_id });
    this.props.getContact(postdata);
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.loading === true && LoadingSec}
          {this.state.loading === false && (
            <div className="pro-compare-inner-wrapper">
              <div className="pro-compare-table">
                <div style={{ width: "100%" }}>
                  <StickyTable stickyColumnCount={1}>
                    <Row>
                      <Cell>
                        <b>Details</b>
                      </Cell>
                      {this.state.vendorsdetails}
                    </Row>

                    {/*<Row>
                        <Cell><b>Email Address</b></Cell>
                        {this.state.vendorsaddress}
                    </Row>*/}
                    <Row>
                      <Cell>
                        <b>Website</b>
                      </Cell>
                      {this.state.vendorswebsite}
                    </Row>
                     <Row>
                        <Cell><b>Shop Address</b></Cell>
                        {this.state.vendorshopaddr}
                    </Row>
                    <Row>
                      <Cell>
                        <b>Rating / Reviews</b>
                      </Cell>
                      {this.state.vendorsrating}
                    </Row>
                    {this.state.vendorsquiz}

                    <Row>
                      <Cell></Cell>
                      {this.state.moreDetails}
                    </Row>
                  </StickyTable>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    compareList: state.compareList,
    procontact: state.procontact
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCompareList: formPayload => {
      dispatch({ type: GET_COMPARE_LIST, formPayload });
    },
    getContact: formPayload => {
      dispatch({ type: GET_CONTACT, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Compare));
