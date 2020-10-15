/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import ModalPopup from '../Layout/ModalPopup';
import InfoContent from '../Layout/InfoContent';
import GenEnable from '../Layout/GenEnable';
import { lang } from '../Helpers/lang';
class Genleftmenu extends Component {
	constructor(props) {
		super(props);	
			this.state = {
                activegc:'',
                activegp:'enable',
                activega:'enable',
                activegr:'',
                activegrd:'enable',
                login_user_type:cookie.load('login_user_type'),
                infoRunType:'',
                popuptitle:'',
                enableType:'',
                currentpage:this.props.currentpage
			}
	}
		
    activeMenu(type, currentPage) {
        let status = '';
        if(this.state.login_user_type.indexOf(type)>=0) {
            if(this.state.currentpage===currentPage) {
                status = 'active'
            }
        }
        else {
            status = 'enable';
        }
        return status;
    }
    toggleEnableService = (e, type) => {
        e.preventDefault();
        this.setState({popupType:1, type:type, popuptitle:lang.enable[type].title}, function() {
            this.toggleInfo();
        });
    }

    reviceUserType = (login_user_type) => {
         this.setState({login_user_type:login_user_type}, function() {
            this.toggleInfo();
        });
    }

    informations = (e, infoRunType) => {
        e.preventDefault();
        this.setState({infoRunType:infoRunType, popupType:2, popuptitle:lang.info[infoRunType].title}, function() {
            this.toggleInfo();
        });
    }
    toggleInfo = toggleInfo => {
        this.setState(prevState => ({
        modalEnable: !prevState.modalEnable,
        }));
    }

    render() {
        return (
            <div className="sdmenu_tab">
                <ul className="sdmenu_list">
                    <li className={this.activeMenu('GC', 'GenUser')}>
                        <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_general_info"></i></a>
                        <Link to={"/edit-general-info"} className="sdmenu_list_left" title="GenUser">
                            <span>
                                <i className="sdm_ico sdmico_general_info"></i>
                                <b>GenUser</b>                                        
                            </span>
                            <span className="sdmenu_list_right">
                                <a href="javascript:void(0);" className="Edit_Pro_Qn"><i className="fa fa-question"></i></a>
                            </span>
                        </Link>
                    </li>
                    <li className={this.activeMenu('GP', 'GenPro')}>
                        <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genpro"></i></a>
                        <Link to={(this.state.login_user_type.indexOf('GP')>=0)?"/edit-gen-pro":"/edit-general-info"} title="Genpro" className="sdmenu_list_left">
                            <span>
                                <i className="sdm_ico sdmico_genpro"></i>
                                <b>GenPro</b> 
                            </span>
                        
                            <span className="sdmenu_list_right">
                                {(this.state.login_user_type.indexOf('GP')<0)?<span className="sdm_enable_txt"><a href="javascript:void(0);" onClick={ e => this.toggleEnableService(e, 'GP') }>Enable</a></span>:''}
                                <span href="javascript:void(0);" className="Edit_Pro_Qn" onClick={ e => this.informations(e, 'pro') }><i className="fa fa-question"></i></span>
                            </span>
                        </Link>
                    </li>
                    <li className={this.activeMenu('GR', 'GenRun')}>
                        <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genrun"></i></a>
                        <Link to={(this.state.login_user_type.indexOf('GR')>=0)?"/edit-gen-run":"/edit-general-info"} title="GenRun" className="sdmenu_list_left">
                            <span>
                                <i className="sdm_ico sdmico_genrun"></i>
                                <b>GenRun</b>
                            </span>
                        
                        <span className="sdmenu_list_right">
                                { (this.state.login_user_type.indexOf('GR')<0)?<span className="sdm_enable_txt"><a href="javascript:void(0);" onClick={ e => this.toggleEnableService(e, 'GR') }>Enable</a></span>:'' }                 
                            <span href="javascript:void(0);" className="Edit_Pro_Qn" onClick={ e => this.informations(e, 'run') }><i className="fa fa-question"></i></span>
                        </span>
                        </Link>
                    </li>
                    <li className={this.activeMenu('GA', 'GenProperty')}>
                        <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genagent"></i></a>
                        <a href="javascript:void(0);" className="sdmenu_list_left">
                            <span>
                                <i className="sdm_ico sdmico_genagent"></i>
                                <b>GenProperty</b>   
                            </span>
                        
                        <span className="sdmenu_list_right">
                            {/*(this.state.login_user_type.indexOf('GA')<0)?<span className="sdm_enable_txt"><a href="javascript:void(0);">Enable</a></span>:'' */}                             
                            <span href="javascript:void(0);" className="Edit_Pro_Qn" onClick={ e => this.informations(e, 'property') } ><i className="fa fa-question"></i></span>
                        </span>
                        </a>
                    </li>
                    <li className={this.activeMenu('GRD', 'GenAds')}>
                        <a className="xs-icon-visible" href="javascript:void(0);"><i className="sdm_ico sdmico_genredeem"></i></a>
                        <a href="javascript:void(0);" className="sdmenu_list_left">
                            <span>
                                <i className="sdm_ico sdmico_genredeem"></i>
                                <b>GenAds</b>         
                            </span>
                        
                        <span className="sdmenu_list_right">
                            {/*(this.state.login_user_type.indexOf('GRD')<0)?<span className="sdm_enable_txt">Enable</span>:'' */}
                            <span href="javascript:void(0);" className="Edit_Pro_Qn" onClick={ e => this.informations(e, 'ads') } ><i className="fa fa-question"></i></span>
                        </span>
                        </a>
                    </li>
                </ul>
                <ModalPopup modal={this.state.modalEnable} toggle={this.toggleInfo} className="modal-width Genpro_popup enable_popup" title={this.state.popuptitle} >
                    {this.state.popupType===1 &&
                        <GenEnable toggleEnableService={this.toggleEnableService} reviceUserType={this.reviceUserType} service={this.state.type} />                  
                    }
                    {this.state.popupType===2  &&
                        <InfoContent pagename={this.state.infoRunType} />
                    }                    
                </ModalPopup>
            </div>
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Genleftmenu));