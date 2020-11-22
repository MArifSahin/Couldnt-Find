import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { forgotpasswordAsync } from '@internship/store/authentication';
import { useHistory } from 'react-router-dom';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Button, Input } from '@internship/ui';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  padding: 4.5rem;
`;

export const ForgotPasswordPage = () => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useAuthentication();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'email') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };
  const onSubmit = (values) => {
    dispatch(forgotpasswordAsync.request(values));
    if (isErrorRequired) {
      history.push('/');
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);
  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Forgot Password ?</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>The mail address of the account to be recovered</label>
            </div>
            <div className="col-8">
              <Input placeholder="Enter e-mail" type="email" name="email" onChange={onChange} ref={register({ required: true })} errors={errors} />
            </div>
          </StyledRow>
          {isErrorRequired ? <div className="alert alert-danger">{isErrorRequired}</div> : null}
          {isSuccessRequired ? <div className="alert alert-success">{isSuccessRequired}</div> : null}

          <Button variant="outline-primary" type="submit" disable={isSuccessRequired}>
            New Password Submit
          </Button>
        </Container>
      </form>
    </StyledApp>
  );
};
