
const AddForm = ({ visibility ,title, onsubmit, reference, inputs }) => {

   return (
      <section  >

         <h3>{title}</h3>
         <form className={visibility} ref={reference} onSubmit={onsubmit} >

            {inputs.map((input, index) =>
               <input key={index} type={input.type} placeholder={input.placeholder}
                  value={input.value} />
            )}

         </form>
         
      </section>
   )
};

export default AddForm;

