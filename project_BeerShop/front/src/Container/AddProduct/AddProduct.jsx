import { displayForm } from '../../utilities/utilities';
import { addProduct } from '../../api/product';
import { useRef } from 'react';
import AddForm from '../AddForm/AddForm';


const AddProduct = () => {

   const fieldsProduct = useRef([]);

   const productInputs = inputElem => {
      if (inputElem && !fieldsProduct.current.includes(inputElem)) {
         fieldsProduct.current.push(inputElem);
      };
   };

   return (
      <>

         <button style={{ width: '200px' }} onClick={(e) => { displayForm(e, fieldsProduct.current[0], "ajouter", "masquer") }} >ajouter</button>

         <AddForm visibility={"hide"} reference={productInputs} onsubmit={() => { addProduct(fieldsProduct.current[0]) }}
            inputs={[
               { type: "text", placeholder: 'Dénomination' },
               { type: "text", placeholder: 'Container' },
               { type: "url", placeholder: 'Cover' },
               { type: "text", placeholder: 'Déscription' },
               { type: "number", placeholder: 'Prix' },
               { type: "submit", value: 'Valider' }
            ]} />
         
      </>
   )
};

export default AddProduct;