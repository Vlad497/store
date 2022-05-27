import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOneOrderArtworks } from "../http/ordersAPI";

const OneOrder = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderArtworks(id).then(data => {
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
        <Container className="d-flex flex-column mt-5" style={{ color: "white", fontSize: '1.5vw' }}>
            <Row>
                <Col xs={5} className="mr-5">
                    Номер заказа: {id} <br />
                    Статус: {order?.descr.complete ? "Выполнен" : "Не выполнен"} <br />
                    Зарегистрирован: {order?.descr.userId ? "Да" : "Нет"} <br />
                    Создан: {formatDate(order?.descr.createdAt)} <br />
                    Номер телефона: <a href={`tel:${order?.descr.mobile}`}> {order?.descr.mobile}</a>
                    <br />
                    ФИО: {order?.descr.name}
                    <br />
                    Адрес: {order?.descr.address}
                    <br />
                </Col>
                <Col>
                    {order?.artworks.map(({ count, descr }, i) => {
                        return (
                            <Row key={i} className="mb-5">
                                <Col xs={4}>
                                    <Image width={"100%"} src={'http://localhost:5000/' + descr.img} />
                                </Col>
                                <Col xs={8} style={{ color: "white", fontSize: '1.5vw' }}>
                                    Автор: {descr.author.name}<br />
                                    Вид искусства: {descr.type.name}<br />
                                    Название: {descr.name}<br />
                                    Цена: {descr.price} BYN<br />
                                    Количество: {count}<br />
                                    Общая стоимость: {count * descr.price} BYN
                                </Col>
                            </Row>
                        )
                    })}
                </Col>
            </Row>


        </Container >
    );
};

export default OneOrder;
