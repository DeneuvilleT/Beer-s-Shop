import { orderDetail } from "../api/user";

export const displayForm = (e, container, valeur1, valeur2) => {

   e.target.textContent === valeur1 ?
      e.target.textContent = valeur2 :
      e.target.textContent = valeur1;

   container.classList.toggle('hide');
};


export const displayOrder = async (e, detailOrder, id) => {
   e.preventDefault();
   detailOrder([]);

   const req = await orderDetail(id);
   detailOrder(detail => [...detail, ...req]);
   return
};


export const timerMsg = (setMsg, msg) => {
   setMsg(msg);
   setTimeout(() => {
      setMsg('');
   }, 3000);
}   
