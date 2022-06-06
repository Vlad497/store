import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Dropdown } from "react-bootstrap";

const AuthorBar = observer(() => {
    const [selectAuthor, setSelectAuthor] = useState({});
    const { artwork } = useContext(Context);
    return (
        <div>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle style={{ background: "transparent", color: "white" }}>{selectAuthor.name || "Выбрать автора"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {artwork.authors.map(author => {
                        return author.name === selectAuthor.name ?
                            <Dropdown.Item
                                key={author.id}
                                disabled
                            >
                                {author.name}
                            </Dropdown.Item>
                            :
                            <Dropdown.Item
                                key={author.id}
                                onClick={() => {
                                    artwork.setSelectedAuthor(author)
                                    setSelectAuthor(author)
                                }}
                            >
                                {author.name}
                            </Dropdown.Item>

                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>


    );
});

export default AuthorBar;
