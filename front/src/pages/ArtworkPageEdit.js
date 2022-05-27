import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeleteArtwork, fetchOneArtwork, updateArtworks } from "../http/artworkAPI";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";


const ArtworkPageEdit = observer(() => {
    const { artwork } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [artworkCurr, setArtworkCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectAuthor, setSelectAuthor] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteArtwork = () => {
        fetchDeleteArtwork(id).then(() => {
            navigate(ADMIN_ROUTE);
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

    //info
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', id: Date.now() }]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.id !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? { ...i, [key]: value } : i));
    };

    const putArtwork = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('authorId', selectAuthor.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateArtworks(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for (let key in item) {
                if (key === "title" || key === "description") {
                    if (!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if (artworkCurr.info && artworkCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if (artworkCurr && artworkCurr.author && artworkCurr.type) {
            if (artworkCurr.author.name !== selectAuthor.name ||
                artworkCurr.type.name !== selectType.name ||
                artworkCurr.name !== name ||
                artworkCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectAuthor, selectType, price, img, info]);

    useEffect(() => {
        fetchOneArtwork(id).then(data => {
            setArtworkCurr(data);
            setSelectAuthor(data.author);
            setSelectType(data.type);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info)
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
                            {artworkCurr.id}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }} >
                            Автор:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectAuthor.name || "Выбрать автора"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {artwork.authors.map(author => {
                                        return author.name === selectAuthor.name ?
                                            <Dropdown.Item
                                                key={author.id}
                                                disabled
                                            >
                                                {author.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={author.id}
                                                onClick={() => setSelectAuthor(author)}
                                            >
                                                {author.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Виды искусства:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType.name || "Выбрать вид"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {artwork.types.map(type => {
                                        return type.name === selectType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
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
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center" style={{ color: "white" }}>
                            Цена:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {price === 0 && <b style={{ color: "red" }}>Введите цену</b>}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center" style={{ color: "white" }}>
                            Текущее изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={"100%"} src={'http://localhost:5000/' + artworkCurr.img} />
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

                    <Row className="d-flex flex-column m-3" style={{ color: "white" }}>
                        <h4>Дополнительная информация</h4>
                        <Button
                            className="mb-3"
                            variant="primary"
                            onClick={() => addInfo()}
                        >
                            Добавить
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название характеристики..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title && <b style={{ color: "red" }}>Введите название</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание характеристики..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description && <b style={{ color: "red" }}>Введите описание</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="dark"
                                        onClick={() => deleteInfo(item.id)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить</Button> : <Button onClick={putArtwork}>Обновить</Button>}
                            <Button className="ml-5" variant="dark" onClick={handleShow}>Удалить</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить {artworkCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteArtwork}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default ArtworkPageEdit;

