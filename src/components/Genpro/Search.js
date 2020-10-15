import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import $ from "jquery";
import { Row, Col, ProgressBar } from "react-bootstrap";
import "react-intl-tel-input/dist/main.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { GET_QUESTIONS, GET_SEARCH_GEN_PRO } from "../../actions";
import cookie from "react-cookies";
import {
  CalculatePercentage,
  LoadingSec,
  isNumber
} from "../Helpers/SettingHelper";
import { apiUrl, appName } from "../Config/Config";
import ModalPopup from "../Layout/ModalPopup";
import Login from "../Layout/Login";
var serialize = require("form-serialize");
class Search extends Component {
  constructor(props) {
    super(props);
    const ServiceID =
      typeof this.props.match.params.ServiceID === "undefined"
        ? ""
        : this.props.match.params.ServiceID;
    this.state = {
      userToken: cookie.load("UserAuthToken"),
      modalLogin: false,
      questionFrm1:
        this.props.location.state !== "" &&
        this.props.location.state !== undefined &&
        this.props.location.state.questionFrm1 !== undefined
          ? this.props.location.state.questionFrm1
          : "",
      SearchResultData:
        this.props.location.state !== "" &&
        this.props.location.state !== undefined &&
        this.props.location.state.search_data !== undefined
          ? this.props.location.state.search_data
          : "",
      currentStep: 1,
      loading: true,
      ServiceID: ServiceID,
      proQuestions: [],
      QuestionDetails: "",
      currentProgress: 0,
      nextMove: 1,
      formLoad: false,
      loadQuestion: true,
      service_title: ''
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  componentDidMount() {
    this.props.getQuestions(this.state.ServiceID);

    $(document).ready(function() {
      $("body").on("change", ".options_check", function() {
        let types = $(this)
          .parents(".service-step-box")
          .data("type");
        let curretnID = $(this)
          .parents(".options")
          .attr("id");
        if (types === "radio") {
          $(this)
            .parents(".service-step-box")
            .find(".remarks")
            .hide();
        }
        if ($(this).is(":checked")) {
          $("#" + curretnID + " .remarks").show();
        } else {
          $("#" + curretnID + " .remarks").hide();
        }
      });

      $(".remove_image").hide();

      $("body").on("change", 'input[type="file"]', function(e) {
        if (e.target.files !== "" && typeof e.target.files !== "undefined") {
          var roots = $(this).parents(".file_upload_wrap");
          var fileName = e.target.files[0].name;
          roots.find(".File_upload_value").html(fileName);
        }
      });

      $("body").on("click", ".remove_image", function(e) {
        $(this)
          .parents(".row")
          .remove();
      });

      $("body").on("click", ".removeImage", function(e) {
        var roots = $(this).parents(".file_upload_wrap");
        roots.find(".exist_image").val("");
        roots.find(".preview-image").html("");
      });

      $("body").on("click", ".add_more_image", function(e) {
        var roots = $(this).parents(".form-group");
        if (roots.find(".row").length <= 3) {
          var htmls = roots.find(".row:last-child").html();
          roots.append('<div class="row">' + htmls + "</div>");
          roots
            .find(".row")
            .last()
            .find(".File_upload_value")
            .html("File Uploaded");
          roots
            .find(".row")
            .last()
            .find(".preview-image")
            .html("");

          roots
            .find(".row")
            .last()
            .find('input[type="file"]')
            .val("");
          roots
            .find(".row")
            .last()
            .find('input[type="text"]')
            .val("");
          roots.find(".add_more_image").hide();
          roots.find(".remove_image").show();
          roots
            .find(".add_more_image")
            .first()
            .show();
          roots
            .find(".remove_image")
            .first()
            .hide();
        } else {
          alert("Maximum 4 fields are allowed.");
        }
      });
    });
  }
  componentWillReceiveProps(Props) {
    if (Props.questions !== this.props.questions) {
      this.setState({ loadQuestion: false });
      if (Props.questions[0].status === "success") {
        this.setState(
          { proQuestions: Props.questions[0].result_set, service_title:Props.questions[0].service_title  },
          function() {
            this.displayQuestions();
          }
        );
      }
    }
    if (Props.searchgenpro !== this.props.searchgenpro) {
      this.setState({formLoad: false})
      var form1 = document.querySelector("#questionFrm");
      var questionFrm1 = serialize(form1, { hash: true });
      this.props.history.push({
        pathname: "/customer/pro-search-list",
        state: {
          runserachlist: Props.searchgenpro[0].data,
          questionFrm1: questionFrm1
        }
      });
    }
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  toggleLogin() {
    this.setState(prevState => ({
      modalLogin: !prevState.modalLogin
    }));
  }
  loginresponse = (userToken, name) => {
    if (userToken !== "" && typeof userToken !== "undefined") {
      this.setState({ userToken: userToken, UserFullname: name }, function() {
        this._search();
      });
    }
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    const error = this.validateForm(currentStep);
    console.log(error)
    if (error === 0) {
      $(".alert-Field").hide();
      currentStep = parseInt(currentStep) + 1;
      const totlaStep = $(".service-step-box").length;
      const currentProgress = CalculatePercentage(
        totlaStep,
        this.state.nextMove
      );
      this.setState({ currentProgress: currentProgress });
      this.setState({
        currentStep: currentStep,
        nextMove: parseInt(this.state.nextMove) + 1
      });
      $(".service-step-box").hide();
      $("#step_" + currentStep).show();
      $("html, body").animate({
        scrollTop: $("#step_" + currentStep).position().top - 200
      });
    } else {
      $(".alert-Field").show();
    }
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
    $(".service-step-box").hide();
    $("#step_" + currentStep).show();
  };

  _search = () => {
    let currentStep = this.state.currentStep;
    const error = this.validateForm(currentStep);
    if (error === 0) {

      var formdataNew = document.querySelector("#questionFrm");
      var questionFrm1 = serialize(formdataNew, { hash: true });
      var form = $("#questionFrm");
      
      if (
        this.state.userToken !== "" &&
        typeof this.state.userToken !== "undefined"
      ) {
        /*this.setState({formLoad:true});
        $('.alert-Field').hide();
        var form = document.querySelector('#questionFrm');
        var questionFrm = serialize(form, { hash: true });
        this.props.getSearchGenPro(questionFrm);*/

        this.setState({ formLoad: true });
        $(".alert-Field").hide();

       
        var formdata = false;
        if (window.FormData) {
          formdata = new FormData(form[0]);
        }

        let current = this;
        $.ajax({
          url: apiUrl + "genpro/searchgenpro",
          data: formdata ? formdata : form.serialize(),
          cache: false,
          async: false,
          contentType: false,
          processData: false,
          dataType: "JSON",
          type: "POST",
          success: function(result, textStatus, jqXHR) {
            if (result.status === "success") {
              current.props.history.push({
                pathname: "/customer/pro-search-list",
                state: {
                  runserachlist: result.data,
                  questionFrm1: questionFrm1
                }
              });
            }
          }
        });
      } else {
        //this.toggleLogin();

        this.setState({ formLoad: true });
        $(".alert-Field").hide();

        this.props.history.push({
              pathname: '/login',
              state: {genprosearchdata: form.serialize(), quesFrm: questionFrm1}  
        })
      }
    } else {
      $(".alert-Field").show();
    }
  };

  validateForm(currentStep) {
    let error = 0;
    if (("#step_" + currentStep + " .require").length > 0) {
      const currentType = $("#step_" + currentStep).data("type");
      {/*if (currentType === "textarea") {
        if ($("#step_" + currentStep + " textarea").val() === "") {
          error++;
        }
      } else if (currentType === "textbox") {
        if ($("#step_" + currentStep + ' input[type="text"]').val() === "") {
          error++;
        }
      } else */}if (currentType === "checkbox") {
        if (
          $("#step_" + currentStep + ' input[type="checkbox"]:checked')
            .length === 0
        ) {
          error++;
        } else {
          $("#step_" + currentStep + ' input[type="checkbox"]:checked').each(
            function() {
              var currentCheck = $(this)
                .parents(".options")
                .attr("id");
              if ($("#" + currentCheck + " .optremarks").val() === "") {
                $("#" + currentCheck + " .optremarks").addClass("error");
                error++;
              } else {
                $("#" + currentCheck + " .optremarks").removeClass("error");
              }
            }
          );
        }
      } else if (currentType === "radio") {
        if (
          $("#step_" + currentStep + ' input[type="radio"]:checked').length ===
          0
        ) {
          error++;
        } else {
          $("#step_" + currentStep + ' input[type="radio"]:checked').each(
            function() {
              var currentCheck = $(this)
                .parents(".options")
                .attr("id");
              if ($("#" + currentCheck + " .optremarks").val() === "") {
                $("#" + currentCheck + " .optremarks").addClass("error");
                error++;
              } else {
                $("#" + currentCheck + " .optremarks").removeClass("error");
              }
            }
          );
        }
      } else if (currentStep === "image") {
        error++;
      }
    }
    return error;
  }

  /*
   * the functions for our button
   */
  previousButton() {
    if (this.state.currentStep > 1) {
      return (
        <button
          className="btn animate-btn2 btn_grey ab-none btn_sm"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
  }

  nextButton() {
    if (this.state.currentStep !== $(".service-step-box").length) {
      return (
        <button
          className="btn animate-btn2 btn_green ab-none float-right btn_sm"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
  }

  searchButton() {
    if (this.state.currentStep === $(".service-step-box").length) {
      return (

        <button
          className="btn animate-btn2 btn_green float-right btn_sm"
          type="submit"
          onClick={this._search}
          disabled={(this.state.formLoad ===true) ? true : false}
        >

        {this.state.formLoad ===true &&
             <span className="load-data">Loading</span> 
        }
          Search
        </button>
      );
    }
  }

  displayQuestions() {
    let QuestionDetails = "";
    if (this.state.proQuestions !== "") {
      QuestionDetails = Object.entries(this.state.proQuestions).map(
        (item, index) => {
          let steps = parseInt(index) + 1;
          let quesDet = item[1];
          return (
            <div
              className="service-step-box"
              data-type={quesDet.quiz_answer_type}
              id={"step_" + steps}
              key={index}
              style={{
                display: this.state.currentStep === steps ? "block" : "none"
              }}
            >
              <div
                className={
                  quesDet.quiz_required === "Y"
                    ? "form-group require"
                    : "form-group"
                }
              >
                <label htmlFor="username">
                  {quesDet.quiz_question}
                  {quesDet.quiz_required === "Y" && (
                    <span className="required">*</span>
                  )}
                </label>
                <input type="hidden" value={item[0]} name="ques_id[]" />
                {this.loadOptions(item)}
              </div>
            </div>
          );
        }
      );
    }
    this.setState({ QuestionDetails: QuestionDetails });
  }

  loadOptions(options) {
    if (options[1]) {
      const opt = options[1];
      let answer = "";
      let remarkcheckbox = "";
      let ansImgCaption = "";
      if (
        this.state.questionFrm1 !== "" &&
        typeof this.state.questionFrm1 !== "undefined"
      ) {
        answer =
          typeof this.state.questionFrm1["ans_" + options[0]] !== undefined
            ? this.state.questionFrm1["ans_" + options[0]]
            : "";
        remarkcheckbox =
          typeof this.state.questionFrm1["remarks_ans_" + options[0]] !==
          undefined
            ? this.state.questionFrm1["remarks_ans_" + options[0]]
            : "";
        ansImgCaption =
          typeof this.state.questionFrm1["ans_img_caption_" + options[0]] !==
          undefined
            ? this.state.questionFrm1["ans_img_caption_" + options[0]]
            : "";
      }
      if (opt["quiz_answer_type"] === "textarea") {
        return (
          <div>
            <input
              type="hidden"
              value={options[0]}
              name={"ans_id_" + options[0]}
            />
            <textarea
              className={
                opt.quiz_required === "Y" ? "form-control" : "form-control"
              }
              name={"ans_" + options[0] + "[]"}
              placeholder={opt.ques_placeholder}
              defaultValue={answer}
            ></textarea>
          </div>
        );
      } else if (opt["quiz_answer_type"] === "textbox") {
        return (
          <div>
            <input
              type="hidden"
              value={options[0]}
              name={"ans_id_" + options[0]}
            />
            <input
              className={
                opt.quiz_required === "Y" ? "form-control" : "form-control"
              }
              type="text"
              name={"ans_" + options[0] + "[]"}
              defaultValue={answer}
              onKeyPress={
                opt.ques_ref === "P" || opt.ques_ref === "PC"
                  ? e => isNumber(e)
                  : ""
              }
              placeholder={
                opt.ques_placeholder !== ""
                  ? opt.ques_placeholder
                  : "Enter Postal Code"
              }
            />
          </div>
        );
      } else if (
        opt["quiz_answer_type"] === "checkbox" ||
        opt["quiz_answer_type"] === "radio"
      ) {
        return Object.entries(opt["fields"]).map((item, index) => {
          let quiz_answer_type = opt["quiz_answer_type"];

          return (
            <div className="options" key={index} id={"options_" + item[0]}>
              <div
                className={
                  quiz_answer_type === "radio"
                    ? "custom_radio"
                    : "custom_checkbox"
                }
              >
                <input
                  type="hidden"
                  name={"ans_id_" + options[0] + "[]"}
                  value={item[0]}
                />
                <input
                  className={
                    opt.quiz_required === "Y"
                      ? "form-control options_check"
                      : "form-control options_check"
                  }
                  type={opt["quiz_answer_type"]}
                  value={item[0]}
                  name={"ans_" + options[0] + "[]"}
                  defaultChecked={answer.indexOf(item[0]) >= 0 ? true : false}
                />
                <span>{item[1].ques_content}</span>
              </div>
              {item[1].ques_remarks === "Y" && (
                <div
                  className="form-group remarks"
                  style={{
                    display: answer.indexOf(item[0]) >= 0 ? "" : "none"
                  }}
                >
                  <label>
                    Add Remarks<span className="required">*</span>
                  </label>
                  <textarea
                    className="form-control optremarks"
                    name={"remarks_ans_" + options[0] + "[]"}
                    defaultValue={
                      remarkcheckbox[index] !== "" &&
                      typeof remarkcheckbox[index] != "undefined"
                        ? remarkcheckbox[index]
                        : ""
                    }
                  ></textarea>
                </div>
              )}
            </div>
          );
        });
      } else if (opt["quiz_answer_type"] === "image") {
        return this.loadUplaodImagesection(
          options[1],
          opt["ques_type"],
          ansImgCaption
        );
      }
    }
  }

  loadUplaodImagesection(QuestionID, ques_type, ansImgCaption) {
    let imageExist = 0;
    if (
      this.state.SearchResultData !== "" &&
      typeof this.state.SearchResultData !== "undefined"
    ) {
      if (
        this.state.SearchResultData.imagelist !== "" &&
        typeof this.state.SearchResultData.imagelist !== "undefined"
      ) {
        let quesID = QuestionID.quiz_id;
        if (
          this.state.SearchResultData.imagelist[quesID] !== "" &&
          typeof this.state.SearchResultData.imagelist[quesID] !== "undefined"
        ) {
          imageExist++;

          return this.state.SearchResultData.imagelist[quesID].map(
            (item, index) => {
              return (
                <Row className="image-upload-section">
                  <Col md={5}>
                    <div className="file_upload_wrap">
                      <input
                        type="hidden"
                        name={"ans_id_" + QuestionID.quiz_id + "[]"}
                        value={QuestionID.ques_id}
                      />
                      <input
                        type="hidden"
                        name={"img_check_" + QuestionID.quiz_id + "[]"}
                        value={
                          QuestionID.customer_ans_content
                            ? QuestionID.customer_ans_content
                            : ""
                        }
                      />

                      <input
                        type="hidden"
                        name={"customer_ans_id_" + QuestionID.quiz_id + "[]"}
                        value={QuestionID.customer_ans_id}
                      />

                      <input
                        type="file"
                        className="form-control"
                        name={"ans_" + QuestionID.quiz_id + "[]"}
                      />

                      <div className="File_upload_Front">
                        <span className="File_upload_value">{item.name}</span>
                        <span className="File_upload_btn">
                          <i className="fa fa-paperclip" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div class="preview-image">
                        <img src={item.imagelink} alt="" />
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <input
                      type="text"
                      name={"ans_img_caption_" + QuestionID.quiz_id + "[]"}
                      className="form-control"
                      placeholder="Eg. Caption"
                      value={ansImgCaption}
                    />
                  </Col>
                  {ques_type === "M" && (
                    <Col md={2}>
                      <button
                        type="button"
                        className="btn btn_testsm ab-none row-add-btn add_more_image"
                        style={{ display: index === 0 ? "" : "none" }}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="btn btn_testsm ab-none row-add-btn remove_image"
                        style={{ display: index === 0 ? "none" : "" }}
                      >
                        Remove
                      </button>
                    </Col>
                  )}
                </Row>
              );
            }
          );
        }
      }
    }
    if (imageExist === 0) {
      return (
        <Row className="image-upload-section">
          <Col md={5}>
            <div className="file_upload_wrap">
              <input
                type="hidden"
                name={"ans_id_" + QuestionID.quiz_id + "[]"}
                value={QuestionID.ques_id || ""}
              />
              <input
                type="hidden"
                name={"img_check_" + QuestionID.quiz_id + "[]"}
                value={
                  QuestionID.customer_ans_content
                    ? QuestionID.customer_ans_content
                    : ""
                }
              />

              <input
                type="hidden"
                name={"customer_ans_id_" + QuestionID.quiz_id + "[]"}
                value={QuestionID.customer_ans_id || ""}
              />

              <input
                type="file"
                className="form-control"
                name={"ans_" + QuestionID.quiz_id + "[]"}
              />

              <div className="File_upload_Front">`  `
                <span className="File_upload_value">File Uploaded</span>
                <span className="File_upload_btn">
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <input
              type="text"
              name={"ans_img_caption_" + QuestionID.quiz_id + "[]"}
              className="form-control"
              placeholder="Eg. Caption"
            />
          </Col>
          {ques_type === "M" && (
            <Col md={3}>
              <button
                type="button"
                className="btn btn_testsm ab-none row-add-btn add_more_image"
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn_testsm ab-none row-add-btn remove_image"
                style={{ display: "none" }}
              >
                Remove
              </button>
            </Col>
          )}
        </Row>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="innerpage-head-banner">
          <div className="container">
            <div className="innerpage-head-wrapper">
              <h2>
                You have chosen <span>{this.state.service_title},</span>
              </h2>
              <p>
                Once you complete your request we will get best list of GenPro
              </p>
            </div>
          </div>
        </div>
        <div className="pro-service-form-block">
          <div className="container">
            <div className="pro-service-form-innerblock">
              <div className="pro-service-form-wrap">
                {this.state.loadQuestion === true && LoadingSec}
                {this.state.loadQuestion === false && (
                  <div>
                    <div className="psf-progress-wrapper">
                      <div className="psf-progress-text">
                        <span>{this.state.currentProgress}%</span> Completed
                      </div>
                      <ProgressBar now={this.state.currentProgress} />
                      <div className="psf-progress-percent">
                        <span>0%</span>
                        <span>100 %</span>
                      </div>
                    </div>
                    <div className="pro-service-form">
                      <form encType="multipart/form-data" id="questionFrm">
                        <input type="hidden" name="app_name" value={appName} />
                        <input
                          type="hidden"
                          name="service_id"
                          value={this.state.ServiceID}
                        />
                        <input
                          type="hidden"
                          name="user_token"
                          value={cookie.load("UserAuthToken")}
                        />

                        {this.state.QuestionDetails}
                      </form>
                    </div>
                    <div className="alert-Field" style={{ display: "none" }}>
                      Above field is mandatory
                    </div>
                    <div className="pro-service-form-navs">
                      {this.previousButton()}
                      {this.nextButton()}
                      {this.searchButton()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ModalPopup
          modal={this.state.modalLogin}
          toggle={this.toggleLogin}
          className="modal-width login_popup Gen_popup"
          title="Login"
          disablefooter={1}
        >
          <Login loginresponse={this.loginresponse} toggle={this.toggleLogin} />
        </ModalPopup>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    questions: state.questions,
    searchgenpro: state.searchgenpro
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: serviceID => {
      dispatch({ type: GET_QUESTIONS, serviceID: serviceID });
    },
    getSearchGenPro: formPayload => {
      dispatch({ type: GET_SEARCH_GEN_PRO, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Search));
