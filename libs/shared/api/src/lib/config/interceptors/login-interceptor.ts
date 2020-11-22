import { AxiosResponse } from 'axios';
import { setAccessToken, setRefreshToken, setRole } from '@internship/shared/utils';

export const loginInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin') || res.config.url.endsWith('/refresh-token')) {
    const accessToken = res.data?.accessToken;
    const refreshToken = res.data?.refreshToken;
    const role = res.data?.roles[0];
    if (res.status === 200) {
      if (accessToken) setAccessToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
      if(role) setRole(role);
      window['UGLY_STORE'].dispatch({ type: '@temp/CAPTCHA_REQUIRED', payload: false });
    }
  }

  return res;
};
