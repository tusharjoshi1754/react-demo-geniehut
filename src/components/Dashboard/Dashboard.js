/* eslint-disable */
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import SecondaryHeader from "../Layout/SecondaryHeader";
import ReviewsDefault from "../../common/images/Review-Default.jpg";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Dashboardbar from "./Dashboardbar";
import { profileImage, ProdashOngoing } from "../Config/Config";
import { GET_GENERALDASHBOARD } from "../../actions";
import { Encrypt } from "../Helpers/SettingHelper";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      requestJob: "",
      archeivejob: "",
      completeJob: "",
      user_points: "",
      walletInfoDetails: "",
      user_image_preview: "",
      ProdashOngoingUrl: ""
    };
    this.props.getGeneralDashboard(cookie.load("UserAuthToken"));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    if (!cookie.load("UserAuthToken")) {
      window.location.href = "/login";
    }
    if (cookie.load("UserAuthToken")) {
      this.setState({
        ProdashOngoingUrl: ProdashOngoing + cookie.load("UserAuthToken")
      });
    }
  }
  componentWillReceiveProps(Props) {
    if (Props.generaldashboard !== this.props.generaldashboard) {
      if (Props.generaldashboard[0].status == "success") {
        if (
          Props.generaldashboard[0].userdetails !== null &&
          Props.generaldashboard[0].userdetails !== ""
        ) {
          this.setState({
            user_points: Props.generaldashboard[0].userdetails.user_points
          });
        }
        if (Props.generaldashboard[0].result_set.request_job !== "") {
          this.getrequestJobinfo(
            Props.generaldashboard[0].result_set.request_job
          );
        }
        if (Props.generaldashboard[0].result_set.complete_job !== "") {
          this.getcompleteJobinfo(
            Props.generaldashboard[0].result_set.complete_job
          );
        }

        if (Props.generaldashboard[0].result_set.nolonger_job !== "") {
          this.getarchieveJobinfo(
            Props.generaldashboard[0].result_set.nolonger_job
          );
        }
      }
      if (Props.generaldashboard[0].walletinfo !== "") {
        this.getWalletinfo(Props.generaldashboard[0].walletinfo);
      }
    }
  }

  getWalletinfo(walletInfo) {
    const walletInfodata = walletInfo;
    if (walletInfodata !== undefined && walletInfodata !== null) {
      if (Object.keys(walletInfodata).length > 0) {
        const walletInfoDetails = walletInfodata.map(
          (walletinfo, walletIndex) => {
            var text;
          if(walletinfo.points_action == 'A'){
            text = 'Added';
          }else{
            text = 'Used';
          }
            return (
                     <li key={walletinfo.points_id}><span className="DRB_points"><b>{Math.round(walletinfo.points_total)}</b> {text}</span><span className="DRB_points_date">{walletinfo.points_updated}</span></li>
                   );
    
          });
        this.setState({ walletInfoDetails: walletInfoDetails });
      }
    } else {
      return false;
    }
  }

  getcompleteJobinfo(completeInfo) {
    const completeInfodata = completeInfo;
    if (completeInfodata !== undefined && completeInfodata !== null) {
      if (Object.keys(completeInfodata).length > 0) {
        const completeInfoDetails = completeInfodata.map(
          (completeInfo, requestIndex) => {
            if (completeInfo.sg_job_status == 0) {
              var jobstatus = "Ongoing";
            } else if (completeInfo.sg_job_status == 1) {
              var jobstatus = "Requested Confirmed";
            } else if (completeInfo.sg_job_status == 2) {
              var jobstatus = "Job Completed";
            } else if (completeInfo.sg_job_status == 3) {
              var jobstatus = "Rejected";
            }
            if (completeInfo.userImage !== null) {
              var imgsrc = profileImage + completeInfo.userImage + "";
            }

            return (
              <tr key={completeInfo.qcsd_id}>
                <td>{completeInfo.services_title}</td>
                <td>
                  <img
                    src={imgsrc ? imgsrc : ReviewsDefault}
                    alt=""
                    className="DLB_client_img"
                  />
                  <span className="DLB_client_name">
                    {completeInfo.user_name}
                  </span>
                </td>
                <td>{completeInfo.sg_created_on}</td>
                <td>
                  <span className="DLB_jobs_status Ongoing">{jobstatus}</span>
                </td>
                <td>
                  <Link
                    to={
                      "pro-complete-job-detail/" +
                      Encrypt(completeInfo.qcsd_id, "e") +
                      "/" +
                      Encrypt(completeInfo.job_provider_id, "e")
                    }
                    className="gen_pro_view"
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>
            );
          }
        );
        this.setState({ completeJob: completeInfoDetails });
      } else {
        this.setState({ completeJob: <div>No Completed Jobs found</div> });
      }
    }
  }
  getarchieveJobinfo(acheiveInfos) {
    const acheiveInfodata = acheiveInfos;
    if (acheiveInfodata !== undefined && acheiveInfodata !== null) {
      if (Object.keys(acheiveInfodata).length > 0) {
        const acheiveInfoDetails = acheiveInfodata.map(
          (acheiveInfo, requestIndex) => {
            if (acheiveInfo.sg_job_status == 0) {
              var jobstatus = "Ongoing";
            } else if (acheiveInfo.sg_job_status == 1) {
              var jobstatus = "Requested Confirmed";
            } else if (acheiveInfo.sg_job_status == 2) {
              var jobstatus = "Job Completed";
            } else if (acheiveInfo.sg_job_status == 3) {
              var jobstatus = "Rejected";
            } else if (acheiveInfo.sg_job_status == 4) {
              var jobstatus = "Not required";
            }

            if (acheiveInfo.userImage !== null) {
              var imgsrc = profileImage + acheiveInfo.userImage + "";
            }

            return (
              <tr key={acheiveInfo.qcsd_id}>
                <td>{acheiveInfo.services_title}</td>
                <td>
                  <img
                    src={imgsrc ? imgsrc : ReviewsDefault}
                    alt=""
                    className="DLB_client_img"
                  />
                  <span className="DLB_client_name">
                    {acheiveInfo.user_name}
                  </span>
                </td>
                <td>{acheiveInfo.sg_created_on}</td>
                <td>
                  <span className="DLB_jobs_status Ongoing">{jobstatus}</span>
                </td>
                <td>
                  <Link
                    to={
                      "pro-nolonger-job-detail/" +
                      Encrypt(acheiveInfo.qcsd_id, "e") +
                      "/" +
                      Encrypt(acheiveInfo.job_provider_id, "e")
                    }
                    className="gen_pro_view"
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>
            );
          }
        );
        this.setState({ archeivejob: acheiveInfoDetails });
      } else {
        this.setState({ archeivejob: <div>No Archeive Jobs found</div> });
      }
    }
  }
  getJobdetails(jobid) {}
  getrequestJobinfo(requesttInfo) {
    const requestInfodata = requesttInfo;
    if (requestInfodata !== undefined && requestInfodata !== null) {
      if (Object.keys(requestInfodata).length > 0) {
        const requestJobDetails = requestInfodata.map(requestInfo => {
          var jobstatus = "";
          if (parseInt(requestInfo.pro_count) === 1) {
            if (requestInfo.sg_job_status == 0) {
              jobstatus = "Ongoing";
            } else if (requestInfo.sg_job_status == 1) {
              jobstatus = "Requested Confirmed";
            } else if (requestInfo.sg_job_status == 2) {
              jobstatus = "Job Completed";
            } else if (requestInfo.sg_job_status == 3) {
              jobstatus = "Rejected";
            }
          } else if (parseInt(requestInfo.pro_count) > 1) {
            let job_status = requestInfo.job_status.split(",");
            if (job_status.indexOf(1) >= 0) {
              jobstatus = "Request confirmed";
            } else if (
              job_status.length == 1 &&
              job_status[job_status.length - 1] === 3
            ) {
              jobstatus = "Request rejected";
            } else if (
              job_status.length == 1 &&
              job_status[job_status.length - 1] === 2
            ) {
              jobstatus = "Job completed";
            } else {
              jobstatus = "Request Ongoing";
            }
          }

          if (requestInfo.userImage !== null) {
            var imgsrc = profileImage + requestInfo.userImage + "";
          }

          return (
            <tr key={requestInfo.qcsd_id}>
              <td>{requestInfo.services_title}</td>
              <td>
                <img
                  src={imgsrc ? imgsrc : ReviewsDefault}
                  alt=""
                  className="DLB_client_img"
                />
                <span className="DLB_client_name">{requestInfo.user_name}</span>
                {parseInt(requestInfo.pro_count) > 1 && (
                  <span class="btn btn_orange btn_sm">
                    +{parseInt(requestInfo.pro_count) - 1}
                  </span>
                )}
              </td>
              <td>{requestInfo.sg_created_on}</td>
              <td>
                <span className="DLB_jobs_status Ongoing">{jobstatus}</span>
              </td>
              <td>
                <Link
                  to={"pro-job-detail/" + Encrypt(requestInfo.qcsd_id, "e")}
                  className="gen_pro_view"
                >
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </Link>
              </td>
            </tr>
          );
        });
        this.setState({ requestJob: requestJobDetails });
      } else {
        this.setState({
          requestJob: <div class="table_notfound">No requested Jobs found</div>
        });
      }
    } else {
      this.setState({ requestJob: <div>No requested Jobs found</div> });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <SecondaryHeader />
        <div className="wrapper_out wallet_wrapper_out">
          <div className="container">
            <div className="sdmenu_wrapper Dashboard_wrapper">
              <div className="sdmenu_tabcontent">
                <div className="sdhmenu_wrapper">
                  <div className="Dashboard_box_wrapper">
                    <div className="Dashboard_box_inner_wrapper">
                      <div className="Dashboard_Leftbox">
                        <Dashboardbar />
                        <div className="DLB_table_bar DLB_default">
                          <div className="DLB_services_header">
                            <h2>Search History : GenPro</h2>
                            {/*<Link
                              to={"/genpro-jobs"}
                              className="DLBS_header_link"
                            >
                              View My Jobs
                            </Link>*/}
                          </div>
                          <div className="DLB_jobs_table">
                            <div className="DLB_filter_wrap">
                              <Nav tabs>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "1"
                                    })}
                                    onClick={() => {
                                      this.toggle("1");
                                    }}
                                  >
                                    On going jobs
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "2"
                                    })}
                                    onClick={() => {
                                      this.toggle("2");
                                    }}
                                  >
                                    Completed jobs
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "3"
                                    })}
                                    onClick={() => {
                                      this.toggle("3");
                                    }}
                                  >
                                    Archive
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </div>
                             <div className="Gen_Reviews_content">
                              <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                  <div className="DLB_jobs_table_wrap">
                                    <Table hover className="DLB_jobs_table">
                                      <thead>
                                        <tr>
                                          <th>Service Name</th>
                                          <th>Requested User</th>
                                          <th>Created Date</th>
                                          <th>Status</th>
                                          <th>View</th>
                                        </tr>
                                      </thead>
                                      <tbody>{this.state.requestJob}</tbody>
                                    </Table>
                                  </div>
                                </TabPane>
                                <TabPane tabId="2">
                                  <div className="DLB_jobs_table_wrap">
                                    <Table hover className="DLB_jobs_table">
                                      <thead>
                                        <tr>
                                          <th>Jobs Name</th>
                                          <th>Client Name</th>
                                          <th>Deadline</th>
                                          <th>Status</th>
                                          <th>In services</th>
                                        </tr>
                                      </thead>
                                      <tbody>{this.state.completeJob}</tbody>
                                    </Table>
                                  </div>
                                </TabPane>
                                <TabPane tabId="3">
                                  <div className="DLB_jobs_table_wrap">
                                    <Table hover className="DLB_jobs_table">
                                      <thead>
                                        <tr>
                                          <th>Jobs Name</th>
                                          <th>Client Name</th>
                                          <th>Deadline</th>
                                          <th>Status</th>
                                          <th>In services</th>
                                        </tr>
                                      </thead>
                                      <tbody>{this.state.archeivejob}</tbody>
                                    </Table>
                                  </div>
                                </TabPane>
                              </TabContent>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Dashboard_Rightbox">
                        <div className="Dash_wallet_box DRB_default">
                          <h2>Wallet Points</h2>
                          <p>Currently available in your account</p>
                          <div className="Dash_point_wrap">
                            <h3>
                              {Math.round(this.state.user_points)}
                              <small>GH points</small>
                            </h3>
                          </div>
                        </div>
                        <div className="Dash_wallet_box DRB_default">
                          <h2>GH points history</h2>
                          <ul className="DRB_points_list">
                            {this.state.walletInfoDetails}
                          </ul>
                          <div className="DRB_link">
                            <a href="/wallet">View All</a>
                          </div>
                        </div>
                      </div>
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
    generaldashboard: state.generaldashboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGeneralDashboard: usertoken => {
      dispatch({ type: GET_GENERALDASHBOARD, usertoken });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Dashboard));
