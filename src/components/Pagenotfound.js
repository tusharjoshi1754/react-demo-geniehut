/* eslint-disable */
import React, { Component } from 'react';
import {baseUrl} from '../../constants/Config';
export default  class Pagenotfound extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		
		
    }
    
	componentDidMount()
	{
       
	}
	
	componentWillReceiveProps() {
		
	}
	

 render() {
    
    return (
     <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - The Page can't be found</h2>
			</div>
			<a href={baseUrl}>Go TO Homepage</a>
		</div>
	</div>

    );
  }
}
 
