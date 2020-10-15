/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Modal, Table, OverlayTrigger, ButtonToolbar, Tooltip, Button,} from 'react-bootstrap';
import { Collapse, CardBody, TabContent, TabPane, CardTitle, CardText, Card} from 'reactstrap';
import $ from 'jquery';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import cookie from 'react-cookies';
import moment from 'moment';
var Parser = require('html-react-parser');
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import SecondaryHeader from '../../Layout/SecondaryHeader';
import Profilebar from '../Profilebar';
import Genleftmenu from '../../Layout/Genleftmenu';
import { lang } from '../../Helpers/lang';
import { appName, serviceImage } from "../../Config/Config";
import { PageTitle, LoadingSec, RunProfileTab, getExpirydate, CurrencyIconFormat, LoadImage, CheckAuth} from '../../Helpers/SettingHelper';
import { GET_RUNCUSTOMERLEADS, GET_DISTRICT } from '../../../actions';


class Leads extends Component {

    constructor(props) {
        CheckAuth();
        super(props);
        this.state = {
              Districtcollapse: false,     
              SEDatecollapse: false,     
              PriceRangecollapse: false,
              enablevalue:'',
              runleadlist:'',
              selectedvalue: '',
              selectedOption:'',
              value: { min: 0, max: 6000 },
              district:[],
              district_list: [],
              districtListDetails:[],
              startDate:'',
              endDate:'',
              page:0,
              loadMoreEnable:false,
              oldleads:[],
              moreloading:false,
              price:[],
              setdistrict:false,
              FilterDistrict:'',
              setdate:false,
              setprice:false,
              applyFilter:false,
              errortodate:'',
              runcustomerleads:''
        }        
        this.District = this.District.bind(this);
        this.SEDate = this.SEDate.bind(this);
        this.PriceRange = this.PriceRange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate =  this.handleEndDate.bind(this);
        this.props.getDistrict();
    }

    componentDidMount(){
        document.title = PageTitle('GenRun Customer Leads');
                this.setState({ oldleads:[] }, function () { this.loadCustomerLeads(); }.bind(this));
    }


  componentDidUpdate(prevProps) {
    if (this.props.runcustomerleads !== prevProps.runcustomerleads) {

            this.setState({moreloading:false});
            if(this.props.runcustomerleads[0]['status'] === 'success'){

                const totalrecords =  this.props.runcustomerleads[0].total_rows;
                const limit =  this.props.runcustomerleads[0].limit;
                const loadMoreCount = totalrecords/limit;
                const pagecount = parseInt(this.state.page)+1;
                if(loadMoreCount> pagecount && totalrecords > limit) {
                    this.setState({loadMoreEnable:true});
                }
                else {
                    this.setState({loadMoreEnable:false});
                }
                let newleads = '';
                if(this.state.oldleads!='') {
                    let oldleads = this.state.oldleads;
                    newleads = oldleads.concat(this.props.runcustomerleads[0].result_set.records);
                } 
                else {
                    newleads = this.props.runcustomerleads[0].result_set.records;
                }
                this.setState({  oldleads : newleads }, function () { this.getRunList(newleads) }.bind(this));

                this.getRunList(this.props.runcustomerleads[0].result_set.records)

                this.setState({
                    totalrecords: this.props.runcustomerleads[0].total_records,
                });            
            }
        }
      if (this.props.district !== prevProps.district) {

          const districtList = [{value:'0', label: 'No meet is required'}];
          this.props.district[0].district_list.map(function(item){  
            districtList.push({
                  value: item.value,
                  label: item.label
              });
          });
         this.setState({  districtListDetails : districtList }, function () {  this.loadDistict();}.bind(this));
        }
    }
    

    handleChange = selectedOption => {
        this.setState({selectedOption})
        this.setState({  selectedvalue : selectedOption.value, page : 0, oldleads:[], runleadlist:'' }, function () { this.loadCustomerLeads(); }.bind(this));
    };

    handleStartDate = date => {
        this.setState({  startDate: date});
    };

    handleEndDate = date => {
      var d1 = new Date(this.state.startDate);
      var d2 = new Date(date);
      if(d1.getTime() > d2.getTime()){
        this.setState({errortodate:Parser('<span class="errorspan">Please choose correct date</span>')});
      }else{
        this.setState({errortodate:''});
      }
      
        this.setState({  endDate: date});
    };
    handlePriceChange = price => {
        this.setState({price:price});
    };

   loadDistict() {
       const districtList = this.state.districtListDetails.map((distrcitList, distrcitIndex) => {
            return (
                <div className="form-group" key={distrcitIndex}>                        
                    <div className="custom_checkbox">
                    <input type="checkbox" id={'dist_'+distrcitList.value} name="district_list" onChange={this.handleDistrictChange} value={distrcitList.value}/>
                        <span>{distrcitList.label}</span>
                    </div>                         
                </div>
            );

        });
        this.setState({district:districtList});
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

    getRunList(leadInfo){
        const leadInfodata = leadInfo;
            if(leadInfodata!== undefined && leadInfodata!== null){
                if(Object.keys(leadInfodata).length > 0) {
                    const leadInfodataDeatils = leadInfodata.map((leadinfo, leadinfoIndex) => {              
                        let Serviceimgae = serviceImage+leadinfo.services_background_img;
                        var date = new Date(leadinfo.trans_startdate);
                        const month = date.toLocaleString('default', { month: 'short' });
                        var dates =date.getDate()+' '+month+' '+date.getFullYear();
                        if(leadinfo.new_amount == null){
                            var amount = leadinfo.trans_fee;
                        }else{
                            var amount = leadinfo.new_amount;
                        }
                        return (
                        <div className="genrun-leads-wrapper" key={leadinfoIndex}>
                            <div className="genrun-leads-list-wrapper">
                                <div className="genrun_leads_wrap">
                                    <div className="genrun_leads_inner_wrap">
                                        <div className="img_title_tid_wrap">
                                        <div className="genrun_leads_img">
                                            <img src={Serviceimgae} alt="" />
                                        </div>
                                        <div className="genrun_leads_title_tid">
                                            <h2><Link to={{ pathname: '/genrun-customer-leads-detail', state: { trans_id:leadinfo.trans_id} }} title={lang.common.more_info}>{leadinfo.services_title}</Link></h2>
                                            <p>{lang.genrun.cust_lead.transaction_id} - <span>{leadinfo.trans_key}</span></p>
                                        </div>
                                        </div>
                                        <div className="genrun_leads_date">
                                            <p>{dates}<span><br />{(getExpirydate(leadinfo.trans_enddate)==1)?'('+lang.common.expired+')':''}</span></p>
                                        </div>
                                        <div className="genrun_leads_price_btn">
                                            <h2>{CurrencyIconFormat(amount)}</h2>
                                            <div className="genrun_leads_btn">
                                                <Link to={{ pathname: '/genrun-customer-leads-detail', state: { trans_id:leadinfo.trans_id} }} className="btn btn_orange animate-btn2" title={lang.common.more_info}>{lang.common.more_info}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );    
                });
                this.setState({runleadlist:leadInfodataDeatils});
            }
            else {
            this.setState({runleadlist:<div className="genrun-leads-wrapper"><div className="genrun-leads-list-wrapper">
                <div className="genrun_leads_wrap">
                                                            <div className="genrun_leads_inner_wrap">{lang.common.no_trans}</div></div></div></div>});
            }
        } else {
            this.setState({runleadlist:<div className="genrun-leads-wrapper"><div className="genrun-leads-list-wrapper">
                                                    <div className="genrun_leads_wrap">
                                                        <div className="genrun_leads_inner_wrap">{lang.common.no_trans}</div></div></div></div>});
        }
    }
    District() {
        this.setState(state => ({ Districtcollapse: !state.Districtcollapse, SEDatecollapse: false, PriceRangecollapse:false }));
    }
  
    SEDate() {
        this.setState(state => ({ SEDatecollapse: !state.SEDatecollapse, Districtcollapse: false, PriceRangecollapse:false }));
    }

    PriceRange() {
        this.setState(state => ({ PriceRangecollapse: !state.PriceRangecollapse, Districtcollapse: false, SEDatecollapse:false  }));
    }

    handleFilterSubmit = () => {  
        this.setState(state => ({ SEDatecollapse: false, Districtcollapse: false, PriceRangecollapse:false }));
        this.setState({  page: 0, oldleads:[], runleadlist:''}, function () { this.loadCustomerLeads(); }.bind(this));    
    }
    loadMore() {
        let page = parseInt(this.state.page)+1;
        this.setState({  page: page}, function () { this.loadCustomerLeads(); }.bind(this));      
    }
    loadSelectedDistrict() {
        const districtList = this.state.districtListDetails.map((item, Index) => {
            if(this.state.district_list.indexOf(item.value)>=0) {
                return (
                    <span className="label label-default" key={Index} onClick={this.removeFilter.bind(this, 'district', item.value)}>{item.label} <i className="fa fa-times" aria-hidden="true"></i></span>
                );
            }
            

        });
        this.setState({FilterDistrict:districtList});
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
        if(this.state.price.max!='' && typeof this.state.price.max!='undefined') {
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
            var postObject = {
            "app_name"      : appName,
            "user_token"    : cookie.load('UserAuthToken'),
            "district_list" : this.state.district_list,
            "startdate"     : this.state.startDate,
            "enddate"       : this.state.endDate,
            "filter_sortby" : this.state.selectedvalue,
            'page'          : this.state.page,
            'price_from'    : price_from,
            'price_to'      : price_to
            };
        this.props.getRunCustomerleads(qs.stringify(postObject));
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
      else if(type=='date') {
        this.setState({ setdate:false, startDate:'', endDate:'' }, function () { 
            if(this.state.setdistrict===false && this.state.setdate===false && this.state.setprice===false) {
                this.setState({applyFilter:false});
            }
        }.bind(this));

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
render() {
  const {selectedOption} = this.state;
    return (
        <div>
            <Header />   
            <SecondaryHeader />    
            <Profilebar />
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <Genleftmenu currentpage="GenRun" />
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                {RunProfileTab('run')}                                
                                <Link to={"/edit-gen-run"} className="sdhmenu_mtabtrigger" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-my-services"} className="sdhmenu_mtabtrigger" title="GenRun Details">My Services <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-customerleads"} className="sdhmenu_mtabtrigger active" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">
                                    <div className="gen-table-wrapper">
                                    <p>Prompt reply (GenMessage, Ask to call or Counter-offer) provides better rating and boost your listing automatically</p>
                                        <div className="gen-table-header">
                                            <h3>Customer Leads</h3>
                                            <div className="gen-table-sort">
                                                <div className="re_select">
                                                    <Select 
                                                    value={selectedOption?selectedOption:{ value: 'P', label: 'Pending' }} 
                                                    options={lang.common.status_option} 
                                                    onChange={this.handleChange}
                                                    isDisabled={this.state.runleadlist!=''?false:true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Gen_filter_section">
                                            <div className="Gen_filter_list">
                                                <ul>
                                                    <li><Button color="primary" onClick={this.District}  className="Review_Reply_btn Gen_filter_Btn">District <i className="fa fa-angle-down" aria-hidden="true"></i></Button></li>
                                                    <li><Button color="primary" onClick={this.SEDate}  className="Review_Reply_btn Gen_filter_Btn">Date <i className="fa fa-angle-down" aria-hidden="true"></i></Button></li>
                                                    <li><Button color="primary" onClick={this.PriceRange}  className="Review_Reply_btn Gen_filter_Btn">Offer Price <i className="fa fa-angle-down" aria-hidden="true"></i></Button></li>
                                                    { /*<li><Button className="btn btn1 btn_orange animate-btn2 ab-none" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button></li>*/}
                                                </ul>
                                                {this.state.setdistrict ==true &&
                                                    this.state.FilterDistrict
                                                }
                                                {this.state.setdate ==true &&    
                                                    <span className="label label-default" >{(this.state.startDate!=='' && typeof this.state.startDate!=='undefined')?moment(this.state.startDate).format('MM/DD/YYYY'):''} {(this.state.endDate!=='' && typeof this.state.endDate!=='undefined')?' to '+moment(this.state.endDate).format('MM/DD/YYYY'):''} <i className="fa fa-times" aria-hidden="true" onClick={this.removeFilter.bind(this, 'date')}></i></span>
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
                                                     {(this.state.district!=='') &&         
                                                   <Collapse isOpen={this.state.Districtcollapse}>
                                                      <Card>
                                                        <CardBody>
                                                            <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn ddo_filter_btn" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                                                            <div className="Gen_checkbox_wrap">
                                                                {this.state.district}
                                                            </div>
                                                            <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn bottom ddo_filter_btn" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                                                        </CardBody>
                                                      </Card>
                                                    </Collapse>
                                                     }
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
                                                            <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn ddo_filter_btn" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                                                        </CardBody>
                                                      </Card>
                                                    </Collapse>
                                                </div>
                                                <div className="Gen_filter_list_content GFL_range_wrap">
                                                   <Collapse isOpen={this.state.SEDatecollapse}>
                                                      <Card>
                                                        <CardBody>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <div>
                                                                    <label>From</label>
                                                                    <DatePicker
                                                                        selected={this.state.startDate}
                                                                        onChange={this.handleStartDate}
                                                                        className="form-control"
                                                                        dateFormat="MM/dd/yyyy"
                                                                        showYearDropdown
                                                                        scrollableYearDropdown
                                                                        />                                              
                                                                    </div>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <div>
                                                                    <label>To</label>
                                                                    <DatePicker
                                                                        selected={this.state.endDate}
                                                                        onChange={this.handleEndDate}
                                                                        className="form-control"
                                                                        dateFormat="MM/dd/yyyy"
                                                                        showYearDropdown
                                                                        scrollableYearDropdown
                                                                        />
                                                                        <div>{this.state.errortodate}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Button className="btn btn1 btn_sm btn_orange animate-btn2 ab-none posabs-btn ddo_filter_btn" onClick={this.handleFilterSubmit.bind(this)}>Apply Filter</Button>
                                                        </CardBody>
                                                      </Card>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        </div>
                                        {(this.state.runleadlist!='')?this.state.runleadlist:LoadingSec}
                                        <div className="text-align-center">
                                            <a href="javascript:;" className="btn btn_orange animate-btn2 mtac-btn"  onClick={this.loadMore.bind(this)} title="Load More" style={{display:(this.state.loadMoreEnable===false)?'none':''}}>
                                                {this.state.moreloading ===true &&
                                            <span className="load-data">Loading</span> 
                                            }
                                            Load More</a>
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


const mapStateTopProps = (state) => {
  return {
      runcustomerleads: state.runcustomerleads,
      district: state.district,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getRunCustomerleads: (formPayload) => {
          dispatch({ type: GET_RUNCUSTOMERLEADS, formPayload });
        },
     getDistrict: () => {
      dispatch({ type: GET_DISTRICT});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Leads));

