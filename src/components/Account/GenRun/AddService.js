/* eslint-disable */
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ServiceCheck from '../../../common/images/accounts/service_checkbox.png';
import { appName, serviceImage, servicemediaImage } from "../../Config/Config";
import { GET_REQUESTSERVICE, GET_RUNSERVICEUPDATE } from '../../../actions';
import noimgserv from "../../../common/images/default.jpg";


class AddService extends Component {
  constructor(props) {
      super(props); 
      this.state = {
        servicedata:[],
        user_services:[],
        checked: false
      }
      this.props.getRequestService('genrun',cookie.load('UserAuthToken'),'');
    }
    handleFormSubmit = () => {
          const formPayload = this.state;
          var qs = require('qs');
          var postObject = {
          "app_name": appName,
          "user_token" : cookie.load('UserAuthToken'),
          "user_services": formPayload.user_services,
          "assign_code": 'GR',
          };
      this.props.getRunServiceUpdate(qs.stringify(postObject));
  }
  componentWillReceiveProps(Props){
    if(Props.servicedata !== this.props.servicedata){
          if(Props.servicedata[0].selectedvendors!== ''){
            this.setState({ user_services :Props.servicedata[0].selectedvendors})
          }
    }
    if(Props.updaterunservices!== this.props.updaterunservices){
      if(Props.updaterunservices[0].status === "success"){
          if(Props.updaterunservices[0].result_set.length > 0){
              window.location.href = "/genrun-my-services";
          }
        }else{
            window.location.href = "/genrun-my-services";
        }
      }
  }
  CheckService = (event) =>{
          var serviceArr = [...this.state.user_services];
          const value = event.target.value
          const index = serviceArr.findIndex(user_services => user_services === value);
          if(index > -1) {
          serviceArr = [...serviceArr.slice(0, index), ...serviceArr.slice(index + 1)]
          } else {
          serviceArr.push(value);
          }
          this.setState({user_services: serviceArr});
  }

   servicelist() {
    var serviceArr = this.props.servicedata[0];
    if(serviceArr!== undefined && serviceArr!== null){
      if(Object.keys(serviceArr).length > 0) {
         const serviceDetails = serviceArr.result_set.map((services, serviceIndex) => {
           var imgservice =services.services_default_icon;
              var imgsrc ;
             if(imgservice !== null && imgservice !== ''){
                imgsrc = servicemediaImage+services.services_default_icon+"";
             }else{
                imgsrc = noimgserv+"";
             }

             var selectserv = this.props.servicedata[0].selectedvendors;
              if(selectserv!== 'undefined' && selectserv!== null){
                 if(selectserv.indexOf(services.services_id) !== -1){
                  var checked = true;
                 }
               }

            return (
                        <div className="asp-col" key={services.services_id}>
                        <div className="asp-inner-box">    
                        <input type="checkbox" name="user_type_genpro" value={services.services_id}  onClick={this.CheckService.bind(this)} defaultChecked = {checked?checked:false}/>
                        <label className="asp-checkbox-label">
                        <img src={ServiceCheck} alt="" className="asp-checktik" />
                        <span className="default-img"><img src={imgsrc} alt="" /></span>
                        <span className="asp-caption">{services.services_title}</span>
                        </label>
                        </div>
                        </div>
                     );
    
     });
      return serviceDetails;
     }
    } else {
      return (<div className="loading loading-h-200"></div>);
    }
  }
  render() {
    return (
        <>     
          <div className="add-service-popup-wrapper">
          <div className="add-service-popup-inner-wrapper">
          {this.servicelist()}
          </div>
          </div>        
          <button className="btn btn_orange btn_minwid btn-width" type="button" onClick={this.handleFormSubmit.bind(this)}>Update Now
          </button>
        </>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
      servicedata: state.service,
      updaterunservices: state.updaterunservices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getRequestService: (addservice, usertoken, page) => {
          dispatch({ type: GET_REQUESTSERVICE, addservice, usertoken, page });
        },
    getRunServiceUpdate: (formPayload) => {
      dispatch({ type: GET_RUNSERVICEUPDATE, formPayload });
    },

  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(AddService));
