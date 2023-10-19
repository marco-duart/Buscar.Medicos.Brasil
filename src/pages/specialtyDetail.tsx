import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetSpecialty, PostSpecialty, PutSpecialty } from "../data/services/specialties";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW";
  };
};

type Params = {
  id?: string,
}

const SpecialtyDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: true,
    },
    enabled: {
      value: true,
    },
  });
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // RECUPERANDO PARAMETROS DO USELOCATION
  const location: Location = useLocation();
  const [action, setAction] = useState(location?.state.action ? location?.state.action : "")

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const response = await GetSpecialty(parseInt(params.id));
        if (response) {
          setFormData({
            name: { value: response.name, valid: true },
            enabled: { value: response.enabled },
          });
        }
      }
    };
    params.id && fetchData();
  }, [params.id]);

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      enabled: {
        value: !formData.enabled.value,
      },
    });
  };

  //FUNÇÕES OPEN/CLOSE MODAL
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async () => {
    if (params.id && action === "EDIT") {
      const response = await PutSpecialty(parseInt(params.id), formData.name.value, formData.enabled.value);
      navigate("/home/specialties")
    }
    if(action === "NEW") {
      const response = await PostSpecialty(formData.name.value, formData.enabled.value)
      navigate("/home/specialties")
    }
  };

  return (
    <>
      {action === "VIEW" && <div><button onClick={() => setAction("EDIT")}>Editar</button><button onClick={() => openModal()}>Deletar</button></div> }
      <label htmlFor="name">Nome
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name.value}
          disabled={action === "VIEW"}
          onChange={(event) =>
            setFormData({ ...formData, name: { value: event.target.value, valid: true }})
          }
        />
      </label>
      <label htmlFor="enabled">
        <input
          type="checkbox"
          name="enabled"
          id="enabled"
          checked={formData.enabled.value}
          disabled={action === "VIEW"}
          onChange={handleCheckboxChange}
        />
        Habilitado
      </label>
      {(params.id && action === "EDIT") && <button onClick={() => handleSubmit()}>Salvar</button>}
      {(!params.id && action === "NEW") && <button onClick={() => handleSubmit()}>Salvar</button>}
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

export default SpecialtyDetail;
