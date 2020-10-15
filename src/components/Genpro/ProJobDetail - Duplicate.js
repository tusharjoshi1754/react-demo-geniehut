import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import {
  Table,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
  Button
} from "react-bootstrap";
import JobIcon from "../../common/images/job-icon.png";
import PriceTagIcon from "../../common/images/price-tag-icon.png";
import DistanceIcon from "../../common/images/distance-icon.png";
import ProfileImg from "../../common/images/ManageProp_img.jpeg";
import $ from "jquery";
import cookie from "react-cookies";
import { GET_PRO_SERVICES_DETAILS_LIST } from "../../actions";
import { appName } from "../Config/Config";
import { LoadImage } from "../Helpers/SettingHelper";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ModalPopup from "../Layout/ModalPopup";
import VDPopup_Content from "../Customer/JobVDPopup";
const options = [
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
  { value: "Not Required", label: "Not Required" }
];

class ProJobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVDPopup: false,
      loading: true,
      UserAuthToken: cookie.load("UserAuthToken"),
      ref_id: this.props.match.params.RefId,
      pro_id: this.props.match.params.ProId,
      proDetails: ""
    };
    this.toggleVDPopup = this.toggleVDPopup.bind(this);
  }
  componentDidMount() {
    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = this.state.UserAuthToken;
    postdata["ref_id"] = this.state.ref_id;
    postdata["pro_id"] = this.state.pro_id;
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
  }

  toggleVDPopup() {
    this.setState(prevState => ({
      modalVDPopup: !prevState.modalVDPopup
    }));
  }

  loadProDetails() {
    if (
      this.state.proDetails.ques_all !== "" &&
      typeof this.state.proDetails.ques_all !== "undefined"
    ) {
      return this.state.proDetails.list_all.map((item, index) => {
        console.log("item", item);
        let pro_info = item.pro_info;
        return (
          <div className="pro-psd-wrapper" key={index}>
            <div className="container">
              <div className="pro-service-detail-wrapper">
                <div className="proD-back-btn">
                  <a href="javascript:void(0);">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>{" "}
                    All Jobs
                  </a>
                </div>
                <div className="pro-psd-header">
                  <div className="psdh-img">
                    <img
                      src={LoadImage(pro_info.user_profile_image, "profile")}
                      alt={pro_info.user_name}
                    />
                  </div>
                  <div className="psdh-txt">
                    <div className="psdh-content psdhc-status">
                      <h3>{pro_info.user_name}</h3>
                      <p>{this.state.proDetails.request_job.services_title}</p>
                      <p>
                        <b>Transaction No :</b> {pro_info.sg_transaction_no}
                      </p>
                      <p className="mobile">
                        <b>Mobile :</b>{" "}
                        <a href="tel:9791486554">+91 9791486554</a>
                      </p>
                    </div>
                    <div className="psdh-bottom">
                      <div className="psdh-bottom-btns">
                        <p>
                          <img src={JobIcon} alt="" /> Jobs to Be Done
                        </p>
                        <p className="dist-location">
                          <div className="tooltip_ico">
                            <ButtonToolbar>
                              {["bottom"].map(placement => (
                                <OverlayTrigger
                                  key={placement}
                                  placement={placement}
                                  overlay={
                                    <Tooltip id={`tooltip-${placement}`}>
                                      D01 Boat Quay / Raffles Place / Marina,
                                      D02 China Town / Tanjong Pagar
                                    </Tooltip>
                                  }
                                >
                                  <Button variant="secondary">
                                    <img src={DistanceIcon} alt="" />{" "}
                                    <span>
                                      D01 Boat Quay / Raffles Place...
                                    </span>
                                  </Button>
                                </OverlayTrigger>
                              ))}
                            </ButtonToolbar>
                          </div>
                        </p>
                        <p>
                          <img src={PriceTagIcon} alt="" /> <b>0 SGD</b>{" "}
                          Starting Price
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="status-box">
                    <div className="custom_inputbox">
                      <Select options={options} placeholder="Status" />
                    </div>
                  </div>
                </div>
                <div className="pro-psd-info">
                  <div className="pro-psd-heading">
                    <h2>Information</h2>
                  </div>
                  <div className="qn-box">
                    <h3>Profile Description</h3>
                    <p>Erer</p>
                  </div>
                  <div className="qn-box">
                    <h3>
                      Singapore: Which districts are you willing to serve?
                    </h3>
                    <ul>
                      <li>
                        Minor repair <span>25</span>
                      </li>
                      <li>
                        Minor Servicing <span>25</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pro-psd-review">
                  <div className="pro-psd-heading">
                    <h2>Reviews</h2>
                    <a href="javascript:void(0);" className="wr-toggle">
                      Write Review{" "}
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div className="pro-psd-review-rating-form">
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
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Atitude" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Atitude" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Atitude" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Quality</td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Quality" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Quality" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Quality" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Duration / Punctuality</td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="DP" /> <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="DP" /> <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="DP" /> <span></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Price" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Price" />{" "}
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="custom_radio">
                                  <input type="radio" name="Price" />{" "}
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
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn_orange btn_minwid animate-btn2"
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="pro-psd-review-rating-wrapper">
                    <div className="pro-psd-review-rating">
                      <div>
                        <span className="review-rate">5</span>
                        <span>Service Attitude</span>
                      </div>
                      <div>
                        <span className="review-rate">0</span>
                        <span>Material Quality</span>
                      </div>
                      <div>
                        <span className="review-rate">0</span>
                        <span>Duration / punctuality</span>
                      </div>
                      <div>
                        <span className="review-rate">5</span>
                        <span>Price</span>
                      </div>
                    </div>
                    <div className="pro-psd-review-wrapper">
                      <div className="pp-review-box">
                        <div className="pp-review-img">
                          <img src={ProfileImg} alt="" />
                        </div>
                        <div className="pp-review-txt">
                          <h4>Praveen</h4>
                          <p>
                            I motsetning til hva mange tror, er ikke Lorem Ipsum
                            bare tilfeldig tekst. Dets røtter springer helt
                            tilbake til et stykke klassisk latinsk litteratur
                            fra 45 år f.kr., hvilket gjør det over 2000 år
                            gammelt.
                          </p>
                        </div>
                      </div>
                      <div className="pp-review-box">
                        <div className="pp-review-img">
                          <img src={ProfileImg} alt="" />
                        </div>
                        <div className="pp-review-txt">
                          <h4>Praveen</h4>
                          <p>
                            I motsetning til hva mange tror, er ikke Lorem Ipsum
                            bare tilfeldig tekst. Dets røtter springer helt
                            tilbake til et stykke klassisk latinsk litteratur
                            fra 45 år f.kr., hvilket gjør det over 2000 år
                            gammelt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="innerpage-head-banner jobdetail-banner">
          <div className="container">
            <div className="innerpage-head-wrapper">
              <h2>Bicycle repair service</h2>
              <p>
                Request Date: <b>December 20, 2019</b>{" "}
                <a
                  className="btn btn1 btn_sm btn_white animate-btn2 ab-none"
                  onClick={this.toggleVDPopup}
                >
                  View Details
                </a>
              </p>
            </div>
          </div>
        </div>
        {this.state.proDetails !== "" && this.loadProDetails()}
        <ModalPopup
          modal={this.state.modalVDPopup}
          toggle={this.toggleVDPopup}
          className="modal-width job_vd_Popup"
          title="Job Detail"
        >
          <VDPopup_Content />
        </ModalPopup>
        <Footer />
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    proservicesdetailslist: state.proservicesdetailslist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProServicesDetailsList: formPayload => {
      dispatch({ type: GET_PRO_SERVICES_DETAILS_LIST, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(ProJobDetail));
