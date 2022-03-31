import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOneOrderDevices } from "../http/ordersAPI";

const OneOrder = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderDevices(id).then(data => {
            setOrder(data);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <Spinner animation="grow" />
    }

    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    return (
        <Container className="d-flex flex-column">
            Id заказа: {id} <br />
            Статус: {order?.descr.complete ? "Выполнен" : "Not complete"} <br />
            Покупатель: {order?.descr.userId ? order.descr.userId : "Зарегистрирован"} <br />
            Создан: {formatDate(order?.descr.createdAt)} <br />
            {/* {order?.descr.complete ? formatDate(order.descr.complete.updatedAt) : false} */}
            Номер телефона:<a href={`tel:${order?.descr.mobile}`}> {order?.descr.mobile}</a>
            <br />

            {order?.devices.map(({ count, descr }, i) => {
                return (
                    <Row key={i} className="mb-5">
                        <Col xs={2}>
                            <Image width={150} height={200} src={'http://localhost:5000/' + descr.img} />
                        </Col>
                        <Col xs={10}>
                            Бренд: {descr.brand.name}<br />
                            Тип: {descr.type.name}<br />
                            Название: {descr.name}<br />
                            Цена: {descr.price} Руб<br />
                            Количество: {count}<br />
                            Общая стоимость: {count * descr.price} Руб
                        </Col>
                    </Row>
                )
            })}

        </Container>
    );
};

export default OneOrder;
