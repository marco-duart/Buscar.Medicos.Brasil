import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteNotification, GetNotification, PostNotification, PutNotification } from "../data/services/notifications";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "DELETE";
  };
};

type Params = {
  id?: string,
  type?: "MEDICO" | "CONTRATANTE"
}

const NotificationDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate()
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
    }
  });
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // RECUPERANDO PARAMETROS DO USELOCATION
  const location: Location = useLocation();
  const [action, setAction] = useState(location?.state.action ? location?.state.action : "")

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const response = await GetNotification(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.title, valid: true },
            sendingDate: { value: response.sendingDate, valid: true },
            message: { value: response.message, valid: true},
            type: { value: response.type}
          });
        }
      }
    };
    params.id && fetchData();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!formData.title.value || !formData.sendingDate.value || !formData.message.value) {
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
          ...formData.type
        }
      });
      return
    }
    if (params.id && action === "EDIT") {
      const response = await PutNotification(parseInt(params.id), formData.title.value, formData.sendingDate.value, formData.message.value, formData.type.value);
      openModal()
    }
    if(action === "NEW") {
      const response = await PostNotification(formData.title.value, formData.sendingDate.value, formData.message.value, formData.type.value)
      openModal()
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteNotification(id);
    closeModal()
    navigate("/home/notifications")
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
      {action === "VIEW" && <div><button onClick={() => setAction("EDIT")}>Editar</button><button onClick={() => openModal()}>Deletar</button></div> }
      <label htmlFor="title">Título
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title.value}
          disabled={action === "VIEW"}
          onChange={(event) =>
            setFormData({ ...formData, title: { value: event.target.value, valid: true }})
          }
        />
      </label>
      <label htmlFor="">Data Enviado
        <input type="date" name="sendingDate" id="sendingDate" value={formData.sendingDate.value}/>
      </label>
      <label htmlFor="title">Mensagem
        <input
          type="text"
          name="message"
          id="message"
          value={formData.message.value}
          disabled={action === "VIEW"}
          onChange={(event) =>
            setFormData({ ...formData, message: { value: event.target.value, valid: true }})
          }
        />
      </label>
      {(action === "NEW" || action === "EDIT") && <button onClick={() => handleSubmit()}>Salvar</button>}
      {(!formData.title.valid || !formData.sendingDate.valid || !formData.message.valid) && (<small>Preencha todos os campos!</small>)}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={closeModal}>close</button>
        {(action === "DELETE") && <div><div>Tem certeza que deseja *excluir* este item?</div><button onClick={() => {params.id && handleDelete(parseInt(params.id))}}>Sim, excluir item</button><button onClick={() => closeModal()}>Voltar</button></div>}
        {(action === "NEW" || action === "EDIT") && <div>** salvo com sucesso! <button onClick={() => navigate("/home/specialties")}>Voltar</button></div>}
      </Modal>
    </>
  );
};

export default NotificationDetail;
