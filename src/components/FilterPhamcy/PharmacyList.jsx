import React, { useContext, useMemo , useState ,useEffect} from 'react';
import { MaskContext } from '../../Context.js'
// click openPopup
const PharamcyItem = ({ item, orderid, onItemClick}) => {
    const { data, maskvalue } = useContext(MaskContext);
    // console.log({data})
    // console.log({ maskvalue });

    const { properties, geometry} = item
    // console.log(orderid)
    return (
        <div className="store_detail"
            onClick={() => {onItemClick(orderid);
                // console.log(orderid)
            }}>
            <h2 className="store_title" data-child={properties.mask_child}
                data-adult={properties.mask_adult}>{properties.name}
                {/* <span><i className="fas fa-map-marker-alt"></i>
                {distance >= 1 ? distance.toFixed(1) + 'km' : (distance * 1000 >> 0) + 'm'}
                </span> */}
            </h2>
            <p className="addtolist" ><i className="far fa-check-square"></i></p>
            <p><i className="fas fa-briefcase"></i>{properties.address}</p>
            <p><i className="fas fa-phone fa-flip-horizontal"></i>
                <a href="tel:{properties.phone}">{properties.phone}</a>
            </p>
            {properties.note.length <= 1 ? " " : <p><i className="fas fa-tag"></i>{properties.note}</p>}
            <div className="mask_size">
                <span data-size='adult'>成人{properties.mask_adult}</span>
                <span data-size='child'>兒童{properties.mask_child}</span>
            </div>
            <span>最後更新:{properties.updated}</span>
    </div>)
}

const PharmacyList = ({ county, town }) => {
    const { data, position, selindex ,filters } = useContext(MaskContext);
    console.log(county)//drowdwn//city
    console.log(town)//Manga
    //item.county.replace(/臺/g, '台'))
    const list = useMemo(() => county && town 
    ? data.filter(({ properties }) => {
        return properties.county.replace(/臺/g, '台') === county && properties.town.replace(/臺/g, '台') === town
    }) 
    : [], [town, data, county])
    console.log(list)

//根據list變動來更新data
    useEffect(()=>{
        console.log(list)
        filters.setSeldata(list);
        console.log("useEffect");
    },[list])

    function handleItemClick(index) {
        console.log(index);
        console.log(selindex);

        //點選清單index marker pop
        selindex.setSelected(index);
        // update data
        // filters.setSeldata(list);

       //利用useContext改變資料
//  const [maskData, setMaskdata] = useState([]);
//  const madedata = { maskData, setMaskdata };
//  <MaskContext.Provider
//           value={{
//             data: maskData,
//             position: location,
//             selindex: selvalue,
//             maskvalue: madedata
    }


    return (
        <div className="datalist" id="storelist">
            {list.map((item,index) => 
                    (<PharamcyItem 
                        key={index} 
                        item={item} 
                        orderid ={index}
                        onItemClick={handleItemClick} 
                    />))
            }
        </div>
    );
}

export default PharmacyList;
