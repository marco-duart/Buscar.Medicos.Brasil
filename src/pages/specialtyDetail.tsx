import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GetSpecialty } from "../data/services/specialties";
import { PutSpecialty } from "../data/services/specialties";

type Location = {
  state: {
    action: "VIEW" | "EDIT" | "";
  };
};

const SpecialtyDetail = () => {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: true,
    },
    enabled: {
      value: true,
    },
  });
  const params = useParams();

  // RECUPERANDO PARAMETROS DO USELOCATION
  const location: Location = useLocation();
  const action = location?.state.action || "";

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
    console.log(formData.name.value, formData.enabled.value)
    console.log(params.id)
    if (params.id) {
      const response = await PutSpecialty(parseInt(params.id), formData.name.value, formData.enabled.value);
      console.log(response)
    }
  };

  return (
    <>
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
      {params.id && action === "EDIT" && <button onClick={() => handleSubmit()}>Salvar</button>}
    </>
  );
};

export default SpecialtyDetail;
