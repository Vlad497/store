import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeleteDevice, fetchOneDevice, updateDevices } from "../http/deviceAPI";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";


const DevicePageEdit = observer(() => {
    const { device } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [deviceCurr, setDeviceCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectBrand, setSelectBrand] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteDevice = () => {
        fetchDeleteDevice(id).then(() => {
            navigate(ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', id: Date.now() }]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? { ...i, [key]: value } : i));
    };

    const putDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('brandId', selectBrand.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateDevices(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for (let key in item) {
                if (key === "title" || key === "description") {
                    if (!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if (deviceCurr.info && deviceCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if (deviceCurr && deviceCurr.brand && deviceCurr.type) {
            if (deviceCurr.brand.name !== selectBrand.name ||
                deviceCurr.type.name !== selectType.name ||
                deviceCurr.name !== name ||
                deviceCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectBrand, selectType, price, img, info]);

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDeviceCurr(data);
            setSelectBrand(data.brand);
            setSelectType(data.type);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row>
                {msg}
            </Row>}

            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            id:
                        </Col>
                        <Col xs={11}>
                            {deviceCurr.id}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Бренд:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectBrand.name || "Choose Brand"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.brands.map(brand => {
                                        return brand.name === selectBrand.name ?
                                            <Dropdown.Item
                                                key={brand.id}
                                                disabled
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={brand.id}
                                                onClick={() => setSelectBrand(brand)}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Типы:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType.name || "Choose Type"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.types.map(type => {
                                        return type.name === selectType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Название:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{ color: "red" }}>Введите название товара</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Цена:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {price === 0 && <b style={{ color: "red" }}>Введите цену товара</b>}
                        </Col>
                    </Row>

                    {/*Name*/}
                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Текущее изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={150} src={'http://localhost:5000/' + deviceCurr.img} />
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center">
                            Новое изображение: <br />
                            <Image style={{ margin: "0 auto", marginTop: 15 }} width={150} src={img} />
                        </Col>}
                        <Col xs={3} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Upload file" onChange={imgHandler} />
                                </Form.Group>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <h4>Характеристики</h4>
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Добавить свойство
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название характеристики..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title && <b style={{ color: "red" }}>Введите название</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание характеристики..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description && <b style={{ color: "red" }}>Введите описание</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteInfo(item.number)}
                                    >
                                        Удалить свойство
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить товар</Button> : <Button onClick={putDevice}>Обновить товар</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить товар</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить товар {deviceCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteDevice}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default DevicePageEdit;

