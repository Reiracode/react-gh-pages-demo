import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext } from '../../Context.js'
import TwCitySelector from './tw-city-selector.js';
const Overlay = (props) => {
    const [data] = useContext(MaskContext)
    const { itemlist } = props;
    console.log(props)
    console.log({ itemlist } )
    // const [open, setOpen] = useState(true)
    //select city
    new TwCitySelector({
        el: ".my-selector-c",
        elCounty: ".county",
        elDistrict: ".district"
    });

    //DOM
    // const loading = document.getElementById("loading");
    // const seltDist = document.querySelector('.district');
    // const maskSize = document.querySelector('#mask_sel');

    return(     
        <div className="overlay" data-id="list" id="list">
            {/* <div className={open ? "overlay active" : "overlay"} data-id="list" id="list">   */}
            <button className="open_arrow"   ><i className="fas fa-angle-up"></i></button>
            <div className="close_overlay"><i className="fas fa-times"></i></div>
            <div className="my-selector-c">
                <div className="list_selector">
                    <select className="county select-selected"></select>
                    <select className="district select-selected"></select>
                </div>

                <div id="mask_sel">
                    <button className="mask_all active" data-item="all">ALL</button>
                    <button className="mask_all" data-item="adult">Adult</button>
                    <button className="mask_all" data-item="child">Child</button>
                </div>

            </div>
            <div className="datalist" id="storelist">
                {/* <ul className="mobile_menu" > */}
                    {data.filter(obj => obj.properties.county == "新北市" 
                    // && obj.properties.town == '永和區'
                    ).map(item => (
                        <div className="store_detail" key={item.properties.id}>
                            {item.properties.name}
                        </div>
                    ))}
                {/* </ul>  */}
            </div>
        </div>
        )
}

export default Overlay