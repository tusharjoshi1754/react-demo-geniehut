import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';

var Parser = require('html-react-parser');


class GenAgent extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			genagentBlock:''
			}
		this.props.getStaticblockContent('how-it-works-genagent-mq');
	  }
		
	 componentWillReceiveProps(Props) {
		if(Props.staticblocks!== this.props.staticblocks){
			if(Props.staticblocks[0].result_set !== 'undefined' && Props.staticblocks[0].result_set !== null){
				if(Props.staticblocks[0].status === 'success'){
					this.setState({genagentBlock : Props.staticblocks[0].result_set})
				}
			}
	 }
	} 

  render() {
	const genagentBlock = this.state.genagentBlock.staticblocks_description;
	if(genagentBlock !== undefined){
	return (
			<div>
		    <div className="GenPopup_List_wrap">
			   <div className="GenPopup_List_title">Advanced search engine retrieving desired results from different property search websites</div>
			   	 {Parser(''+genagentBlock+'')}
			</div>
		   </div>
		    );
      }else{
   	return (<div className="loading"></div>);
   }
  }
}

const mapStateTopProps = (state) => {
  return {
  staticblocks: state.staticblocks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStaticblockContent: (slug) => {
      dispatch({ type: GET_STATICBLOCKCONTENT, slug});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenAgent));
