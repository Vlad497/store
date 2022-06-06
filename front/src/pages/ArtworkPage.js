import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { addArtworkToBasket, fetchOneArtwork } from "../http/artworkAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const ArtworkPage = observer(() => {
    const { user, basket } = useContext(Context);
    const [artwork, setArtwork] = useState({ info: [] });
    const { id } = useParams();


    useEffect(() => {
        fetchOneArtwork(id).then(data => setArtwork(data));
    }, [id]);

    const isArtworkInBasket = () => {
        const findArtwork = basket.Basket.findIndex(item => Number(item.id) === Number(artwork.id));
        return findArtwork < 0;
    }

    const addArtworkInBasket = (artwork) => {
        console.log(1);
        if (user.isAuth) {
            addArtworkToBasket(artwork).then(() => basket.setBasket(artwork, true))
        } else {
            basket.setBasket(artwork);
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Image height={500} width={"100%"} src={'http://localhost:5000/' + artwork.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-start m-2 mb-5 mt-3" style={{ fontWeight: "bolder", color: 'white' }}>
                        <h2>{artwork.name}</h2>
                    </Row>
                    <Row className="d-flex flex-column m-2" style={{ borderTop: "3px solid black" }}>
                        {artwork.info.map((info, index) =>
                            <Row key={info.id} style={{ padding: 10, color: "white", fontSize: "2vw" }}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
                </Col>
                <Col md={1}>
                    <Row
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 100, fontSize: 32, background: "transparent", color: "white" }}
                    >
                        <h3>{artwork?.price || 0} BYN</h3>
                        {isArtworkInBasket() ?
                            <Button variant="outline-light" onClick={() => addArtworkInBasket(artwork)}>Добавить в корзину</Button>
                            :
                            <Button variant="outline-light" disabled>Добавлено в корзину</Button>
                        }
                    </Row>
                </Col>
            </Row>

        </Container>
    );
});

export default ArtworkPage;

