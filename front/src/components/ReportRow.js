import React, { useEffect, useState } from 'react';
import { Table, Spinner } from "react-bootstrap";
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
        /*  <tr>
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {id}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {createdAt}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {customerName}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {descr.name}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {descr.price}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {count}</td >
                     )
                 })
 
             }
             {
                 order?.artworks.map(({ count, descr }, i) => {
                     return (
                         <td key={i}> {count * descr.price}</td >
                     )
                 })
 
             }
 
         </tr> */

    )
};

export default ReportRow;