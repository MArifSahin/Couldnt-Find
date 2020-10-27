import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Captcha, Popup, PopupButton } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';
const StyledAnchorTag = styled.a`
  margin-bottom: 15px;
  margin-top: 7px;
  font-weight: 400;
  font-size: 16px;
`;

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background-color: #007bff;
`;
const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  padding: 4.5rem;
`;

export const Login = () => {
  const { handleSubmit, register, errors } = useForm<Inputs>();
  const { isCaptchaRequired, isErrorRequired, isSuccessRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'username' || name === 'password') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  const checkSubmit = () => {
    setShow(false);
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    history.push('/');
  }
  useEffect(() => {
    setShow(true);
  }, [isSuccessRequired]);

  useEffect(() => {
    if (isAuthenticated && !show) {
      history.push('/');
    }
  }, [isAuthenticated]);

  type Inputs = {
    username: string,
    password: string,
  };

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to log into your account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>User Name:</label>
            </div>
            <div className="col-8">
              <input className="form-control" type="text" name="username" onChange={onChange} ref={register({ required: true })} />
              {errors.username &&
              <span>
                <Alert variant="danger">Enter your username</Alert>
              </span>}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input className="form-control" type="password" name="password" onChange={onChange} ref={register({ required: true })} />
              {errors.password &&
              <span>
                <Alert variant="danger">Enter your password</Alert>
              </span>}
            </div>
          </StyledRow>
          {isCaptchaRequired ? (
            <StyledRow>
              <div className="col-8">
                <Captcha name="captcha" ref={register({ required: true })} />
              </div>
            </StyledRow>
          ) : null}
          {isErrorRequired ? (
            <>
              <Alert variant="danger">{isErrorRequired}</Alert>
              <Link to="/forgotpassword">Forgot Password ?</Link>
            </>
          ) : null}
          <StyledRow>
            <div className="col-5">
              <label>No account ?</label>
            </div>
            <div className="col-3">
              <Link to="/register">Sign Up</Link>
            </div>
          </StyledRow>
          <Button type="submit">Submit</Button>
          <StyledAnchorTag
            className="btn btn-block btn-info"
            href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/auth"
          >
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Log in with google
          </StyledAnchorTag>
          {isSuccessRequired ? (
            <Popup show={show} onHide = {checkSubmit}>
              {isSuccessRequired}
              <PopupButton variant="primary" onClick={checkSubmit}>
                Submit
              </PopupButton>
            </Popup>
          ) : null}
        </Container>
      </form>
    </StyledApp>
  );
};
