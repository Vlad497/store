import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import GalleryList from "../components/GalleryList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchGallery } from "../http/galleryAPI";
import PagesGallery from "../components/PagesGallery";

const Gallery = observer(() => {
    const { gallery } = useContext(Context);

    useEffect(() => {
        fetchGallery(1, 4).then(data => {
            gallery.setGallery(data.rows);
            gallery.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            fetchGallery(gallery.page, 4).then(data => {
                gallery.setGallery(data.rows);
                gallery.setTotalCount(data.count);
            });
        }, [gallery.page],
    );

    return (
        <Container >
            <Row className="d-flex justify-content-center mb-2">
                <PagesGallery />
            </Row>
            <Row >
                <Col md={10}>
                    <GalleryList />
                </Col>
            </Row>

        </Container >
    );
});

export default Gallery;
