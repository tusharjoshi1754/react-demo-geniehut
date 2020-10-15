import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { Fade, Flip } from "react-reveal";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ModalPopup from "../Layout/ModalPopup";
import InfoContent from "../Layout/InfoContent";
import {
  genprodashboardurl,
  generaldashboardurl,
  genrundashboardurl,
  appName,
  staticUrl,
  genagentUrl,
  staticrunUrl
} from "../Config/Config";
import Icogenagent from "../../common/images/ico_genagent.png";
import Icogenpro from "../../common/images/ico_genpro.png";
import Icogenredeem from "../../common/images/ico_genredeem.png";
import Icogenrun from "../../common/images/ico_genrun.png";
import SeviceImg1 from "../../common/images/service_img1.png";
import SeviceImg2 from "../../common/images/service_img2.png";
import SeviceImg3 from "../../common/images/service_img3.png";
import SeviceImg4 from "../../common/images/service_img4.png";
import { lang } from "../Helpers/lang";

import cookie from "react-cookies";
import { connect } from "react-redux";

import { GET_HOMEBLOCKCONTENT } from "../../actions";
var Parser = require("html-react-parser");
const hrefLink = "#";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoRunType: "",

      collapse1: false,
      collapse2: false,
      staticblacks: [],
      findhomecontent: "",
      connectcontent: "",
      whyuscontent: "",
      ghpointscontent: "",
      earnghpoints: "",
      useghpoints: "",
      beyourcontent: "",
      prourl: "",
      runurl: "",
      generalurl: "",
      staticproUrl: staticUrl,
      staticrunUrl: staticrunUrl,
      genagentUrl: genagentUrl
    };

    this.GHPointsEtoggle = this.GHPointsEtoggle.bind(this);
    this.GHPointsUtoggle = this.GHPointsUtoggle.bind(this);
    this.props.getHomeblockContent("all");
  }

  getunsettoken(user_token) {
    var qs = require("qs");
    var postObject = {
      app_name: appName,
      user_token: user_token
    };
    this.props.getUnsetToken(qs.stringify(postObject));
  }

  GHPointsEtoggle() {
    this.setState(state => ({ collapse1: !state.collapse1, collapse2: false }));
  }

  GHPointsUtoggle() {
    this.setState(state => ({ collapse2: !state.collapse2, collapse1: false }));
  }

  componentDidMount() {
    window.addEventListener("load", this.toggleGenagentInfo);
    if (cookie.load("UserAuthToken")) {
      this.setState({
        prourl: genprodashboardurl + cookie.load("UserAuthToken")
      });
      this.setState({
        generalurl: generaldashboardurl + cookie.load("UserAuthToken")
      });
      this.setState({
        runurl: genrundashboardurl + cookie.load("UserAuthToken")
      });
    }
  }
  toggleGenagentInfo() {
    //console.log('asdasd')
  }
  componentWillReceiveProps(Props) {
    if (Props.staticblack !== this.state.staticblacks) {
      var findHome = "";
      var connectcontent = "";
      var whyus = "";
      var ghpointscontent = "";
      var earnghpoints = "";
      var useghpoints = "";
      var beyourcontent = "";
      if (Props.staticblack.length !== undefined) {
        Props.staticblack.map((data, index) => {
          if (data.staticblocks_slug === "homepage-find-content-mq") {
            findHome = data.staticblocks_description;
            //return '';
          } else if (data.staticblocks_slug === "homepage-connect-content-mq") {
            connectcontent = data.staticblocks_description;
            //return '';
          } else if (data.staticblocks_slug === "homepage-whyus-content-mq") {
            whyus = data.staticblocks_description;
            // return '';
          } else if (
            data.staticblocks_slug === "gh-points-for-the-community-homepage-mq"
          ) {
            ghpointscontent = data.staticblocks_description;
            // return '';
          } else if (data.staticblocks_slug === "earn-gh-points-mq") {
            earnghpoints = data.staticblocks_description;
            // return '';
          } else if (data.staticblocks_slug === "use-gh-points-mq") {
            useghpoints = data.staticblocks_description;
            //return '';
          } else if (data.staticblocks_slug === "homepage-be-you-own-boss-mq") {
            beyourcontent = data.staticblocks_description;
            //return '';
          }
          return true;
        });
      }
      findHome = findHome !== "" ? Parser(findHome) : findHome;
      connectcontent =
        connectcontent !== "" ? Parser(connectcontent) : connectcontent;
      whyus = whyus !== "" ? Parser(whyus) : whyus;
      ghpointscontent =
        ghpointscontent !== "" ? Parser(ghpointscontent) : ghpointscontent;
      earnghpoints = earnghpoints !== "" ? Parser(earnghpoints) : earnghpoints;
      useghpoints = useghpoints !== "" ? Parser(useghpoints) : useghpoints;
      beyourcontent =
        beyourcontent !== "" ? Parser(beyourcontent) : beyourcontent;
      this.setState({
        staticblacks: Props.staticblack,
        findhomecontent: findHome,
        connectcontent: connectcontent,
        whyuscontent: whyus,
        ghpointscontent: ghpointscontent,
        earnghpoints: earnghpoints,
        useghpoints: useghpoints,
        beyourcontent: beyourcontent
      });
    }
  }
  informations = (e, infoRunType) => {
    e.preventDefault();
    this.setState(
      {
        infoRunType: infoRunType,
        popupType: 1,
        popuptitle: lang.info[infoRunType].title
      },
      function() {
        this.toggleInfo();
      }
    );
  };

  toggleInfo = toggleInfo => {
    this.setState(prevState => ({
      modalEnable: !prevState.modalEnable
    }));
  };

  render() {
    return (
      <div className="Homepage">
        <Header />
        <div className="home_bansec">
          <div className="container">
            <div className="hbantt_sec text-center">
              <Flip top delay={300}>
                <h1 className="title1">
                  Find the best Services for your needs
                </h1>
              </Flip>
              <Flip top delay={500}>
                <p>
                  Be rewarded by being part of the Geniehut’s community.
                  <a
                    href={
                      hrefLink
                    } /*onClick={ e => this.informations(e, 'how_geniehut_works_video') }*/
                  >
                    {" "}
                    How Geniehut works?
                  </a>
                </p>
              </Flip>
            </div>
            <div className="ourpr_sec">
              <Flip top delay={700}>
                <h2 className="title2 text-center">Our Services</h2>
              </Flip>
              <Fade delay={800}>
                <div className="ourpr_rw">
                  <div className="ourpr_col">
                    {/*<a href={this.state.prourl?this.state.prourl:this.state.staticproUrl} target="_blank"  title="GenPro" rel="noopener noreferrer">
                                          <i className="ourpr_ico">
                                              <img src={Icogenpro} alt="" />
                                          </i>
                                          <div className="ourpr_info">
                                              <h3>GenPro</h3>
                                              <p>Connect to right service providers</p>
                                              <span className="service-alterlink">
                                              How <u onClick={ e => this.informations(e, 'pro') }>GenPro</u> works?
                                              </span>
                                          </div>
                                      </a>*/}
                    <Link to={"/genpro"} title="GenPro">
                      <i className="ourpr_ico">
                        <img src={Icogenpro} alt="" />
                      </i>
                      <div className="ourpr_info">
                        <h3>GenPro</h3>
                        <p>Connect to right service providers</p>
                        <span className="service-alterlink">
                          How{" "}
                          <u onClick={e => this.informations(e, "pro")}>
                            GenPro
                          </u>{" "}
                          works?
                        </span>
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
                        <span className="service-alterlink">
                          How{" "}
                          <u onClick={e => this.informations(e, "run")}>
                            GenRun
                          </u>{" "}
                          works?
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Fade>
              <Fade delay={900}>
                <div className="ourpr_rw">
                  <div className="ourpr_col">
                    <Link to={"#"} title="GenProperty">
                      <i className="ourpr_ico">
                        <img src={Icogenagent} alt="" />
                      </i>
                      <div className="ourpr_info">
                        <h3>GenProperty</h3>
                        <p>Connect to right property at first search</p>
                        <span className="service-alterlink">
                          How{" "}
                          <u onClick={e => this.informations(e, "property")}>
                            GenProperty
                          </u>{" "}
                          works?
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="ourpr_col">
                    <Link to={"#"} title="GenAds">
                      <i className="ourpr_ico">
                        <img src={Icogenredeem} alt="" />
                      </i>
                      <div className="ourpr_info">
                        <h3>GenAds</h3>
                        <p>Use GH points to redeem items</p>
                        <span className="service-alterlink">
                          How{" "}
                          <u onClick={e => this.informations(e, "ads")}>
                            GenAds
                          </u>{" "}
                          works?
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <Fade delay={1000}>
            <div className="banscr_down">
              <p>See,How GH points work?</p>
              <a
                href="#service_1"
                className="scrollTodiv"
                title="See,How GH points work?"
              >
                <i className="fa fa-angle-down"></i>
              </a>
            </div>
          </Fade>
        </div>

        <div className="service_sec">
          <div
            className="service_rw service_darkbg service_bluebg1"
            id="service_1"
          >
            <div className="container">
              <Fade>
                <div className="service_img">
                  <img
                    src={SeviceImg1}
                    alt="Earn GH points and Enjoy the GH service"
                  />
                </div>
              </Fade>

              <Fade>
                <div className="service_info">
                  {this.state.connectcontent}
                  {!cookie.load("UserAuthToken") && (
                    <a href="/signup" className="btn animate-btn2 btn_white">
                      Register
                    </a>
                  )}
                </div>
              </Fade>
            </div>
            <a
              href="#service_2"
              className="scrollTodiv"
              title="See,How GH points work?"
            >
              <i className="fa fa-angle-down"></i>
            </a>
          </div>

          <div id="service_2" className="service_rw">
            <div className="container">
              <Fade>
                <div className="service_img">
                  <img
                    src={SeviceImg2}
                    alt="Be your own boss. Choose your GH service"
                  />
                </div>
              </Fade>
              <Fade>
                <div className="service_info">
                  {this.state.whyuscontent}

                  {!cookie.load("UserAuthToken") && (
                    <a
                      href="/signup"
                      className="btn animate-btn2 btn_trans_blue"
                    >
                      Sign Up
                    </a>
                  )}
                </div>
              </Fade>
            </div>
            <a
              href="#service_3"
              className="scrollTodiv"
              title="See,How GH points work?"
            >
              <i className="fa fa-angle-down"></i>
            </a>
          </div>

          <div
            id="service_3"
            className="service_rw service_darkbg service_bluebg2"
          >
            <div className="container">
              <Fade>
                <div className="service_img">
                  <img src={SeviceImg3} alt="Hire the best! Pay next!!" />
                </div>
              </Fade>
              <Fade>
                <div className="service_info">
                  {this.state.ghpointscontent}
                  <div className="accordian_wrap">
                    <Button color="primary" onClick={this.GHPointsEtoggle}>
                      Earn GH points{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>{" "}
                    </Button>
                    <Collapse isOpen={this.state.collapse1}>
                      <Card>
                        <CardBody>{this.state.earnghpoints}</CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <div className="accordian_wrap">
                    <Button color="primary" onClick={this.GHPointsUtoggle}>
                      Use GH points{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Button>
                    <Collapse isOpen={this.state.collapse2}>
                      <Card>
                        <CardBody>{this.state.useghpoints}</CardBody>
                      </Card>
                    </Collapse>
                  </div>

                  <button
                    type="submit"
                    className="btn animate-btn2 btn_white btn_wdc"
                    onClick={e => this.informations(e, "point_summary")}
                  >
                    <span> GH points summary</span>
                  </button>
                </div>
              </Fade>
            </div>
            <a
              href="#service_4"
              className="scrollTodiv"
              title="See,How GH points work?"
            >
              <i className="fa fa-angle-down"></i>
            </a>
          </div>

          <div id="service_4" className="service_rw">
            <div className="container">
              <Fade>
                <div className="service_img">
                  <img src={SeviceImg4} alt="Buy GH Points" />
                </div>
              </Fade>
              <Fade>
                <div className="service_info">
                  {this.state.beyourcontent}
                  {!cookie.load("UserAuthToken") && (
                    <a
                      href="/signup"
                      className="btn animate-btn2 btn_trans_blue"
                    >
                      Sign Up
                    </a>
                  )}
                </div>
              </Fade>
            </div>
          </div>
        </div>

        <Footer />
        <ModalPopup
          modal={this.state.modalEnable}
          toggle={this.toggleInfo}
          className={
            this.state.infoRunType === "how_geniehut_works_video"
              ? "modal-width HowGenWorksVideo_popup"
              : "modal-width Genpro_popup enable_popup gh-point-home"
          }
          title={this.state.popuptitle}
        >
          {this.state.popupType === 1 && (
            <InfoContent pagename={this.state.infoRunType} />
          )}
        </ModalPopup>
      </div>
    );
  }
}
const mapStateTopProps = state => {
  var blacksArr = [];
  if (Object.keys(state.homestaticblocks).length > 0) {
    if (state.homestaticblocks[0].status === "success") {
      blacksArr = state.homestaticblocks[0].result_set;
    }
  }
  return {
    staticblack: blacksArr
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHomeblockContent: slug => {
      dispatch({ type: GET_HOMEBLOCKCONTENT, slug });
    }
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Home));
