import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateArtwork from "../components/modals/CreateArtwork";
import CreateAuthor from "../components/modals/CreateAuthor";
import CreateType from "../components/modals/CreateType";
import { getAllArtworksInAdminPage } from "../http/artworkAPI";
import { NavLink } from "react-router-dom";
import { ARTWORK_EDIT_ROUTE } from "../utils/consts";
import DeleteAuthorOrType from "../components/modals/DeleteAuthorOrType";

const Admin = () => {
    const [authorVisible, setAuthorVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [artworkVisible, setArtworkVisible] = useState(false);
    const [deleteAuthorOrType, setDeleteAuthorOrType] = useState(false);

    const [searchArtwork, setSearchArtwork] = useState('');
    const [searchedArtwork, setSearchedArtwork] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllArtworksInAdminPage(searchArtwork, currentPage, filter).then(({ count, rows }) => {
            setSearchedArtwork(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllArtworksInAdminPage(searchArtwork, 1, filter).then(({ count, rows }) => {
            setSearchedArtwork(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchArtwork = () => {
        getAllArtworksInAdminPage(searchArtwork, currentPage, filter).then(({ count, rows }) => {
            setSearchedArtwork(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex">
            <Row >
                <Col md={3} className="d-flex flex-column">
                    {showSuccessMsg && <p>{successMsg}</p>}
                    <Button
                        onClick={() => setTypeVisible(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Добавить вид искусства
                    </Button>
                    <Button
                        onClick={() => setAuthorVisible(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Добавить автора
                    </Button>
                    <Button
                        onClick={() => setArtworkVisible(true)}
                        variant="primary"
                        className="mt-4 p-2 align-self-stretch"
                    >
                        Добавить произведение искусства
                    </Button>
                    <Button
                        onClick={() => setDeleteAuthorOrType(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Удалить вид или автора
                    </Button>
                    <CreateArtwork show={artworkVisible} onHide={() => setArtworkVisible(false)} />
                    <CreateAuthor show={authorVisible} onHide={() => setAuthorVisible(false)} />
                    <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
                    <DeleteAuthorOrType show={deleteAuthorOrType} onHide={() => setDeleteAuthorOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc} />

                </Col>
                <Col md={8}>
                    <InputGroup className="mb-3 mt-5" >
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchArtwork}
                            onChange={e => setSearchArtwork(e.target.value)}
                            placeholder="Введите название произведения искусства"
                        />
                        <Button
                            onClick={fetchArtwork}
                            variant="primary"
                            className="ml-2"
                        >
                            Найти
                        </Button>
                    </InputGroup >

                    <ListGroup>
                        {searchedArtwork && searchedArtwork.map(({ id, img, author, type, price, name }) => {
                            return (
                                <ListGroup.Item className="mt-3" key={id}>
                                    <Row>
                                        <Col xs={3}>
                                            <Image width={"100%"} src={"http://localhost:5000/" + img} />
                                        </Col>
                                        <Col xs={8}>
                                            <Row>
                                                <Col xs={12}>
                                                    <NavLink to={ARTWORK_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Название: {name}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Цена: {price}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Автор: {author.name}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Вид: {type.name}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={2}>
                                            <NavLink to={ARTWORK_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Pagination activeLabel={""} size="sm" className="mt-4 mb-4 justify-content-center" style={{ margin: "0 auto" }}>
                        {searchedArtwork && searchedArtwork.length > 0 ? pages : false}
                    </Pagination>
                </Col>
            </Row>

        </Container >
    );
};

export default Admin;
