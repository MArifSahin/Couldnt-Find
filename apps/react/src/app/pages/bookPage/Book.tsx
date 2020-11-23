import React, { useEffect, useState } from 'react';
import { Jumbotron, Row, Col, Card, Image, Figure, Media, Badge, Spinner, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Search } from '@internship/ui';
import { Link } from 'react-router-dom';
import { api, LatestReviewedBookInfoResponse } from '@internship/shared/api';
import { FindBooksOfYourMood } from './FindBooksOfYourMood';


const StyledApp = styled.div`
  font-family: Georgia, serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
    margin: 0px auto;
    padding: 50px 0px 50px 0px;
    border-bottom: 1px ridge;
    min-height: 400px;
`;

const StyledJumbotron = styled(Jumbotron)`
  fluid;
  padding: 70px 30px 70px 30px;
  margin: 0px;
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


export const Book = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [book, setSearchedItem] = useState('');
  const [latestReviewedBooks, setLatestReviewedBooks] = useState<LatestReviewedBookInfoResponse>(null);
  const [latestReviewedBooksLoaded, setLatestReviewedBooksLoaded] = useState(false);

  useEffect(() => {
    api.book
      .getLatestReviews()
      .then((response) => {
          setLatestReviewedBooks(response);
          setLatestReviewedBooksLoaded(true);
        }
      ).catch((e) => console.error(e));

  }, []);

  let showLatestReviewedBook = <Spinner animation="border"/>;

  if (latestReviewedBooksLoaded) {
    console.log(latestReviewedBooks);
    showLatestReviewedBook = <ListGroup>{Object.keys(latestReviewedBooks).map((d, key) => (
      <ListGroup.Item variant='danger' key={key} className="ml-4">
        <h4><b>{d}</b></h4>
        Editor Score:<Badge variant="info">{latestReviewedBooks[d].editorScore}</Badge>
        User Score:<Badge variant="info">{latestReviewedBooks[d].userScore}</Badge>
        <p>{latestReviewedBooks[d].editorReview}</p>
        <footer>{latestReviewedBooks[d].editor}</footer>
      </ListGroup.Item>
    ))}</ListGroup>;
  }

  return (
    <StyledApp>
      <StyledJumbotron>
        <Container>
          <Row>
            <Col>
              <h1>This is a book page</h1>
              <p>This is a paragraph that describes book page</p>
            </Col>
          </Row>
          <Search whichPage='book' setSearchResults={setSearchResults} setSearchedItem={setSearchedItem} />
          {searchResults.map(book => (
            <>
              <Row>
                <Media>
                  <Image className="d-flex mr-3 img-thumbnail align-self-center"
                         src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.title} />
                  <Media.Body>
                    <header className="d-flex mr-3 align-self-center">{book.volumeInfo?.title}</header>
                    <i>Author: {book.volumeInfo?.authors}</i><br />
                    <i><Link to={{ pathname: '/reviewPage', data: { book } }} type="button">Click to see the
                      reviews</Link></i>
                  </Media.Body>
                </Media>
              </Row>
            </>
          ))}
        </Container>

      </StyledJumbotron>
      <Container>

        <StyledRow>
          <Col>
            <StyledCard>
              <h3>Find books of your mood</h3>
              <FindBooksOfYourMood/>
            </StyledCard>
          </Col>
        </StyledRow>
        <StyledRow>
          <Container>
            <h3>Latest Reviewed Books</h3>
            <StyledRow>{showLatestReviewedBook}</StyledRow>
          </Container>
        </StyledRow>
      </Container>
    </StyledApp>
  );
};
