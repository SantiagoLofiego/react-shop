import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import InnerImageZoom from 'react-inner-image-zoom';
import { FaTruck } from 'react-icons/fa';
import ItemCount from './ItemCount';
import '../styles/ProductDetail.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const ProductDetail = ({ item }) => {
    const [isCount, setIsCount] = useState(false);
    const { cartDispatcher } = React.useContext(AppContext);
    const onAdd = (count) => {
        const qty = count;
        cartDispatcher({ type: 'ADD_TO_CART', payload: item, qty: qty });
        setIsCount(true);
    }

    return (
        <div>
            <Breadcrumb className='container mt-2'>
                <Breadcrumb.Item className='text-decoration-none'><Link to={'/'}>Volver al listado</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='container mt-3 shadow-sm p-3 mb-5 bg-body rounded'>
                <Row>
                    <Col md={4}>
                        <InnerImageZoom
                            src={item.image || ''}
                            zoomSrc={item.image}
                            fullscreenOnMobile={true}
                        />
                    </Col>

                    <Col md={4}>
                        <h3>{item.title}</h3>

                        <h5>$ {item.price}</h5>

                        <p className="card-text mt-2">
                            {item.longDescription}
                        </p>
                    </Col>

                    <Col md={4} className="border border-1 rounded mb-2">

                        <div className='d-flex justify-content-center flex-column'>
                            <p className="card-text mt-2 fw-bold fs-4">
                                {item.shortDescription}
                            </p>
                            <span className='mt-2'>
                                <FaTruck /> Envío a todo el país
                            </span>
                            {item.stock > 0 ?
                                <span className='fw-bolder mt-2'>
                                    {`Stock Disponible: ${item.stock}`}
                                </span>
                                :
                                <span className='fw-bolder mt-2'>
                                    Sin Stock
                                </span>
                            }
                        </div>

                        {isCount ?
                            <div className='d-flex flex-column justify-content-center'>
                                <div className='mt-3'>
                                    <Link className='mt-3' to='/' >
                                        <Button>
                                            Continuar Compra
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            :
                            <div className='d-flex flex-column justify-content-center'>
                                <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                            </div>
                        }


                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default ProductDetail