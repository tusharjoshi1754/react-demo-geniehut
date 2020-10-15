import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import {Row, Col, ProgressBar, OverlayTrigger, ButtonToolbar, Tooltip, Button} from 'react-bootstrap';
import ModalPopup from '../Layout/ModalPopup';
import GenProEnable from '../Account/GenProEnable';
import Servicereq from '../../common/images/popup/request.png';
import Genprowork from '../../common/images/popup/works.png';
import Genprohire from '../../common/images/popup/hire.png';
import Genproquotes from '../../common/images/popup/quotes.png';
import { appName } from "../Config/Config";
import { GET_ENABLETYPE } from '../../actions';

class GeniehutliTabs extends Component {
constructor(props) {
    super(props);
    this.state = {
      activegc:'enable',
      activegp:'enable',
      activega:'enable',
      activegr:'enable',
      activegrd:'enable',
  	  enablevalue:'',
  	  modalGenproEnable: false,
      modalGenrunEnable: false,
    }
      this.enableactive = this.enableactive.bind(this); 
  	  this.toggleGenproEnable = this.toggleGenproEnable.bind(this);
      this.toggleGenrunEnable = this.toggleGenrunEnable.bind(this);
  }

   toggleGenproEnable() {
    this.setState(prevState => ({
      modalGenproEnable: !prevState.modalGenproEnable,
	    enablevalue: 'GP'
	   }));
   }
   toggleGenrunEnable(){
    this.setState(prevState => ({
      modalGenrunEnable: !prevState.modalGenrunEnable,
      enablevalue: 'GR'
     }));
   }
   componentDidMount(){
    const numbers = cookie.load('login_user_type');
     const listItems = numbers.map((number) =>
            this.enableactive(number)
    );
}
enableactive(number){
        if(number == 'GC'){
           this.setState({activegc: 'active'})
        }
        if(number == 'GP'){
           this.setState({activegp: 'active'})
        }
        if(number == 'GR'){
           this.setState({activegr: 'active'})
        }
        if(number == 'GA'){
           this.setState({activega: 'active'})
        }
        if(number == 'GRD'){
           this.setState({activegrd: 'active'})
        }
}


  render() {
  	const { enablevalue,usertoken } = this.props
  	if(enablevalue == 'GR'){
  		var content = 'Update GenRun details 100% to get 300 GH points!';
  	}
  	 if(enablevalue == 'GP'){
  		var content = 'Update GenPro details 100% to get 300 GH points!';
  	}
    return (
	<>	   
      <div className="sdmenu_tab">
                            <ul className="sdmenu_list">
                                <li className={this.state.activegc}>
                                    <a href="#">
                                        <i className="sdm_ico sdmico_general_info"></i>
                                        <b>General Info</b>                                        
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <ButtonToolbar>
                                              {['right'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      General Info
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><i className="fa fa-question"></i></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </div>
                                    </a>
                                </li>
                                <li className={this.state.activegp}>
                                    <Link to={this.state.activegp?"/edit-general-info":"/edit-gen-pro"} title="Genpro">
                                        <i className="sdm_ico sdmico_genpro"></i>
                                        <b>GenPro</b> 
                                        {this.state.activegp?<span className="sdm_enable_txt"><a href="#" onClick={this.toggleGenproEnable}>Enable</a></span>:''}                                       
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <ButtonToolbar>
                                              {['right'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      GenPro
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><i className="fa fa-question"></i></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </div>
                                    </Link>
                                </li>
                                <li className={this.state.activega}>
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genagent"></i>
                                        <b>GenAgent</b>   
                                        {this.state.activega?<span className="sdm_enable_txt">Enable</span>:''}                                     
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <ButtonToolbar>
                                              {['right'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      GenAgent
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><i className="fa fa-question"></i></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </div>
                                    </a>
                                </li>
                                <li className={this.state.activegr}>
                                 <Link to={this.state.activegr?"/edit-general-info":"/edit-gen-run"} title="GenRun">
                                        <i className="sdm_ico sdmico_genrun"></i>
                                        <b>GenRun</b>        
                                         {this.state.activegr?<span className="sdm_enable_txt"><a href="#" onClick={this.toggleGenrunEnable}>Enable</a></span>:''}                               
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <ButtonToolbar>
                                              {['right'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      GenRun
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><i className="fa fa-question"></i></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </div>
                                    </Link>
                                </li>
                                <li className={this.state.activegrd}>
                                    <a href="#">
                                        <i className="sdm_ico sdmico_genredeem"></i>
                                        <b>GenRedeem</b>         
                                        {this.state.activegrd?<span className="sdm_enable_txt">Enable</span>:''}                                
                                        <div className="tooltip_ico tooltip_sdmenuico">
                                            <ButtonToolbar>
                                              {['right'].map(placement => (
                                                <OverlayTrigger
                                                  key={placement}
                                                  placement={placement}
                                                  overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                      GenRedeem
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button variant="secondary"><i className="fa fa-question"></i></Button>
                                                </OverlayTrigger>
                                              ))}
                                            </ButtonToolbar>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
					
			
		<ModalPopup modal={this.state.modalGenproEnable} toggle={this.toggleGenproEnable} className="modal-width Genpro_popup enable_popup" title="Update GenPro?" >						 
			<GenProEnable enablevalue={this.state.enablevalue} usertoken={cookie.load('UserAuthToken')}/>			
		</ModalPopup>

    <ModalPopup modal={this.state.modalGenrunEnable} toggle={this.toggleGenrunEnable} className="modal-width GenRun_popup enable_popup" title="Update GenRun?" >             
      <GenProEnable enablevalue={this.state.enablevalue} usertoken={cookie.load('UserAuthToken')}/>     
    </ModalPopup>
	</>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
 
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(GeniehutliTabs));
