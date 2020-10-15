/* eslint-disable */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
class ModalPopup extends Component {
	loadclosebtn(status) {
		if(status!==1)  {
			return(
				<div>	
						<Button color="secondary" className="modal-bottom-close btn btn_grey animate-btn2 comon_close" onClick={this.props.toggle}>Close</Button>
				</div>
			);
		}
	}
  render() {
    return (
			<div>	
				<Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} keyboard={(this.props.keyboard!=='' && typeof this.props.keyboard!=="undefined")?this.props.keyboard:true} backdrop={(this.props.backdrop!=='' && typeof this.props.backdrop!=="undefined")?this.props.backdrop:'static'}  >
					<a className="close-btn" href="javascript:void(0);" onClick={this.props.toggle}><i className="fa fa-times" aria-hidden="true"></i></a>
						{(this.props.title!=="") &&
					<ModalHeader>{this.props.title}
					
					</ModalHeader>
						}
					<ModalBody>
						{this.props.children}
					</ModalBody>
					{this.loadclosebtn(this.props.disablefooter)}			
								
				</Modal>	
			</div>			
			
    );
  }
}

export default ModalPopup;
