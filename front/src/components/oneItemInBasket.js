import React, { useContext } from 'react';
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";

const OneItemInBasket = ({ artwork }) => {
    const { basket, user } = useContext(Context);

    return (
        <Card key={artwork.id} style={{ width: "100%" }} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={2}>
                        <Image src={"http://localhost:5000/" + artwork.img} style={{ width: "100%" }} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b> <NavLink to={`/artwork/${artwork.id}`}>{artwork.name}</NavLink>
                            </Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col xs={12}>
                                <b>Описание:</b><br /><br />
                                {artwork.info && artwork.info.length !== 0 ? artwork.info.map((info, i) => {

                                    if (i % 2 === 0) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{ backgroundColor: "lightgray" }}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Описание отсутствует"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(artwork, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(artwork)}>Удалить из корзины</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Количество:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => basket.setCountArtwork(artwork.id, "+")}>+</Button>
                                <input className="ml-2 mr-2 pl-2 pr-2" style={{ width: "20%" }} type="number" onChange={e => basket.setCountArtwork(Number(e.target.value))} value={artwork.count} />
                                <Button variant="outline-dark" onClick={() => basket.setCountArtwork(artwork.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Цена: {artwork.price * artwork.count} BYN
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
};

export default OneItemInBasket;
