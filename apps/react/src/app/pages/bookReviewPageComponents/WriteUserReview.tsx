import React, { useState } from 'react';
import { Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import {  writeUserReviewAsync } from '@internship/store/content';
import styled from 'styled-components';
import { api } from '@internship/shared/api';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled(Container)`
  fluid:md;
  display: inline-block;
  padding: 1rem;
`;

type WriteUserReviewProps = {
  bookContent;
  setContentChange;
};

export const WriteUserReview: React.FC<WriteUserReviewProps> = ({ bookContent, setContentChange }) => {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const [userScore, setUserScore] = useState(0);
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  const book = bookContent;
  const onSubmit = (values) => {
    values.userScore = userScore;
    values.bookId = book.id;
    values.bookName = book.volumeInfo.title;
    //TODO make this request async
    // dispatch(writeUserReviewAsync.request(values));
    api.book
      .writeUserReview(values)
      .then( setContentChange(true))
      .catch((e) => console.error(e));
  };

  return (
    <StyledContainer>
      <Card bg='secondary' border='danger'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Alert variant="info"> If you already wrote a review for this book, it will be updated with this one.</Alert>
          <Col>
            <Form.Label>Give your score!</Form.Label>
          </Col>
          <Col>
            <Form.Group controlId="userScore">
              <RangeSlider name="userScore" ref={register({ required: true })} value={userScore}
                           onChange={changeEvent => setUserScore(changeEvent.target.value)} step={5}
                           variant='danger' />
            </Form.Group>
          </Col>
          <Form.Group controlId="reviewText">
            <Form.Control
              name="reviewText"
              ref={register({ required: true })}
              as="textarea"
              rows={5}
              placeholder="Write your review here." />
          </Form.Group>
          <Row className="justify-content-center">
            <Button type="submit" value="writeUserReview">
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
    </StyledContainer>
  );
};
