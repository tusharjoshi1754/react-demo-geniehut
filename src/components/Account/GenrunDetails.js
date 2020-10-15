/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import Async from 'react-select/async';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';




class GenrunDetails extends Component {
constructor(props) {
    super(props);
    this.state = {

    }

  }


  componentDidMount(){
      
  }



render() {

  
   return (
        <div>
          <Header />
          welcome
          <Footer />
        </div>
    );
}
}

const mapStateTopProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenrunDetails));