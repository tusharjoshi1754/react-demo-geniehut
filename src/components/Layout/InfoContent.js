import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { GET_STATICBLOCKCONTENT } from '../../actions';
import { lang } from '../Helpers/lang';
var Parser = require('html-react-parser');
class InfoContent extends Component {
	constructor(props) {
		super(props);	
			const currentPage = this.props.pagename;
			let pagelangdata = lang.info[currentPage]
			this.state = {
				genproBlock:'',
				loading:true,
				pagelangdata:pagelangdata,	
			}
			this.props.getStaticblockContent(pagelangdata.slug);
		
	  }
		
	componentWillReceiveProps(Props) {
		if(Props.genproblock!== this.props.genproblock){
			this.setState({loading:false});
			if(Props.genproblock[0].result_set !== 'undefined' && Props.genproblock[0].result_set !== null)
				if(Props.genproblock[0].status === 'success'){
					this.setState({genproBlock : Props.genproblock[0].result_set, loading:false})
				}
	}
	}
	componentDidMount() {
	
	}

  render() {
	    return (
		<div>
			{(this.state.loading===true) &&
				<div className="loading loading-h-200"></div>
			}
			{ (this.state.genproBlock!=='') &&
				<div>
					{(this.state.genproBlock.staticblocks_description!=='' && this.state.genproBlock.staticblocks_description!==null) &&
						<div className="GenPopup_List_wrap">
							<div className="GenPopup_List_title">{this.state.pagelangdata.heading}</div>
							{Parser(this.state.genproBlock.staticblocks_description)}
						</div>
					}
					{(this.state.genproBlock.staticblocks_url!=='' && this.state.genproBlock.staticblocks_url!==null) &&
							<iframe width="100%" title={this.state.pagelangdata.heading} height="auto" src={Parser(''+this.state.genproBlock.staticblocks_url+'')} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						}
         	{this.state.pagelangdata.link!== ''?<div className="GenPopup_Link"><a className="btn animate-btn2 btn_blue" href={this.state.pagelangdata.link} target="_blank" rel="noopener noreferrer" >Details</a></div>:''}
				</div>
			}
	   </div>
	    );
 
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(InfoContent));
