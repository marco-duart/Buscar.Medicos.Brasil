import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetUsers } from "../../data/services/users";
import * as S from "../../assets/styles/shared";
import icons from "../../assets/styles/icons";

const UserDetail = () => {
  const urlAPI = "/users";
  const { id } = useParams();
  const [curerntUser, setCurrentUser] = useState<IDataUser>();
  const [specialties, setSpecialties] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUsers<IDataUserArray>(urlAPI);
        if (response && id) {
          const tempData = response.content.find(
            (item) => item.id === parseInt(id)
          );
          if (tempData?.specialties) {
            const tempSpecialty =
              tempData?.specialties?.length > 0
                ? tempData?.specialties
                    ?.map((specialty) => specialty.name)
                    .join(" - ")
                : "";
            setSpecialties(tempSpecialty);
          }
          setCurrentUser(tempData);
        }
      } catch (error) {}
    };
    fetchData();
  }, [id, setSpecialties, setCurrentUser]);

  return (
    <S.ContentRefil>
      <S.TableDFlexTab>
        <S.TableButtonsTab>
          <S.TableLink to="/home/notifications">
            <img src={icons.leftArrow} alt="" />
          </S.TableLink>
          <S.NewEditTitle>Usuário</S.NewEditTitle>
        </S.TableButtonsTab>
      </S.TableDFlexTab>
      <S.TableContainerRad>
        <S.DetailFormTitle>Dados pessoais</S.DetailFormTitle>
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">
              Primeiro nome
            </S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.firstName}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">Sobrenome</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="sendingDate"
              id="sendingDate"
              value={curerntUser?.lastName}
              disabled
            />
          </S.DivRelativeInput>
        </S.TableButtonsTab>
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">E-mail</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.email}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">WhatsApp</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="sendingDate"
              id="sendingDate"
              value={curerntUser?.phone}
              disabled
            />
          </S.DivRelativeInput>
        </S.TableButtonsTab>

        <S.DetailFormTitle>Endereço</S.DetailFormTitle>
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">CEP</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.address?.zipcode}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">Rua</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.address?.street}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">Número</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="sendingDate"
              id="sendingDate"
              value={curerntUser?.address?.number}
              disabled
            />
          </S.DivRelativeInput>
        </S.TableButtonsTab>
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">Bairro</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.address?.neighborhood}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">Cidade</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={curerntUser?.address?.city}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">Estado</S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="sendingDate"
              id="sendingDate"
              value={curerntUser?.address?.state}
              disabled
            />
          </S.DivRelativeInput>
        </S.TableButtonsTab>
        <S.DivRelativeInput>
          <S.LabelAbsoluteInput htmlFor="">Complemento</S.LabelAbsoluteInput>
          <S.TableTextInput
            type="text"
            name="sendingDate"
            id="sendingDate"
            value={curerntUser?.address?.complement}
            disabled
          />
        </S.DivRelativeInput>

        <S.DetailFormTitle>Dados do currículo</S.DetailFormTitle>
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">
              Especialidades
            </S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value={specialties}
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="title">
              Cidades que deseja trabalhar
            </S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="title"
              id="title"
              value=""
              disabled
            />
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">
              Locais de trabalho
            </S.LabelAbsoluteInput>
            <S.TableTextInput
              type="text"
              name="sendingDate"
              id="sendingDate"
              value=""
              disabled
            />
          </S.DivRelativeInput>
        </S.TableButtonsTab>
        <S.LabelNotAbsoluteInput htmlFor="">
          Disponibilidade de dia e horário
        </S.LabelNotAbsoluteInput>
        <S.CheckboxUserDiv>
          <S.UserCheckbox type="checkbox" name="" id="" disabled />
          <S.LabelUserCheckbox htmlFor="">Domingo</S.LabelUserCheckbox>
        </S.CheckboxUserDiv>
        <S.DivCheckboxPad>
          <S.CheckboxUserDiv>
            <S.UserCheckbox type="checkbox" name="" id="" disabled />
            <S.LabelUserCheckbox htmlFor="">Manhã</S.LabelUserCheckbox>
          </S.CheckboxUserDiv>
          <S.CheckboxUserDiv>
            <S.UserCheckbox type="checkbox" name="" id="" disabled />
            <S.LabelUserCheckbox htmlFor="">Tarde</S.LabelUserCheckbox>
          </S.CheckboxUserDiv>
          <S.CheckboxUserDiv>
            <S.UserCheckbox type="checkbox" name="" id="" disabled />
            <S.LabelUserCheckbox htmlFor="">Noite</S.LabelUserCheckbox>
          </S.CheckboxUserDiv>
        </S.DivCheckboxPad>
        <S.HrStyled />
        <S.CheckboxUserDiv>
          <S.UserCheckbox type="checkbox" name="" id="" disabled />
          <S.LabelUserCheckbox htmlFor="">Sexta</S.LabelUserCheckbox>
        </S.CheckboxUserDiv>
        <S.HrStyled />
        <S.CheckboxUserDiv>
          <S.UserCheckbox type="checkbox" name="" id="" disabled />
          <S.LabelUserCheckbox htmlFor="">Sábado</S.LabelUserCheckbox>
        </S.CheckboxUserDiv>
        <S.HrStyled />
        <S.TableButtonsTab>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">Sobre</S.LabelAbsoluteInput>
            <S.UserTextArea
              name="sobre"
              id="sobre"
              value=""
              disabled
            ></S.UserTextArea>
          </S.DivRelativeInput>
          <S.DivRelativeInput>
            <S.LabelAbsoluteInput htmlFor="">Observações</S.LabelAbsoluteInput>
            <S.UserTextArea
              name="obs"
              id="obs"
              value=""
              disabled
            ></S.UserTextArea>
          </S.DivRelativeInput>
        </S.TableButtonsTab>
        <S.DetailFormTitle>Plano</S.DetailFormTitle>
        <S.LabelNotAbsoluteInput htmlFor="">
          Plano que viria na API
        </S.LabelNotAbsoluteInput>
      </S.TableContainerRad>
    </S.ContentRefil>
  );
};

export default UserDetail;
