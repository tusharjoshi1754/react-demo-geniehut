/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, Modal, Table , ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Icoprofile from '../../common/images/ico_profile.png';
import BarScan from '../../common/images/bar_scan.jpg';
import AddMyService from '../../common/images/myservice-add.png';
import ServiceCheck from '../../common/images/accounts/service_checkbox.png';

import GeneralUser from '../../common/images/accounts/generaluser.png';
import GeneralPro from '../../common/images/accounts/genpro.png';
import GeneralAgent from '../../common/images/accounts/genagent.png';
import GeneralRun from '../../common/images/accounts/genrun.png';
import GeneralRedeem from '../../common/images/accounts/genredeem.png';
import ModalPopup from '../Layout/ModalPopup';
import GenPro_Content from '../Layout/GenPro';
import GenAgent_Content from '../Layout/GenAgent';
import GenRun_Content from '../Layout/GenRun';
import GenRedeem_Content from '../Layout/GenRedeem';


import Profilebar from './Profilebar';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Genrunjobs extends Component {
constructor(props) {
    super(props);
    this.state = {
      activegc:'enable',
      activegp:'enable',
      activega:'enable',
      activegr:'active enable',
      activegrd:'enable',
        modalGenpro: false,
        modalGenAgent: false,
        modalGenRun: false,
        modalGenRedeem: false

      }
        this.toggleGenpro = this.toggleGenpro.bind(this);
        this.toggleGenAgent = this.toggleGenAgent.bind(this);
        this.toggleGenRun = this.toggleGenRun.bind(this);
        this.toggleGenRedeem = this.toggleGenRedeem.bind(this);
      this.enableactive = this.enableactive.bind(this);
  }

  toggleGenpro() {
    this.setState(prevState => ({
      modalGenpro: !prevState.modalGenpro
    }));
  }	
   toggleGenAgent() {
    this.setState(prevState => ({
      modalGenAgent: !prevState.modalGenAgent
    }));
  }
   toggleGenRun() {
    this.setState(prevState => ({
      modalGenRun: !prevState.modalGenRun
    }));
  }
   toggleGenRedeem() {
    this.setState(prevState => ({
      modalGenRedeem: !prevState.modalGenRedeem
    }));
  }
    
  componentDidMount(){
     const numbers = cookie.load('login_user_type');
     const listItems = numbers.map((number) =>
            this.enableactive(number)
    );

  }

    enableactive(number){
        if(number == 'GC'){
           this.setState({activegc: ''})
        }
        if(number == 'GP'){
           this.setState({activegp: ''})
        }
        if(number == 'GR'){
           this.setState({activegr: 'active'})
        }
        if(number == 'GA'){
           this.setState({activega: ''})
        }
        if(number == 'GRD'){
           this.setState({activegrd: ''})
        }
}

render() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <div>
            <Header />
            <Profilebar />
            
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <div className="sdmenu_tab">
                            <ul className="sdmenu_list">
                                 <li>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_general_info"></i></a>
                                   <Link to={"/edit-general-info"} title="GenUser" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_general_info"></i>
                                        <b>GenUser</b>                                        
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn"><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                 <li className={this.state.activegp}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genpro"></i></a>
                                   <Link to={"/edit-gen-pro"} title="Genpro" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genpro"></i>
                                        <b>GenPro</b> 
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        {this.state.activegp?<span className="sdm_enable_txt">Enable</span>:''}                                   <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenpro}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                               <li className={this.state.activegr}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genrun"></i></a>
                                   <Link to={"/edit-gen-run"} title="GenRun" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>        
                                   </Link>
                                   <span className="sdmenu_list_right">
                                        {this.state.activegr?<span className="sdm_enable_txt">Enable</span>:''}                      
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRun}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className={this.state.activega}>
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genagent"></i></a>
                                    <a href="#" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenProperty</b>   
                                    </a>
                                   <span className="sdmenu_list_right">
                                        {this.state.activega?<span className="sdm_enable_txt">Enable</span>:''}                                   <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenAgent}><i className="fa fa-question"></i></a>
                                   </span>
                                    
                                </li>
                                <li className="enable">
                                    <a className="xs-icon-visible" href="javascript:void(0)"><i className="sdm_ico sdmico_genredeem"></i></a>
                                    <a href="#" className="sdmenu_list_left">
                                        <i className="sdm_ico sdmico_genredeem"></i>
                                        <b>GenAds</b>         
                                    </a>
                                   <span className="sdmenu_list_right">
                                        <span className="sdm_enable_txt">Enable</span>                               
                                        <a href="javascript:void(0);" className="Edit_Pro_Qn" onClick={this.toggleGenRedeem}><i className="fa fa-question"></i></a>
                                   </span>
                                </li>
                            </ul>
                        </div>
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
								
								<ul className="sdhmenu_tablist">
                                    <li >
                                        <Link to={"/edit-gen-run"} title="My Services">Details</Link>
                                    </li>
                                     <li>
                                        <Link to={"/genrun-my-services"} title="My Services">My Services</Link>
                                    </li>
                                    <li>
                                        <Link to={"/genrun-customerleads"} title="Customer Leads">Customer Leads</Link>
                                    </li>
                                    <li className="active">
										<Link to={"/genrun-jobs"} title="Jobs">Jobs</Link>
                                    </li>
                                </ul>
                               
                                <Link to={"/edit-gen-run"} className="sdhmenu_mtabtrigger" title="GenPro Details">Details <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-my-services"} className="sdhmenu_mtabtrigger" title="GenRun Details">My Services <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-customerleads"} className="sdhmenu_mtabtrigger" title="GenRun Details">Customer Leads <i className="fa fa-angle-down"></i></Link>
                                <Link to={"/genrun-jobs"} className="sdhmenu_mtabtrigger active" title="GenRun Details">Jobs <i className="fa fa-angle-down"></i></Link>
                                <div className="sdhmenu_content">
                                    <div className="gen-table-wrapper">
                                        <div className="gen-table-header">
                                            <h3>Jobs</h3>
                                            <div className="gen-table-sort">
                                                <label>Sort By:</label>
                                                <div className="re_select">
                                                    <Select  options={options} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="gen-table-body">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Service Provider</th>
                                                        <th>Services</th>
                                                        <th>Transaction No</th>
                                                        <th>Requested Date</th>
                                                        <th>Requested Via</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colspan="6" className="v-align-nr">No Result</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="gen-table-footer">
                                          <a href="javascript:void(0);" className="btn btn_orange btn_minwid btn-width animate-btn2" title="Button">Load More</a>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            
            <ModalPopup modal={this.state.modalGenpro} toggle={this.toggleGenpro} className="modal-width Genpro_popup Gen_popup" title="How Genpro works?" >				
                <GenPro_Content />				
            </ModalPopup>	  

            <ModalPopup modal={this.state.modalGenAgent} toggle={this.toggleGenAgent} className="modal-width GenAgent_popup Gen_popup" title="How GenProperty works?" >					
                <GenAgent_Content />		
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRun} toggle={this.toggleGenRun} className="modal-width GenRun_popup Gen_popup" title="How GenRun works?" >	
                <GenRun_Content /> 
            </ModalPopup>	

            <ModalPopup modal={this.state.modalGenRedeem} toggle={this.toggleGenRedeem} className="modal-width GenRedeem_popup Gen_popup" title="How GenAds works?" >
                <GenRedeem_Content />
            </ModalPopup>	

                                    
        </div>
    );
}
}

export default Genrunjobs;

/* Popup Add Service Content */
function PopupAddService(props) {
    return (
       
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-width modals add-service-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
               <h2>Add Services</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="add-service-popup-wrapper">
                    <div className="add-service-popup-inner-wrapper">
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_customer"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralUser} alt="" /></span>
                                <span className="asp-caption">General User</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genpro"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralPro} alt="" /></span>
                                <span className="asp-caption">GenPro</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genagent"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralAgent} alt="" /></span>
                                <span className="asp-caption">GenAgent</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genrun"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRun} alt="" /></span>
                                <span className="asp-caption">GenRun</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genredeem"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRedeem} alt="" /></span>
                                <span className="asp-caption">GenRedeem</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_customer"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralUser} alt="" /></span>
                                <span className="asp-caption">General User</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genpro"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralPro} alt="" /></span>
                                <span className="asp-caption">GenPro</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genagent"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralAgent} alt="" /></span>
                                <span className="asp-caption">GenAgent</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genrun"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRun} alt="" /></span>
                                <span className="asp-caption">GenRun</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genredeem"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRedeem} alt="" /></span>
                                <span className="asp-caption">GenRedeem</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_customer"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralUser} alt="" /></span>
                                <span className="asp-caption">General User</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genpro"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralPro} alt="" /></span>
                                <span className="asp-caption">GenPro</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genagent"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralAgent} alt="" /></span>
                                <span className="asp-caption">GenAgent</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genrun"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRun} alt="" /></span>
                                <span className="asp-caption">GenRun</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genredeem"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRedeem} alt="" /></span>
                                <span className="asp-caption">GenRedeem</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_customer"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralUser} alt="" /></span>
                                <span className="asp-caption">General User</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genpro"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralPro} alt="" /></span>
                                <span className="asp-caption">GenPro</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genagent"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralAgent} alt="" /></span>
                                <span className="asp-caption">GenAgent</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genrun"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRun} alt="" /></span>
                                <span className="asp-caption">GenRun</span>
                                </label>
                           </div>
                        </div>
                        <div className="asp-col">
                           <div className="asp-inner-box">    
                                <input type="checkbox" name="user_type_genredeem"/>
                                <label className="asp-checkbox-label">
                                <img src={ServiceCheck} alt="" className="asp-checktik" />
                                <span className="default-img"><img src={GeneralRedeem} alt="" /></span>
                                <span className="asp-caption">GenRedeem</span>
                                </label>
                           </div>
                        </div>
                    </div>
                </div>        
        </Modal.Body>
		<div className="modals-button">
			<a href="javascript:void(0);" className="btn btn_orange btn_minwid btn-width" title="Button">Add your service</a>
			<a href="javascript:void(0);" className="btn btn_grey btn_minwid btn-width" title="Button">Cancel</a>
			<a href="javascript:void(0);" className="btn btn_orange btn_minwid btn-width modal-bottom-close"  onClick={props.onHide} title="Button">Close</a>
		</div>
      </Modal>
    );
  }

/* Popup Add Service Function */
function Popup_addservice() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <div>
        <div className="gen-myservices-box gen-add-service" onClick={() => setModalShow(true)}>
            <div className="gen-myservices-img">
                <img src={AddMyService} alt="Add" />
            </div>
            <div className="gen-myservices-text">
                Add New Service
            </div>
        </div>        

        <PopupAddService
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  }
