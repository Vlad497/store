import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from "react-bootstrap";
import { deleteAuthor, deleteType, fetchAuthors, fetchTypes } from "../../http/artworkAPI";

const DeleteAuthorOrType = ({ show, onHide, showSuccessMsgFunc }) => {
    const [authorOrType, setAuthorOrType] = useState("Автор");
    const [authors, setAuthors] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectAuthor, setSelectAuthor] = useState({ name: "Автор не выбран" });
    const [selectType, setSelectType] = useState({ name: "Тип не выбран" });
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchAuthors().then(data => setAuthors(data));
    }, []);

    const Delete = async () => {
        if (authorOrType === "Автор") {
            if (selectAuthor.name !== "Автор не выбран") {
                await deleteAuthor(selectAuthor.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectAuthor({ name: "Автор не выбран" });
                });
            } else {
                setMsgErr("Выберите автора");
                setShowMsgErr(true);
            }
        } else {
            if (selectType.name !== "Тип не выбран") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({ name: "Тип не выбран" });
                });
            } else {
                setMsgErr("Выберите тип");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectAuthor, authorOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Удаление типа или автора из списков
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{ color: "red", textAlign: "center" }}>{msgErr}</p>
                    </>
                }

                Выбрать категорию:
                <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {authorOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {authorOrType === "Автор" ? <Dropdown.Item disabled>Автор</Dropdown.Item> : <Dropdown.Item onClick={() => setAuthorOrType("Автор")}>Автор</Dropdown.Item>}
                        {authorOrType === "Тип" ? <Dropdown.Item disabled>Тип</Dropdown.Item> : <Dropdown.Item onClick={() => setAuthorOrType("Тип")}>Тип</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Выбрать {authorOrType === "Автор" ? "автор" : "тип"}
                <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {authorOrType === "Автор" ? selectAuthor.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {authorOrType === "Автор" ?
                            authors.map(({ id, name }) =>
                                selectAuthor.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item key={id} onClick={() => setSelectAuthor({ id, name })}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({ id, name }) =>
                                selectType.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item key={id} onClick={() => setSelectType({ id, name })}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button className='mr-3' variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAuthorOrType;
