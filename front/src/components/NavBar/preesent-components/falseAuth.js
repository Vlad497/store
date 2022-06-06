import React from "react";

import { Button, Nav } from "react-bootstrap";
import { LOGIN_ROUTE } from "../../../utils/consts";
import { NavLink } from "react-router-dom";
import BasketNavBar from "../BasketNavBar";
import CenterNavBar from "../CenterNavBar";

const FalseAuth = () => {
    return (
        <Nav className="ml-auto" style={{ color: "white" }}>
            <BasketNavBar />
            <CenterNavBar />
            <NavLink to={LOGIN_ROUTE}>
                <Button variant={"outline-light"}>Войти</Button>
            </NavLink>
        </Nav>
    );
};

export default FalseAuth;
