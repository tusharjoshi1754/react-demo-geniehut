import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';
var Parser = require('html-react-parser');

class GenRun extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			genrunBlock:''
		}
		this.props.getStaticblockContent('how-it-works-genagent-mq');
	  }
	
   componentWillReceiveProps(Props) {
		if(Props.staticblocks!== this.props.staticblocks){
			if(Props.staticblocks[0].result_set !== 'undefined' && Props.staticblocks[0].result_set !== null)
				if(Props.staticblocks[0].status === 'success'){
					this.setState({genrunBlock : Props.staticblocks[0].result_set})
				}
	}
 }
	 
  render() {
  	const genrunBlock = this.state.genrunBlock.staticblocks_description;
  	if(genrunBlock !== undefined){
    return (
	<div>
    <div className="GenPopup_List_wrap">
	   <div className="GenPopup_List_title">Get a part timer (GenRun) to run errand for you</div>
	     {Parser(''+genrunBlock+'')}
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenRun));
