/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Select from "react-select";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import SecondaryHeader from "../../Layout/SecondaryHeader";
import AddMyService from "../../../common/images/myservice-add.png";
import noimgserv from "../../../common/images/default.jpg";
import Profilebar from "../Profilebar";
import ModalPopup from "../../Layout/ModalPopup";
import Genleftmenu from "../../Layout/Genleftmenu";
import GenRunAddservice from "./AddService";
import $ from "jquery";
import {
  GET_SELECTRUNSERVICE,
  GET_RUNSERVICEUPDATE,
  GET_RUNSERVICEACTION
} from "../../../actions";
import { appName, servicemediaImage } from "../../Config/Config";
import SuccessMsg from "../../../common/images/success-msg.png";
import { PageTitle, CheckAuth, LoadingSec } from "../../Helpers/SettingHelper";
class Services extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
      activegc: "",
      activegp: "enable",
      activega: "enable",
      activegr: "",
      activegrd: "enable",
      modalAddservice: false,
      checked: false,
      enablevalue: "",
      enablepopup: "no",
      serviceloading: true,
      selectservice: "",
      selectedlistservice: "",
      loadService: true
    };
    this.toggleGenRunAddservice = this.toggleGenRunAddservice.bind(this);
  }

  componentDidMount() {
    document.title = PageTitle("GenRun Services");
    this.props.getSelectrunService(cookie.load("UserAuthToken"), "GR");

    $(document).click(function(e) {
      if (!$(e.target).is(".genie-msg-popup-wrapper, .genie-popup-open * ")) {
        if ($(".genie-msg-popup-wrapper").is(":visible")) {
          $(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
          $(".genie-msg-popup-wrapper")
            .parents("body")
            .removeClass("genie-popup-shade");
        }
      }
    });
  }
  componentWillReceiveProps(Props) {
    if (
      Props.runserviceaction != "undefined" &&
      Props.runserviceaction != null &&
      this.state.enablepopup === "yes"
    ) {
      if (Object.keys(Props.runserviceaction).length > 0) {
        if (Props.runserviceaction[0].status === "actionsuccess") {
          $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
          $(".genie-msg-popup-wrapper")
            .parents("body")
            .addClass("genie-popup-shade");
          $(".genie-msg-popup-body").html(
            '<div class="state_img text-center"><img src="' +
              SuccessMsg +
              '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>' +
              Props.runserviceaction[0].message +
              "</p> "
          );
        }
      }
    }
    if (Props.selectrunservice != this.props.selectrunservice) {
      this.setState({ loadService: false });
      if (Props.selectrunservice[0].status === "success") {
        this.setState(
          { selectservice: Props.selectrunservice[0] },
          function() {
            this.ListServices();
          }.bind(this)
        );
      }
    }
  }
  toggleGenRunAddservice() {
    this.setState(prevState => ({
      modalAddservice: !prevState.modalAddservice
    }));
  }

  handleChangeCheck = event => {
    if (event.target.checked == "") {
      var qs = require("qs");
      var postObject = {
        app_name: appName,
        user_token: cookie.load("UserAuthToken"),
        services_id: event.target.value,
        action: "DISABLE"
      };
      this.setState({
        checked: false
      });
      this.setState(
        { enablepopup: "yes" },
        function() {
          this.props.getRunServiceAction(qs.stringify(postObject));
        }.bind(this)
      );
    } else {
      var qs = require("qs");
      var postObject = {
        app_name: appName,
        user_token: cookie.load("UserAuthToken"),
        services_id: event.target.value,
        action: "ENABLE"
      };
      this.setState({
        checked: true
      });
      this.setState(
        { enablepopup: "yes" },
        function() {
          this.props.getRunServiceAction(qs.stringify(postObject));
        }.bind(this)
      );
    }
  };

  closepopup() {
    cookie.save("EnableGenRun", "No");
    $(".genie-close-btn")
      .parents(".genie-msg-popup-wrapper")
      .removeClass("genie-popup-open");
    $(".genie-msg-popup-wrapper")
      .parents("body")
      .removeClass("genie-popup-shade");
    window.location.href = "/genrun-my-services";
  }
  ListServices() {
    var serviceListArr = this.state.selectservice;
    if (
      serviceListArr != "undefined" &&
      serviceListArr != null &&
      Object.keys(serviceListArr).length > 0
    ) {
      if (serviceListArr.status == "success") {
        const serviceDetails = serviceListArr.getAllServices.map(
          (services, serviceIndex) => {
            if (services.gen_service_status == "A") {
              var checked = true;
            } else if (services.gen_service_status == "I") {
              var checked = false;
            }
            var imgservice = services.services_default_icon;
            var imgsrc;
             if(imgservice !== null && imgservice !== ''){
                imgsrc = servicemediaImage+services.services_default_icon+"";
             }else{
                imgsrc = noimgserv+"";
             }
            return (
              <div className="gen-myservices-box" key={serviceIndex}>
                <div
                  className="gen-myservices-innerbox"
                  key={services.services_id}
                >
                  <div className="gen-myservices-img">
                    <img src={imgsrc} alt="" />
                  </div>
                  <div className="gen-myservices-text">
                    {services.services_title}
                  </div>
                </div>
                <div className="gen-toggle">
                  <div className="yn_check">
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      onClick={this.handleChangeCheck.bind(this)}
                      value={services.services_id}
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            );
          }
        );

        this.setState({ selectedlistservice: serviceDetails });
      } else {
        this.setState({ selectedlistservice: "" });
      }
    }
  }
  render() {
    if (cookie.load("EnableGenRun") == "yes") {
      $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
      $(".genie-msg-popup-wrapper")
        .parents("body")
        .addClass("genie-popup-shade");
      $(".genie-msg-popup-body").html(
        '<div class="state_img text-center"><img src="' +
          SuccessMsg +
          '" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>GenRun Enabled Successfully</p> '
      );
    }
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
                      <Link to={"/edit-gen-run"} title="GenPro Details">
                        Details
                      </Link>
                    </li>
                    <li className="active">
                      <Link to={"/genrun-my-services"} title="My Services">
                        My Services
                      </Link>
                    </li>
                    <li>
                      <Link to={"/genrun-customerleads"} title="Customer Leads">
                        Customer Leads
                      </Link>
                    </li>
                    {/*<li>
                                      <Link to={"/genrun-my-services"} title="Jobs">Jobs</Link>
                                    </li>*/}
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
                    className="sdhmenu_mtabtrigger active"
                    title="GenRun Details"
                  >
                    My Services <i className="fa fa-angle-down"></i>
                  </Link>
                  <div className="sdhmenu_content">
                    {this.state.loadService === true && LoadingSec}
                    {this.state.selectedlistservice === "" &&
                      this.state.loadService === false && (
                        <div className="gen-atl-service">
                          Please select at least one service!
                        </div>
                      )}
                    <div className="gen-myservices-wrapper">
                      <div className="gen-myservices-inner-wrapper">
                        {this.state.loadService === false && (
                          <p>
                            Please update “Details” to publish your services
                            online and earn GH points. You can search “Customer
                            Leads” for existing job requests from other GenUser
                            customers.
                          </p>
                        )}
                        {this.state.selectedlistservice !== ""
                          ? this.state.selectedlistservice
                          : ""}
                          {this.state.loadService === false && (
                        <div
                          className="gen-myservices-box gen-add-service"
                          onClick={this.toggleGenRunAddservice}
                          style={{
                            display:
                              this.props.serviceloading === true ? "none" : ""
                          }}
                        >
                           <div>
                              <div className="gen-myservices-img">
                                <img src={AddMyService} alt="Add" />
                              </div>
                              <div className="gen-myservices-text">
                                Add New Service
                              </div>
                            </div>
                         
                        </div>
                         )}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={"/genrun-customerleads"}
                    className="sdhmenu_mtabtrigger"
                    title="GenRun Details"
                  >
                    Customer Leads <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genrun-jobs"}
                    className="sdhmenu_mtabtrigger"
                    title="GenRun Details"
                  >
                    Jobs <i className="fa fa-angle-down"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div>
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

        <ModalPopup
          modal={this.state.modalAddservice}
          toggle={this.toggleGenRunAddservice}
          className="modal-width Genpro_popup AddService_popup"
          title="Add Services"
        >
          <GenRunAddservice />
        </ModalPopup>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    selectrunservice: state.selectrunservice,
    runserviceaction: state.runserviceaction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectrunService: (usertoken, usertype) => {
      dispatch({ type: GET_SELECTRUNSERVICE, usertoken, usertype });
    },
    getRunServiceAction: formPayload => {
      dispatch({ type: GET_RUNSERVICEACTION, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Services));
