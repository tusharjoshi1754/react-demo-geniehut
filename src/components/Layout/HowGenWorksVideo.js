import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';
var Parser = require('html-react-parser');
class HowGenWorksVideo extends Component {

	    constructor(props) {
        super(props);   
        this.state = {
        	homepageVideo:''
            }
        
        this.props.getStaticblockContent('homepage-video-mq');
      }

 componentWillReceiveProps(PropsData) {
 	 if(PropsData.staticblocks  !== this.state.staticblocks){
      if(Object.keys(PropsData.staticblocks).length > 0){
        if(PropsData.staticblocks[0].status === 'success'){
          this.setState({homepageVideo :  PropsData.staticblocks[0].result_set.staticblocks_url})
        }
      }
    }
 }
  render() {
  	const homevideo = this.state.homepageVideo;
  	if(homevideo !== undefined){
    return (
       <div>
        <iframe width="100%" height="auto" src={Parser(''+homevideo+'')} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>
    );
	}else{

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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(HowGenWorksVideo));
