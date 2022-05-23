import React from 'react';
import { Card, Col, Image } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';
import { ARTWORK_ROUTE } from "../utils/consts";

const ArtworkItem = ({ artwork }) => {
    const navigate = useNavigate();
    return (
        <Col md={4} className="mt-3" onClick={() => navigate(ARTWORK_ROUTE + '/' + artwork.id)}>
            <Card
                className="p-0"
                style={{ width: 150, cursor: "pointer", background: "transparent" }}
                border={"dark"}
            >
                <Image style={{ width: "100%", height: "200px" }} src={"http://localhost:5000/" + artwork.img} />
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div style={{ color: "white", fontWeight: "bolder" }}>{artwork && artwork.author.name}</div>
                </div>
                <div style={{ color: "white" }} className="mt-1 ">{artwork.name}</div>
            </Card>
        </Col >
    );
};

export default ArtworkItem;
