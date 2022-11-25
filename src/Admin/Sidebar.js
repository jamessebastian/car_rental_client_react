import React from 'react';
import { NavLink } from "react-router-dom";
import { SidebarList } from "./SidebarList";
const sidebarList = SidebarList.map(({ url, title }, index) => {
    return (
        <li key={index}>
            <NavLink exact to={url} activeClassName="active">
                {title}
            </NavLink>
        </li>
    );
});

const Sidebar = () => {
    return (
        <div className="sidebarr d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: 280 }}>
            <ul className="sidebar-list ">
                {sidebarList}
            </ul>
        </div>
    );
};

export default Sidebar;
