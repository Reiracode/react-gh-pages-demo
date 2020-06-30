import React, { useState, useEffect, createContext } from 'react';
import MaskMap from './components/Map/MaskMap'
import FilterPhamcy from './components/FilterPhamcy/FilterPhamcy'
import Loading from  './components/Loading/Loading'
import MenuBar from './components/MenuBar/MenuBar'
// import Overlay from './components/MenuBar/Overlay'

import './App.css';
import { MaskContext } from './Context.js'
export const UserCount = React.createContext()
function App() {
  const [count, setCount] = useState(100)

  const [data, setData] = useState({ hits: [] });
  const [hasError, setErrors] = useState(false);
  const [isLoading,setIsLoading]= useState(false);
  const [location, setLocation] = useState({})

//useState error 會瘋掉 []=>map 預設格式不正確
  const [infoData, setInfoData] = useState([]);
  const [newData, setNewData] = useState([]);

  const getMaskData = () => {
    setIsLoading(true);
    async function fetchData() {
      const res = await fetch("https://hn.algolia.com/api/v1/search?query=redux");
      res.json()
        .then(res => setData(res))
        .catch(err => setErrors(err));

      const resa = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
      // resa.then(resa => resa.json())
      resa.json()
        .then(json => setInfoData(json.features))
        .then(json =>console.log(json))
    }
    fetchData();
  }


  const getAllStore = () =>{
      (async () => {
        const resapi = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
        // const json =  await resapi.json();
        // console.log(json.features)
        // setNewData(json.features)
        resapi.json()
          .then(json => { 
              console.log(json.features)
            return json
          })
          .then(json => setNewData(json.features))
    })();
  }

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        init: true,
        zoom: 16,
      });
      setIsLoading(false);
    });
  }

  useEffect(() => {
    // Promise.all([getGeolocation(), getMaskData()]);
    Promise.all([getGeolocation(), getMaskData(), getAllStore()]).then(res => {
      // infoData = resultDatas[0];
      // console.log(res[0])
    }).catch((err) => {
      console.log(err.message)
      alert(err.message)
    });
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="main">

        <MaskContext.Provider value={[newData]}>
          <MaskMap></MaskMap>

          {/* <Overlay></Overlay> */}
          <MenuBar></MenuBar>
        </MaskContext.Provider>

        {/* <UserCount.Provider value={[count, setCount]}>
          <MaskMap></MaskMap>
          <MenuBar></MenuBar>
        </UserCount.Provider> */}

        {/* <ul className="mobile_menu" value={location.latitude }>
          {newData.filter(obj => obj.properties.county == "新北市" && obj.properties.cunli =='復興里').map(item => (
              <li className="list_menu" key={item.properties.id}>
                {item.properties.name}
              </li>
            ))}
        </ul> */}
      </div>
    </>
  );
}

export default App;