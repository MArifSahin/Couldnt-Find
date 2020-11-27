import React, { useEffect, useState } from 'react';
import { Jumbotron, Row, Col, Card, ListGroup, Button, Badge, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Search } from '@internship/ui';
import { api, BookReviewResponse, DashboardBookInfoResponse } from '@internship/shared/api';
import ShowMoreText from 'react-show-more-text';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { API_KEY } from '@internship/shared/types';

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
  background: gray;
`;


export const MyReviews = () => {
  const history = useHistory();
  const [apiKey, setApiKey] = useState(API_KEY);
  const [myReviews, setMyReviews] = useState<BookReviewResponse>(null);
  const [myReviewsLoaded, setMyReviewsLoaded] = useState(false);


  useEffect(() => {
    api.book
      .getMyReviews()
      .then((response) => {
        setMyReviews(response);
        setMyReviewsLoaded(true);
        }
      ).catch((e) => console.error(e));

  }, []);

  const onClick = (bookName,bookId) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+id:${bookId}
      &key=${apiKey}&maxResults=1&orderBy=relevance&printType=books&projection=lite`)
      .then(data => {
        {
          data.data.items.map(book => (
            history.push('/reviewPage', { data: book })
          ));
        }
      });
  };

  let showMyReviews = <Spinner animation="border" />;

  if (myReviewsLoaded) {
    showMyReviews = <ListGroup>{Object.keys(myReviews).map((d, key) => (
      <ListGroup.Item variant='secondary' key={key} className="ml-4">
        <h4><b>{d}</b><Button className="float-right" onClick={() => onClick(d, myReviews[d].bookId)} variant="outline-success">book page</Button></h4>
        <Badge pill variant="info">Your Score: {myReviews[d].score}</Badge>
        <ShowMoreText
          /* Default options */
          lines={5}
          more='Show more'
          less='Show less'
        >
          <p>{myReviews[d].reviewText}</p>
        </ShowMoreText>
        <footer className="blockquote-footer float-right">
          Review Date: {myReviews[d].reviewDate}
        </footer>
      </ListGroup.Item>
    ))}</ListGroup>;
  }

  return (
    <StyledApp>
      <StyledJumbotron><h1>My Reviews</h1></StyledJumbotron>
      <Container>
        <StyledRow>{showMyReviews}</StyledRow>
      </Container>
    </StyledApp>

  );
};
