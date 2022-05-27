import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/artworkAPI";

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const addType = () => {
        createType({ name: value }).then(() => {
            setValue('')
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавление вида искусства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название вида"
                        onChange={e => setValue(e.target.value)}
                        value={value}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
