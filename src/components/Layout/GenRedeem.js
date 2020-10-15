import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';

var Parser = require('html-react-parser');


class GenRedeem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genredeemBlock:''
			}
		this.props.getStaticblockContent('how-it-works-redeem-mq');	
  }
 componentWillReceiveProps(Props) {
	if(Props.staticblocks!== this.props.staticblocks){
		if(Props.staticblocks[0].result_set !== 'undefined' && Props.staticblocks[0].result_set !== null){
			if(Props.staticblocks[0].status === 'success'){
				this.setState({genredeemBlock : Props.staticblocks[0].result_set})
			}
		}
    }
} 		
	 
  render() {
  	const genredeemBlock = this.state.genredeemBlock.staticblocks_description;
  	if(genredeemBlock !== undefined){
    return (
	<div>
    <div className="GenPopup_List_wrap">
	   <div className="GenPopup_List_title">Barter GH points or items with other community users.</div>
	  	{Parser(genredeemBlock+'')}
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GenRedeem));
