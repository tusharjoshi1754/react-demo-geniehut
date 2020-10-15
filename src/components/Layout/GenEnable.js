import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { appName } from "../Config/Config";
import { lang } from '../Helpers/lang';
import { GET_ENABLETYPE } from '../../actions';
class GenProEnable extends Component {

	constructor(props) {
        super(props);
				const service = this.props.service;
				let pagelangdata = lang.enable[service]
        this.state = {
            Loading: false,
						pagelangdata:pagelangdata,
						service:service
          }
    }

	handleFormSubmit = () => {
	  var qs = require('qs');
	  this.setState({Loading:true});
	  var postObject = {
	  "app_name": appName,
	  "user_token": cookie.load('UserAuthToken'),
	  "assign_type": this.state.service,
	  };
	  this.props.getEnableType(qs.stringify(postObject));
		
	}
	componentWillReceiveProps(Props) {
		this.setState({Loading: false})
		 if(Props.enabletype !== this.props.enabletype){
	         if(Props.enabletype[0].status === "success"){
						 cookie.save('login_user_type', Props.enabletype[0].login_user_type);
						this.props.reviceUserType(Props.enabletype[0].login_user_type);
						if(Props.enabletype[0].currentenable === 'GR') {
						cookie.save('EnableGenRun','yes');
						window.location.href = "/genrun-my-services";
						}else if(Props.enabletype[0].currentenable === 'GP'){
						cookie.save('EnableGenPro','yes');
						window.location.href = "/genpro-my-services";
						}else if(Props.enabletype[0].currentenable === 'GA') {
						cookie.save('EnableGenAgent','yes');
						this.props.history.push('/edit-gen-agent');
						}
	         }else if(Props.enabletype[0].status === 'authenticfailed'){
                this.props.history.push('/logout');
            }
	     }
	}

  render() {
  
    return (
			<div>
				<div className="list">
					<div className="popup-inner-content">
					<p>{this.state.pagelangdata.content}</p>
					</div>
				</div>
				<button className="btn btn_orange btn_minwid btn-width animate-btn2" type="button mt10" onClick={this.handleFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
				<span className="load-data">Loading</span> 
				}Update Now
				</button>
			</div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
  	 enabletype: state.enabletype,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEnableType: (formPayload) => {
      dispatch({ type: GET_ENABLETYPE, formPayload});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenProEnable));
