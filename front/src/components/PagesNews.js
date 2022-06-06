import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const PagesNews = observer(() => {
    const { news } = useContext(Context);
    const pageCount = Math.ceil(news.totalCount / news.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    style={{ color: "white" }}
                    key={page}
                    activeLabel={""}
                    active={news.page === page}
                    onClick={() => news.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default PagesNews;
