import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchNews } from "../http/newsAPI";
import PagesNews from "../components//PagesNews";

const News = observer(() => {
    const { news } = useContext(Context);

    useEffect(() => {
        fetchNews(1, 4).then(data => {
            news.setNews(data.rows);
            news.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            fetchNews(news.page, 4).then(data => {
                news.setNews(data.rows);
                news.setTotalCount(data.count);
            });
        }, [news.page],
    );

    return (
        <Container >
            <Row className="d-flex justify-content-center mb-2">
                <PagesNews />
            </Row>
            <Row >
                <Col md={10}>
                    <NewsList />
                </Col>
            </Row>

        </Container >
    );
});

export default News;
