import CardDashboard from "./cardDashboard";

type Props = {
  title: string
  data: {
    total: number
    available: number
    unavailable: number
  }
  types: string[]
};

export const CountDashboard = ( {title, data, types} : Props) => {

  return (
    <div>
        <h3>{title}</h3>
        <CardDashboard value={data.total} type={types[0]} />
        <CardDashboard value={data.available} type={types[1]} />
        <CardDashboard value={data.unavailable} type={types[2]} />
    </div>
  );
};
