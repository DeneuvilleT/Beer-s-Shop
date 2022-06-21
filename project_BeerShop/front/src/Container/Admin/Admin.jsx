import { displayOrder, timerMsg } from '../../utilities/utilities';
import { useState, useEffect } from 'react';
import { removeItem } from '../../api/user';
import { setHeaders } from '../../api/log';
import { URL } from '../../config';

import AddProduct from '../AddProduct/AddProduct';
import styles from '../Admin/admin.module.css';
import Order from '../Order/Order';
import dayjs from 'dayjs';


const Admin = () => {
  
  const [products, setProducts] = useState([]);
  const [orders,     setOrders] = useState([]);
  const [detail,     setDetail] = useState([]);
  const [users,       setUsers] = useState([]);
  const [msg,           setMsg] = useState('');


  useEffect(() => {
    recupAllDatas();
  }, []);


  const recupAllDatas = async () => {
    const datas = await setHeaders(`${URL}/admin`);

    setProducts(data => [...data, ...datas[1]]);
    setOrders(data =>   [...data, ...datas[2]]);
    setUsers(data =>    [...data, ...datas[0]]);
    return

  };


  const executeFunc = async (e, func, item, id) => {
    e.preventDefault();
    const req = await func(item, id);

    if (req.status === 401) {
      timerMsg(setMsg, req.msg);
      return

    } else {
      timerMsg(setMsg, req.msg);
      setOrders  ([]);
      setUsers   ([]);
      setProducts([]);
      recupAllDatas(); 
      return

    };
  };


  return (
    <main className={styles.admin}>

      <h2>Administration</h2>
      <hr />

{/* Display Customers */}

      <h3>Clients</h3>

      <section>

        {users?.map(user =>
          <article key={user.id}>
            <p><strong>{user.email}</strong></p>
            <h3>{user.lastname} {user.firstname}</h3>
            <address>
              <p>{user.adress}</p>
              <p>{user.city} <strong>{user.zip_code}</strong></p>
              <p>{user.status}</p>
            </address>
          </article>
        )}

      </section>

      <aside>
        {msg !== '' ? <p className='msg' >{msg}</p> : <p></p>}
      </aside>

{/* Display Products */}
      
      <hr />
      <h3>Produits</h3>

      <section>

        <AddProduct />
        {products?.map(product =>
          <article key={product.id}>
            <h3>{product.title.substring(0, 20)}</h3>
            <p>{product.description.substring(0,20)}...</p>
            <p><strong>Contenant : </strong>{product.container}</p>
            <p><strong> Prix : </strong> {product.price.toFixed(2)} €</p>
            <button onClick={(e) => { executeFunc(e, removeItem, 'product', product.id) }} >x</button>
          </article>
        )}

      </section>

{/* Display Orders*/}

      <hr />
      <h3>Commandes</h3>

      <section>

        {orders?.map(order =>
          <article key={order.id}>
            <h3>Commande numéro : {order.id}</h3>
            <address>
              <p>{order.status}</p>
              <p>{dayjs(order.order_date).format('DD MMM YYYY')}</p>
              <a href='' onClick={(e) => { displayOrder(e, setDetail, order.id) }}>detail de la commande</a>
            </address>
            <button onClick={(e) => { executeFunc(e, removeItem, 'order', order.id) }} >x</button>
          </article>
        )}

      </section>
      
{/* Display Order Detail*/}

      <section>

        {detail.length !== 0 ? < Order data={detail} /> : <></>}

        {detail.length !== 0 ?
          <button onClick={() => { setDetail([]) }}>
            Masquer la facture</button> :
          <></>}

      </section>

    </main>)
};

export default Admin;