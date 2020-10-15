/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';

var Parser = require('html-react-parser');
class GenPro extends Component {
	constructor(props) {
		super(props);	
			this.state = {
			genproBlock:'',
			activegp:''
			}
		this.props.getStaticblockContent('How-it-works-genpro-mq');
		this.enableactive = this.enableactive.bind(this);
	  }
		
	componentWillReceiveProps(Props) {
		if(Props.genproblock!== this.props.genproblock){
			if(Props.genproblock[0].result_set !== 'undefined' && Props.genproblock[0].result_set !== null)
				if(Props.genproblock[0].status === 'success'){
					this.setState({genproBlock : Props.genproblock[0].result_set})
				}
	}
	}

	 enableactive(number){
        if(number === "GP"){
           this.setState({activegp: 'active'})
        }
 } 

	componentDidMount() {
	if(cookie.load('login_user_type')){
		const numbers = cookie.load('login_user_type');
	  	   if(numbers !== ''){
			numbers.map((number) =>
				this.enableactive(number)
			);
	   }
	 }
	}

  render() {
   const genproBlock = this.state.genproBlock.staticblocks_description;
  	if(genproBlock === 'undefined'){
	    return (
		<div>
		 <div className="GenPopup_List_wrap">
			   <div className="GenPopup_List_title">Easy comparison for different professional service provider</div>
				 {Parser(''+genproBlock+'')}
	     </div>
         {this.state.activegp === ""?<div className="GenPopup_Link"><a className="btn animate-btn2 btn_blue" href="https://www.genpro.geniehut.com/prodetail" target="_blank" rel="noopener noreferrer">Details</a></div>:''}
	   </div>
	    );
   }else{
   	return (<div className="loading"></div>);
   }
  }
}
const mapStateTopProps = (state) => {
  return {
  genproblock: state.staticblocks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStaticblockContent: (slug) => {
      dispatch({ type: GET_STATICBLOCKCONTENT, slug});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenPro));
