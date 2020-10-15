import { all } from "redux-saga/effects";

import { watchGetLoginData } from "./login";
import { watchGetIpData } from "./ip";
import { watchGetRegistration } from "./registration";
import { watchGetResendotpData } from "./resendotp";
import { watchGetOtpData } from "./otp";
import { watchGetSetPassword } from "./setpassword";
import { watchGetForgetPassword } from "./forgetpassword";
import { watchGetChangePassword } from "./changepassword";
import { watchGetUnsetToken } from "./login";
import {
  watchGetGeneralProfile,
  watchGetImageProfile,
  watchGetGenrunProfile,
  watchGetRequestService,
  watchGetSelectrunservice,
  watchGetGenproProfile,
  watchGetEnableType,
  watchGetProUserDetails,
  watchGetProServiceUpdate,
  watchGetUserProfile,
  watchGetPostalAddress,
  watchGetRunUserDetails,
  watchGetRunServiceUpdate,
  watchGetMobileUpdate,
  watchGetChangeMobile,
  watchGetRunServiceAction
} from "./profileupdate";
import { watchGetUserwalletInfo } from "./userwalletinfo";
/* karthick */

import { watchGetTopupPlan, watchGetShareAddpoint } from "./buypoints";
import {
  watchGetApplyPromotion,
  watchGetSubmitPointsystem,
  watchGetTransactiondetails
} from "./applypromotion";
import { watchGetStriponToken } from "./stripontoken";
import { watchGetTopupPoints } from "./topuppoints";
import { watchGetCaptureAmount } from "./captureamount";
import {
  watchGetCustomerLeads,
  watchGetJobconfirmRequest,
  watchGetProJobs,
  watchGetLeadJobs,
  watchGetSaveQuotation,
  watchGetRunCustomerleads,
  watchGetRunDetailCustomerleads
} from "./customerleads";
import { watchGetQuotation } from "./quotation";
import { watchGetChangeJobStatus } from "./changejobstatus";
import { watchGetWriteProReview } from "./writeproreview";
import {
  watchGetStaticblockContent,
  watchGetHomeblockContent,
  watchGetSiteSettings,
  watchGetCmsPage
} from "./staticblock";
import {
  watchGetSubscriptiondata,
  watchGetServiceSubscription,
  watchGetUpdateSubscription
} from "./subscription";
import { watchGetGeneralDashboard, watchGetProDashboard } from "./dashboard";
import {
  watchGetAllNotification,
  watchGetDeleteNotification,
  watchGetReadNotify,
  watchGetHeaderNotification
} from "./notification";

import { watchGetTransfer } from "./transfer";
import { watchGetDistrict } from "./district";

import { watchGetCreateCounter } from "./createcounter";
import { watchGetCounterList } from "./counterlist";
import { watchGetAcceptCounter } from "./acceptcounter";
import {
  watchGetRunSearchList,
  watchGetRunTransaction,
  watchGetServices,
  watchGetPreTransaction,
  watchGetContactus,
  watchGetSubtitle
} from "./customer";
import {
  watchGetAsktocall,
  watchGetCallRequest,
  watchGetAvailTransaction
} from "./asktocall";

import { watchGetCustomerTrans } from "./customertrans";
import { watchGetCustomerTransDetails } from "./customertransdetails";
import { watchGetCreateReview } from "./createreview";
import { watchGetReview } from "./review";
import { watchGetMobileCountry } from "./mobilecountry";
import { watchGetPoints } from "./points";
import { watchGetCareers,watchGetJobApplied } from "./career";
import { watchGetCategories } from "./categories";
import { watchGetProServices, watchGetAllProServices } from "./proservices";
import { watchGetQuestions } from "./questions";
import { watchGetSearchGenPro } from "./searchgenpro";
import { watchGetCompareList } from "./compareList";
import { watchGetProServicesDetails } from "./proservicesdetails";
import { watchGetProServicesDetailsList } from "./proservicesdetailslist";
import { watchGetProContact } from "./procontact";
import { watchGetProQuestions } from "./proquestions";
import { watchGetProUpdateQuestions } from "./proupdatequestion";
import { watchGetGenMessage } from "./genmessage";
import { watchGetCreateMessage } from "./createmessage";
import { watchGetFollows,watchGetAllCounties } from "./follows";
import { watchGetCreateFollows } from "./createfollows";
import { watchGetSendMessage } from "./sendmessage";
import { watchGetGenproCallRequest } from "./searchgenpro";

export default function*() {
  yield all([
    watchGetLoginData(),
    watchGetIpData(),
    watchGetRegistration(),
    watchGetResendotpData(),
    watchGetOtpData(),
    watchGetSetPassword(),
    watchGetForgetPassword(),
    watchGetChangePassword(),
    watchGetUnsetToken(),
    watchGetGeneralProfile(),
    watchGetImageProfile(),
    watchGetGenrunProfile(),
    watchGetRequestService(),
    watchGetSelectrunservice(),
    watchGetGenproProfile(),
    watchGetEnableType(),
    watchGetProUserDetails(),
    watchGetRunUserDetails(),
    watchGetProServiceUpdate(),
    watchGetUserProfile(),
    watchGetTopupPlan(),
    watchGetApplyPromotion(),
    watchGetStriponToken(),
    watchGetTopupPoints(),
    watchGetCaptureAmount(),
    watchGetSubmitPointsystem(),
    watchGetTransactiondetails(),
    watchGetUserwalletInfo(),
    watchGetPostalAddress(),
    watchGetCustomerLeads(),
    watchGetStaticblockContent(),
    watchGetHomeblockContent(),
    watchGetSiteSettings(),
    watchGetJobconfirmRequest(),
    watchGetProJobs(),
    watchGetRunServiceUpdate(),
    watchGetSubscriptiondata(),
    watchGetServiceSubscription(),
    watchGetUpdateSubscription(),
    watchGetLeadJobs(),
    watchGetMobileUpdate(),
    watchGetChangeMobile(),
    watchGetSaveQuotation(),
    watchGetQuotation(),
    watchGetGeneralDashboard(),
    watchGetProDashboard(),
    watchGetRunCustomerleads(),
    watchGetRunDetailCustomerleads(),
    watchGetRunServiceAction(),
    watchGetAllNotification(),
    watchGetDeleteNotification(),
    watchGetShareAddpoint(),
    watchGetCmsPage(),
    watchGetTransfer(),
    watchGetDistrict(),
    watchGetCreateCounter(),
    watchGetCounterList(),
    watchGetAcceptCounter(),
    watchGetRunSearchList(),
    watchGetAsktocall(),
    watchGetCallRequest(),
    watchGetAvailTransaction(),
    watchGetRunTransaction(),
    watchGetServices(),
    watchGetPreTransaction(),
    watchGetCustomerTrans(),
    watchGetCustomerTransDetails(),
    watchGetCreateReview(),
    watchGetReview(),
    watchGetMobileCountry(),
    watchGetPoints(),
    watchGetContactus(),
    watchGetCareers(),
    watchGetSubtitle(),
    watchGetCategories(),
    watchGetProServices(),
    watchGetQuestions(),
    watchGetSearchGenPro(),
    watchGetCompareList(),
    watchGetProServicesDetails(),
    watchGetProContact(),
    watchGetProQuestions(),
    watchGetProUpdateQuestions(),
    watchGetGenMessage(),
    watchGetCreateMessage(),
    watchGetFollows(),
    watchGetCreateFollows(),
    watchGetSendMessage(),
    watchGetReadNotify(),
    watchGetHeaderNotification(),
    watchGetProServicesDetailsList(),
    watchGetChangeJobStatus(),
    watchGetWriteProReview(),
    watchGetGenproCallRequest(),
    watchGetAllProServices(),
    watchGetJobApplied(),
    watchGetAllCounties()
  ]);
}
