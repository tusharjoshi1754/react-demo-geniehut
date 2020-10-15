import React, { Component } from 'react';
import {  Table} from 'react-bootstrap';
class HowtoUse extends Component {
  render() {
    return (
       <div>
            <div>
                <ul className="howtoUse_list">
                    <li><b>Step 1: </b>Choose the run errand services that you need, keys in the detail job description and set your initial offer.</li>
                    <li><b>Step 2:&nbsp;</b>You can read GenRun "Part timer" profile and request a call back from the GenRun. System deducts GH points for every SMS sends to a GenRun but you can retrive back 50% of the points by giving feedback.</li>
                    <li><b>Step 3: Alternatively, if any GenRun see your initial request, they might counteroffer or contact you directly.</b></li>
                    <li><b>Step 4: </b>After the service, please give review and rating to the GenRun so that other customer can have know more about this GenRun.</li>
                </ul>        
            </div>
            <div>
                <Table hover bordered className="howtoUse_table">
                    <thead>
                        <tr>
                            <th>GenRun Services</th>
                            <th>Example:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Geniehut jobs</td>
                            <td>I need part timers to recruit GenPro and GenRun. Please accept and we send your more details via whatsapp for you to decide.</td>
                        </tr>
                        <tr>
                            <td>Buy things (One time)</td>
                            <td>Queue up to buy the new mobile phone launch; Accompany my mum for grocery shopping.</td>
                        </tr>
                        <tr>
                            <td>Clothes shopping</td>
                            <td>Accompany me for window shopping and give me advice</td>
                        </tr>
                        <tr>
                            <td>Computer repair</td>
                            <td>(Desktop &amp; Laptop diagnostic) Computer breakdown and I don’t know how to fix.<br />
                                (Email) Link email address to laptop Microsoft Outlook<br />
                                (Network) Boost wifi network from living room to bedroom/ Configure internet router<br />
                                (Operating&nbsp; system OS) Reformat my computer and reinstall Microsoft Windows</td>
                        </tr>
                        <tr>
                            <td>Courier service (Regular)</td>
                            <td>Post mails at Post office for me regularly; Bring my clothes to the laundry shops</td>
                        </tr>
                        <tr>
                            <td>Courier service (One time)</td>
                            <td>Deliver flowers/chocolates to a given address</td>
                        </tr>
                        <tr>
                            <td>Data entry (Basic)</td>
                            <td>Data entry inside Microsoft office (Excel, Access, Words etc)</td>
                        </tr>
                        <tr>
                            <td>Data entry (Advance)</td>
                            <td>Use MYOB software for data entry</td>
                        </tr>
                        <tr>
                            <td>Design posters/ flyers/ logo</td>
                            <td>Design a poster for my recycling event</td>
                        </tr>
                        <tr>
                            <td>Distribute flyer</td>
                            <td>Distribute flyer at Jurong bus interchange.</td>
                        </tr>
                        <tr>
                            <td>Driver</td>
                            <td>Owns a van and transport 1 Queen size bed and bed frame. With 1 man labour supply. Petrol/Parking fee included in the fee.</td>
                        </tr>
                        <tr>
                            <td>Gaming (play)</td>
                            <td>Help me play/ levelling online games</td>
                        </tr>
                        <tr>
                            <td>Handyman (General)</td>
                            <td>Change master bedroom's door knob; Fix the wall fan in my bedroom; Drill holes in the walls; Fix up up IKEA computer table (L1400mmX W50mmX H70mm)</td>
                        </tr>
                        <tr>
                            <td>Helper (Within a day)</td>
                            <td>Help me set up BBQ fire and cook the food; Help me pack stuffs</td>
                        </tr>
                        <tr>
                            <td>Helper (More than a day)</td>
                            <td>Run my stall. $X per hour; 10am to 10pm daily (exclude lunch 1 hour); 30 days.</td>
                        </tr>
                        <tr>
                            <td>Baby Sitter/ Kids Supervisor</td>
                            <td>Baby sitting my 18 months baby when I am working from Mon to Fri 9am to 7pm/ Supervise my son to do his homework during weekday daily from 2pm to 4pm.</td>
                        </tr>
                        <tr>
                            <td>Laundry</td>
                            <td>Wash and iron my clothes (1 basket size and every 2 days)</td>
                        </tr>
                        <tr>
                            <td>Mascot</td>
                            <td>Wear mascot suit for an event</td>
                        </tr>
                        <tr>
                            <td>Pet care (General)</td>
                            <td>Bring my pet from my house to a specific Vet; Run my dog</td>
                        </tr>
                        <tr>
                            <td>Pet care accommodation</td>
                            <td>Fetch my pet as I don’t have car and take care when I am out of town</td>
                        </tr>
                        <tr>
                            <td>Photographer (General)</td>
                            <td>Use your phone camera at least 5 megapixel to take photos during the party and give me all the soft copies.</td>
                        </tr>
                        <tr>
                            <td>Survey</td>
                            <td>Door to door survey (Age group: &gt;50 years old, , uses social media/ messaging apps, not actively working outside etc).</td>
                        </tr>
                        <tr>
                            <td>Training Assistant</td>
                            <td>To co-teach and support me when I give lessons in the classroom.</td>
                        </tr>
                        <tr>
                            <td>Waitress (No experience)</td>
                            <td>Part time waitress at hotel for wedding dinner. Training will be provided.</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
       </div>
    );
  }
}

export default HowtoUse;
