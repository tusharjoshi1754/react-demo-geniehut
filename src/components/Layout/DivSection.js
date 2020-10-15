/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import {lang} from '../Helpers/lang';
class DivSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var settings = {
          dots: false,
          arrow: true,
          infinite: true,
          speed: 500,
          autoplay: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1
              }
            },
          ]          
        };   
    return (     
      <div className="container">
          <div className="header_services_wrapper">
              <div className="header_services_innerwrapper">
                  <Slider {...settings}>
                      <div className={this.props.activepage==='pro'?'switch_bar_list active':'switch_bar_list'}>
                          <Link to="/genpro" className="switch_bar_ico">
                              <i className="sdm_ico sdmico_genpro"></i>
                              <b>{lang.common.genpro}</b>                                        
                          </Link>
                      </div>
                      <div className={this.props.activepage==='run'?'switch_bar_list active':'switch_bar_list'}>
                          <Link to="/genrun" className="switch_bar_ico">
                              <i className="sdm_ico sdmico_genrun"></i>
                              <b>{lang.common.gentrun}</b>                                        
                          </Link>
                      </div>
                      <div className={this.props.activepage==='property'?'switch_bar_list active':'switch_bar_list'}>
                          <a href="javascript:void(0)" className="switch_bar_ico">
                              <i className="sdm_ico sdmico_genagent"></i>
                              <b>{lang.common.genproperty}</b>                                        
                          </a>
                      </div>
                  </Slider>
              </div>
          </div>
      </div>
    );
  }
}

export default DivSection;
