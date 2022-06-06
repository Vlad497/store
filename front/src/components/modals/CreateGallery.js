import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createGallery } from "../../http/galleryAPI";
import { observer } from "mobx-react-lite";

const CreateGallery = observer(({ show, onHide }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState("");
    const [artworkIds, setArtworkIds] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addGallery = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', file);
        formData.append('address', address);
        formData.append('artworkIds', artworkIds);
        createGallery(formData).then(() => onHide());
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
                    Добавление галереи
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
                        placeholder="Введите название галереи"
                    />
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Введите адрес галереи"
                    />
                    <Form.Control
                        value={artworkIds}
                        onChange={e => setArtworkIds(e.target.value)}
                        className="mt-3"
                        placeholder="Введите id шедевров через пробел"
                    />
                    <textarea
                        style={{ width: "100%", minHeight: "200px", maxHeight: "400px" }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание галереи"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='mr-3' variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addGallery}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGallery;
