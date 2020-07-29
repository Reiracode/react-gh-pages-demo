import React, { useContext, useMemo, useRef, useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { MaskContext } from "../../Context.js";
// import MarkerClusterGroup from "./MarkerClusterGroup.jsx";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MaskPopup from "./MaskPopup.jsx";
import L from "leaflet";
import iconBlue from "../../assets/icon-1.png";
import iconPink from "../../assets/icon-2.png";
//Customising the Clustered Markers
// let DefaultIcon = L.icon({
//   iconUrl: icon
// });
// L.Marker.prototype.options.icon = DefaultIcon;


// Customising the Markers
// const myIcon = L.icon({
//   iconUrl: window.location.origin + "/assets/icon-1.png", //assets/icon-1.png",
//   iconSize: [30, 30],
//   iconAnchor: [16, 36],
//   popupAnchor: [1, -34]
// });

const otherIcon = L.icon({
  iconUrl: iconBlue,
  iconSize: [30, 30],
  iconAnchor: [16, 36]
});

const myIcon = L.icon({
  iconUrl: iconPink,
  iconSize: [30, 30],
  iconAnchor: [16, 36]
});

// console.log(myIcon)

const MaskMap = () => {
  const { data, position, selindex ,filters} = useContext(MaskContext);
  const [mapView, setMapview] = useState(position);

  useEffect(() => { 
    if (filters.selData.length){
      //取一筆資料來顯示
      filters.selData.slice(0,1).map(({ geometry})=>{
        console.log(geometry.coordinates)
        setMapview([geometry.coordinates[1],geometry.coordinates[0]]);
      });
    }
  }, [filters.selData]);

  // const MarkerClusterGroups = () => {
  //   const selectedIndex ="11"
  //   const markerRef = (props) => {
  //     console.log(props)
  //   }
  //   return (
  //     <>
  //       <MarkerClusterGroup>  
  //       {data.filter(({ properties }) => properties.county == "臺北市" && properties.town == "萬華區")
  //             .map(({geometry, properties},index)=> {
  //         return (
  //           <Marker key={index} 
  //                   position={[geometry.coordinates[1], geometry.coordinates[0]]}
  //                   ref={markerRef}
  //                   // openPopup={selectedIndex === index} 
  //           >
  //             <MaskPopup {...properties} />
  //           </Marker>
  //         );
  //       })}
  //         </MarkerClusterGroup>  
  //     </>
  //   );
  // };

  const  PointsLayer=(props)=> {
    //選擇的第幾個
    const { selectedIndex } = props;
    
    return (
    //  <MarkerClusterGroup>
    //   {
      //data.filter(({ properties }) => properties.county == "臺北市" && properties.town == "萬華區")
      filters.selData.map(({ geometry, properties }, index) => {
        return (
          <PointMarker
            key={index}
            position={[geometry.coordinates[1], geometry.coordinates[0]]}
            content={properties.name}
            properties={{ ...properties }}
            // center={{ lat: item.lat, lng: item.lng }}
            openPopup={selectedIndex === index}
          >
            {/* <MaskPopup /> */}
          </PointMarker>
        );
      })
    //    }
    // </MarkerClusterGroup>
    );
  }
  
  const PointMarker = (props)=>{
    const markerRef = useRef(null)
    const { position, content, openPopup, properties} = props;
    // console.log(props)
    //  markers.zoomToShowLayer(marker, function() {
    //    marker.openPopup();
    //  });
    useEffect(()=>{
      // if (openPopup) markerRef.current.leafletElement.openPopup();
      if (openPopup) {

        markerRef.current.leafletElement.openPopup();
      }
    }, [openPopup])

    return (
      <Marker icon={otherIcon} ref={markerRef} position={position}>
        {/* <Popup>{content}</Popup> */}
        <MaskPopup {...properties} />
      </Marker>
    );

  }


  //default ref openPopup我的位置訊息
  const MyMarker = props => {
    console.log(props)
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup();
      }
    };
    return <Marker ref={initMarker} {...props} />;
  };

  return (
    <Map center={mapView} zoom={13}
        viewport={{center: mapView,zoom: 15}}
    >
      {/* <Map center={{ position }.position} */}
      {/* //   zoom={6} maxZoom={18} duration={3}
    //   viewport={{
    //     center: position.position,
    //     zoom: 15
    //   }}  */}
      {/* // >   */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MyMarker icon={myIcon} position={{ position }.position}>
        {/* <Popup> */}
        {/* <Popup position={{ position }.position}> */}
        {/* You're Here <br /> Reira */}
        {/* </Popup> */}
      </MyMarker>

      {/* <MarkerClusterGroups/> */}
      <PointsLayer selectedIndex={selindex.selected} />
      {/* <PointsLayer selectedIndex={1}  /> */}
    </Map>
  );
};

export default MaskMap;
