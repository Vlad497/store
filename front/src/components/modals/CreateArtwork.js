import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../index";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { createArtwork, fetchAuthors, fetchTypes } from "../../http/artworkAPI";
import { observer } from "mobx-react-lite";

const CreateArtwork = observer(({ show, onHide }) => {
    const { artwork } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => artwork.setTypes(data));
        fetchAuthors().then(data => artwork.setAuthors(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addArtwork = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('authorId', artwork.selectedAuthor.id);
        formData.append('typeId', artwork.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createArtwork(formData).then(() => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title closeButton>
                    Добавление произведения искусства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{artwork.selectedType.name || "Выбрать тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {artwork.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => artwork.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{artwork.selectedAuthor.name || "Выбрать автора"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {artwork.authors.map(author =>
                                <Dropdown.Item
                                    key={author.id}
                                    onClick={() => artwork.setSelectedAuthor(author)}
                                >
                                    {author.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название произведения искусства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость произведения искусства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        className="mb-4"
                        variant="outline-dark"
                        onClick={() => addInfo()}
                    >
                        Дополнительная информация
                    </Button>
                    {info.map(item =>
                        <Row key={item.number} className="mt-3">
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Название характеристики"
                                    value={item.title}
                                    onChange={e => changeInfo('title', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Описание характеристики"
                                    value={item.description}
                                    onChange={e => changeInfo('description', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => deleteInfo(item.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='mr-3' variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addArtwork}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateArtwork;
