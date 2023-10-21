import * as S from "./styles";
import icons from "../../assets/styles/icons";

type Props = {
  profile: string;
  type: string;
  value: number;
};

const CardDashboard = ({ profile, type, value }: Props) => {
  return (
    <S.CardsCountStyled>
      {profile === "Médicos" ? (
        <S.DFlexRowStyled>
          {type === "Total" && (
            <S.CardIcoStyled headerStyle="#004CE8">
              <img src={icons.everyUser} alt="" />
            </S.CardIcoStyled>
          )}
          {type === "Disponíveis" && (
            <S.CardIcoStyled headerStyle="#00C247">
              <img src={icons.everyUser} alt="" />
            </S.CardIcoStyled>
          )}
          {type === "Indisponíveis" && (
            <S.CardIcoStyled headerStyle="#FF3333">
              <img src={icons.everyUser} alt="" />
            </S.CardIcoStyled>
          )}
          <S.DFlexColumnStyled>
            <S.CardsTitleStyled>{type}</S.CardsTitleStyled>
            <S.CardsValueStyled>{value}</S.CardsValueStyled>
          </S.DFlexColumnStyled>
        </S.DFlexRowStyled>
      ) : (
        <S.DFlexRowStyled>
          {type === "Total" && (
            <S.CardIcoStyled headerStyle="#FFB801">
              <img src={icons.peopleSearch} alt="" />
            </S.CardIcoStyled>
          )}
          {type === "Ativos" && (
            <S.CardIcoStyled headerStyle="#00C247">
              <img src={icons.peopleSearch} alt="" />
            </S.CardIcoStyled>
          )}
          {type === "Inativos" && (
            <S.CardIcoStyled headerStyle="#FF3333">
              <img src={icons.peopleSearch} alt="" />
            </S.CardIcoStyled>
          )}
          <S.DFlexColumnStyled>
            <S.CardsTitleStyled>{type}</S.CardsTitleStyled>
            <S.CardsValueStyled>{value}</S.CardsValueStyled>
          </S.DFlexColumnStyled>
        </S.DFlexRowStyled>
      )}
    </S.CardsCountStyled>
  );
};

export default CardDashboard;
