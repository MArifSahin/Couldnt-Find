import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { resetpasswordAsync } from '@internship/store/authentication';
import { getUrlParameter } from '@internship/shared/utils';
import { useTemporary } from '@internship/shared/hooks';
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

export const ResetPassword = (props) => {
  const resttoken = getUrlParameter('token', props.location.search);
  const error = getUrlParameter('error', props.location.search);
  const { handleSubmit, register, getValues, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(false);
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const onSubmit = (values) => {
    values = { ...values, token: resttoken };
    dispatch(resetpasswordAsync.request(values));
    if (isErrorRequired) history.push('/login');
    else {
      setEnable(false);
    }
  };

  const onChange = () => {
    const firstPassword = getValues()['newPassword'];
    const secondPassword = getValues()['newPasswordConfirmation'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      setEnable(true);
    } else {
      setPasswordError('');
      setEnable(false);
    }
  };

  if (resttoken) {
    return (
      <StyledApp>
        <form onSubmit={handleSubmit(onSubmit)}>
          <H4>Reset Password ?</H4>
          <Container>
            <StyledRow>
              <div className="col-4">
                <label>New Password</label>
              </div>
              <div className="col-8">
                <Input
                  className={passworderror && 'is-invalid'}
                  type="password"
                  name="newPassword"
                  onChange={onChange}
                  ref={register({
                    required: true,
                    maxLength: { value: 20, message: 'Password cannot exceed 20 characters' },
                    minLength: { value: 6, message: 'Password cannot be less than 6 characters' },
                    pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Your password can contain the characters A-Z, a-z, and 0-9.' },
                    validate: (input) =>
                      /^(?=.{6,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(input)
                        ? null
                        : 'Your password must contain numbers, uppercase and lowercase letters.',
                  })}
                  errors={errors}
                />
                <div className="invalid-feedback">{passworderror}</div>
              </div>
            </StyledRow>
            <StyledRow>
              <div className="col-4">
                <label>Repeate Password</label>
              </div>
              <div className="col-8">
                <Input
                  className={passworderror && 'is-invalid'}
                  type="password"
                  name="newPasswordConfirmation"
                  onChange={onChange}
                  ref={register({
                    required: true,
                    maxLength: { value: 20, message: 'Password cannot exceed 20 characters' },
                    minLength: { value: 6, message: 'Password cannot be less than 6 characters' },
                    pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Your password can contain the characters A-Z, a-z, and 0-9.' },
                    validate: (input) =>
                      /^(?=.{6,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(input)
                        ? null
                        : 'Your password must contain numbers, uppercase and lowercase letters.',
                  })}
                  errors={errors}
                />
                <div className="invalid-feedback">{passworderror}</div>
              </div>
            </StyledRow>
            {isErrorRequired ? <div className="alert alert-danger">{isErrorRequired}</div> : null}
            {isSuccessRequired ? <div className="alert alert-success">{isSuccessRequired}</div> : null}
            <Button variant="outline-primary" type="submit" disabled={enable}>
              Confirm Password
            </Button>
          </Container>
        </form>
      </StyledApp>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
};
