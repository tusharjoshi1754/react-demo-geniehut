import login from "./login";
import ip from "./ip";
import registration from "./registration";
import resendotp from "./resendotp";
import otp from "./otp";
import setpassword from "./setpassword";
import forgetpassword from "./forgetpassword";
import changepassword from "./changepassword";
import unsettoken from "./unsettoken";
import generalprofile from "./generalprofile";
import imageprofile from "./imageprofile";
import genrunprofile from "./genrunprofile";
import service from "./service";
import selectrunservice from "./selectrunservice";
import genproprofile from "./genproprofile";
import enabletype from "./enabletype";
import updateprodetails from "./updateprodetails";
import updaterundetails from "./updaterundetails";
import updateproservices from "./updateproservices";
import userprofile from "./userprofile";
import userwalletinfo from "./userwalletinfo";
import postaladdress from "./postaladdress";
import updaterunservices from "./updaterunservices";
import subscriptiondata from "./subscriptiondata";
import subscriptionservice from "./subscriptionservice";
import updatesubscription from "./updatesubscription";
import mobileupdate from "./mobileupdate";
import changemobile from "./changemobile";
import savequotation from "./savequotation";
import quotation from "./quotation";
import prodashboard from "./prodashboard";
import generaldashboard from "./generaldashboard";
import notification from "./notification";
import deletenotify from "./deletenotify";
import cmspage from "./cmspage";

/* karthick */

import buypoints from "./buypoints";
import applypromotion from "./applypromotion";
import stripontoken from "./stripontoken";
import topuppoints from "./topuppoints";
import captureamount from "./captureamount";
import submitsystempoints from "./submitsystempoints";
import transactiondetails from "./transactiondetails";
import customerleads from "./customerleads";
import staticblocks from "./staticblocks";
import homestaticblocks from "./homestaticblocks";
import sitesettings from "./sitesettings";
import jobconfirmrequest from "./jobconfirmrequest";
import projobs from "./projobs";
import leadinfo from "./leadinfo";
import runcustomerleads from "./runcustomerleads";
import rundetailcustomerleads from "./rundetailcustomerleads";
import runserviceaction from "./runserviceaction";
import shareaddpoints from "./shareaddpoints";
/* wallet transfer */
import transfer from "./transfer";
import district from "./district";

/* genrun and customer call API */
import createcounter from "./createcounter";
import counterlist from "./counterlist";
import acceptcounter from "./acceptcounter";
import runsearchlist from "./runsearchlist";
import asktocall from "./asktocall";
import callrequest from "./callrequest";
import runtransaction from "./runtransaction";
import services from "./services";
import pretransaction from "./pretransaction";

import customertrans from "./customertrans";
import customertransdetails from "./customertransdetails";

import availtransaction from "./availtransaction";
import createreview from "./createreview";
import review from "./review";
import mobilecountry from "./mobilecountry";
import points from "./points";
import contactus from "./contactus";
import careers from "./careers";
import subtitle from "./subtitle";

import categories from "./categories";
import proservices from "./proservices";
import questions from "./questions";
import searchgenpro from "./searchgenpro";
import compareList from "./compareList";
import proservicesdetails from "./proservicesdetails";
import proservicesdetailslist from "./proservicesdetailslist";
import procontact from "./procontact";
import proquestions from "./proquestions";
import proupdatequestion from "./proupdatequestion";
import genmessage from "./genmessage";
import createmessage from "./createmessage";
import follows from "./follows";
import createfollows from "./createfollows";
import sendmessage from "./sendmessage";
import readnotify from "./readnotify";
import headernotification from "./headernotification";
import changejobstatus from "./changejobstatus";
import proreview from "./proreview";
import genprocallrequest from "./genprocallrequest";
import proallservices from "./proallservices";
import jobapplied from "./jobapplied";
import allcountries from './allcountries';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login: login,
  ip: ip,
  registration: registration,
  resendotp: resendotp,
  otp: otp,
  setpassword: setpassword,
  forgetpassword: forgetpassword,
  changepassword: changepassword,
  unsettoken: unsettoken,
  generalprofile: generalprofile,
  imageprofile: imageprofile,
  genrunprofile: genrunprofile,
  service: service,
  selectrunservice: selectrunservice,
  genproprofile: genproprofile,
  enabletype: enabletype,
  updateprodetails: updateprodetails,
  updateproservices: updateproservices,
  userprofile: userprofile,
  buypoints: buypoints,
  applypromotion: applypromotion,
  stripontoken: stripontoken,
  topuppoints: topuppoints,
  captureamount: captureamount,
  submitsystempoints: submitsystempoints,
  transactiondetails: transactiondetails,
  userwalletinfo: userwalletinfo,
  postaladdress: postaladdress,
  customerleads: customerleads,
  staticblocks: staticblocks,
  homestaticblocks: homestaticblocks,
  sitesettings: sitesettings,
  jobconfirmrequest: jobconfirmrequest,
  projobs: projobs,
  updaterundetails: updaterundetails,
  updaterunservices: updaterunservices,
  subscriptiondata: subscriptiondata,
  subscriptionservice: subscriptionservice,
  updatesubscription: updatesubscription,
  leadinfo: leadinfo,
  mobileupdate: mobileupdate,
  changemobile: changemobile,
  savequotation: savequotation,
  quotation: quotation,
  prodashboard: prodashboard,
  generaldashboard: generaldashboard,
  runcustomerleads: runcustomerleads,
  rundetailcustomerleads: rundetailcustomerleads,
  runserviceaction: runserviceaction,
  notification: notification,
  deletenotify: deletenotify,
  shareaddpoints: shareaddpoints,
  cmspage: cmspage,
  transfer: transfer,
  district: district,
  createcounterdata: createcounter,
  counterListData: counterlist,
  acceptcounterdata: acceptcounter,
  runsearchlist: runsearchlist,
  asktocall: asktocall,
  callrequest: callrequest,
  runtransaction: runtransaction,
  services: services,
  pretransaction: pretransaction,
  customertrans: customertrans,
  customertransdetails: customertransdetails,
  createreview: createreview,
  review: review,
  availtransaction: availtransaction,
  mobilecountry: mobilecountry,
  points: points,
  contactus: contactus,
  careers: careers,
  subtitle: subtitle,
  categories: categories,
  proservices: proservices,
  questions: questions,
  searchgenpro: searchgenpro,
  compareList: compareList,
  proservicesdetails: proservicesdetails,
  procontact: procontact,
  proquestions: proquestions,
  proupdatequestion: proupdatequestion,
  genmessage: genmessage,
  createmessage: createmessage,
  follows: follows,
  createfollows: createfollows,
  sendmessage: sendmessage,
  readnotify: readnotify,
  headernotification: headernotification,
  proservicesdetailslist: proservicesdetailslist,
  changejobstatus: changejobstatus,
  proreview: proreview,
  genprocallrequest: genprocallrequest,
  proallservices: proallservices,
  jobapplied: jobapplied,
  allcountries:allcountries
});

export default rootReducer;
