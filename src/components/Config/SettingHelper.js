import React from 'react';
import cookie from 'react-cookies';
/*import noimage from "../../common/images/noimg-800x800.jpg";
import { deliveryId } from "./Config";*/
import $ from 'jquery';
import Parser from 'html-react-parser';
/* stripslashes  */
export const stripslashes = function(str) { str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
};


/* Random ID  */
export const randomId = function() {
    var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 50; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
};


/* Call image */
/*export const callImage = function(image_source,image,width,height,timthumb,imageTag = 'Yes') {
    
    var imagesource='';
        
        if(image!==null && image!==''){
            imagesource = timthumb+image_source+"/"+image+"&w="+width+"&h="+height+"&q=80";
        }else{
            imagesource = noimage;
        }
        if(imageTag === 'Yes'){
            return (<img src={imagesource} alt="" width={width} height={height} />);
        }else{
            return imagesource;
        }
    
};*/

/* sample funtion */
export const showSubTotalValue = function(price) { 

    price = (price !== '') ? parseFloat(price) : 0.00;
	var priceTxt = price.toFixed(2);
	return priceTxt;
	
 };



/* address format */
export const addressFormat = function (unitOne, unitTwo, addressOne, addressTwo, postCode) {
	var unit = (unitTwo !== "" && unitOne !== "" ? "#" + unitOne + "-" + unitTwo + "," : (unitOne !== '' ? "#" + unitOne + "," : ""));
	 unit = (addressOne !== "" ? unit + addressOne + "," : unit );
	 unit = (addressTwo !== "" ? unit + addressTwo + "," : unit );
	 unit = (postCode !== "" ? unit+'Singapore ' + postCode  : unit );

	return (unit !== "" ? unit.replace(/,\s*$/, "") : 'N/A' );
};




/* show Alert */
export const showAlert = function(header, message, autoClose = 'No') {
    $(".alert_popup").remove();
	if(autoClose === 'No') {
		$('body').append('<div class="white-popup mfp-hide popup_sec alert_popup custom-alrt-popupcls" ><div class="custom_alert"><div class="custom_alertin"><div class="alert_height"><div class="alert_header">'+header+'</div><div class="alert_body"><p>'+message+'</p><div class="alt_btns"><a href="javascript:;" class="popup-modal-dismiss button">OK</a></div></div></div></div></div></div>');
	} else {
		$('body').append('<div class="white-popup mfp-hide popup_sec alert_popup custom-alrt-popupcls" ><div class="custom_alert"><div class="custom_alertin"><div class="alert_height"><div class="alert_header">'+header+'</div><div class="alert_body"><p>'+message+'</p><div class="alt_btns"></div></div></div></div></div></div>');
		setTimeout(function () {
			autoClose.close();
		}, 1800);
	}
};


/* smooth Scroll */
export const smoothScroll = function(limit,value) {

	var limitTxt = (limit !== '') ? parseInt(limit) : 0;
	var valueTxt = (value !== '') ? parseInt(value) : 0;
	
	var stickyTop = $(window).scrollTop();
    if(stickyTop > limitTxt) {
	   var i = 10;
	   var int = setInterval(function() {
		window.scrollTo(0, i);
		i += 10;
		if (i >= valueTxt) clearInterval(int);
	   }, 20);
    }
    
};

/* show Custom Alert */
export const showCustomAlert = function(type,message) {

	var clsIdTxt = (type === 'success') ? "jquery-success-msg" : "jquery-error-msg";
	$(".custom_alertcls").hide();
	$("."+clsIdTxt).html(message);
	$("#"+clsIdTxt).fadeIn();
    setTimeout(function()
	{
		$(".custom_alertcls").hide();
	}, 6000);
    
};

/* show Cart Count */
export const showCartItemCount = function(cartDetail) {

	var itemCount = (Object.keys(cartDetail).length > 0) ? cartDetail.cart_total_items : 0;
	var subTotal = (Object.keys(cartDetail).length > 0) ? cartDetail.cart_sub_total : 0;
	cookie.save("cartTotalItems",itemCount);	
	$(".hcart_round").html(itemCount);
	if(parseFloat(subTotal)>0) {
		$(".crttotl_amt").show();
	} else {
		$(".crttotl_amt").hide();
	}
	var subTotalHtml = '<sup>$</sup>'+subTotal;
	$(".crttotl_amt").html(subTotalHtml);
    
};

/* show Loader */
export const showLoader = function(divRef,type) {
	if(type === 'class') {
		$('.'+divRef).addClass("loader-main-cls").append('<div class="loader-sub-div"></div>');
	} else {
		$('#'+divRef).addClass("loader-main-cls").append('<div class="loader-sub-div"></div>');
	}
};

/* hide Loader */
export const hideLoader = function(divRef,type) {
	if(type === 'class') {
		$('.'+divRef).removeClass("loader-main-cls");
		$('.'+divRef).find(".loader-sub-div").remove();
	} else {
		$('#'+divRef).removeClass("loader-main-cls");
		$('#'+divRef).find(".loader-sub-div").remove();
	}
};


 /* get subtotal value  */
 export const getsubTotal = function(subTotal,OriginalAmount,promotionApplied,redeemptionApplied=null) {
	
    if(promotionApplied === "Yes"){
         return subTotal;
    }else if(redeemptionApplied === "Yes"){
         return subTotal;
    }else{
         return OriginalAmount;
    }
  
};


/* get subtotal value  */
export const getDeliveryCharge = function(promotionApplied,deliveryEnabled,OriginalAmount,isFreeDelivery=null) {
  
    if( (promotionApplied === "Yes" && deliveryEnabled === "Yes") || isFreeDelivery === "Yes"){
         return 0;
    }else{
         return OriginalAmount;
    }
  
};

/* sample funtion */
export const showPriceValue = function(price) { 

    price = (price !== '') ? parseFloat(price) : 0.00;
	var priceTxt = '$ '+price.toFixed(2);
	return priceTxt;
	
 };

/* sample funtion */
export const getGstValue = function(gst,subtotal,format) { 

    gst = parseFloat(gst);
    subtotal = parseFloat(subtotal);
	var gstResult = 0;
   
    if(gst > 0) {
		gstResult  = (gst /100 ) * subtotal; 
	} 
	
	 if(format === "format"){
		  return gstResult.toFixed(2);
	 }else{
		  return gstResult;
	 } 

 };
 
  /* GST Reverse Calculation funtion */
 export const getReverseGST = function(total) { 
    var vatDivisor = 1 + (7/100);
    var gstpercentage = 7/100;
    var productvalue = total/vatDivisor
    var gst = productvalue*gstpercentage;
    return "GST Inclusive (7%): $"+gst.toFixed(2);
  };  


 /* time conversion  */
 export const timeToConv12 = function(time24) {
	  var ts = time24;
	  if(ts !== "" && typeof ts !== 'undefined') {
		  var H = +ts.substr(0, 2);
		  var h = (H % 12) || 12;
		  h = (h < 10)?("0"+h):h;  
		  var ampm = H < 12 ? " AM" : " PM";
		  ts = h + ts.substr(2, 3) + ampm;
	  }
	  return ts;
  };
  
 /* Date conversion  */
 export const getOrderDateTime = function(dateTxt,TatTxt) {
	  var dateStr = new Date();
	  var TatTxtVl = (TatTxt !== '' && typeof TatTxt !== 'undefined') ? parseInt(TatTxt) : 0;
	  if(dateTxt !== '' && typeof dateTxt !== 'undefined') {
		      dateStr = dateTxt;
	  }	else {
		  var CurrentDate = new Date();
		      CurrentDate.setMinutes(CurrentDate.getMinutes() + TatTxtVl);
			  dateStr = CurrentDate;	  
	  }

	  return dateStr;
  }; 

 /* Date conversion  */
 export const dateConvFun = function(dateTxt,type) {
	  
	  var dateStr = dateTxt;
	  if(dateStr !== '' && typeof dateStr !== 'undefined') {
		  var newDateTxtone = dateTxt.replace(/-/g, '/');
		  var todayTime = new Date(newDateTxtone);
		  var month = (todayTime.getMonth() + 1);
		  month = (month > 9) ? month : '0'+month;
		  var day = todayTime.getDate();
		  day = (day > 9) ? day : '0'+day;
		  var year = todayTime.getFullYear();
		 
		  if(type === 1) {
			  dateStr = day + "/" + month + "/" + year;
		  } else if(type === 2) {
			  dateStr = day + "-" + month + "-" + year;
		  }
	  }
	  
	  return dateStr;
  }; 

  /* Date conversion  */
 export const getTimeFrmDate = function(timeTxt,type) {
	  
	  var timeStr = timeTxt;
	  if(timeStr !== '' && typeof timeStr !== 'undefined') {
		  var newtimeStr = timeStr.replace(/-/g, '/');
		  var todayTime = new Date(newtimeStr);
		  var hours = todayTime.getHours();
		  var minut = todayTime.getMinutes();
		  
		  hours = (parseInt(hours)<10) ? '0'+hours : hours; 
		  minut = (parseInt(minut)<10) ? '0'+minut : minut; 
		 
		  if(type === 1) {
			 timeStr = hours+" : "+minut;
		  } else if(type === 2) {
			 timeStr = hours+":"+minut;
			 timeStr = timeToConv12(timeStr);
		  }
	  }
	  
	  return timeStr;
  };
  
  /* Date conversion  */
 export const getCurrentDateTm = function() {
	  
	  var dateTimeStr = '';
	  var todayTime = new Date();
	  
	  var month = (todayTime.getMonth() + 1);
		  month = (month > 9) ? month : '0'+month;
	  var day = todayTime.getDate();
	      day = (day > 9) ? day : '0'+day;
	  var year = todayTime.getFullYear();
	  
	  var hours = todayTime.getHours();
	  var minut = todayTime.getMinutes();
	  var second = todayTime.getSeconds();
		  
		  hours = (parseInt(hours)<10) ? '0'+hours : hours; 
		  minut = (parseInt(minut)<10) ? '0'+minut : minut; 
		  second = (parseInt(minut)<10) ? '0'+second : second; 
     
      dateTimeStr = year+"-"+month+"-"+day+" "+hours+":"+minut+":"+second;	 
		
	  return dateTimeStr;
  };
  

 /* sample funtion */
 export const showCartLst = function() { 
	   setTimeout(function(){
			$(".hcart_dropdown").toggleClass('open');
			$(".hcartdd_trigger").toggleClass('active');
		},1000);
 };
  
/* sample funtion */
 export const getAliasName = function(alias,productName) { 

    return (alias !==""? alias : productName)
  };