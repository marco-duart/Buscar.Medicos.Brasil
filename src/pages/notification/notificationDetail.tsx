import { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeleteNotification,
  GetNotification,
  PostNotification,
  PutNotification,
} from "../../data/services/notifications";
import * as S from "../../assets/styles/shared";
import icons from "../../assets/styles/icons";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW";
  };
};

type Params = {
  id?: string;
  type?: "MEDICO" | "CONTRATANTE";
};

const NotificationDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: {
      value: "",
      valid: true,
    },
    sendingDate: {
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
        const response = await GetNotification(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.title, valid: true },
            sendingDate: { value: response.sendingDate, valid: true },
            message: { value: response.message, valid: true },
            type: { value: response.type },
          });
        }
      }
    };
    params.id && fetchData();
  }, [params.id]);

  const handleSubmit = async () => {
    if (
      !formData.title.value ||
      !formData.sendingDate.value ||
      !formData.message.value
    ) {
      setFormData({
        title: {
          ...formData.title,
          valid: formData.title.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        sendingDate: {
          ...formData.sendingDate,
          valid: formData.sendingDate.value.trim() !== "",
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
      const response = await PutNotification(
        parseInt(params.id),
        formData.title.value,
        formData.sendingDate.value,
        formData.message.value,
        formData.type.value
      );
      console.log(response)
      openModal();
    }
    if (action === "NEW") {
      const response = await PostNotification(
        formData.title.value,
        formData.sendingDate.value,
        formData.message.value,
        formData.type.value
      );
      console.log(response)
      openModal();
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteNotification(id);
    closeModal();
    navigate("/home/notifications");
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
            <S.TableLink to="/home/notifications">
              <img src={icons.leftArrow} alt="" />
            </S.TableLink>
            {action === "NEW" && (
              <S.NewEditTitle>Nova notificação</S.NewEditTitle>
            )}
            {(action === "EDIT" || action === "VIEW") && (
              <S.NewEditTitle>Notificações</S.NewEditTitle>
            )}
          </S.TableButtonsTab>
          <div>
            {action === "VIEW" && (
              <div>
                <S.TableIco onClick={() => setAction("EDIT")}>
                  <img src={icons.edit} alt="" />
                </S.TableIco>
                <S.TableIco onClick={() => {
                    openModal();
                    setAction("DELETE");
                  }}>
                  <img src={icons.delet} alt="" />
                </S.TableIco>
              </div>
            )}
          </div>
        </S.TableDFlexTab>
        <S.TableContainerRad>
          <S.DetailFormTitle>Dados da notificação</S.DetailFormTitle>
          <S.TableButtonsTab>
            <S.DivRelativeInput>
              <S.LabelAbsoluteInput htmlFor="title">
                Título
              </S.LabelAbsoluteInput>
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
              <S.LabelAbsoluteInput htmlFor="">
                Data Enviado
              </S.LabelAbsoluteInput>
              <S.TableTextInput
                type="text"
                name="sendingDate"
                id="sendingDate"
                disabled={action === "VIEW"}
                value={formData.sendingDate.value}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    sendingDate: { value: event.target.value, valid: true },
                  })
                }
              />
            </S.DivRelativeInput>
          </S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">
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
          {(!formData.title.valid ||
            !formData.sendingDate.valid ||
            !formData.message.valid) && (
            <small>Preencha todos os campos!</small>
          )}
        </S.TableContainerRad>
      </S.ContentRefil>
      <S.ModalEditDelete
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <S.ModalCloseDiv>
          <button onClick={() => closeModal()}>X</button>
        </S.ModalCloseDiv>
        {action === "DELETE" && (
          <S.ModalContainer>
            <S.ModalMessage>
              Tem certeza que deseja <span>excluir</span> este item?
            </S.ModalMessage>
            <S.ModalButton
              onClick={() => {
                params.id && handleDelete(parseInt(params.id));
              }}
            >
              Sim, excluir item
            </S.ModalButton>
            <S.ModalLink onClick={() => closeModal()}>Voltar</S.ModalLink>
          </S.ModalContainer>
        )}

        {(action === "NEW" || action === "EDIT") && (
          <S.ModalContainer>
            <S.ModalConfirmation>
              Pergunta salva com sucesso!
            </S.ModalConfirmation>
          </S.ModalContainer>
        )}
      </S.ModalEditDelete>
    </>
  );
};

export default NotificationDetail;
