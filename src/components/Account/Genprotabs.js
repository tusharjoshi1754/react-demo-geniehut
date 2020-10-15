/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Genprotabs extends Component {

render() {
    
		return (
			<div className="genprotabs">
				<ul className="sdhmenu_tablist">
					<li className="active">
						<Link to={"/edit-gen-pro"} title="GenPro Details">GenPro Details</Link>
					</li>
					<li>
						<Link to={"/genpro-my-services"} title="My Services">My Services</Link>
					</li>
					<li>
						<Link to={"/genpro-customer-leads"} title="Customer Leads">Customer Leads</Link>
					</li>
					<li>
						<Link to={"/genpro-jobs"} title="Jobs">Jobs</Link>
					</li>
				</ul>                 
			</div>
		);
	}
}

export default Genprotabs;



