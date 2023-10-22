import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeletePlan,
  GetPlan,
  PostPlan,
  PutPlan,
} from "../../data/services/plans";
import * as S from "../../assets/styles/shared";
import icons from "../../assets/styles/icons";
import Switch from "../../components/shared/toggle";


type Location = {
  state: {
    action: "VIEW" | "EDIT" | "NEW" | "DELETE";
  };
};

type Params = {
  id?: string;
  type?: "MEDICO" | "CONTRATANTE";
};

const PlanDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate();
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
      valid: true,
    },
    type: {
      value: params.type ? params.type : "",
    },
    values: {
      value: 0,
      valid: true,
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
        const response = await GetPlan(parseInt(params.id));
        if (response) {
          setFormData({
            title: { value: response.planTitle, valid: true },
            enabled: { value: response.enabled },
            period: { value: response.period, valid: true },
            type: { value: response.type },
            values: { value: response.values, valid: true },
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
    if (!formData.title.value || !formData.period.value || !formData.values) {
      setFormData({
        title: {
          ...formData.title,
          valid: formData.title.value.trim() !== "", //SE ESTIVER EM BRANCO, RESULTA EM FALSE
        },
        enabled: {
          ...formData.enabled,
        },
        period: {
          ...formData.period,
          valid: formData.period.value.trim() !== "",
        },
        type: {
          ...formData.type,
        },
        values: {
          ...formData.values,
          valid:
            formData.values.value !== null && !isNaN(formData.values.value),
        },
      });
      return;
    }
    if (params.id && action === "EDIT") {
      const response = await PutPlan(
        parseInt(params.id),
        formData.title.value,
        formData.enabled.value,
        formData.period.value,
        formData.type.value,
        formData.values.value
      );
      openModal();
    }
    if (action === "NEW") {
      const response = await PostPlan(
        formData.title.value,
        formData.enabled.value,
        formData.period.value,
        formData.type.value,
        formData.values.value
      );
      openModal();
    }
  };

  const handleDelete = async (id: number) => {
    await DeletePlan(id);
    closeModal();
    navigate("/home/plans");
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
            <S.TableLink to="/home/plans">
              <img src={icons.leftArrow} alt="" />
            </S.TableLink>
            {action === "NEW" && (
              <S.NewEditTitle>
                Novo plano - {(params.type ?? "").toLowerCase()}
              </S.NewEditTitle>
            )}
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
          <S.DetailFormTitle>Dados do plano</S.DetailFormTitle>
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
            <S.LabelCheckboxFlex>
              <S.LabelCheckboxColumn>
                <S.LabelCheckbox htmlFor="">Situação</S.LabelCheckbox>
                <Switch
                  onToggle={handleCheckboxChange}
                  isActive={formData.enabled.value}
                  disabled={action === "VIEW"}
                />
              </S.LabelCheckboxColumn>
              <S.StatusCheckbox>{formData.enabled.value ? "Ativo" : "Inativo"}</S.StatusCheckbox>
            </S.LabelCheckboxFlex>
            <S.DivRelativeInput>
              <S.LabelAbsoluteInput htmlFor="period">
                Período
              </S.LabelAbsoluteInput>
              <S.TableSelect
                name="period"
                id="period"
                value={formData.period.value}
                disabled={action === "VIEW"}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    period: { value: event.target.value, valid: true },
                  })
                }
              >
                <option value="Mensal">Mensal</option>
                <option value="Semanal">Semanal</option>
                <option value="Anual">Anual</option>
              </S.TableSelect>
            </S.DivRelativeInput>
          </S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="values">Valor</S.LabelAbsoluteInput>
            <S.TableValueInput
              type="number"
              name="values"
              id="values"
              value={formData.values.value}
              disabled={action === "VIEW"}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  values: {
                    value: parseFloat(event.target.value),
                    valid: true,
                  },
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
            !formData.period.valid ||
            !formData.values.valid) && <small>Preencha todos os campos!</small>}
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
            <button onClick={() => navigate("/home/plans")}>Voltar</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PlanDetail;
