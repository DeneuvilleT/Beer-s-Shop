import styles from '../PageNotFound/pagenotfound.module.css';

const PageNotFound = () => {

   return (
      <main className={styles.pagenotfound} >

         <section>
            <h2>404</h2>
            <p>Page not found</p>
         </section>

      </main>
   );
};

export default PageNotFound;