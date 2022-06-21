import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Footer/footer.module.css'


const Footer = () => {
   return (

      <footer className={styles.footer}>

  
         <p>Frontend : <em>React</em>  &nbsp; &nbsp;&nbsp; Backend : <em>Express, SQL</em></p> 
   

         <p>Vous pouvez me contacter en cliquant <a href="mailto:deneuville.thomas@gmail.com">ici</a>.</p>

         <div>
            <a href='https://www.linkedin.com/in/thomas-deneuville-68965994/'><FontAwesomeIcon icon={faLinkedin} size='4x' /></a >
            <a href='https://github.com/DeneuvilleT'><FontAwesomeIcon icon={faGithubSquare} size='4x' /></a >
         </div>

      </footer>
   )
};

export default Footer;

