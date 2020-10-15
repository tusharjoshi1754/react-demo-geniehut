/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_CMSPAGE } from '../../actions';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import $ from 'jquery';
import ArticleImg from '../../common/images/ManageProp_img.jpeg';
import BannerImg from '../../common/images/blog-banner.jpg';
import {Row, Col, ProgressBar, Modal, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';


var Parser = require('html-react-parser');

class Articles extends Component {
constructor(props) {
    super(props);
    this.state = {
      cmspage:''
      }
    this.props.getCmsPage('privacy-policy');
  }

  componentDidMount(){

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
      <>
        <div>
            <Header />
            <div className="cms-page-banner">
                 <div className="cms-innerpage-banner">
                      <img src={BannerImg} alt=""/>
                      <div className="cms-banner-caption">
                        <div className="container">
                              <h1>Articles</h1>
                        </div>
                      </div>
                 </div>
            </div>
            <div className="wrapper_out pptc_wrapper_out">
                <div className="container">
                     <div className="articles-wrapper">
                        <div className="inner-articles-wrapper">
                             <div className="articles-left-wrapper">
                                 <div className="article-left-block">
                                     <h2><a href="javascript:void(0);">Christmas celebrations help</a></h2>
                                     <div className="article-date-social-icon">
                                         <p className="article-date"><i className="fa fa-calendar" aria-hidden="true"></i>01, Dec 2017</p>
                                         <p className="article-social-icons">
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a> 
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                         </p>
                                     </div>
                                     <div className="article-img">
                                         <img src={ArticleImg} alt=""/>
                                     </div>
                                     <div className="article-btn">
                                         <a href="javascript:void(0);" className="btn btn_orange animate-btn2">Read more</a>
                                     </div>
                                 </div>
                                 <div className="article-left-block">
                                     <h2><a href="javascript:void(0);">Christmas celebrations help</a></h2>
                                     <div className="article-date-social-icon">
                                         <p className="article-date"><i className="fa fa-calendar" aria-hidden="true"></i>01, Dec 2017</p>
                                         <p className="article-social-icons">
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a> 
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                                             <a href="javascript:void(0);" target="_blank"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                         </p>
                                     </div>
                                     <div className="article-img">
                                         <img src={ArticleImg} alt=""/>
                                     </div>
                                     <div className="article-btn">
                                         <a href="javascript:void(0);" className="btn btn_orange animate-btn2">Read more</a>
                                     </div>
                                 </div>
                             </div>
                             <div className="articles-right-wrapper">
                                 <div className="article-right-block">
                                     <h4>Latest Post</h4>
                                     <ul>
                                         <li><a href="javascript:void(0);">Christmas celebrations help</a></li>
                                         <li><a href="javascript:void(0);">How to clean and maintain your toilet</a></li>
                                         <li><a href="javascript:void(0);">How to save more on electricity bills</a></li>
                                         <li><a href="javascript:void(0);">Home Mover</a></li>
                                     </ul>
                                 </div>
                                 <div className="article-right-block">
                                     <h4>Archives</h4>
                                     <ul>
                                         <li><a href="javascript:void(0);">2017 <span>(4)</span></a></li>
                                         <li><a href="javascript:void(0);">How to clean and maintain your toilet</a></li>
                                         <li><a href="javascript:void(0);">How to save more on electricity bills</a></li>
                                         <li><a href="javascript:void(0);">Home Mover</a></li>
                                     </ul>
                                 </div>
                                 <div className="article-right-block">
                                     <h4>Trending</h4>
                                     <ul>
                                         <li><a href="javascript:void(0);">Home Mover</a></li>
                                         <li><a href="javascript:void(0);">How to save more on electricity bills</a></li>
                                     </ul>
                                 </div>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Articles));
