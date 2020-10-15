/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import Header from '../Layout/Header';
import SecondaryHeader from '../Layout/SecondaryHeader';
import Profilebar from '../Account/Profilebar';
import Footer from '../Layout/Footer';
import { GET_FOLLOW, GET_CREATE_FOLLOW,GET_DISTRICT } from '../../actions';
import $ from 'jquery';
import { CheckAuth, LoadingSec, getAge, LoadImage, Encrypt } from "../Helpers/SettingHelper";
var qs = require('qs');
class GenFollowing extends Component 
   {
    constructor(props) {
        CheckAuth();
        super(props);
        this.state = {
            followList:'',
            loading:true,
            page:1,
            totalpage:0,
            pagenation:'',
            totalfollow:0,
            genmessage:'',
            email:'',
            gender:'',
            age:'',
            usertype:{'GC':'Customer', 'GR':'GenRun', 'GP':'GenPro', 'GA':'GenAgent'},
            district:[],
            location:''
        }
    }
    componentDidMount() {
        let params = 'gentype=following&page='+this.state.page;
        this.props.getFollow(params);
        this.props.getDistrict();
        
        $("a.readmore").click(function(){
            $(this).parents(".gen-follow-inner-body").find(".h-toggle").addClass("h-toggle");
            $(this).parents(".gen-follow-info").find(".h-toggle").toggleClass("h-toggle");
        })
    }
    componentWillReceiveProps(Props) {
         if(Props.follows !==this.props.follows){
             this.setState({loading:false});
            if(Props.follows[0].status === "success"){
                if(this.state.page===1) {
                    this.setState({totalpage:Props.follows[0].totalpage, totalfollow:Props.follows[0].totalfollow}, function() {
                        this.loadPageNation();
                    });
                }
                else {
                    this.loadPageNation();
                }                 
                this.setState({follows:Props.follows[0].result_set}, function() {
                    this.loadFollows();
                });
            }
            else {
                this.setState({followList:<div class="follow-nrf">No record found</div>})
            }
        }
        if(Props.createfollows !==this.props.createfollows){
            if(Props.createfollows[0].status === "success"){
                let id = Encrypt(Props.createfollows[0].fid,'d');
                let follow = Props.createfollows[0].follow;
                if(follow==="1") {
                    $('#'+id+' .gen-follow-event button').removeClass('btn_grey').addClass('btn_orange').html('Follow').attr('data-follow', 1);
                }
                else {
                    $('#'+id+' .gen-follow-event button').removeClass('btn_orange').addClass('btn_grey').html('Unfollow').attr('data-follow', 0);
                }
            }
        }

        if(Props.district !== this.props.district){
          const districtList = [];
          Props.district[0].district_list.map(function(item){  
            districtList.push({
                  value: item.value,
                  label: item.label
              });
          });
          this.setState({district:districtList});
        }
    }
    handleChange = (item, event) => {
        if(event===null) {
            this.setState({[item]:''}, function() {
                this.applyFiltter();
            })
        }
        else {
            this.setState({[item]:event.value}, function() {
                this.applyFiltter();
            })
        }        
    }
    aboutmecontent(userID) {
    if ($("#listabout_" + userID).hasClass("h-toggle") === false) {
      $("#listabout_" + userID).addClass("h-toggle");
      $(".read_district" + userID).text("Read More");
    } else {
      $("#listabout_" + userID).removeClass("h-toggle");
      $(".read_district" + userID).text("Read Less");
    }
  }
  
    loadFollows() {
        let followList;
        if(this.state.follows!=='' && typeof this.state.follows!=="undefined") {
            followList = this.state.follows.map((dfollow, index) => {
                return (
                    <div className="gen-follow-row" key={index} id={dfollow.following_id}>
                        <div className="gen-follow-text">
                            <div className="gen-follow-img">
                                <img src={LoadImage(dfollow.profile, 'profile')} alt="" />
                            </div>
                            <div className="gen-follow-info">
                                <div className="gen-follow-info-top">
                                    <div className="gfi-name">
                                        <b>{dfollow.name}</b>
                                    </div>
                                    {(dfollow.user_type!==null) &&
                                        <div className="gfi-category">{this.state.usertype[dfollow.user_type]}</div>
                                    }
                                    {(dfollow.service_name!==null) &&
                                        <div className="gfi-job">{dfollow.service_name}</div>
                                    }
                                    <div className="gfi-datetime"><span>{dfollow.created_date}</span></div>
                                </div>
                               { /*<div className="gen-follow-info-bottom">
                                    <div className="gfi-category">Gender: {(dfollow.user_gender!=='' && dfollow.user_gender!==null)?dfollow.user_gender:'N/A'}</div>
                                    <div className="gfi-job">Age: {(dfollow.user_dob!==null && dfollow.user_dob!=='')?getAge(new Date(dfollow.user_dob)):'N/A'}</div>
                                    <div className="gfi-datetime">
                                     <div id={"listabout_" + dfollow.following_id} className="hidi-content h-toggle">Location: {(dfollow.district_list!=='' && dfollow.district_list!==null)?dfollow.district_list:'N/A'}
                                    </div>
                                        <div className="gen-follow-rm">
                                        {dfollow.district_list !== "" &&
                                        dfollow.district_list !== null &&
                                        dfollow.district_list.length > 150 ? (
                                        <a
                                        href="javascript:void(0);"
                                        className={
                                        "read_district" + dfollow.following_id + " readmore"
                                        }
                                        onClick={this.aboutmecontent.bind(
                                        this,
                                        dfollow.following_id
                                        )}
                                        >
                                        Read More
                                        </a>
                                        ) : (
                                        ""
                                        )}
                                        </div>

                                    </div>
                                </div>*/}
                                
                            </div>
                        </div>
                        <div className="gen-follow-event">
                            <button type="button" data-follow={dfollow.follow} onClick={this.crateFollow.bind(this, dfollow.following_id)} className="btn btn2 btn_sm btn_grey">Unfollow</button>
                        </div>
                    </div>
                );
            });
        }
        this.setState({followList:followList});
    }
    loadPageNation() {
        let pageList =  (
            <div className="gen-follow-pagination">
                <ul>
                    {(this.state.page>1 && this.state.totalpage>0) &&
                        <li className="follow-prev-next"><a href="javascript:void(0);">Previous</a></li>
                    }
                    {(this.state.totalpage>1)?this.loadStartPageList():''}
                    {(this.state.page!==this.state.totalpage && this.state.totalpage>0) &&
                        <li className="follow-prev-next"><a href="javascript:void(0);">Next</a></li>
                    }
                </ul>
            </div>
        );
        this.setState({pagenation:pageList});
    }
    loadStartPageList() {
        let currentPage = (this.state.page>1)?parseInt(this.state.page)-1:1;
        let nextloop = (parseInt(currentPage)+3<=this.state.totalpage)?parseInt(currentPage)+3:this.state.totalpage;      
        let ToReturn = [];
        for(var i=currentPage; i<=nextloop; i++) {
            ToReturn.push(<li key={i} className={(this.state.page===i)?'active':''} onClick={this.loadMore.bind(this, i)}><a href="javascript:void(0);">{i}</a></li>);
        }
        return ToReturn;
    }
    loadMore(page) {
        this.setState({page:page});
        let params = 'gentype=following&page='+page+'&genmessage='+this.state.genmessage+'&email='+this
        .state.email+'&gender='+this.state.gender+'&age='+this.state.age;
        this.props.getFollow(params);
    }
    applyFiltter() {
        
        this.setState({page:1,loading:true});
        let params = 'gentype=following&page=1&genmessage='+this.state.genmessage+'&email='+this
        .state.email+'&gender='+this.state.gender+'&age='+this.state.age+'&location='+this.state.location;
        this.props.getFollow(params);
    }
    crateFollow(following_id) {
        let follow = $('#'+following_id+' .gen-follow-event button').attr('data-follow');
        var postObject = {
            following_id:Encrypt(following_id,'e'),
            follow:(follow==="1")?0:1
        }
        this.props.getCreateFollow(qs.stringify(postObject));
    }
    render() {       
          const GenMessage = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ];
          const Email = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ];
          const Gender = [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
          ];
          const Age = [
            { value: '18-25', label: '18-25' },
            { value: '26-40', label: '26-40' },
            { value: '41-50', label: '41-50' },
          ];
         
        return (
            <div>
                <Header />
                <SecondaryHeader />
                <Profilebar follow="following" />
                <div className="wrapper_out">
                    <div className="container">
                        <div className="gen-followpage-wrapper">
                               <div className="gen-follow-box-wrapper">
                                   <div className="gen-follow-box">
                                       <div className="gen-follow-heading">
                                          <div className="group-msg-innerhead">
                                              <h2><span>Following</span> <sup>({this.state.totalfollow})</sup></h2>
                                          </div>
                                       </div>
                                       
                                        <div className="gen-follow-body">
                                           <div className="gen-follow-inner-body">
                                               {/* <div className="gen-follow-filter following-filter">
                                                    <div>
                                                            <label>GenMessage</label>
                                                            <div className="re_select">
                                                            <Select 
                                                              options={GenMessage}
                                                              onChange={this.handleChange.bind(this, 'genmessage')}
                                                              isClearable={true}
                                                             />
                                                            </div>
                                                    </div>
                                                    <div>
                                                            <label>Email</label>
                                                            <div className="re_select">
                                                            <Select options={Email}
                                                                onChange={this.handleChange.bind(this, 'email')}
                                                                isClearable={true}
                                                             />
                                                            </div>
                                                    </div>
                                                    <div>
                                                            <label>Gender</label>
                                                            <div className="re_select">
                                                            <Select
                                                                options={Gender}
                                                                onChange={this.handleChange.bind(this, 'gender')}
                                                                isClearable={true}
                                                             />
                                                            </div>
                                                    </div>
                                                    <div>
                                                            <label>Age</label>
                                                            <div className="re_select">
                                                            <Select
                                                                options={Age}
                                                                onChange={this.handleChange.bind(this, 'age')} 
                                                                isClearable={true}
                                                             />
                                                            </div>
                                                    </div>
                                                    <div>
                                                            <label>Location</label>
                                                            <div className="re_select">
                                                            <Select 
                                                                 options={this.state.district}
                                                                 onChange={this.handleChange.bind(this, 'location')} 
                                                                 isClearable={true}                                                               
                                                         />
                                                            </div>
                                                    </div>
                                                </div>*/}
                                                {(this.state.loading===false) ?(
                                                    <div>
                                                        {this.state.followList} 
                                                        {this.state.pagenation}
                                                    </div>):(
                                                        LoadingSec
                                                    )
                                                }  
                                                </div>
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
    follows         : state.follows,
    createfollows   : state.createfollows,
    district        : state.district
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFollow: (params) => {
       dispatch({ type: GET_FOLLOW, params});
    },
    getCreateFollow: (formPayload) => {
       dispatch({ type: GET_CREATE_FOLLOW, formPayload});
    },
    getDistrict: () => {
      dispatch({ type: GET_DISTRICT});
    }
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenFollowing));