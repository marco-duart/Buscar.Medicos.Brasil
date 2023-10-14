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
  const [userDataProcessed, setUserDataProcessed] = useState<UserDataProcessedType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
        const response = await GetUsers<IDataUserArray>(
          "/users",
          6,
          searchValue,
          undefined,
          page
        );
        setTotalPage(response?.totalPages ?? 0)
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
  }
    fetchData();
  }, [searchValue, page, setUserDataProcessed]);
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquise uma palavra-chave"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table HeadColumns={tableColumns} BodyRow={userDataProcessed} />
      <div>
        {page > 0 && <button onClick={() => setPage(page - 1)}>←</button>}
      </div>
      {Array.from({ length: 4 }, (_, index) => (
        (page + index + 1 < totalPage) &&
        <div key={index}>
          <button onClick={() => setPage(page + index + 1)}>{page + index + 2}</button>
        </div>
      ))}
      <div>
        {(page < (totalPage - 1)) && <button onClick={() => setPage(page + 1)}>→</button>}
      </div>
    </div>
  );
};


export default Users