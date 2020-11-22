import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { isNullOrUndefined } from 'util';
import { Button } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import { writeEditorReviewAsync, writeUserReviewAsync } from '@internship/store/content';
import { WriteUserReview } from './WriteUserReview';
import { WriteEditorReview } from './WriteEditorReview';
import { api } from '@internship/shared/api';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const StyledRowContent = styled(Row)`
  border-style: ridge;
  border-color: gray;
  margin-bottom: 1rem;
  min-height : 800px;
`;

const StyledRowUserReviews = styled(Row)`
  border-style: ridge;
  border-color: #65b5b1;
  margin-bottom: 1rem;
  min-height : 800px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const StyledP = styled.p`
  color: #bf1650;
`;
const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const StyledContainer = styled(Container)`
  fluid:md;
  display: inline-block;
  padding: 1rem;
`;

export const BookReviewPage = (props) => {
  const history = useHistory();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [bookContent, setBookContent] = useState(null);
  const bookRedirect = props.location.data ? null  : <Redirect to="/book"/>;

  if (isNullOrUndefined(props.location.data)) {
    history.push('/book');
    return null;
  }
  const book = props.location.data.book;
  useEffect(() => {
    console.log('BOOK ID: '+book.id);
    api.book
      .getBookContent(book.id)
      .then((r) => setBookContent(r))
      .catch((e) => console.error(e));
  });

  console.log(bookContent);

  //TODO hard coded
  return (
    <StyledApp>
      <StyledContainer>
        <StyledRowContent>
          <Col sm={3}>
            <Card
              bg="secondary"
              className="mb-2"
            >
              <Card.Img className="d-flex mr-3 img-thumbnail align-self-center"
                        src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.title} />
              <Card.Body>
                <Card.Title className="d-flex mr-3 align-self-center">{book.volumeInfo?.title}</Card.Title>
                <Card.Text>
                  <i>Author: {book.volumeInfo?.authors}</i><br />
                  <i>Editor Score:<Badge variant="info">90</Badge></i><br />
                  <i>User Score:<Badge variant="info">80</Badge></i><br />
                  <i><b>Mode of the book</b></i><br />
                  <i>Drama</i><Badge variant="info">90</Badge><br />
                  <i>Comedy</i><Badge variant="info">90</Badge><br />
                  <i>Romance</i><Badge variant="info">90</Badge><br />
                  <i>Thriller</i><Badge variant="info">90</Badge><br />
                  <i>Action</i><Badge variant="info">90</Badge><br />
                  <i>Adventure</i><Badge variant="info">90</Badge><br />
                  <i>Horror</i><Badge variant="info">90</Badge><br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h1>Editor Review</h1><br />
            <p>
              <WriteEditorReview book={book} />
            </p>
          </Col>
        </StyledRowContent>
        <StyledRowUserReviews>
          <StyledContainer>
            <StyledRow>
              <h2>User Reviews</h2><br />
              <WriteUserReview book={book} />
            </StyledRow>

          </StyledContainer>
        </StyledRowUserReviews>
      </StyledContainer>
    </StyledApp>
  );
};
