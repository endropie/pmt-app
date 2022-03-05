
export interface AccesData {
  id: string;
  name: string;
}

export interface AccessState {
  data?: AccesData;
  type?: string;
  access_token?: string;
}

export interface AccessResponse {
  data: AccesData;
  type: string;
  access_token: string;
}

export interface AccessCredentials {
  id: string,
  type: string,
}
