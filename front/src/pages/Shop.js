import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import AuthorBar from "../components/AuthorBar";
import ArtworkList from "../components/ArtworkList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAuthors, fetchArtwork, fetchTypes } from "../http/artworkAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { artwork } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => artwork.setTypes(data));
        fetchAuthors().then(data => artwork.setAuthors(data));
        fetchArtwork(null, null, 1, 6).then(data => {
            artwork.setArtworks(data.rows);
            artwork.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if (artwork.selectedType === "all") {
                fetchArtwork(null, artwork.selectedAuthor.id, artwork.page, 6).then(data => {
                    artwork.setArtworks(data.rows);
                    artwork.setTotalCount(data.count);
                });
            } else {
                fetchArtwork(artwork.selectedType.id, artwork.selectedAuthor.id, artwork.page, 6).then(data => {
                    artwork.setArtworks(data.rows);
                    artwork.setTotalCount(data.count);
                });
            }
        }, [artwork.page, artwork.selectedType, artwork.selectedAuthor],
    );

    return (
        <Container >
            <Row className="d-flex justify-content-center mb-2">
                <Pages />
            </Row>
            <Row >
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={6}>
                    <ArtworkList />
                </Col>
                <Col md={3}>
                    <AuthorBar />
                </Col>
            </Row>

        </Container >
    );
});

export default Shop;
