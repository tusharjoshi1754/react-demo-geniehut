import React, { Component } from 'react';
import FooterLogo from '../../common/images/footer/footer-logo.png';

class Footer extends Component {
  render() {
    return (
        <footer>
             <div className="footer-wrapper">
                <div className="footer-top">
                   <div className="container">
                        <div className="inner-footer-top">
                        <div className="footer-col-1">
                            <div className="fc1-img">
                                <a href="javascript:void(0);" title="GenieHut"><img src={FooterLogo} alt="GenieHut" /></a>
                            </div>
                            <div className="fc1-text">
                                <p>We are a team of professionals with Multinational companies (MNC) and local SME experience in different areas.</p>
                                <ul className="footer-contact-li">
                                    <li>Email: <a href="mailto:customersupport@geniehut.com">customersupport@geniehut.com</a></li>
                                    <li>Phone: <a href="tel:98256258">98256258</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-col-2">
                            <div className="fc2-50p">
                               <h3>Company</h3>
                                <ul>
                                    <li><a href="javascript:void(0);">About Us</a></li>
                                    <li><a href="javascript:void(0);">How It Works</a></li>
                                    <li><a href="javascript:void(0);">Articles</a></li>
                                    <li><a href="javascript:void(0);">Careers</a></li>
                                    <li><a href="javascript:void(0);">Privacy Policy</a></li>
                                    <li><a href="javascript:void(0);">Terms & Conditions</a></li>
                                    <li><a href="javascript:void(0);">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="fc2-50p">
                               <h3>Services</h3>
                                <ul>
                                    <li><a href="javascript:void(0);">GenPro</a></li>
                                    <li><a href="javascript:void(0);">GenAgent</a></li>
                                    <li><a href="javascript:void(0);">GenRun</a></li>
                                    <li><a href="javascript:void(0);">GenRedeem</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-col-3">
                            <div className="fc3">
                               <h3>Our Vision</h3>
                                <p>Build Geniehut community for the service providers ("Our partners") to connect effectively with the customers.</p>
                            </div>
                            <div className="fc3-social-icons">
                               <h3>Follow us on social media</h3>
                                <ul>
                                    <li><a href="javascript:void(0);"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="javascript:void(0);"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="javascript:void(0);"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="javascript:void(0);"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                   </div>
                </div>
                <div className="footer-bottom">
                   <div className="container">
                       <p>&#169; 2018 GenieHut.com. All Rights Reserved.</p>
                   </div>
                </div>
            </div>
        </footer>
    );
  }
}

export default Footer;
