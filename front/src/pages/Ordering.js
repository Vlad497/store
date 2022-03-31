import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import { sendOrder } from "../http/ordersAPI";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Ordering = () => {
    const { basket, user } = useContext(Context);
    const [phone, setPhone] = useState(null);
    const navigate = useNavigate();

    const buy = () => {
        let order = {
            mobile: phone,
            basket: basket.Basket
        }

        if (user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            basket.setDeleteAllDeviceFromBasket();
            navigate(SHOP_ROUTE);
        });
    }
    return (
        <>
            <Form>
                <Form.Control
                    placeholder="Введите свой номер телефона..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
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