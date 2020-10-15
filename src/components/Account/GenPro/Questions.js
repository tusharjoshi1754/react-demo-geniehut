/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {   withRouter } from 'react-router-dom';
import $ from 'jquery';
import {Row, Col, ProgressBar } from 'react-bootstrap';
import 'react-intl-tel-input/dist/main.css';
import { GET_PRO_QUESTIONS, GET_UPDATE_PRO_QUESTIONS } from '../../../actions';
import cookie from 'react-cookies';
import {CalculatePercentage, LoadingSec, Encrypt, isNumber} from '../../Helpers/SettingHelper';
import {apiUrl, appName, mediaUrl } from "../../Config/Config";
//var serialize = require('form-serialize');
class Questions extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            userToken:cookie.load('UserAuthToken'),
            modalLogin: false,
            questionFrm1:'',
            currentStep: 1,
            loading:true,
            serviceID: this.props.serviceID,
            proQuestions:[],
            QuestionDetails:'',
            currentProgress:0,
            nextMove  : 1,
            formLoad:false,
            loadQuestion:true,
          };
    }
   componentDidMount(){
      let params = 'app_name='+appName+'&user_token='+this.state.userToken+'&service_id='+Encrypt(this.state.serviceID, 'e')
      this.props.getQuestions(params);
      $(document).ready(function() {
        $('body').on('change', '.options_check', function() {
          let types = $(this).parents('.service-step-box').data('type');
          let curretnID = $(this).parents('.options').attr('id');
          if(types==="radio") {
            $(this).parents('.service-step-box').find('.remarks').hide();
          }          
          if ($(this).is(':checked')) {
              $('#'+curretnID+' .remarks').show();
          }
          else{
            $('#'+curretnID+' .remarks').hide();
          }
        });
        $('body').on('change', 'input[type="file"]', function(e) {
          if(e.target.files!=='' && typeof e.target.files!=="undefined") {
            var roots = $(this).parents('.file_upload_wrap');
            var fileName = e.target.files[0].name;
            roots.find('.File_upload_value').html(fileName);
          }
        });
        $('body').on('click', '.add_more_image', function(e) {
          var roots = $(this).parents('.form-group');
          if(roots.find('.row').length<=3) {
            var htmls = roots.find('.row:last-child').html();
            roots.append('<div class="row">'+htmls+'</div>');
            roots.find('.row').last().find('.File_upload_value').html('File Uploaded');
            roots.find('.row').last().find('.preview-image').html('');
            
            roots.find('.row').last().find('input[type="file"]').val('');          
            roots.find('.row').last().find('input[type="text"]').val('');
            roots.find('.add_more_image').hide();
            roots.find('.remove_image').show();
            roots.find('.add_more_image').first().show();
            roots.find('.remove_image').first().hide();
          }
          else {
            alert('Maximum 4 fields are allowed.');
          }
        });
        $('body').on('click', '.remove_image', function(e) {
           $(this).parents('.row').remove();
        });
        $('body').on('click', '.removeImage', function(e) {
          var roots = $(this).parents('.file_upload_wrap');
          roots.find('.exist_image').val('');
          roots.find('.preview-image').html('');
        })
        
        
      });
   }
   componentWillReceiveProps(Props){
      if(Props.proquestions !== this.props.proquestions){
         this.setState({loadQuestion:false});
          if(Props.proquestions[0].status==='success') {
              this.setState({proQuestions:Props.proquestions[0].questions}, function() {
                this.displayQuestions()
              });
          }
      }
      if(Props.proupdatequestion !== this.props.proupdatequestion){
        /*if(Props.proupdatequestion[0].status==='success') {
          this.props.updateQuestion(Props.proupdatequestion[0].status);
        }*/
      }
      
   }
   handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
  }
 
 
  loginresponse = (userToken, name) => {
      if(userToken!=='' && typeof userToken!=='undefined') {   
          
        this.setState({userToken:userToken, UserFullname:name}, function() {          
            this._search();
        });
      }
    }
   

  _next = () => {
    let currentStep = this.state.currentStep;
    const error = this.validateForm(currentStep);
    if(error===0) {
      $('.alert-Field').hide();
      currentStep = parseInt(currentStep) + 1
      const totlaStep = $('.service-step-box').length;
      const currentProgress = CalculatePercentage(totlaStep, this.state.nextMove);
      this.setState({currentProgress:currentProgress});
      this.setState({
        currentStep: currentStep,
        nextMove:parseInt(this.state.nextMove)+1
      })
      $('.service-step-box').hide()
      $('#step_'+currentStep).show();
      $('.modal-content').animate({
        'scrollTop' : $('#step_'+currentStep).position().top-200
      });
    }
    else {
      $('.alert-Field').show();
    }    
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    $('.service-step-box').hide()
    $('#step_'+currentStep).show();
  }
  
  _search = () => {
    
    let currentStep = this.state.currentStep
    const error = this.validateForm(currentStep);
    if(error===0) {
      if(this.state.userToken!=='' && typeof this.state.userToken!=="undefined") {
        this.setState({formLoad:true});
        $('.alert-Field').hide();
        var form = $('#questionFrm');
        var formdata = false;
        if (window.FormData){
            formdata = new FormData(form[0]);
        }
        
        let current = this;
        $.ajax({
            url         : apiUrl+'genpro/updateProquestions',
            data        : formdata ? formdata : form.serialize() ,
            cache       : false,
            async       : false,
            contentType : false,
            processData : false,
            dataType    : "JSON",
            type        : 'POST',
            success     : function(result, textStatus, jqXHR){
              current.props.updateQuestion(result.status);
            }
        });
        this.props.getUpdateProQuestion(formdata);
      }
      else {
      
      
      }
    }
    else {
      $('.alert-Field').show();
    }
   
  }

  validateForm(currentStep) {
    let error = 0;
    if(('#step_'+currentStep+' .require').length>0) {
        const currentType = $('#step_'+currentStep).data('type');
        if(currentType==="textarea") {
          if($('#step_'+currentStep+' textarea').val()===''){
              error++;
            }
        }
        else if(currentType==="textbox") {
            if($('#step_'+currentStep+' input[type="text"]').val()===''){
              error++;
            }
        }
        else if(currentType==="checkbox") {
          if($('#step_'+currentStep+' input[type="checkbox"]:checked').length===0){
             error++;
          }
          else {
             $('#step_'+currentStep+' input[type="checkbox"]:checked').each(function() {
                var currentCheck = $(this).parents('.options').attr('id');
                if($('#'+currentCheck+' .optremarks').val()==='') {
                  $('#'+currentCheck+' .optremarks').addClass('error');
                  error++;
                }
                else {
                  $('#'+currentCheck+' .optremarks').removeClass('error');
                }
            });
          }
        }
        else if(currentType==="radio") {
          if($('#step_'+currentStep+' input[type="radio"]:checked').length===0){
             error++;
          }
           else {
             $('#step_'+currentStep+' input[type="radio"]:checked').each(function() {
                var currentCheck = $(this).parents('.options').attr('id');
                if($('#'+currentCheck+' .optremarks').val()==='') {
                  $('#'+currentCheck+' .optremarks').addClass('error');
                  error++;
                }
                else {
                  $('#'+currentCheck+' .optremarks').removeClass('error');
                }
            });
          }
        }
    }
    return error;
  }

    /*
    * the functions for our button
    */
    previousButton() {
      if(this.state.currentStep>1) {  
        return (
            <button 
              className="btn animate-btn2 btn_grey ab-none btn_sm" 
              type="button" onClick={this._prev}>
            Previous
            </button>
          )
      }
    
    }

nextButton(){
      if(this.state.currentStep!==$('.service-step-box').length) {  
      return (
        <button 
          className="btn animate-btn2 btn_green ab-none float-right btn_sm" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
      }

}

searchButton(){
    if(this.state.currentStep===$('.service-step-box').length) {  
      return (
        <button 
          className="btn animate-btn2 btn_green float-right btn_sm" 
          type="button" onClick={this._search} disabled={(this.state.formLoad)?false:false}>
          {this.state.formLoad ===true &&
          <span className="load-data-mini">Loading</span> 
          }
        Complete
        </button>        
      )
    }
  
}

  displayQuestions() {
    let QuestionDetails = '';
    if(this.state.proQuestions!=="") {
      QuestionDetails = this.state.proQuestions.map((quesDet, index) =>{
        let steps = parseInt(index)+1;
          return (
              <div className="service-step-box" data-type={quesDet.quiz_answer_type} id={'step_'+steps} key={index} style={{display:(this.state.currentStep===steps)?'block':'none'}}>
                  <div className={(quesDet.quiz_required==='Y')?'form-group require':'form-group'}>
                    <label htmlFor="username">
                        {quesDet.quiz_question}
                        {(quesDet.quiz_required==="Y") &&
                          <span className="required">*</span>
                        }
                    </label>
                    <input type="hidden" value={quesDet.ques_quiz_id} name="ques_id[]" />
                    {this.loadOptions(quesDet)}
                  </div>
            </div>
          )
      });
    }
    this.setState({QuestionDetails:QuestionDetails});
  }

  loadOptions(options) {
      if(options) {
        const opt = options;        
        let answerNew = '';
        if(opt['quiz_answer_type']==="textarea") {
          return Object.entries(opt['options']).map((item, index) =>{
            let ans = item[1]; 
            if(ans.vendor_ans_content!==null && ans.vendor_ans_content!=="") {
              answerNew = ans.vendor_ans_content;
            }
            else if(ans.vendor_ans_content_temp!==null && ans.vendor_ans_content_temp!==""){
              answerNew = ans.vendor_ans_content_temp;
            }
            else {
              answerNew = '';
            }
          
          return(
            <div key={index}>
              <input type="hidden" value={ans.ques_id} name={'ans_id_'+ans.ques_quiz_id+'[]'} />
              <textarea
              className={(ans.quiz_required==="Y")?'form-control':'form-control'}
              name={'ans_'+opt.ques_quiz_id+'[]'} placeholder={ans.ques_content} defaultValue={answerNew}></textarea>
              {(ans.vendor_ans_content_temp!=='' && ans.vendor_ans_content_temp!==null) &&
                <div class="qus_unverified">Not Verified</div>
              }
            </div>
          )
          });
        }
        else if(opt['quiz_answer_type']==="textbox") {
          return Object.entries(opt['options']).map((item, index) =>{
            let ans = item[1]; 
            let classes = 'form-control';
            if(ans.ques_ref==="P") {
              classes+=' price_valid';
            }
            else if(ans.ques_ref==="PC") {
              classes+=' postal_code_valid';
            }
            if(ans.vendor_ans_content!==null && ans.vendor_ans_content!=="") {
              answerNew = ans.vendor_ans_content;
            }
            else if(ans.vendor_ans_content_temp!==null && ans.vendor_ans_content_temp!==""){
              answerNew = ans.vendor_ans_content_temp;
            }
            else {
              answerNew = '';
            }
            

          return(
            <div key={index}>
              <input type="hidden" value={ans.ques_id} name={'ans_id_'+opt.ques_quiz_id+'[]'} />
              <input
              className={classes} onKeyPress={(ans.ques_ref==="P" || ans.ques_ref==="PC")?(e) => isNumber(e):''}
              type="text" name={'ans_'+opt.ques_quiz_id+'[]'} defaultValue={answerNew}
              placeholder={(ans.ques_content!=='')?ans.ques_content:'Enter Postal Code'}
              />
              {(ans.vendor_ans_content_temp!=='' && ans.vendor_ans_content_temp!==null) &&
                <div class="qus_unverified">Not Verified</div>
              }
            </div>
          )
          });
        }
        else if(opt['quiz_answer_type']==="checkbox" || opt['quiz_answer_type']==="radio") {
            return Object.entries(opt['options']).map((item, index) =>{
              let quiz_answer_type = opt['quiz_answer_type'];
              let remarkanswerNew = '';
              if(item[1].vendor_ans_remarks =='Y' && item[1].vendor_ans_remark_content!=="") {
                remarkanswerNew = item[1].vendor_ans_remark_content;
              }
              else if(item[1].vendor_ans_remark_content_temp!==null && item[1].vendor_ans_remark_content_temp!==""){
                remarkanswerNew = item[1].vendor_ans_remark_content_temp;
              }
              else {
                remarkanswerNew = '';
              }

                return (
                  <div className="options" key={index} id={'options_'+item[1].ques_id}>
                    <div className={(quiz_answer_type==="radio")?'custom_radio':'custom_checkbox'}>
                      <input type="hidden" name={'ans_id_'+opt.ques_quiz_id+'[]'} value={item[1].ques_id} />
                      <input className="form-control options_check" type={opt['quiz_answer_type']} value={item[1].ques_id} name={'ans_'+opt.ques_quiz_id+'[]'} defaultChecked={(item[1].vendor_ans_answered==="Y")?true:false} /><span>{item[1].ques_content}</span>
                    </div>
                    { (item[1].ques_remarks==='Y') &&
                    <div className="form-group remarks" style={{display:(item[1].vendor_ans_answered==="Y")?'':'none'}}>
                        <label >
                            Add Remarks<span className="required">*</span>                          
                        </label>
                        <textarea className="form-control optremarks" name={'remarks_ans_'+opt.ques_quiz_id+'_'+item[1].ques_id} defaultValue={remarkanswerNew}></textarea>
                        {(item[1].vendor_ans_remark_content_temp!=='' && item[1].vendor_ans_remark_content_temp!==null) &&
                          <div class="qus_unverified">Not Verified</div>
                        }
                      </div>
                    }
                  </div>
                )
            });
        }
        else if(opt['quiz_answer_type']==="image") {
          return Object.entries(opt['options']).map((item, index) =>{
            let imageanswerNew, captionAns;
              if(item[1].vendor_ans_content!==null && item[1].vendor_ans_content!=="") {
                imageanswerNew = item[1].vendor_ans_content;
              }
              else if(item[1].vendor_ans_content_temp!==null && item[1].vendor_ans_content_temp!==""){
                imageanswerNew = item[1].vendor_ans_content_temp;
              }
              else {
                imageanswerNew = '';
              }
              console.log(imageanswerNew)

              if(item[1].vendor_ans_img_caption!==null && item[1].vendor_ans_img_caption!=="") {
                captionAns = item[1].vendor_ans_img_caption;
              }
              else if(item[1].vendor_ans_img_caption_temp!==null && item[1].vendor_ans_img_caption_temp!==""){
                captionAns = item[1].vendor_ans_img_caption_temp;
              }
              else {
                captionAns = '';
              }

          return(
            <Row key={index}>
              <Col md={5}>
                    <div className="file_upload_wrap">                      
                        <input type="hidden" value={item[1].ques_id} name={'ans_id_'+item[1].ques_quiz_id+'[]'} />
                        <input type="hidden" className="exist_image" value={imageanswerNew} name={'img_check_'+item[1].ques_quiz_id+'[]'} />
                        <input type="hidden" value={item[1].vendor_ans_id} name={'vendor_ans_id_'+item[1].ques_quiz_id+'[]'} />                        
                        <input type="file" className="form-control" name={'ans_'+item[1].ques_quiz_id+'[]'}  />
                        <div className="File_upload_Front">
                            <span className="File_upload_value">File Uploaded</span>
                            <span className="File_upload_btn"><i className="fa fa-paperclip" aria-hidden="true"></i></span>
                        </div>
                        {(imageanswerNew!=='') &&
                          <div className="preview-image">
                            <a href="javascript:void(0);"  class="pre-img-close removeImage"><i class="fa fa-times" aria-hidden="true"></i></a>
                            <img src={mediaUrl+'vendor_images/'+imageanswerNew} alt="" />
                          </div>
                        }
                    </div>
              </Col>
              <Col md={5}>
                    <input type="text" name={'ans_img_caption_'+item[1].ques_quiz_id+'[]'} className="form-control" placeholder="Eg. Caption" defaultValue={captionAns} />
              </Col>
              { (item[1].ques_type==="M") &&
                <Col md={2}>
                    <button type="button" className="btn btn_testsm ab-none row-add-btn add_more_image" style={{display:(index===0)?'':'none'}}>Add</button>
                    <button type="button" className="btn btn_testsm ab-none row-add-btn remove_image" style={{display:(index!==0)?'':'none'}}>Remove</button>
                </Col>
              }
          </Row>
          )
          });
        }
      }
  }

  render() {     
    return (
          <div>
            <div className="pro-service-form-block">
                  <div className="container">
                      <div className="pro-service-form-innerblock">
                          <div className="pro-service-form-wrap">
                            {(this.state.loadQuestion===true) &&
                              LoadingSec
                            }
                            { (this.state.loadQuestion===false && this.state.proQuestions.length>0) &&
                              <div>
                                <div className="psf-progress-wrapper">
                                    <div className="psf-progress-text"><span>{this.state.currentProgress}%</span> Completed</div>
                                    <ProgressBar now={this.state.currentProgress} />
                                    <div className="psf-progress-percent"><span>0%</span><span>100 %</span></div>
                                </div>
                                <div className="pro-service-form">
                                    <form  encType="multipart/form-data" id="questionFrm">
                                      <input type="hidden" name="app_name" value={appName} />
                                      <input type="hidden" name="service_id" value={Encrypt(this.state.serviceID,'e')} />
                                      <input type="hidden" name="user_token" value={cookie.load('UserAuthToken')} />
                                       
                                      {this.state.QuestionDetails}
                                    </form>
                                </div>
                                <div className="alert-Field" style={{display:'none'}}>Above field is mandatory</div>
                                <div className="pro-service-form-navs">
                                  {this.previousButton()}
                                  {this.nextButton()}
                                  {this.searchButton()}
                                </div>
                              </div>
                            }
                            { (this.state.loadQuestion===false && this.state.proQuestions.length===0) &&
                              <div>Question are not available</div>
                            }
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
     proquestions     : state.proquestions,
     proupdatequestion:state.proupdatequestion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (params) => {
      dispatch({ type: GET_PRO_QUESTIONS, params});
    },
    getUpdateProQuestion: (formPayload) => {
      dispatch({ type: GET_UPDATE_PRO_QUESTIONS, formPayload});
    },
     
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Questions));
