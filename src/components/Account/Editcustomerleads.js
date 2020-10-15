/* eslint-disable */
import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, Modal, Table} from 'react-bootstrap';
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

class Editcustomerleads extends Component {

render() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <div>
            <Header />
            <div className="profile_tbar">
                <div className="container clearfix">
                  <div className="profile_tbleft">
                    <div className="profile_tbimg">
                        <img src={Icoprofile} alt="Upload photo" />
                        <span>Upload photo</span>
                    </div>
                    <div className="profile_tbinfo">
                        <h3 className="text-uppercase">Brandon Choi Yong Suk</h3>
                        <p>Email:<span>brandon@gmail.com</span></p>
                        <p>Mobile:<span>+65 8292XXXX</span> 
                            <div className="verified_check"><i className="fa fa-check"></i>Verified</div>
                            </p>
                    </div>
                  </div>
                  <div className="profile_tbright text-center">
                    <div className="row">
                        <div className="col">
                            <h4 className="text-uppercase">Available Points</h4>
                            <span className="profile_tbpoint_text">1450</span>
                            <p>See <a href="#" title="transactions">transactions</a></p>
                        </div>
                        <div className="col">
                            <a href="#" className="btn btn_orange btn_sm" title="Buy points">Buy points</a>
                            <p>How <a href="#" title="GH points">GH points</a> works?</p>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            
            <div className="wrapper_out">
                <div className="container">
                    <div className="sdmenu_wrapper">
                        <div className="sdmenu_tab">
                            <ul className="sdmenu_list">
                                <li>
                                    <a href="#">
                                        <i className="sdm_ico sdmico_general_info"></i>
                                        <b>General Info</b>                                        
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <i className="fa fa-question"></i>
                                            <div className="tooltip_info">
                                                <p>Lorem Ipsum </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genpro"></i>
                                        <b>GenPro</b>                                        
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <i className="fa fa-question"></i>
                                            <div className="tooltip_info">
                                                <p>Lorem Ipsum </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="enable">
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenAgent</b>   
                                        <span className="sdm_enable_txt">Enable</span>                                     
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <i className="fa fa-question"></i>
                                            <div className="tooltip_info">
                                                <p>Lorem Ipsum </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="enable">
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>                      
                                        <span className="sdm_enable_txt">Enable</span>                  
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <i className="fa fa-question"></i>
                                            <div className="tooltip_info">
                                                <p>Lorem Ipsum </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="enable">
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genredeem"></i>
                                        <b>GenRedeem</b>         
                                        <span className="sdm_enable_txt">Enable</span>                               
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <i className="fa fa-question"></i>
                                            <div className="tooltip_info">
                                                <p>Lorem Ipsum </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="sdmenu_tabcontent">
                            <div className="sdhmenu_wrapper">
                                <ul className="sdhmenu_tablist">
                                    <li>
                                        <a href="#" title="GenPro Details">GenPro Details</a>
                                    </li>
                                    <li>
                                        <a href="#" title="My Services">My Services</a>
                                    </li>
                                    <li className="active">
                                        <a href="#" title="Customer Leads">Customer Leads</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Jobs">Jobs</a>
                                    </li>
                                </ul>
                                <a href="#" className="sdhmenu_mtabtrigger" title="GenPro Details">GenPro Details <i className="fa fa-angle-down"></i></a>
                                <a href="#" className="sdhmenu_mtabtrigger" title="GenPro Details">My Services <i className="fa fa-angle-down"></i></a>
                                <a href="#" className="sdhmenu_mtabtrigger active" title="GenPro Details">Customer Leads <i className="fa fa-angle-down"></i></a>
                                <div className="sdhmenu_content">
                                    <div className="gen-table-wrapper">
                                        <div className="gen-table-header">
                                            <h3>Customer Leads</h3>
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
                                                        <th>Job Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span className="gen-table-sp-img"><img src={GeneralRedeem} alt="" /></span> <span className="gen-table-sp-txt">XSA Swim Academy| Bishan Swimming Coaches 0115</span>
                                                        </td>
                                                        <td>Cleaning services</td>
                                                        <td>201808031533272471</td>
                                                        <td>12 months ago</td>
                                                        <td>Completed</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className="gen-table-sp-img"><img src={GeneralRedeem} alt="" /></span> <span className="gen-table-sp-txt">XSA Swim Academy| Bishan Swimming Coaches 0115</span>
                                                        </td>
                                                        <td>Cleaning services</td>
                                                        <td>201808031533272471</td>
                                                        <td>12 months ago</td>
                                                        <td>Completed</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            N/A
                                                        </td>
                                                        <td>Cleaning services</td>
                                                        <td>201808031533272471</td>
                                                        <td>12 months ago</td>
                                                        <td>Completed</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            N/A
                                                        </td>
                                                        <td>Cleaning services</td>
                                                        <td>201808031533272471</td>
                                                        <td>12 months ago</td>
                                                        <td>Completed</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="gen-table-footer">
                                          <ul className="gen-table-pagination">
                                              <li><a href="javascript:void(0);">1</a></li>
                                              <li className="active"><a href="javascript:void(0);">2</a></li>
                                              <li><a href="javascript:void(0);"><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                                          </ul>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="sdhmenu_mtabtrigger" title="GenPro Details">Jobs <i className="fa fa-angle-down"></i></a>
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

export default Editcustomerleads;

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
