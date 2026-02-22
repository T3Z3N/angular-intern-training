export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  image: string;

  address: {
    address: string;
    city: string;
    state: string;
  };

  company: {
    name: string;
    title: string;
  };
}

export interface UserListResponse {
  users: User[];
  total: number;
}
