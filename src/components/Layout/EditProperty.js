import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';

import QnMarkDefault from '../../common/images/qn_mark_default.png';

class EditProperty extends Component {
	constructor(props) {
		super(props);	
        this.state = {
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
        <div className="EditDetailProperty_wrapper EditProperty_wrapper">
            <div className="EDProperty_header">
                <p>A property with more information provide a better system match and gives others confidence in dealing with you.</p>
            </div>
            <div className="EDProperty_form_wrap">
                <form action="">
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Property <span className="required">*</span></label>
                                <div className="re_select">
                                    <Select  options={options} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Property Type <span className="required">*</span></label>
                                <div className="re_select">
                                    <Select  options={options} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Property Name</label>
                                <input type="text" name="user_fullname" className="form-control" />
                            </Col>
                            <Col md={6}>
                                <label>Postal Code <span className="required">*</span></label>
                                <input type="text" name="user_fullname" className="form-control" />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>District name <span className="required">*</span></label>
                                <input type="text" name="user_fullname" className="form-control" />
                            </Col>
                            <Col md={6}>
                                <label>Floor level</label>
                                <div className="re_select">
                                    <Select  options={options} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Property coverd area <span className="required">*</span></label>
                                <div className="input_select_wrap">
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                                    <input type="text" name="user_fullname" className="form-control" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Price <span className="required">*</span></label>
                                <div className="input_select_wrap">
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                                    <input type="text" name="user_fullname" className="form-control" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>No. of Bedrooms</label>
                                <div className="re_select">
                                    <Select  options={options} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>No. of Bathrooms</label>
                                <div className="re_select">
                                    <Select  options={options} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Website URL
                                
                                     <div className="tooltip_ico">
                                        <ButtonToolbar>
                                          {['right'].map(placement => (
                                            <OverlayTrigger
                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                  Information
                                                </Tooltip>
                                              }
                                            >
                                              <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                            </OverlayTrigger>
                                          ))}
                                        </ButtonToolbar>
                                    </div>
                                
                                </label>
                                <input type="text" name="user_fullname" className="form-control" />
                            </Col>
                            <Col md={6}>
                                <label>YouTube URL
                                     <div className="tooltip_ico">
                                        <ButtonToolbar>
                                          {['right'].map(placement => (
                                            <OverlayTrigger
                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                  Information
                                                </Tooltip>
                                              }
                                            >
                                              <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                            </OverlayTrigger>
                                          ))}
                                        </ButtonToolbar>
                                    </div>
                                
                                </label>
                                <input type="text" name="user_fullname" className="form-control" />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Highlights
                                     <div className="tooltip_ico">
                                        <ButtonToolbar>
                                          {['right'].map(placement => (
                                            <OverlayTrigger
                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                  Information
                                                </Tooltip>
                                              }
                                            >
                                              <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                            </OverlayTrigger>
                                          ))}
                                        </ButtonToolbar>
                                    </div>
                                </label>
                                <textarea className="form-control"></textarea>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Upload Cover Picture</label>
                                <input type="file" className="form-control" />
                            </Col>
                        </Row>
                    </div>
                    <div className="EDProperty_header">
                        <h3>Preference</h3>
                        <p>Other property information (By providing more information, your property will have a better match with user preference and profile)</p>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Resales</label>
                            </Col>
                            <Col md={12}>
                               <div className="CheckboxWithSelect">
                                    <div className="custom_checkbox">
                                       <input type="checkbox"  name="" />
                                       <span>The unit is from the MRT/Subway</span>
                                    </div>
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                               </div>
                               <div className="CheckboxWithSelect">
                                    <div className="custom_checkbox">
                                       <input type="checkbox"  name="" />
                                       <span>Condition of the unit</span>
                                    </div>
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                               </div>
                               <div className="custom_checkbox">
                                   <input type="checkbox"  name="" />
                                   <span>The unit is a corner unit or facing only 1 neighbour unit</span>
                               </div>
                               <div className="custom_checkbox">
                                   <input type="checkbox"  name="" />
                                   <span>The unit is at least 100m from expressway or major road</span>
                               </div>
                               <div className="custom_checkbox">
                                   <input type="checkbox"  name="" />
                                   <span>The unit is bright with natural light.</span>
                               </div>
                               <div className="CheckboxWithSelect">
                                    <div className="custom_checkbox">
                                       <input type="checkbox"  name="" />
                                       <span>The main door (direction from inside) is facing</span>
                                    </div>
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                               </div>
                               <div className="CheckboxWithSelect">
                                    <div className="custom_checkbox">
                                       <input type="checkbox"  name="" />
                                       <span>The balcony/ living room’s window (direction from inside) is facing</span>
                                    </div>
                                    <div className="re_select">
                                        <Select  options={options} />
                                    </div>
                               </div>
                               <div className="custom_checkbox">
                                   <input type="checkbox"  name="" />
                                   <span>Immediate neighbours do not have pets.</span>
                               </div>
                               <div className="custom_checkbox csttico">
                                   <input type="checkbox"  name="" />
                                   <span>The unit is not under Housing Board Development (HDB) Home Improvement Programme (HIP).
                                     <div className="tooltip_ico">
                                        <ButtonToolbar>
                                          {['right'].map(placement => (
                                            <OverlayTrigger
                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                  Information
                                                </Tooltip>
                                              }
                                            >
                                              <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                            </OverlayTrigger>
                                          ))}
                                        </ButtonToolbar>
                                      </div>
                                    </span>
                               </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <button className="btn btn_green animate-btn2 EDSubmit" type="button">Update Property</button>
                            </Col>
                        </Row>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default EditProperty;
