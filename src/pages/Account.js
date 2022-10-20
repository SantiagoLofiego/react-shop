import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "../components/OrdersList";
import { AppContext } from "../context/AppContext";
import { simpleQuery } from "../firebase/firestore";


const Account = () => {
  const { userState } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    simpleQuery('orders', 'email', '==', userState.user.email, 'date')
      .then(resp => setOrders(resp))
      .catch(e => setError(e))
  }, [userState.user.email])

  const handleClick = (id) => {
    navigate(`/checkout/${id}`)
  }

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="m-5">
        <Tab eventKey="orders" title="Orders">
          <OrdersList orders={orders} error={error} handleClick={handleClick} />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <h3>Profile Settings</h3>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

export { Account }