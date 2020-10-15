/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { GET_CMSPAGE } from '../../actions';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import $ from 'jquery';
import AboutusImg from '../../common/images/ManageProp_img.jpeg';
import BannerImg from '../../common/images/ban-about.jpg';
var Parser = require('html-react-parser');
import { PageTitle } from "../Helpers/SettingHelper";;

class TermsCondtion extends Component {
constructor(props) {
    super(props);
    this.state = {
      cmspage:''
      }
    this.props.getCmsPage('terms-conditions');
  }

  componentDidMount(){
    document.title = PageTitle('Terms Conditions');
  }
  componentWillReceiveProps(Props) {
     if(Props.cmspage!== this.props.cmspage){
      if(Props.cmspage[0].result_set !== 'undefined' && Props.cmspage[0].result_set !== null)
        if(Props.cmspage[0].status === 'ok'){
          this.setState({cmspage : Props.cmspage[0].result_set[0]})
        }
  }
}

render() {
  {/*   let Termscondition =this.state.cmspage.cms_content;*/}
    return (
    
        <div>
            <Header />
            <div className="cms-page-banner">
                 <div className="cms-innerpage-banner">
                      <img src={BannerImg} alt=""/>
                      <div className="cms-banner-caption">
                        <div className="container">
                              <h1>Terms Conditions</h1>
                        </div>
                      </div>
                 </div>
            </div>
            <div className="wrapper_out pptc_wrapper_out">
                <div className="container">
                  <div className="pptc-wrapper">
                     <h2>Terms Conditions</h2>
                     <div className="terms-conditions-content">
                      <h3>Section A – General Terms</h3>                      
                      <h4>1. Introduction</h4>
                      <p>1.1. Please read these Terms of Use carefully. By using the Service (as defined below), you agree that you have read and understood the terms in these Terms of Use which are applicable to you. These Terms of Use and the Geniehut Policies (as defined below) constitute a legally binding agreement (“Agreement”) between you and Geniehut (as defined below). The Agreement applies to your use of the Service provided by Geniehut. If you do not agree to the Terms of Use please do not use or continue using the Application (as defined below) or the Service.</p>
                      <p>1.2. Geniehut may amend the terms in the Agreement at any time. Such amendments shall be effective once they are posted on  <a href="https://www.geniehut.com" target="_blank">https://www.geniehut.com</a>  or the Application. It is your responsibility to review the Terms of Use and Geniehut Policies regularly. Your continued use of the Service after any such amendments, whether or not reviewed by you, shall constitute your agreement to be bound by such amendments.</p>
                      <p>1.3. If you use the Service in a country other than the country where you registered for the Application (the “Alternate Country“), you must regularly review the Terms of Service applicable in the Alternate Country which can be found at  <a href="https://www.geniehut.com" target="_blank">https://www.geniehut.com</a> as it may differ from the country where you registered for the Application. By using the Service in the Alternate Country, you agree to be bound by prevailing Terms of Use in the Alternate Country.</p>
                      <p>1.4. GENIEHUT IS A <b>TECHNOLOGY COMPANY</b> WHICH PROVIDES A PLATFORM FOR USERS TO OBTAIN OR PROCURE SERVICES. DEPENDING ON THE SERVICE IN QUESTION, THE SERVICES MAY BE SUPPLIED BY GENIEHUT OR A THIRD PARTY PROVIDER. WHERE THE SERVICE IS PROVIDED BY A THIRD PARTY PROVIDER, GENIEHUT’S ROLE IS MERELY TO LINK THE USER WITH SUCH THIRD PARTY PROVIDER. GENIEHUT IS NOT RESPONSIBLE FOR THE ACTS AND/OR OMISSIONS OF ANY THIRD PARTY PROVIDER, AND ANY LIABILITY IN RELATION TO SUCH SERVICES SHALL BE BORNE BY THE THIRD PARTY PROVIDER. THIRD PARTY PROVIDERS SHALL NOT REPRESENT TO BE AN AGENT, EMPLOYEE OR STAFF OF GENIEHUT AND THE SOLUTIONS PROVIDED BY THIRD PARTY PROVIDERS SHALL NOT BE DEEMED TO BE PROVIDED BY GENIEHUT.</p>
                      <h4>2. Definitions</h4>
                      <p>In these Terms of Use, the following words shall have the meanings ascribed below:</p>
                      <p>2.1. “<b>Application</b>” means the relevant mobile application(s) made available for download by Geniehut (or its licensors) to Users and Third Party Providers respectively;</p>
                      <p>2.2. “<b>Geniehut</b>” means:</p>
                      <p>2.2.1. Geniehut Pte Ltd is a company incorporated in Singapore.</p>
                      <p>2.3. “<b>Geniehut Policies</b>” means the following:</p>
                      <p>2.3.1. all other forms, policies, notices, guidelines, frequently asked questions (FAQs), in-app or website product/service descriptions and information cards, or agreements provided to or entered into by you from time to time;</p>
                      <p>2.4. “<b>Personal Data</b>” is any information which can be used to identify you or from which you are identifiable. This includes but is not limited to your name, nationality, telephone number, bank and credit card details, personal interests, email address, your image, government-issued identification numbers, biometric data, race, date of birth, marital status, religion, health information and insurance information;</p>
                      <p>2.5. “<b>Platform</b>” means the relevant Geniehut technology platform, portal or website that, when used in conjunction with the Application, enables Users to request or access Solutions;</p>
                      <p>2.6. “<b>Privacy Policy</b>” means our privacy policy accessible at: <a href="https://www.geniehut.com/privacy-policy" target="_blank">https://www.geniehut.com/privacy-policy</a> as amended from time to time;</p>
                      <p>2.7. “<b>Service</b>” means the linking of Users to Third Party Providers through the Application, Platform and/or Software;</p>
                      <p>2.8. “<b>Software</b>” means any software associated with the Application which is supplied made available for download and installation by Geniehut;</p>
                      <p>2.9. “<b>Solutions</b>” means the following services which are made available to Users through the Web Service (each a “Solution”):</p>
                      <p>2.9.1. GenPro</p>
                      <p>2.9.2. GenRun</p>
                      <p>2.9.3. GenProperty</p>
                      <p>2.9.4. GenAds</p>
                      <p>2.9.5. GenMessage</p>
                      <p>2.9.6. GenGreen</p>
                      <p>2.9.7. GenAlert</p>
                      <p>2.9.8. GenCurrency</p>
                      <p>2.9.9. Any such other services which Geniehut may make available from time to time;</p>
                      <p>2.10. “<b>Third Party Provider</b>” means the independent third parties who provide the relevant Solutions to Users through the Service, including service provider, part timers and third party merchants.</p>
                      <p>2.11. “<b>User</b>” means any person who uses the Application, Platform and/or Software to search for and obtain the Solutions; and</p>
                      <h4>3. Representations, Warranties and Undertakings</h4>
                      <p>3.1. By using the Service, you represent, warrant / undertake that:</p>
                      <p>3.1.1. You have legal capacity to enter into the Agreement and that you are at least eighteen (18) years old. You cannot enter into the Agreement if you are below eighteen (18) years old;</p>
                      <p>3.1.2. All the information which you provide shall be true and accurate;</p>
                      <p>3.1.3. You will only use the Application, Platform and Service for their intended and lawful purposes;</p>
                      <p>3.1.4. You will keep your account password or any identification we provide you which allows access to the Service secure and confidential;</p>
                      <p>3.1.5. You agree to notify us immediately of any unauthorized use of your account or any other breach of security;</p>
                      <p>3.1.6. You will not try to interrupt or harm the Service, Application and/or the Software in any way;</p>
                      <p>3.1.7. You will not attempt to commercially exploit any part of the Application without our permission, including without limitation modify any of the Application’s content in any way, or copy, reproduce, publicly display, distribute or otherwise use or communicate them for any public or commercial purpose without our permission;</p>
                      <p>3.1.8. You shall not impair or circumvent the proper operation of the network which the Service operates on;</p>
                      <p>3.1.9. You will not authorize others to use your identity or user status, and you may not assign or otherwise transfer your user account to any other person or entity;</p>
                      <p>3.1.10. You will provide us with whatever proof of identity or any other documents, permits, licenses or approvals which we may reasonably request or require;</p>
                      <p>3.1.11. You will not use the Application for sending or storing any unlawful material or for fraudulent purposes;</p>
                      <p>3.1.12. You will not use the Application and/or the Software to cause nuisance or behave in an inappropriate or disrespectful manner towards Geniehut or any third party;</p>
                      <p>3.1.13. When using the Service, you agree to comply with all laws applicable to you and/or your use of the Service;</p>
                      <p>3.1.14. You will not copy, or distribute the Software or other content without written permission from Geniehut;</p>
                      <p>3.1.15. You will provide accurate, current and complete information as required for the Service and undertake the responsibility to maintain and update your information in a timely manner to keep it accurate, current and complete at all times during the term of the Agreement. You agree that Geniehut may rely on your information as accurate, current and complete. You acknowledge that if your information is untrue, inaccurate, not current or incomplete in any respect, Geniehut has the right but not the obligation to terminate this Agreement and your use of the Service at any time with or without notice;</p>
                      <p>3.1.16. You will only use an access point or data account which you are authorized to use;</p>
                      <p>3.1.17. You agree that the Service is provided on a reasonable effort basis;</p>
                      <p>3.1.18. You agree that your use of the Service will be subject to the Geniehut Policies as may be amended from time to time;</p>
                      <p>3.1.19. You agree to assist Geniehut with any internal or external investigations as may be required by Geniehut in complying with any prevailing laws or regulations in place; and</p>
                      <p>3.1.20. You agree to assume full responsibility and liability for all loss or damage suffered by yourself, Geniehut or any other party as a result of your breach of this Agreement.</p>
                      <h4>3.2. If you are a Third Party Provider, you further represent, warrant / undertake that: </h4>
                      <p>3.2.1. If applicable, you possess a vocational license and are authorized to operate any machinery and have all the appropriate licenses, approvals and authority to provide services for hire to third parties in the jurisdiction in which you use the Service;</p>
                      <p>3.2.2. If applicable, you own, or have the legal right and authority to operate, and you have all appropriate licences and approvals in respect of, the machinery, software in use (“Tools”) which you intend to use when providing the services for hire, and such tools is in good operating condition and meets the industry safety standards for tools of its kind;</p>
                      <p>3.2.3. If applicable, you will use the appropriate safety equipment;</p>
                      <p>3.2.4. If applicable, you have a valid policy of liability insurance (in industry-standard coverage amounts) for the operation of your tools and/or business insurance to cover any anticipated losses related to the operation of a service;</p>
                      <p>3.2.5. You shall be solely responsible for any and all claims, judgments and liabilities resulting from any accident, loss or damage including, but not limited to, personal injuries, death, total loss and property damage which is due to or is alleged to be a result of the service provided by you;</p>
                      <p>3.2.6. You shall obey all local laws related to the operation of a service and will be solely responsible for any violations of such local laws;</p>
                      <p>3.2.7. You shall not contact Users for purposes other than in connection with the Service;</p>
                      <p>3.2.8. You shall not reverse look-up, trace or seek to trace any information on any other user of or visitor to the Application, or any other customer of Geniehut, including without limitation any user account not owned by you, to its source, or exploit the Application or any service or information made available or offered by or through the Application, in any way where the purpose is to reveal any information, including but shall not be limited to personal identification information, other than your own information, as provided for by the Application;</p>
                      <p>3.2.9. You are aware that when responding to Users, standard telecommunication charges may apply which shall be solely borne by you;</p>
                      <p>3.2.10. If you are required to and do sign up for an account on behalf of your employer, your employer shall be the owner of the account, and you represent and warrant that you have the authority to bind your employer to the Agreement; and</p>
                      <p>3.2.11. You agree that you are forbidden from promoting competitors’ applications, giving out coupons and suggesting any other form of discounts to the Users. <b>You are strictly forbidden to use the Service for other purposes such as but not limited to data mining of Geniehut’s information or information related to the Application or the Service.</b>  A breach hereof constitutes a grave offence and may be treated as <b>industrial espionage or sabotage</b>, and Geniehut reserves the right to take such action as may be appropriate or permitted under the law against you, and/or any person, whether natural or artificial, directing or instructing you, in the event you use the Service other than for the purpose for which it is intended to be used.</p>
                      <h4>3.3. If you are a User, you further represent, warrant / undertake that :</h4>
                      <p>3.3.1. Your use of the Service is, unless otherwise allowed by Geniehut, for your own sole, personal use or, where permitted, for the use of another person who is at least twelve (12) years old (“<b>Minor</b>”), in which case you shall assume primary responsibility of the Minor;</p>
                      <p>3.3.2. You shall not contact the Third Party Provider for purposes other than the Service;</p>
                      <p>3.3.3. You shall not intentionally or unintentionally cause or attempt to cause damage to the Third Party Provider or the Tools;</p>
                      <p>3.3.4. Where applicable, you will not create or compile, directly or indirectly, any collection, compilation or other directory from any content displayed on the Application or Platform except for your personal, non-commercial use;</p>
                      <p>3.3.5. Where applicable, you will not copy any content displayed through the Application or Platform, including any third party product content and reviews, for republication in any format or media;</p>
                      <p>3.3.6. You acknowledge and agree that only one (1) account can be registered on one device;</p>
                      <p>3.3.7. You are aware that when requesting Solutions by SMS or by using the Service, standard telecommunication charges will apply; and</p>
                      <p>3.3.8. You agree that Geniehut may, based on its sole discretion, consider an account to be dormant if there has been no transaction made by you on your user account for a period of six (6) months from the last date of transaction and deactivate or restrict access to your user account.</p>
                      <h4>4. Compatibility</h4>
                      <p>Different models or versions of routers, browsers and devices may have firmware or settings that are not compatible with the Application, Platform and/or Software. While we continuously develop the Application, Platform and Software in order to, as far as possible, support all commonly used devices and models in markets and all browsers where the Application and Platform are likely to be accessed from, we do not warrant compatibility of the Application, Platform and/or Software with specific mobile devices or other hardware.</p>
                      <h4>5. License Grant and Restrictions</h4>
                      <p>5.1. Geniehut and its licensors, where applicable, grant you a revocable, non-exclusive, non- transferable, limited license to use and access the Application and/or the Software to use the Service, subject to the terms and conditions of this Agreement. All rights not expressly granted to you are reserved by Geniehut and its licensors.</p>
                      <p>5.2. You shall not:</p>
                      <p>5.2.1. license, sublicense, sell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the Application and/or the Software in any way;</p>
                      <p>5.2.2. modify or make derivative works based on the Application and/or the Software;</p>
                      <p>5.2.3. “mirror” the Application / Software on any other server or wireless or internet-based device;</p>
                      <p>5.2.4. except to the extent such restriction is prohibited under applicable law, disassemble, decompile, reverse engineer, decrypt or attempt to derive and code or extract software from, the Application or any software or services made available on or through the Application;</p>
                      <p>5.2.5. use any manual or automated program or script, including but not limited to web spiders, web crawlers, web robots, web ants, web indexers, bots, viruses or worms, or any program which may make multiple server requests per second, (a) to unduly burden or hinder the operation and/or performance of the Application; (b) to conduct data mining or scraping activities, or (c) in any way reproduce or circumvent the navigational structure or presentation of the Application or its content;</p>
                      <p>5.2.6. post, distribute or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior consent of the owner of such proprietary rights;</p>
                      <p>5.2.7. remove any copyright, trademark or other proprietary rights notices contained on the Application or Platform; or</p>
                      <p>5.2.8. use the Application to: (a) send spam or otherwise duplicative or unsolicited messages; (b) send or store infringing, obscene, threatening, libellous, or otherwise unlawful or tortious material, including but not limited to materials harmful to children or violative of third party privacy rights; (c) send material containing software viruses, worms, trojan horses or other harmful computer code, files, scripts, agents or programs; (d) interfere with or disrupt the integrity or performance of the Application or the data contained therein; (e) attempt to gain unauthorized access to the Application or its related software, systems or networks; (f) impersonate any person or entity or otherwise misrepresent your affiliation with a person or entity.</p>
                      <h4>6. Payments</h4>
                      <h4>6.1 Payment Terms for Third Party Providers (Drivers/Delivery Partners)</h4>
                      <p>6.1.1 Any fees which Geniehut may charge you for the Service are due immediately and are non-refundable (“<b>Service Fee</b>“).This no-refund policy shall apply at all times regardless of your decision to terminate your access to the Application / Platform, our decision to terminate or suspend your access to the Application / Platform, disruption caused to the Service whether planned, accidental or intentional, or any reason whatsoever.</p>
                      <p>6.1.2 YOU ACKNOWLEDGE AND CONFIRM THAT GENIEHUT MAY ADMINISTER AND ACT AS YOUR COLLECTION AGENT TO PAY TO YOU THE TOTAL AMOUNT OF USER CHARGES DUE TO YOU IN RESPECT OF YOUR PROVISION OF THE SOLUTION.</p>
                      <p>6.1.3 Geniehut retains the right to suspend the processing of any transaction where it reasonably believes that the transaction may be fraudulent, illegal or involves any criminal activity or where you and/or the User have breached any of the Terms in this Agreement. In such an event, you shall not hold Geniehut liable for any withholding of, delay in, suspension, forfeiture or cancellation of, any payment(s) to you.</p>
                      <p>6.1.4 Geniehut may, at its sole discretion, make promotional offers with different features and different rates on the Solutions to any of the Users whereby these promotional offers shall accordingly be honored by you. Geniehut may change the Service Fee at any time at its sole discretion.</p>
                      <h4>7. Cancellation</h4>
                      <h4>7.1 Cancellation Terms for Third Party Providers:</h4>
                      <p>7.1.1 The Users rely on you for delivery or provision of the Solutions. You agree that high and/or frequent cancellation rates or ignoring the Users’ bookings will impair the Users’ experience and negatively impact the reputation and branding of Geniehut.</p>
                      <p>7.1.2 While you may cancel a booking, the cancellation shall be based on acceptable cancellation reasons as shown in the Application. Geniehut reserves the right to amend the acceptable cancellation reasons from time to time. A cancellation that is not based on one of the acceptable reasons or ignoring a booking may be counted in determining if your access to the Service will be temporarily restricted.</p>
                      <h4>7.2 Cancellation Terms for Users:</h4>
                      <p>7.2.1 Unless otherwise stated in any Geniehut Policy, you may cancel your request for the services at any time before commencement with the Third Party Provider that has been matched with you by the Service.</p>
                      <h4>8. GeniehutRewards Loyalty Programme for Users</h4>
                      <p>8.1 If indicated as such during your use of the Application, you will automatically be a member of the loyalty programme named “GenUser’s GH points” operated by Geniehut and/or its affiliate companies.</p>
                      <h4>9. Ratings</h4> 
                      <p>9.1. Users and Third Party Providers may be allowed to rate each other in respect of Solutions provided.</p>
                      <p>9.2. Every rating will be automatically logged onto Geniehut’s system and Geniehut may analyse all ratings received. Geniehut may take all appropriate actions including suspending your use of the Service without any notice or compensation to you.</p>
                      <h4>10. Complaints</h4>
                      <p>10.1. Any complaints between Third Party Providers and Users must be taken up with each other directly.</p>
                      <h4>11. Repair and Cleaning Fees for Users</h4>
                      <p>11.1. Where applicable, you shall be responsible for the cost of repairing any damage to or necessary cleaning of the Third Party Provider’s Tools as a result of your misuse of the Service or breach of the Terms of Use herein. </p>
                      <h4>12. Intellectual Property Ownership</h4>
                      <p>12.1. Geniehut and its licensors, where applicable, shall own all right, title and interest, including all related intellectual property rights, in and to the Software and/or the Application and by extension, the Service and any suggestions, ideas, enhancement requests, feedback, recommendations or other information provided by you or any other party relating to the Service and/or any Solution. The Terms of Use do not constitute a sale agreement and do not convey to you any rights of ownership in or related to the Service, the Software and/or the Application, or any intellectual property rights owned by Geniehut and/or its licensors. Geniehut’s name, Geniehut’s logo, the Service, the Software and/or the Application and the third party providers’ logos and the product names associated with the Software and/or the Application are trademarks of Geniehut or third parties, and no right or license is granted to use them. For the avoidance of doubt, the term the Software and the Application herein shall include its respective components, processes and design in its entirety.</p>
                      <h4>13. Taxes</h4>
                      <p>13.1. You agree that this Agreement is subject to all prevailing statutory taxes, duties, fees, charges and/or costs, however denominated, as may be applicable from time to time. You shall comply with all applicable laws and take all steps required to enable, assist and/or defend Geniehut to claim or verify any input tax credit, set off, rebate or refund in respect of any taxes paid or payable in connection with the Service.</p>
                      <p>13.2. If you are a Third Party Provider, you are accountable for paying any tax and statutory contributions due in respect of sums payable to you under or in connection with this Agreement.</p>
                      <h4>14. Confidentiality</h4>
                      <p>14.1. You shall maintain in confidence all information and data relating to Geniehut, its services, products, business affairs, marketing and promotion plans or other operations and its associated companies which are disclosed to you by or on behalf of Geniehut (whether orally or in writing and whether before, on or after the date of this Agreement) or which are otherwise directly or indirectly acquired by you from Geniehut, or any of its affiliate companies, or created in the course of this Agreement. You shall further ensure that you only use such confidential information in order to use the Service, and shall not without Geniehut’s prior written consent, disclose such information to any third party nor use it for any other purpose.</p>
                      <p>14.2. The above obligations of confidentiality shall not apply to the extent that you can show that the relevant information:</p>
                      <p>14.2.1. was at the time of receipt already in your possession;</p>
                      <p>14.2.2. is, or becomes in the future, public knowledge through no fault or omission on your part;</p>
                      <p>14.2.3. was received from a third party having the right to disclose it; or</p>
                      <p>14.2.4. is required to be disclosed by law.</p>
                      <h4>15. Data Privacy and Personal Data Protection Policy </h4>
                      <p>15.1. Geniehut collects and processes your Personal Data in accordance with its Privacy Policy. The Privacy Policy applies to all of Geniehut’s Services and its terms are made a part of this Agreement by this reference.</p>
                      <p>15.2. Where applicable, you agree and consent to Geniehut, its subsidiaries and any of its affiliate companies collecting, using, processing and disclosing Personal Data as further described in our Privacy Policy.</p>
                      <p>15.3. You acknowledge that Geniehut may disclose Personal Data of other individuals to you in the course of your use of Geniehut’s Services. You represent and warrant that you will only use such Personal Data for the purpose for which it was disclosed to you by Geniehut, and not for any other unauthorized purposes.</p>
                      <h4>16. Third Party Interactions</h4>
                      <p>16.1. During use of the Service, you may enter into correspondence or transactions with third parties who display or offer their goods and/or service through the Platform or Application. Any such communication or agreement is strictly between you and the applicable third party and Geniehut and its licensors shall have no liability or obligation for any such communication or agreement. Neither Geniehut nor any of its affiliate companies endorses any applications or sites on the Internet that are linked through the Platform or Application, and in no event shall Geniehut, its licensors or its affiliate companies be responsible for any content, products, services or other materials on or available from such sites or third party providers. Certain third party providers of transportation, goods and/or services may require your agreement to additional or different terms of use and privacy policies prior to your use of or access to such goods or services, and Geniehut is not a party to and disclaims any and all responsibility and/or liability arising from such agreements between you and the third party providers. You acknowledge that such additional or different terms of use and privacy policies may apply to your use of such third party services. Geniehut is not liable for any information that you provide to or authorise us to provide to a third party, or for such third party’s collection, use and disclosure of such information.</p>
                      <p>16.2. Geniehut may rely on third party advertising and marketing supplied through the Service and other mechanisms to subsidize the Service and/or to earn additional revenue. If you do not wish to receive such advertising and marketing, please refer to our Privacy Policy for instructions to unsubscribe or update your privacy settings.</p>
                      <p>16.3. You agree and allow Geniehut to compile and release information regarding you and your use of the Service on an anonymous basis as part of a customer profile or similar report or analysis. You agree that it is your responsibility to take all precautions in all actions and interactions with any third party you interact with through the Service and/or advertising or marketing material supplied by third parties through the Service.</p>
                      <p>16.4. We may include hyperlinks to other websites or content on the Internet that are owned or operated by third parties (“<b>Third Party Links</b>“). Such Third Party Links are not under our control and we are not liable for any errors, omissions, delays, defamation, libel, slander, falsehood, obscenity, pornography, profanity, inaccuracy or any other objectionable material contained in the content, or the consequences of accessing, any linked website. Any hyperlinks to any other websites or content are not an endorsement or verification of such websites or content and you agree that your access to or use of such linked websites or content is entirely at your own risk.</p>
                      <h4>17. Indemnification</h4>
                      <p>17.1. By agreeing to the Terms of Use upon using the Service, you agree that you shall indemnify and hold Geniehut, its licensors and each such party’s affiliates, officers, directors, members, employees, attorneys and agents harmless from and against any and all claims, costs, damages, losses, liabilities and expenses (including attorneys’ fees and costs and/or regulatory action) arising out of or in connection with: (a) your use of the Service, the Platform, Software and/or the Application in your dealings with the Third Party Providers or Users (as the case may be), third party merchants, providers, partners, advertisers and/or sponsors, or (b) your violation or breach of any of the Terms of Use or any applicable law or regulation, whether or not referenced herein, or (c) your violation of any rights of any third party, including Third Party Providers or Users arranged via the Service, or (d) your use or misuse of the Service, the Platform, Software and/or the Application; (e) where applicable your ownership, use or operation of any Tools, including your provision of Solutions to Users via the Service where applicable.</p>
                      <h4>18. Disclaimer of Warranties</h4>
                      <p>18.1. Geniehut makes no representation, warranty or guarantee as to the reliability, timeliness, quality, suitability, availability, accuracy or completeness of the Service, Software, Application or Platform. Geniehut does not represent or warrant that (a) the use of the Service, Software, Application or Platform will be secure, uninterrupted, free of errors or other harmful components, or operate in combination with any other hardware, software, system or data, (b) will meet your requirements or expectations, (c) any stored data will be accurate or reliable, or (d) the quality of any products, services, information or other materials purchased or obtained by you through the Application will meet your requirements or expectations. The Service is provided to you strictly on an “as is” basis. All conditions, representations and warranties, including any implied warranty of merchantability, fitness for a particular purpose, or non-infringement of third party rights, are hereby excluded to the extent permissible by law.</p>
                      <p>18.2 Geniehut makes no representation or warranty of any kind whatsoever, express or implied, in respect of Solutions provided by Third Party Providers or any Solutions procured through the use of the Service. You agree that you shall bear all risk arising out of your use of the Service and any Solution provided by Third Party Providers and shall have no recourse to Geniehut in respect of the same.</p>
                      <p>18.3 Where applicable, Geniehut’s role as collection agent is solely mechanical and administrative in nature and Geniehut does not owe to you a duty of care or any fiduciary duties.</p>
                      <h4>19. Internet Delays </h4>
                      <p>THE SERVICE, PLATFORM, APPLICATION AND/OR THE SOFTWARE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS INCLUDING THE DEVICE USED BY YOU OR THE THIRD PARTY PROVIDER BEING FAULTY, NOT CONNECTED, OUT OF RANGE, SWITCHED OFF OR NOT FUNCTIONING. GENIEHUT IS NOT RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, DAMAGES OR LOSSES RESULTING FROM SUCH PROBLEMS.</p>
                      <h4>20. Limitation of Liability</h4>
                      <p>20.1. UNLESS OTHERWISE STATED, AND TO THE FULLEST EXTENT ALLOWED BY LAW, ANY CLAIMS AGAINST GENIEHUT BY YOU SHALL BE LIMITED TO THE AGGREGATE AMOUNT OF ALL AMOUNTS ACTUALLY PAID BY AND/OR DUE FROM YOU IN UTILISING THE SERVICE DURING THE EVENT GIVING RISE TO SUCH CLAIMS. GENIEHUT AND/OR ITS LICENSORS SHALL NOT BE LIABLE FOR ANY LOSS, DAMAGE OR INJURY WHICH MAY BE INCURRED BY OR CAUSED TO YOU OR TO ANY PERSON FOR WHOM YOU HAVE BOOKED THE SERVICE OR SOLUTION, INCLUDING BUT NOT LIMITED TO:</p>
                      <p>20.1.1. LOSS, DAMAGE OR INJURY ARISING OUT OF, OR IN ANY WAY CONNECTED WITH THE SERVICE, THE PLATFORM, APPLICATION AND/OR THE SOFTWARE;</p>
                      <p>20.1.2. THE USE OR INABILITY TO USE THE SERVICE, THE PLATFORM, APPLICATION AND/OR THE SOFTWARE;</p>
                      <p>20.1.3. ANY RELIANCE PLACED BY YOU ON THE COMPLETENESS, ACCURACY OR EXISTENCE OF ANY ADVERTISING; OR</p>
                      <p>20.1.4. AS A RESULT OF ANY RELATIONSHIP OR TRANSACTION BETWEEN YOU AND ANY USER, THIRD PARTY PROVIDER, MERCHANT, ADVERTISER OR SPONSOR WHOSE ADVERTISING APPEARS ON THE WEBSITE OR IS REFERRED TO BY THE SERVICE, THE APPLICATION AND/OR THE SOFTWARE,</p>
                      <p>EVEN IF GENIEHUT AND/OR ITS LICENSORS HAVE BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                      <p>20.2. GENIEHUT DOES NOT WARRANT OR REPRESENT THAT IT ASSESSES OR MONITORS THE SUITABILITY, LEGALITY, ABILITY, MOVEMENT OR LOCATION OF ANY USERS OR THIRD PARTY PROVIDERS INCLUDING MERCHANTS, ADVERTISERS AND/OR SPONSORS AND YOU EXPRESSLY WAIVE AND RELEASE GENIEHUT FROM ANY AND ALL LIABILITY, CLAIMS OR DAMAGES ARISING FROM OR IN ANY WAY RELATED TO THE USERS OR THIRD PARTY PROVIDERS INCLUDING MERCHANTS, ADVERTISERS AND/OR SPONSORS.</p>
                      <p>20.3. GENIEHUT WILL NOT BE A PARTY TO DISPUTES OR NEGOTIATIONS OF DISPUTES BETWEEN YOU AND USERS OR THIRD PARTY PROVIDERS INCLUDING MERCHANTS, ADVERTISERS AND/OR SPONSORS. UNLESS YOU ARE A CORPORATE CUSTOMER WITH A CURRENT CORPORATE ACCOUNT WITH GENIEHUT, GENIEHUT CANNOT AND WILL NOT PLAY ANY ROLE IN MANAGING PAYMENTS BETWEEN YOU AND THE THIRD PARTY PROVIDERS, INCLUDING MERCHANTS, ADVERTISERS AND/OR SPONSORS. RESPONSIBILITY FOR THE DECISIONS YOU MAKE REGARDING SERVICES AND PRODUCTS OFFERED VIA THE SERVICE, THE SOFTWARE AND/OR THE APPLICATION (WITH ALL ITS IMPLICATIONS) RESTS SOLELY WITH AND ON YOU. YOU EXPRESSLY WAIVE AND RELEASE GENIEHUT FROM ANY AND ALL LIABILITY, CLAIMS, CAUSES OF ACTION, OR DAMAGES ARISING FROM YOUR USE OF THE SERVICE, THE SOFTWARE AND/OR THE APPLICATION, OR IN ANY WAY RELATED TO THE THIRD PARTIES INCLUDING MERCHANTS, ADVERTISERS AND/OR SPONSORS INTRODUCED TO YOU BY THE SERVICE, THE SOFTWARE AND/OR THE APPLICATION.</p>
                      <p>20.4. THE QUALITY OF THE SOLUTIONS SCHEDULED THROUGH THE USE OF THE SERVICE IS ENTIRELY THE RESPONSIBILITY OF THE THIRD PARTY PROVIDER WHO ULTIMATELY PROVIDES SUCH SOLUTION TO THE USER. YOU UNDERSTAND, THEREFORE, THAT BY USING THE SERVICE, YOU MAY BE EXPOSED TO SERVICE THAT IS POTENTIALLY DANGEROUS, OFFENSIVE, HARMFUL TO MINORS, UNSAFE OR OTHERWISE OBJECTIONABLE, AND THAT YOU USE THE SERVICE AT YOUR OWN RISK.</p>
                      <h4>21. Notice</h4>
                      <p>21.1. Geniehut may give notice through the Application, electronic mail to your email address in the records of Geniehut, or by written communication sent by registered mail or pre-paid post to your address in the records of Geniehut. Such notice shall be deemed to have been given upon the expiration of 48 hours after mailing or posting (if sent by registered mail or pre-paid post) or 1 hour after sending (if sent by email). You may give notice to Geniehut (such notice shall be deemed given when received by Geniehut) by letter sent by courier or registered mail to Geniehut using the contact details as provided in the Application.</p>
                      <h4>22. Assignment</h4>
                      <p>22.1. Unless otherwise stated herein, this Terms of Use as modified from time to time may not be assigned by you without the prior written approval of Geniehut but may be assigned without your consent by Geniehut. Any purported assignment by you in violation of this section shall be void.</p>
                      <h4>23. Dispute Resolution</h4>
                      <p>23.1. This Terms of Use shall be governed by <b>Singapore</b> law, without regard to the choice or conflicts of law provisions of any jurisdiction, and any disputes, actions, claims or causes of action arising out of or in connection with this Terms of Use or the Service shall be referred to the Singapore International Arbitration Centre (“<b>SIAC</b>”), in accordance with the Rules of the SIAC as modified or amended from time to time (the “<b>Rules</b>”) by a sole arbitrator appointed by the mutual agreement of you and Geniehut (the “<b>Arbitrator</b>”). If you and Geniehut are unable to agree on an arbitrator, the Arbitrator shall be appointed by the President of SIAC in accordance with the Rules. The seat and venue of the arbitration shall be Singapore, in the English language and the fees of the Arbitrator shall be borne equally by you and Geniehut, provided that the Arbitrator may require that such fees be borne in such other manner as the Arbitrator determines is required in order for this arbitration clause to be enforceable under applicable law. You may also choose a mode of alternative dispute resolution such as the Small Claims Tribunal and/or Singapore Mediation Centre, subject to their respective rules and guidelines.</p>
                      <h4>24. Relationship</h4>
                      <p>24.1. Nothing contained in these Terms of Use shall be construed as creating any agency, partnership, or other form of joint enterprise with Geniehut.</p>
                      <h4>25. Severability</h4>
                      <p>25.1 If any provision of the Terms of Use is held to be invalid or unenforceable, the legality, validity and enforceability of the remaining provisions shall not be affected or impaired.</p>
                      <h4>26. No Waiver</h4>
                      <p>26.1. The failure of Geniehut to enforce any right or provision in the Terms of Use shall not constitute a waiver of such right or provision.</p>
                      <h4>27. Entire Agreement</h4>
                      <p>27.1. This Agreement comprises the entire agreement between you and Geniehut in relation to the matters stated herein and supersedes any prior or contemporaneous negotiations or discussions.</p>
                      <h4>28. Suspension and Termination</h4>
                      <p>28.1. You agree that we may do any of the following, at any time, without notice:</p>
                      <p>(i) modify, suspend or terminate operation of or access to the Application, or any portion of the Application (including access to your account and/or the availability of any products or services), for any reason;</p>
                      <p>(ii) modify or change any applicable policies or terms; and</p>
                      <p>(iii) interrupt the operation of the Application or any portion of the Application (including access to your account and/or the availability of any products or services), as necessary to perform routine or non-routine maintenance, error correction, or other changes.</p>
                      <p>We shall not be required to compensate you for any suspension or termination.</p>
                      <h4>29. No Third Party Rights </h4>
                      <p>29.1. Except for the parties who are indemnified pursuant to the indemnification provisions set out herein, this Agreement does not give rights to any third parties who are not party to this Agreement.</p>

                    </div>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
      
    );
}
}

const mapStateTopProps = (state) => {
  return {
  cmspage: state.cmspage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCmsPage: (slug) => {
      dispatch({ type: GET_CMSPAGE, slug});
    },
  }
}
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(TermsCondtion));