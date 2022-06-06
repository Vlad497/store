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

import CreateNews from "../components/modals/CreateNews";
import { getAllNewsInAdminPage } from "../http/newsAPI";
import { NavLink } from "react-router-dom";
import { NEWS_EDIT_ROUTE } from "../utils/consts";

const NewsPageAdmin = () => {
    const [newsVisible, setNewsVisible] = useState(false);

    const [searchNews, setSearchNews] = useState('');
    const [searchedNews, setSearchedNews] = useState([]);
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
        getAllNewsInAdminPage(searchNews, currentPage, filter).then(({ count, rows }) => {
            setSearchedNews(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllNewsInAdminPage(searchNews, 1, filter).then(({ count, rows }) => {
            setSearchedNews(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchNews = () => {
        getAllNewsInAdminPage(searchNews, currentPage, filter).then(({ count, rows }) => {
            setSearchedNews(rows);
            setCount(count)
        })
    };

    return (
        <Container className="d-flex">
            <Row >
                <Col md={3} className="d-flex flex-column">
                    {showSuccessMsg && <p>{successMsg}</p>}
                    <Button
                        onClick={() => setNewsVisible(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Добавить новость
                    </Button>
                    <CreateNews show={newsVisible} onHide={() => setNewsVisible(false)} />
                </Col>
                <Col md={8}>
                    <InputGroup className="mb-3 mt-5" >
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchNews}
                            onChange={e => setSearchNews(e.target.value)}
                            placeholder="Введите заголовок новостей"
                        />
                        <Button
                            onClick={fetchNews}
                            variant="primary"
                            className="ml-2"
                        >
                            Найти
                        </Button>
                    </InputGroup >

                    <ListGroup>
                        {searchedNews && searchedNews.map(({ id, img, name }) => {
                            return (
                                <ListGroup.Item className="mt-3" key={id}>
                                    <Row>
                                        <Col xs={3}>
                                            <Image width={"100%"} src={"http://localhost:5000/" + img} />
                                        </Col>
                                        <Col xs={8}>
                                            <Row>
                                                <Col xs={12}>
                                                    <NavLink to={NEWS_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Название: {name}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={2}>
                                            <NavLink to={NEWS_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Pagination activeLabel={""} size="sm" className="mt-4 mb-4 justify-content-center" style={{ margin: "0 auto" }}>
                        {searchedNews && searchedNews.length > 0 ? pages : false}
                    </Pagination>
                </Col>
            </Row>

        </Container >
    );
};

export default NewsPageAdmin;
