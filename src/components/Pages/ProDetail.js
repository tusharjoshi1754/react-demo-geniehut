/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import LandingBanner from '../../common/images/banner_img.png';
import Customer from '../../common/images/customer.png';
import Note from '../../common/images/note.png';
import Hire from '../../common/images/hire.png';
import Dots from '../../common/images/dots.png';
import GeniesWork1 from '../../common/images/Genworks/icon1.png';
import GeniesWork2 from '../../common/images/Genworks/icon2.png';
import GeniesWork3 from '../../common/images/Genworks/icon3.png';
import GeniesWork4 from '../../common/images/Genworks/icon4.png';
import GeniesWork5 from '../../common/images/Genworks/icon5.png';
import GeniesWork6 from '../../common/images/Genworks/icon6.png';
import GeniesWork7 from '../../common/images/Genworks/icon7.png';

class ProDetail extends Component {
    constructor(props) {
        super(props);   
        this.state = {           
            }   
    }
    render() {
  	
        return (
                <div>	
                    <Header />
                    <div className="customer_home_banner pro_home_banner">
                        <img src={LandingBanner} alt="LandingBanner" className="chb_banner" />
                        <div className="cus_home_banner_content">
                            <div className="cus_home_banner_innercontent">
                                <div className="cus_home_heading">
                                    Find the best Run Errand for your needs
                                </div>
                                <div className="cus_home_form">
                                    <form>
                                        <div className="form-group">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Choose Your Services"
                                                />
                                                <InputGroup.Append>
                                                <InputGroup.Text id="basic-addon2"><button type="button" className="btn btn_orange animate-btn2 chb_btn">Find Your Genrun</button></InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>                                
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="three-service-section">
                        <div className="container">
                            <div className="three-service-wrapper">
                                <div className="single-service-wrap">
                                    <div className="single-service-img">
                                        <span className="dots"></span>
                                        <img src={Dots} alt="" />
                                        <img src={Customer} alt="" />
                                    </div>
                                    <div className="single-service-text">
                                        <h4>Easy quote comparison for customer</h4>
                                    </div>
                                </div>
                                <div className="single-service-wrap">
                                    <div className="single-service-img">
                                        <span className="dots"></span>
                                        <img src={Dots} alt="" />
                                        <img src={Note} alt="" />
                                    </div>
                                    <div className="single-service-text">
                                        <h4>Easy quote comparison for customer</h4>
                                    </div>
                                </div>
                                <div className="single-service-wrap">
                                    <div className="single-service-img">
                                        <span className="dots"></span>
                                        <img src={Dots} alt="" />
                                        <img src={Hire} alt="" />
                                    </div>
                                    <div className="single-service-text">
                                        <h4>Easy quote comparison for customer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="genies-work-wrapper">
                        <div className="container">
                            <div className="genies-work-heading">
                                <h2>How GenPro works?</h2>
                            </div>
                            <div className="genies-work-inner">
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork1} alt=""/>
                                    <div>
                                    <h4>Register free of charge as GenPro</h4>
                                    <p>Tell us what are the services that you can provide to the customers</p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork2} alt=""/>
                                    <div>
                                    <h4>About yourself</h4>
                                    <p>Write a profile about yourself and address to the frequent ask questions (FAQ) from the customers.</p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork3} alt=""/>
                                    <div>
                                    <h4>Hire the right GenPro</h4>
                                    <p>The customer answers similar set of questions about what type of GenPro that he is looking for. We will promote the best services match, good ratings and number of jobs completed via GenieHut.com to the customers</p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork4} alt=""/>
                                    <div>
                                    <h4>Customer reads your GenPro profiles and be selected for "Compare quotes"</h4>
                                    <p>We will send your indicative price range and your contact details to the potential customers. You can also subscribe to our SMS call back notification alert if you are selected for "Add to compare" so that you can contact the customers and increase your chance of hired.</p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork5} alt=""/>
                                    <div>
                                    <h4>Customer contact you, clinch the deal and customer provide rating for you.</h4>
                                    <p></p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork6} alt=""/>
                                    <div>
                                    <h4>Enquiry on registration</h4>
                                    <p>If you have problem on online registration, you can email <a href="mailto: customersupport@geniehut.com">customersupport@geniehut.com</a> Our friendly GenieHut customer service officer will reply to you at the soonest. </p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <img src={GeniesWork7} alt=""/>
                                    <div>
                                    <h4>Premium listing, exclusive deals and partnership</h4>
                                    <p>If you would like to discuss on premium listing, exclusive deals and partnership, please contact our friendly GenieHut customer service officer (+65) 98256258</p>
                                    </div>
                                </div>
                                <div className="genies-work-inner-block">
                                    <div className="genies-work-btn">
                                        <a href="javascript:void(0);" className="btn btn_orange animate-btn2 ab-none"><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Download GenPro guide </a>
                                    </div>
                                </div>
                                
                                
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(ProDetail));
