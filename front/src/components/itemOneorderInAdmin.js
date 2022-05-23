import React, { useState } from 'react';
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { fetchChangeStatusOrder, fetchDeleteOrder } from "../http/ordersAPI";
import { ORDERS_ROUTE } from "../utils/consts";

const ItemOneOrderInAdmin = ({ id, complete, mobile, name, address, createdAt, updatedAt, userId, reRender }) => {
    const [modalDelete, setShowDelete] = useState(false);
    const [modalStatus, setShowStatus] = useState(false);

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const deleteOrder = () => {
        fetchDeleteOrder({ id }).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //modal status
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    const changeStatusOrder = () => {
        fetchChangeStatusOrder({ complete: !complete, id }).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //Format date (createdAt)
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
        <>
            <ListGroup.Item className="mt-3" key={id}>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col xs={12}>
                                <NavLink to={ORDERS_ROUTE + `/${id}`}>Номер заказа: {id}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Номер телефона: <a href={`tel:${mobile}`}>{mobile}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                ФИО: {name}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Адрес: {address}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Заказ создан: {formatDate(createdAt)}
                            </Col>
                        </Row>
                        {complete ? <Row>
                            <Col xs={12}>
                                Заказ выполнен: {formatDate(updatedAt)}
                            </Col>
                        </Row> : false}
                        <Row>
                            <Col xs={12}>
                                {userId ? "Покупатель: Зарегистрирован" : "Покупаетль: Незарегистрирован"}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Статус: {complete ? "Выполнен" : "В процессе"}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row style={{ height: "100%" }} className="d-flex align-items-center">
                            <Col xs={6} className="d-flex justify-content-center">
                                {complete ?
                                    <Button variant="success" onClick={handleShowStatus}>Убрать из выполненных</Button>
                                    :
                                    <Button variant="warning" onClick={handleShowStatus}>Выполнить</Button>}
                            </Col>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={handleShowDelete}>Удалить</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>

            <Modal show={modalStatus} onHide={handleCloseStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>Пожалуйста подтвердите</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы хотите изменить статус для этого заказа(id: {id}), из {complete ? '\'Выполнен\'' : '\'В процессе\''} в {complete ? '\'В процессе\'' : '\'Выполнен\''}?
                    <br /><br />
                    Данные:
                    <ul>
                        <li>Номер телефона: {mobile}</li>
                        <li>ФИО: {name}</li>
                        <li>Адрес: {address}</li>
                        <li>Заказ создан: {formatDate(createdAt)}</li>
                        {complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Выполнен' : `В процессе`}</li>
                        <li>{userId ? 'Покупатель зарегистрирован' : `Покупатель незарегистрирован`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatus}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={changeStatusOrder}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Пожалуйста подтвердите</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы хотите удалить этот заказ(id: {id})?
                    <br /><br />
                    Данные:
                    <ul>
                        <li>Номер телефона: {mobile}</li>
                        <li>ФИО: {name}</li>
                        <li>Адрес: {address}</li>
                        <li>Заказ создан: {formatDate(createdAt)}</li>
                        {complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Выполнен' : `В процессе`}</li>
                        <li>{userId ? 'Покупатель зарегистрирован' : `Покупатель незарегистрирован`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={deleteOrder}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ItemOneOrderInAdmin;
