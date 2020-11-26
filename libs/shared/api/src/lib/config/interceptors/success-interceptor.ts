import { AxiosResponse } from 'axios';

const success = {
  'auth/signin': {
    '200': 'Giriş işleminiz başarı ile gerçekleşti. Ana sayfaya yönlendiriliyorsunuz.\n'
  },
  'auth/sign-up': {
    '201': 'Kayıt işleminiz başarı ile gerçekleşti. Mailinize aktivasyon kodu gönderildi. Lütfen hesabınızı aktive ediniz.'
  },
  'user/change-password': {
    '200': 'Password is successfully changed'
  },
  'auth/forgot-password': {
    '200': 'Password reset link has been sent to the e-mail address.'
  },
  'user/create-new-password': {
    '200': 'The password was changed'
  },
  'user/edit': {
    '200': 'User info updated successfully'
  },
  'auth/send-email': {
    '200': 'Aktivasyon kodunuz gönderildi.'
  },
  'user/become-editor': {
    '200': 'Form sent to admin. It will be evaluated in 2 days.'
  },
  'book/write-user-review': {
    '200': 'Your review is published successfully! You can see below'
  },
  'book/write-editor-review': {
    '200': 'Your review is published successfully! You can see below'
  }
};
export const successInterceptor = (res: AxiosResponse) => {
  let successMessage = null;
  if (res?.config.url.endsWith('/signin') || res?.config.url.endsWith('/sign-up')
    || res?.config.url.endsWith('/change-password') || res?.config.url.endsWith('/create-new-password')
    || res?.config.url.endsWith('/forgot-password') || res?.config.url.endsWith('/edit')
    || res?.config.url.endsWith('/become-editor')
    || res?.config.url.endsWith('/write-user-review')
    || res?.config.url.endsWith('/write-editor-review')) {
    successMessage = success[res.config.url][res?.status];
  } else if (res?.config.url.startsWith('auth/send-email') && res?.status === 200) {
    successMessage = success['auth/send-email']['200'];
  }
  window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  return res;
};
