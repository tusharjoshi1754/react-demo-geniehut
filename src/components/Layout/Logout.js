import React,{Component} from 'react';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { appName } from "../Config/Config";
import { GET_UNSETTOKEN} from '../../actions';

class Logout extends Component {

      constructor(props) {
        super(props); 
        this.state = {
        
          };
          this.getunsettoken(cookie.load("UserAuthToken"));
    }

    getunsettoken(user_token){
       var qs = require('qs');
            var postObject = {
            "app_name": appName,
            "user_token":user_token
            };
        this.props.getUnsetToken(qs.stringify(postObject));
    }
    componentWillReceiveProps(Props){
      if(Props.unsettoken !== this.props.unsettoken){
        if(Props.unsettoken[0].status){
              cookie.remove("UserAuthToken");
              cookie.remove("login_user_type");
              cookie.remove("UserPoints");
              cookie.remove("UserMobile");
              cookie.remove("UserEmail");
              cookie.remove('UserFullname');
              cookie.remove('CountryCode');
              cookie.remove('UserId');
              cookie.remove('user_nickname');
              cookie.remove('UserGender');
              cookie.remove('Userverify');
              cookie.remove('contactphone');
              cookie.remove('contactemail');
              cookie.remove('Hearabout');
              cookie.remove('reference_code');
              cookie.remove('shortcode');
              cookie.remove('user_url');
              this.props.history.push("/login");
        }
      }
    }
    render() {
      return (
        <h4 className="loading-text">
          Logging out...
        </h4>
      );
    }
  }
  const mapStateTopProps = (state) => {
    return {
      unsettoken: state.unsettoken
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getUnsetToken: (formPayload) => {
        dispatch({ type: GET_UNSETTOKEN, formPayload });
      },
    }
  }
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Logout));