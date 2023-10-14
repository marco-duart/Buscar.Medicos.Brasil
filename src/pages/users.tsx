import { useEffect, useState } from "react";
import { GetUsers } from "../data/services/users";
import Table from "../components/shared/table";

type UserDataProcessedType = {
  user: string;
  email: string;
  whatsapp: string;
  specialty: string;
  city: string;
  state: string;
  userType: string;
}

export const Users = () => {
  const tableColumns = [
    "Usuário",
    "E-mail",
    "WhatsApp",
    "Especialidade",
    "Cidade",
    "Estado",
    "Tipo de Usuário",
  ];
  const [page, setPage] = useState<number>(1);
  const [userDataProcessed, setUserDataProcessed] =
    useState<UserDataProcessedType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await GetUsers<IDataUserArray>(
          "/users",
          6,
          undefined,
          undefined,
          page
        );
        if (response) {
          const tempData = response?.content.reduce((accumulator, currentValue) => {
            const user = {
              user: currentValue.lastName,
              email: currentValue.email,
              whatsapp: currentValue.phone,
              specialty: currentValue.specialties.length > 0 ? currentValue.specialties[0].name : "",
              city: currentValue.address ? currentValue.address.city : " - ",
              state: currentValue.address ? currentValue.address.state : " - ",
              userType: currentValue.profiles.length > 0 ? currentValue.profiles[0].name : "",
            }
            return [...accumulator, user]
            },
          [] as UserDataProcessedType[]
          )
          setUserDataProcessed(tempData ?? [])
    };
  }
    fetchData();
  }, [page, setUserDataProcessed]);
  return (
    <div>
      <Table HeadColumns={tableColumns} BodyRow={userDataProcessed} />
      <div>
        {page > 1 && <button onClick={() => setPage(page - 1)}>←</button>}
      </div>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index}>
          <button onClick={() => setPage(page + index + 1)}>{page + index + 1}</button>
        </div>
      ))}
      <div>
        <button onClick={() => setPage(page + 1)}>→</button>
      </div>
    </div>
  );
};


export default Users