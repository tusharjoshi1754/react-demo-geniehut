/* eslint-disable */
import React, { Component } from "react";
import Select from "react-select";
import { Row, Col,ProgressBar,OverlayTrigger, ButtonToolbar, Tooltip, Button } from "react-bootstrap";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Icoprofile from "../../common/images/ico_profile.png";
import QnMarkDefault from '../../common/images/qn_mark_default.png';
import ModalPopup from '../Layout/ModalPopup';
import ImageSuccess from "../../common/images/success.png";
import GHpoints_Content from '../Layout/GHpoints';
import { appName, profileImage } from "../Config/Config";
import { isNumber } from "../Helpers/SettingHelper";
import Parser from 'html-react-parser';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

import { GET_IPDATA,  GET_IMAGEPROFILE, GET_USERPROFILE, GET_TRANSFER, GET_MOBILE_COUNTRY} from '../../actions';

class Profilebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
       clientip:'',
      user_mobile: '',
      user_fullname: '',
      user_nickname: '',
      user_email: '',
      user_points: 0,
      user_token: cookie.load("UserAuthToken"),
      user_image: [],
      user_image_name: "",
      user_image_preview: "",
      isHidden: false,
      pathname:window.location.pathname,
      modalTransferpoints:false,
      transferuser:'',
      transferponts:'',
      error_transferuser:'',
      error_transferponts:'',
      error_transfer:'',
      success_transfer:'',
      transferloading:false,
      countryList:[],
      followercount:'',
      followingcount:'',
      followActive:(this.props.follow!=='' && typeof this.props.follow!=="undefined")?this.props.follow:'',
      validphone: ''
    
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.toggleGHpoints = this.toggleGHpoints.bind(this);
    this.toggleTransferpoints = this.toggleTransferpoints.bind(this);
    
  }

  toggleHidden() {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  } 

  componentDidMount(){
    this.props.getUserProfile(cookie.load('UserAuthToken'));
    if(this.state.pathname == '/wallet'){
      this.setState({profiletbar:'profile_tbar'});
    }else if(this.state.pathname!='/wallet'){
      this.setState({profiletbar:'profile_tbar'});
    }
  }
  toggleGHpoints() {
    this.setState(prevState => ({
      modalGHpoints: !prevState.modalGHpoints
    }));
  }

  toggleTransferpoints() {
     var qs = require('qs');
      var postObject = {
      "app_name": appName,
      "ipaddress": cookie.load('ipaddress')
      };
    this.props.getMobileCountry();
    this.props.getIpData(qs.stringify(postObject));
    if(this.state.modalTransferpoints===true) {
      this.setState({success_transfer:'', error_transfer:'',transferloading:false,error_transferponts:'',transferponts:'',error_transferuser:'', transferuser:'',})
    }
    this.setState(prevState => ({
      modalTransferpoints: !prevState.modalTransferpoints
    }));
  }
  
  componentWillReceiveProps(Props) {
      if(Props.ipaddress !==this.props.ipaddress){
        
        if(Props.ipaddress[0]!=''){
          this.setState({clientip :Props.ipaddress[0]});
        }
     }
     
     if(Props.userPoints!=='' && typeof Props.userPoints!=="undefined" && Props.userPoints !== this.state.user_points){
      this.setState({user_points:Props.userPoints});
     }
     
       if(Props.userprofile !== this.props.userprofile){
               if(Props.userprofile[0].status === 'success'){
                  const formdata = Props.userprofile[0].result_user_set;
                  if(formdata.user_fullname!=''){
                      this.setState({ user_fullname : formdata.user_name})
                  }
                  if(formdata.user_nickname!=''){
                      this.setState({ user_nickname : formdata.user_nickname})
                  }
                  if(formdata.user_email!=''){
                      this.setState({ user_email : formdata.user_email})
                  }
                  if(formdata.user_mobile!=''){
                      this.setState({ user_mobile : formdata.user_mobile})
                  }
                  if(formdata.user_points!=''){
                      this.setState({ user_points : formdata.user_points})
                  }
                  if(formdata.user_profile_image!='' && formdata.user_profile_image!=null){
                    var imgsrc = profileImage+formdata.user_profile_image+"";
                    this.setState({ user_image_preview : imgsrc})
                  }                
                  if(Props.userprofile[0].followercount !== 0 && Props.userprofile[0].followercount !== '' && Props.userprofile[0].followercount !== null){
                    this.setState({ followercount: Props.userprofile[0].followercount})
                  }
                  if(Props.userprofile[0].followingcount !== 0 && Props.userprofile[0].followingcount !== '' && Props.userprofile[0].followingcount !== null){
                    this.setState({ followingcount: Props.userprofile[0].followingcount})
                  }
               }
       }
       if(Props.imageprofile!= this.props.imageprofile){
          if(Props.imageprofile[0].status === 'success'){
              this.toggleHidden()
                setTimeout(
                  function() {
                    this.setState({isHidden: false})
                  }
                  .bind(this),
                  3000
                );
           }
       }
       if(Props.transferdata !== this.props.transferdata){
          this.setState({transferloading:false});
          if(Props.transferdata[0].status === 'success'){

                this.setState({error_transfer:'',user_points: Props.transferdata[0].user_points});
                const data = this;

                this.setState(prevState => ({
                modalTransferpoints: !prevState.modalTransferpoints
                }));

                this.props.getUserProfile(cookie.load('UserAuthToken'));

                this.setState({success_transfer:Parser('<div class="success"> <span>'+Props.transferdata[0].message+'</span></div>')});
                setTimeout(function() {
                  data.setState({success_transfer:''});
                }, 3000);

          }
          else {
            this.setState({error_transfer:Parser('<div class="error"> <span>'+Props.transferdata[0].message+'</span></div>')});
            this.setState({success_transfer:''});
          }
        
       }
       if(Props.mobilecountry !==this.props.mobilecountry){
        this.setState({mobilecountry:Props.mobilecountry[0].result_set}, function() {
          this.loadCountryList();
        });
      }
       
  }
  loadCountryList() {
		var country= [];
    if(this.state.mobilecountry!=="" && typeof this.state.mobilecountry!=="undefined") {
      this.state.mobilecountry.map(function(countries){
          country.push(countries.short_code.toLowerCase());
      });
    }
    this.setState({countryList:country});
	}

  onClickHandler = ( file, uploaded ) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      var user_img = '';
      user_img = file;
      var qs = require('qs');
              var postObject = {
              "app_name": appName,
              "user_token" : cookie.load('UserAuthToken'),
              "user_image": user_img
              };
      let formData = new FormData();
      for(let k in postObject) {
        formData.append(k, postObject[k]);
      }

     this.props.getImageProfile(formData,config);

  }

handleInputChange(items, event) {
  if(items==="transferponts") {
    this.setState({[items]:event.target.value});
    if(parseInt(this.state.user_points)<parseInt(event.target.value)) {
      this.setState({['error_'+items]:Parser('<span class="errorspan">Only allowed '+this.state.user_points+' points</span>')})
    }
    else {
      this.setState({['error_'+items]:''});
    }
  }
  else {
    this.setState({[items]:event.target.value});
    if(event.target.value!='') {
      this.setState({['error_'+items]:''});
    }
  }
  
}

  onChangeHandler=event=>{
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        user_image_name: file.name,
        user_image_preview: reader.result,
        image: file
      });
    };

    reader.readAsDataURL(file);
    this.onClickHandler(file, 'uploaded');
}
  createTransfer() {
    let error = 0;
    if(this.state.transferuser=='') {
        error++;
        this.setState({error_transferuser:Parser('<span class="errorspan">Please enter beneficiary mobile number</span>')})
    }else {
      if(this.state.validphone === false){
          error++;
          this.setState({error_transferuser:Parser('<span class="errorspan">Please enter beneficiary mobile number</span>')})
      }else if(cookie.load('UserMobile')===this.state.transferuser) {
         error++;
          this.setState({error_transferuser:Parser('<span class="errorspan">Not allowed transfer same account</span>')})
      }else {
        this.setState({error_transferuser:''})
       }      
    }


    if(this.state.transferponts=='') {
      error++;
      this.setState({error_transferponts:Parser('<span class="errorspan">Please enter transfer points</span>')})
    }
    else {
      if(parseInt(this.state.user_points)<this.state.transferponts) {
        this.setState({error_transferponts:Parser('<span class="errorspan">Only allowed '+this.state.user_points+' points</span>')})
      }
      else {
        this.setState({error_transferponts:''})
      }
      
    }
    if(this.state.error_transferponts!=='' || this.state.error_transferuser!=='') {
         error++;
    }
    
    if(error==0) {
      this.setState({transferloading:false});
      let parems = {
        app_name:appName,
        user_token:cookie.load('UserAuthToken'),
        reference_code:this.state.transferuser,
        transfered_points:this.state.transferponts
      };
      this.props.getTransfer(parems);
    }    
  }

  editform = (valid,inputphone,object,fullnumber)  => {
    this.setState({validphone: valid});
    this.setState({selectedcode : object.dialCode})
    this.setState({selectregion : object.iso2})
    let errors = {};
    let formIsValid = true;
    if(valid == false){
      formIsValid = false;
      this.setState({error_transferuser:Parser('<span class="errorspan">Please enter valid mobile number</span>')});
    }else if(valid == true){
      this.setState({error_transferuser:''});
    }
    this.setState({
      errors: errors
    });

    return formIsValid;
  }

    handleChangeTxt = (valid, event,object) => { 
    this.setState({validphone: valid});
    this.setState({countrycode: object.dialCode});
    this.setState({transferuser :event });
   }


  render() {
    const defaultip  = this.state.clientip;
    let { user_image_preview } = this.state;
    let preview = '';
    if (user_image_preview!== null && user_image_preview!== '') {
      preview = <img src={user_image_preview} alt="" />;
    } else {
      preview = <img src={Icoprofile} className="defaultprofileImg" alt="" />;
    }
    return (
      <div>
        <div className={this.state.profiletbar}>
          <div className="container clearfix">
            <div className="profile_tbleft">
              <div className="profile_tbimg">
                <div>
                {this.state.isHidden && <div className="image_success"><img src={ImageSuccess} alt="" /></div>}
                   <span className="profile_btn"><input type="file" name="file" onChange={this.onChangeHandler} />
                   Browse </span>
                </div>
                {preview}
              </div>
              <div className="profile_tbinfo">
                <h3 className="text-uppercase">
                  {this.state.user_fullname}
                </h3>
                {(this.state.user_nickname) && <p>
                  Nick Name:
                  <span>
                    {this.state.user_nickname}
                  </span>
                </p>}
                 {(this.state.user_email) && <p>
                 Email Address:
                  <span>
                    {this.state.user_email}
                  </span>
                </p>}
                
                  Mobile Number:&nbsp;
                  <span>
                    {cookie.load("CountryCode")
                      ? cookie.load("CountryCode")
                      : ""}{" "}
                    {this.state.user_mobile}
                  </span>
                    {/*<div className="verified_check">
                      <i className="fa fa-check"></i>Verified
                      </div>*/}
                   
                <div className="profile_tbinfo_forgot_psw">
                    <Link to="/changepassword">Change Password</Link>
                </div>
                <div className="profile_tbinfo_follow">
                    <Link to="/following" className={(this.state.followActive==="following")?"active":''}>Following <span>({this.state.followingcount?this.state.followingcount:0})</span></Link>
                    <Link to="/followers" className={(this.state.followActive==="followers")?"active":''}>Followers <span>({this.state.followercount?this.state.followercount:0})</span></Link>
                </div>

              </div>
            </div>
           
           {this.state.pathname !='/reviews' &&
            <div className="profile_tbright text-center">
              <div className="row">
                <div className="col">
                  <h4 className="text-uppercase">Available Points</h4>
                  <span className="profile_tbpoint_text">
                    {Math.round(this.state.user_points)}
                  </span>
                  <p className="profile_tbright_GH_history">
                    <a href="/wallet" title="GH Points History">
                      GH Points History
                    </a>
                  </p>
                </div>
                <div className="col">
                   <Link to="/buy-points" className="btn btn_orange btn_sm"
                    title="Buy points">
                    Buy points
                  </Link>
                  <p className="mb5">
                    <a  href="javascript:void(0);" onClick={this.toggleTransferpoints} title="GH Points Summary">
                      Transfer Points
                    </a>
                  </p>
                  <p>
                    <a  href="javascript:void(0);" onClick={this.toggleGHpoints} title="GH Points Summary">
                      GH Points Summary
                    </a>
                  </p>
                </div>
              </div>
            </div>
          }

          {this.state.pathname == '/reviews' &&
            <div className="profile_tbright text-center">
              <div className="row">
                <div className="col">
                  <h4 className="text-uppercase">Overall rating</h4>
                  <div className="profile_tbpoint_rating">
                      <span className="profile_tbpoint_rating_star">
                          <i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i>
                      </span>
                      <span>
                         No review
                      </span>
                  </div>
                </div>
                <div className="col">
                    <p className="profile_tbpoint_rating_review">No ratings and reviews</p>
                </div>
              </div>
            </div>
          }
           {(this.state.success_transfer!=='')?<div className='success-transfer'><span>{this.state.success_transfer}</span></div>:''}
          </div>
        </div>
         <ModalPopup modal={this.state.modalGHpoints} toggle={this.toggleGHpoints} className="modal-width GHpoints_popup" title="GH points summary" >
                    <GHpoints_Content />
        </ModalPopup> 
         {(this.state.countryList!=='' && Object.keys(this.state.countryList).length > 0) &&
         <ModalPopup modal={this.state.modalTransferpoints} toggle={this.toggleTransferpoints} className="modal-width GHpoints_popup wallet_trapo_popup" title="Transfer Points" disablefooter={1} >
                  <div className="form-group">
                    <label>Beneficiary Mobile Number <span className="required">*</span></label>
                        <div className="account-mobile-wrap">
                          
                          <IntlTelInput className="form-control" name="transferuser" 
                                defaultCountry={cookie.load('selectiso2')?cookie.load('selectiso2'):defaultip}
                                id="user_mobile"
                                separateDialCode='true'
                                onPhoneNumberBlur={this.editform.bind(this)}
                                value={this.state.transferuser}
                                onPhoneNumberChange={this.handleChangeTxt.bind(this)}
                                preferredCountries={this.state.countryList}

                                />
                          {this.state.error_transferuser}
                        </div>
                  </div>
                  <div className="form-group">
                    <label>Point <span className="required">*</span></label>
                    <input className="form-control" value={this.state.transferponts} type="text" onChange={this.handleInputChange.bind(this, 'transferponts')}  onKeyPress={(e) => isNumber(e)} />
                    {this.state.error_transferponts}
                  </div>
                  <div className="form-group btn-grp-alctr">
                    <button className={(this.state.transferloading)?'loading btn btn_orange animate-btn2':'btn btn_orange animate-btn2'} type="button" onClick={this.createTransfer.bind(this)}>Transfer</button>
                    {this.state.error_transfer}
                   
                  </div>
        </ModalPopup> 
       }
      </div>
    );
  }
}
const mapStateTopProps = (state) => {
  return {
    ipaddress     : state.ip,
    mobilecountry	: state.mobilecountry,
    imageprofile  : state.imageprofile,
    userprofile   : state.userprofile,
    transferdata  : state.transfer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIpData: (ipaddress) => {
      dispatch({ type: GET_IPDATA, ipaddress});
    },
    getMobileCountry: () => {
      dispatch({ type: GET_MOBILE_COUNTRY});
    },
    getImageProfile: (formPayload,config) => {
      dispatch({ type: GET_IMAGEPROFILE, formPayload,config});
    },
    getUserProfile: (usertoken) => {
      dispatch({ type: GET_USERPROFILE, usertoken});
    },
    getTransfer: (parems) => {
      dispatch({ type: GET_TRANSFER, parems});
    },
    
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Profilebar));
