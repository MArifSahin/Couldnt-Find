import { Alert, Col, Form, Row } from 'react-bootstrap';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTemporary } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { Button } from '@internship/ui';
import styled from 'styled-components';
import { becomeEditorAsync, updateAsync } from '@internship/store/authentication';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
  padding:1rem;
`;

export const BecomeAnEditor = () => {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(becomeEditorAsync.request(values));
  };
  const onChange = () => {
    setOpen(true);
  };

  return (
    <StyledApp>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="name">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="name" type="name" onChange={onChange}
                          ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="lastname">
          <Form.Label column sm={2}>
            Lastname
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="lastname" type="lastname" onChange={onChange}
                          ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="email">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="email" type="email" onChange={onChange}
                          ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="phoneNumber">
          <Form.Label column sm={2}>
            Phone Number
          </Form.Label>
          <Col sm={4}>
            <Form.Control name="phoneNumber" onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="whatDoYouWant">
          <Form.Label column sm={2}>
            What do you want to write a review about?
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="whatDoYouWant"
                          as="textarea" rows={5} onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="hobbies">
          <Form.Label column sm={2}>
            Hobbies and Interests
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="hobbies"
                          as="textarea" rows={5} onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="education">
          <Form.Label column sm={2}>
            Educational Background
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="education"
                          as="textarea" rows={5} onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="favBook">
          <Form.Label column sm={2}>
            Write your favorite 5 books
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="favBook"
                          as="textarea" rows={5} onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="favMovie">
          <Form.Label column sm={2}>
            Write your favorite 5 movies
          </Form.Label>
          <Col sm={8}>
            <Form.Control name="favMovie"
                          as="textarea" rows={5} onChange={onChange}
                          ref={register({ required: false })} />
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <Button type="submit" disabled={!open}>
            Send Application Form
          </Button>
        </Row>
      </Form>
    </StyledApp>
  );
};
