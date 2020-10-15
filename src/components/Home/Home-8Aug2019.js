import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {Fade, Flip} from 'react-reveal';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

import Icogenagent from '../../common/images/ico_genagent.png';
import Icogenpro from '../../common/images/ico_genpro.png';
import Icogenredeem from '../../common/images/ico_genredeem.png';
import Icogenrun from '../../common/images/ico_genrun.png';
import SeviceImg1 from '../../common/images/service_img1.png';
import SeviceImg2 from '../../common/images/service_img2.png';
import SeviceImg3 from '../../common/images/service_img3.png';
import SeviceImg4 from '../../common/images/service_img4.png';
import Servicereq from '../../common/images/popup/request.png';
import Genprowork from '../../common/images/popup/works.png';
import Genprohire from '../../common/images/popup/hire.png';
import Genproquotes from '../../common/images/popup/quotes.png';



class Home extends Component {

componentDidMount() {
		window.addEventListener('load', this.toggleGenagebtInfo);
}
toggleGenagebtInfo(){
	console.log('asdasd')
}
	render() {		
		return (
			<div className="Homepage">
				<Header/>
				
				  <div className="home_bansec">
					  <div className="container">
						  <div className="hbantt_sec text-center">
							  <Flip top delay={600}><h1 className="title1">Find the best Services for your needs</h1></Flip>
							  <Flip top delay={800}><p>Build Geniehut community for the service providers ("Our partners") to connect <br/> effectively with the customers.  <Popup4 /> </p>	</Flip>	
						  </div>
						  <div className="ourpr_sec">
							 <Flip top delay={1000}><h2 className="title2 text-center">Our Products</h2></Flip>
							 <Fade delay={1200}><div className="ourpr_rw">							  
							  	
								  <div className="ourpr_col">
									  <a href="#" title="GenPro">
										  <i className="ourpr_ico">
											  <img src={Icogenpro} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenPro</h3>
											  <p>Connect to right service providers</p>			  
											  <HowGenProwroksPopup />
										  </div>
									  </a>
								  </div>
								  
								  <div className="ourpr_col">
									  <a href="#" title="GenAgent">
										  <i className="ourpr_ico">
											  <img src={Icogenagent} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenAgent</h3>
											  <p>Connect to right property at first search</p>
											  <HowGenAgentPopup />
										  </div>
									  </a>
								  </div>
								  
							  </div></Fade>
							  <Fade delay={1400}><div className="ourpr_rw">
							  	  
								  <div className="ourpr_col">
									  <a href="#" title="GenRun">
										  <i className="ourpr_ico">
											  <img src={Icogenrun} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenRun</h3>
											  <p>Connect to part-timers to run errands</p>
											  <HowGenRunPopup />
										  </div>
									  </a>
								  </div>
								  
								  <div className="ourpr_col">
									  <a href="#" title="GenRedeem">
										  <i className="ourpr_ico">
											  <img src={Icogenredeem} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenRedeem</h3>
											  <p>Use GH points to redeem items</p>
											  <HowGenRedeemPopup />
										  </div>
									  </a>
								  </div>
								  
							  </div></Fade>
						  </div>
					  </div>	
					  
					  <Fade delay={1600}><div className="banscr_down">
						<p>See,How GH points work?</p>
						<a href="#service_1" className="scrollTodiv" title="See,How GH points work?">
							<i className="fa fa-angle-down"></i>
						</a>
					  </div></Fade>
					  
				  </div>	
				  			  
				  <div className="service_sec">			  
				  	
						<div id="service_1" className="service_rw service_darkbg service_bluebg1">
							<div className="container">
								<Fade><div className="service_img">
									<img src={SeviceImg1} alt="Earn GH points and Enjoy the GH service" />
								</div></Fade>
								
								<Fade><div className="service_info">
								<h3 className="title3">Earn GH points and Enjoy the GH service</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
                               <button type="submit" class="btn animate-btn2 btn_white"><span>Sign Up Now</span></button>
								</div>
      						  </Fade>
								
							</div>
							<a href="#service_2" className="scrollTodiv" title="See,How GH points work?">
								<i className="fa fa-angle-down"></i>
							</a>
						</div>
										
						<div id="service_2" className="service_rw">
							<div className="container">
								<Fade><div className="service_img">
									<img src={SeviceImg2} alt="Be your own boss. Choose your GH service" />
								</div></Fade>
								<Fade><div className="service_info">
									<h3 className="title3">Be your own boss. Choose your GH service</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
                               <button type="submit" class="btn animate-btn2 btn_blue"><span>Become a Professional</span></button>
								</div></Fade>
								
							</div>
							<a href="#service_3" className="scrollTodiv" title="See,How GH points work?">
								<i className="fa fa-angle-down"></i>
							</a>
						</div>
					
					
						<div id="service_3" className="service_rw service_darkbg service_bluebg2">
							<div className="container">
								<Fade><div className="service_img">
									<img src={SeviceImg3} alt="Hire the best! Pay next!!" />
								</div></Fade>
								<Fade><div className="service_info">
									<h3 className="title3">Hire the best! Pay next!!</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
                               <button type="submit" class="btn animate-btn2 btn_white"><span>Sign Up Now</span></button>
								</div></Fade>
							</div>
							<a href="#service_4" className="scrollTodiv" title="See,How GH points work?">
								<i className="fa fa-angle-down"></i>
							</a>
						</div>
					
					
						<div id="service_4" className="service_rw">
							<div className="container">
								<Fade><div className="service_img">
									<img src={SeviceImg4} alt="Buy GH Points" />
								</div></Fade>
								<Fade><div className="service_info">
									<h3 className="title3">Buy GH Points</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
                               <button type="submit" class="btn animate-btn2 btn_blue"><span>Buy GH points</span></button>
								</div></Fade>
							</div>						
						</div>
					
				  </div>
				  
				<Footer/>
			</div>
		);
	}
}

export default Home;

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
		 <iframe width="100%" height="auto" src="https://www.youtube.com/embed/VEZUXtPhn-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</Modal.Body>
		
	  </Modal>
	);
  }

/* Popup4 Functio */
function Popup4() {
	const [modalShow, setModalShow] = React.useState(false);
  
	return (
	  <span>
		<a className="hplay" href="#" onClick={() => setModalShow(true)}>
		  How Geniehut works? <i className="fa fa-play"></i>
		</a>
  
		<MyVerticallyCenteredModal4
		  show={modalShow}
		  onHide={() => setModalShow(false)}
		/>
	  </span>
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
		
		<button onClick={props.onHide} type="button" class="modal-bottom-close btn btn_orange animate-btn2"><span>Close</span></button>
	  </Modal>
	);
  }

/* HowGenAgent Function */
function HowGenAgentPopup() {
	const [modalShow, setModalShow] = React.useState(false);
  
	return (
	  <div>      
		<span class="service-alterlink">How <a href="#" onClick={() => setModalShow(true)}>GenAgent</a> works?</span>
  
		<HowGenAgent
		  show={modalShow}
		  onHide={() => setModalShow(false)}
		/>
	  </div>
	);
  }
  
  /* HowGenAgent Video Content */
  function HowGenAgent(props) {
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
				  <img src={Icogenagent} alt="" className="GenAgent-work" />
				  <h2>How GenAgent works?</h2>
			  </div>
		  </Modal.Title>
		  
		</Modal.Header>
		
		<Modal.Body>
		  
		  <div className="howitpop_list">
			<ul>
				<li><i className="fa fa-check"></i> New property search engine with system matching features.</li>
				<li><i className="fa fa-check"></i> Free port over of your property listings from 99.co</li>
				<li><i className="fa fa-check"></i> Free information on leads' property requirements.</li>
				<li><i className="fa fa-check"></i> Direct traffic to different major websites including Facebook</li>
				<li><i className="fa fa-check"></i> Feature listings at ZERO cost.</li>
				<li><i className="fa fa-check"></i> Earns GH points by downloading 99.co Realpost and activate "Geniehut"</li>
			</ul>
		  </div>

		</Modal.Body>
		
		<button onClick={props.onHide} type="button" class="modal-bottom-close btn btn_orange animate-btn2"><span>Close</span></button>
	  </Modal>
	);
  }


  /* HowGenRun Function */
function HowGenRunPopup() {
	const [modalShow, setModalShow] = React.useState(false);
  
	return (
	  <div>      
		<span class="service-alterlink">How <a href="#" onClick={() => setModalShow(true)}>GenRun</a> works?</span>
  
		<HowGenRun
		  show={modalShow}
		  onHide={() => setModalShow(false)}
		/>
	  </div>
	);
  }
  
  /* HowGenRun Video Content */
  function HowGenRun(props) {
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
				  <img src={Icogenrun} alt="" className="GenRun-work" />
				  <h2>How GenRun works?</h2>
			  </div>
		  </Modal.Title>
		  
		</Modal.Header>
		
		<Modal.Body>
		  
		  <div className="howitpop_list">
			  <ul>
				<li><i className="fa fa-check"></i> Choose the run errand services that you need, keys in the detail job description and set your initial offer.</li>

				<li><i className="fa fa-check"></i> You can read GenRun "Part timer" profile and request a call back from the GenRun. System deducts GH points for every SMS sends to a GenRun but you can retrive back 50% of the points by giving feedback.</li>

				<li><i className="fa fa-check"></i> Alternatively, if any GenRun see your initial request, they might counteroffer or contact you directly.</li>

				<li><i className="fa fa-check"></i> After the service, please give review and rating to the GenRun so that other customer can have know more about this GenRun.</li>
			 </ul>
		  </div>

		</Modal.Body>
		
		<button onClick={props.onHide} type="button" class="modal-bottom-close btn btn_orange animate-btn2"><span>Close</span></button>
	  </Modal>
	);
  }

  /* HowGenRedeem Function */
function HowGenRedeemPopup() {
	const [modalShow, setModalShow] = React.useState(false);
  
	return (
	  <div>      
		<span class="service-alterlink">How <a href="#" onClick={() => setModalShow(true)}>GenRedeem</a> works?</span>
  
		<HowGenRedeem
		  show={modalShow}
		  onHide={() => setModalShow(false)}
		/>
	  </div>
	);
  }
  
  /* HowGenRedeem Video Content */
  function HowGenRedeem(props) {
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
				  <img src={Icogenrun} alt="" className="GenRun-work" />
				  <h2>How GenRedeem works?</h2>
			  </div>
		  </Modal.Title>
		  
		</Modal.Header>
		
		<Modal.Body>
		  
		  <div className="list">
			  <img src={Servicereq} alt="" className="" />
				  <div class="list-content">
					  <h2>Lorem ipsum</h2>
					  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
				  </div>
		  </div>
			
			<div className="list">
			  <img src={Genprohire} alt="" className="" />
				  <div class="list-content">
				  	<h2>Lorem ipsum</h2>
					  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
				  </div>
		   </div>
		   
			<div className="list">
				  <img src={Genproquotes} alt="" className="" />
					  <div class="list-content">
						<h2>Lorem ipsum</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
					  </div>
			  </div>
		</Modal.Body>
		
		<button onClick={props.onHide} type="button" class="modal-bottom-close btn btn_orange animate-btn2"><span>Close</span></button>
	  </Modal>
	);
  }