export interface User {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: number;
  password: string;
  roles?: string[];
  idUserAdress?: string;
  created: Date;
}
