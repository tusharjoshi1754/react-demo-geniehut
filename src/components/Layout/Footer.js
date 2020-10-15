/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Fade} from 'react-reveal';
import FooterLogo from '../../common/images/footer/footer-logo.png';
import ModalPopup from '../Layout/ModalPopup';
import HowGenWorks from '../Layout/HowGenWorks';
import { connect } from 'react-redux';
import { GET_SITESETTINGS, GET_STATICBLOCKCONTENT } from '../../actions';
import { genprodashboardurl, generaldashboardurl, genrundashboardurl, staticUrl, genagentUrl, staticrunUrl } from "../Config/Config";
import cookie from 'react-cookies';
var Parser = require('html-react-parser');

class Footer extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            siteemail:'',
            sitephone: '',
            settings_facebook: '',
            settings_instagram: '',
            settings_linkedin: '',
            copyrights:'',
            footerourvision:'',
            modalHowGenWorks: false,
            prourl:'',
            runurl:'',
            generalurl:'',
            staticproUrl:staticUrl,
            staticrunUrl:staticrunUrl,
            genagentUrl: genagentUrl
            }
        this.props.getSiteSettings();
        this.props.getStaticblockContent('footer-our-vision-content-mq');
        this.toggleHowGenWorks = this.toggleHowGenWorks.bind(this);
       }
    
    toggleHowGenWorks() {
    this.setState(prevState => ({
      modalHowGenWorks: !prevState.modalHowGenWorks
    }));
}

componentDidMount() {
    if(cookie.load('UserAuthToken')){
      this.setState({prourl: genprodashboardurl+cookie.load('UserAuthToken')})
      this.setState({generalurl: generaldashboardurl+cookie.load('UserAuthToken')})
      this.setState({runurl: genrundashboardurl+cookie.load('UserAuthToken')})
    }
}
componentWillReceiveProps(PropsData) {
    if(PropsData.sitesettings!== this.props.sitesettings){
        if(PropsData.sitesettings[0].result_set !== 'undefined' && PropsData.sitesettings[0].result_set !== null){
            if(PropsData.sitesettings[0].status === 'success'){
               const settingData = PropsData.sitesettings[0].result_set;
               if(settingData.settings_display_email !== ''){
                    this.setState({siteemail : settingData.settings_display_email})
               }
               if(settingData.settings_no !== ''){
                    this.setState({sitephone : settingData.settings_no})
               }
               if(settingData.settings_facebook !== ''){
                    this.setState({settings_facebook : settingData.settings_facebook})
               }
               if(settingData.settings_twitter !== ''){
                    this.setState({settings_twitter : settingData.settings_twitter})
               }
               if(settingData.settings_instagram !== ''){
                    this.setState({settings_instagram : settingData.settings_instagram})
               }
               if(settingData.settings_linkedin !== ''){
                    this.setState({settings_linkedin : settingData.settings_linkedin})
               }
               if(settingData.settings_email_footer !== ''){
                    this.setState({copyrights : settingData.settings_email_footer})
               }
            }
        }
    }
    if(PropsData.staticblocks  !== this.state.staticblocks){
      if(Object.keys(PropsData.staticblocks).length > 0){
        if(PropsData.staticblocks[0].status === 'success'){
          if(PropsData.staticblocks[0].result_set.staticblocks_slug === 'footer-our-vision-content-mq'){
            this.setState({footerourvision :  PropsData.staticblocks[0].result_set.staticblocks_description})
          }
        }
      }
    }
}   

  render() {
    return (
      <div>
        <footer>            
             <div className="footer-wrapper">
                <div className="footer-top">
                    <div className="container">
                        <div className="inner-footer-top">
                        <Fade><div className="footer-col-1">
                            <div className="fc1-img">
                                <a href="javascript:void(0);" title="GenieHut"><img src={FooterLogo} alt="GenieHut" /></a>
                            </div>
                            <div className="fc1-text">                                
                                <ul className="footer-contact-li">
                                    <li>Email: <a href={"mailto:"+this.state.siteemail}>{this.state.siteemail}</a></li>
                                    <li>Phone: <a href={"tel:"+this.state.sitephone}>{this.state.sitephone}</a></li>
                                </ul>
                                <div className="fc3-social-icons">
                                    <h3>Follow us on social media</h3>
                                        <ul>
                                            {this.state.settings_facebook?
                                                <li><a href={this.state.settings_facebook} target="_blank" rel="noopener noreferrer" ><i className="fa fa-facebook" aria-hidden="true"></i></a></li>:''
                                            }
                                            {this.state.settings_twitter?
                                            <li><a href={this.state.settings_twitter} target="_blank" rel="noopener noreferrer" ><i className="fa fa-twitter" aria-hidden="true"></i></a></li>:''}
                                            {/*this.state.settings_instagram?
                                             <li><a href={this.state.settings_instagram}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>:''*/}
                                            {this.state.settings_linkedin?
                                              <li><a href={this.state.settings_linkedin} target="_blank" rel="noopener noreferrer" ><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>:''}
                                        </ul>
                                    </div>
                            </div>
                        </div></Fade>
                        <Fade><div className="footer-col-2">
                            <div className="fc2-50p">
                               <h3>Company</h3>
                                <ul>
                                    <li>
                                        <Link to={'/about-us'}>About Us</Link>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={this.toggleHowGenWorks}>How It Works</a>
                                    </li>
                                    <li>
                                        <Link to={'/articles'}>Articles</Link>
                                    </li>
                                    <li>
                                        <Link to={'/career'}>Careers</Link>
                                    </li>
                                    <li>
                                        <Link to={'/privacy-policy'}>Privacy Policy</Link>
                                    </li>
                                    <li>
                                    <Link to={'/terms-conditions'}>Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact-us'}>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="fc2-50p">
                               <h3>Services</h3>
                                <ul>
                                    <li><a href='/genpro' title="GenPro" rel="noopener noreferrer" >GenPro</a></li>
                                    <li><a href='/genrun' title="GenRun" rel="noopener noreferrer" >GenRun</a></li>
                                    <li><a href="javascript:void(0);">GenProperty</a></li>
                                    {/*<li><a href="javascript:void(0);">GenPost</a></li>*/}
                                </ul>
                            </div>
                        </div></Fade>
                        <div className="footer-col-3">
                            <div className="fc3">
                               {Parser(this.state.footerourvision)}
                            </div>                            
                        </div>
                        </div>
                        <div className="fcopy_right">
                        <p>{this.state.copyrights}</p>
                        </div>
                   </div>
                </div>                
            </div>
        </footer>
        <div className="gotop"> 
            <a href="javascript:void(0);"><span><i className="fa fa-angle-double-up ar"></i><i className="fa fa-angle-up ar1"></i><i className="fa fa-angle-up ar2"></i></span></a> 
        </div>

        <ModalPopup modal={this.state.modalHowGenWorks} toggle={this.toggleHowGenWorks} className="modal-width HowGenWorks_popup" title="How Geniehut works?" >
            <HowGenWorks />
        </ModalPopup>
        

      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
  sitesettings: state.sitesettings,
  staticblocks: state.staticblocks,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSiteSettings: (slug) => {
      dispatch({ type: GET_SITESETTINGS, slug});
    },
    getStaticblockContent: (slug) => {
      dispatch({ type: GET_STATICBLOCKCONTENT, slug});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Footer));
