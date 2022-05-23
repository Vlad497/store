import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ArtworkItem from "./artworkItem";

const ArtworkList = observer(() => {
    const { artwork } = useContext(Context);

    return (
        <Row className="d-flex mb-5">
            {artwork.artworks.map(artwork =>
                <ArtworkItem key={artwork.id} artwork={artwork} />
            )}
        </Row>
    );
});

export default ArtworkList;
