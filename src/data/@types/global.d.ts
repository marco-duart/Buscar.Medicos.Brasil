interface ILoginApi {
  token: string;
  message: string;
}

interface IMeAPI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profiles: {
    id: number;
    name: string;
    authority: string;
  }[];
  enabled: boolean;
}

//TIPO PARA REQUISIÇÃO EM USERS
interface IDataUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profiles: {
    id: number;
    name: string;
  }[];
  specialties: {
    id: number;
    name: string;
  }[];
  phone: string;
  address: {
    zipcode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  } | null;
  enabled: boolean;
}

interface IDataUserArray {
  content: IDataUser[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface IDataUserCount {
  total: number;
  totalDoctors: number;
  totalContractor: number;
}

interface IDataUserDashboard {
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

//TIPO PARA REQUISIÇÃO EM PLANOS
interface IDataPlans {
  id: number;
  planTitle: string;
  enabled: boolean;
  period: string;
  value: number;
}

interface IDataPlansArray {
  content: IDataPlans[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

//TIPO PARA REQUISIÇÃO EM ESPECIALIDADE
interface IDataSpecialties {
  id: number;
  name: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  active: boolean;
}

interface IDataSpecialtiesArray {
  content: IDataSpecialties[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

//TIPO PARA REQUISIÇÃO EM NOTIFICACOES
interface IDataNotifications {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  title: string;
  sendingDate: string;
  message: string;
}

interface IDataNotificationsArray {
  content: IDataNotifications[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

//TIPO PARA REQUISIÇÃO EM QUESTIONS
interface IDataQuestions {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  title: string;
  message: string;
}

interface IDataQuestionsArray {
  content: IDataQuestions[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

//TIPO PARA O CONTEXT

interface IDataContext {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

interface IDataContextProviderProps {
  children: ReactNode;
}
