import React, { useState, useEffect,useContext,Component } from 'react';
import { MaskContext } from '../../Context.js'
import './MaskMap.css';
const MaskMap = () => {
    const [data] = useContext(MaskContext)

    
    let L = window.L;
    useEffect(() => {
        // create map
        L.map('maskmap', {
            center: [25.0619576, 121.54840689999999],
            zoom: 16,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
    }, []);


    return (
        // <h1>Mask map</h1>
        <div id="maskmap"></div>
    )
}

export default MaskMap