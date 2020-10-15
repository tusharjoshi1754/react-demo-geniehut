/* eslint-disable */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GET_REVIEW } from "../../actions";
import {
  LoadingSec,
  getTimeFrmDate,
  LoadImage
} from "../Helpers/SettingHelper";
var Parser = require("html-react-parser");

class CustomerFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingDetails: "",
      ratingDetailLoading: true,
      loadMoreEnable: false,
      oldreview: ""
    };
  }
  componentDidMount() {
    const rparams = {
      userID: this.props.userID,
      page: 0
    };
    this.props.getReview(rparams);
  }
  componentWillReceiveProps(Props) {
    if (this.state.review !== Props.review) {
      if (Props.review[0].result_set.run.totalrun_reviews > 0) {
        let result = Props.review[0].result_set;
        const totalrecords = result.run.totalrun_reviews;
        const limit = 1;
        const loadMoreCount = totalrecords / limit;
        if (loadMoreCount >= this.state.page) {
          this.setState({ loadMoreEnable: true });
        } else {
          this.setState({ loadMoreEnable: false });
        }

        let newleads = "";
        if (this.state.oldreview !== "") {
          let oldreview = this.state.oldreview;
          newleads = oldreview.concat(result.run);
        } else {
          newleads = result.run;
        }

        this.setState(
          { review: newleads, ratingDetailLoading: false },
          function() {
            this.displayreviews();
          }
        );
      } else {
        this.setState({
          ratingDetails: "No Reviews and Ratings",
          ratingDetailLoading: false
        });
      }
    }
  }
  displayreviews() {
    if (
      this.state.review !== null &&
      this.state.review.run_reviews !== "" &&
      typeof this.state.review.run_reviews != "undefined"
    ) {
      const reviewsDetails = this.state.review.run_reviews.map(
        (item, index) => {
          return (
            <div className="genrunList-box" key={index}>
              <div className="genrunList-left">
                <div className="genrunList-left-img">
                  <img src={LoadImage(item.custImage)} alt="" />
                </div>
                <div className="genrunList-left-content">
                  <h3>{item.user_name}</h3>
                  <div className="gl-rate-date">
                    <div className="gl-rate">
                      <span>
                        {item.review_points}{" "}
                        <i
                          className={
                            item.review_points > 0
                              ? "fa fa-star"
                              : "fa fa-star-o"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                    <div className="gl-date">
                      <span>{getTimeFrmDate(item.review_created)}</span>
                      <span>{getTimeFrmDate(item.review_created, 2)}</span>
                    </div>
                  </div>
                  <div className="gl-review">
                    <p>{Parser(item.review_desc)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      );
      this.setState({ ratingDetails: reviewsDetails });
    }
  }
  loadMore() {
    let page = parseInt(this.state.page) + 1;
    this.setState(
      { page: page },
      function() {
        const rparams = {
          userID: this.props.userID,
          page: page
        };
        this.props.getReview(rparams);
      }.bind(this)
    );
  }
  render() {
    return (
      <div>
        <div className="genListPopup-wrapper customerFeedback">
          <div className="genrun-leads-wrapper">
            <div className="genrun-leads-info-wrapper">
              <div className="genrun_leads_info_wrap">
                <div className="genLead-flex">
                  <div className="genLead-flex-left">
                    <div className="genrunList-section">
                      {this.state.ratingDetailLoading === true
                        ? LoadingSec
                        : ""}
                      {this.state.ratingDetails}
                      {this.state.ratingDetails === "" &&
                        this.state.ratingDetailLoading === false && (
                          <div className="genrunList-box">
                            <div className="genrunList-center">
                              No records found.
                            </div>
                          </div>
                        )}
                    </div>
                    {this.state.loadMoreEnable === true && (
                      <div className="cf_btn_wrapper">
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

                        <a
                          href="javascript:void(0);"
                          className="btn btn_blue animate-btn2 cf_btn"
                        >
                          Load More
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    review: state.review
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReview: formPayload => {
      dispatch({ type: GET_REVIEW, formPayload });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(CustomerFeedback));
