import React, { Component } from 'react';


class HowGenWorks extends Component {

  render() {
    return (
       <div>
        <div className="HowGenWorks_wrap">
            <div className="GenPopup_List_wrap GenPopup_bb-1">
               <div className="GenPopup_List_title">We connect users and service providers directly on our one-stop website.</div>
               <ul className="GenPopup_List">
                   <li>Use the search engines to get the right services from the other community users.</li>
                   <li>Earn GH points and uses it to maximize the connectivity with the right service providers / community users or redeem free gifts/ cashback.</li>
                   <li>Contact the service providers/ community users offline to negotiate on the price and payment for the services. </li>
               </ul>
            </div>
            <div className="GenPopup_List_wrap GenPopup_bb-1">
               <div className="GenPopup_List_title">Geniehut’s web services</div>
               <ul className="GenPopup_List">
                   <li><b>GenPro:</b> Easy comparison for different professional service provider</li>
                   <li><b>GenRun:</b> Get a part timer to run errand for you</li>
                   <li><b>GenProperty:</b> Use a property search engine for greater reach to different property search website</li>
                   <li><b>GenAds:</b> Exchange GH points with other community users</li>
               </ul>
            </div>
        </div>
       </div>
    );
  }
}

export default HowGenWorks;
