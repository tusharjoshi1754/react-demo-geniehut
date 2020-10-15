import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  GET_SUBSCRIPTIONDATA, GET_SERVICESUBSCRIPTION, GET_UPDATESUBSCRIPTION } from '../../actions';
import cookie from 'react-cookies';
import { appName } from "../Config/Config";
import $ from 'jquery';
import SuccessMsg from '../../common/images/success-msg.png';

class SubscriptionMore extends Component {
constructor(props) {
    super(props);
    this.state = {
      selectedOptions:null,
      user_token: cookie.load('UserAuthToken'),
      serviceslist:[],
      selectedservices:[],
      asktocall:'',
      checked: false,
      equtochecked: false,
      premiumchecked: false,
      equotation: '',
      premiumlist: '',
      checkdistrict: false,
      checkalldistrict: '',
      district_select: [],
      disableduration: 'Isdisable',
      selectDurations: null,
      checkedall:false,
    }
    this.props.getSubscriptiondata(cookie.load('UserAuthToken'));
    this.setselectedvalue = this.setselectedvalue.bind(this);	
 }
 
 SubscriptionMoreClose() {
    this.setState(prevState => ({
      modalHowGenWorks: !prevState.modalHowGenWorks
    }));
}
 
  componentDidMount(){
    if(!cookie.load('login_user_type') && !cookie.load('UserAuthToken')){
            window.location.href = "/logout";

    }
  }

 closepopup(){
    cookie.save('EnableGenPro','No')
    $('.genie-close-btn').click( function(event) {
         $(this).parents("#genie-popup").removeClass("genie-popup-open");
    });
    window.location.href = "/edit-gen-pro";
  }


  handleFormSubmit = () => {
    if(this.validateForm()){
          const formPayload = this.state;
          var qs = require('qs');
          if(formPayload.checked == true){
             var smscallback = 'on';
          } 

          if(formPayload.equtochecked == true){
             var equotation = 'on';
          }

          if(formPayload.premiumchecked == true){
            var featured_listing = 'on';


          }

          if(formPayload.selectedOptions){
          var serviceid = formPayload.selectedOptions[0].value; 
          }

          if(formPayload.selectDurations !== ''){
          var duration = formPayload.selectDurations.value;
          } 

          var postObject = {
          "app_name": appName,
          "user_token": formPayload.user_token,
          "serviceId": serviceid,
          "smscallback": smscallback,
          "equotation": equotation,
          "featured_listing": featured_listing,
          "district": formPayload.district_select,
          "duration": duration
        }
       this.props.getUpdateSubscription(qs.stringify(postObject));
    }
  }

    validateForm() {
    
    const { premiumchecked, district_select, selectDurations, checkdistrict } = this.state;
    let errors = {};
    let formIsValid = true;

    if (premiumchecked == true && district_select == '') {
      formIsValid = false;
      $('.errorcheckdistrict').html('<span class="errorspan">Please Select any district </span>');
    }else if (premiumchecked == false && district_select == '') {
      $('.errorcheckdistrict').html('');
    }else if (premiumchecked == true && district_select != '' ) {
       $('.errorcheckdistrict').html('');
    }

    if(premiumchecked === true && selectDurations.value == 0){
      formIsValid = false;
      $('.errorduration').html('<span class="errorspan">Please choose any duration </span>');
    }else if (premiumchecked == false && selectDurations.value != 0) {
      $('.errorduration').html('');
    }else if(premiumchecked == true && selectDurations.value != 0){
      $('.errorduration').html('');
    }

    return formIsValid;
  }

 componentWillReceiveProps(Props) {

     if(Object.keys(Props.subscriptiondata).length > 0) {
        if(Props.subscriptiondata !== this.props.subscriptiondata){
            if(Props.subscriptiondata[0].status ===  "success"){
                this.setState({district_select :Props.subscriptiondata[0].result_set.district_ids})
                {/*for list out the pro user services*/}
                 if(Props.subscriptiondata[0].servicedata !== ''){
                    const servicedata = Props.subscriptiondata[0].servicedata;
                     this.setState({serviceslist:servicedata})
                 }

                {/* for dynamic enable subscription type*/}
                if(Props.subscriptiondata[0].result_set.sms_callback_data !== null){
                    const subsdata = Props.subscriptiondata[0].result_set.sms_callback_data;
                    if(subsdata.featured_status === 'Y'){
                        this.setState({checked : true})
                    }else{
                        this.setState({checked : false})
                    }
                }else{
                      this.setState({checked : false})
                }

                {/* for dynamic enable equotation  subscription type*/}
                if(Props.subscriptiondata[0].result_set.quotation_data !== null){
                    const quodata = Props.subscriptiondata[0].result_set.quotation_data;
                    if(quodata.featured_status === 'Y'){
                        this.setState({equtochecked : true})
                    }else{
                        this.setState({equtochecked : false})
                    }
                }else{
                      this.setState({equtochecked : false})
                }

              {/* for dynamic enable premium listing subscription type*/}
                if(Props.subscriptiondata[0].result_set.featured_data !== null){
                    const preimumdata = Props.subscriptiondata[0].result_set.featured_data;
                    if(preimumdata.featured_status === 'Y'){
                        this.setState({premiumchecked : true})
                    }else{
                        this.setState({premiumchecked : false})
                    }
                }else{
                      this.setState({premiumchecked : false})
                }
               if(Props.subscriptiondata[0].result_set.selectedservices!=undefined){
                this.setselectedvalue(Props.subscriptiondata[0].result_set.selectedservices)
               }

                if(Props.subscriptiondata[0].result_set.featured_data !== null){

                const duration = Props.subscriptiondata[0].result_set.featured_data.featured_duration;
                if(duration !== ''){
                  this.setState({disableduration: ''})
                }
                if(duration == 1){
                  this.setState({selectDurations:{ value: '1', label: 'One Week' }})
                }else if(duration == 2){
                  this.setState({selectDurations:{ value: '2', label: 'Two Week' }})
                }else if(duration == 3){
                  this.setState({selectDurations:{ value: '3', label: 'Three Week' }})
                }else if(duration == 4){  
                  this.setState({selectDurations:{ value: '4', label: 'Four Week' }})
                }else{
                  this.setState({selectDurations:{ value: '0', label: 'Select Duration' }})
                }

              }else{
                  this.setState({selectDurations:{ value: '0', label: 'Select Duration' }})
                  this.setState({disableduration: 'Isdisable'})
              }
            }
        }
     }

      if(Object.keys(Props.updatesubscription).length > 0) {
        if(Props.updatesubscription[0].status === 'success'){
            cookie.remove("UserPoints");
            $("#genie-popup").addClass("genie-popup-open");
            $('.genie-msg-popup-body').html('<div class="state_img text-center"><img src="'+SuccessMsg+'" alt="SuccessMsg" /></div><h2 class="title3">Success</h2><p>Successfully updated subscription</p> ');
            cookie.save("UserPoints",Props.updatesubscription[0].result.points)

        }
     }
}
setselectedvalue(selectedservices){
    const selectedArray = selectedservices.map ((serviceName, index) => ({
    id: index,
    name: serviceName,
    }));
    // Dynamically create select list
    let selectedseservices = [];
    selectedArray.map(item =>
    selectedseservices.push({ label: item.name.label, value: item.name.value }),
    );
    this.setState({selectedOptions : selectedseservices})
}

handleChange = (selectedOptions) => {
this.setState({ selectedOptions });
    if(this.state.selectedOptions!==''){
      // $('.errorservices').html('');
    }
  //this.props.getServiceSubscription(selectedOptions.value, cookie.load('UserAuthToken'));
  this.props.getSubscriptiondata(cookie.load('UserAuthToken'),selectedOptions.value);
}
handleChangeduration = (selectDurations) => {
  this.setState({ selectDurations });
}
handleAsktocall  = (event) => {
    if(event.target.checked === true){
         this.setState({asktocall: 1});
    }else if(event.target.checked === false){
        this.setState({asktocall: 0});
    }
     this.setState({checked: !this.state.checked});
}

handleEquota  = (event) => {
    if(event.target.checked === true){
         this.setState({equotation: 1});
    }else if(event.target.checked === false){
        this.setState({equotation: 0});
    }
     this.setState({equtochecked: !this.state.equtochecked});
}
handlePremiumlist = (event) => {
   if(event.target.checked === true){
         this.setState({premiumlist: 1});
         this.setState({disableduration : ''})
    }else if(event.target.checked === false){
        this.setState({premiumlist: 0});
        this.setState({disableduration : 'Isdisable'})
    }
     this.setState({premiumchecked: !this.state.premiumchecked});
}
handleDisctrictcheck = (event) => {
   if(event.target.checked === true){
         this.setState({checkalldistrict: 1});
    }else if(event.target.checked === false){
        this.setState({checkalldistrict: 0});
    }
     this.setState({checkdistrict: !this.state.checkdistrict});
     this.setState({district_select: 'All'})
}

handleChangeCheck  = (event) => {
    var districtArr = [...this.state.district_select];
    const value = event.target.value
    const index = districtArr.findIndex(district_select => district_select === value);
    if(index > -1) {
    districtArr = [...districtArr.slice(0, index), ...districtArr.slice(index + 1)]
    } else {
    districtArr.push(value);
    }
    this.setState({district_select: districtArr});
}

 getDistrictAll() {
    var districtlist = this.props.subscriptiondata[0];
    if(districtlist!== undefined && districtlist!== null){
      if(Object.keys(districtlist).length > 0) {
		  var districtArr = this.state.district_select;
         const districtDetails = districtlist.result_set.featured.map((districts, districtIndex) => {

				var indicheckFlag = false;
                var selectdistrict = this.props.subscriptiondata[0].result_set.district_ids;
                if(Object.keys(districtArr).length > 0){ 
                  if(districtArr.indexOf(districts.districts_id) !== -1){
					           indicheckFlag = true;
                   }
                 }
                 if(this.state.checkalldistrict == 1){
                   indicheckFlag = true;
                 }

               
            return (
                    <div className="custom_checkbox" key={districts.districts_id}>
                    <input type="checkbox" id="indicheck" name="enable_districts" onClick={this.handleChangeCheck.bind(this)} value={districts.districts_id} checked={indicheckFlag}/><span>{districts.districts_name}</span>
                    </div>
                  );
    
       });
      return districtDetails;
     }
    } else {
      return '';
    }
  }


render() {
    if(this.state.premiumchecked === false){
      var IsDisable = 'SMLB_districts_checkbox_wrap disable_section_wrap';
    }else{
       IsDisable = 'SMLB_districts_checkbox_wrap';
    }
    const durations = [
        { value: '0', label: 'Select Duration' },
        { value: '1', label: 'One Week' },
        { value: '2', label: 'Two Week' },
        { value: '3', label: 'Three Week' },
        { value: '4', label: 'Four Week' },
      ];

        const serviceslist = this.state.serviceslist;
        const serviceArray = this.state.serviceslist.map ((serviceName, index) => ({
        id: index,
        name: serviceName,
        }));
        // Dynamically create select list
        let options = [];
        serviceArray.map(item =>
        options.push({ label: item.name.label, value: item.name.value }),
        );

    return (
  <>
    <div className="SubscriptionMore_modal_wrapper">
        <div className="SubMore_modal_select">
            <label>Services</label>
            <div className="re_select">
                 <Select  
                        isSearchable
                        value={this.state.selectedOptions}
                        onChange={this.handleChange}
                        options={options}
                        autoFocus={true} />
            </div>
        </div>
        <div className="SubscriptionMore_list_box">
            <div className="SMLB_content">
                <h3>Ask to call</h3>
                <p>Ask to call each sms will be charged 10 points</p>
            </div>
            <div className="SMLB_toggle">
                <div className="gen-toggle SMLB_switch">
                    <div className="yn_check">
                         <input type="checkbox" checked ={this.state.checked}  onClick={this.handleAsktocall.bind(this)} value={this.state.asktocall} />
                        <span></span>
                    </div>
                </div>
            </div>
        </div>    
        <div className="SubscriptionMore_list_box">
            <div className="SMLB_content">
                <h3>E-quotation</h3>
                <p>1 points will be charged</p>
            </div>
            <div className="SMLB_toggle">
                <div className="gen-toggle SMLB_switch">
                    <div className="yn_check">
                        <input type="checkbox" checked ={this.state.equtochecked}  onClick={this.handleEquota.bind(this)} value={this.state.equotation} />
                        <span></span>
                    </div>
                </div>
            </div>
        </div>    
        <div className="SubscriptionMore_list_box">
            <div className="SMLB_content">
                <h3>Premium listing</h3>
                <p>Premium listing can be done in mulitiple option, will be charged 5 points</p>
            </div>
            <div className="SMLB_toggle">
                <div className="gen-toggle SMLB_switch">
                    <div className="yn_check">
                        <input type="checkbox" checked ={this.state.premiumchecked}  onClick={this.handlePremiumlist.bind(this)} value={this.state.premiumlist} />
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div className={IsDisable}>
            <div className="SMLBCD_wrap">
               <label>Choose Districts</label>
                <div className="custom_checkbox">
                    <input type="checkbox" name="checkall_districts" checked={this.state.checkdistrict} onChange={this.handleDisctrictcheck.bind(this)} /><span>Check All</span>
                </div>
            </div>

            <div className="SMLB_checkbox_wrap">
               {this.getDistrictAll()}
            </div>
            <div className='errorcheckdistrict'></div>
       </div>    
        <div className="SubMore_modal_select">
            <label>Choose Duration</label>
            <div className="re_select">
               <Select  
                        isSearchable
                        value={this.state.selectDurations}
                        onChange={this.handleChangeduration}
                        options={durations}
                        autoFocus={true} 
                        isDisabled={this.state.disableduration?true:false} />
              <div className='errorduration'></div>
            </div>
        </div> 
  </div>
        
        <button className="btn btn_blue btn_minwid btn-width animate-btn2" type="button" onClick={this.handleFormSubmit.bind(this)}>Subscribe
         </button>

        <div className="genie-msg-popup-wrapper" id="genie-popup">
            <div className="genie-msg-popup-inner-wrapper">
                <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                  <div className="genie-msg-popup-body">
                </div>
                 <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
            </div>
        </div>

   </>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
  subscriptiondata: state.subscriptiondata,
  subscriptionservice: state.subscriptionservice,
  updatesubscription: state.updatesubscription
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       getSubscriptiondata: (usertoken,serviceIds) => {
          dispatch({ type: GET_SUBSCRIPTIONDATA, usertoken, serviceIds });
        },
      getServiceSubscription: (serviceIds,usertoken) => {
        dispatch({ type: GET_SERVICESUBSCRIPTION, serviceIds, usertoken });
      },
      getUpdateSubscription: (formPayload) => {
        dispatch({ type: GET_UPDATESUBSCRIPTION, formPayload });
      },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SubscriptionMore));

