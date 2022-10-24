import React, { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';

const OrdersList = ({ handleClick, error, orders, loading }) => {
  const [pagOrders, setPageOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const maxItems = 5;
    const pagesCount = Math.ceil((orders.length / maxItems));
    const newPages = []
    for (let i = 1; i <= pagesCount; i++) {
      newPages.push(i);
    }
    const start = (activePage - 1) * maxItems;
    const newOrders = orders.slice(start, start + maxItems)
    setPages(newPages)
    setPageOrders(newOrders);
  }, [activePage, orders])

  return (
    <div className='order-list mt-3'>
      <h2 className="h2">Pedidos Realizados</h2>
      {error ? <h4>{error}</h4> : ''}
      {orders.length < 1 && !loading? <h3 className='h3'>No ha realizado ningun pedido por el momento</h3> : ''}
      {loading? <Spinner animation="border" variant="primary" />:null}
      <div className='p-2 mx-auto mw'>
        {pagOrders.map(order => {
          return (
            <div key={order.fid} className='d-flex flex-wrap alert alert-success m-auto mt-2 order'>
              <div className="p-2 text-start flex-fill">Order ID: {order.fid}</div>
              <div className="p-2 text-start flex-fill">Fecha de compra: {new Date(order.date.seconds * 1000).toLocaleDateString()}</div>
              <button onClick={() => handleClick(order.fid)} className="btn btn-primary">Ver Compra</button>
            </div>
          )
        })}
        <Pagination className='mt-2'>
          {pages.map((number) => {
            return (<Pagination.Item onClick={() => setActivePage(number)} key={number} active={number === activePage}>{number}</Pagination.Item>)
          })}
        </Pagination>
      </div>
    </div>
  );
}

export { OrdersList };
