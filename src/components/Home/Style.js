/* eslint-disable */
import React, {Component} from 'react';
import Select from 'react-select';
import {Row, Col, Button, Form, Alert, Modal} from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Genagentuser from '../../common/images/popup/user.png';
import Servicereq from '../../common/images/popup/request.png';
import Genprowork from '../../common/images/popup/works.png';
import Genprohire from '../../common/images/popup/hire.png';
import Genproquotes from '../../common/images/popup/quotes.png';
import Genprogess from '../../common/images/popup/progress.png';
import Icochecked from '../../common/images/ico_checked.png';


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
          <br />
          <br />
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
          <h3>Loading</h3>
          <div className="loading"></div><br/><br/>          
          <a href="javascript:void(0);" className="btn btn_blue btn_minwid loading loading_data" title="Button">Button</a><br/><br/>
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
          <Popup3 />
          <br/>
          <br/>
          <Popup4 />
          <br/>
          <br/>
          <Popup5 />
          <br/>
          <br/>
           <button type="submit" className="submit-success-pop btn btn_orange btn_minwid">Success Message</button>
          <br/>
          <br/>
           <button type="submit" className="btn btn_orange animate-btn"><span>Animate Button</span></button>
          <br/>
          <br/>
           <button type="submit" className="btn btn_orange animate-btn1"><span>Animate Button1</span></button>
          <br/>
          <br/>
           <button type="submit" className="btn animate-btn2 btn_trans"><span>Animate Button2</span></button>
          <br/>
          <br/>
           <button type="submit" className="btn animate-btn2 btn_orange"><span>Animate Button2</span></button>
          <br/>
          <br/>
           <button type="submit" className="btn btn_orange animate-btn3"><span>Animate Button3</span></button>
          <br/>
          <br/>
          <br/>
          <br/>
        <div>
            <div className="form-group">
                <Row>
                    <Col md={12}>
                          <label htmlFor="username">Profile photo (Subject to review)</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                         <div class="file_upload_wrap">
                              <input type="file" class="form-control" />
                              <div class="File_upload_Front">
                                  <span class="File_upload_value">File Uploaded</span>
                                  <span class="File_upload_btn"><i class="fa fa-paperclip" aria-hidden="true"></i></span>
                              </div>
                         </div>
                    </Col>
                    <Col md={5}>
                          <input type="text" class="form-control" placeholder="Eg. Caption" />
                    </Col>
                    <Col md={2}>
                        <button type="button" class="btn btn_sm ab-none row-add-btn">Add</button>
                    </Col>
                </Row>
            </div>
        </div>
        </div>
    
        <div className="genie-msg-popup-wrapper">
            <div className="genie-msg-popup-inner-wrapper">
                <a href="javascript:void(0);" className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>                
                <div className="genie-msg-popup-body">
                    <div className="state_img text-center">
                      <img src={Icochecked} alt="Success" />
                    </div>
                    <p>Hi, Your Account signup Successfully.</p>
                </div>
            </div>
        </div>        
        <HowItworksPopup />
        <HowGenProwroksPopup />
    
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
				<h2>How GenPro works?</h2>
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
	  dialogClassName="modal-width modal-padding-small modals"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
       <div className="popup-header-l">
	  <img src={Genagentuser} alt="" className="Genagent-user" />
	   <h2>How GenPro works?</h2>
	  </div>
	<div className="popup-header-r">
	  <p>Profile updated</p> 
	  <span>35%</span>
	  <p class="progess"><img src={Genprogess} alt="" className="Genpro-porgess" /><span>35%</span></p>
	  </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list">
	  <div class="popup-inner-content">
	  <h2>Update GenAgent details 100% to get <span>300 GH points!</span></h2>
	  <p>Be the first 5000 GenAgent to get 1688 GH points by signing up and also downloading 99.co "Realpost" apps to activate sharing with "Geniehut" (Authorize your 99.co property listings to port over for free).</p>
	  </div>
	  </div>
		<div class="modals-button">
			<a href="javascript:void(0);" class="btn btn_orange btn_minwid btn-width" title="Button">Update Now</a>
			<a href="javascript:void(0);" class="btn btn_grey btn_minwid btn-width" title="Button">Skip Now</a>
			<a href="javascript:void(0);" class="btn btn_orange btn_minwid btn-width multibtn modal-bottom-close"  onClick={props.onHide} title="Button">Close</a>
		</div>
      </Modal.Body>
	
    </Modal>
  );
} 

/* Poup3 Content */
function MyVerticallyCenteredModal3(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width modal-padding-small modals"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
       <div className="popup-header-l">
	  <img src={Genagentuser} alt="" className="Genagent-user" />
	  <h2>GenPro</h2>
	  </div>
	  <div className="popup-header-r">
	  <p>Profile updated</p> 
	  <span>35%</span>
	  <p class="progess"><img src={Genprogess} alt="" className="Genpro-porgess" /><span>35%</span></p>
	 
	  </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list">
	  <div class="popup-inner-content">
	  <h2>Update GenPro details 100% to get<span>300 GH points!</span></h2>
	  <p>Update GenPro details 100% to get 300 GH points!</p>
	  </div>
	  </div>
		<div class="modals-button">
			<a href="javascript:void(0);" class="btn btn_orange btn_minwid btn-width" title="Button">Update Now</a>
			<a href="javascript:void(0);" class="btn btn_grey btn_minwid btn-width" title="Button">Skip Now</a>
	  		<a href="javascript:void(0);" class="btn btn_orange btn_minwid btn-width modal-bottom-close"  onClick={props.onHide} title="Button">Close</a>
		</div>
		
      </Modal.Body>
	  
    </Modal>
  );
}

/* Poup4 Video Content */
function MyVerticallyCenteredModal4(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width modal-padding-small modals genie-video-popup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
       <iframe width="100%" height="auto" src="https://www.youtube.com/embed/XysRGYNtpgI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Modal.Body>
	  
    </Modal>
  );
}


/* Poup5 Video Content */
function MyVerticallyCenteredModal5(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width modal-padding-small modals"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="popup-top">
          <h2>Welcome Popup</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="howitpop_list">
             <ul>
                <li><i className="fa fa-check"></i> New property search engine with system matching features.</li>
                <li><i className="fa fa-check"></i> Free port over of your property listings from <a href="https://www.99.co/" target="_blank">99.co</a></li>
                <li><i className="fa fa-check"></i> Free information on leads' property requirements.</li>
                <li><i className="fa fa-check"></i> Direct traffic to different major websites including Facebook</li>
                <li><i className="fa fa-check"></i> Feature listings at ZERO cost.</li>
                <li><i className="fa fa-check"></i> Earns GH points by downloading <a href="https://www.99.co/" target="_blank">99.co</a> Realpost and activate "Geniehut"</li>
                <li></li>
             </ul>
          </div>
             <div className="regards">
                <h2 className="title4-5">Regards</h2>
                <p><a href="https://www.genagent.geniehut.com/">Geniehut.com</a> team</p>
                <p>Whatsapp your feedback to <a href="tel:98256258"> 98256258</a></p>
                <p>Email: <a href="mailto:customersupport@geniehut.com"> customersupport@geniehut.com</a></p>
                <p>In collaboration with <a href="https://www.99.co/" target="_blank">99.co</a> and Facebook group “Agents United”</p>
             </div>
             <div className="modals-button">
                  <a href="javascript:void(0);" className="btn btn_orange btn_minwid btn-width" title="Update Now">Update Now</a>
                  <a href="javascript:void(0);" className="btn btn_grey btn_minwid btn-width" title="Skip Now">Skip Now</a>
              </div>
      </Modal.Body>
	  
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

/* Popup3 Functio */
function Popup3() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a className="btn btn_orange" href="#" onClick={() => setModalShow(true)}>
        Launch vertically centered modal popup3
      </a>

      <MyVerticallyCenteredModal3
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

/* Popup4 Functio */
function Popup4() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a className="btn btn_orange" href="#" onClick={() => setModalShow(true)}>
        Video Popup
      </a>

      <MyVerticallyCenteredModal4
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

/* Popup5 Functio */
function Popup5() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a className="btn btn_orange" href="#" onClick={() => setModalShow(true)}>
        Welcome Popup
      </a>

      <MyVerticallyCenteredModal5
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}








/* HowItwroks Function */
function HowItworksPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <a href="javascript:void(0);" onClick={() => setModalShow(true)}>How it Works</a>    

      <HowItworks
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

/* HowItwroks Video Content */
function HowItworks(props) {
  return (
	 
    <Modal
      {...props}
      size="lg"
	  dialogClassName="modal-width modal-padding-small modals genie-video-popup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
       <iframe width="100%" height="auto" src="https://www.youtube.com/embed/XysRGYNtpgI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Modal.Body>
	  
    </Modal>
  );
}


/* HowGenProwroks Function */
function HowGenProwroksPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>      
      <span class="service-alterlink">How <a href="#" onClick={() => setModalShow(true)}>GenPro</a> works?</span>

      <HowGenProwroks
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

/* HowGenProwroks Video Content */
function HowGenProwroks(props) {
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
				<h2>How GenPro works?</h2>
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






