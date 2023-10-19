import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetPlan, PostPlan, PutPlan } from "../data/services/plans";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "";
  };
};

type Params = {
  id?: string,
  type?: "MEDICO" | "CONTRATANTE"
}

const PlanDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: {
      value: "",
      valid: true,
    },
    enabled: {
      value: true,
    },
    period: {
      value: "",
      valid: true
    },
    type: {
      value: params.type ? params.type : ""
    },
    values: {
      value: 0,
      valid: true
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
        const response = await GetPlan(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.planTitle, valid: true },
            enabled: { value: response.enabled },
            period: { value: response.period, valid: true },
            type: { value: response.type },
            values: { value: response.values, valid: true}
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
    if (params.id && action === "EDIT") {
      const response = await PutPlan(parseInt(params.id), formData.title.value, formData.enabled.value, formData.period.value, formData.type.value, formData.values.value);
      navigate("/home/plans")
    }
    if(action === "NEW") {
      const response = await PostPlan(formData.title.value, formData.enabled.value, formData.period.value, formData.type.value, formData.values.value)
      navigate("/home/plans")
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
      <label htmlFor="period">Período
        <input
          type="date"
          name="period"
          id="period"
          value={formData.period.value}
          disabled={action === "VIEW"}
          onChange={(event) =>
            setFormData({ ...formData, period: { value: event.target.value, valid: true }})
          }
        />
      </label>
      <label htmlFor="values">Valor
        <input
          type="number"
          name="values"
          id="values"
          value={formData.values.value}
          disabled={action === "VIEW"}
          onChange={(event) =>
            setFormData({ ...formData, values: { value: parseFloat(event.target.value), valid: true }})
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

export default PlanDetail;
