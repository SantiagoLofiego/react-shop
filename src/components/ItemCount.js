import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {InputGroup, Button, FormControl, Row, Col} from 'react-bootstrap';
import {GrFormAdd, GrFormSubtract} from "react-icons/gr";
import '../styles/ItemCount.css';

const ItemCount = ({stock, initial, onAdd}) => {
    const [count, setCount] = useState(initial);


    const addItem = ()=>{
        const aux = stock - count;
        if (aux > 0) {
            document.getElementById('cartBtn').classList.remove("disabled");
            setCount(count + 1);
        }else{
            document.getElementById('cartBtn').classList.add("disabled");
            setCount(count + 1);
        }
    }
    const substractItem = ()=>{

        if (count > 0 || stock <= count) {
            document.getElementById('cartBtn').classList.remove("disabled");
            setCount(count - 1);
            if(count === 1){
                document.getElementById('btnSubstract').classList.add("disabled");
                setCount(1);
                document.getElementById('btnSubstract').classList.remove("disabled");
            }
        }else{
            document.getElementById('cartBtn').classList.add("disabled");
            setCount(count - 1);
        }
    }

    const add = ()=>{
        onAdd(count);
    }

    const validateStock = ()=>{
        if (stock >= count) {
            document.getElementById('cartBtn').classList.remove("disabled");
            add();    
        }else{
            document.getElementById('cartBtn').classList.add("disabled");
        }
    }
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <InputGroup id="form-count" className="mb-2">
            <Button variant="outline-secondary" id="btnSubstract" onClick={substractItem}>
                <GrFormSubtract></GrFormSubtract>
            </Button>
            <FormControl
            id="countInput"
            value={count}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={addItem}>
                <GrFormAdd></GrFormAdd>
            </Button>
        </InputGroup>
        </div>

        <Row>
            <Col>
                <Button id='cartBtn' onClick={validateStock}>
                    Agregar al Carrito
                </Button>

            </Col>
        </Row>
    </div>
  )
}

export default ItemCount