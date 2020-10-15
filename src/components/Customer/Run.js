/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Link, withRouter } from 'react-router-dom';
import {  InputGroup, FormControl } from 'react-bootstrap';
import {  mediaUrl } from "../Config/Config";
import { LoadingSec, loadImage, PageTitle } from "../Helpers/SettingHelper";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import DivSection from '../Layout/DivSection';
import { lang } from '../Helpers/lang';
import cookie from 'react-cookies';
import { GET_REQUESTSERVICE } from '../../actions';
import LandingBanner from '../../common/images/genrun/cus-landing-banner.jpg';
import Parser from 'html-react-parser';
import noimgserv from "../../common/images/default.jpg";
class Home extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            servicedata:[],
            serviceList:'',
            loading: true,
            page:0,
            loadMoreEnable:false,
            moreloading:false,
            oldleads:[],
            searchListService:'',
            existSearch:0,
            search_data:'',
            services_id:'',
            errorMsg : '',
        };
        this.props.getRequestService('genrun',cookie.load('UserAuthToken'), 0);
    };
    componentDidMount(){
      document.title = PageTitle('Genrun');  
    }
    componentWillReceiveProps(Props){
        this.setState({moreloading:false});
        if(Props.servicedata !== this.props.servicedata){
            this.setState({loading:false});
            if(Props.servicedata[0].status==='success') {
                const totalrecords =  Props.servicedata[0].total_records;
                const limit =  Props.servicedata[0].limit;
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
                    newleads = oldleads.concat(Props.servicedata[0].result_set);
                } 
                else {
                    newleads = Props.servicedata[0].result_set;
                }
                this.setState({  oldleads : newleads, servicedata : newleads }, function () { this.displayService();  }.bind(this));
            }            
        }
    }

    handleChangeTxt = (item, event) => {        
        this.setState({ [item]:event.target.value}, function() {
            this.searchListService();
        });        
    }

    loadMore() {
    let page = parseInt(this.state.page)+1;
    this.setState({  page: page}, function () { this.loadservices(); }.bind(this));  
    }

    loadservices() {

    if(this.state.page>0) {
        this.setState({moreloading:true});
    }
    this.props.getRequestService('genrun',cookie.load('UserAuthToken'), this.state.page);

    }

    displayService() {

        let service ='';
        if(this.state.servicedata!=="") {
            service = this.state.servicedata.map(function(item, index){
                let servImg = '';
                if(item.services_background_img!== null && item.services_background_img!== ''){
                servImg = loadImage(
                mediaUrl + "services/" + item.services_background_img
                );
                }else{
                servImg = noimgserv
                }

                return (
                    <div className="gen-service-list-box" key={index}>
                        <Link to={{ pathname: '/customer/genrun/service/'+item.services_id, state: { transId2:  ''}}} title={item.services_title}>
                            <div className="gen-service-list-box-img">
                                <img src={servImg} alt={item.services_title} />
                            </div>
                            <div className="gen-service-list-box-caption">
                                <h3>{item.services_title}</h3>
                            </div>
                        </Link>
                    </div>
                )
            });
        }        
        this.setState({serviceList:service});
    }

    searchListService() {
        let service ='';
        let existSearch = 0;
        if(this.state.servicedata!=="") {
               const search_data = this.state.search_data;
            service = this.state.servicedata.map((item, index) => {
                let result = item.services_title.toLowerCase().indexOf(search_data.toLowerCase());
                if(result>=0) {
                    existSearch++;
                    return (
                        <li key={index} onClick={this.selectService.bind(this, item.services_id, item.services_title)} >{item.services_title}</li>
                    );
                }
            });
        }
        if(existSearch===0) {
            this.setState({searchListService:Parser('<li>No record found</li>'), existSearch:existSearch});
            
        }
        else {
            this.setState({searchListService:service, existSearch:existSearch});
        }
        
    }

    selectService(services_id, services_title) {
        this.setState({services_id:services_id, searchListService:'', errorMsg:'', search_data:services_title, existSearch:0});
    }

    findService() {
        if(this.state.services_id!=='') {
            this.props.history.push({ pathname: '/customer/genrun/service/'+this.state.services_id,state: { transId2:  ''}})
        }
        else {
            this.setState({errorMsg:'Please choose your services'})
        }
    }
    render() {  	
        return (
                <div>	
                    <Header />           
                    <DivSection activepage='run' />
                    <div className="customer_home_banner">
                        <img src={LandingBanner} alt="LandingBanner" className="chb_banner" />
                        <div className="cus_home_banner_content">
                            <div className="cus_home_banner_innercontent">
                                <div className="cus_home_heading">
                                    {lang.customer.home.banner_title}
                                </div>
                                <div className="cus_home_form">
                                    <div className="form-group">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            placeholder={lang.customer.home.choose_services}
                                            value={this.state.search_data}
                                            onChange={this.handleChangeTxt.bind(this, 'search_data')}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text id="basic-addon2"><button type="button" className="btn btn_orange animate-btn2 chb_btn" onClick={this.findService.bind(this)}>{lang.customer.home.find_btn}</button></InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        {(this.state.errorMsg!=="") &&
                                            <div className="cus_home_error">
                                                {this.state.errorMsg}
                                            </div>  
                                        }
                                        { (this.state.searchListService!=='') &&
                                            <div className="services-search-list">
                                                <div className="inner-services-search-list">
                                                    <ul>
                                                        {this.state.searchListService}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gen-service-list-wrapper">
                        <div className="container">
                            <div className="gen-service-list">
                            <div className="genrun_Heading">
                                <h2>{lang.customer.home.popular_services}</h2>
                            </div>
                            <div className="gen-service-list-inner">
                                {(this.state.loading===true)?LoadingSec:''}
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
                    <Footer />
                </div>
            );
        }
}

const mapStateTopProps = (state) => {
  return {
      servicedata: state.service,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getRequestService: (addservice, usertoken, page) => {
        dispatch({ type: GET_REQUESTSERVICE, addservice, usertoken, page:page });
      },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Home));
