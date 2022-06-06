import React from 'react';
import { Card, Col, Image } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';
import { NEWS_ROUTE, NEWS_PAGE_ROUTE } from "../utils/consts";

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


const NewsItem = ({ news }) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(NEWS_ROUTE + NEWS_PAGE_ROUTE + '/' + news.id)}
            className="p-0 d-flex flex-row mb-5"
            style={{ cursor: "pointer", background: "transparent" }}
            border={"black"}
        >
            <Image style={{ width: "35%", height: "100%" }} src={"http://localhost:5000/" + news.img} />
            <div>
                <div style={{ color: "white" }} className="mt-1 ml-5"><h2>{news.name}</h2></div>
                <div style={{ color: "white" }} className="mt-1 ml-5">GalleroNews {formatDate(news.createdAt)}</div>
            </div>
        </Card>
    );
};

export default NewsItem;
