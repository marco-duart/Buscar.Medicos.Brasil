import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../../data/services/register";
import * as S from "./styles";

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
          valid: formData.email.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        password: {
          ...formData.password,
          valid: formData.password.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
      });
      setLoginResult(400); //COD DE ERRO DO CLIENTE
      return;
    }
    const result = await LoginAPI(
      formData.email.value,
      formData.password.value
    );
    if (typeof result === "number") {
      setLoginResult(result);
    }
    if (typeof result === "string") {
      navigate("/home");
    }
  };

  return (
    <S.LoginPageStyled>
        <S.CardLoginStyled>
          <S.BlockLoginStyled>
          <S.SubtitleLoginStyled>Seja bem vindo!</S.SubtitleLoginStyled>
          <S.TitleLoginStyled>Realize seu Login</S.TitleLoginStyled>
          <S.InputSectionStyled>
            <S.LabelStyled htmlFor="email">E-mail</S.LabelStyled>
            <S.InputStyled
              type="email"
              id="email"
              name="email"
              value={formData.email.value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: { value: event.target.value, valid: true },
                })
              }
            />
            {!formData.email.valid && loginResult === 400 && (
              <small>Insira o e-mail!</small>
            )}
            {loginResult === 404 && <small>Usuário não cadastrado</small>}
            </S.InputSectionStyled>
          <S.InputSectionStyled>
            <S.LabelStyled htmlFor="password">Senha</S.LabelStyled>
            <S.InputStyled
              type="password"
              id="password"
              name="password"
              value={formData.password.value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: { value: event.target.value, valid: true },
                })
              }
            />
            {!formData.password.valid && loginResult === 400 && (
              <small>Insira a senha!</small>
            )}
            {loginResult === 401 && <small>Senha incorreta!</small>}
          </S.InputSectionStyled>
          <S.DivDFlexStyled>
            <S.DivDFlexStyled>
              <input type="checkbox" name="" id="" />
              <S.labelCheckboxStyled htmlFor="">Lembrar-me</S.labelCheckboxStyled>
            </S.DivDFlexStyled>
            <div>Esqueci minha senha</div>
          </S.DivDFlexStyled>
          <div>
            <S.ButtonStyled onClick={() => handleSubmit()}>ENTRAR</S.ButtonStyled>
          </div>
          </S.BlockLoginStyled>
        </S.CardLoginStyled>
    </S.LoginPageStyled>
  );
};

export default Login;
