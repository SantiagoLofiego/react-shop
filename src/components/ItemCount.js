import React, { useState, useEffect } from 'react'
import { InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import '../styles/ItemCount.css';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    if (stock > 0) {
      disabledBtn('button-addon2', false)
      disabledBtn('cartBtn', false)
      disabledBtn('btnSubstract', false)
    } else {
      disabledBtn('button-addon2', true)
      disabledBtn('cartBtn', true)
      disabledBtn('btnSubstract', true)
    }
    if (count === 1) {
      disabledBtn('btnSubstract', true)
    } else if (count >= stock) {
      disabledBtn('button-addon2', true)
    } else {
      disabledBtn('button-addon2', false)
    }
  }, [count, stock])

  const disabledBtn = (btn, flag) => {
    const idButtonClass = document.getElementById(btn).classList
    flag ? idButtonClass.add("disabled") : idButtonClass.remove("disabled");
  }

  const addItem = () => {
    setCount(count + 1);
  }

  const substractItem = () => {
    setCount(count - 1);
  }

  const validateStock = () => {
    if (stock > count) {
      add();
    }
  }

  const add = () => {
    onAdd(count);
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
            placeholder={count}
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