/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { Table } from "react-bootstrap";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import SecondaryHeader from "../../Layout/SecondaryHeader";
import ReviewsDefault from "../../../common/images/Review-Default.jpg";
import moment from "moment";
import Profilebar from "../Profilebar";
import Genleftmenu from "../../Layout/Genleftmenu";
import cookie from "react-cookies";

import { GET_PROJOBS } from "../../../actions";
import { appName } from "../../Config/Config";
import GenProEnable from "../../Account/GenProEnable";
import { CheckAuth, LoadingSec } from "../../Helpers/SettingHelper";
class Jobs extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
      loadMorebut: "Load More",
      loadMorebutton: 2,
      defaultLimit: 4,
      loadmoreBut: 0,
      loading: true
    };
    this.props.getProJobs(cookie.load("UserAuthToken"));
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}

  componentWillReceiveProps(Props) {
    if (Props.projobs !== this.props.projobs) {
      this.setState({ loading: false });
      if (Props.projobs[0]["status"] === "success") {
        this.setState({
          leaddata: Props.projobs[0]["result_set"],
          loadMorebut: "Load More",
          totalrecords: Props.projobs[0].total_records
        });
        if (
          this.state.defaultLimit > Props.projobs[0].total_records &&
          this.state.loadmoreBut == 0
        ) {
          this.setState({ loadMorebutton: 2 });
        } else {
          this.setState({ loadMorebutton: 1 });
        }
      }
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedvalue: selectedOption.value });
    this.props.getProJobs(cookie.load("UserAuthToken"), selectedOption.value);
  };

  projoblist() {
    var projobs = this.props.projobs[0];
    if (projobs != "undefined" && projobs != null) {
      if (projobs.status == "success") {
        if (Object.keys(projobs).length > 0) {
          const jobinfoDetails = projobs.result_set.map(
            (joblist, jobtinfoIndex) => {
              if (joblist.sg_job_status == "1") {
                var jobstatus = "Pending";
              } else if (joblist.sg_job_status == "2") {
                var jobstatus = "Completed";
              } else if (joblist.sg_job_status == "3") {
                var jobstatus = "Rejected";
              }

              var requestedDate = moment(
                joblist.sg_created_on,
                "YYYYMMDD"
              ).fromNow();
              return (
                <tr key={joblist.sg_job_id}>
                  <td>
                    <img src={ReviewsDefault} alt="" className="Job_tab_img" />
                    <span className="Job_tab_name">
                      {joblist.customer_name}
                    </span>
                  </td>
                  <td>{joblist.services_title}</td>
                  <td>{joblist.sg_transaction_no}</td>
                  <td>{requestedDate}</td>
                  <td>
                    <a href="javscript:void(0);" className="Job_tab_action">
                      {jobstatus}
                    </a>
                  </td>
                </tr>
              );
            }
          );
          return jobinfoDetails;
        }
      } else {
        return (
          <tr>
            <td colspan="6" className="v-align-nr">
              No Result
            </td>
          </tr>
        );
      }
    }
  }

  render() {
    let loadMorebutton = "";

    if (this.state.loadMorebutton == 1) {
      loadMorebutton = (
        <div className="gen-table-footer">
          <a
            href="javascript:void(0);"
            className="btn btn_orange btn_minwid btn-width animate-btn2"
            title="Button"
          >
            {this.state.loadMorebut}
          </a>
        </div>
      );
    } else {
      loadMorebutton = "";
    }

    const options = [
      { value: "all", label: "All" },
      { value: "1", label: "Pending" },
      { value: "2", label: "Confirmed" },
      { value: "3", label: "Rejected" }
    ];
    return (
      <div>
        <Header />
        <SecondaryHeader />
        <Profilebar />
        <div className="wrapper_out">
          <div className="container">
            <div className="sdmenu_wrapper">
              <Genleftmenu currentpage="GenPro" />
              <div className="sdmenu_tabcontent">
                <div className="sdhmenu_wrapper">
                  <ul className="sdhmenu_tablist">
                    <li>
                      <Link to={"/edit-gen-pro"} title="My Services">
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/genpro-my-services"} title="My Services">
                        My Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/genpro-customer-leads"}
                        title="Customer Leads"
                      >
                        Customer Leads
                      </Link>
                    </li>
                    <li className="active">
                      <Link to={"/genpro-jobs"} title="Jobs">
                        Jobs
                      </Link>
                    </li>
                  </ul>
                  <Link
                    to={"/edit-gen-pro"}
                    className="sdhmenu_mtabtrigger"
                    title="GenPro Details"
                  >
                    Details <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genpro-my-services"}
                    className="sdhmenu_mtabtrigger"
                    title="GenPro Details"
                  >
                    My Services <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genpro-customer-leads"}
                    className="sdhmenu_mtabtrigger"
                    title="GenPro Details"
                  >
                    Customer Leads <i className="fa fa-angle-down"></i>
                  </Link>
                  <Link
                    to={"/genpro-jobs"}
                    className="sdhmenu_mtabtrigger active"
                    title="GenPro Details"
                  >
                    Jobs <i className="fa fa-angle-down"></i>
                  </Link>
                  <div className="sdhmenu_content">
                    <div className="gen-table-wrapper">
                      <div className="gen-table-header">
                        <h3>Jobs</h3>
                        <div className="gen-table-sort">
                          <label>Sort By:</label>
                          <div className="re_select">
                            <Select
                              options={options}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {this.state.loading === true && LoadingSec}
                      {this.state.loading === false && (
                        <div>
                          <div className="gen-table-body">
                            <Table striped bordered hover className="Job_table">
                              <thead>
                                <tr>
                                  <th>Service Provider</th>
                                  <th>Services</th>
                                  <th>Transaction No</th>
                                  <th>Requested Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.projoblist()}</tbody>
                            </Table>
                          </div>
                          {/* loadMorebutton */}
                        </div>
                      )}
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
    projobs: state.projobs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProJobs: (UserToken, sorttype) => {
      dispatch({ type: GET_PROJOBS, UserToken, sorttype });
    }
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Jobs));
