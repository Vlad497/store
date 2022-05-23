import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, ListGroup } from "react-bootstrap";

const AuthorBar = observer(() => {
    const { artwork } = useContext(Context);
    return (
        <ListGroup>
            {artwork.authors.map(author =>
                <ListGroup.Item
                    style={{ cursor: "pointer", background: "transparent", color: "white" }}
                    active={author.id === artwork.selectedAuthor.id}
                    key={author.id}
                    onClick={() => artwork.setSelectedAuthor(author)}
                    className="p-1"
                >
                    {author.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default AuthorBar;
