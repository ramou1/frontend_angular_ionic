export interface UserModel {
  id?: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
  registerDate?: Date;
  role?: 'admin' | 'user' | string;
  password?: string;
}
