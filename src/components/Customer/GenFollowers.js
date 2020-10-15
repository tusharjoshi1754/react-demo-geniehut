/* eslint-disable */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import Header from "../Layout/Header";
import SecondaryHeader from "../Layout/SecondaryHeader";
import Profilebar from "../Account/Profilebar";
import ModalPopup from "../Layout/ModalPopup";
import Footer from "../Layout/Footer";
import { GET_FOLLOW, GET_SEND_MESSAGE, GET_DISTRICT, GET_ALLCOUNTRIES, GET_MOBILE_COUNTRY } from "../../actions";
import $ from "jquery";
import SuccessMsg from "../../common/images/success-msg.png";

import {
  CheckAuth,
  LoadingSec,
  getAge,
  LoadImage,
  Encrypt,
  scrollToTop,
  scrollToTopValidate,
  PageTitle
} from "../Helpers/SettingHelper";
import cookie from "react-cookies";
var qs = require("qs");
import FollowerIcon from "../../common/images/chat-icon1.png";

class GenFollowers extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
      UserAuthToken: cookie.load("UserAuthToken"),
      followList: "",
      loading: true,
      page: 1,
      totalpage: 0,
      pagenation: "",
      totalfollow: 0,
      genmessage: "",
      email: "",
      gender: "",
      age: "",
      modalmessage: false,
      usertype: { GC: "Customer", GR: "GenRun", GP: "GenPro", GA: "GenAgent" },
      selectedUser: [],
      genmessagepoints: 0,
      emailpoints: 0,
      smspoints: 0,
      characterlength: 400,
      message: "",
      stating: 1,
      selectall: false,
      notifytype: "",
      district: [],
      user_points: "",
      pointnotenough: "",
      error: "",
      error_message: "",
      successmessage: "",
      sendLoading: false,
      countries:[],
      countryList:[],
    };
    this.togglemessage = this.togglemessage.bind(this);
    this.props.getAllCountries();
    this.props.getMobileCountry();

  }
  componentDidMount() {
    document.title = PageTitle('GenFollowers');  
    let params = "gentype=followers&setting=1&page=" + this.state.page;
    this.props.getFollow(params);
    this.props.getDistrict();
  }

  closepopup() {
    $(".genie-close-btn")
      .parents(".genie-msg-popup-wrapper")
      .removeClass("genie-popup-open");
    $(".genie-msg-popup-wrapper")
      .parents("body")
      .removeClass("genie-popup-shade");
  }

  componentWillReceiveProps(Props) {
    if (Props.follows !== this.props.follows) {
      this.setState({ loading: false });
      if (Props.follows[0].status === "success") {
        if (this.state.stating == 1) {
          this.setState({
            stating: 0,
            genmessagepoints: Props.follows[0].points.genmessage,
            emailpoints: Props.follows[0].points.email,
            smspoints: Props.follows[0].points.sms,
            user_points: Props.follows[0].points.user_points
          });
        }
        if (this.state.page === 1) {
          this.setState(
            {
              totalpage: Props.follows[0].totalpage,
              totalfollow: Props.follows[0].totalfollow
            },
            function() {
              this.loadPageNation();
            }
          );
        } else {
          this.loadPageNation();
        }
        this.setState({ follows: Props.follows[0].result_set }, function() {
          this.loadFollows();
        });
      } else if (Props.follows[0].status === "authenticfailed") {
        this.props.history.push("/logout");
      } else {
        this.setState({
          followList: <div class="follow-nrf">No record found</div>
        });
      }
    }
    if (Props.sendmessage !== this.props.sendmessage) {
      if (Props.sendmessage[0].status === "success") {
        this.setState({ loading: false, selectall: false });
        this.setState({
          user_points: Props.sendmessage[0].user_points,
          sendLoading: false,
          selectall: false
        });

        this.setState(prevState => ({
          modalmessage: !prevState.modalmessage
        }));
        setTimeout(function() {
          scrollToTopValidate();
        }, 100);
        const data = this;
        $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
        $(".genie-msg-popup-wrapper")
          .parents("body")
          .addClass("genie-popup-shade");
        $(".genie-msg-popup-body").html(
          '<div class="state_img text-center"><img src="' +
            SuccessMsg +
            '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>' +
            Props.sendmessage[0].message +
            "</p> "
        );
      }
    }
    if (Props.district != this.props.district) {
      const districtList = [];
      Props.district[0].district_list.map(function(item) {
        districtList.push({
          value: item.value,
          label: item.label
        });
      });
      this.setState({ district: districtList });
    }

    if (Props.allcountries != this.props.allcountries) {
      if(Props.allcountries[0].status == 'success'){
        console.log(Props.allcountries[0])
      const countryList = [];
      Props.allcountries[0].allcountry.map(function(item) {
        countryList.push({
          value: item.value,
          label: item.label
        });
      });
      this.setState({ countries: countryList });
      }
    }
    if(Props.mobilecountry !==this.props.mobilecountry){
        this.setState({mobilecountry:Props.mobilecountry[0].result_set}, function() {
          this.loadCountryList();
        });
      }

  }
  loadCountryList() {
    var country= [];
    this.state.mobilecountry.map(function(countries){
        country.push(countries.short_code.toLowerCase());
    });
    this.setState({countryList:country});
  }
  handleChange = (item, event) => {
    if (item === "message") {
      if (event.target.value.length <= 400) {
        this.setState({
          [item]: event.target.value,
          characterlength: 400 - parseInt(event.target.value.length)
        });
      }
    } else {
      if (event === null) {
        this.setState({ [item]: "" }, function() {
          this.applyFiltter();
        });
      } else {
        this.setState({ [item]: event.value }, function() {
          this.applyFiltter();
        });
      }
    }
  };
  togglemessageList(type) {
    if (this.state.selectedUser.length > 0 || this.state.selectall == true) {
      this.setState({ notifytype: type, error: "" }, function() {
        this.togglemessage();
      });
    } else {
      this.setState({ error: "Please select at least one user" });
    }
  }
  togglemessage() {
    if (this.state.message !== "") {
      this.setState({ message: "" });
    }
    this.setState(prevState => ({
      modalmessage: !prevState.modalmessage,
      characterlength: 400
    }));
  }
  toggleCheckboxChange(userID) {
    if (userID === "all") {
      let selectall = this.state.selectall === true ? false : true;
      this.setState({ selectall: selectall }, function() {
        this.loadFollows();
      });
    } else {
      this.setState({ error: "" });
      let selectedUser = this.state.selectedUser;
      if (selectedUser.indexOf(userID) >= 0) {
        var index = selectedUser.indexOf(userID);
        selectedUser.splice(index, 1);
      } else {
        selectedUser.push(userID);
      }
      this.setState({ selectedUser: selectedUser });
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

  loadFollows() {
    let followList;
    if (
      this.state.follows !== "" &&
      typeof this.state.follows !== "undefined"
    ) {
      followList = this.state.follows.map((dfollow, index) => {
        return (
          <div className="gen-follow-row" key={index} id={dfollow.following_id}>
            <div className="gen-follow-text">
              <div className="gen-follow-img">
                <img src={LoadImage(dfollow.profile, "profile")} alt="" />
              </div>
              <div className="gen-follow-info">
                <div className="gen-follow-info-top">
                  <div className="gfi-name">
                    <b>{dfollow.name}</b>
                  </div>
                  {dfollow.user_type !== null && (
                    <div className="gfi-category">
                      {this.state.usertype[dfollow.user_type]}
                    </div>
                  )}
                  {dfollow.service_name !== null && (
                    <div className="gfi-job">{dfollow.service_name}</div>
                  )}
                  <div className="gfi-datetime">
                    <span>{dfollow.created_date}</span>
                  </div>
                </div>
                <div className="gen-follow-info-bottom">
                  <div className="gfi-category">
                    Gender:{" "}
                    {dfollow.user_gender !== "" && dfollow.user_gender !== null
                      ? dfollow.user_gender
                      : "N/A"}
                  </div>
                  <div className="gfi-job">
                    Age: {getAge(new Date(dfollow.user_dob))}
                  </div>
                  <div className="gfi-datetime">
                    {" "}
                    <div
                      id={"listabout_" + dfollow.following_id}
                      className="hidi-content h-toggle"
                    >
                      {" "}
                      {dfollow.district_list !== "" &&
                      dfollow.district_list !== null
                      ?"Location: "+dfollow.district_list
                      : ""}
                    </div>
                    <div className="gen-follow-rm">
                      {dfollow.district_list !== "" &&
                      dfollow.district_list !== null &&
                      dfollow.district_list.length > 150 ? (
                        <a
                          href="javascript:void(0);"
                          className={
                            "read_district" + dfollow.following_id + " readmore"
                          }
                          onClick={this.aboutmecontent.bind(
                            this,
                            dfollow.following_id
                          )}
                        >
                          Read More
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gen-follow-event">
              <div className="custom_checkbox">
                <input
                  type="checkbox"
                  onChange={this.toggleCheckboxChange.bind(
                    this,
                    dfollow.user_id
                  )}
                  defaultChecked={
                    this.state.selectall === true ||
                    this.state.selectedUser.indexOf(dfollow.user_id) >= 0
                      ? true
                      : false
                  }
                />
                <span>Checkbox</span>
              </div>
            </div>
          </div>
        );
      });
    }
    this.setState({ followList: followList });
  }
  loadPageNation() {
    let pageList = (
      <div className="gen-follow-pagination">
        <ul>
          {this.state.page > 1 && this.state.totalpage > 0 && (
            <li className="follow-prev-next">
              <a href="javascript:void(0);">Previous</a>
            </li>
          )}
          {this.state.totalpage > 1 ? this.loadStartPageList() : ""}
          {this.state.page !== this.state.totalpage &&
            this.state.totalpage > 0 && (
              <li className="follow-prev-next">
                <a href="javascript:void(0);">Next</a>
              </li>
            )}
        </ul>
      </div>
    );
    this.setState({ pagenation: pageList });
  }
  loadStartPageList() {
    let currentPage = this.state.page > 1 ? parseInt(this.state.page) - 1 : 1;
    let nextloop =
      parseInt(currentPage) + 3 <= this.state.totalpage
        ? parseInt(currentPage) + 3
        : this.state.totalpage;
    let ToReturn = [];
    for (var i = currentPage; i <= nextloop; i++) {
      ToReturn.push(
        <li
          key={i}
          className={this.state.page === i ? "active" : ""}
          onClick={this.loadMore.bind(this, i)}
        >
          <a href="javascript:void(0);">{i}</a>
        </li>
      );
    }
    return ToReturn;
  }
  loadMore(page) {
    this.setState({ page: page });
    let params =
      "gentype=followers&page=" +
      page +
      "&genmessage=" +
      this.state.genmessage +
      "&email=" +
      this.state.email +
      "&gender=" +
      this.state.gender +
      "&age=" +
      this.state.age;
    this.props.getFollow(params);
  }
  applyFiltter() {
    this.setState({ page: 1, loading: true });
    let params =
      "gentype=followers&page=1&genmessage=" +
      this.state.genmessage +
      "&email=" +
      this.state.email +
      "&gender=" +
      this.state.gender +
      "&age=" +
      this.state.age +
      "&location=" +
      this.state.location +
      "&country=" +
      this.state.country;
    this.props.getFollow(params);
  }
  SendMessage() {
    if (this.state.message !== "") {
      this.setState({ error_message: "" });
      let selectallpts =
        this.state.follows.length * this.state.genmessagepoints;
      let totalPoint =
        this.state.genmessagepoints * this.state.selectedUser.length;
      if (
        totalPoint <= this.state.user_points ||
        selectallpts <= this.state.user_points
      ) {
        this.setState({ pointnotenough: "" });
        let selectall;
        if (this.state.selectall == true) {
          selectall = "yes";
        } else {
          selectall = "no";
        }
        var postObject = {
          userToken: this.state.UserAuthToken,
          UserID: this.state.selectedUser,
          message: this.state.message,
          notifytype: this.state.notifytype,
          selectall: selectall
        };
        this.setState({ sendLoading: true });
        this.props.getSendMessage(qs.stringify(postObject));
      } else {
        this.setState({ pointnotenough: "Not enough point" });
      }
    } else {
      this.setState({ error_message: 1 });
    }
  }
  render() {
    const GenMessage = [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ];
    const Email = [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ];
    const Gender = [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" }
    ];
    const Age = [
      { value : "21", label: "Below 21"},
      { value: "21-30", label: "21-30" },
      { value: "31-40", label: "31-40" },
      { value: "41-50", label: "41-50" },
      { value: "51-60", label: "51-60" },
      { value: "Above 60", label: "Above 60" }
    ];

    return (
      <div>
        <Header userPoints={this.state.user_points} />
        <SecondaryHeader />
        <Profilebar follow="followers" userPoints={this.state.user_points} />
        <div className="wrapper_out">
          <div className="container">
            <div className="gen-followpage-wrapper">
              <div className="gen-follow-box-wrapper">
                <div className="gen-follow-box">
                  <div className="gen-follow-heading">
                    <div className="group-msg-innerhead">
                      <h2>
                        <span>Followers</span>{" "}
                        <sup>({this.state.totalfollow})</sup>
                      </h2>
                    </div>
                    <div className="group-msg-wrap">
                      <div className="group-msg-head">
                        <p>Select followers to send a group message</p>
                        <p>
                          <span>Points will be deducted</span>
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                          onClick={this.togglemessageList.bind(
                            this,
                            "notification"
                          )}
                        >Mobile App
                        </button>
                        <p>
                          <span>
                            {this.state.selectedUser.length > 0
                              ? this.state.selectedUser.length *
                                this.state.genmessagepoints
                              : this.state.genmessagepoints}{" "}
                            Points
                          </span>
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                          onClick={this.togglemessageList.bind(this, "email")}
                        >
                          Email
                        </button>
                        <p>
                          <span>
                            {this.state.selectedUser.length > 0
                              ? this.state.selectedUser.length *
                                this.state.emailpoints
                              : this.state.emailpoints}{" "}
                            Points
                          </span>
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                          onClick={this.togglemessageList.bind(
                            this,
                            "asktocall"
                          )}
                        >
                          SMS
                        </button>
                        <p>
                          <span>
                            {this.state.selectedUser.length > 0
                              ? this.state.selectedUser.length *
                                this.state.smspoints
                              : this.state.smspoints}{" "}
                            Points
                          </span>
                        </p>
                      </div>
                      <div className="error-color">{this.state.error}</div>
                    </div>
                  </div>

                  <div className="gen-follow-body">
                    <div className="gen-follow-inner-body">
                      <div className="gen-follow-filter">
                      {/* <div>
                          <label></label>
                          <div>
                            <b>Region</b>: Singapore
                          </div>
                        </div>*/}
                        <div>
                          <label>Mobile no from</label>
                          <div className="re_select">
                            <Select
                              options={this.state.countries}
                              onChange={this.handleChange.bind(
                                this,
                                "country"
                              )}
                              isClearable={true}
                            />
                          </div>
                        </div>
                         <div>
                          <label>Location</label>
                          <div className="re_select">
                            <Select
                              options={this.state.district}
                              onChange={this.handleChange.bind(
                                this,
                                "location"
                              )}
                              isClearable={true}
                            />
                          </div>
                        </div>
                        <div>
                          <label>Mobile App</label>
                          <div className="re_select">
                            <Select
                              options={GenMessage}
                              onChange={this.handleChange.bind(
                                this,
                                "genmessage"
                              )}
                              isClearable={true}
                            />
                          </div>
                        </div>
                        <div>
                          <label>Email</label>
                          <div className="re_select">
                            <Select
                              options={Email}
                              onChange={this.handleChange.bind(this, "email")}
                              isClearable={true}
                            />
                          </div>
                        </div>
                        <div>
                          <label>Gender</label>
                          <div className="re_select">
                            <Select
                              options={Gender}
                              onChange={this.handleChange.bind(this, "gender")}
                              isClearable={true}
                            />
                          </div>
                        </div>
                        <div>
                          <label>Age Group</label>
                          <div className="re_select">
                            <Select
                              options={Age}
                              onChange={this.handleChange.bind(this, "age")}
                              isClearable={true}
                            />
                          </div>
                        </div>
                       

                        {
                          /* className="filter-sall" */
                          <div>
                            <label></label>
                            <div className="custom_checkbox">
                              <input
                                type="checkbox"
                                onChange={this.toggleCheckboxChange.bind(
                                  this,
                                  "all"
                                )}
                              />
                              <span>Select All</span>
                            </div>
                          </div>
                        }
                      </div>
                      {this.state.loading === false ? (
                        <div>
                          {this.state.followList}
                          {this.state.pagenation}
                        </div>
                      ) : (
                        LoadingSec
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ModalPopup
          modal={this.state.modalmessage}
          toggle={this.togglemessage}
          className="modal-width followers-msg-popup"
          title=""
          disablefooter={1}
        >
          <div className="fmp-add-members-wrapper">
            <span>
              To:
              {this.state.selectall == false
                ? "Selected " + this.state.selectedUser.length + " Members"
                : " Everyone"}
            </span>
            {/*this.state.selectall == false && (
              <button
                className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                type="button"
              >
                Add more
              </button>
            )*/}
          </div>
          <div className="fmp-form-wrapper">
            <div className="form-group">
              <textarea
                className="form-control"
                id="textareacontent"
                placeholder="Write a message here"
                maxLength="400"
                onChange={this.handleChange.bind(this, "message")}
                value={this.state.message}
              ></textarea>
              {this.state.error_message != "" && (
                <span class="errorspan">Please enter your message</span>
              )}
            </div>
            <div className="fmp-form-note">
              <p>{this.state.characterlength} Characters will be Allowed</p>
              {this.state.selectall == false ? (
                <p>
                  {this.state.genmessagepoints * this.state.selectedUser.length}{" "}
                  Points will be deducted
                </p>
              ) : (
                <p>
                  {this.state.genmessagepoints * this.state.follows.length}{" "}
                  Points will be deducted
                </p>
              )}
            </div>
            <div className="fmp-btns">
              <button
                className={
                  this.state.transferloading
                    ? "loading btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                    : "btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn"
                }
                type="button"
                onClick={this.SendMessage.bind(this)}
              >
                {this.state.sendLoading === true && (
                  <span className="load-data"></span>
                )}
                Send
              </button>

              <button
                className="btn btn1 btn_sm btn_black animate-btn2 ab-none posabs-btn"
                type="button"
                onClick={this.togglemessage}
              >
                Close
              </button>
            </div>
            <div className="error-color">{this.state.pointnotenough}</div>
          </div>
        </ModalPopup>

        <div className="genie-msg-popup-wrapper">
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
    follows: state.follows,
    sendmessage: state.sendmessage,
    district: state.district,
    allcountries: state.allcountries,
    mobilecountry : state.mobilecountry

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFollow: params => {
      dispatch({ type: GET_FOLLOW, params });
    },
    getSendMessage: formPayload => {
      dispatch({ type: GET_SEND_MESSAGE, formPayload });
    },
    getDistrict: () => {
      dispatch({ type: GET_DISTRICT });
    },
    getAllCountries: () => {
      dispatch({ type: GET_ALLCOUNTRIES });
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(GenFollowers));
