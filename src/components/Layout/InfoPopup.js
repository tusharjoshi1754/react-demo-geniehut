/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';

class InfoPopup extends Component {
	constructor(props) {
		  super(props);   
        this.state = {
        }      

        this.closepopup = this.closepopup.bind(this);
	  }
    componentDidMount(){
        /*$(document).click(function(e) {		
        if (!$(e.target).is('.genie-msg-popup-wrapper, .genie-popup-open * ')) {
            if ($('.genie-msg-popup-wrapper').is(":visible")) {                
				$(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
                $(".genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
            }
        }
		});*/
    document.body.classList.add('genie-popup-shade');
    }
    closepopup(){  
	  $('#points-popup .genie-close-btn').parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
      $('#points-popup .genie-close-btn').parents("#genie-popup").removeClass("genie-popup-open");
      $("#points-popup.genie-msg-popup-wrapper").parents("body").removeClass("genie-popup-shade");
      this.props.loadPopupStatus(false);
    }
    
    render() {        
        return (
            <div className="genie-msg-popup-wrapper genie-popup-open" id="points-popup">
                <div className="genie-msg-popup-inner-wrapper">
                    <a onClick={this.closepopup} className="genie-close-btn"><i className="fa fa-times" aria-hidden="true"></i></a>
                    <div className="genie-msg-popup-body">{this.props.popupcontent}</div>
                    <div onClick={this.closepopup} className="genie-msg-popup-btn"><button className="btn btn_orange btn_minwid genie-close-btn" type="button">Ok</button></div>
                </div>
            </div>
        );
    }
}

export default InfoPopup;
