import CardDashboard from "./cardDashboard";
import * as S from "./styles";

type Props = {
  title: string;
  data: {
    total: number;
    available: number;
    unavailable: number;
  };
  types: string[];
};

export const CountDashboard = ({ title, data, types }: Props) => {
  return (
    <S.ContainerCountStyled>
      <S.CardsTitleCountStyled>{title}</S.CardsTitleCountStyled>
      <S.CardsSectionCountStyled>
        <CardDashboard profile={title} value={data.total} type={types[0]} />
        <CardDashboard profile={title} value={data.available} type={types[1]} />
        <CardDashboard
          profile={title}
          value={data.unavailable}
          type={types[2]}
        />
      </S.CardsSectionCountStyled>
    </S.ContainerCountStyled>
  );
};
