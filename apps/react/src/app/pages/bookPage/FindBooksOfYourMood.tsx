import React, { useState } from 'react';
import { Badge, Card, Col, Container, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { Button } from '@internship/ui';
import styled from 'styled-components';
import { api, BooksOfYourMoodInfoResponse, HighestRatedBookInfoResponse } from '@internship/shared/api';


const StyledApp = styled.div`
  font-family: Georgia, serif;
  text-align: center;
`;


export const FindBooksOfYourMood = () => {
  const [books, setBooks] = useState<BooksOfYourMoodInfoResponse[]>();
  const [booksLoaded, setBooksLoaded] = useState(false);
  const { handleSubmit, register } = useForm();
  const [moods, setMoods] = useState({
    drama: 0,
    fun: 0,
    action: 0,
    adventure: 0,
    romance: 0,
    thriller: 0,
    horror: 0
  });

  let showBooks = <span />;
  const onSubmit = (values) => {
    showBooks = <Spinner animation="border" />;
    values = moods;
    console.log(values);
    //TODO make this request async
    api.book
      .getBooksOfYourMood(values)
      .then((response) => {
          setBooks(response);
          setBooksLoaded(true)
        }
      ).catch((e) => console.error(e));
  };
  if (booksLoaded) {
    showBooks = <ListGroup>{books.map(book => (
      <ListGroup.Item variant='danger' key={book.bookName} className="ml-4">
        <h4><b>{book.bookName}</b></h4>
        {/*Editor Score:<Badge variant="info">{d}</Badge>*/}
        {/*User Score:<Badge variant="info">{books}</Badge>*/}
      </ListGroup.Item>
    ))}</ListGroup>;
  }
  return (
    <StyledApp>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="findBooksOfYourMood">
          <Form.Label>
            Please select below the levels you want to experience while reading
          </Form.Label>
          <Row>
            <Col>
              <i>Drama: </i>
              <RangeSlider name="dramaScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,drama:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Fun: </i>
              <RangeSlider name="funScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,fun:changeEvent.target.value})} step={20} variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Action: </i>
              <RangeSlider name="actionScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,action:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Adventure: </i>
              <RangeSlider name="adventureScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,adventure:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Romance: </i>
              <RangeSlider name="romanceScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,romance:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Horror: </i>
              <RangeSlider name="horrorScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,horror:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Thriller: </i>
              <RangeSlider name="thrillerScore" ref={register({ required: true })}
                           onChange={changeEvent => setMoods({...moods,thriller:changeEvent.target.value})} step={20}
                           variant='danger' />
            </Col>
          </Row>
        </Form.Group>
        <Row className="justify-content-center">
          <Button type="submit" value="findBooksOfYourMood">
            Submit
          </Button>
        </Row>
      </Form>
      {showBooks}
    </StyledApp>
  );
};
