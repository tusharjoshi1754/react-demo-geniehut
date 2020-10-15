/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_CMSPAGE } from '../../actions';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import $ from 'jquery';
import AboutusImg from '../../common/images/ManageProp_img.jpeg';
import BannerImg from '../../common/images/ban-about.jpg';
var Parser = require('html-react-parser');
import { PageTitle } from "../Helpers/SettingHelper";
class Pages extends Component {
constructor(props) {
    super(props);
    this.state = {
      cmspage:''
      }
    this.props.getCmsPage('privacy-policy');
  }

  componentDidMount(){
    document.title = PageTitle('Privacy Policy');
  }

  componentWillReceiveProps(Props) {
    if(Props.cmspage!== this.props.cmspage){
      if(Props.cmspage[0].result_set !== 'undefined' && Props.cmspage[0].result_set !== null)
        if(Props.cmspage[0].status === 'ok'){
          this.setState({cmspage : Props.cmspage[0].result_set[0]})
        }
  }
}

 

render() {
  let PrivacyPolicy =this.state.cmspage.cms_content;
    return (
    
        <div>
            <Header />
            <div className="cms-page-banner">
                 <div className="cms-innerpage-banner">
                      <img src={BannerImg} alt=""/>
                      <div className="cms-banner-caption">
                        <div className="container">
                              <h1>Privacy Policy</h1>
                        </div>
                      </div>
                 </div>
            </div>
            <div className="wrapper_out pptc_wrapper_out">
                <div className="container">
                  <div className="pptc-wrapper">
                     <h2>Privacy Policy</h2>
                    {PrivacyPolicy!==undefined?Parser(''+PrivacyPolicy+''):<div className="loading"></div>}
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
  cmspage: state.cmspage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCmsPage: (slug) => {
      dispatch({ type: GET_CMSPAGE, slug});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Pages));
