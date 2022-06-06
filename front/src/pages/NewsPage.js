import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneNews } from "../http/newsAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const NewsPage = observer(() => {
    const [news, setNews] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        fetchOneNews(id).then(data => {
            setNews(data)
        });
    }, [id]);

    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("ru-RU", options);
    }

    return (
        <Card className="mt-3">
            <Row>
                <Col md={12}>
                    <Image height={400} width={"100%"} src={'http://localhost:5000/' + news.img} />
                </Col>
            </Row>
            <Row className="d-flex flex-column align-items-start m-1 mt-3 mb-5" style={{ fontWeight: "bold" }}>
                <h1>{news.name}</h1>
                <div className="mt-2">GalleroNews <span style={{ fontWeight: "lighter" }} >{formatDate(news?.createdAt)}</span></div>
            </Row>
            <Row className="d-flex flex-column m-1" style={{ fontSize: "1.5em" }}>
                {news.description}
            </Row>
        </Card >
    );
});

export default NewsPage;

