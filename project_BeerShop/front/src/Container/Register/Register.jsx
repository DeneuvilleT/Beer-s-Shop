import { displayForm, timerMsg } from '../../utilities/utilities';
import { logUser, newUser } from '../../api/log';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { login } from '../../slices/authSlice';

import AddForm from '../AddForm/AddForm';
import styles from "../Register/register.module.css";


const Register = () => {

  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fields   = useRef([]);
  

  const logInputs = inputElem => {
    if (inputElem && !fields.current.includes(inputElem)) {
      fields.current.push(inputElem);
    };
  };

  const recupDatas = async (e) => {
    e.preventDefault();

    const datas = await logUser(fields.current[0]);
    console.log(datas)
    if (datas.status === 200) {
      if (datas.validate === 1) {
        dispatch(login(datas.datas));
        timerMsg(setMsg, datas.msg);
        navigate("/");
        return

      } else {
        timerMsg(setMsg, "Votre compte n'est pas encore activé");
        return

      };

    } else if (datas.status === 200 && datas.datas.status === "admin") {
      dispatch(login(datas.datas));
      timerMsg(setMsg, datas.msg);
      navigate("/admin");
      return

    } else {
      timerMsg(setMsg, datas.msg);
      return

    };
  };

  const addNewUser = async (e) => {
    e.preventDefault();

    const res = await newUser(fields.current[1]);
    timerMsg(setMsg, res.msg);
    return

  };



  return (
    <main className={styles.register}>

{/* Sign in */}

      <AddForm title={"Se connecter"} reference={logInputs} onsubmit={(e) => { recupDatas(e) }}
        inputs={[
          { type: "email", placeholder: "- - - - email - - - -" },
          { type: "password", placeholder: "mot de passe" },
          { type: "submit", value: "Envoyer" }]} />

      {msg === '' ? <></> : <p className='msg' >{msg}</p>}

      <hr />

      <button onClick={(e) => { displayForm(e, fields.current[1],
      "Nouveau sur le site ?", "Masquer le formulaire")
      }} >Nouveau sur le site ?</button>

{/* Sign up */}

      <AddForm visibility={"hide"} title={"Inscription"} reference={logInputs} onsubmit={(e) => { addNewUser(e) }}
        inputs={[
          { type: "text", placeholder: 'nom' },
          { type: "text", placeholder: 'prénom' },
          { type: "email", placeholder: '- - - - email - - - -' },
          { type: "password", placeholder: 'mot de passe' },
          { type: "text", placeholder: 'adresse' },
          { type: "text", placeholder: 'ville' },
          { type: "text", placeholder: 'code postal' },
          { type: "submit", value: 'Envoyer' }]} />

    </main>
  )
};

export default Register;