/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import cookie from 'react-cookies';
import Profilebar from './Profilebar';
import SecondaryHeader from '../Layout/SecondaryHeader';
import {Ratings, TimeDifference, LoadImage} from '../Helpers/SettingHelper';
import { GET_REVIEW } from '../../actions';


class Wallet extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            activeTab: '1',
            Replycollapse: false,     
            ViewAllRepliescollapse: false,
            runreview:'',
            ratingDetails:'',
            proreview:'',
            proDetails:'',
        };
        
        this.Reply = this.Reply.bind(this);
        this.ViewAllReplies = this.ViewAllReplies.bind(this);
        if(cookie.load('login_user_type').indexOf('GR')>=0 || cookie.load('login_user_type').indexOf('GP')>=0) {
            const rparams = {
                page:0            
            }
            this.props.getReview(rparams);
        }
        
    }
    componentDidMount(){
        
    } 
    componentWillReceiveProps(Props) {
       
        if(this.state.review!=Props.review) {
          if(Props.review[0].status == 'success'){
          if(Props.review[0].result_set!=='' && Props.review[0].result_set!==undefined){
            let result = Props.review[0].result_set;
            this.setState({runreview:result.run, proreview:result.pro, ratingDetailLoading:false}, function() {
                this.displayrunreviews();
                this.displayproreviews();
            });
         }
        }else if(Props.review[0].status==='authenticfailed'){
              this.props.history.push('/logout');
        }
       }
     }

    displayrunreviews() {
        if(this.state.runreview!==null && this.state.runreview.run_reviews!='' && typeof this.state.runreview.run_reviews!='undefined') {
            const reviewsDetails = this.state.runreview.run_reviews.map((item, index)=> {      
                return (
                    <div className="Gen_reviews_box" key={index}>
                        <div className="Gen_reviews_inner_box">
                            <div className="Gen_reviews_box_img"><img src={LoadImage(item.custImage, 'profile')} alt="" /></div>
                            <div className="Gen_reviews_box_text">
                                <h3>{item.user_name} <small>{TimeDifference(item.review_created)}</small></h3>
                                {Ratings(item.review_points)}
                                <p>{item.review_desc}</p>
                            </div>
                        </div>
                    </div>
                );
            });

            this.setState({ratingDetails:reviewsDetails});
        }
        else {
            this.setState({ratingDetails:'No Review'});
        }
    }
    displayproreviews() {
        
        if(this.state.proreview!==null && this.state.proreview.pro_reviews!='' && typeof this.state.proreview.pro_reviews!='undefined') {
            const reviewsDetails = this.state.proreview.pro_reviews.map((item, index)=> {      
                return (
                    <div className="Gen_reviews_box" key={index}>
                        <div className="Gen_reviews_inner_box">
                            <div className="Gen_reviews_box_img"><img src={LoadImage(item.custImage, 'profile')} alt="" /></div>
                            <div className="Gen_reviews_box_text">
                                <h3>{item.user_name} <small>{TimeDifference(item.review_created)}</small></h3>
                                {Ratings(item.review_points)}
                                <p>{item.review_desc}</p>
                            </div>
                        </div>
                    </div>
                );
            });

            this.setState({ratingproDetails:reviewsDetails});
        }
        else {
            this.setState({ratingproDetails:'No Review'});
        }
    }
 Reply() {
    this.setState(state => ({ Replycollapse: !state.Replycollapse, ViewAllRepliescollapse: false }));
  }
  
 ViewAllReplies() {
    this.setState(state => ({ ViewAllRepliescollapse: !state.ViewAllRepliescollapse, Replycollapse: false }));
  }


toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }    

componentDidMount(){
    if(!cookie.load('UserAuthToken')){
      window.location.href = "/logout";
    }
  
}

render() {
    return (
        <div>
            <Header />
            <SecondaryHeader />
			<Profilebar />
            <div className="wrapper_out wallet_wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper Gen_wallet_wrapper">
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                <div className="Gen_Reviews_content">                                     
                                    <Nav tabs>
                                        {(cookie.load('login_user_type').indexOf('GR')>=0) &&
                                      <NavItem>                                          
                                        <NavLink
                                          className={classnames({ active: this.state.activeTab === '1' })}
                                          onClick={() => { this.toggle('1'); }}
                                        >
                                            GenRun
                                        </NavLink>
                                      </NavItem>
                                        }
                                        {(cookie.load('login_user_type').indexOf('GP')>=0) &&
                                      <NavItem>
                                        <NavLink
                                          className={classnames({ active: this.state.activeTab === '2' })}
                                          onClick={() => { this.toggle('2'); }}
                                        >
                                          GenPro
                                        </NavLink>
                                      </NavItem>
                                        }
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                      <TabPane tabId="1">
                                      <div className="Gen_reviews_wrapper">
                                          <div className="Gen_reviews_rating">
                                              {Ratings(this.state.runreview.rating_avg)}
                                          </div>
                                          {this.state.ratingDetails}
                                      </div>
                                      </TabPane>
                                      <TabPane tabId="2">
                                      <div className="Gen_reviews_wrapper">
                                           <div className="Gen_reviews_rating">
                                              {Ratings(this.state.proreview.rating_avg)}
                                          </div>
                                            {this.state.ratingproDetails}
                                      </div>
                                      </TabPane>
                                    </TabContent>
                                     
                                     
                                </div>
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
  walletinfo: state.walletinfo,
  review    : state.review
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserwalletInfo: (formPayload) => {
      dispatch({ type: GET_USERWALLETINFO, formPayload});
    },
    getReview: (formPayload) => {   
        
        dispatch({ type: GET_REVIEW, formPayload});
    }
    
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Wallet));
