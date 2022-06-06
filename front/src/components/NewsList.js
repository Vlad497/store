import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import NewsItem from "./NewsItem";

const NewsList = observer(() => {
    const { news } = useContext(Context);

    return (
        <Row className="d-flex mb-5">
            {news.news.map(news =>
                <NewsItem key={news.id} news={news} />
            )}
        </Row>
    );
});

export default NewsList;
