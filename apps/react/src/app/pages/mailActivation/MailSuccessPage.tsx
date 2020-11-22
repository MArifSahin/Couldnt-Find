import React from 'react';
import { faCheck, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledIcon = styled(FontAwesomeIcon)`
  color: green;
  margin-right: 1rem;
  margin-left: 1rem;
`;

export const MailSuccessPage = () => {
  return (
    <div className="alert alert-success mt-5 text-center" role="alert">
      <StyledIcon icon={faCheck} />
      Mailiniz Başarı ile Aktive edilmiştir.
      <Link to="/login" className="alert-link">
        {' '}
        Giriş yapmak için tıklayınız.
        <StyledIcon icon={faChevronCircleRight} />
      </Link>
    </div>
  );
};
