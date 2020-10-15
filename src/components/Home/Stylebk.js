import React, {Component} from 'react';
import Select from 'react-select';
import {Row, Col, Button, Form, Alert, Modal, ButtonToolbar} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Genagentuser from '../../common/images/popup/user.png';
import Servicereq from '../../common/images/popup/request.png';
import Genprowork from '../../common/images/popup/works.png';
import Genprohire from '../../common/images/popup/hire.png';
import Genproquotes from '../../common/images/popup/quotes.png';


class Style extends Component {

componentDidMount(){
  
}

render(){

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div>      
        <Header />
        <div className="container">        
          <h1>H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <h4>H4</h4>
          <h5>H5</h5>
          <h6>H6</h6>			
          <h3> Custom Title</h3>
          <h2 className="title1">Title1</h2>
          <h2 className="title2">Title2</h2>
          <h2 className="title3">Title3</h2>
          <h2 className="title4"><span>Title4</span></h2>
          <h3>Paragraph</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</p>
          <h3> Custom Button</h3>
          <a href="javascript:void(0);" className="btn btn_orange btn_sm" title="Button">Button</a><br/><br/>
          <a href="javascript:void(0);" className="btn btn_orange" title="Button">Button</a><br/><br/>
          <a href="javascript:void(0);" className="btn btn_orange btn_minwid" title="Button">Button</a><br/><br/>
          <a href="javascript:void(0);" className="btn btn_blue btn_minwid" title="Button">Button</a><br/><br/>
          <a href="javascript:void(0);" className="btn btn_grey btn_minwid" title="Button">Button</a><br/><br/>
          <h3>Form</h3>
          <form className="form_sec">
            <div className="form-group">
              <Row>
                <Col>
                  <label>Label</label>
                  <input type="text" className="form-control" />
                  <small className="text-muted form-text">We will never share your email with anyone else.</small>
                </Col>
                <Col>
                  <label>Label</label>
                  <input type="text" className="form-control" />
                  <small className="text-muted form-text">We will never share your email with anyone else.</small>
                </Col>					
              </Row>					
            </div>
            <div className="form-group">
              <Row>
                <Col>
                  <label>Label</label>
                  <input type="text" className="form-control" />
                </Col>
                <Col>
                  <label>Label</label>
                  <input type="text" className="form-control" />
                </Col>
                <Col>
                  <label>Label</label>
                  <input type="text" className="form-control" />
                </Col>					
              </Row>				
            </div>
            <div className="form-group">
              <div className="re_select">
                <Select options={options} />
              </div>
            </div>
            <div className="form-group">
              <div className="custom_checkbox">
                <input type="checkbox" /> <span>Checkbox</span>
              </div>
            </div>
            <div className="form-group">
              <div className="custom_radio">
                <input type="radio" defaultChecked /> <span>Radio</span>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn_orange btn_minwid">Button</button>
            </div>
          </form>
          <h3> Recat Form</h3>
          <Form>
            <Form.Group >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
              We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                <Form.Control placeholder="First name" />
                </Col>
                <Col>
                <Form.Control placeholder="Last name" />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
              Email
              </Form.Label>
              <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="email@example.com" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm="2">
              Password
              </Form.Label>
              <Col sm="10">
              <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>				
            <Form.Group>
              <Form.Check 
                custom
                type="checkbox"
                id="custom-checkbox"
                label="Check this custom checkbox"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check 
                custom
                type="radio"
                id="custom-radio"
                label="Check this custom radio"
              />				
            </Form.Group>
            <Form.Group>
            <Button className="btn_orange">
              Submit
            </Button>
            </Form.Group>
          </Form>
          <h3> Alert</h3>
          <div className="alert alert-success">
            This is a alert—check it out!
            <button type="button" className="close"><span>×</span></button>
          </div>
          <div className="alert alert-danger">
            This is a alert—check it out!
            <button type="button" className="close"><span>×</span></button>
          </div>
          <h3> Recat Alert</h3>
          <Alert variant="success">
            This is a alert—check it out!
          </Alert>
          <Alert variant="danger" dismissible>
            This is a alert—check it out!
          </Alert>

          <h3>Grid</h3>
          <Row className="test">
            <Col>1 of 3</Col>
            <Col xs={6}>2 of 3 (wider)</Col>
            <Col>3 of 3</Col>
          </Row>
          
          <br/>
          <br/>
          <Popup />
          <br/>
          <br/>
          <Popup2 />
          <br/>
          <br/>
        </div>
        <Footer />
    </div>
    );
  
      }
    }
export default Style;


/* Popup1 Content */
function MyVerticallyCenteredModal(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width modals"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
       <div className="popup-header-l">
	  <img src={Genprowork} alt="" className="Genpro-work" />
	  <h1>How GenPro works?</h1>
	  </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list">
	   <img src={Servicereq} alt="" className="Service-req" />
	  <div class="list-content">
	  <h2>Send a Service Request</h2>
	  <p>Insert the postal code of the service that you required</p>
	  <h3>Service Request</h3>
	  <p>Choose the services that you required</p>
	  </div>
	  </div>
	      <div className="list">
	   <img src={Genprohire} alt="" className="Genpro-hire" />
	  <div class="list-content">
	  <h2>Get a list of Genie Pro and Quotes</h2>
	  <p>Read the profile page and review of the service professional (“Genpro”)</p>
	  <h3>Genie Pro and Quotes</h3>
	  <p>“Add to compare” to see the Genpro replies on frequently asked questions (FAQ)</p>
	  </div>
	  </div>
	      <div className="list">
	   <img src={Genproquotes} alt="" className="Genpro-quotes" />
	  <div class="list-content">
	  <h2>Compare, Contact and Hire</h2>
	  <p>Contact the GenPro directly or select “Ask to call” for the Genpro to call you back.</p>
	  <h3>Hire a Pro</h3>
	  <p>Select “Completed” when the service is performed to give rating and review.</p>
	  </div>
	  </div>
      </Modal.Body>
      <button onClick={props.onHide} type="button" class="modal-bottom-close"><span>Close</span></button>
    </Modal>
  );
}

/* Poup2 Content */
function MyVerticallyCenteredModal2(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width-small modals"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
       <div className="popup-header-l">
	  <img src={Genagentuser} alt="" className="Genagent-user" />
	  <h1>How GenPro works?</h1>
	  </div>
	  <div className="popup-header-r">
	  <p>Profile updated</p> 
	  <span>35%</span>
	  <span>35%</span>
	  </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list">
	  <div class="list-content  ">
	  <h2>Update GenAgent details 100% to get 300 GH points!</h2>
	  <p>Be the first 5000 GenAgent to get 1688 GH points by signing up and also downloading 99.co "Realpost" apps to activate sharing with "Geniehut" (Authorize your 99.co property listings to port over for free).</p>
	  </div>
	  </div>
		
      </Modal.Body>
      <button onClick={props.onHide} type="button" class="modal-bottom-close"><span>Close</span></button>
    </Modal>
  );
} 


/* Popup1 Function */
function Popup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a className="btn btn_orange" href="#" onClick={() => setModalShow(true)}>
        Launch vertically centered modal popup
      </a>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

/* Popup2 Functio */
function Popup2() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a className="btn btn_orange" href="#" onClick={() => setModalShow(true)}>
        Launch vertically centered modal popup2
      </a>

      <MyVerticallyCenteredModal2
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}


