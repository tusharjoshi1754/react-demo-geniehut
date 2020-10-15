/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ModalPopup from "../Layout/ModalPopup";
import HowGenWorks from "../Layout/HowGenWorks";
import Logo from "../../common/images/header/logo.png";
import MenuToggle from "../../common/images/header/menu-toggle.png";
import MenuClose from "../../common/images/header/menu-close.png";
import UserAvatar from "../../common/images/header/avatar.PNG";
import Notification from "../../common/images/header/bell.PNG";
import UserLoggedIn from "../../common/images/header/user_loggedin.png";
import Dashboard from "../../common/images/header/dashboard.png";
import IcoMyAccount from "../../common/images/header/ico_profile1.png";
import Wallet from "../../common/images/header/wallet.png";
import Home from "../../common/images/header/home.png";
import Review from "../../common/images/header/review.png";
import SearchHistory from "../../common/images/header/search_history.png";
import cookie from "react-cookies";
import $ from "jquery";
import { staticUrl, genagentUrl, staticrunUrl } from "../Config/Config";
import { Capitalize } from "../Helpers/SettingHelper";
import Icogenagent from "../../common/images/ico_genagent.png";
import Icogenpro from "../../common/images/ico_genpro.png";
import Icogenredeem from "../../common/images/ico_genredeem.png";
import Icogenrun from "../../common/images/ico_genrun.png";
import { GET_USERPROFILE, GET_HEADERNOTIFICATION } from "../../actions";
import Parser from "html-react-parser";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: window.location.pathname,
      UserAuthToken:
        this.props.UserAuthToken !== "" &&
        typeof this.props.UserAuthToken !== "undefined"
          ? this.props.UserAuthToken
          : cookie.load("UserAuthToken"),
      activeprofile: "",
      modalHowGenWorks: false,
      modallokking: false,
      notificationcount: 0,
      gcnotify: 0,
      gpnotify: 0,
      customer_notify: "",
      genrun_notify: "",
      genpro_notify: "",
      loginclass: "",
      signupclass: "",
      UserPoints: cookie.load("UserPoints"),
      countryname: cookie.load("countryname"),
      UserMobile: cookie.load("UserMobile"),
      CountryCode: cookie.load("CountryCode"),
      UserFullname:
        this.props.UserFullname !== "" &&
        typeof this.props.UserFullname !== "undefined"
          ? this.props.UserFullname
          : cookie.load("UserFullname"),
      staticproUrl: staticUrl,
      staticrunUrl: staticrunUrl,
      genagentUrl: genagentUrl,
      totalNotify: 0
    };
    this.toggleHowGenWorks = this.toggleHowGenWorks.bind(this);
    this.toggleLooking = this.toggleLooking.bind(this);
  }

  toggleHowGenWorks() {
    this.setState(prevState => ({
      modalHowGenWorks: !prevState.modalHowGenWorks
    }));
  }
  toggleLooking() {
    this.setState(prevState => ({
      toggleLooking: !prevState.toggleLooking
    }));
  }

  triggerpop() {
    $(".usericon").addClass("open");
  }

  componentDidMount() {
    // $("html, body").animate({scrollTop: $(".sdmenu_wrapper").offset().top-101}, 1000);

    if(this.state.pathname == '/otp'){
      $("html, body").animate({scrollTop: $(".container").offset().top-101}, 1000);
    }
    let z =
      parseInt(cookie.load("Gcnotifycount")) + parseInt(cookie.load("GPtotal"));
    this.setState({ notificationcount: z });
    if (
      this.state.UserAuthToken !== "" &&
      typeof this.state.UserAuthToken !== "undefined"
    ) {
      //this.props.getUserProfile(this.state.UserAuthToken);
      //this.props.getAllNotification(this.state.UserAuthToken);
    }
    this.props.getHeaderNotification(this.state.UserAuthToken, 0);
    if (this.state.pathname === "/edit-general-info") {
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
    }

    if (this.state.pathname === "/login") {
      this.setState({ loginclass: "navbar-btn nb-login loginactive" });
    } else if (this.state.pathname === "/signup") {
      this.setState({
        signupclass: "navbar-btn nb-login nblpl-0 signupactive"
      });
    }

    /* profile tab toggle */
    $(document).ready(function() {
      $('a[class*="-popup-ancher"]').click(function() {
        if (
          $(this)
            .parent("li")
            .find(".usermenu-popup-wrapper")
            .hasClass("open")
        ) {
          $(this)
            .parent("li")
            .find(".usermenu-popup-wrapper")
            .removeClass("open");
          $(this)
            .parents("header")
            .removeClass("open-overlay");
          $(".huserpop_overlay").removeClass("open");
        } else {
          $(this)
            .parents("ul.navbar")
            .children("li")
            .find(".usermenu-popup-wrapper")
            .removeClass("open");
          $(this)
            .parent("li")
            .find(".usermenu-popup-wrapper")
            .toggleClass("open");
          $(this)
            .parents("header")
            .addClass("open-overlay");
          $(".huserpop_overlay").addClass("open");
        }
      });

      $(".huserpop_overlay").click(function() {
        $(this).removeClass("open");
        //$(this).parents("header").removeClass("open-overlay");
        //$(this).parents(".usermenu-popup-wrapper").removeClass("open");
        $(".usermenu-popup-wrapper").removeClass("open");
      });

      $(".toggle-menu-wrap a.toggle-menu").click(function() {
        $(this)
          .parents("header")
          .removeClass("open-overlay");
      });
    });
    /* profile tab toggle */

    /* profile Responsive toggle */

    $(document).ready(function() {
      $("a.toggle-menu").click(function() {
        $("header").toggleClass("open");
        $(this)
          .parents("nav")
          .find(".usermenu-popup-wrapper")
          .removeClass("open");
        $(this)
          .parents("header")
          .find(".huserpop_overlay")
          .removeClass("open");
      });
      $(".header-navbar > .toggle-menu-wrap a.toggle-menu").click(function() {
        $("body").addClass("open-overlay");
      });
      $(".header-navbar > nav > .toggle-menu-wrap a.toggle-menu").click(
        function() {
          $("body").removeClass("open-overlay");
        }
      );
    });

    /* profile Responsive toggle */

    /* Gen_filter_list */

    $(document).ready(function() {
      $("button.Gen_filter_Btn").click(function() {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        } else {
          $(this)
            .parents(".Gen_filter_list")
            .find("button")
            .removeClass("active");
          $(this).toggleClass("active");
        }
      });
      $("button.ddo_filter_btn").click(function() {
        {
          $(this)
            .parents(".gen-table-wrapper")
            .find("button.Gen_filter_Btn")
            .removeClass("active");
        }
      });
    });

    /* Gen_filter_list */

    /* Home Accordian Wrap */

    $(document).ready(function() {
      $(".accordian_wrap button").click(function() {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        } else {
          $(this)
            .parents(".service_info")
            .find("button")
            .removeClass("active");
          $(this).toggleClass("active");
        }
      });
    });

    /* Home Accordian Wrap */

    /* Animate and Gotop */

    $(document).ready(function() {
      $(".gotop a").click(function() {
        $("html,body").animate({ scrollTop: 0 }, 800);
        return false;
      });

      $(".scrollTodiv").click(function() {
        var href = $(this).attr("href");
        var topOffset = $(href).offset().top;
        $("html,body").animate({ scrollTop: topOffset }, 800);
      });

      $(".sdhmenu_mtabtrigger.active").click(function() {
        $(".sdhmenu_content").slideToggle();
        $(this).removeClass("active");
      });
      $(".navbar li a").click(function() {
        $("body.open-overlay").removeClass("open-overlay");
      });
    });

    $(document).ready(function() {
      var s = $(".gotop");
      //var pos = s.position();
      $(window).scroll(function() {
        var windowpos = $(window).scrollTop();
        if (windowpos > 0) {
          s.removeClass("top-class-op");
          s.addClass("top-class");
        } else {
          s.removeClass("top-class");
          s.addClass("top-class-op");
        }
      });
    });

    /* Animate and Gotop */

    /* Mobile Navbar */

    $(document).click(function(e) {
      if (!$(e.target).is("nav, .primary-navbar * ")) {
        if ($("nav").is(":visible")) {
          $("header").removeClass("open");
          $("body").removeClass("open-overlay");
          $(".huserpop_overlay").removeClass("open");
          $(".usermenu-popup-wrapper").removeClass("open");
        }
      }
    });

    /* Mobile Navbar */

    /* for notification */
  }

  componentWillReceiveProps(NextProps) {
    if (
      NextProps.userPoints !== "" &&
      typeof NextProps.userPoints !== "undefined" &&
      NextProps.userPoints !== this.state.user_points
    ) {
      this.setState({ UserPoints: NextProps.userPoints });
    }

    if (NextProps.headernotification !== this.props.headernotification) {
      //if(NextProps.notification!=='undefined' && NextProps.notification!==null){
      if (Object.keys(NextProps.headernotification).length > 0) {
        if (NextProps.headernotification[0].status === "success") {
          if (
            NextProps.headernotification[0].result_set !== "" &&
            NextProps.headernotification[0].result_set !== null
          ) {
            this.setState(
              {
                customer_notify: NextProps.headernotification[0].result_set,
                totalNotify: NextProps.headernotification[0].unreadtotal
              },
              function() {
                this.getcustomernotify();
              }
            );
          }
        } else if (
          NextProps.headernotification[0].status === "authenticfailed"
        ) {
          //this.props.history.push('/logout');
        }
      }
    }

    if (
      NextProps.custTotal !== "" &&
      typeof NextProps.custTotal !== "undefined" &&
      NextProps.custTotal !== this.state.totalNotify
    ) {
      this.setState(
        { customer_notify: "", totalNotify: NextProps.custTotal },
        function() {
          this.getcustomernotify();
        }
      );
    }
  }

  getcustomernotify() {
    var notifyArr = this.state.customer_notify;
    if (notifyArr !== "undefined" && notifyArr != null && notifyArr != "") {
      if (Object.keys(notifyArr).length > 0) {
        let notificationDetails = notifyArr.map(
          (notification, notificationIndex) => {
            const content = notification.content;
            if (notificationIndex <= 10) {
              return (
                <li key={notification.notification_id}>
                  <a href="/notification">
                    <span>
                      {content !== null
                        ? Parser(content.substring(0, 100))
                        : ""}
                    </span>
                  </a>
                  <span className="notify-date-time">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    {notification.notify_date}
                  </span>
                </li>
              );
            }
          }
        );
        this.setState({ notificationlist: notificationDetails });
      } else {
        this.setState({ notificationlist: "" });
      }
    } else {
      this.setState({ notificationlist: "" });
    }
  }

  render() {
    if(this.state.UserPoints!= ''){
      var upoints = Math.floor(this.state.UserPoints);  
    }
    return (
      <div>
        <header className={cookie.load("UserAuthToken") ? "loggedin" : ""}>
          <div className="header_in">
            <div className="primary-navbar">
              <div className="container">
                <div className="header-wrapper">
                  <div className="header-logo">
                    <a href="/" title="GenieHut">
                      <img src={Logo} alt="GenieHut" />
                    </a>
                  </div>
                  <div className="header-navbar">
                    <div className="country-menu-wrap">
                      <p>
                        <span className="h-Country">Country:</span>
                        <span>Singapore</span>
                      </p>
                    </div>
                    <div className="toggle-menu-wrap">
                      <a href="javascript:void(0);" className="toggle-menu">
                        <img src={MenuToggle} alt="Menu Toggle" />
                      </a>
                    </div>
                    <nav>
                      <div className="toggle-menu-wrap">
                        <img
                          src={Logo}
                          alt="GenieHut"
                          className="responsive-logo"
                        />
                        <a href="javascript:void(0);" className="toggle-menu">
                          <img src={MenuClose} alt="Menu Close" />
                        </a>
                      </div>
                      {!cookie.load("UserAuthToken") && (
                        <div className="menu-wrap">
                          <ul className="navbar">
                            <li>
                              <a
                                href="javascript:void(0);"
                                onClick={e => {
                                  e.preventDefault();
                                  this.toggleHowGenWorks();
                                }}
                              >
                                How it Works
                              </a>
                            </li>
                            <li>
                              <Link to={"/about-us"} rel="noopener noreferrer">
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link to={"/articles"} rel="noopener noreferrer">
                                Articles
                              </Link>
                            </li>
                            <li
                              className={
                                this.state.loginclass
                                  ? this.state.loginclass
                                  : "navbar-btn nb-login"
                              }
                            >
                              <a
                                href="/login"
                                className="btn animate-btn2 btn_trans"
                              >
                                Login
                              </a>
                            </li>
                            <li
                              className={
                                this.state.signupclass
                                  ? this.state.signupclass
                                  : "navbar-btn nb-login nblpl-0"
                              }
                            >
                              <a
                                href="/signup"
                                className="btn animate-btn2 btn_trans"
                              >
                                Sign Up
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                      {cookie.load("UserAuthToken") && (
                        <div className="user-menu-wrap">
                          <ul className="navbar">
                            <li className="welcome-user">
                              <span>
                                <a
                                  href="#"
                                  onClick={e => {
                                    e.preventDefault();
                                    this.toggleLooking();
                                  }}
                                >
                                  Are you looking for?
                                </a>
                              </span>
                            </li>
                            <li className="welcome-user">
                              <span>
                                Welcome{" "}
                                {this.state.UserFullname
                                  ? Capitalize(this.state.UserFullname)
                                  : ""}
                                !
                              </span>
                            </li>
                            <li className="user-popup">
                              <a
                                href="javascript:void(0);"
                                className="user-popup-ancher"
                              >
                                <img src={UserAvatar} alt="Avatar" />
                              </a>
                              <div className="usermenu-popup-wrapper usericon">
                                <div className="usermenu-popup-inner-wrapper">
                                  <div className="usermenu-profile">
                                    <div className="usermenu-profile-img">
                                      <img src={UserLoggedIn} alt="User" />
                                    </div>
                                    <div className="usermenu-profile-text">
                                      <h4>
                                        {this.state.UserFullname
                                          ? Capitalize(this.state.UserFullname)
                                          : ""}
                                      </h4>
                                      <p>
                                        <a href="javascript:void(0);">
                                          {this.state.CountryCode
                                            ? this.state.CountryCode
                                            : ""}{" "}
                                          {this.state.UserMobile
                                            ? this.state.UserMobile
                                            : ""}
                                        </a>
                                      </p>
                                      <p>
                                        {this.state.countryname !== "undefined"
                                          ? this.state.countryname
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="usermenu-detail">
                                    <div className="usermenu-detail-list">
                                      <ul>
                                        <li>
                                          <span>
                                            <a href="/edit-general-info">
                                              Profile
                                            </a>
                                          </span>
                                        </li>

                                        <li>
                                          <span>
                                            <a href="/wallet">Wallet</a>
                                          </span>{" "}
                                          <span className="usermenu-point">
                                            {this.state.UserPoints
                                              ? upoints +
                                                " GH Points"
                                              : ""}
                                          </span>
                                        </li>
                                        <li>
                                          <span>
                                            <a href="/dashboard">Dashboard</a>
                                          </span>
                                        </li>
                                        <li>
                                          <span>
                                            <a href="/customer/genruntranscation-list">
                                             Search History: GenRun
                                            </a>
                                          </span>
                                        </li>
                                        <li>
                                          <span>
                                            <a href="/changepassword">
                                              Change Password
                                            </a>
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="usermenu-footer">
                                    <a
                                      href="/logout"
                                      className="btn btn_orange btn_minwid animate-btn2"
                                    >
                                      <i
                                        className="fa fa-power-off"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      Logout
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="bell-popup">
                              <a
                                href="javascript:void(0);"
                                className="bell-popup-ancher"
                              >
                                <img src={Notification} alt="Notifictaion" />
                                <span id="notification_cnt">
                                  {this.state.totalNotify}
                                </span>
                              </a>
                              <div className="usermenu-popup-wrapper">
                                <div className="usermenu-popup-inner-wrapper">
                                  <div className="usermenu-header">
                                    <h3>Notification</h3>
                                  </div>
                                  <div className="usermenu-detail">
                                    <div className="notification-list">
                                      <ul>
                                        {this.state.notificationlist !== ""
                                          ? this.state.notificationlist
                                          : "No records found!"}
                                      </ul>
                                    </div>
                                  </div>
                                  {this.state.notificationlist && (
                                    <div className="usermenu-footer">
                                      <a
                                        href="/Notification"
                                        className="btn btn_orange btn_minwid animate-btn2"
                                      >
                                        View All
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div className="secondary-navbar xs-visible">
                            <div className="secondary-navbar-wrapper">
                              <ul>
                                {!cookie.load("UserAuthToken") && (
                                  <li>
                                    <a href="/">
                                      <span>
                                        <img src={Home} alt="Home" /> Home
                                      </span>
                                    </a>
                                  </li>
                                )}
                                <li>
                                  <a href="/edit-general-info">
                                    <span>
                                      <img src={IcoMyAccount} alt="Profile" />{" "}
                                      Profile
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/wallet">
                                    <span>
                                      <img src={Wallet} alt="Wallet" /> Wallet
                                    </span>
                                  </a>
                                </li>
                                <li><a href="/#"><span><img src={Dashboard} alt="Dashboard" /> Dashboard</span></a></li>
                                <li>
                                  <a href="/customer/genruntranscation-list">
                                    <span>
                                      <img
                                        src={SearchHistory}
                                        alt="Dashboard"
                                      />{" "}
                                       Search History: GenRun
                                    </span>
                                  </a>
                                </li>
                                {/*<li>
                                  <a href="/reviews">
                                    <span>
                                      <img src={Review} alt="Review" /> Review
                                    </span>
                                  </a>
                                </li>*/}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="huserpop_overlay"></div>
        </header>

        <ModalPopup
          modal={this.state.modalHowGenWorks}
          toggle={this.toggleHowGenWorks}
          className="modal-width HowGenWorks_popup"
          title="How Geniehut works?"
        >
          <HowGenWorks />
        </ModalPopup>

        <ModalPopup
          modal={this.state.toggleLooking}
          toggle={this.toggleLooking}
          className="modal-width HowGenWorks_popup aylf_popup"
          title="Are you looking for?"
        >
          <div className="ourpr_sec">
            <div className="ourpr_rw">
              <div className="ourpr_col">
                <Link to={"/genpro"} title="GenPro">
                  <i className="ourpr_ico">
                    <img src={Icogenpro} alt="" />
                  </i>
                  <div className="ourpr_info">
                    <h3>GenPro</h3>
                    <p>Connect to right service providers</p>
                  </div>
                </Link>
              </div>
              <div className="ourpr_col">
                <Link to={"/genrun"} title="GenRun">
                  <i className="ourpr_ico">
                    <img src={Icogenrun} alt="" />
                  </i>
                  <div className="ourpr_info">
                    <h3>GenRun</h3>
                    <p>Connect to part-timers to run errands</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="ourpr_rw">
              <div className="ourpr_col">
                <a
                  href={this.state.genagentUrl}
                  target="_blank"
                  title="GenProperty"
                  rel="noopener noreferrer"
                >
                  <i className="ourpr_ico">
                    <img src={Icogenagent} alt="" />
                  </i>
                  <div className="ourpr_info">
                    <h3>GenProperty</h3>
                    <p>Connect to right property at first search</p>
                  </div>
                </a>
              </div>
              <div className="ourpr_col">
                <Link to={"#"} title="GenAds">
                  <i className="ourpr_ico">
                    <img src={Icogenredeem} alt="" />
                  </i>
                  <div className="ourpr_info">
                    <h3>GenAds</h3>
                    <p>Use GH points to redeem items</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ModalPopup>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    headernotification: state.headernotification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHeaderNotification: (usertoken, Page) => {
      dispatch({ type: GET_HEADERNOTIFICATION, usertoken, Page });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Header));
