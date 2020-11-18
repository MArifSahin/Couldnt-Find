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
import { writeEditorReviewAsync, writeUserReviewAsync } from '@internship/store/content';

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
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [userScore, setUserScore] = useState(0);
  const [editorScore, setEditorScore] = useState(0);
  const [drama, setDrama] = useState(0);
  const [fun, setFun] = useState(0);
  const [action, setAction] = useState(0);
  const [adventure, setAdventure] = useState(0);
  const [romance, setRomance] = useState(0);
  const [thriller, setThriller] = useState(0);
  const [horror, setHorror] = useState(0);
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  if (isNullOrUndefined(props.location.data)) {
    history.push('/book');
    return null;
  }
  const book = props.location.data.book;
  const onSubmitUserReview = (values) => {
    values.userScore = userScore;
    values.bookId = book.id;
    values.bookName = book.volumeInfo.title;
    dispatch(writeUserReviewAsync.request(values));
  };

  const onSubmitEditorReview = (values) => {
    values.editorScore = editorScore;
    values.drama = drama;
    values.action = action;
    values.adventure = adventure;
    values.romance = romance;
    values.horror = horror;
    values.thriller = thriller;
    values.bookId = book.id;
    values.bookName = book.volumeInfo.title;
    console.log(values);
    dispatch(writeEditorReviewAsync.request(values));
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
            <p>
              <Form onSubmit={handleSubmit(onSubmitEditorReview)}>
                <Form.Group controlId="editorScore">
                  <Form.Label>
                    <b>Editor Score</b>
                  </Form.Label>
                  <Col>
                    <RangeSlider name="editorScore" tooltip='on' ref={register({ required: true })} Label='Editor Score'
                                 onChange={changeEvent => setEditorScore(changeEvent.target.value)} step={5} variant='danger' />
                  </Col>
                  <Form.Label>
                    <b>Book Modes</b>
                  </Form.Label>
                  <Row>
                    <Col>
                      <i>Drama: </i>
                      <RangeSlider name="dramaScore" ref={register({ required: true })}
                                   onChange={changeEvent => setDrama(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Fun: </i>
                      <RangeSlider name="funScore" ref={register({ required: true })}
                                   onChange={changeEvent => setFun(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Action: </i>
                      <RangeSlider name="actionScore" ref={register({ required: true })}
                                   onChange={changeEvent => setAction(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Adventure: </i>
                      <RangeSlider name="adventureScore" ref={register({ required: true })}
                                   onChange={changeEvent => setAdventure(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Romance: </i>
                      <RangeSlider name="romanceScore" ref={register({ required: true })}
                                   onChange={changeEvent => setRomance(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Horror: </i>
                      <RangeSlider name="horrorScore" ref={register({ required: true })}
                                   onChange={changeEvent => setHorror(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <i>Thriller: </i>
                      <RangeSlider name="thrillerScore" ref={register({ required: true })}
                                   onChange={changeEvent => setThriller(changeEvent.target.value)} step={20} variant='danger' />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="reviewText">
                  <Form.Control
                    name="reviewText"
                    ref={register({ required: true })}
                    as="textarea"
                    rows={20}
                    placeholder="Write your editor review here." />
                </Form.Group>
                <Row className="justify-content-center">
                  <Button type="submit" value="writeEditorReview">
                    Submit
                  </Button>
                </Row>
              </Form>
            </p>
          </Col>
        </StyledRowContent>
        <StyledRowUserReviews>
          <StyledContainer>
            <StyledRow>
              <h2>User Reviews</h2><br />
            </StyledRow>
            <Card bg='secondary' border='danger'>
              <Form onSubmit={handleSubmit(onSubmitUserReview)}>
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
        </StyledRowUserReviews>
      </StyledContainer>
    </StyledApp>
  );
};
