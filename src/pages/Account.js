import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { simpleQuery } from "../firebase/firestore";


const Account = () => {
  const {userState} = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    simpleQuery('orders','email','==', userState.user.email,'date')
    .then(resp => setOrders(resp))
    .catch(e => setError(e) )
  },[userState.user.email])

  const handleClick = (id) =>{
    navigate(`/checkout/${id}`)
  }

  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="orders"
        id="uncontrolled-tab-example"
        className="m-5"
      >
        <Tab eventKey="orders" title="Orders">
          <h2 className="h2">Pedidos Realizados</h2>
          {error? <h4>{error}</h4> : ''}
          {orders.length<1? <h3>No ha realizado ningun pedido por el momento</h3>:''}
          {orders.map(order =>{
            return (
              <div key={order.fid} className='d-flex alert alert-success m-auto mt-2 order'>
                <div className="p-2 text-start flex-fill">Order ID: {order.fid}</div>
                <div className="p-2 text-start flex-fill">Fecha de compra: {new Date(order.date.seconds * 1000).toLocaleDateString()}</div>
                <button onClick={()=>handleClick(order.fid)} className="btn btn-primary">Ver Compra</button>
              </div>
            )
          })}
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <h3>Profile Settings</h3>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

export { Account }