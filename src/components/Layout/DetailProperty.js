import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';


class DetailProperty extends Component {
	constructor(props) {
		super(props);	
        this.state = {
        }
	  }
		
	 
  render() {

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
                                <label>Property</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Property Type</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Property Name</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Postal Code</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>District name</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Floor level</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Property coverd area</label>
                                <div className="input_select_wrap">
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>Price</label>
                                <div className="input_select_wrap">
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>No. of Bedrooms</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>No. of Bathrooms</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={6}>
                                <label>Website URL</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <label>YouTube URL</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Highlights</label>
                                <div className="Value_Field">
                                    <span>Sales</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={12}>
                                <label>Cover Picture</label>
                                <div className="Value_Field_UploadPic">
                                    <span>Sales</span>
                                </div>
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
                              <div className="Property_PreferenceList">
                                  <ul>
                                      <li>The unit is from the MRT/Subway <b>500M</b></li>
                                      <li>Condition of the unit <b>Original</b></li>
                                      <li>The unit is a corner unit or facing only 1 neighbour unit</li>
                                      <li>The unit is at least 100m from expressway or major road</li>
                                      <li>The unit is bright with natural light.</li>
                                      <li>The main door (direction from inside) is facing <b>South-East</b></li>
                                      <li>The balcony/ living room’s window (direction from inside) is facing <b>East</b></li>
                                      <li>Immediate neighbours do not have pets.</li>
                                      <li>The unit is not under Housing Board Development (HDB) Home Improvement Programme (HIP).</li>
                                  </ul>
                              </div>
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

export default DetailProperty;
