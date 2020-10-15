import 'react-app-polyfill/ie9';
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { getStore } from "./store";

import Home from "./components/Home/Home";
import Style from "./components/Home/Style";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";

/* Gen Users Pages */
import Editgeneralinfo from "./components/Account/GenUser/Index";

/* Gen Run Pages */
import Editgenrun from "./components/Account/GenRun/Index";
import Genrunservices from "./components/Account/GenRun/Services";
import Genruncustomerleads from "./components/Account/GenRun/Leads";
import Genruncustomerleadsdetail from "./components/Account/GenRun/LeadDetail";

/* Gen Pro Pages */
import ProHome from "./components/Genpro/Index";
import ProSearchService from "./components/Genpro/Search";
import ProSearchList from "./components/Genpro/SearchList";
import ProCompare from "./components/Genpro/Compare";
import ServiceDetail from "./components/Genpro/ServiceDetail";
import Editgenpro from "./components/Account/GenPro/Index";
import Genproservices from "./components/Account/GenPro/Services";
import Genprocustomerleads from "./components/Account/GenPro/Leads";
import Genprojobs from "./components/Account/GenPro/Jobs";
import Genproservicesquestion from "./components/Account/GenPro/ServicesQuestion";

import ProJobDetail from "./components/Genpro/ProJobDetail";

import Editgenagent from "./components/Account/Editgenagent";
import Genagentjobs from "./components/Account/Genagentjobs";
import Otp from "./components/Account/Otp";
import Changepassword from "./components/Account/Changepassword";
import Setpassword from "./components/Account/Setpassword";
import Forgetpassword from "./components/Account/Forgetpassword";
import Logout from "./components/Layout/Logout";
import Buypoints from "./components/Buypoints/Buypoints";
import Thankyou from "./components/Buypoints/Thankyou";

import Genagentcustomerleads from "./components/Account/Genagentcustomerleads";
import Wallet from "./components/Account/Wallet";
import Reviews from "./components/Account/Reviews";
import Dashboard from "./components/Dashboard/Dashboard";
import Prodashboard from "./components/Dashboard/Prodashboard";
import Rundashboard from "./components/Dashboard/Rundashboard";
import Agentdashboard from "./components/Dashboard/Agentdashboard";
import GenagentManageProperty from "./components/Account/GenagentManageProperty";
import GenagentReports from "./components/Account/GenagentReports";
import Notification from "./components/Account/Notification";
import Addpoints from "./components/Buypoints/Addpoints";
import CustomerHome from "./components/Customer/Run";
import SearchService from "./components/Customer/SearchService";
import SearchList from "./components/Customer/SearchList";
//import Pages from './components/Pages/Pages';
import AboutUs from "./components/Pages/Aboutus";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import TermsCondtions from "./components/Pages/TermsCondtions";
import ContactUs from "./components/Pages/ContactUs";
import Career from "./components/Pages/Career";
import Articles from "./components/Pages/Articles";
import ArticlesDetail from "./components/Pages/ArticlesDetail";
import ProDetail from "./components/Pages/ProDetail";
import Genruntranscation from "./components/Customer/Genruntranscation";
import RuntransDetail from "./components/Customer/RuntransDetail";
import GenMessage from "./components/Customer/GenMessage";
import GenFollowing from "./components/Account/GenFollowing";
import GenFollowers from "./components/Customer/GenFollowers";

/* import css files */
import "./common/css/anicollection.min.css";
import "./common/css/font-awesome.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./common/css/style.css";
import "./common/css/style1.css";
import "./common/css/style2.css";
import "./common/css/genrun-style.css";
import "./common/css/genpro-style.css";
import "./common/css/responsive.css";
import "./common/css/genrun-responsive.css";
import "./common/css/genpro-responsive.css";

/* Imoport Js files */
import "./common/js/custom.js";

const store = getStore();
render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/style" component={Style} />
        <Route path="/otp" component={Otp} />
        <Route path="/changepassword" component={Changepassword} />
        <Route path="/forgot-password" component={Forgetpassword} />
        <Route path="/edit-general-info" component={Editgeneralinfo} />
        <Route path="/edit-gen-pro" component={Editgenpro} />
        <Route path="/edit-gen-run" component={Editgenrun} />
        <Route path="/edit-gen-agent" component={Editgenagent} />
        <Route path="/genpro-my-services" component={Genproservices} />
        <Route path="/genpro-customer-leads" component={Genprocustomerleads} />
        <Route path="/genpro-jobs" component={Genprojobs} />
        <Route
          path="/genpro-services-question"
          component={Genproservicesquestion}
        />
        <Route path="/genagent-jobs" component={Genagentjobs} />
        <Route path="/Setpassword" component={Setpassword} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/buy-points" component={Buypoints} />
        <Route path="/thank-you" component={Thankyou} />
        <Route path="/genrun-my-services" component={Genrunservices} />
        <Route
          path="/genrun-customer-leads-detail/:TransID"
          component={Genruncustomerleadsdetail}
        />
        <Route
          path="/genrun-customer-leads-detail"
          component={Genruncustomerleadsdetail}
        />
        <Route path="/genrun-customerleads" component={Genruncustomerleads} />
        <Route
          path="/genagent-customer-leads"
          component={Genagentcustomerleads}
        />
        <Route path="/wallet" component={Wallet} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/genpro-dashboard" component={Prodashboard} />
        <Route path="/genrun-dashboard" component={Rundashboard} />
        <Route path="/genagent-dashboard" component={Agentdashboard} />
        <Route
          path="/genagent-manage-property"
          component={GenagentManageProperty}
        />
        <Route path="/genagent-reports" component={GenagentReports} />
        <Route path="/Notification" component={Notification} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-conditions" component={TermsCondtions} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/career" component={Career} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles-detail" component={ArticlesDetail} />
        <Route path="/pro-detail" component={ProDetail} />
        <Route path="/genrun" component={CustomerHome} />
        <Route
          path="/customer/genrun/service/:ServiceID"
          component={SearchService}
        />
        <Route path="/customer/search_list" component={SearchList} />
        <Route
          path="/customer/genruntranscation-list"
          component={Genruntranscation}
        />
        <Route path="/customer/runtrans-details" component={RuntransDetail} />
        <Route path="/genpro" component={ProHome} />
        <Route
          path="/customer/pro-service/:ServiceID"
          component={ProSearchService}
        />
        <Route
          path="/customer/pro-search-list:ProId"
          component={ProSearchList}
        />
        <Route path="/customer/pro-search-list" component={ProSearchList} />
        <Route
          path="/customer/pro-service-detail/:ProId/:RefId"
          component={ServiceDetail}
        />
        <Route path="/customer/pro-compare" component={ProCompare} />
        <Route
          path="/pro-complete-job-detail/:RefId/:ProId"
          component={ProJobDetail}
        />
        <Route
          path="/pro-nolonger-job-detail/:RefId/:vendorId"
          component={ProJobDetail}
        />

        <Route path="/pro-job-detail/:RefId" component={ProJobDetail} />

        <Route path="/message/:MessageID" component={GenMessage} />
        <Route path="/following" component={GenFollowing} />
        <Route path="/followers" component={GenFollowers} />
        <Route path="/:UserID" component={Addpoints} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
