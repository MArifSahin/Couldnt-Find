export interface UserDetailResponse {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
  image: string;
}

export interface SessionDetailResponse {
  refreshToken: string;
  accessToken: string;
  userAgent: string;
  expireDate: string;
  issueDate: string;
}
