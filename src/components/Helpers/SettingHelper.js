import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { profileImage, serviceImage, serviceCategory } from "../Config/Config";
import { lang } from "../Helpers/lang";

import UserAvatar from "../../common/images/header/logo.png";
import proAvartar from "../../common/images/header/avatar.PNG";
import NoImage from "../../common/images/header/avatar.PNG";
import profilelist from "../../common/images/profile2.png";


import $ from "jquery";
import moment from "moment";
var Parser = require("html-react-parser");
var base64 = require("base-64");

/* stripslashes  */
export const stripslashes = function(str) {
  str = str.replace(/\\'/g, "'");
  str = str.replace(/\\"/g, '"');
  str = str.replace(/\\0/g, "\0");
  str = str.replace(/\\\\/g, "\\");
  return str;
};

/* Random ID  */
export const randomId = function() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
  price = price !== "" ? parseFloat(price) : 0.0;
  var priceTxt = price.toFixed(2);
  return priceTxt;
};

/* address format */
export const addressFormat = function(
  unitOne,
  unitTwo,
  addressOne,
  addressTwo,
  postCode
) {
  var unit =
    unitTwo !== "" && unitOne !== ""
      ? "#" + unitOne + "-" + unitTwo + ","
      : unitOne !== ""
      ? "#" + unitOne + ","
      : "";
  unit = addressOne !== "" ? unit + addressOne + "," : unit;
  unit = addressTwo !== "" ? unit + addressTwo + "," : unit;
  unit = postCode !== "" ? unit + "Singapore " + postCode : unit;

  return unit !== "" ? unit.replace(/,\s*$/, "") : "N/A";
};

/* show Alert */
export const showAlert = function(header, message, autoClose = "No") {
  $(".alert_popup").remove();
  if (autoClose === "No") {
    $("body").append(
      '<div class="white-popup mfp-hide popup_sec alert_popup custom-alrt-popupcls" ><div class="custom_alert"><div class="custom_alertin"><div class="alert_height"><div class="alert_header">' +
        header +
        '</div><div class="alert_body"><p>' +
        message +
        '</p><div class="alt_btns"><a href="javascript:;" class="popup-modal-dismiss button">OK</a></div></div></div></div></div></div>'
    );
  } else {
    $("body").append(
      '<div class="white-popup mfp-hide popup_sec alert_popup custom-alrt-popupcls" ><div class="custom_alert"><div class="custom_alertin"><div class="alert_height"><div class="alert_header">' +
        header +
        '</div><div class="alert_body"><p>' +
        message +
        '</p><div class="alt_btns"></div></div></div></div></div></div>'
    );
    setTimeout(function() {
      autoClose.close();
    }, 1800);
  }
};

/* smooth Scroll */
export const smoothScroll = function(limit, value) {
  var limitTxt = limit !== "" ? parseInt(limit) : 0;
  var valueTxt = value !== "" ? parseInt(value) : 0;

  var stickyTop = $(window).scrollTop();
  if (stickyTop > limitTxt) {
    var i = 10;
    var int = setInterval(function() {
      window.scrollTo(0, i);
      i += 10;
      if (i >= valueTxt) clearInterval(int);
    }, 20);
  }
};

/* show Custom Alert */
export const showCustomAlert = function(type, message) {
  var clsIdTxt = type === "success" ? "jquery-success-msg" : "jquery-error-msg";
  $(".custom_alertcls").hide();
  $("." + clsIdTxt).html(message);
  $("#" + clsIdTxt).fadeIn();
  setTimeout(function() {
    $(".custom_alertcls").hide();
  }, 6000);
};

/* show Cart Count */
export const showCartItemCount = function(cartDetail) {
  var itemCount =
    Object.keys(cartDetail).length > 0 ? cartDetail.cart_total_items : 0;
  var subTotal =
    Object.keys(cartDetail).length > 0 ? cartDetail.cart_sub_total : 0;
  cookie.save("cartTotalItems", itemCount);
  $(".hcart_round").html(itemCount);
  if (parseFloat(subTotal) > 0) {
    $(".crttotl_amt").show();
  } else {
    $(".crttotl_amt").hide();
  }
  var subTotalHtml = "<sup>$</sup>" + subTotal;
  $(".crttotl_amt").html(subTotalHtml);
};

/* show Loader */
export const showLoader = function(divRef, type) {
  if (type === "class") {
    $("." + divRef)
      .addClass("loader-main-cls")
      .append('<div class="loader-sub-div"></div>');
  } else {
    $("#" + divRef)
      .addClass("loader-main-cls")
      .append('<div class="loader-sub-div"></div>');
  }
};

/* hide Loader */
export const hideLoader = function(divRef, type) {
  if (type === "class") {
    $("." + divRef).removeClass("loader-main-cls");
    $("." + divRef)
      .find(".loader-sub-div")
      .remove();
  } else {
    $("#" + divRef).removeClass("loader-main-cls");
    $("#" + divRef)
      .find(".loader-sub-div")
      .remove();
  }
};

/* get subtotal value  */
export const getsubTotal = function(
  subTotal,
  OriginalAmount,
  promotionApplied,
  redeemptionApplied = null
) {
  if (promotionApplied === "Yes") {
    return subTotal;
  } else if (redeemptionApplied === "Yes") {
    return subTotal;
  } else {
    return OriginalAmount;
  }
};

/* get subtotal value  */
export const getDeliveryCharge = function(
  promotionApplied,
  deliveryEnabled,
  OriginalAmount,
  isFreeDelivery = null
) {
  if (
    (promotionApplied === "Yes" && deliveryEnabled === "Yes") ||
    isFreeDelivery === "Yes"
  ) {
    return 0;
  } else {
    return OriginalAmount;
  }
};

/* sample funtion */
export const showPriceValue = function(price) {
  price = price !== "" ? parseFloat(price) : 0.0;
  var priceTxt = "$ " + price.toFixed(2);
  return priceTxt;
};

/* sample funtion */
export const getGstValue = function(gst, subtotal, format) {
  gst = parseFloat(gst);
  subtotal = parseFloat(subtotal);
  var gstResult = 0;

  if (gst > 0) {
    gstResult = (gst / 100) * subtotal;
  }

  if (format === "format") {
    return gstResult.toFixed(2);
  } else {
    return gstResult;
  }
};

/* GST Reverse Calculation funtion */
export const getReverseGST = function(total) {
  var vatDivisor = 1 + 7 / 100;
  var gstpercentage = 7 / 100;
  var productvalue = total / vatDivisor;
  var gst = productvalue * gstpercentage;
  return "GST Inclusive (7%): $" + gst.toFixed(2);
};

/* time conversion  */
export const timeToConv12 = function(time24) {
  var ts = time24;
  if (ts !== "" && typeof ts !== "undefined") {
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
  }
  return ts;
};

/* Date conversion  */
export const getOrderDateTime = function(dateTxt, TatTxt) {
  var dateStr = new Date();
  var TatTxtVl =
    TatTxt !== "" && typeof TatTxt !== "undefined" ? parseInt(TatTxt) : 0;
  if (dateTxt !== "" && typeof dateTxt !== "undefined") {
    dateStr = dateTxt;
  } else {
    var CurrentDate = new Date();
    CurrentDate.setMinutes(CurrentDate.getMinutes() + TatTxtVl);
    dateStr = CurrentDate;
  }

  return dateStr;
};

/* Date conversion  */
export const dateConvFun = function(dateTxt, type) {
  var dateStr = dateTxt;
  if (dateStr !== "" && typeof dateStr !== "undefined") {
    var newDateTxtone = dateTxt.replace(/-/g, "/");
    var todayTime = new Date(newDateTxtone);
    var month = todayTime.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var day = todayTime.getDate();
    day = day > 9 ? day : "0" + day;
    var year = todayTime.getFullYear();

    if (type === 1) {
      dateStr = day + "/" + month + "/" + year;
    } else if (type === 2) {
      dateStr = day + "-" + month + "-" + year;
    }
  }

  return dateStr;
};

/* Date conversion  */
export const getTimeFrmDate = function(timeTxt, type) {
  var timeStr = timeTxt;
  if (timeStr !== "" && typeof timeStr !== "undefined") {
    var newtimeStr = timeStr.replace(/-/g, "/");
    var todayTime = new Date(newtimeStr);
    var hours = todayTime.getHours();
    var minut = todayTime.getMinutes();

    hours = parseInt(hours) < 10 ? "0" + hours : hours;
    minut = parseInt(minut) < 10 ? "0" + minut : minut;

    if (type === 1) {
      timeStr = hours + " : " + minut;
    } else if (type === 2) {
      timeStr = hours + ":" + minut;
      timeStr = timeToConv12(timeStr);
    }
  }

  return timeStr;
};

/* Date conversion  */
export const getCurrentDateTm = function() {
  var dateTimeStr = "";
  var todayTime = new Date();

  var month = todayTime.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  var day = todayTime.getDate();
  day = day > 9 ? day : "0" + day;
  var year = todayTime.getFullYear();

  var hours = todayTime.getHours();
  var minut = todayTime.getMinutes();
  var second = todayTime.getSeconds();

  hours = parseInt(hours) < 10 ? "0" + hours : hours;
  minut = parseInt(minut) < 10 ? "0" + minut : minut;
  second = parseInt(minut) < 10 ? "0" + second : second;

  dateTimeStr =
    year + "-" + month + "-" + day + " " + hours + ":" + minut + ":" + second;

  return dateTimeStr;
};

/* sample funtion */
export const showCartLst = function() {
  setTimeout(function() {
    $(".hcart_dropdown").toggleClass("open");
    $(".hcartdd_trigger").toggleClass("active");
  }, 1000);
};

/* sample funtion */
export const getAliasName = function(alias, productName) {
  return alias !== "" ? alias : productName;
};

export const TransData = function(trans_startdate) {
  if (trans_startdate !== "") {
    var date = new Date(trans_startdate);
    var month = date.toLocaleString("default", { month: "short" });
    return date.getDate() + " " + month + " " + date.getFullYear();
  }
};

export const DisplayStatus = function(status) {
  if (status !== "") {
    let result = "";
    if (status === "P") {
      result = "Pending";
    } else if (status === "O") {
      result = "Ongoing";
    }
    if (status === "CO") {
      result = "Completed";
    }
    return result;
  }
};

export const DisplayGender = function(gender) {
  if (gender !== "") {
    let result = "";
    if (gender === "M") {
      result = "Male";
    } else if (gender === "F") {
      result = "Female";
    } else {
      result = "No preference";
    }
    return result;
  } else {
    return "N/A";
  }
};

export const CurrencyIconFormat = function(amount) {
  if (amount !== "" && amount !== null && amount !== undefined) {
    return (
      <span className="amount-nw">
        <sup>
          S<i className="fa fa-usd" aria-hidden="true"></i>
        </sup>{" "}
        <span>{amount}</span>
      </span>
    );
  } else {
    return '';
  }
};

export const LoadImage = function(Image, type) {
  let result;
  if (type === "profile") {
    result = proAvartar;
  }if(type === "avatar"){
    result = UserAvatar;
  }if(type === "profilelist"){
    result = profilelist;
  }else {
    result = NoImage;
  }
  if (Image !== "" && Image !== null) {
    if (type === "profile") {
      result = profileImage + Image;
    } else if (type === "service") {
      result = serviceImage + Image;
    } else if (type === "category") {
      result = serviceCategory + Image;
    }
  }

  return result;
};

export const isNumber = function(e) {
  const re = /[0-9. ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export const emailValidate = function(eamilID) {
  if (eamilID !== "") {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
    if (eamilID !== "" && !re.test(eamilID)) return false;
    else return true;
  } else {
    return false;
  }
};

export const CalculatePercentage = function(fromNo, toNo) {
  var perc = "";
  if (isNaN(fromNo) || isNaN(toNo)) {
    perc = " ";
  } else {
    perc = Math.round((toNo / fromNo) * 100);
  }
  return perc;
};

export const TimeDifference = function(date) {
  if (date !== "" && date !== null) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date() - new Date(date);
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }
};
export const scrollToTopValidate = function() {
  if ($(".errorspan").length > 0) {
    $("html, body").animate(
      {
        scrollTop: $(".errorspan").offset().top - 190
      },
      500
    );
  }
};
export const scrollToTop = function() {
  $("html, body").animate(
    {
      scrollTop: $("body").offset().top - 150
    },
    1000
  );
};

export const ClosePopup = function() {
  $(".genie-close-btn")
    .parents(".genie-msg-popup-wrapper")
    .removeClass("genie-popup-open");
  $(".genie-msg-popup-wrapper")
    .parents("body")
    .removeClass("genie-popup-shade");
};

export const removePopup = function() {
  $(document).click(function(e) {
    if (!$(e.target).is(".genie-msg-popup-wrapper, .genie-popup-open * ")) {
      if ($(".genie-msg-popup-wrapper").is(":visible")) {
        $(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
        $(".genie-msg-popup-wrapper")
          .parents("body")
          .removeClass("genie-popup-shade");
      }
    }
  });
};
export const CheckAuth = function() {
  if (!cookie.load("UserAuthToken")) {
    window.location.href = "/login";
  }
};

export const getAge = function(d1, d2) {
  if (d1 !== "" && d1 !== "0000-00-00") {
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  } else {
    return "N/A";
  }
};

export const LoadingSec = <div className="loading loading-h-200"></div>;

export const RunProfileTab = type => (
  <ul className="sdhmenu_tablist">
    <li>
      <Link to={"/edit-gen-run"} title="GenRun Details">
        Details
      </Link>
    </li>
    <li>
      <Link to={"/genrun-my-services"} title="My Services">
        My Services
      </Link>
    </li>
    <li className="active">
      <Link to={"/genrun-customerleads"} title="Customer Leads">
        Customer Leads
      </Link>
    </li>
  </ul>
);

export const getExpirydate = function(enddate) {
  const dt1 = new Date();
  const dt2 = new Date(enddate);

  const difdate = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
  if (difdate < 0) {
    return 1;
  } else {
    return 0;
  }
};

export const loadImage = function(Url) {
  if (Url !== "") {
    return Url;
  } else {
    
  }
};

export const currencyIcon = function() {
  return <i className="fa fa-usd" aria-hidden="true"></i>;
};

export const Ratings = function(number) {
  if (number === "") {
    number = 0;
  }
  let ratings = "";
  for (let i = 1; i <= 5; i++) {
    ratings += '<i class="fa ';
    if (i <= number) {
      ratings += "fa-star";
    } else {
      /*if((parseInt(i)+1)<=number) {

		}*/
      ratings += "fa-star-o";
    }

    ratings += '" aria-hidden="true"></i>';
  }
  return (
    <div>
      <span className="Grr_star">{Parser(ratings)}</span>
      <span className="Grr_point">{number}/5</span>
    </div>
  );
};

export const Capitalize = function(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const PageTitle = function(title) {
  let PageTitle = "";
  if (title !== "") {
    PageTitle += title + " | ";
  }
  PageTitle += lang.common.title;
  return PageTitle;
};

export const DayCalc = function(date, enddate) {
  if (date !== "") {
    var a = moment(new Date(), "D/M/YYYY");
    if (enddate !== "" && typeof enddate !== "undefined") {
      a = moment(enddate, "D/M/YYYY");
    }

    var b = moment(date, "D/M/YYYY");
    let diffDays = b.diff(a, "days");
    return diffDays;
  }
};
export const Encrypt = function(Value, type) {
  if (Value !== "") {
    if (type === "e") {
      return base64.encode(Value);
    } else if (type === "d") {
      return base64.decode(Value);
    }
  }
};
export const chartDate = function(cdate) {
  if (cdate !== "") {
    var cdate1 = new Date(cdate);
    var monthNames = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    };

    var splitDate = cdate.split("-");
    var day = cdate1.getDate();
    var monthIndex = splitDate[1];
    var year = cdate1.getFullYear();
    return day + " " + monthNames[monthIndex] + " " + year;
  }
};

export const formatAMPM = function(cdate) {
  /* var date = new Date(cdate); */
  /*  var hours1 = date.getHours(); */
  var splittime = cdate.split("-");

  var splittime1 = splittime[2].split(" ");
  var splittime3 = splittime1[1].split(":");
  var minutes = splittime3[1];
  var hours = splittime3[0];
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
