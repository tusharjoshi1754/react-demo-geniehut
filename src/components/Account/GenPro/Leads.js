/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  Table,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
  Button
} from "react-bootstrap";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import SecondaryHeader from "../../Layout/SecondaryHeader";
import cookie from "react-cookies";
import GeneralUser from "../../../common/images/accounts/generaluser.png";
import ModalPopup from "../../Layout/ModalPopup";
import GenProCustomerLeadDetail_Content from "../../Layout/GenProCustomerLeadDetail";
import Profilebar from "../Profilebar";
import Genleftmenu from "../../Layout/Genleftmenu";
import moment from "moment";
import GenProEnable from "../../Account/GenProEnable";
import { GET_CUSTOMERLEADS } from "../../../actions";
import { CheckAuth, formatAMPM } from "../../Helpers/SettingHelper";
class Leads extends Component {
  constructor(props) {
    CheckAuth();
    super(props);
    this.state = {
      modalGenProCustomerLeadDetail: false,
      loadMorebut: "Load More",
      loadMorebutton: 2,
      defaultLimit: 10,
      loadmoreBut: 0,
      jobId: ""
    };
    this.props.getCustomerLeads(cookie.load("UserAuthToken"));
    this.toggleGenProCustomerLeadDetail = this.toggleGenProCustomerLeadDetail.bind(
      this
    );
  }

  toggleGenProCustomerLeadDetail(jobid) {
    this.setState(prevState => ({
      modalGenProCustomerLeadDetail: !prevState.modalGenProCustomerLeadDetail,
      jobId: jobid
    }));
  }

  componentDidMount() {}
  componentWillReceiveProps(Props) {
    if (Object.keys(Props.leaddata).length > 0) {
      if (Props.leaddata[0]["status"] === "success") {
        this.setState({
          leaddata: Props.leaddata[0]["result_set"],
          loadMorebut: "Load More",
          totalrecords: Props.leaddata[0].total_records,
          jobId: Props.leaddata[0]["result_set"][0].sg_job_id
        });
        if (
          this.state.defaultLimit > Props.leaddata[0].total_records &&
          this.state.loadmoreBut == 0
        ) {
          this.setState({ loadMorebutton: 2 });
        } else {
          this.setState({ loadMorebutton: 1 });
        }
      }
    }
  }

  proleadlist() {
    var leaddata = this.props.leaddata[0];
    if (leaddata != "undefined" && leaddata != null) {
      if (leaddata.status == "success") {
        if (Object.keys(leaddata).length > 0) {
          const leadinfoDetails = leaddata.result_set.map(
            (leadlist, walltinfoIndex) => {
              if (leadlist.sg_job_status == "0") {
                var jobstatus = "Requested";
              } else if (leadlist.sg_job_status == "1") {
                var jobstatus = "Confirmed";
              } else if (leadlist.sg_job_status == "2") {
                var jobstatus = "Completed";
              } else if (leadlist.sg_job_status == "3") {
                var jobstatus = "Rejected";
              } else if (leadlist.sg_job_status == "4") {
                var jobstatus = "No Longer";
              }
              let type = "";
              if (leadlist.sg_type == "A") {
                type = "Ask to call";
              }else if (leadlist.sg_type == "G") {
                type = "GenMessage";
              }else{
                type = "Contact";
              }
              var date = new Date(leadlist.sg_created_on);
              var dates =
              date.getDate() +
              " " +
              date.toLocaleString("default", { month: "short" }) +
              ", " +
              date.getFullYear();
              var requestedDate = formatAMPM(leadlist.sg_created_on);
              
              return (
                <tr key={leadlist.sg_job_id}>
                  <td>
                    <span className="gen-table-sp-img">
                      <img src={GeneralUser} alt="" />
                    </span>{" "}
                    <span className="gen-table-sp-txt">
                      {leadlist.customer_name}
                    </span>
                  </td>
                  <td>{leadlist.services_title}</td>
                  <td>{leadlist.sg_transaction_no}</td>
                  <td>{dates + " " + requestedDate}</td>
                  <td>{type}</td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      onClick={this.toggleGenProCustomerLeadDetail.bind(
                        this,
                        leadlist.sg_job_id
                      )}
                      className="gen_pro_view"
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              );
            }
          );
          return leadinfoDetails;
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
                      <Link to={"/edit-gen-pro"} title="GenPro Details">
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link to={"/genpro-my-services"} title="My Services">
                        My Services
                      </Link>
                    </li>
                    <li className="active">
                      <Link
                        to={"/genpro-customer-leads"}
                        title="Customer Leads"
                      >
                        Customer Leads
                      </Link>
                    </li>
                    <li>
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
                    className="sdhmenu_mtabtrigger active"
                    title="GenPro Details"
                  >
                    Customer Leads <i className="fa fa-angle-down"></i>
                  </Link>
                  <div className="sdhmenu_content">
                    <div className="gen-table-wrapper">
                      <div className="gen-table-header">
                        <h3>Customer Leads</h3>
                        <div className="gen-table-sort"></div>
                      </div>
                      <div className="gen-table-body gen_CL_table">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Service Provider</th>
                              <th>Services</th>
                              <th>Transaction No</th>
                              <th>Requested Date</th>
                              <th>Requested Via</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.proleadlist()}</tbody>
                        </Table>
                      </div>
                      {loadMorebutton}
                    </div>
                  </div>
                  <Link
                    to={"/genpro-jobs"}
                    className="sdhmenu_mtabtrigger"
                    title="GenPro Details"
                  >
                    Jobs <i className="fa fa-angle-down"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ModalPopup
          modal={this.state.modalGenProCustomerLeadDetail}
          toggle={this.toggleGenProCustomerLeadDetail}
          className="modal-width GenProCustomerLeadDetail_popup EditDetailProperty_popup"
          title="Customer Leads Details"
        >
          <GenProCustomerLeadDetail_Content jobid={this.state.jobId} />
        </ModalPopup>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    leaddata: state.customerleads
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomerLeads: UserToken => {
      dispatch({ type: GET_CUSTOMERLEADS, UserToken });
    }
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Leads));
