import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import SecondaryHeader from '../Layout/SecondaryHeader';
import tick from "../../common/images/tick_popup.png";
import cookie from "react-cookies";
import { LoadingSec } from "../Helpers/SettingHelper";
import { GET_TRANSACTIONDETAILS } from "../../actions";

import moment from "moment";

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction_ref_id: "",
      transaction_date: "",
      transaction_title: "",
      transaction_points: "",
      transaction_amount: "",
      transaction_promo_points: "",
      transaction_total_points: "",
      transaction_Usertotal_points: "",
      transcation_primary_id: cookie.load("transcation_primary_id"),
      transcation_promo: cookie.load("promo_code"),
      payment_method:'',
      loading: true
    };
  }

  componentDidMount() {
    let transcation_primary_id = this.state.transcation_primary_id;

    this.props.getTransactiondetails(transcation_primary_id);
  }
  componentWillReceiveProps(Props) {
    console.log(Props.transactiondetails)
    if (Props.transactiondetails !== this.props.transactiondetails) {
      this.setState({ loading: false });
      if (Props.transactiondetails[0].status === "ok") {
        var paidCurrency = "";
        if (
          Props.transactiondetails[0].result_set[
            "topup_transaction_curreny"
          ] === "SGD"
        ) {
          paidCurrency = "S$";
        } else {
          paidCurrency = "$";
        }

        this.setState({
          transaction_date:
            Props.transactiondetails[0].result_set[
              "topup_transaction_payment_retrieved_on"
            ],
          transaction_title:
            Props.transactiondetails[0].result_set["topup_title"],
          transaction_points:
            Props.transactiondetails[0].result_set["topup_transaction_points"],
          transaction_currency: paidCurrency,
          transaction_amount:
            Props.transactiondetails[0].result_set["topup_transaction_amount"],
          transaction_promo_points:
            Props.transactiondetails[0].result_set[
              "topup_transaction_promo_points"
            ],
          transaction_total_points:
            Props.transactiondetails[0].result_set[
              "topup_transaction_total_points"
            ],
          payment_method: 
            Props.transactiondetails[0].result_set["topup_transaction_payment_type"]
        });
        this.setState({
          transaction_ref_id:
            Props.transactiondetails[0].result_set["topup_transaction_ref_id"]
        });
        this.setState({transaction_Usertotal_points: Props.transactiondetails[0].userPoints})
        cookie.save("UserPoints", Props.transactiondetails[0].userPoints);
         
      }
    }
  }

  render() {
    let promo_code = "";
    if (
      this.state.transcation_promo !== "" &&
      this.state.transcation_promo !== undefined
    ) {
      promo_code = 1;
    } else {
      promo_code = "";
    }

    return (
      <div className="App">
        <Header userPoints= {(this.state.transaction_Usertotal_points!=='' && this.state.transaction_Usertotal_points!==undefined) && this.state.transaction_Usertotal_points}/>
         <SecondaryHeader />
        <Container className="rating_feedback_wrap">
          <div className="tnk-you">
            {this.state.loading === true ? LoadingSec : ""}
            {this.state.loading === false && (
              <div className="tnk-header">
                <div className="tick">
                  <img src={tick} alt="" />
                  <h2>Thank You </h2>
                  <span>Your transaction has been placed successfully</span>
                </div>
                <div className="tnk-detail">
                  <h2>YOUR TRANSACTION DETAILS</h2>
                  <div className="tnk-order">
                    <h3>Transaction No - {this.state.transaction_ref_id}</h3>
                    <p>
                      Order placed at :{" "}
                      {moment(this.state.transaction_date).format(
                        "DD-MM-YYYY, h:mm A"
                      )}
                      <br />
                      Pay by : {this.state.payment_method}
                    </p>
                  </div>
                </div>

                <div className="tnk-delivery">
                  <div className="order_details">
                    <div className="row addon_list">
                      <div className="col-sm-6 col-xs-9">
                        <div className="odr-dtls">
                          <h5>
                            <a href="/" className="title">
                              {this.state.transaction_title}
                            </a>
                          </h5>
                          <p>{this.state.transaction_points} Points</p>
                          {promo_code === 1 ? (
                            <p>Promo Code : {this.state.transcation_promo}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-3">
                        <div className="amt">
                          <span>
                            {this.state.transaction_currency}{" "}
                            {parseFloat(this.state.transaction_amount).toFixed(
                              2
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="odr_total_amt">
                    <div className="subtotal">
                      <Row>
                        <Col sm="6">Package points</Col>
                        <Col sm="6" className="f_amt">
                          {this.state.transaction_points}
                        </Col>
                      </Row>
                    </div>
                    {promo_code === 1 ? (
                      <div className="subtotal">
                        <Row>
                          <Col sm="6">Promotion points</Col>
                          <Col sm="6" className="f_amt">
                            {this.state.transaction_promo_points}
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="subtotal">
                      <Row>
                        <Col sm="6">Total points</Col>
                        <Col sm="6" className="f_amt">
                          {this.state.transaction_total_points}
                        </Col>
                      </Row>
                    </div>
                    <div className="subtotal">
                      <Row>
                        <Col sm="6">Total user points</Col>
                        <Col sm="6" className="f_amt">
                          {this.state.transaction_Usertotal_points}
                        </Col>
                      </Row>
                    </div>
                    <div className="total">
                      <Row>
                        <Col sm="6">Total Amount</Col>
                        <Col sm="6" className="f_amt">
                          {this.state.transaction_currency}{" "}
                          {parseFloat(this.state.transaction_amount).toFixed(2)}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <div className="tnk-chk-order">
                  <a className="btn check-btn" href="/wallet">
                    Topup Transaction History
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    transactiondetails: state.transactiondetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransactiondetails: transactionid => {
      dispatch({ type: GET_TRANSACTIONDETAILS, transactionid });
    }
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(withRouter(Thankyou));
