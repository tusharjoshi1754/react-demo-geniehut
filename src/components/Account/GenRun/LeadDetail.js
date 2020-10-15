/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import $ from "jquery";
import Select from "react-select";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import SecondaryHeader from "../../Layout/SecondaryHeader";
import Genleftmenu from "../../Layout/Genleftmenu";
import GenRunLeads from "../../../common/images/GenRun_Leads.jpg";
import { serviceImage, appName } from "../../Config/Config";
import {
  PageTitle,
  CheckAuth,
  LoadingSec,
  getExpirydate,
  currencyIcon,
  Ratings,
  CurrencyIconFormat,
  LoadImage,
  DisplayStatus,
  DisplayGender,
  TransData,
  Encrypt
} from "../../Helpers/SettingHelper";
import Profilebar from "../Profilebar";
import {
  GET_RUNDETAILCUSTOMERLEADS,
  GET_CREATECOUNTER,
  GET_COUNTERLIST,
  GET_ACCEPTCOUNTER,
  GET_ASKTOCALL
} from "../../../actions";
import SuccessMsg from "../../../common/images/success-msg.png";
var Parser = require("html-react-parser");

class LeadDetail extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    const Transid = props.match.params.TransID
      ? props.match.params.TransID
      : this.props.location.state.trans_id;
    localStorage.setItem("Transdetailid", Transid);
    if (localStorage.getItem("Transdetailid") && cookie.load("UserAuthToken")) {
      localStorage.removeItem("Transdetailid");
      localStorage.removeItem("Transdetail");
    }
    this.state = {
      trans_id: Transid,
      current_avg: "",
      details: "",
      districtName: "",
      expired: true,
      counterList: "",
      price_first: "",
      price_chart: "",
      counteLoading: false,
      createcounterdata: "",
      counterListData: "",
      counterofList: "",
      setChart: false,
      stpoCounterof: false,
      acceptEnable: false,
      prevcounterOff: "",
      finalcounterOff: "",
      acceptLoading: false,
      accepted: false,
      completeenable: "",
      completedBy: "",
      review_points: 0,
      ServiceDate: "",
      finalAmount: "",
      callLoading: false,
      genLoading: false,
      genrequestValue: 0,
      rungenmessage: false,
      errorprice: "",
      errorpricechart: "",
      rundetailcustomerleads: "",
      loadRunDetails: true
    };
    this.props.getCounterList(Transid);
  }

  componentDidMount() {
    document.title = PageTitle("GenRun Customer Leads Details");
    this.props.getRunDetailCustomerleads(cookie.load("UserAuthToken"),
      this.state.trans_id
    );

    $(document).ready(function() {
      $(".cob-close").click(function() {
        $(this)
          .parents(".counter-offer-box")
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
    const current = this.props;
    const current1 = this.state;
    /*setInterval(function(){  current.getCounterList(current1.trans_id); }, 5000);*/
  }

  componentWillReceiveProps(Props) {
    if (this.state.rundetailcustomerleads != Props.rundetailcustomerleads) {
      this.setState({ loadRunDetails: false });
      if (Props.rundetailcustomerleads[0]["status"] === "success") {
        const leadDetails = Props.rundetailcustomerleads[0].result_set;
        this.setState({ counterList: Props.rundetailcustomerleads[0] });

        if (leadDetails.record.trans_enddate !== "") {
          const trans_enddate =
            getExpirydate(leadDetails.record.trans_enddate) == 1 ? true : false;
          this.setState({ expired: trans_enddate });
        } else {
          this.setState({ expired: false });
        }
        if (
          leadDetails.record.run_genmessage !== "" &&
          leadDetails.record.run_genmessage !== null &&
          leadDetails.record.run_genmessage !== "no"
        ) {
          this.setState({ rungenmessage: true, genrequestValue: 1 });
        }

        if (leadDetails.current_avg.avg !== null) {
          this.setState({ current_avg: leadDetails.current_avg.avg });
        }
        if (leadDetails.review_points !== null) {
          this.setState({ review_points: leadDetails.review_points });
        }
        this.setState({ details: leadDetails.record });

        this.setState({
          ServiceDate: TransData(leadDetails.record.trans_startdate)
        });
        this.setState({
          ServiceEndDate: TransData(leadDetails.record.trans_enddate)
        });

        if (leadDetails.record.services_background_img !== null) {
          this.setState({
            servImg: serviceImage + leadDetails.record.services_background_img
          });
        }
        if (
          leadDetails.record.districtData !== "" &&
          leadDetails.record.districtData !== null
        ) {
          this.setState({
            districtName: leadDetails.record.districtData.districts_name
          });
        }
        if (leadDetails.reviews.length > 0) {
          //this.getReviewlist(leadDetails.reviews)
        } else {
          this.setState({ reviewlist: "No Reviews" });
        }
      } else if (
        Props.rundetailcustomerleads[0]["status"] === "authenticfailed"
      ) {
        this.props.history.push("/logout");
      }
    }

    if (this.state.createcounterdata != Props.createcounterdata) {
      $(".counter-offer-btn")
        .parents(".counter-offer")
        .find(".counter-offer-box")
        .removeClass("open");
      $(".counter-offer-btn")
        .parents("body")
        .removeClass("genie-popup-shade");
      this.setState({
        createcounterdata: Props.createcounterdata,
        counteLoading: false,
        price_first: "",
        price_chart: ""
      });
      this.props.getCounterList(this.state.details.trans_id);
      //$.scrollTo($('.IS_fees'), 1000);
    }
    if (this.state.counterListData != Props.counterListData) {
      if (
        Props.counterListData[0].status === "success" &&
        Props.counterListData[0] != "" &&
        typeof Props.counterListData[0] != undefined
      ) {
        const setChart =
          Props.counterListData[0].result_set.listall_counter.length > 0
            ? true
            : false;

        if (
          Props.counterListData[0].result_set.listall_counter !== "" &&
          Props.counterListData[0].result_set.listall_counter !== undefined
        ) {
          const totallength =
            Props.counterListData[0].result_set.listall_counter.length;

          const listall_counter =
            Props.counterListData[0].result_set.listall_counter;

          if (listall_counter != "" && typeof listall_counter != "undefined") {
            if (
              listall_counter[totallength - 2] !== undefined &&
              listall_counter[totallength - 2] != ""
            ) {
              this.setState({
                prevcounterOff: listall_counter[totallength - 2].quote_amount
              });
            }
            this.setState({
              finalcounterOff: listall_counter[totallength - 1].quote_amount
            });
            if (listall_counter[totallength - 1].quote_by === "C") {
              this.setState({ acceptEnable: true });
            } else {
              this.setState({ acceptEnable: false });
            }
          }

          if (
            Props.counterListData[0].result_set.accept_trans.trans_status ===
              "CO" &&
            (Props.counterListData[0].result_set.accept_trans
              .accept_complete_status_pro === "Y" ||
              Props.counterListData[0].result_set.accept_trans
                .accept_complete_status_cust === "Y")
          ) {
            this.setState({
              completeenable: "Completed",
              accepted: false,
              acceptEnable: false,
              stpoCounterof: true
            });
          }

          if (
            Props.counterListData[0].result_set.accept_trans
              .accept_complete_status_cust == "Y"
          ) {
            this.setState({ completedBy: "Completed by Customer" });
          }
          if (
            Props.counterListData[0].result_set.accept_trans.trans_status !==
            "P"
          ) {
            if (
              Props.counterListData[0].result_set.last_counter[0] !==
                undefined &&
              Props.counterListData[0].result_set.last_counter[0] !== ""
            ) {
              this.setState({
                finalAmount:
                  "Final Amount: " +
                  Props.counterListData[0].result_set.last_counter[0]
                    .quote_amount
              });
            } else if (
              Props.counterListData[0].result_set.listall_counter[0] !== "" &&
              Props.counterListData[0].result_set.listall_counter[0] !==
                undefined
            ) {
              this.setState({
                finalAmount:
                  "Final Amount: " +
                  Props.counterListData[0].result_set.listall_counter[0]
                    .quote_amount
              });
            }
          }
        }
        this.setState(
          {
            counterListData: Props.counterListData[0].result_set,
            setChart: setChart
          },
          function() {
            this.loadCounteroff();
          }.bind(this)
        );
      } else if (Props.counterListData[0]["status"] === "authenticfailed") {
        this.props.history.push("/logout");
      }
    }
    if (this.state.acceptcounterdata !== Props.acceptcounterdata) {
      this.setState(
        { acceptLoading: false },
        function() {
          this.loadCounteroff();
        }.bind(this)
      );
    }
    if (this.state.asktocall !== Props.asktocall) {
      if (
        Props.asktocall[0] !== "" &&
        Props.asktocall[0] !== undefined &&
        Props.asktocall[0] !== null
      ) {
        if (Props.asktocall[0].status === "success") {
          $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
          $(".genie-msg-popup-wrapper")
            .parents("body")
            .addClass("genie-popup-shade");
          $(".genie-msg-popup-body").html(
            '<div class="state_img text-center"><img src="' +
              SuccessMsg +
              '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>' +
              Props.asktocall[0].result_set +
              "</p> "
          );

          this.setState({ callLoading: false });
          this.setState({ genLoading: false });
        }
      }
    }
  }
  createasktocall(type) {
    if (type == "genrun") {
      this.setState({ callLoading: true });
    } else {
      this.setState({ genLoading: true });
      this.setState({ genrequestValue: 1 });
    }
    var qs = require("qs");
    const formPayload = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      type: type,
      trans_id: this.state.trans_id,
      provider_user_id: this.props.userID
    };
    this.props.getAskToCall(qs.stringify(formPayload));
  }

  handleChangeTxt = (item, event) => {
    this.setState({ [item]: event.target.value });
    this.setState({ ["error_" + item]: "" });
  };

  closepopup() {
    $(".genie-close-btn")
      .parents(".genie-msg-popup-wrapper")
      .removeClass("genie-popup-open");
    $(".genie-close-btn")
      .parents("#genie-popup")
      .removeClass("genie-popup-open");
    $(".genie-msg-popup-wrapper")
      .parents("body")
      .removeClass("genie-popup-shade");
  }

  loadcounterhistory() {
    return (
      <div className="counter-offer-section">
        {this.state.setChart === true && (
          <div>
            <div className="coc-heading">
              <h4>Counter-offer</h4>
            </div>
            <div className="counter-offer-conversation-wrapper">
              <div className="coc-inner-wrapper">
                {this.state.counterofList != "" ? this.state.counterofList : ""}
              </div>
              {this.state.stpoCounterof === false && (
                <div className="coc-field-wrap">
                  <div className="coc-field-wrap-form">
                    <div className="form-group mb0">
                      <label className="label-custom">Enter Amount</label>
                    </div>
                    <div className="form-group cob-custom-grp">
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        placeholder="$ 200"
                        onChange={this.handleChangeTxt.bind(
                          this,
                          "price_chart"
                        )}
                        value={this.state.price_chart}
                      />
                      {this.state.errorpricechart}
                      <button
                        className="btn btn1 btn_orange animate-btn2 cob-btn"
                        type="button"
                        onClick={this.createCounter.bind(this, "price_chart")}
                      >
                        {this.state.counteLoading === true && (
                          <span class="load-data gify"></span>
                        )}
                        Counter-offer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* (this.state.acceptEnable===true  && this.state.accepted===false) &&
                <p>If you agree the amount? <span><a className="btn btn1 btn_green animate-btn2" href="javascript:void(0);" onClick={this.acceptTans.bind(this)}>
                    {this.state.acceptLoading ===true &&
                        <span class="load-data"></span> 
                    }
                    Accept</a></span></p>
                 */}
      </div>
    );
  }

  loadCounteroff() {
    let counterofList = "";
    if (
      this.state.counterListData != "" &&
      this.state.counterListData.listall_counter != ""
    ) {
      counterofList = this.state.counterListData.listall_counter.map(function(
        item,
        index
      ) {
        return (
          <div
            className={
              item.quote_by === "G"
                ? "coc-right-wrap coc-wrap"
                : "coc-left-wrap coc-wrap"
            }
            key={index}
          >
            <div className="coc-user-img">
              <div className="coc-img">
                <img src={GenRunLeads} alt="" />
              </div>
              <h5 className="coc-username">
                {item.quote_by === "G" ? "Genrun" : "Customer"}
              </h5>
            </div>
            <div className="coc-msg-box">
              <p>{CurrencyIconFormat(item.quote_amount)}</p>
            </div>
          </div>
        );
      });
    }
    this.setState({ counterofList: counterofList });
  }

  openCounter() {
    $(".counter-offer-btn")
      .parent(".counter-offer")
      .find(".counter-offer-box")
      .addClass("open");
    $(".counter-offer-btn")
      .parents("body")
      .addClass("genie-popup-shade");
  }

  createCounter(type) {
    if (this.validatePrice(type)) {
      const price =
        type === "first" ? this.state.price_first : this.state.price_chart;
      const formPayload = {
        app_name: appName,
        user_token: cookie.load("UserAuthToken"),
        type: "genrun",
        trans_id: this.state.details.trans_id,
        price: price
      };
      this.setState({ counteLoading: true });
      this.props.getCreateCounter(formPayload);
    }
  }

  validatePrice(type) {
    const price =
      type === "first" ? this.state.price_first : this.state.price_chart;
    let error = 0;
    if (this.state.price_first) {
      if (price === "" || price === "undefined") {
        this.setState({
          errorprice: Parser(
            '<span class="errorspan">Please enter your price</span>'
          )
        });
        error++;
      } else {
        if (isNaN(price) || price < 0) {
          this.setState({
            errorprice: Parser(
              '<span class="errorspan">Please enter valid price</span>'
            )
          });
          error++;
        } else {
          this.setState({ errorprice: "", errorpricechart: "" });
        }
      }
    } else {
      if (price === "" || price === "undefined") {
        this.setState({
          errorpricechart: Parser(
            '<span class="errorspan">Please enter your price</span>'
          )
        });
        error++;
      } else {
        if (isNaN(price) || price < 0) {
          this.setState({
            errorpricechart: Parser(
              '<span class="errorspan">Please enter valid price</span>'
            )
          });
          error++;
        } else {
          this.setState({ errorpricechart: "", errorprice: "" });
        }
      }
    }
    if (error > 0) {
      return false;
    } else {
      return true;
    }
  }

  aboutmecontent(userID) {
    if ($("#listabout_" + userID).hasClass("h-toggle") === false) {
      $("#listabout_" + userID).addClass("h-toggle");
      $(".read_district" + userID).text("Read More");
    } else {
      $("#listabout_" + userID).removeClass("h-toggle");
      $(".read_district" + userID).text("Read Less");
    }
  }

  render() {
    const { trans_startdate, trans_enddate, trans_status } = this.state.details;
    return (
      <div>
        <Header />
        <SecondaryHeader />
        <Profilebar />
        <div className="wrapper_out">
          <div className="container">
            <div className="sdmenu_wrapper">
              <Genleftmenu currentpage="GenRun" />
              <div className="sdmenu_tabcontent">
                <div className="sdhmenu_wrapper">
                  <ul className="sdhmenu_tablist">
                    <li>
                      <Link to={"/edit-gen-run"} title="GenRun Details">
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/genrun-my-services"} title="My Services">
                        My Services
                      </Link>
                    </li>
                    <li className="active">
                      <Link to={"/genrun-customerleads"} title="Customer Leads">
                        Customer Leads
                      </Link>
                    </li>
                  </ul>
                  <Link
                    to={"/edit-gen-run"}
                    className="sdhmenu_mtabtrigger"
                    title="GenPro Details"
                  >
                    Details <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genrun-my-services"}
                    className="sdhmenu_mtabtrigger"
                    title="GenRun Details"
                  >
                    My Services <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genrun-customerleads"}
                    className="sdhmenu_mtabtrigger active"
                    title="GenRun Details"
                  >
                    Customer Leads <i className="fa fa-angle-down"></i>
                  </Link>
                  <div className="sdhmenu_content">
                    <div className="genrun-leads-wrapper">
                      <div className="genrun-leads-info-wrapper">
                        {this.state.loadRunDetails === true && LoadingSec}
                        {this.state.loadRunDetails === false && (
                          <div className="genrun_leads_info_wrap">
                            <div className="genrun_leads_info_back">
                              <Link to={"/genrun-customerleads"}>
                                <i
                                  className="fa fa-angle-left"
                                  aria-hidden="true"
                                ></i>{" "}
                                Back
                              </Link>
                            </div>
                            <div className="genLead-flex">
                              <div className="genLead-flex-left">
                                <div className="genrun_leads_info_header">
                                  <div className="GRL_info_left">
                                    <div className="GRL_info_img">
                                      <img src={this.state.servImg} alt="" />
                                    </div>
                                    <div className="GRL_info_title">
                                      <h2>
                                        {this.state.details.services_title}
                                      </h2>
                                      {this.state.prevcounterOff !== "" && (
                                        <div class="gen-price-block">
                                          {CurrencyIconFormat(
                                            this.state.prevcounterOff
                                          )}
                                        </div>
                                      )}
                                      {this.state.finalcounterOff !== "" && (
                                        <div class="gen-price-block">
                                          {CurrencyIconFormat(
                                            this.state.finalcounterOff
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {getExpirydate(trans_enddate) == 1 ? (
                                    "(Expired)"
                                  ) : (
                                    <div className="GRL_info_right">
                                      <div className="GRL_info_status">
                                        <div className="counter-complete">
                                          {trans_status !== "CO" ? (
                                            <div>
                                              {this.state.genrequestValue ===
                                                0 ||
                                              this.state.rungenmessage ==
                                                false ? (
                                                <div className="push_not_btn">
                                                  <a
                                                    className="btn btn_green animate-btn2 ab-none"
                                                    href="javascript:void(0);"
                                                    onClick={this.createasktocall.bind(
                                                      this,
                                                      "genmessage"
                                                    )}
                                                  >
                                                    {this.state.genLoading ===
                                                      true && (
                                                      <span class="load-data-mini">
                                                        Loading
                                                      </span>
                                                    )}
                                                    GenMessage
                                                  </a>
                                                </div>
                                              ) : (
                                                <div className="counter-complete">
                                                  <a className="push_not_btn btn btn_green animate-btn2 ab-none">
                                                    Requested
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {this.state.accepted === true && (
                                            <div className="push_not_btn">
                                              <a
                                                className="btn btn_green animate-btn2 ab-none"
                                                href="javascript:void(0);"
                                              >
                                                Accepted
                                              </a>
                                            </div>
                                          )}
                                          {this.state.completeenable !== "" && (
                                            <div className="push_not_btn">
                                              <a
                                                className="btn btn_green animate-btn2 ab-none"
                                                href="javascript:void(0);"
                                              >
                                                {this.state.completeenable}
                                              </a>
                                            </div>
                                          )}

                                          <div className="counter-offer">
                                            {this.state.counterListData
                                              .listall_counter == "" &&
                                              trans_status !== "CO" && (
                                                <a
                                                  className="btn btn_blue animate-btn2 counter-offer-btn ab-none"
                                                  href="javascript:void(0);"
                                                  onClick={this.openCounter.bind(
                                                    this
                                                  )}
                                                >
                                                  Counter-offer
                                                </a>
                                              )}
                                            <div className="counter-offer-box">
                                              <div class="inner-counter-offer-box">
                                                <span class="cob-close">
                                                  <i
                                                    className="fa fa-times"
                                                    aria-hidden="true"
                                                  ></i>
                                                </span>
                                                <div className="form-group">
                                                  <label>Enter Amount</label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="$ 200"
                                                    onChange={this.handleChangeTxt.bind(
                                                      this,
                                                      "price_first"
                                                    )}
                                                    value={
                                                      this.state.price_first
                                                    }
                                                  />
                                                  {this.state.errorprice}
                                                </div>
                                                <div className="form-group">
                                                  <button
                                                    className="btn btn_orange animate-btn2 cob-btn"
                                                    type="button"
                                                    onClick={this.createCounter.bind(
                                                      this,
                                                      "first"
                                                    )}
                                                  >
                                                    {this.state
                                                      .counteLoading ===
                                                      true && (
                                                      <span class="load-data-mini">
                                                        Loading
                                                      </span>
                                                    )}
                                                    Counter-offer
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {trans_status !== "CO" && (
                                            <div className="atc_btn">
                                              <a
                                                className="btn btn_orange animate-btn2 ab-none"
                                                href="javascript:void(0);"
                                                onClick={this.createasktocall.bind(
                                                  this,
                                                  "genrun"
                                                )}
                                              >
                                                {this.state.callLoading ===
                                                  true && (
                                                  <span class="load-data-mini">
                                                    Loading
                                                  </span>
                                                )}
                                                Ask to Call
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <h6>{this.state.finalAmount}</h6>
                                <h3>{this.state.completedBy}</h3>
                                <div className="genrun_user_info_wrap WTJ_wrap">
                                  <div className="genrun_user_info_box">
                                    <h4>What is this job</h4>
                                    <p>
                                      {this.state.details.trans_subtitle &&
                                        "Title: "}{" "}
                                      {this.state.details.trans_subtitle &&
                                        this.state.details.trans_subtitle}
                                    </p>
                                    <p id={"listabout_" +this.state.details.trans_id}
                                    className="hidi-content h-toggle" >
                                      About Job: {this.state.details.trans_desc}
                                    </p>
                                    <div className="gen-follow-rm">
                                    {this.state.details.trans_desc !== "" &&
                                    this.state.details.trans_desc !== null &&
                                    this.state.details.trans_desc.length > 150 ? (
                                    <a
                                    href="javascript:void(0);"
                                    className={
                                    "read_district" + this.state.details.trans_id+ " readmore"
                                    }
                                    onClick={this.aboutmecontent.bind(
                                    this,
                                    this.state.details.trans_id
                                    )}
                                    >
                                    Read More
                                    </a>
                                    ) : (
                                    ""
                                    )}
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="IS_fees">
                                      Intial Service Fees:{" "}
                                      {CurrencyIconFormat(
                                        this.state.details.trans_fee
                                      )}
                                    </h3>
                                  </div>
                                </div>
                                {getExpirydate(trans_enddate) == 1
                                  ? "(Expired)"
                                  : this.loadcounterhistory()}
                              </div>
                              <div className="genLead-flex-right">
                                <div className="genrun_user_info_wrap">
                                  <div className="genrun_user_info_box head">
                                    <h3>{this.state.details.user_name}</h3>
                                  </div>
                                  <div className="genrun_user_info_box">
                                    <ul className="GRIL_title_list">
                                      <li>
                                        <span className="GRIL_title">
                                          Transaction ID:
                                        </span>
                                        <span className="GRIL_txt">
                                          {this.state.details.trans_key}
                                        </span>
                                      </li>
                                       <li>
                                        <span className="GRIL_title">
                                          Category:
                                        </span>
                                        <span className="GRIL_txt">
                                          {this.state.details.services_title}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          Status:
                                        </span>
                                        <span className="GRIL_txt">
                                          {DisplayStatus(
                                            this.state.details.trans_status
                                          )}
                                        </span>
                                      </li>
                                      <li>
                                        <h4>Information</h4>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          Service Start Date:
                                        </span>
                                        <span className="GRIL_txt">
                                          {this.state.ServiceDate}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          Service End Date:
                                        </span>
                                        <span className="GRIL_txt">
                                          {this.state.ServiceEndDate}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          Country:
                                        </span>
                                        <span className="GRIL_txt">
                                          Singapore
                                        </span>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          District:
                                        </span>
                                        <span className="GRIL_txt">
                                          {this.state.districtName
                                            ? this.state.districtName
                                            : "No meet up is required"}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="GRIL_title">
                                          Gender:
                                        </span>
                                        <span className="GRIL_txt">
                                          {DisplayGender(
                                            this.state.details.trans_gender
                                          )}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <div className="genie-msg-popup-wrapper" id="genie-popup">
          <div className="genie-msg-popup-inner-wrapper">
            <a onClick={this.closepopup} className="genie-close-btn">
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
            <div className="genie-msg-popup-body"></div>
            <div onClick={this.closepopup} className="genie-msg-popup-btn">
              <button
                className="btn btn_orange btn_minwid genie-close-btn"
                type="button"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    rundetailcustomerleads: state.rundetailcustomerleads,
    createcounterdata: state.createcounterdata,
    counterListData: state.counterListData,
    acceptcounterdata: state.acceptcounterdata,
    asktocall: state.asktocall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRunDetailCustomerleads: (UserToken, trans_id) => {
      dispatch({ type: GET_RUNDETAILCUSTOMERLEADS, UserToken, trans_id });
    },
    getCreateCounter: formPayload => {
      dispatch({ type: GET_CREATECOUNTER, formPayload });
    },
    getCounterList: trans_id => {
      dispatch({ type: GET_COUNTERLIST, trans_id });
    },
    getAcceptCounter: formPayload => {
      dispatch({ type: GET_ACCEPTCOUNTER, formPayload });
    },
    getAskToCall: formPayload => {
      dispatch({ type: GET_ASKTOCALL, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(LeadDetail));
