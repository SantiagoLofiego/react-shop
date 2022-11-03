import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "../components/OrdersList";
import Profile from "../components/Profile";
import { AppContext } from "../context/AppContext";
import { simpleQuery } from "../firebase/firestore";
import { useMountAnimation } from "../hooks/useMountAnimation";


const Account = () => {
  const { userState, updateUser } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const animated = useMountAnimation('anim-translateXstart', 'anim-translateXend')
 
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

  const handleCheckOrder = (id) => {
    console.log('TO ORDER ' + id)
    navigate(`/order/${id}`)
  }

  return (
    <React.Fragment>
      {userState.user.authenticated ?
        <div className={` container ${animated} `}>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="">
            <Tab eventKey="profile" title="Perfil">
              <Profile userState={userState} updateUser={updateUser} />
            </Tab>
            <Tab eventKey="orders" title="Compras">
              <OrdersList orders={orders} error={error} handleCheckOrder={handleCheckOrder} loading={loading} />
            </Tab>
          </Tabs>
        </div>
        : <h3 className="h3 m-5 p-5">Debes estar logueado para ver la información de tu cuenta</h3>
    }

    </React.Fragment>
  )
}

export { Account }