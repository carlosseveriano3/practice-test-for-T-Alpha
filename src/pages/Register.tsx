import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMask from 'react-input-mask'
import axios from 'axios'
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
// const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

// const REGISTER_URL = '/register';

export default function Register() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement| null>(null);

  const [ user, setUser ] = useState('');
  const [ validName, setValidName ] = useState(false);
  const [ userFocus, setUserFocus ] = useState(false);

  const [ cpf_Cnpj, setCpf_Cnpj ] = useState('');
  const [ validCpf_Cnpj, setValidCpf_Cnpj ] = useState(true);
  const [ cpf_Cnpj_Focus, setCpf_Cnpj_Focus ] = useState(false);

  const [ email, setEmail ] = useState('');
  const [ validEmail, setValidEmail ] = useState(false);

  const [ phone, setPhone ] = useState('');
  const [ validPhone, setValidPhone ] = useState(true);
  const [ phoneFocus, setPhoneFocus ] = useState(false);

  const [ pwd, setPwd ] = useState('');
  const [ validPwd, setValidPwd ] = useState(false);
  const [ pwdFocus, setPwdFocus ] = useState(false);

  const [ matchPwd, setMatchPwd ] = useState('');
  const [ validMatch, setValidMatch ] = useState(false);
  const [ matchFocus, setMatchFocus ] = useState(false);

  const [ errMsg, setErrMsg ] = useState('');
  const [ success, setSuccess ] = useState(false);

  useEffect(() => {
    if (!userRef.current) {
      throw Error ('userRef is not assigned to the username input!')
    }

    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    // const resultCpf = CPF_REGEX.test(cpf_Cnpj);
    // const resultCnpj = CNPJ_REGEX.test(cpf_Cnpj);

    if (cpf_Cnpj.length < 11) {
      setValidCpf_Cnpj(false);
    } else {
      setValidCpf_Cnpj(true);
    }
  }, [cpf_Cnpj])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  useEffect(() =>{
    if (phone.length < 11) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  }, [phone])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch('https://interview.t-alpha.com.br/api/products/get-all-products')
  //     const data = await res.json()
  //     console.log(data)
  //   }
  //   fetchProducts()
  // }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const options = {
      method: 'POST',
      url: 'https://interview.t-alpha.com.br/api/auth/register',
      headers: {'Content-Type': 'application/json'},
      data: {
        name: user,
        taxNumber: cpf_Cnpj,
        mail: email,
        phone,
        password: pwd
      }
    }; 

    try {
      const { data } = await axios.request(options);
      console.log(data)
      setSuccess(true);
      setUser('');
      setCpf_Cnpj('');
      setEmail('');
      setPhone('');
      setPwd('');
      setMatchPwd('');
    } catch (error) {
      console.error(error)
      setErrMsg('Falha no registro!')
    }
  }

  return (
    <section className="register-container">
      {success ? (
        <section className="register">
          <h1>Success!</h1>
          <p>
              <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="register">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>

            <label htmlFor="username">
              Nome:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="text" 
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="cpf_cnpj">
              CPF:
              <span className={validCpf_Cnpj ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validCpf_Cnpj || !cpf_Cnpj ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <InputMask 
              id="cpf_cnpj"
              mask="99999999999" 
              maskChar={null}
              className="phone"
              onChange={(e) => setCpf_Cnpj(e.target.value)}
              autoComplete="off"
              value={cpf_Cnpj}
              required
              onFocus={() => setCpf_Cnpj_Focus(true)}
              onBlur={() => setCpf_Cnpj_Focus(false)}
            />
            <p id="cpf_cnpj_note" className={cpf_Cnpj_Focus && !validCpf_Cnpj
              ? "instructions" : "offscreen"
            }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Digite apenas os números do seu CPF.
            </p>

            <label htmlFor="email">
              E-mail:
            </label>
            <input 
              type="email" 
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="phone">
              Telefone:
              <span className={validPhone ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPhone || !phone ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <InputMask 
              mask="99999999999" 
              maskChar={null}
              className="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              id="phone"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p id="phonenote" className={phoneFocus && !validPhone
              ? "instructions" : "offscreen"
            }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Digite apenas os números do seu telefone.
            </p>

            <label htmlFor="password">
              Senha:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password" 
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd
              ? "instructions" : "offscreen"
            }>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 a 24 caracteres.<br />
              Deve incluir letras maiúsculas e minúsculas, um número e um 
              caractere especial.<br />
              Caracteres especiais permitidos: ! @ # $ %
            </p>

            <label htmlFor="confirm_pwd">
              Senha de confirmação
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch
              ? "instructions" : "offscreen"
            }>
              <FontAwesomeIcon icon={faInfoCircle} />
                A senha não corresponde.
            </p>

            <button disabled={!validName || !validCpf_Cnpj || !validPhone || 
              !validPwd || !validMatch
              ? true : false
            }>
              Registrar
            </button>
          </form>
          <p>
            Já está registrado?<br />
            <span className="line">
              <Link to={'/login'}>Entrar</Link>
            </span>
          </p>
        </section>
      )}
    </section>
  )
} 