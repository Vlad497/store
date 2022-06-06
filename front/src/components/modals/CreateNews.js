import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createNews } from "../../http/newsAPI";
import { observer } from "mobx-react-lite";

const CreateNews = observer(({ show, onHide }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addNews = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', file);
        createNews(formData).then(() => onHide());
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
                    Добавление новости
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите заголовок новостей"
                    />
                    <textarea
                        style={{ width: "100%", minHeight: "200px", maxHeight: "400px" }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание новостей"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='mr-3' variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addNews}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateNews;
