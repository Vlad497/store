import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeleteGallery, fetchOneGallery, updateGallery } from "../http/galleryAPI";
import { Context } from "../index";
import { GALLERY_ADMIN_ROUTE } from "../utils/consts";


const GalleryPageEdit = observer(() => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [galleryCurr, setGalleryCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [artworkIds, setArtworkIds] = useState("");
    const [img, setImg] = useState("");
    const [imgOld, setImgOld] = useState("");
    const [imgFile, setImgFile] = useState(null);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteGallery = () => {
        fetchDeleteGallery(id).then(() => {
            navigate(GALLERY_ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }



    const putGallery = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('artworkIds', artworkIds);
        formData.append('img', imgFile);
        updateGallery(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    useEffect(() => {

        if (galleryCurr) {
            if (
                galleryCurr.name !== name || galleryCurr.artworkIds !== artworkIds ||
                galleryCurr.address !== address || galleryCurr.description !== description || img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, description, artworkIds, address, img]);

    useEffect(() => {
        fetchOneGallery(id).then(data => {
            setGalleryCurr(data);
            setName(data.descr.name);
            setDescription(data.descr.description);
            setAddress(data.descr.address);
            setArtworkIds(data.artworkIds);
            setImgOld(data.descr.img);
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row>
                {msg}
            </Row>}

            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            id:
                        </Col>
                        <Col xs={11} style={{ color: "white" }}>
                            {id}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Название:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{ color: "red" }}>Введите название</b>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Адрес:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="mt-3"
                                placeholder="Введите адрес галереи"
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {address.length === 0 && <b style={{ color: "red" }}>Введите адрес</b>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            id:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                value={artworkIds}
                                onChange={e => setArtworkIds(e.target.value)}
                                className="mt-3"
                                placeholder="Введите id произведений искусства через пробел"
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {artworkIds.length === 0 && <b style={{ color: "red" }}>Введите id произведений искусства</b>}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Описание галереи:
                        </Col>
                        <Col xs={8}>
                            <textarea
                                style={{ width: "100%", minHeight: "200px", maxHeight: "400px" }}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="mt-3"
                                placeholder="Введите описание галереи"
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {description.length === 0 && <b style={{ color: "red" }}>Введите описание галереи</b>}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center" style={{ color: "white" }}>
                            Текущее изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={"100%"} src={'http://localhost:5000/' + imgOld} />
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center" style={{ color: "white" }}>
                            Новое изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={"100%"} src={img} />
                        </Col>}
                        <Col xs={4} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" onChange={imgHandler} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить</Button> : <Button onClick={putGallery}>Обновить</Button>}
                            <Button className="ml-5" variant="dark" onClick={handleShow}>Удалить</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить {galleryCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteGallery}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default GalleryPageEdit;

