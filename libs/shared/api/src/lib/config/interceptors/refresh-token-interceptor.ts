import { getRefreshToken, setAccessToken } from '@internship/shared/utils';
import axiosStatic, { AxiosError, AxiosInstance } from 'axios';

export const refreshTokenInterceptor = (error: AxiosError, axios: AxiosInstance = axiosStatic) => {
  if (error.response.status === 401 && error.response.data?.error.toString() === 'JWT Expired.') {
    return new Promise((resolve) => {
      axios.get('https://book-review-backend.herokuapp.com/api/auth/refresh-token', {
        params: { token: getRefreshToken() }
      })
        .then(function(response) {
          const accessToken = response.data?.accessToken;
          if (accessToken) {
            setAccessToken(accessToken);
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            const res = axios.request(error.config);
            resolve(res);
          }
        })
        .catch(error => {
          window['UGLY_STORE'].dispatch({
            type: '@temp/ERROR_REQUIRED',
            payload: 'Your session has expired. Please login again!'
          });
          window['UGLY_STORE'].dispatch({type: '@Authentication/UPDATE_LOGOUT'});
        });

    });
  }
  throw error;
};
