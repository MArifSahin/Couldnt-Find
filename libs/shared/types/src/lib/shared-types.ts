export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const CAPTCHA_TOKEN = 'captcha_token';
export const ROLE = 'role';
export const API_KEY = 'AIzaSyAek9Dpobv9VE_iEPovlbBY3e4yF35lMR8';

export interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}

export interface UpdateRequest {
  username: string;
  email?: string;
  name?: string;
  lastname?: string;
  phone?: string;
  age?: string;
  password?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface LogoutRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface BecomeEditorRequest {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  whatDoYouWant: string;
  hobbies: string;
  education: string;
  favBook: string;
  favMovie: string;
}

export interface WriteUserReviewRequest {
  reviewText: string;
  userScore: number;
}

export interface WriteEditorReviewRequest {
  reviewText: string;
  editorScore: number;
  drama: number;
  comedy: number;
  romance: number;
  action: number;
  adventure: number;
  horror: number;
  thriller: number;
}
