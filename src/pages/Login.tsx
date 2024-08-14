import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function Login() {
  const cpfRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [cpf, setCpf] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!cpfRef.current) {
      throw Error ('cpfRef is not assigned to the cpf input!')
    }

    cpfRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [cpf, pwd])

  return (
    <section className="register-container">
      <section className="register">
        <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>Entrar</h1>

        <form>

          <label htmlFor="cpf">CPF:</label>
          <input 
            type="text" 
            id="cpf"
            ref={cpfRef}
            autoComplete="off"
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
            required
          />

          <label htmlFor="pwd">Senha:</label>
          <input 
            type="password" 
            id="pwd"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button>Entrar</button>

        </form>
        <p>
          Ainda não se registrou? <br />
          <Link to={'/register'}>Registre-se</Link>
        </p>
      </section>
    </section>
  )
}