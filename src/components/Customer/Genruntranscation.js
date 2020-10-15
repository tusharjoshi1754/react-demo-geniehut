/* eslint-disable */
import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import cookie from "react-cookies";
import SecondaryHeader from "../Layout/SecondaryHeader";
import Profilebar from "../Account/Profilebar";
import { PageTitle, LoadingSec, getExpirydate } from "../Helpers/SettingHelper";
import { SearchImage } from "../Config/Config";
import { GET_RUNTRANSACTION } from "../../actions";

const options = [
  { value: "P", label: "Pending" },
  { value: "CO", label: "Completed" }
];

class Genruntranscation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedvalue: "",
      selectedOption: "",
      page: 0,
      loadMoreEnable: false,
      oldleads: [],
      moreloading: false,
      runleadlist: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = PageTitle("My Transactions");
    this.props.getRunTransaction(
      cookie.load("UserAuthToken"),
      this.state.page,
      ""
    );
  }
  componentWillReceiveProps(Props) {
    this.setState({ moreloading: false });
    if (Object.keys(Props.runtransaction).length > 0) {
      if (Props.runtransaction[0].status === "Success") {
        const totalrecords = Props.runtransaction[0].total_rows;
        const limit = Props.runtransaction[0].limit;
        const loadMoreCount = totalrecords / limit;
        const pagecount = parseInt(this.state.page) + 1;
        if (loadMoreCount > pagecount && totalrecords > limit) {
          this.setState({ loadMoreEnable: true });
        } else {
          this.setState({ loadMoreEnable: false });
        }
        let newleads = "";
        if (this.state.oldleads !== "") {
          let oldleads = this.state.oldleads;
          newleads = oldleads.concat(
            Props.runtransaction[0].result_set.records
          );
        } else {
          newleads = Props.runtransaction[0].result_set.records;
        }
        this.setState(
          { oldleads: newleads },
          function() {
            this.getRunTransaction(newleads);
          }.bind(this)
        );

        this.getRunTransaction(Props.runtransaction[0].result_set.records);

        this.setState({
          totalrecords: Props.runtransaction[0].total_records
        });
      } else if (Props.runtransaction[0].status === "error") {
        this.setState({ runleadlist: "No records found" });
      } else if (Props.runtransaction[0].status === "authenticfailed") {
        window.location.href = "/logout";
      }
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState(
      {
        selectedvalue: selectedOption.value,
        page: 0,
        oldleads: [],
        runleadlist: ""
      },
      function() {
        this.loadruntransaction();
      }.bind(this)
    );
  };

  getRunTransaction(rundetails) {
    const rundetailsdata = rundetails;
    if (rundetailsdata !== undefined && rundetailsdata !== null) {
      if (Object.keys(rundetailsdata).length > 0) {
        const rundetailInfodataDetails = rundetailsdata.map(
          (rundetailInfo, rundetailInfoIndex) => {
            var transStatus = rundetailInfo.trans_status;
            var classstatus, trans_status;
            if (transStatus === "P") {
              trans_status = "Pending";
              classstatus = "gencus_trans_status Pending";
            } else if (transStatus === "O") {
              classstatus = "gencus_trans_status Ongoing";
              trans_status = "Ongoing";
            } else if (transStatus === "CO") {
              classstatus = "gencus_trans_status Completed";
              trans_status = "Completed";
            }
            var date = new Date(rundetailInfo.trans_startdate);
            var month = date.toLocaleString("default", { month: "short" });
            var dates =
              date.getDate() + ", " + month + " " + date.getFullYear();

            var date1 = new Date(rundetailInfo.trans_enddate);
            var month1 = date1.toLocaleString("default", { month: "short" });
            var dates1 =
              date1.getDate() + ", " + month1 + " " + date1.getFullYear();

            var service_img_txt =
              SearchImage + "services/" + rundetailInfo.services_background_img;
            return (
              <div
                className="genrun_leads_wrap gencus_trans_wrap"
                key={rundetailInfoIndex}
              >
                <div className="genrun_leads_inner_wrap">
                  <div className="img_title_tid_wrap">
                    <div className="genrun_leads_img">
                      <img src={service_img_txt} alt="" />
                    </div>
                    <div className="genrun_leads_title_tid">
                      <span className={classstatus}>{trans_status}</span>
                      <h2>
                        <Link
                          to={{
                            pathname: "/customer/runtrans-details",
                            state: { transId: rundetailInfo.trans_id }
                          }}
                        >
                          {rundetailInfo.services_title}
                        </Link>{" "}
                      </h2>

                      <p>
                        Transaction ID -{" "}
                        <span>
                          <Link
                            to={{
                              pathname: "/customer/runtrans-details",
                              state: { transId: rundetailInfo.trans_id }
                            }}
                          >
                            {rundetailInfo.trans_key}
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                  {transStatus === "P" && (
                    <div className="genrun_leads_avail">
                      {rundetailInfo.avail_genrun !== "" &&
                      rundetailInfo.avail_genrun > 0 ? (
                        <Link
                          to={{
                            pathname: "/customer/search_list",
                            state: {
                              serviceId: rundetailInfo.trans_service_id,
                              TransId: rundetailInfo.trans_id,
                              runserachlist: ""
                            }
                          }}
                        >
                          <h5>
                            List of GenRun available:{" "}
                            <span>{rundetailInfo.avail_genrun}</span>
                          </h5>
                        </Link>
                      ) : (
                        <h5>
                          List of GenRun available:{" "}
                          <span>{rundetailInfo.avail_genrun}</span>
                        </h5>
                      )}
                    </div>
                  )}
                  <div className="genrun_leads_date">
                    <p>
                      <b>Start :</b> {dates}
                    </p>
                    <p>
                      <b>End :</b> {dates1}
                      <span>
                        <br />
                        {getExpirydate(rundetailInfo.trans_enddate) === 1 &&
                        rundetailInfo.trans_status === "P"
                          ? "(Expired)"
                          : ""}
                      </span>
                    </p>
                  </div>
                  <div className="genrun_leads_price_btn">
                    <h2>
                      <span>
                        <i className="fa fa-usd" aria-hidden="true"></i>{" "}
                      </span>
                      {rundetailInfo.new_amount !== "" &&
                      rundetailInfo.new_amount !== null
                        ? rundetailInfo.new_amount
                        : rundetailInfo.trans_fee}
                    </h2>
                    <div className="genrun_leads_btn">
                      <Link
                        to={{
                          pathname:
                            "/customer/genrun/service/" +
                            rundetailInfo.trans_service_id,
                          state: { transId2: rundetailInfo.trans_id }
                        }}
                        className="btn btn_orange animate-btn2"
                        title="Duplicate"
                      >
                        Duplicate
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        );
        this.setState({ runleadlist: rundetailInfodataDetails });
      } else {
        this.setState({ runleadlist: "No records found" });
      }
    }
  }

  loadMore() {
    let page = parseInt(this.state.page) + 1;
    this.setState(
      { page: page },
      function() {
        this.loadruntransaction();
      }.bind(this)
    );
  }

  loadruntransaction() {
    if (this.state.page > 0) {
      this.setState({ moreloading: true });
    }
    this.props.getRunTransaction(
      cookie.load("UserAuthToken"),
      this.state.page,
      this.state.selectedvalue
    );
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <Header />
        <SecondaryHeader />
        <Profilebar />

        <div className="gencus-transaction-wrapper">
          <div className="container">
            <div>
              <div className="gen-table-wrapper">
                <div className="gen-table-header">
                  <h3>Your search history</h3>

                  <div className="gen-table-sort">
                    <div className="re_select">
                      <Select
                        value={
                          selectedOption
                            ? selectedOption
                            : { value: "P", label: "Pending" }
                        }
                        options={options}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="genrun-leads-wrapper gencus-trans-wrap">
                  <div className="genrun-leads-list-wrapper">
                    {this.state.runleadlist !== "" && (
                      <p>
                        Press the transaction ID to see your request
                        and give rating/review
                      </p>
                    )}
                    {this.state.runleadlist !== ""
                      ? this.state.runleadlist
                      : LoadingSec}

                    <div className="text-center mt25">
                      <a
                        href="javascript:;"
                        className="btn btn_orange animate-btn2"
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
    runtransaction: state.runtransaction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRunTransaction: (UserToken, page, filter_status) => {
      dispatch({ type: GET_RUNTRANSACTION, UserToken, page, filter_status });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Genruntranscation));
