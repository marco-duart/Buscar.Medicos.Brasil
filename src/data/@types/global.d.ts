//TIPO PARA REQUISIÇÃO EM USERS
interface IDataUser {
  id: number;
  email: string;
  whatsapp: string;
  first_name: string;
  last_name: string;
  profiles: [
    {
      id: number;
      name: string;
      authority: string;
    }
  ];
  specialties: [
    {
      id: number;
      name: string;
    }
  ];
  address: {
    id: number;
    zipcode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  };
  enabled: boolean;
  authorities: [
    {
      authority: string;
    }
  ];
  username: string;
}

interface IDataUserArray extends Array<IDataUser> {}

//TIPO PARA REQUISIÇÃO EM USERS
interface IDataDashboard {
  doctor: {
    total: number;
    available: number;
    unavailable: number;
  };
  contractor: {
    total: number;
    available: number;
    unavailable: number;
  };
}

//TIPO PARA REQUISIÇÃO EM USERS
interface IDataCountUsers {
  total: number;
}

//TIPO PARA REQUISIÇÃO EM PLANOS
interface IDataPlans {
  id: number;
  planTitle: string;
  enabled: boolean;
  period: string;
  value: number;
}

interface IDataPlansArray extends Array<IDataPlans> {}

//TIPO PARA REQUISIÇÃO EM ESPECIALIDADE
interface IDataSpecialties {
  id: number;
  name: string;
}

interface IDataSpecialtiesArray extends Array<IDataSpecialties> {}

//TIPO PARA REQUISIÇÃO EM NOTIFICACOES
interface IDataNotifications {
  id: number;
  title: string;
  date: string;
  message: string;
}

interface IDataNotificationsArray extends Array<IDataNotifications> {}

//TIPO PARA REQUISIÇÃO EM FAQ
interface IDataFAQ {
  id: number;
  title: string;
  answer: string;
}

interface IDataFAQArray extends Array<IDataFAQ> {}

//TIPO PARA O CONTEXT

interface IDataContext {
  userName: string
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

interface IDataContextProviderProps {
  children: ReactNode;
}
