import styles from '../Order/order.module.css';
import dayjs from 'dayjs';

export const Order = ({ data }) => {

   return (

      <section className={styles.order}>

         <h1>Beer's Shop</h1>
         <h4>Enregistrée le {dayjs(data[0].order_date).format('DD / MM / YYYY')}</h4>
         <h2>Commande numéro : {data[0].id_order}</h2>

         <h3>{data[0].lastname} {data[0].firstname}</h3>

         <address>

            {data[0].adress}<br />
            <strong>{data[0].city} {data[0].zip_code}</strong>
            <br />
            {data[0].email}

         </address>

         <div>
            <h4>Dénomination</h4>
            <h4>Quantité</h4>
            <h4>Prix Unitaire</h4>
            <h4>Sous Total</h4>
         </div>

         {data.map(elem =>

            <article key={elem.id_product} >

               <p>{elem.title}</p>
               <p>{elem.quantity} &nbsp; &nbsp; {elem.container}</p>
               <p>{elem.price.toFixed(2)} &nbsp; &nbsp; €</p>
               <p>{(elem.price * elem.quantity).toFixed(2)} &nbsp; &nbsp; €</p>

            </article>

         )}

         <aside>
            <h3>Total {data[0].total.toFixed(2)} €</h3>
         </aside>

      </section>
   )
};


export default Order;