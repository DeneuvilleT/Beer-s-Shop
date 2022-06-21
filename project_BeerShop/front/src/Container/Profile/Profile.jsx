import { setHeaders, updateUser, updatePass } from '../../api/log';
import { useEffect, useState, useRef } from 'react';
import { faCircleUser, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { displayOrder, timerMsg } from '../../utilities/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL } from '../../config';

import AddForm from '../AddForm/AddForm';
import Order from '../Order/Order';
import dayjs from 'dayjs';
import styles from '../Profile/profile.module.css'


const Profile = () => {

   const { isLogged, infos } = useSelector((state) => state.auth);

   const [update, setUpdate] = useState(false);
   const [pass,     setPass] = useState(false);
   const [orders, setOrders] = useState([]);
   const [detail, setDetail] = useState([]);
   const [msg,       setMsg] = useState('');


   const fieldPass = useRef();
   const fields  = useRef([]);

   const logUpdate = inputElem => {
      if (inputElem && !fields.current.includes(inputElem)) {
         fields.current.push(inputElem);
      };
   };

   
   useEffect(() => {
     if(isLogged)recupOrders();
   }, [isLogged]);


   const recupOrders = async () => {
      const datas = await setHeaders(`${URL}/profile`);
      setOrders(data => [...data, ...datas]);
      return
   };


   const updateProfile = async (e, func, form) => {
      e.preventDefault();

      if (form.value === '') {
         timerMsg(setMsg, 'Aucune modification enregistrée');
         return
      };

      const res = await func(form, infos);
      timerMsg(setMsg, res.msg);
      return
   };



   return (
      <main className={styles.profile} >

         {isLogged ? <>
            <section>

{/* Update */}

               {!update ? <>
                  <address>
                     <h2>{infos.lastname} {infos.firstname}</h2>
                     <p>{infos.email}</p>
                     <p>{infos.adress}</p>
                     <p>{infos.city} {infos.zip_code}</p>
                     <button onClick={() => { update ? setUpdate(false) : setUpdate(true); setPass(false) }} >mettre à jour vos coordonnées</button>
                     <button onClick={() => { pass ? setPass(false) : setPass(true); setUpdate(false) }} >changer votre mot de passe</button>
                  </address>

                  {msg === '' ? <></> : <p className='msg' >{msg}</p>}
                  <FontAwesomeIcon icon={faCircleUser} size='8x' />
               </>
                  :
                  <section>
                     <AddForm title='Mise à jour de vos informations' reference={logUpdate} onsubmit={(e) => { updateProfile(e, updateUser, fields.current[0]); setUpdate(false) }}
                        inputs={[
                           { type: "text", placeholder: infos.lastname },
                           { type: "text", placeholder: infos.firstname },
                           { type: "email", placeholder: infos.email },
                           { type: "text", placeholder: infos.adress },
                           { type: "text", placeholder: infos.city },
                           { type: "text", placeholder: infos.zip_code },
                           { type: "submit", value: 'valider le formulaire' }]} />
                     <button onClick={() => { update ? setUpdate(false) : setUpdate(true) }} >masquer le formulaire</button>
                  </section>}


               {pass ? <>
                  <form onSubmit={(e) => { updateProfile(e, updatePass, fieldPass.current); setPass(false) }}>
                     <input type="password" ref={fieldPass} placeholder='mot de passe' />
                     <input type="submit" value='valider le formulaire' />
                     <button onClick={() => { pass ? setPass(false) : setPass(true) }} >masquer le formulaire</button>
                  </form>
               </>
                  :
                  <></>}


            </section>

{/* Orders */}

            <h2>Vos commandes</h2>
            <hr />

            <section>

               {orders?.map(order =>
                  <article key={order.id}>
                     <h3>Commande numéro : {order.id}</h3>
                     <address>
                        <p>{order.status}</p>
                        <p>{dayjs(order.order_date).format('DD MMM YYYY')}</p>
                        <a href='' onClick={(e) => { displayOrder(e, setDetail, order.id) }}>detail de la commande</a>
                     </address>
                  </article>
               )}

            </section>
         </>
            :
            <>
               <section>
                  <Link to={'/register'}>Vous devez vous connecter pour voir votre profil</Link>
                  <FontAwesomeIcon icon={faUserXmark} size='8x' />
               </section>
            </>}

{/* Display Order Detail*/}

         <section>

            {detail.length !== 0 ? < Order data={detail} /> : <></>}

            {detail.length !== 0 ?
               <button onClick={() => { setDetail([]) }}>
                  Masquer la facture</button> :
               <></>}

         </section>

      </main>
   )
};

export default Profile;

