import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateGallery from "../components/modals/CreateGallery";
import { getAllGalleryInAdminPage } from "../http/galleryAPI";
import { NavLink } from "react-router-dom";
import { GALLERY_EDIT_ROUTE } from "../utils/consts";

const GalleryPageAdmin = () => {
    const [galleryVisible, setGalleryVisible] = useState(false);

    const [searchGallery, setSearchGallery] = useState('');
    const [searchedGallery, setSearchedGallery] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    //pagination
    const limit = 3;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} activeLabel={""} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllGalleryInAdminPage(searchGallery, currentPage, filter).then(({ count, rows }) => {
            setSearchedGallery(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllGalleryInAdminPage(searchGallery, 1, filter).then(({ count, rows }) => {
            setSearchedGallery(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchGallery = () => {
        getAllGalleryInAdminPage(searchGallery, currentPage, filter).then(({ count, rows }) => {
            setSearchedGallery(rows);
            setCount(count)
        })
    };

    return (
        <Container className="d-flex">
            <Row >
                <Col md={3} className="d-flex flex-column">
                    {showSuccessMsg && <p>{successMsg}</p>}
                    <Button
                        onClick={() => setGalleryVisible(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Добавить галерею
                    </Button>
                    <CreateGallery show={galleryVisible} onHide={() => setGalleryVisible(false)} />
                </Col>
                <Col md={8}>
                    <InputGroup className="mb-3 mt-5" >
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchGallery}
                            onChange={e => setSearchGallery(e.target.value)}
                            placeholder="Введите название галереи"
                        />
                        <Button
                            onClick={fetchGallery}
                            variant="primary"
                            className="ml-2"
                        >
                            Найти
                        </Button>
                    </InputGroup >

                    <ListGroup>
                        {searchedGallery && searchedGallery.map(({ id, img, name }) => {
                            return (
                                <ListGroup.Item className="mt-3" key={id}>
                                    <Row>
                                        <Col xs={3}>
                                            <Image width={"100%"} src={"http://localhost:5000/" + img} />
                                        </Col>
                                        <Col xs={8}>
                                            <Row>
                                                <Col xs={12}>
                                                    <NavLink to={GALLERY_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Название: {name}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={2}>
                                            <NavLink to={GALLERY_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Pagination activeLabel={""} size="sm" className="mt-4 mb-4 justify-content-center" style={{ margin: "0 auto" }}>
                        {searchedGallery && searchedGallery.length > 0 ? pages : false}
                    </Pagination>
                </Col>
            </Row>

        </Container >
    );
};

export default GalleryPageAdmin;
