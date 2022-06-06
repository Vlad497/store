import React from 'react';
import { Card, Col, Image } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';
import { GALLERY_ROUTE, GALLERY_PAGE_ROUTE } from "../utils/consts";



const GalleryItem = ({ gallery }) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(GALLERY_ROUTE + GALLERY_PAGE_ROUTE + '/' + gallery.id)}
            className="p-0 d-flex flex-column mb-5 justify-content-center "
            style={{ cursor: "pointer", background: "transparent" }}
            border={"black"}
        >
            <Image style={{ width: "100%", height: "300px" }} src={"http://localhost:5000/" + gallery.img} />
            <div>
                <div style={{ color: "white" }} className="mt-1 ml-5"><h2>{gallery.name}</h2></div>
                <div style={{ color: "white" }} className="mt-1 ml-5">Адрес {gallery.address}</div>
            </div>
        </Card>
    );
};

export default GalleryItem;
