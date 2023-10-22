import { useState, useEffect, ChangeEvent } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
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
      openModal();
    }
    if (action === "NEW") {
      const response = await PostNotification(
        formData.title.value,
        formData.sendingDate.value,
        formData.message.value,
        formData.type.value
      );
      openModal();
    }
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
                <S.TableIco onClick={() => openModal()}>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={closeModal}>close</button>
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

export default NotificationDetail;
