import { useDispatch, useSelector } from 'react-redux';
import { faCartShopping, faBeer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { priceTotal } from '../../../slices/cartSlice';
import { setHeaders } from '../../../api/log';
import { useEffect } from 'react';
import { logout } from '../../../slices/authSlice';
import { login } from '../../../slices/authSlice';
import { Link } from 'react-router-dom';
import { URL } from '../../../config';

import styles from '../Header/header.module.css';



const Header = () => {

  const { cartLength, cart, isLogged, role } = useSelector((state) => ({
    ...state.cart, ...state.auth
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(priceTotal());
  }, [cart, dispatch]);


  useEffect(() => {
    checkAuth();
  }, []);


  const checkAuth = async () => {
    const datas = await setHeaders(`${URL}/checkLog`);
    if (datas.status === 401) {
      return datas.status;

    } else {
      dispatch(login(datas[0]));
      return

    };
  };


  return (

    <header className={styles.header} >

      <nav>
        <Link to={'/'}>Accueil</Link>

        { role === "admin" ? <Link to={'/admin'}>Administration</Link> : <Link to={'/profile'}>Mon compte</Link> }

        { isLogged ? <></> : <Link to={'/register'}>Se connecter</Link> }

        { isLogged ? <Link onClick={() => { dispatch(logout()) }} to={'/'}>Se déconnecter</Link> : <></> }

        <Link to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size="1x" /> <span>{cartLength}</span></Link>
      </nav>

{/* Banner */}
      
      <div>
        <FontAwesomeIcon icon={faBeer} size='4x' />
        <h2>Beer's Shop</h2>
      </div>

      <hr />

    </header>

  )
};

export default Header;