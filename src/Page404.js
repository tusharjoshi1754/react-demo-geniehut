import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pageNotFnd from "./common/images/404.png";

class Page404 extends Component {
	constructor(props) {
		super(props);
		this.state = { errorStatus: '' }
	}
	
	
	render() {

    return (<div className="container page404-main-div" >
			  <img src={pageNotFnd} alt="page not found"/>
			  <h1>404 Page Not Found</h1>
			  <p>The page you requested was not found.</p>		
			  <p><Link to={"/"} className="gohome" title="Geniehut">Go Home</Link></p>
		  </div >)
	}
	
}
export default (Page404);
