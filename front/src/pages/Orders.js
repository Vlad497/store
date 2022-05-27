import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Dropdown, ListGroup, Pagination, Row, Spinner, Card, Button } from "react-bootstrap";
import { fetchOrders } from "../http/ordersAPI";
import ItemOneOrderInAdmin from "../components/itemOneorderInAdmin";
import Report from "../components/Report";
import ReactToPrint from 'react-to-print';

const Orders = () => {
    const componentRef = useRef();

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState("Все заказы");
    const [rerender, setRerender] = useState(false);
    const [report, setReport] = useState(false);

    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];

    useEffect(() => {
        fetchOrders({ limit, page: 1 }).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchOrders({ limit, page: currentPage }).then(data => {
            setOrders(data);
            setLoading(false);
        })
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        fetchOrders({ limit, page: 1, complete: filter }).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [filter]);

    useEffect(() => {
        setLoading(true);
        fetchOrders({ limit, page: currentPage, complete: filter }).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [rerender]);

    const showReport = (show) => {
        setReport(show);
    }

    const reRender = () => {
        setRerender(!rerender);
    }

    if (loading) {
        return <Spinner animation="grow" />
    }

    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    if (report) {
        return (
            <div>
                <div className='d-flex justify-content-between mt-5 mb-1'>
                    <Button onClick={() => showReport(false)}>Закрыть</Button>
                    <ReactToPrint
                        trigger={() => <button>Печать</button>}
                        content={() => componentRef.current}
                    />
                </div>
                <Card className='d-flex flex-column justify-content-center'>
                    <Report ref={componentRef} />
                </Card>
            </div>
        )
    } else {
        return (

            <Container className="d-flex flex-column">
                <Row>
                    <Col><Button onClick={() => showReport(true)}>Отчёт</Button></Col>
                    <Col xs={12} className="mt-3 d-flex justify-content-center align-items-center">
                        <div className="mr-3" style={{ color: "white" }}>Фильтр:</div>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {filter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {filter === "все заказы" ? <Dropdown.Item disabled>Все заказы</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Все заказы")}>Все заказы</Dropdown.Item>}
                                {filter === "Выполненные" ? <Dropdown.Item disabled>Выполненные</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Выполненные")}>Выполненные</Dropdown.Item>}
                                {filter === "Не выполненные" ? <Dropdown.Item disabled>Невыполненные</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Не выполненные")}>Невыполненные</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <ListGroup>
                    {orders.rows?.map(({ id, complete, mobile, name, address, createdAt, updatedAt, userId }) =>
                        <ItemOneOrderInAdmin
                            key={id}
                            id={id}
                            complete={complete}
                            mobile={mobile}
                            name={name}
                            address={address}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            userId={userId}
                            reRender={reRender} />)}
                </ListGroup>
                <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
                    {pages}
                </Pagination>
            </Container>
        );
    };
}

export default Orders;
