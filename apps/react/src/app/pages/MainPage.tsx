import React, { useEffect, useState } from 'react';
import { Jumbotron, Row, Col, Card, Spinner, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import {
  api,
  HighestRatedBookInfoResponse,
  HighestReviewedBookInfoResponse,
} from '@internship/shared/api';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
    margin: 0px auto;
    padding: 50px 0px 50px 0px;
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
  padding: 4.5rem;
`;

const StyledCard = styled(Card)`
  min-height: 400px;
  background: green;
`;


export const MainPage = () => {
  const [highestRatedBooks, setHighestRatedBooks] = useState<HighestRatedBookInfoResponse[]>();
  const [highestReviewedBooks, setHighestReviewedBooks] = useState<HighestReviewedBookInfoResponse[]>();
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

  let showHighestRatedBook=<Spinner animation="border"></Spinner>;
  let showHighestReviewedBook=<Spinner animation="border"></Spinner>;

  if (highestRatedBooksLoaded) {
    showHighestRatedBook=<ListGroup>{Object.keys(highestRatedBooks).map((d, key) => (
          <ListGroup.Item variant='danger' key={key} className="ml-4">
            <i><b>{d} : </b></i>
            <i>{highestRatedBooks[d]}</i>
          </ListGroup.Item>
        ))}</ListGroup>
  }

  if (highestReviewedBooksLoaded) {
    showHighestReviewedBook=<ListGroup>{Object.keys(highestReviewedBooks).map((d, key) => (
      <ListGroup.Item variant='danger' key={key} className="ml-4">
        <i><b>{d} : </b></i>
        <i>{highestReviewedBooks[d]}</i>
      </ListGroup.Item>
    ))}</ListGroup>
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
