import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeleteSpecialty,
  GetSpecialty,
  PostSpecialty,
  PutSpecialty,
} from "../../data/services/specialties";
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
};

const SpecialtyDetail = () => {
  const params: Params = useParams();
  const navigate = useNavigate();
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
  const [action, setAction] = useState(
    location?.state.action ? location?.state.action : ""
  );

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
        },
      });
      return;
    }
    if (params.id && action === "EDIT") {
      const response = await PutSpecialty(
        parseInt(params.id),
        formData.name.value,
        formData.enabled.value
      );
      console.log(response)
      openModal();
    }
    if (action === "NEW") {
      const response = await PostSpecialty(
        formData.name.value,
        formData.enabled.value
      );
      console.log(response)
      openModal();
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteSpecialty(id);
    closeModal();
    navigate("/home/specialties");
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
              <S.NewEditTitle>Nova especialidade</S.NewEditTitle>
            )}
            {(action === "EDIT" || action === "VIEW") && (
              <S.NewEditTitle>Especialidades</S.NewEditTitle>
            )}
          </S.TableButtonsTab>
          <div>
            {action === "VIEW" && (
              <div>
                <S.TableIco onClick={() => setAction("EDIT")}>
                  <img src={icons.edit} alt="" />
                </S.TableIco>
                <S.TableIco
                  onClick={() => {
                    setAction("DELETE");
                    openModal();
                  }}
                >
                  <img src={icons.delet} alt="" />
                </S.TableIco>
              </div>
            )}
          </div>
        </S.TableDFlexTab>
        <S.TableContainerRad>
          <S.DetailFormTitle>Dados da especialidade</S.DetailFormTitle>
          <S.TableButtonsTab>
            <S.DivRelativeInput>
              <S.LabelAbsoluteInput htmlFor="name">Nome</S.LabelAbsoluteInput>
              <S.TableTextInput
                type="text"
                name="name"
                id="name"
                value={formData.name.value}
                disabled={action === "VIEW"}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: { value: event.target.value, valid: true },
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
              <S.StatusCheckbox>
                {formData.enabled.value ? "Ativo" : "Inativo"}
              </S.StatusCheckbox>
            </S.LabelCheckboxFlex>
          </S.TableButtonsTab>
          {(action === "NEW" || action === "EDIT") && (
            <S.TableSubmitButton onClick={() => handleSubmit()}>
              Salvar
            </S.TableSubmitButton>
          )}
          {!formData.name.valid && <small>Preencha todos os campos!</small>}
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

export default SpecialtyDetail;
