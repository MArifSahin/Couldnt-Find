import React from 'react';
import { faChevronCircleDown, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Alert, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { api } from '@internship/shared/api';
import { Button, Input } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StyledIcon = styled(FontAwesomeIcon)`
  color: red;
  margin-right: 1rem;
`;

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const StyledRow = styled(Row)`
  flex-wrap: wrap;
  display: flex;
  text-align-last: center;
  margin-top: 2rem;
  justify-content: center;
`;

export const MailErrorPage = () => {
  const { handleSubmit, register, errors } = useForm();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    api.auth
      .sendActivation(value.email)
      .then((r) => console.log(r + ' deneme'))
      .catch((e) => console.error(e));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'email') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  return (
    <>
      <div className="alert alert-danger mt-5" role="alert">
        <h4 className="alert-heading text-center">
          {' '}
          <StyledIcon icon={faFrown} />
          HATA
        </h4>
        <hr />
        <h5>
          {' '}
          <p className="text-center">Maillinizi doğrulamakta zorlanıyorsunuz.</p>
        </h5>
        <h5>
          {' '}
          <p className="mb-0 text-center ">Tekrardan aktivasyon kodu almak için lütfen mailinizi giriniz.</p>
        </h5>
      </div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledRow>
            <div className="col-8 ">
              <Input
                placeholder="Enter your e-mail"
                type="email"
                name="email"
                onChange={onChange}
                ref={register({ required: true })}
                errors={errors}
              />
            </div>
          </StyledRow>
          <StyledRow>
            <Button variant="outline-primary" type="submit">
              Aktivasyon Kodu İste
            </Button>
          </StyledRow>
          {isErrorRequired ? (
            <StyledDiv>
              <Alert variant="danger">{isErrorRequired}</Alert>
              <Link type="button" to="/register" onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                <Button>Kayıt Ol</Button>
              </Link>
            </StyledDiv>
          ) : null}
          {isSuccessRequired ? (
            <StyledDiv>
              <Alert variant="success">{isSuccessRequired}</Alert>
              <Link type="button" to="/login" onClick={() => dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null })}>
                <Button>Giriş Yap</Button>
              </Link>
            </StyledDiv>
          ) : null}
        </form>
      </Container>
    </>
  );
};
