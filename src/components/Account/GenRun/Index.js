/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import SecondaryHeader from '../../Layout/SecondaryHeader';
import Genprotabs from '../Genprotabs';
import Icoprofile from '../../../common/images/ico_profile.png';
import QnMarkDefault from '../../../common/images/qn_mark_default.png';
import FileUpload from '../../../common/images/File_Upload.png';
import Profilebar from '../Profilebar';
import Genleftmenu from '../../Layout/Genleftmenu';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { appName } from "../../Config/Config";
import SuccessMsg from '../../../common/images/success-msg.png';

import { GET_GENRUNPROFILE, GET_RUNUSERDETAILS, GET_DISTRICT, GET_POINTS } from '../../../actions';
import { PageTitle, scrollToTopValidate, CheckAuth, scrollToTop } from "../../Helpers/SettingHelper";

class Index extends Component {
    constructor(props) {
        CheckAuth();
        super(props);
        this.state = {
          user_token: cookie.load('UserAuthToken'),
          progressperc: '',
          genrun_short_desc:'',
          displaycheck:true,
          displaygender:true,
          disable_abouturself:false,
          checked: false,
          ProtypeText: 'Disabled',
          user_image: [],
          user_image_name: "",
          user_image_preview: "",
          enablevalue:'',   
          disablegender: '',
          loading:false,
          district:[],
          selecteddistrict:null,
          LoginType:cookie.load('login_user_type'),
          points:[],
          userpoints:''
        }
     
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setAlldistrict = this.setAlldistrict.bind(this); 
    }
    componentDidMount(){
     document.title = PageTitle('GenRun Details');
      this.props.getPoints();
      this.props.getRunUserDetails(cookie.load('UserAuthToken'));
      this.props.getDistrict();
        
      $(document).click(function(e) {		
        if (!$(e.target).is('.genie-msg-popup-wrapper, .genie-popup-open * ')) {
            if ($('.genie-msg-popup-wrapper').is(":visible")) {                
                $(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
            }
        }
      });
    }
    componentWillReceiveProps(Props) {

        if(Props.district != this.props.district){
          const districtList = [{value:'0', label: 'Everywhere in singapore'}];
          Props.district[0].district_list.map(function(item){  
            districtList.push({
                  value: item.value,
                  label: item.label
              });
          });
          this.setState({district:districtList});
        }

        if(Object.keys(Props.genrunprofiledata).length > 0) {

        if(Props.genrunprofiledata != this.props.genrunprofiledata){

          if(Props.genrunprofiledata[0].status === "success"){

            let progress =  Props.genrunprofiledata[0].progressperc;
            
            $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
            $(".genie-msg-popup-wrapper").parents("body").addClass("genie-popup-shade");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Successfully Updated</p> ');
              cookie.save("UserPoints",Props.genrunprofiledata[0].user_points)
              this.setState({userpoints: Props.genrunprofiledata[0].user_points})
              if(Props.genrunprofiledata[0].login_user_type!==''){
                //this.setState({LoginType: Props.genrunprofiledata[0].login_user_type})
              }
             this.setState({ progressperc : Math.round(progress)})
  
          }
        }
      }

          if(Object.keys(Props.updaterundetails).length > 0){
            this.setState({loading:false});
            //scrollToTop();
            if(Props.updaterundetails != this.props.updaterundetails){
              
              if(Props.updaterundetails[0].status === "success"){

                let progress = Math.round(Props.updaterundetails[0].progressperc);

                const formdata = Props.updaterundetails[0].genrundata;
                let genrun_short_desc;
                if(formdata.genrun_short_desc!== 'undefined'){
                    genrun_short_desc = formdata.genrun_short_desc;
                }else{
                    genrun_short_desc = '';
                }
                this.setState({genrun_short_desc: genrun_short_desc, progressperc: progress});
                
                const selecteddistrict = [];
                Props.updaterundetails[0].distrcit.map(function(item){  
                selecteddistrict.push({
                      value: item.districts_id,
                      label: item.districts_name
                  });
                });
                this.setState({selecteddistrict:selecteddistrict});
                
              
                if(Props.updaterundetails[0].runstatus === 'A'){
                      this.setState({ProtypeText: 'Disable'});
                      this.setState({checked:false});
                    }else if(Props.updaterundetails[0].runstatus === 'I'){
                      this.setState({ProtypeText: 'Enable'})
                      this.setState({
                                    checked: true
                      })
                }
                if(formdata['publishyourself'] == 1){
                        this.setState({displaycheck: true});
                        this.setState({disable_abouturself: false});
                }else{
                  this.setState({displaycheck: false});
                }
                if(formdata['publishgender'] == 1){
                        this.setState({displaygender: true});
                        this.setState({disablegender : ''});
                }else{
                  this.setState({displaygender: false});
                }
                this.setState({ progressperc : progress})

              }else{
                  const progress = Props.updaterundetails[0].progressperc;
                  this.setState({progressperc: progress});       
                  if(Props.updaterundetails[0].runstatus === 'A'){
                      this.setState({ProtypeText: 'Disable'});
                      this.setState({checked:false});
                    }else if(Props.updaterundetails[0].runstatus === 'I'){
                      this.setState({ProtypeText: 'Enable'})
                      this.setState({
                                    checked: true
                      })
                }
              }
            }
          }
            if(Props.points !== this.props.points){
              this.setState({points:Props.points[0].result_set});
            }
      }
  handleChangeCheck  = (event) => {
      const {name, value} = event.target;
      if(name === 'enableabouturself'){
        this.setState({displaycheck: !this.state.displaycheck});
        this.setState({disable_abouturself: !this.state.disable_abouturself});
      }else if(name === 'enablegender'){
        if(event.target.checked == true){
          this.setState({disablegender: ''})
        }else{
          this.setState({disablegender: 'isDisabled'})
        }
        this.setState({displaygender: !this.state.displaygender});
      }
  }
  handleDistrictChange = (event) => {
     this.setState({selecteddistrict : event}, function() {

            const dist_list = this.state.selecteddistrict;
            if(dist_list){
              const listItems = dist_list.map((district) =>
              this.setAlldistrict(district)
            );
            }

       });

  };
 
 setAlldistrict(district){
  if(district.value === '0'){
    this.setState({selecteddistrict: this.state.district})
    this.state.district.shift();
  }
 }
handleMenuClose = () => {
  const membersToRender = this.state.district.filter(member => member.value)
  const numRows = membersToRender.length
  if(numRows == 28){
     const districtList = [{value:'0', label: 'Everywhere in singapore'}];
          this.state.district.map(function(item){  
            districtList.push({
                  value: item.value,
                  label: item.label
              });
          });
          this.setState({district:districtList});
  }
}
  handledisable = (event) => {
    
    const{name,value} = event.target;
    if(event.target.checked == true){
      this.setState({ProtypeText:'Disable'})
    }
    else if(event.target.checked == false){
      this.setState({ProtypeText:'Enable'})
    }
    this.setState({checked: !this.state.checked});
  }


  handleInputChange(event) {
     const {name, value} = event.target;
   
      this.setState({
        [name]: value
      });
      } 

  handleFormSubmit = () => {

    if(this.validateForm()){

      const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
      };

      const formPayload = this.state;


      if(formPayload.displaycheck == true){
            var publishyourself = 1;
      }else{
            var publishyourself = '';
      }
      if(formPayload.displaygender == true){
        var publishgender = 1;
      }else{
        var publishgender ='';
      }

      if(formPayload.checked == true){
        var disablePro = 'yes';
      }else{
        var disablePro = 'no';
      }


      const numbers = formPayload.selecteddistrict;
      var elements=[];
      let districtList  = ''
      if(numbers!=='' && typeof numbers!==undefined && numbers!==null) {
        districtList = numbers.map((number) =>
          elements.push(number.value)
        );
      }
      
      var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "user_token": formPayload.user_token,
      "assign_code": 'formdata',
      "genrun_short_desc": formPayload.genrun_short_desc,
      "disablePro": disablePro,
      "publishyourself": publishyourself,
      "publishgender": publishgender,
      "district": elements,
      "existdistrict":'',
      };

      let formData = new FormData();
      for(let k in postObject) {
        formData.append(k, postObject[k]);
      }
      this.setState({loading:true});
      this.props.getGenrunProfile(formData,config);

    }
 }

   validateForm(){

    const {genrun_short_desc, selecteddistrict} = this.state;
    let errors = {};
    let formIsValid = true;
    if (genrun_short_desc == '' && this.state.checked==false) {
      formIsValid = false;
      $('.errordescr').html('<span class="errorspan">Please enter about yourself</span>');
    }else if(genrun_short_desc!=''){
      $('.errordescr').html('');
    }
    if ((selecteddistrict === ''  || selecteddistrict ===null || Object.keys(selecteddistrict).length === 0) && this.state.checked==false) {
      formIsValid = false;
      $('.errordistrict').html('<span class="errorspan">Please select available district</span>');
    }else if(selecteddistrict!=''){
      $('.errordistrict').html('');
    }
    $(".editprofile_submit").removeClass('loading loading_data');
    if(formIsValid===false) {
      if($('.errorspan').length>0) {
        scrollToTopValidate();
      }
      
    }
    return formIsValid;
  }

   closepopup(){
      cookie.save('EnableGenRun','No');      
		  $('.genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      $('.genie-close-btn').parents("#genie-popup").removeClass("genie-popup-open");
      $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
    }

 

render() {


if(this.state.checked == true){
    var IsDisable = 'form_sec disable_section_wrap';
  }else{
    var IsDisable = 'form_sec';
}
   return (
        <div>
        <Header userPoints={this.state.userpoints}/>
        <SecondaryHeader />
            <Profilebar  userPoints={this.state.userpoints}/>
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <Genleftmenu currentpage="GenRun" />
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                <ul className="sdhmenu_tablist">
                                    <li className="active">
                                         <Link to={"/edit-gen-run"} title="GenRun Details">Details</Link>
                                    </li>
                                     <li>
                                        <Link to={"/genrun-my-services"} title="My Services">My Services</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genrun-customerleads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                </ul>

                                <Link to={"/edit-gen-run"} className="sdhmenu_mtabtrigger active" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">                                    
                                    <form className={IsDisable}>
                                        <div className="general-info-tab-wrapper mb20">
                                            <div className="general-info-header">
                                                <div className="general-info-header-inner">
                                                    <div className="gfh-flexbox-2">
                                                        <div className="gfh-progress-wrapper">
                                                            <div className="gfh-progress-bar">
                                                                <div className="gfh-progress-percent"><span>0%</span><span>100 %</span></div>
                                                                <ProgressBar now={this.state.progressperc} />
                                                                 <div className="gfh-progress-update"><p>Updated <span>{this.state.progressperc} %</span></p></div>
                                                            </div>
                                                            {(this.state.progressperc<=99) &&
                                                             <p>Update GenRun Profile detail 100% to get <span className="gfh-green">{(this.state.points!=='' && this.state.points.GRUPDATE!=='' && typeof this.state.points.GRUPDATE!=='undefined')?this.state.points.GRUPDATE:0} GH Points</span></p>
                                                            }
                                                            <p><b>Reminder:</b> Press “Update” button at the bottom of the page to save your input information before navigating to another page</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className="form-group GH_flex_start">
                                            <Row>
                                               <Col md={12}>
                                                    <label>
                                                        About yourself <span className="required">*</span>
                                                     </label>
                                                    <textarea className="form-control about_self" name="genrun_short_desc" value={this.state.genrun_short_desc} onChange={this.handleInputChange} autoComplete="off"></textarea>
                                                    <div className="errordescr"></div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group GH_flex_start">
                                            <Row>
                                                <Col md={12}>
                                                    <div className="check-input-wrap ciw-row ml-0">
                                                       <label>
                                                        Choose district to sell your service <span className="required">*</span>
                                                        </label>
                                                        <div className="custom_inputbox">
                                                        <Select 
                                                         options={this.state.district}
                                                         value={this.state.selecteddistrict}
                                                         placeholder="Select District"
                                                         onChange={this.handleDistrictChange}
                                                         isMulti={true}
                                                         withAll={true}
                                                         onMenuClose={this.handleMenuClose}
                                                         />
                                                        </div>
                                                        <div className="errordistrict"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                             <div className="p-tag info-website">Information to publish on the website
                                                <div className="tooltip_ico">
                                                    <ButtonToolbar>
                                                      {['top'].map(placement => (
                                                        <OverlayTrigger
                                                          key={placement}
                                                          placement={placement}
                                                          overlay={
                                                            <Tooltip id={`tooltip-${placement}`}>
                                                              If you tick the boxes, we publish the selected details on the website
                                                            </Tooltip>
                                                          }
                                                        >
                                                          <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                        </OverlayTrigger>
                                                      ))}
                                                    </ButtonToolbar>
                                                </div>
                                                </div>
                                             
                                            <Row>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                           <input type="checkbox" onChange={this.handleChangeCheck.bind(this)}  name="enableabouturself" checked={this.state.displaycheck}/><span>About Youself</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                               
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="check-input-wrap ciw-row">
                                                        <div className="custom_checkbox">
                                                           <input type="checkbox" onChange={this.handleChangeCheck.bind(this)}  name="enablegender" checked={this.state.displaygender}/><span>Gender</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                       
                                        </div>
                                   </form>
                                   <Row>
                                              <Col md={6}>
                                                 <p className="info-website mt0">GenRun Services</p>
                                                  <div className="check-input-wrap ciw-row ciw-inbl">
                                                      <div className="custom_checkbox">
                                                         <input onChange={this.handledisable.bind(this)} type="checkbox"  name="enablerun_services" checked={this.state.checked}/>
                                                          <span>{this.state.ProtypeText?'Disable':'Enable'}</span>
                                                           
                                                          <div className="tooltip_ico">
                                                              <ButtonToolbar>
                                                                {['top'].map(placement => (
                                                                  <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                      <Tooltip id={`tooltip-${placement}`}>
                                                                         {this.state.ProtypeText?'Disable Your Genrun service':'Enable Your Genrun service'}
                                                                      </Tooltip>
                                                                    }
                                                                  >
                                                                    <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                                  </OverlayTrigger>
                                                                ))}
                                                              </ButtonToolbar>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </Col>
                                          </Row>
                                      <div className="form-group mt15">
                                      <button className="btn btn_orange btn_minwid editprofile_submit animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)}>
                                        {this.state.loading ===true &&
                                        <span class="load-data">Loading</span> 
                                        }
                                        Update
                                            </button>
                                      </div>
                                </div>
                                <Link to={"/genrun-my-services"} className="sdhmenu_mtabtrigger" title="GenRun Details">My Services <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-customerleads"} className="sdhmenu_mtabtrigger" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />            
            <div className="genie-msg-popup-wrapper" id="genie-popup">
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

const mapStateTopProps = (state) => {
  return {
    points            : state.points,
    genrunprofiledata : state.genrunprofile,
    updaterundetails  : state.updaterundetails,
    district          : state.district,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPoints: () =>{
       dispatch({ type: GET_POINTS});
    },
    getGenrunProfile: (formPayload) => {
      dispatch({ type: GET_GENRUNPROFILE, formPayload});
    },
    getRunUserDetails: (usertoken) => {
      dispatch({ type: GET_RUNUSERDETAILS, usertoken});
    },
    getDistrict: () => {
      dispatch({ type: GET_DISTRICT});
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Index));