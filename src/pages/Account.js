import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "../components/OrdersList";
import Profile from "../components/Profile";
import { AppContext } from "../context/AppContext";
import { simpleQuery } from "../firebase/firestore";


const Account = () => {
  const { userState, updateUser } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user.authenticated) {
      setLoading(true);
      simpleQuery('orders', 'email', '==', userState.user.email, 'date')
        .then(resp => {
          setOrders(resp);
          setLoading(false);
        })
        .catch(e => setError(e))
    }

  }, [userState.user])

  const handleClick = (id) => {
    navigate(`/checkout/${id}`)
  }

  return (
    <React.Fragment>
      {userState.user.authenticated ?
        <div className="container">
          <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="">
            <Tab eventKey="orders" title="Compras">
              <OrdersList orders={orders} error={error} handleClick={handleClick} loading={loading} />
            </Tab>
            <Tab eventKey="profile" title="Perfil">
              <Profile userState={userState} updateUser={updateUser} />
            </Tab>
          </Tabs>
        </div>
        : <h3 className="h3 m-5 p-5">Debes estar logueado para ver la información de tu cuenta</h3>
    }

    </React.Fragment>
  )
}

export { Account }