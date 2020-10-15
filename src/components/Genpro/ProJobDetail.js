import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import Slider from "react-slick";
import {
  Table,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
  Button
} from "react-bootstrap";
import PriceTagIcon from "../../common/images/web.png";
import emailIcon from "../../common/images/mail.png";
import phoneIcon from "../../common/images/mobile.png";
import shopIcon from "../../common/images/location.png";
import ProfileImg from "../../common/images/ManageProp_img.jpeg";
import Profileuser from "../../common/images/profile2.png";
import QuotationDetail from "./QuotationDetail";
import $ from "jquery";
import cookie from "react-cookies";
import {
  GET_PRO_SERVICES_DETAILS_LIST,
  GET_CHANGE_JOB_STATUS,
  GET_WRITE_PRO_REVIEW
} from "../../actions";
import { appName, profileImage } from "../Config/Config";
import {
  LoadImage,
  CurrencyIconFormat,
  Capitalize,
  Encrypt,
  LoadingSec,
  CheckAuth
} from "../Helpers/SettingHelper";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ModalPopup from "../Layout/ModalPopup";
import SuccessMsg from "../../common/images/success-msg.png";
var serialize = require("form-serialize");
const options = [
  { value: "0", label: "Pending" },
  { value: "2", label: "Completed" },
  { value: "4", label: "Not Required" }
];

class ProJobDetail extends Component {
  constructor(props) {
    super(props);
    CheckAuth();
    this.state = {
      modalVDPopup: false,
      modalreviewPopup: false,
      modalQuotationDetail: false,
      loading: true,
      UserAuthToken: cookie.load("UserAuthToken"),
      ref_id: this.props.match.params.RefId,
      ProId:
        this.props.match.params.ProId !== "" &&
        typeof this.props.match.params.ProId !== "undefined"
          ? this.props.match.params.ProId
          : "",
      vendor_IDs:
        this.props.match.params.vendorId !== "" &&
        typeof this.props.match.params.vendorId !== "undefined"
          ? this.props.match.params.vendorId
          : "",
      proDetails: "",
      job_id: "",
      vendor_id: "",
      writereview: 0,
      jobID: "",
      vendorID: "",
      reviewLoading: false
    };

    this.closepopup = this.closepopup.bind(this);
    this.toggleVDPopup = this.toggleVDPopup.bind(this);
    this.togglereviewPopup = this.togglereviewPopup.bind(this);
    this.toggleQuotationDetail = this.toggleQuotationDetail.bind(this);
  }
  componentDidMount() {
    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = this.state.UserAuthToken;
    postdata["ref_id"] = this.state.ref_id;
    if (this.state.ProId !== "") {
      postdata["vendorID"] = this.state.ProId;
      postdata["status"] = "completed";
    }
    if (this.state.vendor_IDs !== "") {
      postdata["vendorID"] = this.state.vendor_IDs;
      postdata["status"] = "nolonger";
    }

    var qs = require("qs");
    this.props.getProServicesDetailsList(qs.stringify(postdata));

    $(".pro-psd-review")
      .find(".pro-psd-review-rating-form")
      .hide();
    $("a.wr-toggle").click(function() {
      $(this)
        .parents(".pro-psd-review")
        .find(".pro-psd-review-rating-form")
        .toggle();
      $(this)
        .parents(".pro-psd-review")
        .find(".pro-psd-review-rating-wrapper")
        .toggle();
    });
  }
  componentWillReceiveProps(Props) {
    if (Props.proservicesdetailslist !== this.props.proservicesdetailslist) {
      this.setState({ loading: false });
      if (Props.proservicesdetailslist[0].status === "success") {
        this.setState({
          proDetails: Props.proservicesdetailslist[0].result_set
        });
      }
    }
    if (Props.changejobstatus !== this.props.changejobstatus) {
      if (Props.changejobstatus[0].status === "success") {
        $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
        $(".genie-msg-popup-wrapper")
          .parents("body")
          .addClass("genie-popup-shade");
        $(".genie-msg-popup-body").html(
          '<div class="state_img text-center"><img src="' +
            SuccessMsg +
            '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>' +
            Props.changejobstatus[0].message +
            "</p> "
        );
        if (Props.changejobstatus[0].review === 1) {
          this.setState({ writereview: 1 });
        }

        /*  this.setState({
          proDetails: Props.proservicesdetailslist[0].result_set
        }); */
      }
    }
    if (Props.proreview !== this.props.proreview) {
      if (Props.proreview[0].status === "success") {
        this.setState({ reviewLoading: false });
        this.togglereviewPopup();
        $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
        $(".genie-msg-popup-wrapper")
          .parents("body")
          .addClass("genie-popup-shade");
        $(".genie-msg-popup-body").html(
          '<div class="state_img text-center"><img src="' +
            SuccessMsg +
            '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>' +
            Props.proreview[0].message +
            "</p> "
        );
      }
    }
  }

  toggleVDPopup() {
    this.setState(prevState => ({
      modalVDPopup: !prevState.modalVDPopup
    }));
  }
  togglereviewPopup() {
    this.setState(prevState => ({
      modalreviewPopup: !prevState.modalreviewPopup
    }));
  }
  toggleQuotationDetail() {
    this.setState(prevState => ({
      modalQuotationDetail: !prevState.modalQuotationDetail
    }));
  }

  handleChange = (job_id, vendor_service_id, user_id, event) => {
    var qs = require("qs");
    this.setState(
      {
        Jobstatus: event,
        jobID: Encrypt(job_id, "e"),
        vendorID: Encrypt(user_id, "e")
      },
      function() {
        var postObject = {
          app_name: appName,
          user_token: cookie.load("UserAuthToken"),
          job_status_change: event.label,
          job_id: Encrypt(job_id, "e"),
          job_service_id: Encrypt(vendor_service_id, "e"),
          job_vendor_id: Encrypt(user_id, "e")
        };
        this.props.getChangeJobStatus(qs.stringify(postObject));
      }
    );
  };
  writeareview() {
    this.setState({ reviewLoading: true });
    var form1 = document.querySelector("#reviews");
    var questionFrm1 = serialize(form1);
    this.props.getWriteProReview(questionFrm1);
  }

  /* reviewrating = event => {
  }; */

  closepopup() {
    $(".genie-close-btn")
      .parents(".genie-msg-popup-wrapper")
      .removeClass("genie-popup-open");
    $(".genie-msg-popup-wrapper")
      .parents("body")
      .removeClass("genie-popup-shade");
    if (this.state.writereview === 1) {
      this.setState({ writereview: 0 }, function() {
        this.togglereviewPopup();
      });
    } else {
      window.location.reload();
    }
  }
  loadQuotations(job_id, vendor_id) {
    this.setState(
      { job_id: Encrypt(job_id, "e"), vendor_id: Encrypt(vendor_id, "e") },
      function() {
        this.toggleQuotationDetail();
      }
    );
  }
  writeReviewPopup(job_ID, vendor_ID) {
    if (job_ID !== "" && vendor_ID !== "") {
      this.setState(
        { jobID: Encrypt(job_ID, "e"), vendorID: Encrypt(vendor_ID, "e") },
        function() {
          this.togglereviewPopup();
        }
      );
    }
  }

  loadProDetails() {
    if (
      this.state.proDetails.ques_all !== "" &&
      typeof this.state.proDetails.ques_all !== "undefined"
    ) {
      return this.state.proDetails.list_all.map((item, index) => {
        let pro_info = item.pro_info;
        let ratings_total = pro_info['ratings_total'];
        let Jobstatus = {};
        if (pro_info.job_status === "2") {
          Jobstatus = { value: "2", label: "Completed" };
        } else if (pro_info.job_status === "4") {
          Jobstatus = { value: "4", label: "Not Required" };
        } else if (pro_info.job_status === "0" || pro_info.job_status === "1") {
          Jobstatus = { value: "0", label: "Pending" };
        }

        let imgsrc;
        if(pro_info.user_profile_image === null || pro_info.user_profile_image == ''){
        imgsrc =Profileuser+"";
        }else{
        imgsrc = profileImage+pro_info.user_profile_image+"";
        }

        return (
          <div key={index}>
            <div className="pro-service-detail-wrapper">
              <div className="proD-back-btn">
                <Link to={"/dashboard"}>
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>{" "}
                  All Jobs
                </Link>
              </div>
              <div className="pro-psd-header">
                <div className="psdh-img">
                  <img
                    src={imgsrc}
                    alt={pro_info.user_name}
                  />
                </div>
                <div className="psdh-txt">
                  <div className="psdh-content psdhc-status">
                    <h3>{pro_info.publishName > 0?pro_info.displayname:pro_info.user_name}</h3>
                    <div className="gl-rate-date">
                      <div className="gl-rate">
                        <span>
                          {pro_info.user_ratings}
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                    <p>{this.state.proDetails.request_job.services_title}</p>
                    <p>
                      <b>Transaction No :</b> {pro_info.sg_transaction_no}
                    </p>
                   {/* <p className="mobile">
                      <b>Mobile :</b>{" "}
                      <a href={"tel:"+pro_info.user_mobile}>{pro_info.user_mobile}</a>
                    </p>*/}
                    <div>{this.loadQuote(pro_info)}</div>
                  </div>
                  <div className="psdh-bottom">
                    <div className="psdh-bottom-btns">
                      {pro_info.job_status === "1" && (
                        <div>
                          <a
                            href="#requested"
                            className="btn btn1 btn_sm btn_green animate-btn2 ab-none"
                            onClick={e => {
                              e.preventDefault();
                            }}
                          >
                            Requested confirmed
                          </a>
                        </div>
                      )}
                       {/* <img src={JobIcon} alt="" />
                        {pro_info.user_job_completed > 0 ? (
                          <span>
                            {pro_info.user_job_completed} Jobs Completed
                          </span>
                        ) : (
                          <span>Jobs to Be Done</span>
                        )}
                    <div> LandLine :<b> {pro_info.publishLandline > 0?pro_info.displaycontactno:'N/A'}</b> </div>
                   <div> Name :<b> {pro_info.publishName > 0?pro_info.displayname:'N/A'}</b> </div>*/}

                      <div><img src={phoneIcon} alt="" />:<b> {pro_info.publishLandline > 0?pro_info.displaycontactno:'N/A'}</b> </div>

                      <div><img src={PriceTagIcon} alt="" />:<b> {pro_info.publishWebAddress > 0?pro_info.vendor_webaddress:'N/A'}</b> </div>

                      <div><img src={emailIcon} alt="" />:<b> {pro_info.publishemail > 0?pro_info.vendor_email:'N/A'}</b> </div>

                      <div><img src={shopIcon} alt="" />:<b> {pro_info.publishcompanyaddr > 0?pro_info.vendor_company_address:'N/A'}</b> </div>

                      {/*<div className="dist-location">
                        <div className="tooltip_ico">
                          <ButtonToolbar>
                            {["bottom"].map(placement => (
                              <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                  <Tooltip id={`tooltip-${placement}`}>
                                    D01 Boat Quay / Raffles Place / Marina, D02
                                    China Town / Tanjong Pagar
                                  </Tooltip>
                                }
                              >
                                <Button variant="secondary">
                                  <img src={DistanceIcon} alt="" />{" "}
                                  <span>D01 Boat Quay / Raffles Place...</span>
                                </Button>
                              </OverlayTrigger>
                            ))}
                          </ButtonToolbar>
                        </div>
                      </div>
                      <div> operating hours : <b>{pro_info.operating_hours}</b> </div>
                      <div>
                        <img src={PriceTagIcon} alt="" />{" "}
                        {CurrencyIconFormat(pro_info.vendor_price)} Starting
                        Price
                      </div>*/}
                    </div>
                  </div>
                </div>
                {pro_info.job_status !== "3" &&
                  pro_info.job_status !== "2" &&
                  pro_info.job_status !== "4" && (
                    <div className="status-box">
                      {pro_info.job_status !== "4" && (
                        <div className="custom_inputbox">
                          <Select
                            options={options}
                            placeholder="Status"
                            value={Jobstatus}
                            onChange={this.handleChange.bind(
                              this,
                              pro_info.job_id,
                              pro_info.vendor_service_id,
                              pro_info.user_id
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
              </div>
              <div className="pro-psd-info">
                <div className="pro-psd-heading">
                  <h2>Information</h2>
                </div>
                {this.loadAnswers(item.pro_info_ans)}
              </div>
              <div className="pro-psd-review">
                <div className="pro-psd-heading">
                  <h2>Reviews</h2>
                  {pro_info.job_status === "2" &&
                    typeof this.state.proDetails.request_job.sg_job_review !==
                      "undefined" &&
                    this.state.proDetails.request_job.sg_job_review ===
                      "No" && (
                      <a
                        href="#write-review"
                        className="wr-toggle"
                        onClick={e => {
                          e.preventDefault();
                          this.writeReviewPopup(
                            pro_info.job_id,
                            pro_info.user_id
                          );
                        }}
                      >
                        Write Review{" "}
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </a>
                    )}
                </div>

                <div className="pro-psd-review-rating-wrapper">
                  <div className="pro-psd-review-rating">
                    <div>
                      <span className="review-rate">
                        {ratings_total !== undefined && ratings_total.attitude !== "" && ratings_total.attitude !== undefined &&
                        ratings_total.attitude !== null
                          ? parseInt(ratings_total.attitude)
                          : "0"}
                      </span>
                      <span>Service Attitude</span>
                    </div>
                    <div>
                      <span className="review-rate">
                        {ratings_total !== undefined && ratings_total.quality !== "" && ratings_total.quality !== undefined &&
                        ratings_total.quality !== null
                          ? parseInt(ratings_total.quality)
                          : "0"}
                      </span>
                      <span>Material Quality</span>
                    </div>
                    <div>
                      <span className="review-rate">
                        {ratings_total !== undefined &&  ratings_total.duration !== "" && ratings_total.duration !== undefined &&
                        ratings_total.duration !== null
                          ? parseInt(ratings_total.duration)
                          : "0"}
                      </span>
                      <span>Duration / punctuality</span>
                    </div>
                    <div>
                      <span className="review-rate">
                        {ratings_total !== undefined &&  ratings_total.price !== "" && ratings_total.price !== undefined &&
                        ratings_total.price !== null
                          ? parseInt(ratings_total.price)
                          : "0"}
                      </span>
                      <span>Price</span>
                    </div>
                  </div>
                  <div className="pro-psd-review-wrapper">
                    {pro_info.reviews !== "" && pro_info.reviews.length > 0 ? (
                      this.loadReviews(pro_info.reviews)
                    ) : (
                      <div className="pp-review-box">
                        <span>No reviews found.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  loadQuote(pro_info) {
    if (
      pro_info.job_status !== "3" &&
      pro_info.job_status !== "2" &&
      pro_info.job_status !== "4"
    ) {
      if (pro_info.invoice !== "" && typeof pro_info.invoice !== "undefined") {
        /*  return (
          <a
            href="javascript:void(0);"
            className="btn btn1 btn_sm btn_green animate-btn2 ab-none"
          >
            Invoice Details
          </a>
        ); */
      } else if (
        pro_info.quote !== "" &&
        typeof pro_info.quote !== "undefined"
      ) {
        return (
          <a
            href="#quote"
            onClick={e => {
              e.preventDefault();
              this.loadQuotations(pro_info.job_id, pro_info.quote.vendor_id);
            }}
            className="btn btn1 btn_sm btn_green animate-btn2 ab-none"
          >
            Quote Details
          </a>
        );
      }
    }
  }
  loadAnswers(ans) {
    if (ans !== "") {
      return Object.entries(ans).map((item, index) => {
        let quiz = item[1];
        return (
          <div className="qn-box" key={index}>
            <h3>{quiz.question}</h3>
            <ul>{this.loadAnswer(quiz.answer)}</ul>
          </div>
        );
      });
    }
  }
  loadAnswer(answer) {
    return Object.entries(answer).map((item, index) => {
      let ans = item[1];
      return (
        <li key={index}>
          {ans.answer !== "" ? ans.answer : "N/A"}
          {ans.remark !== "" && typeof ans.remark !== "undefined" && (
            <span>{ans.remark}</span>
          )}
        </li>
      );
    });
  }
  loadReviews(reviews) {
    if (reviews !== "") {
      return reviews.map((item, index) => {
        return (
          <div className="pp-review-box" key={index}>
            <div className="pp-review-img">
              <img src={ProfileImg} alt="" />
            </div>
            <div className="pp-review-txt">
              <h4>{item.user_name}</h4>
              <div className="gl-rate-date">
                <div className="gl-rate">
                  <span>
                    {item.ratings_value}
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
              <p>{item.reviews_desc}</p>
            </div>
          </div>
        );
      });
    }
  }
  loadcustomerAnswer() {
    if (
      this.state.proDetails.cust_ans_res !== "" &&
      typeof this.state.proDetails.cust_ans_res !== "undefined"
    ) {
      return Object.entries(this.state.proDetails.cust_ans_res).map(
        (item, index) => {
          let ans = item[1];
          return (
            <div class="job-vd-box" key={index}>
              <h3>{Capitalize(ans.question)}</h3>
              {this.customerAns(ans.answer, ans.quiz_answer_type)}
            </div>
          );
        }
      );
    }
  }
  customerAns(answer, quiz_answer_type) {
    if (answer !== "") {
      return answer.map((item, index) => {
        if (quiz_answer_type === "textbox" || quiz_answer_type === "textarea") {
          return (
            <div key={index}>
              <p>
                {item.customer_ans_content !== "" &&
                item.customer_ans_content !== null
                  ? item.customer_ans_content
                  : "N/A"}
              </p>
              {item.customer_ans_remark_content !== "" &&
                item.customer_ans_remark_content !== null && (
                  <p>
                    <b>Remark:</b> {item.customer_ans_remark_content}
                  </p>
                )}
            </div>
          );
        } else if (
          (quiz_answer_type === "radio" || quiz_answer_type === "checkbox") &&
          item.customer_ans_content !== "" &&
          item.customer_ans_content !== null
        ) {
          return (
            <div key={index}>
              <p>{item.ques_content}</p>
              {item.customer_ans_remark_content !== "" &&
                item.customer_ans_remark_content !== null && (
                  <p>
                    <b>Remark:</b> {item.customer_ans_remark_content}
                  </p>
                )}
            </div>
          );
        }
      });
    }
  }

  render() {
    if (this.state.proDetails !== "") {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <div>
          <Header />
          <div className="innerpage-head-banner jobdetail-banner">
            <div className="container">
              <div className="innerpage-head-wrapper">
                {this.state.proDetails !== "" && (
                  <h2>{this.state.proDetails.request_job.services_title}</h2>
                )}
                <p>
                  Request Date:{" "}
                  <b>
                    {this.state.proDetails !== "" &&
                      this.state.proDetails.request_job.sg_created_on}
                  </b>{" "}
                  <a
                    href="#view-details"
                    className="btn btn1 btn_sm btn_white animate-btn2 ab-none"
                    onClick={e => {
                      e.preventDefault();
                      this.toggleVDPopup();
                    }}
                  >
                    View Details
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="pro-psd-wrapper">
            <div className="container">
              <Slider {...settings}>
                {this.state.proDetails !== "" && this.loadProDetails()}
              </Slider>
            </div>
          </div>

          <ModalPopup
            modal={this.state.modalVDPopup}
            toggle={this.toggleVDPopup}
            className="modal-width job_vd_Popup"
            title="Job Detail"
          >
            {this.state.proDetails !== "" && (
              <div>{this.loadcustomerAnswer()}</div>
            )}
          </ModalPopup>
          <ModalPopup
            modal={this.state.modalQuotationDetail}
            toggle={this.toggleQuotationDetail}
            className="modal-width QuotationDetail_popup EditDetailProperty_popup"
            title="Quotation Details"
          >
            <QuotationDetail
              quote_mode="preview"
              job_id={this.state.job_id}
              vendor_id={this.state.vendor_id}
              toggle={this.toggleQuotationDetail}
            />
          </ModalPopup>

          <ModalPopup
            modal={this.state.modalreviewPopup}
            toggle={this.togglereviewPopup}
            className="modal-width job_vd_Popup"
            title="Job Detail"
          >
            <div className="pro-psd-review-rating-form">
              <form id="reviews">
                <div className="table-responsive">
                  <Table bordered hover className="Job_table">
                    <thead>
                      <tr>
                        <th>Rating</th>
                        <th>Positive</th>
                        <th>Neutral</th>
                        <th>Negative</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Atitude</td>
                        <td>
                          <input
                            type="hidden"
                            name="jobid"
                            value={this.state.jobID}
                          />
                          <input
                            type="hidden"
                            name="vendor_id"
                            value={this.state.vendorID}
                          />
                          <input type="hidden" name="atitude_id" value="1" />
                          <input type="hidden" name="app" value={appName} />
                          <input
                            type="hidden"
                            name="user_token"
                            value={cookie.load("UserAuthToken")}
                          />
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="atitude" value="pos" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="atitude" value="neu" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="atitude" value="neg" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Quality</td>
                        <td>
                          <input type="hidden" name="quality_id" value="2" />
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="quality" value="pos" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="quality" value="neu" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="quality" value="neg" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Duration / Punctuality</td>
                        <td>
                          <input type="hidden" name="duration_id" value="3" />
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="duration" value="pos" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="duration" value="neu" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="duration" value="neg" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>
                          <input type="hidden" name="price_id" value="4" />
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="price" value="pos" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="price" value="neu" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="custom_radio">
                              <input type="radio" name="price" value="neg" />{" "}
                              <span></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Enter your comments here.."
                    name="desc"
                  ></textarea>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn_orange btn_minwid animate-btn2"
                    type="button"
                    onClick={this.writeareview.bind(this)}
                    disabled={this.state.reviewLoading === true ? true : false}
                  >
                    {" "}
                    {this.state.reviewLoading === true && (
                      <span className="load-data">Loading</span>
                    )}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </ModalPopup>
          <Footer />
          <div className="genie-msg-popup-wrapper">
            <div className="genie-msg-popup-inner-wrapper">
              <a
                href="#close"
                onClick={e => {
                  e.preventDefault();
                  this.closepopup();
                }}
                className="genie-close-btn"
              >
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
    } else {
      return (
        <div>
          <Header />
          {LoadingSec}
          <Footer />
        </div>
      );
    }
  }
}

const mapStateTopProps = state => {
  return {
    proservicesdetailslist: state.proservicesdetailslist,
    changejobstatus: state.changejobstatus,
    proreview: state.proreview
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProServicesDetailsList: formPayload => {
      dispatch({ type: GET_PRO_SERVICES_DETAILS_LIST, formPayload });
    },
    getChangeJobStatus: formPayload => {
      dispatch({ type: GET_CHANGE_JOB_STATUS, formPayload });
    },
    getWriteProReview: formPayload => {
      dispatch({ type: GET_WRITE_PRO_REVIEW, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(ProJobDetail));
