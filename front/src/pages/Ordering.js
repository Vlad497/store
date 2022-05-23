import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import { sendOrder } from "../http/ordersAPI";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Ordering = () => {
    const { basket, user } = useContext(Context);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const navigate = useNavigate();

    const buy = () => {
        let order = {
            mobile: phone,
            name: name,
            address: address,
            basket: basket.Basket
        }

        if (user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            basket.setDeleteAllArtworkFromBasket();
            navigate(SHOP_ROUTE);
        });
    }
    return (
        <>
            <Form>
                <Form.Control
                    className='mb-1'
                    placeholder="Введите свой номер телефона"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <Form.Control
                    className='mb-1'
                    placeholder="Введите ФИО"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Control
                    className='mb-1'
                    placeholder="Введите адрес доставки"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </Form>
            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="secondary" onClick={buy}>Заказать</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;
