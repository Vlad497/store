import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const PagesGallery = observer(() => {
    const { gallery } = useContext(Context);
    const pageCount = Math.ceil(gallery.totalCount / gallery.limit);
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
                    active={gallery.page === page}
                    onClick={() => gallery.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default PagesGallery;
