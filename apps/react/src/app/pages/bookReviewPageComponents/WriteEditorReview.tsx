import React, { useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Popup } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import { writeEditorReviewAsync, writeUserReviewAsync } from '@internship/store/content';
import styled from 'styled-components';
import { api } from '@internship/shared/api';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled(Container)`
  fluid:md;
  display: inline-block;
  padding: 1rem;
`;

type WriteEditorReviewProps = {
  bookContent;
  setContentChange;
};

export const WriteEditorReview: React.FC<WriteEditorReviewProps> = ({ bookContent, setContentChange }) => {
  const { handleSubmit, register } = useForm();
  const [userScore, setUserScore] = useState(0);
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [editorScore, setEditorScore] = useState(0);
  const [moods, setMoods] = useState({
    drama: 0,
    fun: 0,
    action: 0,
    adventure: 0,
    romance: 0,
    thriller: 0,
    horror: 0
  });

  const book = bookContent;
  const onSubmit = (values) => {
    values.moods = moods;
    values.bookId = book.id;
    values.bookName = book.volumeInfo.title;
    values.editorScore = editorScore;

    //TODO make this request async
    // dispatch(writeEditorReviewAsync.request(values));
    api.book
      .writeEditorReview(values)
      .then(setContentChange(true))
      .catch((e) => console.error(e));

  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="editorScore">
          <Form.Label>
            <b>Editor Score</b>
          </Form.Label>
          <Col>
            <RangeSlider name="editorScore" tooltip='on' ref={register({ required: true })} Label='Editor Score'
                         value={editorScore}
                         onChange={changeEvent => setEditorScore(changeEvent.target.value)} step={5} variant='danger' />
          </Col>
          <Form.Label>
            <b>Book moods</b>
          </Form.Label>
          <Row>
            <Col>
              <i>Drama: </i>
              <RangeSlider name="dramaScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, drama: changeEvent.target.value })} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Fun: </i>
              <RangeSlider name="funScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, fun: changeEvent.target.value })} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Action: </i>
              <RangeSlider name="actionScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, action: changeEvent.target.value })} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Adventure: </i>
              <RangeSlider name="adventureScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, adventure: changeEvent.target.value })}
                           step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Romance: </i>
              <RangeSlider name="romanceScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, romance: changeEvent.target.value })} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Horror: </i>
              <RangeSlider name="horrorScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, horror: changeEvent.target.value })} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Thriller: </i>
              <RangeSlider name="thrillerScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({ ...moods, thriller: changeEvent.target.value })}
                           step={20}
                           variant='danger' />
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
    </StyledContainer>
  );
};
