import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "../index";


const NewsPage = observer(() => {
    const { user } = useContext(Context);

    return (
        <Container>Новости</Container>
    );
});

export default NewsPage;
