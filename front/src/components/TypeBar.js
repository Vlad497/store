import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { artwork } = useContext(Context);

    const getAllArtworks = () => {
        artwork.setSelectedType("all");
        artwork.setSelectedAuthor("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{ cursor: "pointer", background: "transparent", color: "white" }}
                active={"all" === artwork.selectedType}
                onClick={getAllArtworks}
                className="p-1 mb-5"
            >
                Весь каталог
            </ListGroup.Item>
            {artwork.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer", background: "transparent", color: "white" }}
                    active={type.id === artwork.selectedType.id}
                    key={type.id}
                    onClick={() => artwork.setSelectedType(type)}
                    className="p-1"
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
