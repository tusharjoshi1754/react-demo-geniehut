import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';
var Parser = require('html-react-parser');


class GHpoints extends Component {
	constructor(props) {
		  super(props);   
        this.state = {
            ghpointsummary:''
        }
        this.props.getStaticblockContent('gh-points-summary-popup-mq');
	  }
		
  componentWillReceiveProps(Props) {
        if(Props.staticblocks!== this.props.staticblocks){
            if(Props.staticblocks[0].result_set !== 'undefined' && Props.staticblocks[0].result_set !== null)
                if(Props.staticblocks[0].status === 'success'){
                  if(Props.staticblocks[0].result_set.staticblocks_slug === 'gh-points-summary-popup-mq'){
                    this.setState({ghpointsummary : Props.staticblocks[0].result_set})
                  }
                }
    }
 } 
  render() {
    const ghpointsummary = this.state.ghpointsummary.staticblocks_description;
    if(ghpointsummary !== undefined){
    return (
	<div>
            {Parser(ghpointsummary+'')}
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GHpoints));
