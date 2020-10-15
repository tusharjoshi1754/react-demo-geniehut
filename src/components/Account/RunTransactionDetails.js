import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Link, withRouter } from 'react-router-dom';


import { GET_REQUESTSERVICE, GET_SERVICES } from '../../actions';



class RunTransactionDetails extends Component {

    constructor(props) {
        super(props);   
        this.state = {
           
        };
       
    };

    componentWillReceiveProps(Props){
        
    }

    render() {    
        return (
                <div> 
                 fdsfdsfd
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
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(RunTransactionDetails));
