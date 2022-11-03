import React, { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';

const OrdersList = ({ handleCheckOrder, error, orders, loading }) => {
  const [pagOrders, setPageOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [fade, setFade] = useState('')

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

  const handleChangePage = (number) => {
    setFade('anim-pagination-start')
    setActivePage(number);
    setTimeout(() => setFade('anim-pagination-end'), 50)
  }

  return (
    <div className='order-list mt-3'>
      <h2 className="h2">Pedidos Realizados</h2>
      {error ? <h4>{error}</h4> : ''}
      {orders.length < 1 && !loading ? <h3 className='h3'>No ha realizado ningun pedido por el momento</h3> : ''}
      {loading ? <Spinner animation="border" variant="primary" /> : null}
      <div className={`p-2 mx-auto mw`}>
        <div className={fade}>
          {pagOrders.map(order => {
            return (
              <div key={order.fid} className='d-flex flex-wrap alert alert-success m-auto mt-2 order'>
                <div className="p-2 text-start flex-fill order-id">Order ID: {order.fid}</div>
                <div className="p-2 text-start flex-fill order-date">Fecha de compra: {new Date(order.date.seconds * 1000).toLocaleDateString()}</div>
                <button onClick={() => handleCheckOrder(order.fid)} className="btn btn-primary">Ver Compra</button>
              </div>
            )
          })}
        </div>
        <Pagination className='mt-2'>
          {pages.map((number) => {
            return (<Pagination.Item onClick={() => handleChangePage(number)} key={number} active={number === activePage}>{number}</Pagination.Item>)
          })}
        </Pagination>
      </div>
    </div>
  );
}

export { OrdersList };
