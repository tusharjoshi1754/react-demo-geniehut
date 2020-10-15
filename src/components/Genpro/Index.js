/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { InputGroup, FormControl, Tab, Nav } from "react-bootstrap";
import { mediaUrl,servicemediaImage } from "../Config/Config";
import {
  LoadingSec,
  loadImage,
  LoadImage,
  Encrypt,
  PageTitle
} from "../Helpers/SettingHelper";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import DivSection from "../Layout/DivSection";
import { lang } from "../Helpers/lang";
import cookie from "react-cookies";
import { GET_CATEGORIES, GET_PROSERVICES, GET_REQUESTSERVICE, GET_ALLPROSERVICES } from "../../actions";
import LandingBanner from "../../common/images/genrun/cus-landing-banner.jpg";
import Parser from "html-react-parser";
import $ from 'jquery';

import All from "../../common/images/Protabs/service-icon-all.png";
import noimgserv from "../../common/images/provider.jpeg";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicedata: [],
      serviceList: "",
      loading: true,
      page: 0,
      searchListService: "",
      existSearch: 0,
      search_data: "",
      services_id: "",
      categoryDisplay: "",
      errorMsg: "",
      loadMoreEnable:false,
      moreloading:false,
      oldleads:[],
      proallservice:[]
    };
    this.props.getCategories();
    this.props.getProServices(this.state.page);
    this.props.getAllProServices();
  }

  componentDidMount(){
      document.title = PageTitle('Genpro');  
       $('body').click(function(evt){ 
       if(evt.target.className!='services-search-list') {
          $('.services-search-list').hide();
       }

      });
  }

  componentWillReceiveProps(Props) {

    this.setState({ moreloading: false });
    if (Props.proservices !== this.props.proservices) {
      this.setState({ loading: false });
      if (Props.proservices[0].status === "success") {


      const totalrecords =  Props.proservices[0].total_records;
      const limit =  Props.proservices[0].limit;
      const loadMoreCount = totalrecords/limit;
      const pagecount = parseInt(this.state.page)+1;
      if(loadMoreCount>pagecount && totalrecords > limit) {
      this.setState({loadMoreEnable:true});
      }
      else {
      this.setState({loadMoreEnable:false});
      }

      let newleads = '';

      if(this.state.oldleads!=="") {
      let oldleads = this.state.oldleads;
      newleads = oldleads.concat(Props.proservices[0].result_set);
      } 
      else {
      newleads = Props.proservices[0].result_set;
      }
      this.setState({  oldleads : newleads, proservices : newleads }, function () { this.displayService();  }.bind(this));

        /*this.setState(
          { proservices: Props.proservices[0].result_set },
          function() {
            this.displayService();
          }.bind(this)
        );*/
      }
    }
    if (Props.categories !== this.props.categories) {
      if (Props.categories[0].status === "success") {
        this.setState(
          { categories: Props.categories[0].result_set },
          function() {
            this.displayCategories(this.state.page);
          }
        );
      }
    }

    if (Props.proallservices !== this.props.proallservices) {
      if (Props.proallservices[0].status === "success") {
        this.setState({ proallservice: Props.proallservices[0].result_set });
      }
    }


  }

  handleChangeTxt = (item, event) => {
    this.setState({ [item]: event.target.value }, function() {
      if(item === 'search_data'){
          $('.services-search-list').show();
           this.searchListService();
        }  
    });
  };

  displayCategories() {
    let categoryDisplay = "";
    if (this.state.categories !== "") {
      const current = this;
      categoryDisplay = this.state.categories.map(function(item, index) {
        return (
          <Nav.Item
            key={index}
            onClick={current.categoryService.bind(
              current,
              item.service_category_id
            )}
          >
            <Nav.Link eventKey={index}>
              <img
                src={LoadImage(item.service_category_icon, "category")}
                alt=""
              />
              <h4>{item.service_category_name}</h4>
            </Nav.Link>
          </Nav.Item>
        );
      });
    }
    this.setState({ categoryDisplay: categoryDisplay });
  }
  categoryService(categoryID) {
    this.setState({ loading: true, oldleads: []});
    if (categoryID !== "") {
      this.props.getProServices(0,categoryID);
    } else {
      this.props.getProServices(0);
    }
  }

  loadMore() {
    let page = parseInt(this.state.page) + 1;
    this.setState(
      { page: page },
      function() {
        this.loadservices();
      }.bind(this)
    );
  }

  loadservices() {
    if (this.state.page > 0) {
      this.setState({ moreloading: true });
    }
    this.props.getProServices(
      this.state.page
    );
  }
  displayService() {
    let service = "";

    if (this.state.proservices !== "") {
      service = this.state.proservices.map(function(item, index) {
        console.log("item:",item)
        let servImg = '';
        if(item.services_background_img!== null && item.services_background_img!== ''){
          servImg = loadImage(
                    servicemediaImage + "" + item.services_background_img
                  );
                  console.log("servImg:",servImg )
        }else{
          servImg = noimgserv
        }
        return (
          <div className="gen-service-list-box" key={index}>
            <Link
              to={{
                pathname:
                  "/customer/pro-service/" + Encrypt(item.services_id, "e"),
                state: { transId2: "" }
              }}
              title={item.services_title}
            >
              <div className="gen-service-list-box-img">
                <img
                  src={servImg}
                  alt={item.services_title}
                />
              </div>
              <div className="gen-service-list-box-caption">
                <h3>{item.services_title}</h3>
              </div>
            </Link>
          </div>
        );
      });
    }
    this.setState({ serviceList: service });
  }

  searchListService() {
    let service = "";
    let existSearch = 0;
    if (this.state.proallservice !== "") {
      const search_data = this.state.search_data;
      service = this.state.proallservice.map((item, index) => {
        let result = item.services_title
          .toLowerCase()
          .indexOf(search_data.toLowerCase());
        if (result >= 0) {
          existSearch++;
          return (
            <li
              key={index}
              onClick={this.selectService.bind(
                this,
                item.services_id,
                item.services_title
              )}
            >
              {item.services_title}
            </li>
          );
        }
      });
    }
    if (existSearch === 0) {
      this.setState({
        searchListService: Parser("<li>No record found</li>"),
        existSearch: existSearch
      });
    } else {
      this.setState({ searchListService: service, existSearch: existSearch });
    }
  }

  selectService(services_id, services_title) {
    this.setState({
      services_id: services_id,
      search_data: services_title,
      existSearch: 0
    });
  }

  findService() {
    if (this.state.services_id !== "") {
      this.props.history.push({
        pathname: "/customer/pro-service/" + Encrypt(this.state.services_id, "e"),
                state: { transId2: "" }
      });
    } else {
      this.setState({ errorMsg: "Please select service" });
    }
  }
  render() {
    return (
      <div>
        <Header />
        
        <DivSection activepage="pro" />
        <div className="customer_home_banner">
          <img src={LandingBanner} alt="LandingBanner" className="chb_banner" />
          <div className="cus_home_banner_content">
            <div className="cus_home_banner_innercontent">
              <div className="cus_home_heading">
                {lang.customer.home.banner_protitle}
              </div>
              <div className="cus_home_form">
                <div className="form-group">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder={lang.customer.home.choose_services}
                      value={this.state.search_data}
                      onChange={this.handleChangeTxt.bind(this, "search_data")}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        <button
                          type="button"
                          className="btn btn_orange animate-btn2 chb_btn"
                          onClick={this.findService.bind(this)}
                        >
                          {lang.customer.home.find_probtn}
                        </button>
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  {this.state.errorMsg !== "" && (
                    <div className="cus_home_error">{this.state.errorMsg}</div>
                  )}
                  {this.state.searchListService !== "" && (
                    <div className="services-search-list">
                      <div className="inner-services-search-list">
                        <ul>{this.state.searchListService}</ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="All">
          <div className="gen-service-menu-wrapper">
            <div className="container">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link
                    eventKey="All"
                    onClick={this.categoryService.bind(this, "")}
                  >
                    <img src={All} alt="" />
                    <h4>All</h4>
                  </Nav.Link>
                </Nav.Item>
                {this.state.categoryDisplay}
              </Nav>
            </div>
          </div>
          <div className="gen-service-list-wrapper">
            <div className="container">
              <div className="gen-service-list">
                <div className="genrun_Heading">
                  <h2>{lang.customer.home.popular_services}</h2>
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey="All"></Tab.Pane>
                </Tab.Content>
                <div className="gen-service-list-inner">
                {this.state.loading === true ? LoadingSec : ""}
                {this.state.serviceList}
                </div>
                 <div className="gen-service-list-btn">
                                    <a href="javascript:;" className="btn btn_blue btn_minwid animate-btn2"  onClick={this.loadMore.bind(this)} title="Load More" style={{display:(this.state.loadMoreEnable===false)?'none':''}}>
                                            {this.state.moreloading ===true &&
                                        <span className="load-data">Loading</span> 
                                        }
                                        {lang.customer.home.load_more_services}</a>
                </div>
              </div>
            </div>
          </div>
        </Tab.Container>
        <Footer />
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    categories: state.categories,
    proservices: state.proservices,
    proallservices: state.proallservices,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch({ type: GET_CATEGORIES });
    },
    getProServices: (page, category) => {
      dispatch({ type: GET_PROSERVICES, category: category, page: page });
    },
    getAllProServices: () => {
      dispatch({ type: GET_ALLPROSERVICES });
    },
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Index));
