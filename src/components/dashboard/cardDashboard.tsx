type Props = {
  type: string;
  value: number;
};

const CardDashboard = ({ type, value } : Props) => {

  return (
    <div>
        <div>{type}</div>
        <div>{value}</div>
    </div>
  );
};

export default CardDashboard;
