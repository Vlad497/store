import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { getOneOrderArtworks } from "../http/ordersAPI";

const ReportRow = ({ id, createdAt, customerName }) => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderArtworks(id).then(data => {
            setOrder(data);
            setLoading(false);
        })
    }, []);


    if (loading) {
        return <Spinner animation="grow" />
    }



    return (
        <tbody>
            {order?.artworks.map(({ count, descr }, i) => {
                return (
                    <tr key={i}>
                        <td > {id}</td >
                        <td > {createdAt}</td >
                        <td > {customerName}</td >
                        <td > {descr.name}</td >
                        <td > {descr.price}</td >
                        <td > {count}</td >
                        <td > {count * descr.price}</td >
                    </tr>

                )
            })}
        </tbody>
    )
};

export default ReportRow;