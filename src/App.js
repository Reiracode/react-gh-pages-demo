import React, { useState, useEffect, createContext } from 'react';
import MaskMap from './components/Map/MaskMap.jsx'
import Loading from  './components/Loading/Loading'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import { MaskContext } from './Context.js'
import { LanguageContext } from './Context.js'
import "./App.css";

//promise.all確認二個程式都有回傳成功才進行下一段
//location & maskdata => loading false
//之前用fetch程式時  Mask-APP-Master發生
const defaultState = [25.026277, 121.499962];
const App = ()=> {
  // curent click index
  const [selected, setSelected] = useState();
  const selvalue = { selected, setSelected };
  const [maskData, setMaskdata] = useState([]);
  //use context
  // const madedata = { maskData, setMaskdata };
  //filter maskdata
  const [selData, setSeldata] = useState([]);
  const filterdata = { selData, setSeldata };

  const [hasError, setErrors] = useState(false);
  const [isLoading,setIsLoading]= useState(true);
  const [location, setLocation] = useState(defaultState);
 
//單純return 後續return promiseall setData or  no return 直接setData
  // const fetchMaskData = () => {
  //   return fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
  //     .then((response) => response.json())
  //     .then(data => {
  //       console.log(data.features)
  //       return (data.features)
  //     });
  // };

  


  // const getGeolocation = () => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //   setLocation({
  //     latitude: pos.coords.latitude,
  //     longitude: pos.coords.longitude,
  //     init: true,
  //     zoom: 16,
  //   });
  //   });
  // }

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      console.log([pos.coords.latitude, pos.coords.longitude]);
      setLocation([pos.coords.latitude, pos.coords.longitude])
      setIsLoading(false);
    });
  }

  const getMaskdata = () => {
    setIsLoading(false)
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json())
      .then(json => {
        console.log(json.features)
        setIsLoading(false)
        setMaskdata(json.features)
        console.log(location);
        // return (data.features)
      });
  };

//return new promise------------fetchWeather(),
  useEffect(() => {
    Promise.all([getGeolocation(), getMaskdata()]);
  }, []);

  return (
    <React.Fragment>
      {/* {isLoading ? <Loading /> : null} */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="main">
          <MaskContext.Provider
            value={{
              data: maskData,
              position: location,
              selindex: selvalue,
              filters: filterdata
              // zoom: position.zoom,
              // setLocation: (obj) => { setLocation(obj) },
            }}
          >
            {/* <h2>Current: {selected}</h2> */}
            {/* <h2>Current: {maskData}</h2> */}

            <MaskMap />
            <MenuBar />
          </MaskContext.Provider>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;


/*
1、promise.all([funcA(),funcB())
  funcA 是否限制
   1、一定要有return值，
   2、new promise
   3、或是只是確認有exec fun 就可以呢

   我的目的是確認promise.all()內的func有執行後，才把loading拿掉

2、err:dom
   //li addEventListener or onclick function
   useeffect selector問題

3、err:mount
   

4、useeffect(()=>{}[])

  position => Maskmap 一開始是空的，

 */