/* eslint-disable */
import React, { Component } from 'react';
import {Container, Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import SecondaryHeader from '../Layout/SecondaryHeader';
import ModalPopup from '../Layout/ModalPopup';
import qrcodepay from "../../common/images/qrcodepay.png";
import Logo from "../../common/images/icons.png";
import loading from "../../common/images/loading_popup.gif";
import tick from "../../common/images/tick_popup.png";
import $ from 'jquery';
import {
  PageTitle
} from "../Helpers/SettingHelper";
import Select from 'react-select';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { appName,stripeKey,stripeEnvir} from "../Config/Config";

import {GET_TOPUPPLAN,GET_APPLYPROMOTION,GET_STRIPONTOKEN,GET_TOPUPPOINTS,GET_CAPTUREAMOUNT, GET_SUBMITPOINTSYSTEM} from '../../actions';
 const package_price = [
        { value: '1', label: 'Price In SGD' },
	    { value: '2', label: 'Price In USD' },
      ];
class Buypoints extends Component {

	constructor(props) {
		super(props);
		this.state = {
			purchase_point_package: [],
			defaultLimit: 4,
			loadMorebut: '',
			totalplan: 0,
			loadMorebutton:0,
			loadMoreEnable:false,
			packageId: '',
			packagePoints: 0,
			promo_id: '',
			promo_points: 0,
			packageAmout: '0.00',
			promo_code: '',
			promo_error:'',
			promo_sucess: '',
			totalPoints: 0,
			userAvailablepoints: cookie.load("UserPoints"),
			palnUseremail: cookie.load("UserEmail"),
			user_token: cookie.load('UserAuthToken'),
			errors: {},
			showload: false,
			modalPayment: '',
			cartVaild: 0,
			transcationtVaild: 0,
			transCompVaild: 0,
			appliedPromo:0,
			loadmoreBut:0,
			package_price_type:{ value: '1', label: 'Price In SGD' },
			packageFinalSymbol: 'S$',
			getstripeCurrency:'SGD',
			showqrcode:1,
			modalQRcode:false,
			repeatMode: 1,
			cpatureMode: 1,
			submitpoints:0,
			promo_percentage:''
		};
		
		this.loadMoreoption = this.loadMoreoption.bind(this);
		this.setpackagePlan = this.setpackagePlan.bind(this);
		this.promotionFormSubmit = this.promotionFormSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.togglePaymentProcess = this.togglePaymentProcess.bind(this);
		this.toggleQRcode = this.toggleQRcode.bind(this);
	}

	componentDidMount() {
		 document.title = PageTitle('Buypoints');  
		if(!cookie.load('UserAuthToken')){
			window.location.href = "/login";
		}
		this.props.getTopupPlan();
	}
	
	componentWillReceiveProps(Props) {
		if(Object.keys(Props.topupplans).length > 0){
			if(Props.topupplans[0]['status'] === 'success'){
				this.setState({
					purchase_point_package: Props.topupplans[0]['result_set'],
					loadMorebut: 'View all plan',
					toatalPlan: Props.topupplans[0].total_records,
				});

				const totalrecords =  Props.topupplans[0].total_records;
                const limit =  this.state.defaultLimit;
                if(totalrecords > limit) {
                this.setState({loadMoreEnable:true});
                }else {
                this.setState({loadMoreEnable:false});
                }

				/*if(Props.topupplans[0].total_records > this.state.defaultLimit) {
					this.setState({loadMorebutton: 2});
				}else{
					this.setState({loadMorebutton: 1});
				}*/
			}
		}
		
		if(Object.keys(Props.promotionValues).length > 0){
			if(Props.promotionValues[0]['status'] === 'success'){
				parseInt(this.state.packagePoints) * Props.promotionValues[0]['promo_percentage']/100;
				let current = this;
				this.setState({
						promo_sucess:Props.promotionValues[0]['message'],
						//promo_points:Props.promotionValues[0]['promo_ponits'],
						promo_points:parseInt(current.state.packagePoints) * Props.promotionValues[0]['promo_percentage']/100,
						promo_percentage:Props.promotionValues[0]['promo_percentage'],
						promo_id:Props.promotionValues[0]['promo_id'],
						appliedPromo:1,
					})
					
					setTimeout(
						function() {
							this.setState({promo_sucess:''})
						}
						.bind(this),
						3000
					);
					
					cookie.save('promo_code',Props.promotionValues[0]['promo_code']);
			}else {
					
					this.setState(prevState => ({
						showload: false
					}));
					
					this.setState({
						promo_error:Props.promotionValues[0]['message'],
						promo_code: '',
						promo_points: '',
						promo_percentage: ''
					})
					
					setTimeout(
						function() {
							this.setState({promo_error:''})
						}
						.bind(this),
						3000
					);
					
			}
		}
		
		if(Object.keys(Props.stripontokenValues).length > 0){
			if (Props.stripontokenValues[0].status === "ok") { 
				var captureID = Props.stripontokenValues[0].result_set['payment_reference_1'];
				if(this.state.repeatMode === 1){
					this.postOrder(3,captureID, 'Stripe');	
				}
				this.setState({cartVaild:1});
			}else if (Props.stripontokenValues['status'] === "error") {
				$('.payment_errors').html('<span class="alert alert_danger">Error code: 1001 Oops! Something went wrong! Please try again</span>');
				
				setTimeout(function() { $('.payment_errors').html(''); },3000);
				
				return false;
			}
		}
		
		if(Object.keys(Props.topuppointsValues).length > 0){
			if (Props.topuppointsValues[0].status === "ok") {
				var localOrderNo = Props.topuppointsValues[0].transaction_ref_id;
				var payGetWayType = 'Stripe';
				/* capture payemnt */
				if (payGetWayType === "Stripe" && this.state.cpatureMode === 1) {
					this.captureAmount(captureID, Props.topuppointsValues[0].transaction_primary_id, localOrderNo);
				}
				
				cookie.save("transcation_primary_id",Props.topuppointsValues[0].transaction_primary_id);
				
				this.setState({transcationtVaild:1});
				
			}else if (Props.topuppointsValues['status'] === "error") {
				$('.payment_errors').html('<span class="alert alert_danger">Your transcation was not successful</span>');
				
				setTimeout(function() { $('.payment_errors').html(''); },3000);
			}
		}
		
		if(Object.keys(Props.captureAmountres).length > 0){
			
			if (Props.captureAmountres[0].status === "ok") {
				
				this.setState({transCompVaild:1});
                
				if(this.state.submitpoints == 0){this.topuppromotion()};
            }else if (Props.captureAmountres['status'] === "error") {
				
				$('.payment_errors').html('<span class="alert alert_danger">Your transcation was not successful</span>');
				
				setTimeout(function() { $('.payment_errors').html(''); },3000);

            } else {
                
                $('.payment_errors').html('<span class="alert alert_danger">Your transcation was not successful</span>');
				
				setTimeout(function() { $('.payment_errors').html(''); },3000);
				
            }
			
		}

		if(Object.keys(Props.submitsystempoints).length > 0){
			
			if (Props.submitsystempoints[0].status === "ok") {
				if(this.state.appliedPromo !== 1){
						cookie.save('promo_code','');
				}
						
				window.location.href = "/thank-you";
                
            }else{
						
				$('.payment_errors').html('<span class="alert alert_danger">Your transcation was not successful</span>');
		
				setTimeout(function() { $('.payment_errors').html(''); },3000);					
				
	        }
		}
	}
  
	toggleQRcode() {
		this.setState(prevState => ({
			modalQRcode: !prevState.modalQRcode
		}));
	}
	
	togglePaymentProcess() {
		this.setState(prevState => ({
			modalPayment: !prevState.modalPayment
		}));
	}
	
	handleSelectChange(option, actionMeta) {
		this.setState({
			[actionMeta.name]: option,
		});
		
		var PlanSym = '';
		if(this.state.package_price_type.value == 2){
			PlanSym = 'S$';
		}else if(this.state.package_price_type.value == 1){
			PlanSym = '$';
		}
		this.setState({
			packageId: '',
			packagePoints: 0,
			packageAmout: '0.00',
			packageFinalSymbol: PlanSym,
		});
		
		$(".package_plan_radio").prop("checked", false);
	}
	
	setpackagePlan(selectedPlan){
		
		var pricePlanType = '';
		var pricePlanSym = '';
		var getstripeCurrency ='SGD';
		
		if(this.state.package_price_type.value === 2){
			pricePlanType = selectedPlan.topup_amount_usd;
			pricePlanSym = '$';
			getstripeCurrency = 'USD';
		}else{
			pricePlanType = selectedPlan.topup_amount_sgd;
			pricePlanSym = 'S$';
			getstripeCurrency = 'SGD';
		}
		
		this.setState({
			packageId: selectedPlan.topup_id,
			packagePoints: selectedPlan.topup_points,
			packageAmout: parseFloat(pricePlanType).toFixed(2),
			packageFinalSymbol: pricePlanSym,
			getstripeCurrency:getstripeCurrency
		});
		
	}
	
	loadMoreoption(){
		let currentLimit = this.state.defaultLimit;
		let ingrementVal = currentLimit+4;
		this.setState({defaultLimit:ingrementVal,loadmoreBut:1,loadMorebut:'Please wait...'},function(){this.props.getTopupPlan()});
	}
	
	handleInputChange(event){
		this.setState({promo_code: event.target.value,errors:''});
	}
	
	promotionFormSubmit(){
		
		this.setState(prevState => ({
			showload: !prevState.showload
		}));
		
		if(this.validateForm()){
			
			var qs = require('qs');
			
			var postObject = {
				"app_name":appName,
				"promo_code": this.state.promo_code,
				"user_token": this.state.user_token,
			};
			
			this.props.applyPromotion(qs.stringify(postObject));
			
		}else{
			
			setTimeout(
				function() {
					this.setState({errors:''});
					this.setState(prevState => ({
						showload: false
					}));
				}.bind(this),3000
			);
		}
		
	}
	
	validateForm() {
		
		const {promo_code} = this.state;
		
		let errors = {};
      	let formIsValid = true;

		if (!promo_code) {
			formIsValid = false;
			 $('.promoerror').html('<span class="errorspan">Please enter your promocode</span>');
		}else if(promo_code!==''){
			 $('.promoerror').html('');
		}
		
		this.setState({
			errors: errors
		});

		return formIsValid;
    }
    
    choosePackage(){
		
		$('.payment_package_errors').html('<span class="alert alert_danger">Please select your package first.</span>');
				
		setTimeout(function() { $('.payment_package_errors').html(''); },10000);
	}
	
	/* post stripe account */
    onToken = (token) => {
		
		var payAmount = parseFloat(this.state.packageAmout).toFixed(2);
		var qs = require('qs');
		
        /*  load process html */
        var postObject = {};
        postObject = {
            'app_name': appName,
            'token': token.id,
            'userToken' : this.state.user_token,
            'stripe_envir': stripeEnvir,
            'stripe_key': stripeKey,
            "user_id": cookie.load('UserId'),
            "paid_amount": payAmount,
            "payment_reference": 'Geniehut',
            
        }
        
		this.togglePaymentProcess();
		this.props.striponToken(qs.stringify(postObject));
       
  }
  
  /* this fuction used to post order to biz panel */
    postOrder(paymentMode, captureID = '', payGetWayType = '',Paymentpop = 'No') {
		
		let currentUserAuthToken = cookie.load('UserAuthToken');
		
        if (currentUserAuthToken === '' || currentUserAuthToken === undefined) {
            window.location.href = "/";
        }
        var qs = require('qs')
        
        var postObject = {};
        postObject = {
            /* cart details */
            'app_name': appName,
            'transaction_topup_id': this.state.packageId,
            'transaction_promo_id': this.state.promo_id,
            'transaction_user_Token': currentUserAuthToken, 
            'transaction_payment_mode': paymentMode,
            'transaction_payment_type': payGetWayType,
            'transaction_currency': this.state.getstripeCurrency,
            "transaction_amount": parseFloat(this.state.packageAmout).toFixed(2),
            "transaction_payment_status": '',
            "transaction_percentage": this.state.promo_percentage,
            "transaction_points": this.state.packagePoints,
            "transaction_promo_points": this.state.promo_points,
            "transaction_order_source": 'Web',
            "transaction_payment_getway_status": 'Yes',
        }
        this.setState({ repeatMode : 2})
        this.props.topupPoints(qs.stringify(postObject));
	}
	
	
	/* Capture amount */
    captureAmount(captureID, orderPrimaryId, localOrderNo) {

        var captureObjects = {};
        
        var qs = require('qs')
        
    	//console.log(parseInt(this.state.promo_percentage))
    	var Paidtotal_points = parseInt(this.state.packagePoints) + (parseInt(this.state.packagePoints) * this.state.promo_percentage)/100;

        //var Paidtotal_points = (parseInt(this.state.packagePoints)+parseInt(this.state.promo_points));
        
        captureObjects = { payment_reference: 'geniehut', stripe_envir: stripeEnvir, "customer_token": cookie.load('UserAuthToken'),'token': captureID, 'transaction_id': orderPrimaryId ,'app_name': appName,'paid_total_points' : Paidtotal_points};

         this.setState({ cpatureMode : 2})
         this.props.capturePaymentAmount(qs.stringify(captureObjects));
    }

    topuppromotion(){
    		var PointpostObject = {};
            var qs = require('qs');
                PointpostObject = {
					/* cart details */
					'app_name': appName,
					'trans_user_token': cookie.load('UserAuthToken'),
					"trans_points": this.state.packagePoints,
					"trans_promo_points": this.state.promo_points,
					"trans_type": 'topup',
					"trans_action": 'A',
				}
				this.setState({submitpoints: 1})
		this.props.getSubmitPointsystem(qs.stringify(PointpostObject));
    }

	render() {
		//console.log(this.state.promo_points)
		let qrcodeimg = <span className="qrcode_img_tag"><img src={qrcodepay} alt="" /></span>
		
		let  point_packages = '';
		
		if(this.state.purchase_point_package.length===1){
			
			point_packages = <FormGroup check className="custom_checkbox">
							<span className="points">
								<p>There is no points plan</p>
							</span>
						</FormGroup>
		}else{
			
		let thisVal = this;
		let recommendedPlan = '';
		let pricePlanType = '';
		let pricePlanSym = '';
	
		point_packages = <div className= "toatalPackes">
		                <div className="pkg_price_field">
							<label htmlFor="propertiesfor"className="star" >Package Price On</label>
							<Select options={package_price} name="package_price_type" id="package_price_type" Value={this.state.package_price_type} defaultValue={this.state.package_price_type} onChange={this.handleSelectChange.bind(this)} />
							</div>
							{
									this.state.purchase_point_package.map(function(item,index) {
									
									if(item.topup_recommended === 1){
										recommendedPlan = 'custom_checkbox recommended';
									}else{
										recommendedPlan = 'custom_checkbox packagelist';
									}
									
									if(thisVal.state.package_price_type.value == 2){
										pricePlanType = parseFloat(item.topup_amount_usd).toFixed(2);
										pricePlanSym = '$';
									}else{
										pricePlanType = parseFloat(item.topup_amount_sgd).toFixed(2);
										pricePlanSym = 'S$';
									}
									
									return  <FormGroup check className={recommendedPlan} key={item.topup_id}>
										<span className="points packages">
											<input type="radio" name="package_plan" id={item.topup_id} value="1" className="package_plan_radio" onClick={thisVal.setpackagePlan.bind(thisVal,item)}/>
											<Label for="exampleCheck">{item.topup_title}</Label>
										</span>
										<span className="cs top_plan_title">{item.topup_points} Points</span>
										<span className="rs">{pricePlanSym} {pricePlanType}</span>
									</FormGroup>
									
								})
							}
						</div>
			
		}
		
		{/*let loadMorebutton = '';
		
		if(this.state.loadMorebutton === 1){
			
			loadMorebutton = <div className="view_planlink text-center">
								<a href="javascript:void(0)" title="View all plants" onClick={this.loadMoreoption}>{this.state.loadMorebut}<i className="fa fa-angle-down"></i></a>
							</div>
		}else{
			loadMorebutton = '';
		}*/}		
		let toatalPackagepoints = 0;

		
		
		if(this.state.promo_points > 0){
			
			//toatalPackagepoints  = (parseInt(this.state.promo_points) + parseInt(this.state.packagePoints));
			toatalPackagepoints  =  parseInt(this.state.packagePoints) + (parseInt(this.state.packagePoints) * this.state.promo_percentage)/100;
		}else{
			
			toatalPackagepoints = this.state.packagePoints;
		}
		
		let cartVaildinfo = '';

		if(this.state.cartVaild === 1){
			
			cartVaildinfo = <div className="card_information process_list pay_processed">
								<div className="process_icon">
									<img src={tick} alt="logo" />
								</div>
								<div className="process_rslt">
									<h4>Processed</h4>
									<p>Validating card information</p>
								</div>
							</div>
			
		}else{
			
			cartVaildinfo = <div className="card_information process_list">
								<div className="process_icon">
									<img src={loading} alt="logo" />
								</div>
								<div className="process_rslt">
									<h4>Processing</h4>
									<p>Validating card information</p>
								</div>
							</div>
			
		}	


		let transcationtVaildinfo = '';

		if(this.state.transcationtVaild){

		transcationtVaildinfo = <div className="process_list pay_processed">
								<div className="process_icon">
									<img src={tick} alt="logo" />
								</div>
								<div className="process_rslt">
									<h4>Processed</h4>
									<p>Placing your transaction now</p>
								</div>
							</div>

		}else{

		transcationtVaildinfo = <div className="process_list">
								<div className="process_icon">
									<img src={loading} alt="logo" />
								</div>
								<div className="process_rslt">
									<h4>Processing</h4>
									<p>Placing your transaction now</p>
								</div>
							</div>
		}


		let transCompVaildinfo = ''; 

		if(this.state.transCompVaild === 1){
			
			transCompVaildinfo =  <div className="process_list pay_processed">
									<div className="process_icon">
										<img src={tick} alt="logo" />
									</div>
									<div className="process_rslt">
										<h4>Processed</h4>
										<p>Completing your online payment</p>
									</div>
								</div>
			
		}else{
			
			transCompVaildinfo =  <div className="process_list">
									<div className="process_icon">
										<img src={loading} alt="logo" />
									</div>
									<div className="process_rslt">
										<h4>Processing</h4>
										<p>Completing your online payment</p>
									</div>
								</div>
			
		}

		let submitBut = '';
	
		if(this.state.packageId !== ''){
			submitBut = <StripeCheckout name="geniehut" image={Logo} description="User topup plan" token={this.onToken} stripeKey={stripeKey} amount={(this.state.packageAmout * 100)} email={this.state.palnUseremail} currency={this.state.getstripeCurrency} ><Button className="frm-btn btn animate-btn2 btn_green">Pay Now</Button></StripeCheckout>
		}else{
			submitBut = <Button className="frm-btn btn animate-btn2 btn_green" onClick={this.choosePackage.bind(this)}>Pay Now</Button>
		}
				
		return (
			<div className="Homepage">
				<Header/>
				 <SecondaryHeader />
					<Container className="Plan_purchase">
				
				<div className="Plan_select_sect">
					
					<div className="plan_desc text-center">
						<h4>Plans for purchase points</h4>
						<p>Purchase GH points with our attractive packages using credit cards.</p>
						<div className="avail_points">
							<span>Available Points: <b>{this.state.userAvailablepoints}</b></span>
						</div>			
					</div>	
					
					<div className="gh_points_Plann_sec">
						<Row>
							<Col md={6}> 
							{/*<div className="abt_points">
								<h4>About GH Points</h4>
									<p>For amount &gt; SGD 500, Paynow to Corporate 201710325K or scan QR code to transfer.</p>
									<p>Whatsapp (+65) 98256258 with the transfer proof and promotion code.</p>
									<p> Our customer serviceofficer credits your account based on SGD 1 = 100 GH points on top of the promotion code benefit for you.</p>
									<p>You can also earn GH points by</p>
								<ul className="abt_pointslist">
									<li>Sharing your unqiue link to your friends</li>
									<li>Referral your friends to join Geniehut’s community</li>
									<li>Use Geniehut’s search engines to engage our service providers(“Clients”)</li>
								</ul>
							</div>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Awards</th>
										<th>Top up (SGD)</th>
										<th>Whatsapp (+65) 98256258<br/> proof of purchase and<br/> get 1 time bonus</th>
									</tr>
								</thead>
								<tbody>
									<tr><td>Bronze</td><td>888</td><td>1,688</td></tr>
									<tr><td>Silver</td><td>1,688</td><td>3,888</td></tr>
									<tr><td>Gold</td><td>3,888</td><td>8,888</td></tr>
									<tr><td>Platimum</td><td>8,888</td><td>16,888</td></tr>
									<tr><td>Diamond</td><td>16,888</td><td>88,888</td></tr>
								</tbody>
							</table>
							<Button className="frm-btn btn animate-btn2 btn_blue btn-align-center" onClick={this.toggleQRcode.bind(this)}>QR Code Payment</Button>*/}
							</Col>			   
							<Col md={12}> 
							<div className="plan_select">
								<h4>Select Plan</h4>
								<div className="payment_package_errors"></div>
								<div className="plan_list">
									{point_packages}
									<div className="view_planlink text-center">
									<a href="javascript:void(0)" title="View all plants" onClick={this.loadMoreoption} style={{display:(this.state.loadMoreEnable===false)?'none':''}}>{this.state.loadMorebut}<i className="fa fa-angle-down"></i></a>
									</div>

									<div className="apply_promosec">
									<form className="agent_login" id="agent_login">
									<div className="promoerror"></div>
									<div className="promo_error">{this.state.promo_error}</div>	
									<div className="promo_sucess"><h3>{this.state.promo_sucess}</h3></div>	
										<FormGroup className="apply_promorow">
											<Label for="promocode" className="star">Apply Promo Code</Label>
											<div class="promo-wrapper">
											<Input type="text" name="promo_code" id="promo_code"  placeholder="Enter Promo Code" value={this.state.promo_code}onChange={this.handleInputChange}/>
											<Button className="frm-btn btn animate-btn2 btn_blue" onClick={this.promotionFormSubmit.bind(this)}>Apply
											<span className={this.state.showload ? "show" : "hide"} id="load_icon"><b></b></span>
											</Button>
											</div>
										</FormGroup>
									</form>	
										<p className="total_amt">Package points : <span>{this.state.packagePoints}</span></p>
										{this.state.appliedPromo === 1 ? <p className="total_amt">Promotion % : <span>{this.state.promo_percentage} %</span></p>:''}
										<p className="total_amt">Total points : <span>{toatalPackagepoints}</span></p>
										<p className="total_amt">Total Amount : <span>{this.state.packageFinalSymbol} {this.state.packageAmout}</span></p>
										<FormGroup className="buy_btn text-right">
											{submitBut}					
										</FormGroup>									
										
									</div>

								</div>
							</div>
							</Col>
							{/*<Col md={12}> 
							<div class="fm-note">For amount > SGD 100, contact
customersupport@geniehut.com or whatsapp +6590067988 to get more points.</div>
							</Col>*/}
						</Row>
					</div>
				</div>
			</Container>				
				<Footer/>
				<ModalPopup modal={this.state.modalPayment} toggle={this.togglePaymentProcess} className="paymentProcess_popup" title="We Are Processing Your Transcation" >
				<span className="payment_errors"></span>	
				<div className="payment_process_sec">
					
					{cartVaildinfo}		
					{transcationtVaildinfo}		
					{transCompVaildinfo}

				</div>
			</ModalPopup>	
				<ModalPopup className="QRcodePay" title="QR Code Payment" id="QRcodePay" modal={this.state.modalQRcode} toggle={this.toggleQRcode} >
					{qrcodeimg}
				</ModalPopup>
				
			</div>
		);
	}
}

const mapStateTopProps = (state) => {
  return {
	topupplans: state.buypoints,
	promotionValues: state.applypromotion,
	stripontokenValues: state.stripontoken,
	topuppointsValues: state.topuppoints,
	captureAmountres: state.captureamount,
	submitsystempoints: state.submitsystempoints,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopupPlan: () => {
      dispatch({ type: GET_TOPUPPLAN});
    },
    applyPromotion: (formPayload) => {
      dispatch({ type: GET_APPLYPROMOTION, formPayload});
    },
    striponToken: (formPayload) => {
      dispatch({ type: GET_STRIPONTOKEN, formPayload});
    },
    topupPoints: (formPayload) => {
      dispatch({ type: GET_TOPUPPOINTS, formPayload});
    },
    capturePaymentAmount: (formPayload) => {
      dispatch({ type: GET_CAPTUREAMOUNT, formPayload});
    },
    getSubmitPointsystem: (formPayload) => {
      dispatch({ type: GET_SUBMITPOINTSYSTEM, formPayload});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Buypoints));
