import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext } from '../../Context.js'
import Select from "react-select";
import PharmacyList from '../FilterPhamcy/PharmacyList.jsx'

const Storelist = ({county}) => {
  // const [data] = useContext(MaskContext)
  // const { data, position } = useContext(MaskContext)

  const [selcity, setSelcity] = useState("");
  const [town, setTown] = useState("");
  // console.log(county)

  function getCountyOptions(arr) {
    //獲取縣市列表(不重複)
    console.log(arr);
    const set = new Set();
    return arr.filter(({ county }) => (!set.has(county) ? set.add(county) : false))
      .map(item => item.county.replace(/臺/g, '台'))
      .sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hant-TW-u-co-stroke')
      }).map((el) => {
        return { value: el, label: el }
      })
    //map & reduce
    // .reduce((result, county) => {
    //   if (county) {
    //     result.push({
    //       value: county,
    //       label: county
    //     });
    //   }
    //   return result;
    // }, []);
  }

  function getTownOptions(arr, location) {
    //獲取地區列表(不重複)
    const set = new Set();
    console.log(arr)
    console.log(location)
    return arr.filter(({ county }) => {
      return county.replace(/臺/g, '台') === location;
    }).filter(({ town }) => (!set.has(town) ? set.add(town) : false))
      .map(({ town }) => { return town }).sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hant-TW-u-co-stroke')
      }).map((el) => {
        return { value: el, label: el }
      })
  }

  const countyOptions = getCountyOptions(county);
  console.log(countyOptions)
  const townOptions = county ? getTownOptions(county, selcity) : []

  function locationChangeHandler(selectedOptions) {
    console.log(selectedOptions.value)
    setSelcity(selectedOptions.value)
    setTown("")
  }

  function townChangeHandler(selectedOptions) {
    console.log(selectedOptions.value)
    setTown(selectedOptions.value)

// filters.setSeldata(list);

  }


  return (
    <div className="overlay" data-id="list" id="list">
      <button className="open_arrow"><i className="fas fa-angle-up"></i></button>
      <div className="close_overlay"><i className="fas fa-times"></i></div> 

      <div className="select-box">
        <span>縣市</span>
        <Select className="select" options={countyOptions} onChange={locationChangeHandler} />

        <span>地區</span>
        <Select className="select" options={townOptions} onChange={townChangeHandler} />

        <div className="my-selector-c">
          <div id="mask_sel">
            <button className="mask_all active" data-item="all">ALL</button>
            <button className="mask_all" data-item="adult">Adult</button>
            <button className="mask_all" data-item="child">Child</button>
          </div>
        </div>
      </div>

      <PharmacyList county={selcity} town={town}  />
    </div>
  );

}
export default Storelist