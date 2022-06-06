import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { NEWS_ROUTE, GALLERY_ROUTE } from "../../utils/consts";

const CenterNavBar = observer(() => {

    return (
        <div className="d-flex align-items-center mr-5">
            <NavLink to={NEWS_ROUTE} className="d-flex align-items-center">
                <div className="ml-2 mr-3" style={{ fontSize: "1.25rem", textDecoration: "none", color: "white" }}>GALLERONEWS</div>
            </NavLink>
            <NavLink to={GALLERY_ROUTE} className="d-flex align-items-center">
                <div className="ml-2 mr-3" style={{ fontSize: "1.25rem", textDecoration: "none", color: "white" }}>GALLERO MARKET</div>
            </NavLink>
        </div>
    );
});
export default CenterNavBar;


