import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";


import { Context } from "../index";
import { Button, Col, Image, Row } from "react-bootstrap";
import OneItemInBasket from "../components/oneItemInBasket";

import emptyBasket from "./../assets/emptyBasket.jpg";
import { ORDERING_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";

const BasketCard = observer(() => {
    const { basket } = useContext(Context);

    if (basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="text-center mt-3 mb-3" style={{ fontSize: 28, color: "white" }}><b>Корзина пуста</b></div>
                <Image src={emptyBasket} style={{ borderRadius: '25%' }} />
            </div>
        )
    }

    return (
        <>
            <br />
            <NavLink to={ORDERING_ROUTE}>
                <Button>Оформить заказ</Button>
            </NavLink>
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(artwork => <OneItemInBasket key={artwork.id} artwork={artwork} />)}
                </Col>
            </Row>
        </>
    );
});

export default BasketCard;
