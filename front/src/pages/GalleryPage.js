import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneGallery } from "../http/galleryAPI";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ARTWORK_ROUTE } from "../utils/consts";

const GalleryPage = observer(() => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [arts, setArts] = useState([]);

    useEffect(() => {
        fetchOneGallery(id).then(data => {
            setName(data.descr.name);
            setDescription(data.descr.description);
            setAddress(data.descr.address);
            setImg(data.descr.img);
            setArts(data.arts)
        });
    }, [id]);

    return (
        <Container className="mt-3" style={{ color: "white" }}>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        <Image height={400} width={"100%"} src={'http://localhost:5000/' + img} />
                    </Col>
                </Row>
                <Row className="d-flex flex-column m-1" style={{ fontWeight: "bold" }}>
                    {address}
                    <h1 className='align-self-center'>{name}</h1>

                </Row>
                <Row className="d-flex flex-column m-1 mt-5" style={{ fontSize: "1.5em" }}>
                    <h2>Описание</h2>
                    {description}
                </Row>
                <h2 className='mt-5'>Работы в галерее</h2>
                <Row>
                    {
                        arts.map((art) => {
                            return (
                                <Col md={3} className="mt-3" onClick={() => navigate(ARTWORK_ROUTE + '/' + art.descr.id)}>
                                    <Card
                                        className="p-0"
                                        style={{ width: 150, cursor: "pointer", background: "transparent" }}
                                        border={"dark"}
                                    >
                                        <Image style={{ width: "100%", height: "200px" }} src={"http://localhost:5000/" + art.descr.img} />
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <div style={{ color: "white", fontWeight: "bolder" }}>{art && art.descr.author.name}</div>
                                        </div>
                                        <div style={{ color: "white" }} className="mt-1 ">{art.descr.name}</div>
                                    </Card>
                                </Col >
                            )
                        })
                    }
                </Row>
            </Col>
        </Container >
    );
});

export default GalleryPage;

