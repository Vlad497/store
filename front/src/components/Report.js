import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button } from "react-bootstrap";
import { fetchOrders, getOneOrderArtworks } from "../http/ordersAPI";
import ReportRow from "../components/ReportRow";

const Report = React.forwardRef((props, ref) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);


    const limit = 5;

    useEffect(() => {
        fetchOrders({ limit, page: 1 }).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
        })
    }, []);

    useEffect(() => {
        {
            let count1 = 0;
            let total1 = 0;
            orders.rows?.map(({ id }) => {
                getOneOrderArtworks(id).then(data => {
                    data?.artworks.map(({ count, descr }, i) => {
                        count1 += count;
                        total1 += count * descr.price;
                    })
                    setCount(count1);
                    setTotal(total1);
                })
            })

        }

    }, [loading, showTotal]);



    if (loading) {
        return <Spinner animation="grow" />
    }

    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    return (
        <div ref={ref} className='d-flex flex-column align-items-center'>
            {
                !showTotal ? <Button variant="dark" onClick={() => setShowTotal(true)}>
                    Вывести итог
                </Button> : ""
            }
            <h3 className='mt-5 mb-3'>Отчёт о заказах</h3>
            <h4 className='align-self-start mb-3'>Дата: {new Date().toLocaleString()}</h4>
            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th width="170">Заказ №</th>
                        <th width="500">Дата</th>
                        <th width="1000">Заказчик</th>
                        <th width="1000">Название произведения искусства</th>
                        <th width="170">Цена, BYN</th>
                        <th width="170">Количество</th>
                        <th width="170">Сумма, BYN</th>
                    </tr>
                </thead>
                {orders.rows?.map(({ id, createdAt, name }) => {
                    return (
                        <ReportRow
                            key={id}
                            id={id}
                            createdAt={formatDate(createdAt)}
                            customerName={name}
                        />
                    )
                })}

                {
                    showTotal ?
                        <tfoot>
                            <td colSpan="5">Итог:</td>
                            <td>{count}</td>
                            <td>{total}</td>
                        </tfoot> : ""
                }
            </Table>
        </div >
    );
})

export default Report;