import { useState } from "react";
import { LoginStyle, ContainerLoginStyle, TitleLoginStyle, SubtitleLoginStyle, SectionLoginStyle, LabelLoginStyle, InputLoginStyle, ButtonLoginStyle, StyledLink, SmallLoginStyle } from "../../ui/styles/Login";
import { SignUp } from "../../data/services/register";
import Modal from "react-modal";

const SignUpPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); //MODAL PARA CONFIRMAÇÃO DE NOVO USUÁRIO
  const [newUserResult, setNewUserResult] = useState<number>(); //BUSCAR IMPLEMENTAR UMA LÓGICA MELHOR PARA MOSTRAR AS MENSAGENS DE ERRO
  //TIPO FOI DEFINIDO POR INFERÊNCIA
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: true,
    },
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
    repassword: {
      value: "",
      valid: true,
    },
  });

  const handleSubmit = async () => {
    //COMEÇANDO COM O TRATAMENTO DO ERRO "CAMPOS VAZIOS"
    if (
      !formData.name.value ||
      !formData.email.value ||
      !formData.password.value ||
      !formData.repassword.value
    ) {
      setFormData({
        name: {
          ...formData.name,
          valid: formData.name.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        email: {
          ...formData.email,
          valid: formData.email.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        password: {
          ...formData.password,
          valid: formData.password.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        repassword: {
          ...formData.repassword,
          valid: formData.repassword.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
      });
      setNewUserResult(400); //COD DE ERRO DO CLIENTE
      return;
    }
    //ERRO SENHAS DIFERENTES
    if (formData.password.value !== formData.repassword.value) {
      setNewUserResult(400); //COD DE ERRO DO CLIENTE
      return;
    }
    const result = await SignUp(
      formData.email.value,
      formData.password.value,
      formData.name.value
    );
    //SE O RETORNO FOR UM NUMBER, É ERRO
    if (typeof result === "number") {
      setNewUserResult(result);
    }
    if (typeof result === "string") {
      //LIMPANDO OS CAMPOS, TEM ALGUMA FORMA MAIS LEGAL?
      setFormData({
        name: {
          value: "",
          valid: true,
        },
        email: {
          value: "",
          valid: true,
        },
        password: {
          value: "",
          valid: true,
        },
        repassword: {
          value: "",
          valid: true,
        },
      });
      openModal(); //MODAL PARA AVISAR QUE DEU CERTO A CRIAÇÃO DO USUÁRIO!
    }
  };

  const openModal = () => {

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContainerLoginStyle>
      <LoginStyle>
        <TitleLoginStyle>Arnia Trello</TitleLoginStyle>
        <SubtitleLoginStyle>Cadastro</SubtitleLoginStyle>
        <SectionLoginStyle>
          <LabelLoginStyle htmlFor="name">Nome completo</LabelLoginStyle>
          <InputLoginStyle
            type="name"
            id="name"
            name="name"
            value={formData.name.value}
            onChange={(event) =>
              setFormData({
                ...formData,
                name: { value: event.target.value, valid: true },
              })
            }
          />
          {!formData.name.valid && newUserResult === 400 && (
            <SmallLoginStyle>Insira o nome</SmallLoginStyle>
          )}
        </SectionLoginStyle>
        <SectionLoginStyle>
          <LabelLoginStyle htmlFor="email">E-mail</LabelLoginStyle>
          <InputLoginStyle
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
          {!formData.email.valid && newUserResult === 400 && (
            <SmallLoginStyle>Insira o e-mail!</SmallLoginStyle>
          )}
        </SectionLoginStyle>
        <SectionLoginStyle>
          <LabelLoginStyle htmlFor="password">Senha</LabelLoginStyle>
          <InputLoginStyle
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
          {!formData.password.valid && newUserResult === 400 && (
            <SmallLoginStyle>Insira a senha!</SmallLoginStyle>
          )}
        </SectionLoginStyle>
        <SectionLoginStyle>
          <LabelLoginStyle htmlFor="repassword">Repita sua senha</LabelLoginStyle>
          <InputLoginStyle
            type="password"
            id="repassword"
            name="repassword"
            value={formData.repassword.value}
            onChange={(event) =>
              setFormData({
                ...formData,
                repassword: { value: event.target.value, valid: true },
              })
            }
          />
          {!formData.repassword.valid && newUserResult === 400 && (
            <SmallLoginStyle>Insira novamente a senha!</SmallLoginStyle>
          )}
        </SectionLoginStyle>
        <div>
          <ButtonLoginStyle onClick={() => handleSubmit()}>CADASTRAR</ButtonLoginStyle>
        </div>
        <div>
          <StyledLink to="/">Voltar</StyledLink>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmação de criação de usuário"
        >
          <SubtitleLoginStyle>USUÁRIO CRIADO COM SUCESSO!</SubtitleLoginStyle>
          <button onClick={() => closeModal()}>OK</button>
        </Modal>
      </LoginStyle>
    </ContainerLoginStyle>
  );
};

export default SignUpPage;
