import React, { Component } from 'react';

class JobVDPopup extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            }
    }
   componentDidMount(){
   }
   
  render() {
     
    return (
          <div>    
             <div class="job-vd-box">
                 <h3>What type of services do you need?</h3>
                 <p>510599</p>
             </div>
             <div class="job-vd-box">
                 <h3>What type of services do you need?</h3>
                 <p>Minor repair (Eg. brake pads, cables, tyre)</p>
                 <p>Minor Servicing (Eg. Tuning gears, brakes, spokes)</p>
                 <p>Install parts (Eg. Extra seat, lights, basket, bottle holder)</p>
                 <p>Major overhaul/Upgrade/Servicing (Eg. Change frame, wheelset/forks, custom assembly)</p>
                 <p>Bicycle with certified motor (Eg. Servicing/repairs of motorised equipment)</p>
                 <p>Buy accessories/components/tools (Eg. cycling shoes/shirts, bicycle parts, hand pumps, wrenches)</p>
             </div>
          </div>
            );
  }
}

export default JobVDPopup;
