import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE } from '@internship/shared/types';

export const setAccessToken = (token: string) => window.localStorage.setItem(ACCESS_TOKEN, token);

export const getAccessToken = (): string => window.localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => window.localStorage.removeItem(ACCESS_TOKEN);

export const setRefreshToken = (token: string) => window.localStorage.setItem(REFRESH_TOKEN, token);

export const getRefreshToken = (): string => window.localStorage.getItem(REFRESH_TOKEN);

export const removeRefreshToken = () => window.localStorage.removeItem(REFRESH_TOKEN);

export const setRole = (role: string) => window.localStorage.setItem(ROLE, role);

export const getRole = (): string => window.localStorage.getItem(ROLE);

export const getUrlParameter = (name, search) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
