import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext } from '../../Context.js'
// import Select from "react-select";
// import PharmacyList from "../FilterPhamcy/PharmacyList.jsx";
import Storelist from './Storelist.jsx';

const Overlay = (props) => {
    const { data, position } = useContext(MaskContext)
    const { itemlist } = props;
    console.log(props.itemlist)
    console.log({ itemlist } )

    switch (props.itemlist){
        case 'list':
            console.log('list');
            break;
        default:
            console.log(`Sorry, we are out of ${props.itemlist}.`);
    }


    //將Select需要的搜索項目先提出來
    function optionsfilter(arr) {
        const result = arr.map(({ properties }) => {
            return {
                county: properties.county,
                town: properties.town
            }
        })
        return result
    }

    return( 
        <Storelist county={optionsfilter(data)}></Storelist>    
    )
}

export default Overlay