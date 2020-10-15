/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_CMSPAGE } from '../../actions';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import $ from 'jquery';
import BannerImg from '../../common/images/ban-career.jpg';
import {Row, Col, ProgressBar, Modal, OverlayTrigger, ButtonToolbar, Tooltip} from 'react-bootstrap';
import { Collapse, Button, CardBody, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { GET_CAREERS } from '../../actions';
import ModalPopup from '../Layout/ModalPopup';
import ApplyNow_Content from '../Pages/ApplyNow';
import { LoadingSec } from '../Helpers/SettingHelper';
var Parser = require('html-react-parser');

class Career extends Component {
constructor(props) {
    super(props);
    this.state = {
      carrer_id:'',
      careerlist:'',
      list:'',
      Loading:false,
      modalApplyNow: false,
      careertitle:''
      }
      this.toggleApplyNow = this.toggleApplyNow.bind(this);
  }

  componentDidMount(){
        this.props.getCareers(this.state.carrer_id);
   
    $(".btn-link").click(function(){
        if($(this).hasClass("active"))
        {
            $(this).parents(".accordion").find(".active").removeClass("active");
        }
        else
        {
            $(this).parents(".accordion").find(".active").removeClass("active");
            $(this).toggleClass("active");
        }
    })  

      $("html, body").animate({scrollTop: $(".container").offset().top-60}, 1000);
      
  }

  componentWillReceiveProps(Props) {
    if(Props.careers!== this.props.careers){
      if(Props.careers[0].result_set !== 'undefined' && Props.careers[0].result_set !== null)
        if(Props.careers[0].status === 'success'){
            this.setState({ careerlist: Props.careers[0].result_set}, function () { this.loadcareers() }.bind(this));

      }else{
          this.setState({list:'Jobs not found'});
      }
  }
}

   togglejobapply = (e, type) => {
        e.preventDefault();
        this.setState({careertitle :type}, function() {
            this.toggleApplyNow();
        });
    }

    toggleApplyNow(jobapply) {
      this.setState(prevState => ({
       modalApplyNow: !prevState.modalApplyNow
      }));
    }



 loadcareers(){
      if(this.state.careerlist!='' && typeof this.state.careerlist!=='undefined') {
       const careerlist = this.state.careerlist.map((careerlist, careerlistIndex) => {
            
            if(careerlist.career_type == 'P'){
              var careertype = 'Part Time';
            }else{
              var careertype = 'Full Time';
            }

            return (
               <Accordion>
                        <Card>
                          <Card.Header>
                                  <Accordion.Toggle as={Button} variant="link" eventKey={careerlistIndex}>
                                       <h2>{careerlist.career_title}</h2>
                                       <p><i className="fa fa-clock-o" aria-hidden="true"></i>{careertype}</p>
                                  </Accordion.Toggle>
                         </Card.Header> 
                          <Accordion.Collapse eventKey={careerlistIndex}>
                              <Card.Body>
                                    <div className="cms-career-more">
                                     <h3>Responsibilities</h3>
                                        <ul>
                                            <li>{careerlist.career_responsibilities}</li>
                                        </ul>

                                        <h3>Key skills</h3>
                                        <ul>
                                            <li>{careerlist.career_skills}</li>
                                        </ul>
                                        <div className="career-apply-btn">
                                             <a href="javascript:void(0);" className="btn btn_orange animate-btn2" title={careerlist.career_title} 
                                                onClick={ e => this.togglejobapply(e, careerlist.career_title) }>Apply Now</a>
                                        </div>
                                    </div>
                              </Card.Body>
                           </Accordion.Collapse>
                        </Card>
                </Accordion>
             );

        });
         this.setState({list:careerlist});
      }
  }

render() {
    
    return (
      <>
        <div>
            <Header />
            <div className="cms-page-banner">
                 <div className="cms-innerpage-banner">
                      <img src={BannerImg} alt=""/>
                      <div className="cms-banner-caption">
                        <div className="container">
                              <h1>Career</h1>
                        </div>
                      </div>
                 </div>
            </div>
            <div className="wrapper_out pptc_wrapper_out">
                <div className="container">
                    <div className="cms-career-wrapper">
                      <div className="cms-career-list">
                          <div className="inner-cms-career-list">
                             {this.state.list?this.state.list:LoadingSec}
                           </div>
                      </div>
                    </div>
                </div>
            </div>
            <ModalPopup modal={this.state.modalApplyNow} toggle={this.toggleApplyNow} className="modal-width Gen_popup apply_now_popup" title="Submit Your Application" >
                <ApplyNow_Content careertitle={this.state.careertitle}/>
            </ModalPopup>	
            <Footer />
        </div>
        </>
    );
}
}

const mapStateTopProps = (state) => {
  return {
  careers: state.careers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCareers: (career_id) => {
      dispatch({ type: GET_CAREERS, career_id });
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Career));
