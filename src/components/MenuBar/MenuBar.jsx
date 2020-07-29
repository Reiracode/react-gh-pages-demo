import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext } from '../../Context.js'
import Overlay from './Overlay.jsx'

const MenuBar = () => {
    // const  [data] = useContext(MaskContext)
    const { data, position } = useContext(MaskContext)
    //[data] {data}
    //overlay
    const [open, setOpen] = useState(false)
    const [overlayid, currentoverlayid] = useState("");

    //li addEventListener or onclick function
    // const clickBtn = [...document.querySelectorAll('.list_menu')];
    // console.log(clickBtn)
    // clickBtn.forEach(dom => dom.addEventListener('click', (e) => {
    //     console.log(e.currentTarget.dataset['id'])
    // }))
    // li click dataset.id
    const setCurrentoverlayid = e => { 
        console.log(e.target.dataset.id);
        console.log(e.target.classList)
        console.log(e.target.parentNode)
        e.target.classList.toggle('active');
        currentoverlayid(e.target.dataset.id);
        setOpen(!open)
    };


    let litems = [
        { id: "personal", icon: "fa-user", desc: "個人記錄" },
        { id: "mystore", icon: "fa-folder-open", desc: "我的最愛" },
        { id: "list", icon: "fa-calendar-plus", desc: "search" },
        { id: "relocate", icon: "fa-compass", desc: "重新定位" },
    ];

    return(
        <>  
            {open ? <Overlay itemlist={overlayid}/> :""} 
            
            <ul className="mobile_menu" id="menu_bar" data-id="menu_bar">
                {litems.map((item,index) => (
                    <li key={index} 
                        className={`list_menu`} 
                        data-id={item.id} 
                        onClick={setCurrentoverlayid}>
                        <i className={`fa ${item.icon}`}></i>
                        <span className="dialog">{item.desc}</span>
                    </li>
                ))}
            </ul>
        </>
    )


}

export default MenuBar