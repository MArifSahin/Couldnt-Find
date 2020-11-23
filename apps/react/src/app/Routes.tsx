import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {
  ForgotPasswordPage,
  Login, MailErrorPage,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword,
  Book,
  Movie,
  BookReviewPage, BecomeAnEditor
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/book" component={Book} />
      <Route path="/movie" component={Movie} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      <Route exact path="/mailerror" component={MailErrorPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/reviewPage" component={BookReviewPage} />
      <Route path="/becomeAnEditor" component={BecomeAnEditor} />
    </Router>
  );
};
