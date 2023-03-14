export interface Profile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
