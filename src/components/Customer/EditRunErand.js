import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col,   OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';

import QnMarkDefault from '../../common/images/qn_mark_default.png';


const district = [
    { value: 'No Meet up is Required', label: 'No Meet up is Required' },
    { value: 'D01 Boat Quay/ Marina', label: 'D01 Boat Quay/ Marina' },
  ];
const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];


class EditRunErand extends Component {

  render() {
    return (
               <div>
                  <div className="edit-run-erand-form-wrap">
                      <div className="run-erand-form-wrap">
                         <form action="">
                             <div className="form-group">
                                <Row>
                                    <Col md={12}>
                                        <label>I Need GenRun to <span className="required">*</span>
                                        <span className="tooltip_ico">
                                            <ButtonToolbar>
                                              {['bottom'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      Please describe the details of the run-errand activities/ part time jobs for the GenRun. Kindly note that any contact details/ email address detects by the system in the description will be omitted.
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </span>
                                        </label>
                                        <textarea className="form-control" placeholder="I Need Someone to ……. Please Contact Me +65XXXXXXX at XXXXX@gmail.com (All Contacts will be blocked before Acceptance)"></textarea>
                                    </Col>
                                </Row>
                             </div>
                             <div className="form-group">
                                <Row>
                                    <Col md={12}>
                                        <label>Subtitle
                                        <span className="tooltip_ico">
                                            <ButtonToolbar>
                                              {['bottom'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      Add a header for easy reference by the GenRun part-timer
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </span>
                                        </label>
                                       <input type="text" className="form-control" placeholder="Enter Subtitle" />
                                    </Col>
                                </Row>
                             </div>
                             <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label>District <span className="required">*</span>
                                        <span className="tooltip_ico">
                                            <ButtonToolbar>
                                              {['bottom'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      Please mention the job district
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </span>
                                        </label>
                                        <div className="re_select">
                                            <Select  options={district}  
                                             placeholder="Select Service" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <label>Gender</label>
                                        <div className="re_select">
                                            <Select  options={gender}  
                                             placeholder="Select Service" />
                                        </div>
                                    </Col>
                                </Row>
                             </div>
                             <div className="form-group">
                                <Row>
                                    <Col md={6}>
                                        <label>Service fee (Your first offer and not including material cost) <span className="required">*</span>
                                        <span className="tooltip_ico">
                                            <ButtonToolbar>
                                              {['bottom'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      Service fee (Your first offer and not including material cost)
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><img src={QnMarkDefault} alt="QnMarkDefault" /></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </span>
                                        </label>
                                       <input type="text" className="form-control" placeholder="$100" />
                                    </Col>
                                </Row>
                             </div>
                             <div className="form-group txt-center mb0">
                                <button className="btn btn_orange btn_minwid animate-btn2 mt10" >Submit</button>	
                             </div>
                         </form>
                      </div>

                  </div>
               </div>
    );
  }
}

export default EditRunErand;
