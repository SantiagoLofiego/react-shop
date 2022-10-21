import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "../components/OrdersList";
import Profile from "../components/Profile";
import { AppContext } from "../context/AppContext";
import { simpleQuery } from "../firebase/firestore";


const Account = () => {
  const { userState } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userState.user)
    setLoading(true);
    simpleQuery('orders', 'email', '==', userState.user.email, 'date')
      .then(resp => {
        setOrders(resp);
        setLoading(false);
      })
      .catch(e => setError(e))
  }, [userState.user.email])

  const handleClick = (id) => {
    navigate(`/checkout/${id}`)
  }

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="">
        <Tab eventKey="orders" title="Compras">
          <OrdersList orders={orders} error={error} handleClick={handleClick} loading={loading} />
        </Tab>
        <Tab eventKey="profile" title="Perfil">
          <Profile user={userState.user} />
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

export { Account }