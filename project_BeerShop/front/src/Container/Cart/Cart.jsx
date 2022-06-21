import { removeToCart, lessQuantity, addQuantity, clearCart, priceTotal } from '../../slices/cartSlice';
import { ReactComponent as BinEmpty } from '../Cart/bin-empty.svg';
import { useSelector, useDispatch } from 'react-redux';
import { finishBuying } from '../../api/cart';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Cart/cart.module.css';


const Cart = () => {

  const { cart, cartTotal, infos, isLogged } = useSelector((state) => ({
    ...state.cart, ...state.auth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(priceTotal());
  }, [cart, dispatch]);



  return (
    <main className={styles.cart}>

      <h2>Panier</h2>
      <hr />

{/* Cart Empty */}

      {cart.length === 0 ? (

        <section>

          <h2>Votre panier est un peu vide pour l'instant ...</h2>
          <BinEmpty />

        </section>

      ) : (

        <>
          <section>

            <h3>Désignation</h3>
            <h3>Prix</h3>
            <h3>Quantité</h3>
            <h3>Total</h3>

          </section>
          <hr />

{/* Cart used */}

          <section>

            {cart?.map(item => (

              <article key={item.id}>

                <h3>{item.title}</h3>
                <img src={item.cover} alt={item.title} />
                <p><strong>{item.price.toFixed(2)} €</strong></p>

                <div>
                  <button onClick={() => { dispatch(lessQuantity(item)) }}>-</button>
                  <h2>{item.item_quantity}</h2>
                  <button onClick={() => { dispatch(addQuantity(item)) }}>+</button>
                </div>

                <button onClick={() => { dispatch(removeToCart(item)) }} >Supprimer</button>
                <h3>{(item.price * item.item_quantity).toFixed(2)} €</h3>

              </article>

            ))}

          </section>

{/* Finalize buying */}

          <section>

            <button style={{ backgroundColor: 'orange', color: 'black' }} onClick={() => { dispatch(clearCart()) }} >Vider le panier</button>
            {isLogged ?
              <>
                <Link to={'/validate'} onClick={() => { finishBuying(infos, cart, cartTotal) ; dispatch(clearCart())} } >Valider le panier</Link>
                  <h2 >Total {cartTotal.toFixed(2)} €</h2>
              </>
                :
              <>  
                <Link to={'/register'}>Vous devez être connecté pour finaliser votre achat</Link>
                  <h2 >Total {cartTotal.toFixed(2)} €</h2>
              </>}
              
          </section>

        </>

      )}

    </main>
  )
};

export default Cart;
