import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginAPI } from "../data/services/user";

const Login = () => {
  localStorage.removeItem("token");
  const navigate = useNavigate();
  const [loginResult, setLoginResult] = useState<number>();
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
  });

  const handleSubmit = async () => {
    if (!formData.email.value || !formData.password.value) {
      setFormData({
        email: {
          ...formData.email,
          valid: formData.email.value.trim() !== "" //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        password: {
          ...formData.password,
          valid: formData.password.value.trim() !== "" //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
      });
      setLoginResult(400);//COD DE ERRO DO CLIENTE
      return;
    }
    const result = await LoginAPI(formData.email.value, formData.password.value);
    if (typeof result === 'number') {
      setLoginResult(result);
    } 
    if (typeof result === 'string') {
      navigate("/home");
    }
  };

  return (
    <div>
      <div>
        <div>Arnia Trello</div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email.value}
            onChange={(event) => setFormData({...formData, email: {value: event.target.value, valid: true,},})}
          />
          {(!formData.email.valid && loginResult === 400) && <small>Insira o e-mail!</small>}
          {loginResult === 404 && <small>Usuário não cadastrado</small>}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password.value}
            onChange={(event) => setFormData({ ...formData, password: {value: event.target.value, valid: true} })}
          />
          {(!formData.password.valid && loginResult === 400) && <small>Insira a senha!</small>}
          {loginResult === 401 && <small>Senha incorreta!</small>}
        </div>
        <div>
          <button onClick={() => handleSubmit()}>ENTRAR</button>
        </div>
        <div>
          <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;