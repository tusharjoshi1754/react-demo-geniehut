import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import PriceTagIcon from "../../common/images/price-tag-icon.png";
import PriceTagIcon from "../../common/images/web.png";

//import ProfileImg from "../../common/images/ManageProp_img.jpeg";
import ProfileImg from "../../common/images/profile2.png";
import emailIcon from "../../common/images/mail.png";
import phoneIcon from "../../common/images/mobile.png";
import shopIcon from "../../common/images/location.png";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import cookie from "react-cookies";
import { GET_PRO_SERVICES_DETAILS } from "../../actions";
import { appName, mediaUrl, profileImage } from "../Config/Config";
import { Capitalize, LoadingSec, Encrypt, loadImage } from "../Helpers/SettingHelper";
import DivSection from "../Layout/DivSection";


class ServiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      UserAuthToken: cookie.load("UserAuthToken"),
      ref_id: this.props.match.params.RefId,
      pro_id: this.props.match.params.ProId,
      proDetails: ""
    };
  }
  componentDidMount() {
    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = this.state.UserAuthToken;
    postdata["ref_id"] = this.state.ref_id;
    postdata["pro_id"] = this.state.pro_id;
    var qs = require("qs");
    this.props.getProServicesDetails(qs.stringify(postdata));
  }
  componentWillReceiveProps(Props) {
    if (Props.proservicesdetails !== this.props.proservicesdetails) {
      this.setState({ loading: false });
      if (Props.proservicesdetails[0].status === "success") {
        this.setState({ proDetails: Props.proservicesdetails[0].result_set });
      }else if (Props.proservicesdetails[0].status === "authenticfailed") {
        this.props.history.push("/login");
      }
    }
  }
 /*backservicelist(){
    window.location.href = "/customer/pro-search-list";
 }*/
  loadProDetails() {
    let imgsrc;
    if(this.state.proDetails.pro_info.user_profile_image === null || this.state.proDetails.pro_info.user_profile_image == ''){
       imgsrc =ProfileImg+"";
     }else{
       imgsrc = profileImage+this.state.proDetails.pro_info.user_profile_image+"";
     }
    return (
      <div>
        <div className="pro-psd-header">
          <div className="psdh-img">
            <img src={imgsrc} alt="" />
          </div>
          <div className="psdh-txt">
            <div className="psdh-content">
              <h3>{this.state.proDetails.pro_info.publishName > 0?this.state.proDetails.pro_info.displayname:this.state.proDetails.pro_info.user_name}</h3>
              <p>{this.state.proDetails.service_name}</p>
            </div>
            <div className="psdh-bottom">
              <div className="psdh-bottom-btns">
               {/* <img src={JobIcon} alt="" />{" "}
                {typeof this.state.proDetails.pro_info.user_job_completed !==
                  "undefined" &&
                this.state.proDetails.pro_info.user_job_completed > 0
                  ? this.state.proDetails.pro_info.user_job_completed +
                    " Jobs Completed"
                  : "Jobs to Be Done"}*/}
               <div><img src={phoneIcon} alt="" />:<b> {this.state.proDetails.pro_info.publishLandline > 0?this.state.proDetails.pro_info.displaycontactno:'N/A'}</b> </div>

               {/*<div> Name :<b> {this.state.proDetails.pro_info.publishName > 0?this.state.proDetails.pro_info.displayname:'N/A'}</b> </div>*/}

               {/* <div> operating hours : <b>{this.state.proDetails.pro_info.operating_hours}</b> </div>*/}
              
              <div><img src={PriceTagIcon} alt="" />:<b> {this.state.proDetails.pro_info.publishWebAddress > 0?this.state.proDetails.pro_info.vendor_webaddress:'N/A'}</b> </div>

              <div><img src={emailIcon} alt="" />:<b> {this.state.proDetails.pro_info.publishemail > 0?this.state.proDetails.pro_info.vendor_email:'N/A'}</b> </div>

              <div><img src={shopIcon} alt="" />:<b> {this.state.proDetails.pro_info.publishcompanyaddr > 0?this.state.proDetails.pro_info.vendor_company_address:'N/A'}</b> </div>
                {/*<div>
                  <img src={PriceTagIcon} alt="" />{" "}
                  <b>{this.state.proDetails.pro_info.vendor_price} SGD</b>{" "}
                  Starting Price
                </div>*/}
              </div>
            </div>
          </div>
        </div>
        <div className="pro-psd-info">
          <div className="pro-psd-heading">
            <h2>Information</h2>
          </div>
          {this.loadQuestion()}
        </div>
        <div className="pro-psd-review">
          <div className="pro-psd-heading">
            <h2>Reviews</h2>
          </div>
          <div className="pro-psd-review-rating">
            <div>
              <span className="review-rate">
                {this.state.proDetails.ratings_total.attitude !== null
                  ? this.state.proDetails.ratings_total.attitude
                  : 0}
              </span>
              <span>Service Attitude</span>
            </div>
            <div>
              <span className="review-rate">
                {this.state.proDetails.ratings_total.quality !== null
                  ? this.state.proDetails.ratings_total.quality
                  : 0}
              </span>
              <span>Material Quality</span>
            </div>
            <div>
              <span className="review-rate">
                {this.state.proDetails.ratings_total.duration !== null
                  ? this.state.proDetails.ratings_total.duration
                  : 0}
              </span>
              <span>Duration / punctuality</span>
            </div>
            <div>
              <span className="review-rate">
                {this.state.proDetails.ratings_total.price !== null
                  ? this.state.proDetails.ratings_total.price
                  : 0}
              </span>
              <span>Price</span>
            </div>
          </div>
          <div className="pro-psd-review-wrapper">
            {this.state.proDetails.review_all.length > 0 && this.loadReviews()}
            {this.state.proDetails.review_all.length === 0 && (
              <div className="pp-review-box">No reviews found.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  loadQuestion() {
    let question = "";
    if (
      this.state.proDetails.ques_all !== "" &&
      typeof this.state.proDetails.ques_all !== undefined
    ) {
      question = Object.entries(this.state.proDetails.ques_all).map(
        (item, index) => {
          //if(index<=3) {
          let quiz = item[1];
          return (
            <div className="qn-box" key={index}>
              <h3>{quiz.quiz_question}</h3>

              <ul>{this.loadAnswer(quiz.quiz_id)}</ul>
            </div>
          );
          // }
        }
      );
    }
    return question;
  }
  loadAnswer(questionID) {
    let answer = "";
    if (
      this.state.proDetails.pro_info_ans[questionID] !== "" &&
      typeof this.state.proDetails.pro_info_ans[questionID] !== "undefined" &&
      this.state.proDetails.pro_info_ans[questionID] !== null
    ) {
      answer = Object.entries(
        this.state.proDetails.pro_info_ans[questionID]
      ).map((item, index) => {
        let ans = item[1];
        let anspro = '';
        if(ans.type == 'image'){
           let ansproimag = loadImage(
                    mediaUrl + "vendor_images/" + ans.answer
                  );
           anspro =  <img src={ansproimag} />
        }else{
            anspro = ans.answer !== "" ? ans.answer : "N/A";
        }
        return (
          <li key={index}>
            {anspro}
            {ans.remarks !== "" && typeof ans.remarks !== "undefined" && (
              <span>{ans.remarks}</span>
            )}
          </li>
        );
      });
    } else {
      answer = <li>N/A</li>;
    }
    return answer;
  }
  loadReviews() {
    let review;
    if (
      this.state.proDetails.review_all !== "" &&
      typeof this.state.proDetails.review_all !== undefined
    ) {
      review = this.state.proDetails.review_all.map((item, index) => {
        return (
          <div className="pp-review-box" key={index}>
            <div className="pp-review-img">
              <img src={ProfileImg} alt="" />
            </div>
            <div className="pp-review-txt">
              <h4>
                {Capitalize(item.user_name)} ****{" "}
                {(item.user_mobile!=='' && item.user_mobile!== null)?item.user_mobile.substr(item.user_mobile.length - 4, 4):''}
              </h4>
              <div className="compare-rr">
                <span className="crr-rating">
                  {parseFloat(item.ratings_value)}{" "}
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </span>
              </div>
              <p>{item.reviews_desc}</p>
            </div>
          </div>
        );
      });
    }
    return review;
  }

  render() {
    return (
      <div>
        <Header />
        <DivSection activepage="pro" />
        {this.state.loading === false && (
          <div className="gen-breadcrump-wrapper">
            <div className="container">
              <ul className="gen-breadcrump">
                <li>
                  <Link to={"/gen-pro"}>Home</Link>›
                </li>
                <li>
                  <Link
                    to={
                      "/customer/pro-service/" +
                      Encrypt(this.state.proDetails.service_id, "e")
                    }
                  >
                    {Capitalize(this.state.proDetails.service_name)}
                  </Link>
                  ›
                </li>
                <li>{Capitalize(this.state.proDetails && this.state.proDetails.pro_info.user_name)}</li>
              </ul>
            </div>
          </div>
        )}
        <div className="pro-psd-wrapper">
          <div className="container">
            <div className="pro-service-detail-wrapper">
              {this.state.proDetails !== "" && (
                <div>
                  <div className="proD-back-btn">
                   {/* <a href="javascript:void(0);" onClick={this.backservicelist.bind(this)} className="fcb-toggle">
                        Back to List
                    </a>*/}
                  </div>
                  {this.loadProDetails()}
                </div>
              )}
              {this.state.loading === true && LoadingSec}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    proservicesdetails: state.proservicesdetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProServicesDetails: formPayload => {
      dispatch({ type: GET_PRO_SERVICES_DETAILS, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(ServiceDetail));
