import React, { useEffect, useState } from 'react';
import { Alert, Badge, Card, Col, Container, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { isNullOrUndefined } from 'util';
import { useGetRole, useTemporary } from '@internship/shared/hooks';
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
  const { role } = useGetRole();
  const [bookContent, setBookContent] = useState(null);
  const [bookLoaded, setBookLoaded] = useState(false);
  let book;

  if (isNullOrUndefined(props.location.data) && isNullOrUndefined(props.location.state.data)) {
    history.push('/book');
    return null;
  }
  props.location.data ? book = props.location.data.book : book= props.location.state.data;

  useEffect(() => {
    api.book
      .getBookContent(book.id)
      .then((r) => {
        setBookContent(r);
        setBookLoaded(true);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <StyledApp>
      <StyledContainer>
        {bookLoaded ?
          <>
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
                      <i>Editor Score:<Badge variant="info">{bookContent.editorScore}</Badge></i><br />
                      <i>User Score:<Badge variant="info">{bookContent.userScore}</Badge></i><br />
                      <i><b>Mode of the book</b></i><br />
                      <i>Drama</i><Badge variant="info">{bookContent.modes.drama}</Badge><br />
                      <i>Fun</i><Badge variant="info">{bookContent.modes.fun}</Badge><br />
                      <i>Romance</i><Badge variant="info">{bookContent.modes.romance}</Badge><br />
                      <i>Thriller</i><Badge variant="info">{bookContent.modes.thriller}</Badge><br />
                      <i>Action</i><Badge variant="info">{bookContent.modes.action}</Badge><br />
                      <i>Adventure</i><Badge variant="info">{bookContent.modes.adventure}</Badge><br />
                      <i>Horror</i><Badge variant="info">{bookContent.modes.horror}</Badge><br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <h1>Editor Review</h1><br />
                {(bookContent.editorReview) ? (
                  <>
                    <p>{bookContent.editorReview}</p>
                    <footer className="blockquote-footer float-right">
                      {bookContent.editor} wrote this review
                    </footer>
                  </>
                ) : (
                  (role.valueOf()==="ROLE_EDITOR") ? (<WriteEditorReview book={book} />) : null
                )}
              </Col>
            </StyledRowContent>
            <StyledRowUserReviews>
              <StyledContainer>
                <StyledRow>
                  <h2>User Reviews</h2><br />
                  {(role.valueOf()==="ROLE_USER") ? (<WriteUserReview book={book} />) : null}
                  <ListGroup>{Object.keys(bookContent.userReviews).map((d, key) => (
                      <ListGroup.Item variant='success' key={key} className="ml-4">
                        <p>{bookContent.userReviews[d]}</p>
                        <footer className="blockquote-footer float-right">
                          {d}
                        </footer>
                      </ListGroup.Item>
                    ))}</ListGroup>
                </StyledRow>

              </StyledContainer>
            </StyledRowUserReviews>
          </>
          :
          <>
            <Alert variant="secondary">There are no reviews for this book</Alert>
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
                      <i>Editor Score:<Badge variant="info">-</Badge></i><br />
                      <i>User Score:<Badge variant="info">-</Badge></i><br />
                      <i><b>Mode of the book</b></i><br />
                      <i>Drama</i><Badge variant="info">-</Badge><br />
                      <i>Comedy</i><Badge variant="info">-</Badge><br />
                      <i>Romance</i><Badge variant="info">-</Badge><br />
                      <i>Thriller</i><Badge variant="info">-</Badge><br />
                      <i>Action</i><Badge variant="info">-</Badge><br />
                      <i>Adventure</i><Badge variant="info">-</Badge><br />
                      <i>Horror</i><Badge variant="info">-</Badge><br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <h1>Editor Review</h1><br />
                <WriteEditorReview book={book} />
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
          </>
        }

      </StyledContainer>
    </StyledApp>
  );
};
