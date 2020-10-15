import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../../common/images/header/dashboard.png";
import IcoMyAccount from "../../common/images/header/ico_profile1.png";
import Wallet from "../../common/images/header/wallet.png";
import Home from "../../common/images/header/home.png";
import SearchHistory from "../../common/images/header/search_history.png";
import cookie from "react-cookies";

class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: window.location.pathname,
      activeprofile: "",
      modalHowGenWorks: false,
      notificationcount: 0,
      gcnotify: 0,
      gpnotify: 0,
      customer_notify: "",
      genrun_notify: "",
      genpro_notify: "",
      loginclass: "",
      signupclass: "",
      activesearch: ""
    };
  }

  componentDidMount() {
    if (
      this.state.pathname === "/edit-general-info" ||
      this.state.pathname === "/edit-gen-run" ||
      this.state.pathname === "/genrun-my-services" ||
      this.state.pathname === "/genrun-customerleads" ||
      this.state.pathname === "/edit-gen-pro" ||
      this.state.pathname === "/genpro-my-services" ||
      this.state.pathname === "/genpro-customer-leads" ||
      this.state.pathname === "/genpro-jobs"
    ) {
      this.setState({ activeprofile: "active" });
    } else if (this.state.pathname === "/wallet") {
      this.setState({ activewallet: "active" });
    } else if (this.state.pathname === "/reviews") {
      this.setState({ activereview: "active" });
    } else if (
      this.state.pathname === "/dashboard" ||
      this.state.pathname === "/genpro-dashboard" ||
      this.state.pathname === "/genagent-dashboard" ||
      this.state.pathname === "/genrun-dashboard"
    ) {
      this.setState({ activedashboard: "active" });
    } else if (this.state.pathname === "/customer/genruntranscation-list") {
      this.setState({ activesearch: "active" });
    }

    if (this.state.pathname === "/login") {
      this.setState({ loginclass: "navbar-btn nb-login loginactive" });
    } else if (this.state.pathname === "/signup") {
      this.setState({
        signupclass: "navbar-btn nb-login nblpl-0 signupactive"
      });
    }
  }

  componentWillReceiveProps(NextProps) {}

  render() {
    return (
      <div>
        {cookie.load("UserAuthToken") && (
          <div className="secondary-navbar xs-hide">
            <div className="container">
              <div className="secondary-navbar-wrapper">
                <ul>
                  {!cookie.load("UserAuthToken") && (
                    <li className={this.state.activehome}>
                      <a href="/">
                        <span>
                          <img src={Home} alt="Home" /> Home
                        </span>
                      </a>
                    </li>
                  )}
                  <li className={this.state.activeprofile}>
                    <a href="/edit-general-info">
                      <span>
                        <img src={IcoMyAccount} alt="Profile" /> Profile
                      </span>
                    </a>
                  </li>
                  <li className={this.state.activewallet}>
                    <a href="/wallet">
                      <span>
                        <img src={Wallet} alt="Wallet" /> Wallet
                      </span>
                    </a>
                  </li>
                  <li className={this.state.activedashboard}><a href="/dashboard"><span><img src={Dashboard} alt="Dashboard" /> Search History: Genpro</span></a></li>
                  <li className={this.state.activesearch}>
                    <a href="/customer/genruntranscation-list">
                      <span>
                        <img src={SearchHistory} alt="searchhistory" /> Search History: GenRun
                      </span>
                    </a>
                  </li>
                  {/*<li className={this.state.activereview}><a href="/reviews"><span><img src={Review} alt="Review" /> Review</span></a></li> */}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(SecondaryHeader));
