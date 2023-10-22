import { useState, useEffect, ChangeEvent } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeleteQuestion,
  GetQuestion,
  PostQuestion,
  PutQuestion,
} from "../../data/services/questions";
import * as S from "../../assets/styles/shared";
import icons from "../../assets/styles/icons";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "DELETE";
  };
};

type Params = {
  id?: string;
  type?: "MEDICO" | "CONTRATANTE";
};

const FAQDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: {
      value: "",
      valid: true,
    },
    message: {
      value: "",
      valid: true,
    },
    type: {
      value: params.type ? params.type : "",
    },
  });
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // RECUPERANDO PARAMETROS DO USELOCATION
  const location: Location = useLocation();
  const [action, setAction] = useState(
    location?.state.action ? location?.state.action : ""
  );

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const response = await GetQuestion(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.title, valid: true },
            message: { value: response.message, valid: true },
            type: { value: response.type },
          });
        }
      }
    };
    params.id && fetchData();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!formData.title.value || !formData.message.value) {
      setFormData({
        title: {
          ...formData.title,
          valid: formData.title.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        message: {
          ...formData.message,
          valid: formData.message.value.trim() !== "",
        },
        type: {
          ...formData.type,
        },
      });
      return;
    }
    if (params.id && action === "EDIT") {
      const response = await PutQuestion(
        parseInt(params.id),
        formData.title.value,
        formData.message.value,
        formData.type.value
      );
      openModal();
    }
    if (action === "NEW") {
      const response = await PostQuestion(
        formData.title.value,
        formData.message.value,
        formData.type.value
      );
      openModal();
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteQuestion(id);
    closeModal();
    navigate("/home/faq");
  };

  //FUNÇÕES OPEN/CLOSE MODAL
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <S.ContentRefil>
        <S.TableDFlexTab>
          <S.TableButtonsTab>
            <S.TableLink to="/home/faq">
              <img src={icons.leftArrow} alt="" />
            </S.TableLink>
            {action === "NEW" && <S.NewEditTitle>Novo FAQ</S.NewEditTitle>}
            {(action === "EDIT" || action === "VIEW") && (
              <S.NewEditTitle>Planos</S.NewEditTitle>
            )}
          </S.TableButtonsTab>
          <div>
            {action === "VIEW" && (
              <div>
                <S.TableIco onClick={() => setAction("EDIT")}>
                  <img src={icons.edit} alt="" />
                </S.TableIco>
                <S.TableIco onClick={() => openModal()}>
                  <img src={icons.delet} alt="" />
                </S.TableIco>
              </div>
            )}
          </div>
        </S.TableDFlexTab>
        <S.TableContainerRad>
          <S.DetailFormTitle>Dados da pergunta</S.DetailFormTitle>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">Título</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={formData.title.value}
              disabled={action === "VIEW"}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  title: { value: event.target.value, valid: true },
                })
              }
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="message">
              Mensagem
            </S.LabelAbsoluteInput>
            <S.TableTextArea
              name="message"
              id="message"
              value={formData.message.value}
              disabled={action === "VIEW"}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({
                  ...formData,
                  message: { value: event.target.value, valid: true },
                })
              }
            />
          </S.DivRelativeInput>
          {(action === "NEW" || action === "EDIT") && (
            <S.TableSubmitButton onClick={() => handleSubmit()}>
              Salvar
            </S.TableSubmitButton>
          )}
          {(!formData.title.valid || !formData.message.valid) && (
            <small>Preencha todos os campos!</small>
          )}
        </S.TableContainerRad>
      </S.ContentRefil>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={closeModal}>close</button>
        {action === "DELETE" && (
          <div>
            <div>Tem certeza que deseja *excluir* este item?</div>
            <button
              onClick={() => {
                params.id && handleDelete(parseInt(params.id));
              }}
            >
              Sim, excluir item
            </button>
            <button onClick={() => closeModal()}>Voltar</button>
          </div>
        )}
        {(action === "NEW" || action === "EDIT") && (
          <div>
            ** salvo com sucesso!{" "}
            <button onClick={() => navigate("/home/specialties")}>
              Voltar
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FAQDetail;
