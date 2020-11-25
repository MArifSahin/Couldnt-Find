import React, { useState } from 'react';
import { Alert, Badge, Card, Col, Container, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useForm } from 'react-hook-form';
import { Button } from '@internship/ui';
import styled from 'styled-components';
import { api, BooksOfYourMoodInfoResponse, HighestReviewedBookInfoResponse } from '@internship/shared/api';
import axios from 'axios';
import { API_KEY } from '@internship/shared/types';
import { useHistory } from 'react-router-dom';


const StyledApp = styled.div`
  font-family: Georgia, serif;
  text-align: center;
`;


export const FindBooksOfYourMood = () => {
  const [books, setBooks] = useState<BooksOfYourMoodInfoResponse[]>();
  const [booksLoaded, setBooksLoaded] = useState(false);
  const history = useHistory();
  const [apiKey, setApiKey] = useState(API_KEY);
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

  const onClick = (bookName) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}
      &key=${apiKey}&maxResults=1&orderBy=relevance&printType=books&projection=lite`)
      .then(data => {
        {
          data.data.items.map(book => (
            history.push('/reviewPage', { data: book })
          ));
        }
      });
  };

  let showBooks = <span />;
  const onSubmit = (values) => {
    showBooks = <Spinner animation="border" />;
    values = moods;
    //TODO make this request async
    api.book
      .getBooksOfYourMood(values)
      .then((response) => {
          setBooks(response);
          setBooksLoaded(true);
        }
      ).catch((e) => console.error(e));
  };
  if (booksLoaded) {
    if(books.length===0){
      showBooks=<Alert variant="info">There is no such book... You are in a bad mood huh!</Alert>
    }else{
      showBooks = <Container fluid><ListGroup>{books.map(book => (
        <ListGroup.Item variant='secondary' key={book.bookName} className="ml-4">
          <h5><b>{book.bookName}</b></h5>
          <Badge variant="dark">Editor:{book.editorScore}</Badge>
          <Badge variant="secondary">User:{book.userScore}</Badge>
          <Button size="sm" className="float-right" onClick={() => onClick(book.bookName)} variant="outline-success">see
            review</Button>
          {/*Editor Score:<Badge variant="info">{d}</Badge>*/}
          {/*User Score:<Badge variant="info">{books}</Badge>*/}
        </ListGroup.Item>
      ))}</ListGroup></Container>;
    }

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
