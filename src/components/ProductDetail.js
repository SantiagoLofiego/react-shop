import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import InnerImageZoom from 'react-inner-image-zoom';
import { FaTruck } from 'react-icons/fa';
import ItemCount from './ItemCount';
import '../styles/ProductDetail.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import { AppContext } from '../context/AppContext';

const ProductDetail = ({ item }) => {
    const [isCount, setIsCount] = useState(false);
    const { cartDispatcher } = React.useContext(AppContext);

    const onAdd = (count) => {
        const qty = count;
        cartDispatcher({ type: 'ADD_TO_CART', payload: item }, qty);
        setIsCount(true);
    }

    return (
        <div>
            <Breadcrumb className='container mt-2'>
                <Breadcrumb.Item href="/" className='text-decoration-none'>Volver al listado</Breadcrumb.Item>
                <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='container mt-3 shadow-sm p-3 mb-5 bg-body rounded'>
                <Row>
                    <Col md={4}>
                        <InnerImageZoom
                            src={item.image}
                            zoomSrc={item.image}
                            fullscreenOnMobile={true}
                        />
                    </Col>

                    <Col md={4}>
                        <h3>{item.title}</h3>

                        <h5>$ {item.price}</h5>
                    </Col>

                    <Col md={4} className="border border-1 rounded mb-2">

                        <div className='d-flex justify-content-center flex-column'>
                            <span className='mt-2'>
                                <FaTruck /> Envío a todo el país
                            </span>
                            {item.stock > 0 ?
                                <span className='fw-bolder mt-2'>
                                    Stock Disponible
                                </span>
                                :
                                <span className='fw-bolder mt-2'>
                                    Sin Stock
                                </span>
                            }
                        </div>

                        {isCount ?
                            <div className='d-flex flex-column justify-content-center'>
                                {/* <Link className='mt-3' to='/' > */}
                                <div className='mt-3'>
                                    <Button>
                                        Continuar Compra
                                    </Button>
                                    {/* </Link> */}
                                    </div>
                                    {/* <Link className='mt-3' to='/cart'> */}
                                    <div className='mt-3'>
                                        <Button >
                                            Terminar Compra
                                        </Button>
                                    </div>
                                    {/* </Link> */}
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