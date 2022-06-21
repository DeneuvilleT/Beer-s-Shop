import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { faDolly } from '@fortawesome/free-solid-svg-icons';
import { URL } from '../../config';

import styles from '../PageToValidate/pagevalidate.module.css';
import axios from "axios";


const PageValidate = () => {

  const { email } = useParams();

  useEffect(() => {
    if(email !== undefined) validateUser();
  }, []);


  const validateUser = async () => {

    try {
      const req = await axios.get(`${URL}/register/api/v1/user_validate/${email}`);
      return

    } catch (error) {
      console.log(error);
    };
  };


  return (
    <main className={styles.pagevalidate}>

      <section>

        {email !== undefined ?
          <>
            <h3>Votre email est désormais validé et votre compte activé !</h3>
            <Link to={'/register'} >Cliquez ici pour être redirigé vers la page de connexion.</Link>
          </>
          :
          <>
            <h2>Félicitations pour votre achat !</h2>
            <FontAwesomeIcon icon={faDolly} size='8x' color='wheat' />
          </>
        }

      </section>

    </main>
  )
};

export default PageValidate;