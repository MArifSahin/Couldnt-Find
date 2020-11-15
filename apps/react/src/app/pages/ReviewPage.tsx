import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isNullOrUndefined } from 'util';
import { Button } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import { writeUserReviewAsync } from '../../../../../libs/store/content/src/lib';

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

export const ReviewPage = (props) => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  if (isNullOrUndefined(props.location.data)) {
    history.push('/book');
    return null;
  }
  const book = props.location.data.book;

  const onSubmit = (values) => {
    dispatch(writeUserReviewAsync.request(values));
  };

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
            <p>There is a editor review paragraph</p>
          </Col>
        </StyledRowContent>
        <StyledRowUserReviews>
          <StyledContainer>
            <StyledRow>
              <h2>User Reviews</h2><br />
            </StyledRow>
            <Card bg='secondary' border='danger'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col>
                  <Form.Label>Give your score!</Form.Label>
                </Col>
                <Col>
                  <Form.Group controlId="userScore">
                    <RangeSlider
                      ref={register({ required: true })}
                      value={value}
                      onChange={changeEvent => setValue(changeEvent.target.value)}
                      step={5}
                      variant='info'
                    />
                  </Form.Group>
                </Col>
                <Form.Group controlId="reviewText">
                  <Form.Control
                    ref={register({ required: true })}
                    as="textarea"
                    rows={5}
                    placeholder="Write your review here." />
                </Form.Group>
                <Row className="justify-content-center">
                  <Button type="submit">
                    Submit
                  </Button>
                </Row>
              </Form>
            </Card>

          </StyledContainer>
        </StyledRowUserReviews>
      </StyledContainer>
    </StyledApp>
  );
};
