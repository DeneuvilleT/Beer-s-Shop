import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { allProduct } from "../../api/product";
import { addToCart } from "../../slices/cartSlice";

import styles from '../Home/home.module.css';

const Home = () => {


  const [products, setProducts] = useState([]);
  const [page,         setPage] = useState(1);
  const [max,           setMax] = useState(6);

  const dispatch = useDispatch();


  useEffect(() => {
    getAllProduct();
  }, []);


  const getAllProduct = async () => {
    const req = await allProduct();
    pagination(req.data);
    return products
  };


  const pagination = (array) => {
    const tempArr = [];

    for (let i = 0; i < array.length; i = i + max) {
      const slice = array.slice(i, i + max);
      tempArr.push(slice);
    }

    setProducts(data => [...data,...tempArr]);
    return products
  };


  return (
    <main className={styles.home}>

{/* Display products */}

      <section>

        {products[page - 1]?.map(item =>

          <article key={item.id}>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.cover} alt={item.title} />

            <div>
              <hr />
              <p><strong>{item.price.toFixed(2)} €</strong></p>
              <p><strong>Contenant :</strong> {item.container.toLowerCase()}</p>
              <button onClick={() => dispatch(addToCart(item))} >Ajouter</button>
            </div>

          </article>)}
      </section>

{/* Arrow Navigation */}

      <div>
        <FontAwesomeIcon onClick={() => { page > 1 ? setPage(page - 1) 
          : setPage(page) }} icon={faCircleArrowLeft} size='4x' />
        
        <h3>Page {page} sur {products.length}</h3>

        <FontAwesomeIcon onClick={() => { page <= products.length - 1 ? setPage(page + 1)
          : setPage(page) }} icon={faCircleArrowRight} size='4x' />
      </div>

    </main>
  )
};

export default Home;