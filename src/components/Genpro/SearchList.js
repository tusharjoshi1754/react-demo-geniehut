/* eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  OverlayTrigger,
  ButtonToolbar,
  Tooltip,
  Button
} from "react-bootstrap";
import InfoPopup from '../Layout/InfoPopup';
import { Collapse, CardBody, Card } from "reactstrap";
import QnMarkDefault from "../../common/images/qn_mark_default.png";
import LocationIcon from "../../common/images/location-icon.png";
//import JobIcon from "../../common/images/job-icon.png";
//import PriceTagIcon from "../../common/images/price-tag-icon.png";
import PriceTagIcon from "../../common/images/web.png";
import emailIcon from "../../common/images/mail.png";
import phoneIcon from "../../common/images/mobile.png";
import circleshop from "../../common/images/location.png";
import UserAvatar from "../../common/images/header/avatar.PNG";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ModalPopup from "../Layout/ModalPopup";
import Compare from "./Compare";
import { LoadImage, Encrypt, CheckAuth } from "../Helpers/SettingHelper";
import { appName } from "../Config/Config";
import { GET_CONTACT, GET_GENPROCALLREQUEST } from "../../actions";
import cookie from "react-cookies";
import $ from 'jquery';
import ErrorMsg from   '../../common/images/error-msg.png';


class SearchList extends Component {
  constructor(props) {
    super(props);
    CheckAuth();
    this.state = {
      UserAuthToken: cookie.load("UserAuthToken"),
      Districtcollapse: false,
      PriceRangecollapse: false,
      Ratingscollapse: false,
      Typecollapse: false,
      search_data:
        this.props.location.state.runserachlist.search_data !== "" &&
        typeof this.props.location.state.runserachlist.search_data !== undefined
          ? this.props.location.state.runserachlist.search_data
          : "",
      questionFrm1:
        this.props.location.state !== "" &&
        typeof this.props.location.state !== undefined
          ? this.props.location.state.questionFrm1
          : "",
      vendors: "",
      regions: "",
      district: "",
      compareList: [],
      GenListPopup: false,
      pointPopup: false,
      vendorIDs:[],
      vendorgenIDs:[],
      value: { min: 0, max: 6000 },
      userpoints:'',
      district_list: [],
      region_list: [],
      price:[],
      setprice: false,
      setdistrict: false
    };
    this.District = this.District.bind(this);
    this.PriceRange = this.PriceRange.bind(this);
    this.Ratings = this.Ratings.bind(this);
    this.Type = this.Type.bind(this);
    this.GenListPopup = this.GenListPopup.bind(this);
  }
  componentDidMount() {
   if(this.props.location.state.runserachlist.search_data!=="" && typeof this.props.location.state.runserachlist.search_data!=='undefined') {
        this.props.getGenproCallRequest(this.state.search_data.qcsd_id)
        this.displayVendors();
    }
    this.displayregions();
    this.displayDistrict();
  }
  componentWillReceiveProps(Props) {
    if(Props.procontact !== this.props.procontact){
      if(Props.procontact[0].status == 'success'){
        this.setState({userpoints: Props.procontact[0].points})
        if(Props.procontact[0].user_id !== '' && Props.procontact[0].type == 'A'){
          this.setState({pointPopup:true});
          $('#'+Props.procontact[0].user_id+ ' .showrequested').show();
          $('#'+Props.procontact[0].user_id+ " .showasktocall").hide();
          $('#asktocall_'+Props.procontact[0].user_id).removeClass('load-data');
        }else if(Props.procontact[0].user_id !== '' && Props.procontact[0].type == 'G'){
          this.setState({pointPopup:false});
          $('#'+Props.procontact[0].user_id+ ' .showgenrequested').show();
          $('#'+Props.procontact[0].user_id+ " .showgenmessage").hide();
          $('#genmessage_'+Props.procontact[0].user_id).removeClass('load-data');
        }
      }else{
      if( Props.procontact[0].type == 'A'){
        $('#asktocall_'+Props.procontact[0].user_id).removeClass('load-data');
      }else if(Props.procontact[0].type == 'G'){
        $('#genmessage_'+Props.procontact[0].user_id).removeClass('load-data');
      }
      
      $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
      $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+ErrorMsg+'" alt="ErrorMsg" /></div><h2 class="title3">Error</h2><p>'+Props.procontact[0].message+'</p> ');
       }
    }


    if(Props.genprocallrequest !== this.props.genprocallrequest){
      if(Props.genprocallrequest[0].status == 'success'){
        if(Props.genprocallrequest[0].result_set !== '' && Props.genprocallrequest[0].result_set !== undefined){
          Object.entries(Props.genprocallrequest[0].result_set.list_all).map((item, index) => {
            if(item[1].info.askforcall !== null && item[1].info.askforcall !== '' && item[1].info.askforcall !== undefined){
              this.getCallrequest(item[0],'asktocall')  
            }
            if(item[1].info.genmessage !== null && item[1].info.genmessage !== '' && item[1].info.genmessage !== undefined){
              this.getCallrequest(item[0],'genmessage')  
            }
          });

      }
    }
  }

  }

   getCallrequest(id,type){
    if(type == 'asktocall'){
      let venIDs = [];
      venIDs.push(id);
      this.setState({ vendorIDs: venIDs }, function() {
       this.displayVendors();
       });
    }else if(type == 'genmessage'){
       let vengenIDs = [];
       vengenIDs.push(id);
       this.setState({ vendorgenIDs: vengenIDs }, function() {
       this.displayVendors();
      });
     }
   }

  closepopup(){
      $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
  }
  District() {
    this.setState(state => ({
      Districtcollapse: !state.Districtcollapse,
      Ratingscollapse: false,
      PriceRangecollapse: false,
      Typecollapse: false
    }));
  }

  Ratings() {
    this.setState(state => ({
      Ratingscollapse: !state.Ratingscollapse,
      Districtcollapse: false,
      PriceRangecollapse: false,
      Typecollapse: false
    }));
  }

  PriceRange() {
    this.setState(state => ({
      PriceRangecollapse: !state.PriceRangecollapse,
      Districtcollapse: false,
      Ratingscollapse: false,
      Typecollapse: false
    }));
  }

  Type() {
    this.setState(state => ({
      Typecollapse: !state.Typecollapse,
      Districtcollapse: false,
      Ratingscollapse: false,
      PriceRangecollapse: false
    }));
  }
  GenListPopup() {
    this.setState(prevState => ({
      GenListPopup: !prevState.GenListPopup
    }));
  }
  handlePriceChange = price => {
    this.setState({ price: price });
  };

  displayregions() {
    let regions = "";
    if (
      this.state.search_data !== "" &&
      typeof this.state.search_data !== undefined
    ) {
      regions = Object.entries(this.state.search_data.regions).map(
        (item, index) => {
          return (
            <div className="form-group" key={index}>
              <div className="custom_checkbox">
                <input type="checkbox" id={'region_'+item[0]} name="region_list" onChange={this.handleRegionChange} value={item[0]}/>                
                <span>{item[1]}</span>
              </div>
            </div>
          );
        }
      );
    }
    this.setState({ regions: regions });
  }

 handleFilterSubmit = () => {  
        this.setState(state => ({ SEDatecollapse: false, Districtcollapse: false, PriceRangecollapse:false }));
        this.setState({  page: 0, oldleads:[], runleadlist:''}, function () { this.loadCustomerLeads(); }.bind(this));    
  }
    
  loadCustomerLeads() {

      if(this.state.page>0) {
        this.setState({moreloading:true});
      }      
        var qs = require('qs');
        let price_from = '0';
        if(this.state.price.min!='' && typeof this.state.price.min!='undefined') {
            price_from = this.state.price.min;
            this.setState({setprice:true, applyFilter:true});
            
        }
        let price_to = '6000';        
        if(this.state.price && this.state.price.max!='' && typeof this.state.price.max!='undefined') {
            price_to = this.state.price.max;
            this.setState({setprice:true, applyFilter:true});
        }

        if(this.state.district_list!='') {
            this.setState({setdistrict:true, applyFilter:true});
            this.loadSelectedDistrict();
        }
        
        if(this.state.startDate!='') {
            this.setState({setdate:true, applyFilter:true});
        }

            {/*var postObject = {
            "app_name"      : appName,
            "user_token"    : cookie.load('UserAuthToken'),
            "district_list" : this.state.district_list,
            "district_reg"  : this.state.region_list,
            'page'          : this.state.page,
            };*/}
  }

  loadSelectedDistrict() {
        const districtList = this.state.search_data.districts.map((item, Index) => {
            if(this.state.district_list.indexOf(item.districts_id)>=0) {
                return (
                    <span className="label label-default" key={Index} onClick={this.removeFilter.bind(this, 'district', item.districts_id)}>{item.districts_name} <i className="fa fa-times" aria-hidden="true"></i></span>
                );
            }
            

        });
        this.setState({FilterDistrict:districtList});
  }

   loadDistict() {
       const districtList = this.state.search_data.districts.map((distrcitList, distrcitIndex) => {
            return (
                <div className="form-group" key={distrcitIndex}>                        
                    <div className="custom_checkbox">
                    <input type="checkbox" id={'dist_'+distrcitList.districts_id} name="district_list" onChange={this.handleDistrictChange} value={distrcitList.districts_name}/>
                        <span>{distrcitList.districts_name}</span>
                    </div>                         
                </div>
            );

        });
        this.setState({district:districtList});
   }



   removeFilter(type, id) {

      if(type=='district') {
          if(id!='') {
           let district_list = this.state.district_list;
            var index = district_list.indexOf(id);
            if (index > -1) {
                district_list.splice(index, 1);
            }
           // if(district_list.length===0) {
               // district:[],
                this.setState({  setdistrict:false, district_list:district_list }, function () {
                    this.loadDistict();
                    if(this.state.setdistrict===false && this.state.setdate===false && this.state.setprice===false) {
                        this.setState({applyFilter:false});
                        this.loadSelectedDistrict();
                    }
                }.bind(this));
                $('#dist_'+id).prop('checked', false);
          }
         /*   }
            else {

            }*/

        /*this.setState({  setdistrict:false, district:[], district_list:[] }, function () {  this.loadDistict();
            if(this.state.setdistrict===false && this.state.setdate===false && this.state.setprice===false) {
                this.setState({applyFilter:false});
            }
        }.bind(this));
        $('input:checkbox').removeAttr('checked');
        */
      }
  
      else if(type=='price') {
          this.setState({
              price:
              [
                  {
                    min:'',
                    max:''
                  }
              ]
          });
          this.setState({value: { min: 0, max: 6000 }});
          this.setState({setprice:false});
          this.setState({setprice:false }, function () { 
            if(this.state.setdistrict===false && this.state.setdate===false && this.state.setprice===false) {
                this.setState({applyFilter:false});
            }
        }.bind(this));

      }
      else if(type=='all') {
        this.setState({value:  { min: 0, max: 6000 }});
        
         this.setState({  setdistrict:false, district:[], district_list:[], setdate:false, startDate:'', endDate:'', setprice:false, applyFilter:false }, function () {  
             this.loadDistict();}.bind(this));   
        this.setState({
              price:
              [
                  {
                    min:'',
                    max:''
                  }
              ]
          });
      }
      this.handleFilterSubmit();
  }

  handleRegionChange = (event) => {
        var regionArr = [...this.state.region_list];
        const value = event.target.value
        const index = regionArr.findIndex(region_list => region_list === value);
        if(index > -1) {
        regionArr = [...districtArr.slice(0, index), ...districtArr.slice(index + 1)]
        } else {
        regionArr.push(value);
        }
        this.setState({region_list: regionArr});
 };



  displayDistrict() {
    let district = "";
    if (
      this.state.search_data !== "" &&
      typeof this.state.search_data !== undefined
    ) {
      district = this.state.search_data.districts.map((item, index) => {
        return (
           <div className="form-group" key={index}>                        
                    <div className="custom_checkbox">
                    <input type="checkbox" id={'dist_'+item.districts_id} name="district_list" onChange={this.handleDistrictChange} value={item.districts_id}/>
                        <span>{item.districts_name}</span>
                    </div>                         
           </div>

        );
      });
    }
    this.setState({ district: district });
  }

  handleDistrictChange = (event) => {
        var districtArr = [...this.state.district_list];
        const value = event.target.value
        const index = districtArr.findIndex(district_list => district_list === value);
        if(index > -1) {
        districtArr = [...districtArr.slice(0, index), ...districtArr.slice(index + 1)]
        } else {
        districtArr.push(value);
        }
        this.setState({district_list: districtArr});
    };

  addToCompare(vendorID) {
    let compareList = [];
    compareList = this.state.compareList;
    compareList.push(vendorID);
    this.setState({ compareList: compareList }, function() {
      this.displayVendors();
    });
  }
  removeCompare(vendorID) {
    let compareList = this.state.compareList;
    var index = compareList.indexOf(vendorID);
    if (index > -1) {
      compareList.splice(index, 1);
    }
    this.setState({ compareList: compareList }, function() {
      this.displayVendors();
    });
  }
  compare_List() {
    if (this.state.compareList.length > 1) {
      this.GenListPopup();
    }
  }
  removeComparelist(){
    this.setState({compareList: ''})
  }

  addContact(pro_id, type) {
    let postdata = [];
    postdata["app_name"] = appName;
    postdata["user_token"] = this.state.UserAuthToken;
    postdata["ref_id"] = Encrypt(this.state.search_data.qcsd_id, "e");
    postdata["pro_id"] = Encrypt(pro_id, "e");
    postdata["type"] = type;
    postdata["sendtype"] = "customer";
    this.setState({ comppro_id: pro_id });

   if(type === 'askforcall'){
    $('#asktocall_'+pro_id).addClass('load-data');
     this.setState({popuptext:'Sent SMS to this GenUser to call you back. Used 100 GH points'})
     this.displayVendors();
   }else if(type === 'genmessage'){
    $('#genmessage_'+pro_id).addClass('load-data');
    this.displayVendors();
   }
    this.props.getContact(postdata);
  }

  loadPopupStatus = (pointPopup) => {
    this.setState({pointPopup:pointPopup});
  }

   displayVendors() {
    let vendors = "";
    if (
      this.state.search_data !== "" &&
      typeof this.state.search_data !== undefined
    ) {
      vendors = this.state.search_data.vendor_list_res.map((item, index) => {
        var indexvalue = '-1';
        if(this.state.vendorIDs.length > 0){
           indexvalue  = this.state.vendorIDs.indexOf(item.user_id); 
        }
        let indexgenvalue = '-1';
        if(this.state.vendorgenIDs.length > 0){
           indexgenvalue  = this.state.vendorgenIDs.indexOf(item.user_id); 
        }
        let indexdist = '-1';
        if(item.feature_districts!=='' && item.feature_districts!== null && this.state.search_data.cust_district_id!==''){
          let answer_array = item.feature_districts.split(',');
          indexdist  = answer_array.indexOf(this.state.search_data.cust_district_id); 
        }
        
        let clasdpre = '';
        if(indexdist >= 0){
           clasdpre = 'pro-service-list-box pro-service-row premium-clr';
        }else{
           clasdpre = 'pro-service-list-box pro-service-row';
        }
        return (
          <div className={clasdpre} key={index} id={item.user_id}>
            <div className="psl-img">
              <img src={LoadImage(item.user_profile_image, "profilelist")} alt="" />
            </div>
            <div className="psl-txt">
              <div className="psl-content">
                <div className="psl-leftcontent">
                  <h3>
                    <Link
                      to={{
                        pathname:
                          "/customer/pro-service-detail/" +
                          Encrypt(item.user_id, "e") +
                          "/" +
                          Encrypt(this.state.search_data.qcsd_id, "e")
                      }}
                      target="_blank"
                    >
                      {item.user_name}
                    </Link>
                  </h3>
                  
                  <div className="psl-review">
                    <div className="compare-rr">
                      <span className="crr-rating">
                        {parseFloat(item.user_ratings)}{" "}
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                      </span>{" "}
                      <span> / {item.vendor_reviews_count} Reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="psl-dtls">
                    <p><img src={circleshop} alt="" />{item.publishcompanyaddr > 0?item.vendor_company_address+'':'N/A'} </p>
                    <p><img src={PriceTagIcon} alt="" />{item.publishWebAddress > 0?item.vendor_webaddress+' ':'N/A'}</p>
                    <p><img src={emailIcon} alt="" />{item.publishemail > 0?item.vendor_email+' ':'N/A'}</p>
                    <p><img src={phoneIcon} alt="" />{item.publishLandline > 0?item.displaycontactno:'N/A'}</p>

                    {/*<img src={JobIcon} alt="" />{" "}
                    {item.user_job_completed > 0
                      ? item.user_job_completed + " Jobs Completed"
                      : "Jobs to Be Done"}*/}
                
                  <p>
                    open-close : {(item.operating_hours!=='' && item.operating_hours!== null) ? item.operating_hours: 'N/A'}
                  </p>
                </div>
              </div>
              <div className="psl-footer">
                
                {this.state.search_data.vendor_list_res.length > 1 && (
                    <div className="psl-btn-wrapper">
                      <div className="tooltip_ico">
                        <ButtonToolbar>
                          {["top"].map(placement => (
                            <OverlayTrigger
                              key={placement}
                              placement={placement}
                              overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                  Use “Add to compare” for easy comparison against the selected service providers
                                </Tooltip>
                              }
                            >
                              <Button variant="secondary">
                                <img src={QnMarkDefault} alt="QnMarkDefault" />
                              </Button>
                            </OverlayTrigger>
                          ))}
                        </ButtonToolbar>
                      </div>
                      {this.state.compareList.indexOf(item.user_id) >= 0 && (
                        <a
                          href="javascript:void(0);"
                          onClick={this.removeCompare.bind(this, item.user_id)}
                          className="btn btn1 btn_sm btn_blue animate-btn2 ab-none"
                        >
                          <i className="fa fa-check" aria-hidden="true"></i>{" "}
                          Remove Compare
                        </a>
                      )}
                      {this.state.compareList.indexOf(item.user_id) < 0 && (
                        <a
                          href="javascript:void(0);"
                          onClick={this.addToCompare.bind(this, item.user_id)}
                          className="btn btn1 btn_sm btn_blue animate-btn2 ab-none"
                        >
                          Add to Compare
                        </a>
                      )}
                    </div>
                  )}
                  {item.feature_sms_callback !== null &&
                  item.feature_sms_callback === "Y"  && indexvalue < 0 &&(
                    <div className="psl-btn-wrapper asktocall">
                      <a
                        href="javascript:void(0);"
                        onClick={this.addContact.bind(
                          this,
                          item.user_id,
                          "askforcall"
                        )}
                        className="btn btn1 btn_sm btn_orange animate-btn2 ab-none showasktocall"
                      ><i className="fa fa-check" aria-hidden="true"></i><span id={'asktocall_'+item.user_id}></span>Ask
                        for Call
                      </a>
                    </div>
                  )}
                  <span className="btn btn_orange btn_sm animate-btn2 a2c showrequested ab-none" style={{display:(indexvalue >= 0)?'inline-block':'none'}}>Requested</span>

                  {item.contactgenmessage !== "" &&
                  item.contactgenmessage === "yes" && indexgenvalue < 0 && (
                    <div className="psl-btn-wrapper genmessage">
                      <a
                        href="javascript:void(0);"
                        onClick={this.addContact.bind(
                          this,
                          item.user_id,
                          "genmessage"
                        )}
                        className="btn btn1 btn_sm btn_green animate-btn2 ab-none showgenmessage"
                      ><i className="fa fa-check" aria-hidden="true"></i><span id={'genmessage_'+item.user_id}></span>GenMessage
                      </a>
                    </div>
                  )}
                  <span className="btn btn_green btn_sm animate-btn2 a2c showgenrequested ab-none" style={{display:(indexgenvalue >= 0)?'inline-block':'none'}}>Requested</span>

              </div>
            </div>
          </div>
        );
      });
      this.setState({ vendors: vendors });
    }
  }

  render() {
    return (
      <div>
       <Header/>
        <div className="innerpage-head-banner">
          <div className="container">
            <div className="innerpage-head-wrapper">
              <h2>
                You have chosen{" "}
                <span>{this.state.search_data.service_name},</span>
              </h2>
              <p>
                Once you complete your request we will get best list of GenPro
              </p>
            </div>
          </div>
        </div>
        <div className="gen-jobs-bar">
          <div className="container">
            <div className="gen-jobs-innerbar">
              <span>
                {this.state.search_data.city !== "" && (
                  <div>
                    <img src={LocationIcon} alt="" />{" "}
                    {this.state.search_data.city}
                  </div>
                )}
              </span>
              <Link
                to={{
                  pathname:
                    "/customer/pro-service/" +
                    this.state.questionFrm1.service_id,
                  state: {
                    questionFrm1: this.state.questionFrm1,
                    search_data: this.state.search_data
                  }
                }}
                className="btn btn_white btn_minwid btn-animate2"
              >
                Modify Search
              </Link>
            </div>
          </div>
        </div>
        <div className="Gen_filter_section pro-service-filter">
          <div className="container">
            <div className="Gen_filter_list">
              <ul>
                <li>
                  <span className="Gen_filter_head">Filter: </span>
                </li>
                <li>
                  <Button
                    color="primary"
                    onClick={this.District}
                    className="Review_Reply_btn"
                  >
                    District{" "}
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </Button>
                </li>
                <li>
                  <Button
                    color="primary"
                    onClick={this.PriceRange}
                    className="Review_Reply_btn"
                  >
                    Price{" "}
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </Button>
                </li>
                {/*<li>
                  <Button
                    color="primary"
                    onClick={this.Ratings}
                    className="Review_Reply_btn"
                  >
                    Ratings{" "}
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </Button>
                </li>*/}
               {/* <li>
                  <Button
                    color="primary"
                    onClick={this.Type}
                    className="Review_Reply_btn"
                  >
                    Type <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </Button>
                </li>*/}
              </ul>

                      {this.state.setdistrict ==true &&
                      this.state.FilterDistrict
                      }
                      {this.state.setprice ==true &&    
                      <span className="label label-default" >{(this.state.price.min!=='' && typeof this.state.price.min!='undefined')?'s$'+this.state.price.min+' - ':''}{(this.state.price.max!='' && typeof this.state.price.max!='undefined')?'s$'+this.state.price.max:''}<i className="fa fa-times" aria-hidden="true" onClick={this.removeFilter.bind(this, 'price')}></i></span>
                      }
                      {this.state.applyFilter ==true &&    
                      <span className="label label-default clear-label-default" onClick={this.removeFilter.bind(this, 'all')}>Clear All <i className="fa fa-times" aria-hidden="true"></i></span>
                      }

            </div>
            <div className="Gen_filter_list_contents">
              <div className="Gen_filter_list_content GFL_checkbox_wrap">
                <Collapse isOpen={this.state.Districtcollapse}>
                  <Card>
                    <CardBody>
                      <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                      <div className="Gen_checkbox_wrap">
                        <h2>Region</h2>
                        {this.state.regions}
                        <h2>District</h2>
                        {this.state.district}
                      </div>
                      <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn bottom" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
              <div className="Gen_filter_list_content GFL_date_wrap">
                <Collapse isOpen={this.state.PriceRangecollapse}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md={12}>
                          <InputRange
                            maxValue={6000}
                            minValue={0}
                            step={2}
                            value={this.state.value}
                            maxLabel="$"
                            onChange={value => this.setState({ value })}
                            onChangeComplete={this.handlePriceChange}
                          />
                        </Col>
                      </Row>
                       <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn bottom" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
              <div className="Gen_filter_list_content GFL_date_wrap">
                <Collapse isOpen={this.state.Ratingscollapse}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md={12}></Col>
                      </Row>
                      <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn">
                        Apply Filter
                      </Button>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
{/*              <div className="Gen_filter_list_content GFL_checkbox_wrap">
                <Collapse isOpen={this.state.Typecollapse}>
                  <Card>
                    <CardBody>
                      <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn">
                        Apply Filter
                      </Button>

                      <div className="Gen_checkbox_wrap">
                        <div className="form-group">
                          <div className="custom_checkbox">
                            <input type="checkbox" name="" />
                            <span>Marina</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="custom_checkbox">
                            <input type="checkbox" name="" />
                            <span>CommonWealth</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="custom_checkbox">
                            <input type="checkbox" name="" />
                            <span>West Coast</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="custom_checkbox">
                            <input type="checkbox" name="" />
                            <span>Telok Blangah</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>*/}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="pro-service-list-wrapper">
            {this.state.vendors.length > 0
              ? this.state.vendors
              : "No records found"}
          </div>
        </div>

        <div
          className={
            this.state.compareList.length > 1
              ? "fixed-compare-box"
              : "fixed-compare-box close"
          }
        >
          {this.state.compareList.length > 1 && (
            <a href="javascript:void(0);"   onClick={this.removeComparelist.bind(this)} className="fcb-toggle">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          )}
          <div className="inner-fixed-compare-box">
            <div className="fcompare-avatar">
              <img src={UserAvatar} alt="" />{" "}
              <span>{this.state.compareList.length}</span>
            </div>

            <div className="fcompare-link">
              <a
                href="javascript:void(0);"
                onClick={this.compare_List.bind(this)}
                className="btn btn1 btn_sm btn_blue animate-btn2 ab-none"
              >
                Compare
              </a>
            </div>
          </div>
        </div>
        <Footer />
        <ModalPopup
          modal={this.state.GenListPopup}
          toggle={this.GenListPopup}
          className="modal-width Gen_popup"
          title="Compare"
        >
          {this.state.GenListPopup === true && (
            <Compare
              qcsdID={this.state.search_data.qcsd_id}
              pro_id={this.state.compareList}
              removeCompare={this.removeCompare}
            />
          )}
        </ModalPopup>

          {(this.state.pointPopup===true) &&
            <div>
            <InfoPopup popupcontent={this.state.popuptext} loadPopupStatus={this.loadPopupStatus.bind(this)}  />
            </div>
            }
            
        <div className="genie-msg-popup-wrapper">
          <div className="genie-msg-popup-inner-wrapper">
          <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
          <div className="genie-msg-popup-body">
          </div>
          <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    procontact: state.procontact,
    genprocallrequest: state.genprocallrequest
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getContact: formPayload => {
      dispatch({ type: GET_CONTACT, formPayload });
    },
    getGenproCallRequest: (qcsd_id) => {
          dispatch({ type: GET_GENPROCALLREQUEST, qcsd_id});
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(SearchList));
