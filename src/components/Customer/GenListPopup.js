/* eslint-disable */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Collapse, CardBody, Card } from "reactstrap";
import { appName } from "../Config/Config";
import $ from "jquery";
import {
  GET_CUSTOMER_TRANS_DETAILS,
  GET_CREATECOUNTER,
  GET_ASKTOCALL,
  GET_ACCEPTCOUNTER,
  GET_CREATE_REVIEW,
  GET_REVIEW
} from "../../actions";
import cookie from "react-cookies";
import {
  Ratings,
  LoadingSec,
  CurrencyIconFormat,
  getTimeFrmDate,
  LoadImage
} from "../Helpers/SettingHelper";
import { lang } from "../Helpers/lang";
var Parser = require("html-react-parser");

class GenListPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      transData: this.props.transData,
      current_avg: 0,
      cust_counter_offer: "",
      genrun_counter_offer: "",
      latest_counter: "",
      exist_my_review: "N",
      run_accept: "",
      createcounterdata: "",
      counteLoading: false,
      callLoading: false,
      acceptLoading: false,
      review_message: "",
      reviewLoading: false,
      selectrating: 0,
      review: "",
      ratingDetails: "",
      ratingDetailLoading: true,
      reviewMessage: "",
      errormessage: "",
      genmessaged: "",
      callrequested: "",
      errorcomments: "",
      errorrating: "",
      errorprice: ""
    };
    this.WriteReview = this.WriteReview.bind(this);
  }

  WriteReview() {
    this.setState(state => ({ collapse1: !state.collapse1, collapse2: false }));
  }
  componentDidMount() {
    $(document).ready(function() {
      $("a.counter-offer-btn").click(function() {
        $(this)
          .parent(".counter-offer")
          .find(".counter-offer-box")
          .addClass("open");
        $(this)
          .parents(".modal-content")
          .addClass("genie-popup-shade");
      });
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
            .parents(".modal-content")
            .removeClass("genie-popup-shade");
        }
      }
    });
    const params = {
      transID: this.props.transID,
      userID: this.props.userID
    };
    this.props.getCustomerTransDetails(params);
    const rparams = {
      userID: this.props.userID,
      page: 0
    };
    this.props.getReview(rparams);
    /*const current = this.props;
        setInterval(function(){ current.getCustomerTransDetails(params); }, 5000);*/
  }
  componentWillReceiveProps(NextProps) {
    if (NextProps.customertransdetails !== this.props.customertransdetails) {
      if (NextProps.customertransdetails[0].status === "Success") {
        
        if ( typeof NextProps.customertransdetails[0].result_set.cust_counter_offer !== undefined &&
          NextProps.customertransdetails[0].result_set.cust_counter_offer !== this.state.cust_counter_offer
          ) {
          this.setState({ cust_counter_offer: NextProps.customertransdetails[0].result_set.cust_counter_offer });
          }

        let result = NextProps.customertransdetails[0].result_set;
        this.setState({
          current_avg: result.current_avg,
          latest_counter: result.latest_counter,
          exist_my_review: result.my_review,
          genrun_counter_offer: result.genrun_counter_offer,
          run_accept: result.record,
          callrequested: result.record.callrequested,
          genmessaged: result.record.genmessaged
        });
      }
    }
    if (this.props.createcounterdata !== NextProps.createcounterdata) {
      this.setState({
          cust_counter_offer: (this.state.price?this.state.price:this.state.cust_counter_offer),
          createcounterdata: NextProps.createcounterdata,
          counteLoading: false,
          price: "",
          latest_counter: "C"
        });
      $(".btn.cob-btn")
        .parents(".counter-offer")
        .find(".counter-offer-box")
        .removeClass("open");
      $(".btn.cob-btn")
        .parents(".modal-content")
        .removeClass("genie-popup-shade");
    }
    if (this.props.asktocall !== NextProps.asktocall) {
      if (
        this.props.asktocall !== "" &&
        typeof this.props.asktocall !== "undefined"
      ) {
        if (NextProps.asktocall[0].status) {
          this.setState({ callLoading: false, callrequested: null });
          this.setState({ errormessage: NextProps.asktocall[0].message });
        } else {
          this.setState({ callLoading: false, callrequested: "yes" });
        }
      }
    }
    if (this.state.review !== NextProps.review) {
      if (typeof NextProps.review[0] !== "undefined") {
        if (NextProps.review[0].status === "success") {
          if (
            NextProps.review[0].result_set !== undefined &&
            NextProps.review[0].result_set !== null &&
            NextProps.review[0].result_set.run.totalrun_reviews !== 0
          ) {
            let result = NextProps.review[0].result_set;
            this.setState(
              {
                review: result.run,
                ratingDetailLoading: false,
                current_avg: result.run.rating_avg
              },
              function() {
                this.displayreviews();
              }
            );
          } else {
            this.setState({
              ratingDetails: (
                <div className="genrunList-box">
                  <div className="genrunList-center">No records found.</div>
                </div>
              ),
              ratingDetailLoading: false
            });
          }
        }
      }
    }
    if (this.state.acceptcounterdata !== NextProps.acceptcounterdata) {
      this.setState({ acceptLoading: false });
    }

    if (NextProps.createreview !== this.props.createreview) {
      if (NextProps.createreview[0].status === "success") {
        this.setState(
          {
            reviewLoading: false,
            exist_my_review: "Y",
            reviewMessage: NextProps.createreview[0].message
          },
          function() {
            const rRparams = {
              userID: this.props.userID,
              page: 0
            };
            this.props.getReview(rRparams);
          }
        );
      }
    }
  }
  handleChangeTxt = (item, event) => {
    this.setState({ [item]: event.target.value });
  };

  handleChangeRaring = rating => {
    this.setState({ selectrating: rating });
  };

  createCounter(type) {
    if (this.validatePrice()) {
      const price = this.state.price;
      const formPayload = {
        app_name: appName,
        user_token: cookie.load("UserAuthToken"),
        type: "cust",
        trans_id: this.props.transID,
        price: price,
        run_id: this.props.userID
      };
      this.setState({ counteLoading: true });
      this.props.getCreateCounter(formPayload);
    }
  }

  validatePrice() {
    const { price } = this.state;
    let error = 0;
    if (price === "" || price === "undefined") {
      this.setState({
        errorprice: Parser(
          '<span class="errorspan">Please enter your price</span>'
        )
      });
      error++;
    } else {
      if (isNaN(price)) {
        this.setState({
          errorprice: Parser(
            '<span class="errorspan">Please enter valid price</span>'
          )
        });
        error++;
      } else {
        this.setState({ errorprice: "" });
      }
    }
    if (error > 0) {
      return false;
    } else {
      return true;
    }
  }

  createasktocall(calltype) {
    var qs = require("qs");
    const formPayload = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      type: "cust",
      calltype: calltype,
      trans_id: this.props.transID,
      provider_user_id: this.props.userID
    };
    this.setState({ callLoading: true });
    this.props.getAskToCall(qs.stringify(formPayload));
  }
  acceptTans() {
    const formPayload = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      type: "cust",
      trans_id: this.props.transID,
      flag: "accept",
      userid: this.props.userID
    };
    this.setState({ acceptLoading: true });
    this.props.getAcceptCounter(formPayload);
  }

  createReview() {
    if (this.validateForm()) {
      const formPayload = {
        app_name: appName,
        user_token: cookie.load("UserAuthToken"),
        userType: "run",
        trans_id: this.props.transID,
        flag: "",
        userid: this.props.userID,
        review: this.state.review_message,
        rating: this.state.selectrating,
        trans_user_id: this.state.run_accept.trans_user_id,
        service_id: this.state.run_accept.trans_service_id
      };
      this.setState({ reviewLoading: true });
      this.props.getCreateReview(formPayload);
    }
  }

  validateForm() {
    const { review_message, selectrating } = this.state;
    let error = 0;

    if (review_message === "") {
      this.setState({
        errorcomments: Parser(
          '<span class="errorspan">Please enter your comments</span>'
        )
      });
      error++;
    } else {
      this.setState({ errorcomments: "" });
    }

    if (selectrating === 0) {
      this.setState({
        errorrating: Parser(
          '<span class="errorspan">Please choose rating</span>'
        )
      });
      error++;
    } else {
      this.setState({ errorrating: "" });
    }
    if (error > 0) {
      return false;
    } else {
      return true;
    }
  }

  displayreviews() {
    if (
      this.state.review !== null &&
      this.state.review.run_reviews !== "" &&
      typeof this.state.review.run_reviews != "undefined"
    ) {
      const reviewsDetails = this.state.review.run_reviews.map(
        (item, index) => {
          return (
            <div className="genrunList-box" key={index}>
              <div className="genrunList-left">
                <div className="genrunList-left-img">
                  <img src={LoadImage(item.user_profile_image)} alt="" />
                </div>
                <div className="genrunList-left-content">
                  <h3>{item.user_name}</h3>
                  <div className="gl-rate-date">
                    <div className="gl-rate">
                      <span>
                        {item.review_points}{" "}
                        <i
                          className={
                            item.review_points > 0
                              ? "fa fa-star"
                              : "fa fa-star-o"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                    <div className="gl-date">
                      <span>{getTimeFrmDate(item.review_created)}</span>
                      <span>{getTimeFrmDate(item.review_created, 2)}</span>
                    </div>
                  </div>
                  <div className="gl-review">
                    <p>{Parser(item.review_desc)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      );
      this.setState({ ratingDetails: reviewsDetails });
    }
  }

  render() {
    return (
      <div>
        <div className="genListPopup-wrapper">
          <div className="genrun-leads-wrapper">
            <div className="genrun-leads-info-wrapper">
              <div className="genrun_leads_info_wrap">
                <div className="genLead-flex">
                  <div className="genLead-flex-left">
                    <div className="genrun_leads_info_header pb0">
                      <div className="GRL_info_left">
                        <div className="GRL_info_img">
                          <img
                            src={LoadImage(
                              this.state.run_accept.user_profile_image,
                              "profile"
                            )}
                            alt=""
                          />
                        </div>
                        <div className="GRL_info_title">
                          <h2>{this.state.run_accept.user_name}</h2>
                          <div className="GRL_info_rating">
                            {Ratings(this.state.current_avg)}
                            {/* <span className="Grr_text">150 ratings and 50 reviews</span> */}
                          </div>
                          <h3 className="co_fees">
                            {this.state.cust_counter_offer !== "" && this.state.cust_counter_offer !== undefined  &&
                            this.state.cust_counter_offer !== null
                              ? CurrencyIconFormat(
                                  this.state.cust_counter_offer
                                )
                              : ""}
                          </h3>
                          <div>
                            {this.state.genrun_counter_offer &&
                              lang.customer.trans.genruncounterfee}{" "}
                            {this.state.genrun_counter_offer !== "" &&
                            this.state.genrun_counter_offer !== null
                              ? CurrencyIconFormat(
                                  this.state.genrun_counter_offer
                                )
                              : ""}
                          </div>

                          {/* (this.state.run_accept!=='' && this.state.run_accept!==null && this.state.run_accept.accept_status_pro==='Y' && this.state.run_accept.accept_status_cust==='') &&
                                                <div>Accepted By GenRun</div>
                                            */}
                        </div>
                      </div>
                      <div className="GRL_info_right">
                        <div className="GRL_info_status">
                          <div className="counter-complete">
                            {this.state.run_accept.accept_status_pro !== "Y" &&
                            (this.state.genmessaged == null ||
                              this.state.genmessaged == "") &&
                            this.state.run_accept.accept_status_cust !== "Y" &&
                            this.state.run_accept.trans_status !== "CO" ? (
                              <div className="push_not_btn">
                                <a
                                  className="btn btn_green animate-btn2 ab-none"
                                  href="javascript:void(0);"
                                  onClick={this.createasktocall.bind(
                                    this,
                                    "genmessage"
                                  )}
                                >
                                  {lang.customer.trans.text_message}
                                </a>
                              </div>
                            ) : (
                              <div className="push_not_btn">
                                {" "}
                                <a className="btn btn_green animate-btn2 ab-none def-cursor">
                                  Requested
                                </a>
                              </div>
                            )}

                            <div
                              className="counter-offer"
                              style={{
                                display:
                                  this.state.run_accept !== null &&
                                  (this.state.run_accept.accept_status_cust ===
                                    "Y" ||
                                    this.state.run_accept.accept_status_pro ===
                                      "Y" ||
                                    this.state.run_accept.trans_status === "CO")
                                    ? "none"
                                    : ""
                              }}
                            >
                              <a
                                className="btn btn_blue animate-btn2 counter-offer-btn ab-none"
                                href="javascript:void(0);"
                              >
                                {lang.customer.trans.counter_offer}
                              </a>
                              <div className="counter-offer-box">
                                <div class="inner-counter-offer-box">
                                  <span class="cob-close">
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <div className="form-group">
                                    <label>{lang.common.enter_amount}</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="S$ 200"
                                      onChange={this.handleChangeTxt.bind(
                                        this,
                                        "price"
                                      )}
                                    />
                                    {this.state.errorprice}
                                  </div>
                                  <div className="form-group">
                                    <button
                                      className="btn btn_orange animate-btn2 cob-btn"
                                      type="button"
                                      onClick={this.createCounter.bind(this)}
                                    >
                                      {this.state.counteLoading === true && (
                                        <span className="load-data gify"></span>
                                      )}
                                      Counter-offer
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* (this.state.latest_counter==='' || this.state.latest_counter==='G' || (this.state.run_accept.accept_status_pro==='Y' && this.state.run_accept.accept_status_cust==='')) &&
                                                <div className="push_not_btn">
                                                    <a className="btn btn_green animate-btn2 ab-none" href="javascript:void(0);" onClick={this.acceptTans.bind(this)}>{this.state.acceptLoading ===true &&
                                                    <span className="load-data"></span> 
                                                    }{lang.common.accept}</a>
                                                </div>
                                                */}
                            {/* onClick={this.acceptTans.bind(this)} */}
                            {this.state.run_accept.accept_status_pro === "Y" &&
                              this.state.run_accept.accept_status_cust ===
                                "Y" && (
                                <div className="push_not_btn">
                                  <a
                                    className="btn btn_blue animate-btn2 counter-offer-btn ab-none"
                                    href="javascript:void(0);"
                                  >
                                    {this.state.acceptLoading === true && (
                                      <span className="load-data"></span>
                                    )}
                                    Completed
                                  </a>
                                </div>
                              )}
                            {this.state.callrequested === null &&
                            this.state.run_accept.accept_status_pro !== "Y" &&
                              this.state.run_accept.accept_status_cust !==
                                "Y" ? (
                              <div className="atc_btn">
                                <a
                                  className="btn btn_orange animate-btn2 ab-none"
                                  href="javascript:void(0);"
                                  onClick={this.createasktocall.bind(
                                    this,
                                    "asktocall"
                                  )}
                                >
                                  {this.state.callLoading === true && (
                                    <span className="load-data-mini"></span>
                                  )}
                                  Ask to Call
                                </a>
                              </div>
                            ) : (
                              <div className="atc_btn">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn_orange animate-btn2 ab-none def-cursor"
                                >
                                  Requested
                                </a>
                              </div>
                            )}
                            <div className="error-message">
                              {this.state.errormessage !== ""
                                ? this.state.errormessage
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="review-msg-status">
                      {this.state.reviewMessage}
                    </div>
                    {this.state.exist_my_review === "N" && (
                      <div className="write-review-section WTJ_wrap">
                        <h2 className="genrunList-section-title">
                          Introduction
                        </h2>
                        <div className="wr-accordian_wrap">
                          <Button
                            color="primary"
                            className="btn btn_orange animate-btn2"
                            onClick={this.WriteReview}
                          >
                            Write Review{" "}
                            <i
                              className="fa fa-angle-down"
                              aria-hidden="true"
                            ></i>{" "}
                          </Button>
                          <Collapse isOpen={this.state.collapse1}>
                            <Card>
                              <CardBody>
                                <div className="write-review-wrapper">
                                  <div className="form-group">
                                    <div className="write-review-rating createRating">
                                      <span className="Grr_point">
                                        {this.state.selectrating}/5
                                      </span>
                                      <input
                                        type="radio"
                                        id="rating10"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          5
                                        )}
                                        checked={
                                          this.state.selectrating === "5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor="rating10"
                                        title="5 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating9"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          "4.5"
                                        )}
                                        checked={
                                          this.state.selectrating === "4.5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="half"
                                        htmlFor="rating9"
                                        title="4 1/2 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating8"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          4
                                        )}
                                        checked={
                                          this.state.selectrating === "4"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor="rating8"
                                        title="4 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating7"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          "3.5"
                                        )}
                                        checked={
                                          this.state.selectrating === "3.5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="half"
                                        htmlFor="rating7"
                                        title="3 1/2 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating6"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          3
                                        )}
                                        checked={
                                          this.state.selectrating === "3"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor="rating6"
                                        title="3 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating5"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          "2.5"
                                        )}
                                        checked={
                                          this.state.selectrating === "2.5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="half"
                                        htmlFor="rating5"
                                        title="2 1/2 stars"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating4"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          2
                                        )}
                                        checked={
                                          this.state.selectrating === "2"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor="rating4"
                                        title="2 star"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating3"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          "1.5"
                                        )}
                                        checked={
                                          this.state.selectrating === "1.5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="half"
                                        htmlFor="rating3"
                                        title="1 1/2 star"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating2"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          1
                                        )}
                                        checked={
                                          this.state.selectrating === "1"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="full"
                                        htmlFor="rating2"
                                        title="1 star"
                                      ></label>

                                      <input
                                        type="radio"
                                        id="rating1"
                                        onChange={this.handleChangeRaring.bind(
                                          this,
                                          "0.5"
                                        )}
                                        checked={
                                          this.state.selectrating === "0.5"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="half"
                                        htmlFor="rating1"
                                        title="1/2 star"
                                      ></label>

                                      <div></div>
                                    </div>
                                    {this.state.errorrating}
                                  </div>
                                  <div className="form-group">
                                    <label className="mb17">Review</label>
                                    <div
                                      className="custom_checkbox"
                                      onChange={this.handleChangeTxt.bind(
                                        this,
                                        "review_message"
                                      )}
                                      value={this.state.review_message}
                                    >
                                      <textarea
                                        className="form-control"
                                        placeholder="Drop Your Comment"
                                      ></textarea>
                                    </div>
                                    {this.state.errorcomments}
                                  </div>
                                  <div className="form-group mb0">
                                    <button
                                      type="submit"
                                      className="btn btn_green animate-btn2"
                                      onClick={this.createReview.bind(this)}
                                    >
                                      {this.state.reviewLoading === true && (
                                        <span className="load-data"></span>
                                      )}
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                      </div>
                    )}

                    <div className="genrunList-section WTJ_wrap">
                      {this.state.ratingDetails !== "" && (
                        <h2 className="genrunList-section-title">
                          Customer Reviews
                        </h2>
                      )}
                      {this.state.ratingDetailLoading === true
                        ? LoadingSec
                        : ""}
                      {this.state.ratingDetails}
                    </div>
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
    customertransdetails: state.customertransdetails,
    createcounterdata: state.createcounterdata,
    asktocall: state.asktocall,
    acceptcounterdata: state.acceptcounterdata,
    createreview: state.createreview,
    review: state.review
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomerTransDetails: formPayload => {
      dispatch({ type: GET_CUSTOMER_TRANS_DETAILS, formPayload });
    },
    getCreateCounter: formPayload => {
      dispatch({ type: GET_CREATECOUNTER, formPayload });
    },
    getAskToCall: formPayload => {
      dispatch({ type: GET_ASKTOCALL, formPayload });
    },
    getAcceptCounter: formPayload => {
      dispatch({ type: GET_ACCEPTCOUNTER, formPayload });
    },
    getCreateReview: formPayload => {
      dispatch({ type: GET_CREATE_REVIEW, formPayload });
    },
    getReview: formPayload => {
      dispatch({ type: GET_REVIEW, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(GenListPopup));
