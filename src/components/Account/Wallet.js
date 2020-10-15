/* eslint-disable */
import React, { Component } from "react";
import Select from "react-select";
import "react-intl-tel-input/dist/main.css";
import {
  Row,
  Col,
  ProgressBar,
  Modal,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
  Button,
  Table
} from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Profilebar from "./Profilebar";
import cookie from "react-cookies";
import moment from "moment";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Parser from "html-react-parser";
import SecondaryHeader from "../Layout/SecondaryHeader";
import { appName } from "../Config/Config";
import {
  PageTitle,
  CheckAuth,
  LoadingSec,
  formatAMPM
} from "../Helpers/SettingHelper";

import { GET_USERWALLETINFO } from "../../actions";

class Wallet extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
      selectedvalue: "",
      startDate: "",
      endDate: new Date(),
      credit: "",
      debit: "",
      total: "",
      errorStartDate: "",
      errortoDate: "",
      totalCridit: 0,
      totalDebit: 0,
      loading: true,
      page: 0,
      loadMoreEnable: false,
      oldleads: [],
      moreloading: false,
      infolist: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.filterDate = this.filterDate.bind(this);
    this.loadtotalpoints = this.loadtotalpoints.bind(this);
  }

  componentDidMount() {
    document.title = PageTitle("Wallet");
    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      page: this.state.page
    };
    this.props.getUserwalletInfo(qs.stringify(postObject));
  }

  handleStartDate = date => {
    /*this.setState(
      { startDate: date },
      function() {
        this.filterDate();
      }.bind(this)
    );*/

    var d1 = new Date(date);
    var d2 = new Date(this.state.endDate);

    if (d1.getTime() > d2.getTime()) {
        this.setState({
          errorStartDate: Parser(
            '<span class="errorspan">Please choose correct Start Date</span>'
          )
        });
      } else {
        this.setState(
          { errorStartDate: "",  startDate: date, errortoDate: "" },
          function() {
            this.filterDate();
          }.bind(this)
        );
      }


  };
  handleEndDate = date => {
    if (this.state.startDate != "") {
      var d1 = new Date(this.state.startDate);
      var d2 = new Date(date);
      if (d1.getTime() > d2.getTime()) {
        this.setState({
          errortoDate: Parser(
            '<span class="errorspan">Please choose correct TO Date</span>'
          )
        });
      } else {
        this.setState(
          { errorStartDate: "", endDate: date, errortoDate: "" },
          function() {
            this.filterDate();
          }.bind(this)
        );
      }
    } else {
      this.setState({ endDate: date }, function() {}.bind(this));
      this.setState({
        errorStartDate: Parser(
          '<span class="errorspan">Please select From Date</span>'
        )
      });
    }
  };

  filterDate() {
    this.setState({ oldleads: [], loading: true, infolist: "" });
    var ptsType = "";
    var action = "";
    if (this.state.selectedvalue == "credit") {
      action = "A";
    } else if (this.state.selectedvalue == "debit") {
      action = "S";
    } else {
      ptsType = this.state.selectedvalue;
    }
    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      action: action,
      pointtype: ptsType,
      page: this.state.page,
      startdate: moment(this.state.startDate).format("YYYY-MM-DD"),
      enddate: this.state.endDate
        ? moment(this.state.endDate).format("YYYY-MM-DD")
        : ""
    };
    this.props.getUserwalletInfo(qs.stringify(postObject));
  }
  handleChange = selectedOption => {
    this.setState({
      selectedvalue: selectedOption.value,
      oldleads: [],
      loading: true,
      infolist: ""
    });
    if (selectedOption.value == "credit") {
      var action = "A";
    } else if (selectedOption.value == "debit") {
      var action = "S";
    } else {
      var ptsType = selectedOption.value;
    }

    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      action: action,
      page: this.state.page,
      pointtype: ptsType,
      startdate: this.state.startDate,
      enddate: this.state.endDate
    };
    this.props.getUserwalletInfo(qs.stringify(postObject));
  };

  componentWillReceiveProps(Props) {
    if (Props.walletinfo !== this.props.walletinfo) {
      if (Props.walletinfo[0]["status"] === "success") {
        const totalrecords = Props.walletinfo[0].total_records;
        const limit = 10;
        const loadMoreCount = totalrecords / limit;
        if (totalrecords > 0) {
          const pagecount = parseInt(this.state.page) + 1;
          if (loadMoreCount > pagecount && totalrecords > limit) {
            this.setState({ loadMoreEnable: true });
          } else {
            this.setState({ loadMoreEnable: false });
          }
        } else {
          this.setState({ loadMoreEnable: false });
        }

        let newleads = "";
        if (this.state.oldleads != "") {
          let oldleads = this.state.oldleads;
          newleads = oldleads.concat(Props.walletinfo[0].result_set);
        } else {
          newleads = Props.walletinfo[0].result_set;
        }
        this.setState(
          { oldleads: newleads },
          function() {
            this.transactionhistory(newleads);
            this.loadtotalpoints(newleads);
          }.bind(this)
        );
        this.transactionhistory(Props.walletinfo[0].result_set);

        this.setState({
          totalrecords: Props.walletinfo[0].total_records
        });

        this.setState({ loading: false });
        this.setState({ moreloading: false });
      } else {
        let newleads = "";
        this.setState(
          { totalCridit: 0, totalDebit: 0, loading: false },
          function() {
            this.transactionhistory(newleads);
          }
        );
      }
    }
  }
  aboutmecontent(userID) {
    if ($("#listabout_" + userID).hasClass("h-toggle") === false) {
      $("#listabout_" + userID).addClass("h-toggle");
      $("#listabout_" + userID)
        .next(".readmore")
        .text("Read More");
    } else {
      $("#listabout_" + userID).removeClass("h-toggle");
      $("#listabout_" + userID)
        .next(".readmore")
        .text("Read Less");
    }
  }
  transactionhistory(walletInfo) {
    var walletinfo = walletInfo;
    if (walletinfo !== undefined && walletinfo !== null && walletinfo !== "") {
      let classtype = "";
      if (Object.keys(walletinfo).length > 0) {
        const walltinfoDetails = walletinfo.map((walltinfo, walltinfoIndex) => {
          var date = new Date(walltinfo.points_created);
          var dates =
            date.getDate() +
            " " +
            date.toLocaleString("default", { month: "short" }) +
            ", " +
            date.getFullYear();
          var timer = formatAMPM(walltinfo.points_created);
          if (walltinfo.points_action == "A") {
            var transtype = "+";
            // totalCridit+=parseInt(walltinfo.points_total);
            classtype = "tbl_al_ri positivegreen";
          } else {
            var transtype = "-";
            // totalDebit+=parseInt(walltinfo.points_total);
            classtype = "tbl_al_ri negativered";
          }
          let sno = walltinfoIndex + 1;
          return (
            <tr key={walltinfo.points_id} key={walltinfoIndex}>
              <td>{walltinfo.points_type}</td>
              <td className={classtype}>
                {transtype + Math.round(walltinfo.points_total)}
              </td>
              <td>{dates + " " + timer}</td>
              <td id={"listabout_" + walltinfo.points_id} className="gsj-list-about h-toggle">
                <div className="hidi-content">{walltinfo.points_remarks}</div>
                {/*{walltinfo.points_remarks.length > 20 && (
                  <div className="hidi-toggle-link">
                    <a
                      href="javascript:void(0);"
                      className="readmore"
                      onClick={this.aboutmecontent.bind(
                        this,
                        walltinfo.points_id
                      )}
                    >
                      Read More
                    </a>
                  </div>
                )}*/}
              </td>
            </tr>
          );
        });

        this.setState({ infolist: walltinfoDetails });
      }
    } else {
      this.setState({
        infolist: <div className="table_notfound"> No Records Found</div>
      });
    }
  }
  loadtotalpoints(walletinforun) {
    let totalCridit = 0;
    let totalDebit = 0;

    if (walletinforun != "undefined" && walletinforun != null) {
      let walletinfo = walletinforun;

      if (walletinfo.length > 0) {
        const walltinfoDetails = walletinfo.map((walltinfo, walltinfoIndex) => {
         if (walltinfo.points_action === "A") {
            var transtype = "Credit";
            totalCridit =
              parseInt(Math.round(walltinfo.points_total)) + parseInt(totalCridit);
          } else if (walltinfo.points_action === "S") {
            var transtype = "Debit";
            totalDebit =
              parseInt(Math.round(walltinfo.points_total)) + parseInt(totalDebit);
          }
        });
      }
    }

    let totalPoints = 0;
    if (this.state.selectedvalue === "debit") {
      totalPoints = totalDebit;
    } else {
      totalPoints = totalCridit - totalDebit;
    }
    this.setState({
      totalCridit: totalCridit,
      totalDebit: totalDebit,
      totalPoints: totalPoints
    });
  }

  loadMore() {
    let page = parseInt(this.state.page) + 1;
    this.setState(
      { page: page },
      function() {
        this.loadCustomerLeads();
      }.bind(this)
    );
  }

  loadCustomerLeads() {
    if (this.state.page > 0) {
      this.setState({ moreloading: true });
    }
    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: cookie.load("UserAuthToken"),
      page: this.state.page
    };
    this.props.getUserwalletInfo(qs.stringify(postObject));
  }

  render() {
    const options = [
      { value: "all", label: "All" },
      { value: "credit", label: "Added" },
      { value: "debit", label: "Used" }
      /*{ value: 'ref', label: 'Referral' },
        { value: 'ref_use', label: 'Reference' },
        { value: 'asktocall', label: 'Ask to call' },
        { value: 'topup', label: 'Topup' },
        { value: 'promotion', label: 'Promotion'},*/
    ];
    return (
      <div>
        <Header />
        <SecondaryHeader />
        <Profilebar />
        <div className="wrapper_out wallet_wrapper_out">
          <div className="container">
            <div className="sdmenu_wrapper Gen_wallet_wrapper">
              <div className="sdmenu_tabcontent">
                <div className="sdhmenu_wrapper">
                  <div className="Gen_wallet_content">
                    <div className="table_header_wrap">
                      <div>
                        <h2>GH Points History</h2>
                      </div>
                      <div className="table_h_filter_wrap">
                        <div className="gen-table-sort">
                          <label>Sort By:</label>
                          <div className="re_select">
                            <Select
                              options={options}
                              onChange={this.handleChange}
                              defaultValue={{ label: "All", value: "all" }}
                            />
                          </div>
                        </div>
                        <div className="table_h_filter_datepicker">
                          <div>
                            <label>From</label>
                            <DatePicker
                              selected={this.state.startDate}
                              onChange={this.handleStartDate}
                              popperPlacement="top-end"
                              className="form-control"
                              dateFormat="dd/MM/yyyy"
                              showYearDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={40}
                            />
                            {this.state.errorStartDate}
                          </div>

                          <div>
                            <label>To</label>
                            <DatePicker
                              selected={this.state.endDate}
                              onChange={this.handleEndDate}
                              popperPlacement="top-end"
                              className="form-control"
                              dateFormat="dd/MM/yyyy"
                              showYearDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={40}
                            />
                            {this.state.errortoDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wallet_table_wrap">
                      {/*(this.state.loading==true)?LoadingSec:''*/}

                      <Table hover>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Points</th>
                            <th>Date</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.infolist != "" ? (
                            this.state.infolist
                          ) : (
                            <tr className="load-row">
                              <td colSpan={4} align="center">
                                {LoadingSec}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <div className="cd_points_wrapper">
                      <div>
                        {(this.state.selectedvalue === "credit" ||
                          this.state.selectedvalue === "all" ||
                          this.state.selectedvalue === "") && (
                          <div>
                            <b>Added GH points: </b>{" "}
                            <span>{this.state.totalCridit}</span>
                          </div>
                        )}
                        {(this.state.selectedvalue === "debit" ||
                          this.state.selectedvalue === "all" ||
                          this.state.selectedvalue === "") && (
                          <div>
                            <b>Used GH points: </b>{" "}
                            <span>{this.state.totalDebit}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href="javascript:;"
                        className="btn btn_orange animate-btn2 mtac-btn"
                        onClick={this.loadMore.bind(this)}
                        title="Load More"
                        style={{
                          display:
                            this.state.loadMoreEnable === false ? "none" : ""
                        }}
                      >
                        {this.state.moreloading === true && (
                          <span className="load-data">Loading</span> 
                        )}
                        Load More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
    walletinfo: state.userwalletinfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserwalletInfo: formPayload => {
      dispatch({ type: GET_USERWALLETINFO, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Wallet));
