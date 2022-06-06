import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import GalleryItem from "./GalleryItem";

const GalleryList = observer(() => {
    const { gallery } = useContext(Context);

    return (
        <Row className="d-flex mb-5">
            {gallery.gallery.map(gallery =>
                <GalleryItem key={gallery.id} gallery={gallery} />
            )}
        </Row>
    );
});

export default GalleryList;
