/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import moment from 'moment';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { appName } from "../Config/Config";

import { GET_SHAREADDPOINT } from '../../actions';

class Addpoints extends Component {

constructor(props) {
    super(props);
    this.state = {
  
      }
       this.props.getShareAddpoint(props.match.params.UserID)
  }

  componentWillReceiveProps(Props) {
    window.location.href = "/";
  }


render() {

    return (
        <div>

	

                                    
        </div>
    );
}
}

const mapStateTopProps = (state) => {
  return {
      shareaddpoints: state.shareaddpoints
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getShareAddpoint: (url_key) =>{
       dispatch({ type: GET_SHAREADDPOINT, url_key});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Addpoints));


