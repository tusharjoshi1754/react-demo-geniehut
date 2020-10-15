import React, { Component } from 'react';

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

class Home extends Component {
	
	render() {
		return (
			<div className="Homepage">
				<Header/>
					
				  <div className="home_bansec">
					  <div className="container">
						  <div className="hbantt_sec text-center">
							  <h1 className="title1">Find the best Services for your needs</h1>
							  <p>Build Geniehut community for the service providers ("Our partners") to connect <br/> effectively with the customers. <a href="#" className="hplay" title="How Geniehut works?">How Geniehut works?<i className="fa fa-play"></i></a> </p>					
						  </div>
						  <div className="ourpr_sec">
							  <h2 className="title2 text-center">Our Products</h2>
							  <div className="ourpr_rw">
								  <div className="ourpr_col">
									  <a href="#" title="GenPro">
										  <i className="ourpr_ico">
											  <img src={Icogenpro} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenPro</h3>
											  <p>Connect to right service providers</p>
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
										  </div>
									  </a>
								  </div>
							  </div>
							  <div className="ourpr_rw">
								  <div className="ourpr_col">
									  <a href="#" title="GenRun">
										  <i className="ourpr_ico">
											  <img src={Icogenrun} />
										  </i>
										  <div className="ourpr_info">
											  <h3>GenRun</h3>
											  <p>Connect to part-timers to run errands</p>
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
										  </div>
									  </a>
								  </div>
							  </div>
						  </div>
					  </div>	
					  <div className="banscr_down">
						<p>See,How GH points work?</p>
						<a href="#service_area" title="See,How GH points work?">
							<i className="fa fa-angle-down"></i>
						</a>
					  </div>
				  </div>
				  <div className="service_sec" id="service_area">			  
					<div className="service_rw service_darkbg service_bluebg1">
						<div className="container">
							<div className="service_img">
								<img src={SeviceImg1} alt="Earn GH points and Enjoy the GH service" />
							</div>
							<div className="service_info">
							<h3 className="title3">Earn GH points and Enjoy 
			the GH service</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
								<a href="#" className="view_more" title="view more">view more</a>
							</div>
							
						</div>
					</div>
					<div className="service_rw">
						<div className="container">
							<div className="service_img">
								<img src={SeviceImg2} alt="Spent GH point and get benefited 
		the service" />
							</div>
							<div className="service_info">
								<h3 className="title3">Spent GH point and get benefited 
		the service</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
								<a href="#" className="view_more" title="view more">view more</a>
							</div>
							
						</div>
					</div>
					<div className="service_rw service_darkbg service_bluebg1">
						<div className="container">
							<div className="service_img">
								<img src={SeviceImg3} alt="Buy GH point, whenever needed" />
							</div>
							<div className="service_info">
								<h3 className="title3">Buy GH point, whenever needed</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
								<a href="#" className="view_more" title="view more">view more</a>
							</div>					
						</div>
					</div>
					<div className="service_rw">
						<div className="container">
							<div className="service_img">
								<img src={SeviceImg4} alt="Buy GH Points" />
							</div>
							<div className="service_info">
								<h3 className="title3">Buy GH Points</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation consequat. </p>
								<a href="#" className="view_more" title="view more">view more</a>
							</div>					
						</div>
					</div>
				  </div>
		
				<Footer/>
			</div>
		);
	}
}

export default Home;
