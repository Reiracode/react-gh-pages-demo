import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext } from '../../Context.js'
import Overlay from './Overlay'

const MenuBar = () => {
    const  [data] = useContext(MaskContext)
    // const [mapdata] =
    //     data.filter(obj => obj.properties.county == "新北市"
    //       && obj.properties.town == '永和區').map(item => (
    //          item.properties.name
    //     ))
    // console.log(mapdata)

    //[data] {data}
    //overlay
    const [open, setOpen] = useState(false)
    const [hero, currentHero] = useState("");
    // li click dataset.id
    const setCurrentHero = e => { 
        // console.log(e.target.dataset.id);
        // console.log(e.target.classList)
        console.log(e.target.parentNode)
        e.target.classList.toggle('active');
        currentHero(e.target.dataset.id);
        setOpen(!open)
    };

    useEffect(() => {
        console.log("Current hero is:", hero); 
        console.log(document.getElementById(`${hero}`))       
        // setOpen(false);
        if (!!document.getElementById(`${hero}`)){
            // document.getElementById(`${hero}`).classList.add('active')
        }
    }, [hero]);

    let litems = [
        { id: "personal", icon: "fa-user", desc: "個人記錄" },
        { id: "mystore", icon: "fa-folder-open", desc: "我的最愛" },
        { id: "list", icon: "fa-calendar-plus", desc: "search" },
        { id: "relocate", icon: "fa-compass", desc: "重新定位" },
    ];

    return(
        <>  
            {/* <ul className="mobile_menu" >
                {data.filter(obj => obj.properties.county == "新北市" && obj.properties.town == '永和區').map(item => (
                    <li className="list_menu" key={item.properties.id}>
                        {item.properties.name}
                    </li>
                ))}
            </ul>  */}
            {open ? <Overlay itemlist={hero}></Overlay> :""} 
            
            <ul className="mobile_menu" id="menu_bar" data-id="menu_bar">
                {litems.map((item,index) => (
                    <li key={index} className={`list_menu`} data-id={item.id} onClick={setCurrentHero}>
                        <i className={`fa ${item.icon}`}></i>
                        <span className="dialog">{item.desc}</span>
                    </li>
                ))}

                {/* <li className="list_menu" data-id="personal">
                    <i className="fas fa-user"></i>
                    <span className="dialog">個人記錄</span>
                </li>

                <li className="list_menu" data-id="mystore">
                    <i className="fas fa-folder-open"></i>
                    <span className="dialog">我的最愛</span>
                </li>

                <li className="list_menu" data-id="list" onClick={setCurrentHero} >
                    <i className="fas fa-calendar-plus"></i>
                    <span className="dialog">search</span>
                </li>

                <li className="list_menu" id="relocate" data-id="relocate">
                    <i className="fas fa-compass"></i>
                    <span className="dialog">重新定位</span>
                </li> */}
            </ul>
        </>
    )


}

export default MenuBar