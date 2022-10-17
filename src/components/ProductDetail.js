import React from 'react'
import { Row, Col, Button} from 'react-bootstrap';

const ProductDetail = ({item}) => {
  return (
    <div className='m-3'>
        <Row>
            <Col md={4}>
                <img src={item.image} alt={item.title} className="w-75 p-3" />
            </Col>

            <Col md={4}>
                <h3>{item.title}</h3>

                <h5>$ {item.price}</h5>
            </Col>

            <Col md={4} className="border border-1 rounded mb-2">

                    <div className='d-flex flex-column justify-content-center'>  
                        {/* <Link className='mt-3' to='/' > */}
                        <div className='mt-3'>
                            <Button>
                                Continuar Compra
                            </Button>
                        </div>
                        {/* </Link> */}
                        {/* <Link className='mt-3' to='/cart'> */}
                        <div className='mt-3'>    
                            <Button >
                                Terminar Compra
                            </Button>
                        {/* </Link> */}
                        </div>
                    </div>
        

            </Col>
        </Row>
    </div>
  )
}

export default ProductDetail