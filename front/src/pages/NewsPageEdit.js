import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeleteNews, fetchOneNews, updateNews } from "../http/newsAPI";
import { NEWS_ADMIN_ROUTE } from "../utils/consts";


const NewsPageEdit = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [newsCurr, setNewsCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteNews = () => {
        fetchDeleteNews(id).then(() => {
            navigate(NEWS_ADMIN_ROUTE);
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
    const putNews = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', imgFile);
        updateNews(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    useEffect(() => {

        if (newsCurr) {
            if (newsCurr.name !== name || newsCurr.description !== description || img) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, description, img]);

    useEffect(() => {
        fetchOneNews(id).then(data => {
            setNewsCurr(data);
            setName(data.name);
            setDescription(data.description);
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
                            {newsCurr.id}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Заголовок:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{ color: "red" }}>Введите заголовок</b>}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Описание новостей:
                        </Col>
                        <Col xs={8}>
                            <textarea
                                style={{ width: "100%", minHeight: "200px", maxHeight: "400px" }}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="mt-3"
                                placeholder="Введите описание новостей"
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {description.length === 0 && <b style={{ color: "red" }}>Введите описание новостей</b>}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center" style={{ color: "white" }}>
                            Текущее изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={"100%"} src={'http://localhost:5000/' + newsCurr.img} />
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
                            {isDisabledPutBtn ? <Button disabled>Обновить</Button> : <Button onClick={putNews}>Обновить</Button>}
                            <Button className="ml-5" variant="dark" onClick={handleShow}>Удалить</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить {newsCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteNews}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default NewsPageEdit;

