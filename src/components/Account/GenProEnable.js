import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appName } from "../Config/Config";
import { GET_ENABLETYPE } from '../../actions';

class GenProEnable extends Component {

	constructor(props) {
        super(props);   
        this.state = {
            Loading: false
          }
    }

	handleFormSubmit = () => {
	  const { usertoken,enablevalue } = this.props
	  var qs = require('qs');
	  this.setState({Loading:true});
	  var postObject = {
	  "app_name": appName,
	  "user_token": usertoken,
	  "assign_type": enablevalue,
	  };
	  this.props.getEnableType(qs.stringify(postObject));
	}
	componentWillReceiveProps(Props) {
		this.setState({Loading: false})
		 if(Props.enabletype !== this.props.enabletype){
	         if(Props.enabletype[0].status === "success"){
	         	 cookie.save("login_user_type",Props.enabletype[0].login_user_type);
	         	 if(Props.enabletype[0].currentenable === 'GR') {
	         	 	console.log(Props.enabletype[0].currentenable,'GR')
	         	 	cookie.save('EnableGenRun','yes');
	         	 	window.location.href = "/edit-gen-run";
	         	 }else if(Props.enabletype[0].currentenable === 'GP'){
	         	 	console.log(Props.enabletype[0].currentenable,'GP')
	         	 	cookie.save('EnableGenPro','yes');
	         	 	window.location.href = "/edit-gen-pro";
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
  	const { enablevalue } = this.props
  	if(enablevalue === 'GR'){
  		var content = 'Update GenRun details 100% to get 300 GH points!';
  	}
  	if(enablevalue === 'GP'){
  		 content = 'Update GenPro details 100% to get 300 GH points!';
  	}
  	if(enablevalue === 'GA'){
  		 content = 'Update GenAgent details 100% to get 300 GH points!';
  	}
    return (
	<>	   
      <div className="list">
	  <div className="popup-inner-content">
	 	<p>{content}</p>
	  </div>
	  </div>
		 <button className="btn btn_orange btn_minwid btn-width animate-btn2" type="button mt10" onClick={this.handleFormSubmit.bind(this)} disabled={(this.state.Loading ===true)?true:false}> {this.state.Loading ===true &&
                                    <span className="load-data">Loading</span> 
                                    }Update Now
                                  </button>
                                  </>
    );
  }
}

const mapStateTopProps = (state) => {
	console.log(state)
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
