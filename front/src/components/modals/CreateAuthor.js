import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createAuthor } from "../../http/artworkAPI";

const CreateAuthor = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const addAuthor = () => {
        createAuthor({ name: value }).then(data => {
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
                    Добавление автора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите автора"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='mr-3' variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={() => addAuthor()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAuthor;
