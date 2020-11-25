import React, { useEffect, useState } from 'react';
import { Jumbotron, Row, Col, Card, Spinner, ListGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {
  api,
  HighestRatedBookInfoResponse,
  HighestReviewedBookInfoResponse,
} from '@internship/shared/api';
import axios from 'axios';
import { API_KEY } from '@internship/shared/types';
import { useHistory } from 'react-router-dom';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
    margin: 0px auto;
    padding: 0px 0px 50px 0px;
    border-bottom: 1px ridge;
    min-height: 400px;
`;

const StyledJumbotron = styled(Jumbotron)`
  padding: 70px 30px 70px 30px;
  margin: 0px auto;
  background: gray;
  color: floralwhite;
`;

const Container = styled.div`
  display: inline-block;
  padding: 1.5rem;
  fluid:xs;
`;

const StyledCard = styled(Card)`
  height: auto;
  background: #01FBB7;
`;


export const MainPage = () => {
  const [highestRatedBooks, setHighestRatedBooks] = useState<HighestRatedBookInfoResponse[]>();
  const history = useHistory();
  const [highestReviewedBooks, setHighestReviewedBooks] = useState<HighestReviewedBookInfoResponse[]>();
  const [apiKey, setApiKey] = useState(API_KEY);
  const [highestRatedBooksLoaded, setHighestRatedBooksLoaded] = useState(false);
  const [highestReviewedBooksLoaded, setHighestReviewedBooksLoaded] = useState(false);

  useEffect(() => {
    api.book
      .getHighestRatedBooks()
      .then((response) => {
          setHighestRatedBooks(response);
          setHighestRatedBooksLoaded(true);
        }
      ).catch((e) => console.error(e));

    api.book
      .getHighestReviewedBooks()
      .then((response) => {
          setHighestReviewedBooks(response);
          setHighestReviewedBooksLoaded(true);
        }
      ).catch((e) => console.error(e));

  }, []);

  const onClick = (bookName) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}
      &key=${apiKey}&maxResults=1&orderBy=relevance&printType=books&projection=lite`)
      .then(data => {
        {data.data.items.map(book => (
          history.push('/reviewPage',{data:book})
        ))}
      })
  };

  let showHighestRatedBook=<Spinner animation="border"></Spinner>;
  let showHighestReviewedBook=<Spinner animation="border"></Spinner>;

  if (highestRatedBooksLoaded) {
    showHighestRatedBook=<Container><ListGroup>{Object.keys(highestRatedBooks).map((d, key) => (
          <ListGroup.Item variant='secondary' key={key} className="ml-4">
            <Row><Col><b>{d} : </b> </Col><Col>{highestRatedBooks[d]}</Col></Row>
            <Button size="sm" className="float-right" onClick={() => onClick(d)} variant="outline-success">see review</Button>
          </ListGroup.Item>
    ))}</ListGroup></Container>
  }

  if (highestReviewedBooksLoaded) {
    showHighestReviewedBook=<Container><ListGroup>{Object.keys(highestReviewedBooks).map((d, key) => (
      <ListGroup.Item variant='secondary' key={key} className="ml-4">
        <Row><Col><b>{d} : </b> </Col><Col>{highestReviewedBooks[d]}</Col></Row>
        <Button size="sm" className="float-right" onClick={() => onClick(d)} variant="outline-success">see review</Button>
      </ListGroup.Item>
    ))}</ListGroup></Container>
  }

  return (
    <StyledApp>
      <StyledJumbotron>
        <Container>
          <Row>
            <Col>
              <h1>This is a home page</h1>
              <p>This is a paragraph that describes site</p>
            </Col>
          </Row>
        </Container>

      </StyledJumbotron>
      <Container>
        <StyledRow>
          <Col>
            <StyledCard>
              <h3>Highest Rated Books</h3>
              <StyledRow>{showHighestRatedBook}</StyledRow>
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <h3>Most Reviewed Books</h3>
              <StyledRow>{showHighestReviewedBook}</StyledRow>
            </StyledCard>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col>
            <StyledCard>
              <h3>Most Liked Movies</h3>
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <h3>Most Reviewed Movies</h3>
            </StyledCard>
          </Col>
        </StyledRow>
      </Container>

    </StyledApp>

  );
};
