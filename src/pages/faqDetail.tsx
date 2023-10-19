import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetQuestion, PostQuestion, PutQuestion } from "../data/services/questions";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "";
  };
};

type Params = {
  id?: string,
  type?: "MEDICO" | "CONTRATANTE"
}

const FAQDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate()
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
    }
  });
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  
  // RECUPERANDO PARAMETROS DO USELOCATION
  const location: Location = useLocation();
  const action = location?.state.action || "";

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const response = await GetQuestion(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.title, valid: true },
            message: { value: response.message, valid: true },
            type: { value: response.type }
          });
        }
      }
    };
    params.id && fetchData();
  }, [params.id]);

  const handleSubmit = async () => {
    if (params.id && action === "EDIT") {
      const response = await PutQuestion(parseInt(params.id), formData.title.value, formData.message.value, formData.type.value);
      navigate("/home/faq")
    }
    if(action === "NEW") {
      const response = await PostQuestion(formData.title.value, formData.message.value, formData.type.value)
      navigate("/home/faq")
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
      <label htmlFor="message">Mensagem
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
      {params.id && action === "EDIT" && <button onClick={() => handleSubmit()}>Salvar</button>}
      {action === "NEW" && <button onClick={() => handleSubmit()}>Salvar</button>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </>
  );
};

export default FAQDetail;
