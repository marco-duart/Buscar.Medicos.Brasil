import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteSpecialty, GetSpecialty, PostSpecialty, PutSpecialty } from "../data/services/specialties";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "DELETE";
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

  const handleSubmit = async () => {
    if (!formData.name.value) {
      setFormData({
        name: {
          ...formData.name,
          valid: formData.name.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        enabled: {
          ...formData.enabled,
        }
      });
      return
    }
    if (params.id && action === "EDIT") {
      const response = await PutSpecialty(parseInt(params.id), formData.name.value, formData.enabled.value);
      openModal()
    }
    if(action === "NEW") {
      const response = await PostSpecialty(formData.name.value, formData.enabled.value)
      openModal()
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteSpecialty(id);
    closeModal()
    navigate("/home/specialties")
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
      {action === "VIEW" && <div><button onClick={() => setAction("EDIT")}>Editar</button><button onClick={() => {setAction("DELETE"); openModal()}}>Deletar</button></div> }
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
      {(action === "NEW" || action === "EDIT") && <button onClick={() => handleSubmit()}>Salvar</button>}
      {!formData.name.valid && (<small>Preencha todos os campos!</small>)}
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

export default SpecialtyDetail;
