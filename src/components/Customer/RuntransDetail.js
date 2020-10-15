/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import DivSection from "../Layout/DivSection";
import DollarHand from "../../common/images/dollar-hand.png";
import ModalPopup from "../Layout/ModalPopup";
import GenListPopup_Content from "../Customer/GenListPopup";
import {
  LoadingSec,
  TransData,
  DisplayStatus,
  CurrencyIconFormat,
  getTimeFrmDate,
  LoadImage
} from "../Helpers/SettingHelper";
import $ from "jquery";

import { GET_CUSTOMER_TRANS } from "../../actions";

class RuntransDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transID: this.props.location.state.transId,
      trandLoading: true,
      EditRunErand: false,
      GenListPopup: false,
      transData: "",
      service_list: "",
      last_counter: "",
      RunnerDetails: "",
      transleft: "",
      transright: "",
      acceptedPerson: ""
    };
    this.EditRunErand = this.EditRunErand.bind(this);
    this.GenListPopup = this.GenListPopup.bind(this);
  }

  componentDidMount() {
    $(document).ready(function() {
      $("a.counter-offer-btn").click(function() {
        $(this)
          .parent(".counter-offer")
          .find(".counter-offer-box")
          .addClass("open");
        $(this)
          .parents("body")
          .addClass("genie-popup-shade");
      });
      $(".btn.cob-btn").click(function() {
        $(this)
          .parents(".counter-offer")
          .find(".counter-offer-box")
          .removeClass("open");
        $(this)
          .parents("body")
          .removeClass("genie-popup-shade");
      });
    });

    $(document).click(function(e) {
      if (!$(e.target).is("a.counter-offer-btn, .counter-offer-box * ")) {
        if ($(".counter-offer-box").is(":visible")) {
          $(".counter-offer-box").removeClass("open");
          $(".counter-offer-box")
            .parents("body")
            .removeClass("genie-popup-shade");
        }
      }
    });
    this.props.getCustomerTrans(this.state.transID);
  }
  componentWillReceiveProps(Props) {
    if (Props.customertrans !== this.props.customertrans) {
      if (Props.customertrans[0].status === "Success") {
        this.setState(
          {
            transData: Props.customertrans[0].result_set.record,
            service_list: Props.customertrans[0].result_set.service_list,
            last_counter: Props.customertrans[0].result_set.last_counter,
            trandLoading: false
          },
          function() {
            this.loadRunnerDetails();
            this.loadTransDetails();
            this.loadTransDetailsright();
          }
        );
      } else if (Props.customertrans[0].status === "authenticfailed") {
        window.location.href = "/logout";
      }
    }
  }

  EditRunErand() {
    this.setState(prevState => ({
      EditRunErand: !prevState.EditRunErand
    }));
  }
  loadTransactionDetails(userID) {
    /* if(this.state.acceptedPerson==='' || this.state.acceptedPerson===userID) {
            if(userID!=='') {*/
    this.setState({ userID: userID });
    /*}   
           
        }*/
    this.GenListPopup();
  }
  GenListPopup() {
    this.setState(prevState => ({
      GenListPopup: !prevState.GenListPopup
    }));
  }

aboutmecontent(transId) {
   
     if ($("#listabout_" + transId).hasClass("h-toggle") === false) {
      $("#listabout_" + transId).addClass("h-toggle");
      $(".read_district" + transId).text("Read More");
    } else {
      $("#listabout_" + transId).removeClass("h-toggle");
      $(".read_district" + transId).text("Read Less");
    }

  }

  loadTransDetails() {
    console.log(this.state.transData)
    const leftContent = (
      <div className="genLead-flex-left">
        <div className="genrun_leads_info_header">
          <div className="GRL_info_left">
            <div className="GRL_info_img">
              <img
                src={LoadImage(
                  this.state.transData.services_background_img,
                  "service"
                )}
                alt=""
              />
            </div>
            <div className="GRL_info_title">
              <h2>{this.state.transData.services_title}</h2>
              <h3 className="co_fees">
                Initial Price:{" "}
                {CurrencyIconFormat(this.state.transData.trans_fee)}
              </h3>
            </div>
          </div>
          <div className="GRL_info_right">
            <span className="gencus_trans_status Pending">
              {DisplayStatus(this.state.transData.trans_status)}
            </span>
          </div>
        </div>
        <div className="genrun_user_info_wrap WTJ_wrap">
          <div className="genrun_user_info_box">
            <h4>{this.state.transData.trans_subtitle}</h4>
              <p id={"listabout_" +this.state.transData.trans_id}
                                    className="hidi-content h-toggle" >
                                     {this.state.transData.trans_desc}
                                    </p>
          
             <div className="gen-follow-rm">
                            {this.state.transData.trans_desc !== "" &&
                            this.state.transData.trans_desc !== null &&
                            this.state.transData.trans_desc.length > 150 ? (
                            <a
                            href="javascript:void(0);"
                            className={
                            "read_district" + this.state.transData.trans_id+ " readmore"
                            }
                            onClick={this.aboutmecontent.bind(
                            this,
                            this.state.transData.trans_id
                            )}
                            >
                            Read More
                            </a>
                            ) : (
                            ""
                            )}
                            </div>
          </div>
          <div></div>
        </div>
        {this.loadRunnerDetails()}
      </div>
    );
    this.setState({ transleft: leftContent });
  }
  loadTransDetailsright() {
    let gender;
    if (
      this.state.transData.trans_gender !== "" &&
      this.state.transData.trans_gender !== null
    ) {
      if (this.state.transData.trans_gender === "M") {
        gender = "Male";
      } else if (this.state.transData.trans_gender === "F") {
        gender = "Female";
      }
    }
    const Content = (
      <div className="genLead-flex-right">
        <div className="genrun_user_info_wrap">
          <div className="genrun_user_info_box head">
            <h3>{this.state.transData.user_name}</h3>
            {/*<a href="javascript:void(0)" onClick={this.EditRunErand}><i className="fa fa-pencil" aria-hidden="true"></i></a>*/}
          </div>
          <div className="genrun_user_info_box">
            <ul className="GRIL_title_list">
              <li>
                <span className="GRIL_title">Transaction ID:</span>
                <span className="GRIL_txt">
                  {this.state.transData.trans_key}
                </span>
              </li>
              <li>
                <span className="GRIL_title">Gender:</span>
                <span className="GRIL_txt">
                  {this.state.transData.trans_gender !== "" &&
                  this.state.transData.trans_gender !== null
                    ? gender
                    : "No Preference"}
                </span>
              </li>
              <li>
                <h4>Information</h4>
              </li>
              <li>
                <span className="GRIL_title">Service Start Date:</span>
                <span className="GRIL_txt">
                  {TransData(this.state.transData.trans_startdate)}
                </span>
              </li>
              <li>
                <span className="GRIL_title">Service End Date:</span>
                <span className="GRIL_txt">
                  {TransData(this.state.transData.trans_enddate)}
                </span>
              </li>
              <li>
                <span className="GRIL_title">Category:</span>
                <span className="GRIL_txt">
                  {this.state.transData.services_title}
                </span>
              </li>
              <li>
                <span className="GRIL_title">District (Pick up):</span>
                <span className="GRIL_txt">
                  {this.state.transData.districts_name !== "" &&
                  this.state.transData.districts_name !== null
                    ? this.state.transData.districts_name
                    : "No meet is required"}
                </span>
              </li>
              <li>
                <span className="GRIL_title">Status:</span>
                <span className="GRIL_txt">
                  {DisplayStatus(this.state.transData.trans_status)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
    this.setState({ transright: Content });
  }

  loadRunnerDetails() {
    let RunnerDetails = "";
    if (
      this.state.service_list !== "" &&
      this.state.service_list !== null &&
      Object.keys(this.state.service_list).length > 0
    ) {
      RunnerDetails = (
        <div className="genrunList-section WTJ_wrap">
          <h2 className="genrunList-section-title">List of GenRun engaged</h2>
          <p>
            Give rating and review to GenRun part timer to earn 20 GH points
            each.
          </p>
          {this.loadrunners()}
        </div>
      );
    } else {
      RunnerDetails = (
        <div className="genrunList-section WTJ_wrap">
          <h2 className="genrunList-section-title">List of GenRun engaged</h2>
          <div className="genrunList-box">
            <div className="genrunList-center">No records found.</div>
          </div>
        </div>
      );
    }
    return RunnerDetails;
  }

  loadrunners() {
    let accepted = "";
    const lists = this.state.service_list.map((item, index) => {
      console.log(item)
      if (item.gen_service_status !== "I") {
        if (item.accept_status_pro === "Y" && item.accept_status_cust === "Y") {
          accepted = item.user_id;
        }
        return (
          <div
            className="genrunList-box"
            key={index}
            onClick={this.loadTransactionDetails.bind(this, item.user_id)}
          >
            <div className="genrunList-left">
              <div className="genrunList-left-img">
                <img
                  src={LoadImage(item.user_profile_image, "profile")}
                  alt=""
                />
              </div>
              <div className="genrunList-left-content">
                <h3>{item.user_nickname?item.user_nickname:item.user_name}</h3>
                <div className="gl-rate-date">
                  {item.avg > 0 ? (
                    <div className="gl-rate">
                      <span>
                        {item.avg}
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.quote_created !== null ? (
                    <div className="gl-date">
                      <span>{TransData(item.quote_created)}</span>
                      <span>{getTimeFrmDate(item.quote_created, 2)}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="genrunList-right">
              {item.quote_amount !== null ? (
                <div className="price">
                  <img src={DollarHand} alt="" />{" "}
                  {CurrencyIconFormat(item.quote_amount)}
                </div>
              ) : (
                ""
              )}
              {item.accept_status_pro === "Y" &&
                item.accept_status_cust === "" && (
                  <div className="push_not_btn">
                    <span>Accepted</span>
                  </div>
                )}
              {item.accept_status_pro === "Y" &&
                item.accept_status_cust === "Y" && (
                  <div className="push_not_btn">
                    <span>Completed with this Person</span>
                  </div>
                )}
            </div>
          </div>
        );
      }
    });
    this.setState({ acceptedPerson: accepted });
    return lists;
  }

  render() {
    return (
      <div>
        <Header />
        <DivSection activepage="run" />
        {this.state.trandLoading === true ? LoadingSec : ""}
        <div className="wrapper_out">
          <div className="container">
            <div className="genrun-leads-wrapper">
              <div className="genrun-leads-info-wrapper">
                <div className="genrun_leads_info_wrap">
                  <div className="genrun_leads_info_back">
                    <Link to={"/customer/genruntranscation-list"}>
                      <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                      Back
                    </Link>
                  </div>
                  <div className="genLead-flex">
                    {this.state.transleft}
                    {this.state.transright}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ModalPopup
          modal={this.state.GenListPopup}
          toggle={this.GenListPopup}
          className="modal-width Gen_popup"
          title="Review and Rating"
        >
          {this.state.GenListPopup === true && (
            <GenListPopup_Content
              userID={this.state.userID}
              transID={this.state.transID}
              transData={this.state.transData}
            />
          )}
        </ModalPopup>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    customertrans: state.customertrans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomerTrans: formPayload => {
      dispatch({ type: GET_CUSTOMER_TRANS, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(RuntransDetail));
