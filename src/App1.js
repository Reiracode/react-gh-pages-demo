import React,{useState, useEffect} from 'react';
import './App.css';
import { getData } from './fetchData.js'
// import FilterRange from './components/FilterRange/FilterRange.js'
import { MaskContext } from './Context.js'

const App =()=>{
  const [filterRange, setfilterRange] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [position, setPosition] = useState([])

  const [data, setData] = useState({});
  // const [position, setPosition] = useState({
  //   location: [defaultState.lat, defaultState.lng],
  //   zoom: defaultState.zoom,
  // })

  useEffect(() => {
    //獲取資料
    getData()
      .then(res => {
        var search = "惠登藥局";
        // res.findproperties.cunli ="國武里"
        var newD = res.filter(({ properties: { address, name } }) => {
          return address.indexOf(search) !== -1 || name.indexOf(search) !== -1
        });

        console.log(newD)
        setfilterRange(newD)
        setIsLoading(false)

        setData(newD)
      })
      .catch(e => { })
  }, [])

  var datAll =
    [{ type: "apple", color: "pink", no: "123", name:"長泰藥局"},
      { type: "apple", color: "pink", no: "2222123", name: "長泰藥局" }];

 

    useEffect(() => {       //獲取使用者位置
      // if (!isLoading) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((p) => {
            setPosition({
              location: [p.coords.latitude, p.coords.longitude],
              zoom: 18
            })

            // setPosition(
            //   [p.coords.latitude, p.coords.longitude]
            // )
          })
        }
    }, [])
    // }, [isLoading])



  console.log(position)
 
  //obj
    var ssList = datAll.map((items, index) => {
      return (
        <ul key={index}>
          {Object.keys(items).map((key) => {
            return (
              <li key={key + index}>{key}:{items[key]}</li>
            )
          })}
        </ul>   
      )
    })

  var ssList1 = filterRange.map((items, i) => {
    return (
    <ul>
      <li key={i}>{items[i]}</li>
    </ul>
    )
  });


  return(
  <div>
    <ul>
      {data.map(item => (
        <li key={item.properties.id}>
          <a href={item.properties.name}>{item.properties.name}</a>
        </li>
      ))}
    </ul>

    <div className="col" value={position}>
      <h1>Mi Casa</h1>
      <p>This is my house y&apos;all!</p>
      {ssList}
      {ssList1}
    </div>

  </div>

    // <MaskContext.Provider value={
    //   {
    //     data: getData,
    //     position: position.location,
    //     zoom: position.zoom,
    //     setPosition: (obj) => { setPosition(obj) },
    //   }
    // }>
    //   <FilterRange/>
    // </MaskContext.Provider>
  );
}


export default App;
