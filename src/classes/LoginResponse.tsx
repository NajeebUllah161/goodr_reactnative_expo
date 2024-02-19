export interface LoginResponse {
  error: boolean;
  message: string;
  data: {
    username: string;
    role: string;
    permissions: permissions;
  };
}

export interface permissions {
  search: boolean;
  view: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
}
