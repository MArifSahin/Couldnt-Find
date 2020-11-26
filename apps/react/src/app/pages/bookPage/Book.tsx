import React, { useEffect, useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import { Jumbotron, Row, Col, Card, Image, Figure, Media, Badge, Spinner, ListGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { api, DashboardBookInfoResponse } from '@internship/shared/api';
import { FindBooksOfYourMood } from './FindBooksOfYourMood';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Search } from '@internship/ui';
import { API_KEY } from '@internship/shared/types';


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
  background: #4F6D65;
`;


export const Book = () => {
  const history = useHistory();
  const [apiKey, setApiKey] = useState(API_KEY);
  const [searchResults, setSearchResults] = useState([]);
  const [book, setSearchedItem] = useState('');
  const [latestReviewedBooks, setLatestReviewedBooks] = useState<DashboardBookInfoResponse>(null);
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

  let showLatestReviewedBook = <Spinner animation="border" />;

  const onClick = (bookName,bookId) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+id:${bookId}
      &key=${apiKey}&maxResults=1&orderBy=relevance&printType=books&projection=lite`)
      .then(data => {
        console.log(data.data.items);
        {
          data.data.items.map(book => (
            history.push('/reviewPage', { data: book })
          ));
        }
      });
  };

  if (latestReviewedBooksLoaded) {
    showLatestReviewedBook = <ListGroup>{Object.keys(latestReviewedBooks).map((d, key) => (
      <ListGroup.Item variant='secondary' key={key} className="ml-4">
        <h4><b>{d}</b><Button className="float-right" onClick={() => onClick(d, latestReviewedBooks[d].bookId)} variant="outline-success">see full
          review</Button></h4>
        Editor Score:<Badge variant="info">{latestReviewedBooks[d].editorScore}</Badge>
        User Score:<Badge variant="info">{latestReviewedBooks[d].userScore}</Badge>
        <ShowMoreText
          /* Default options */
          lines={5}
          more='Show more'
          less='Show less'
        >
          <p>{latestReviewedBooks[d].editorReview}</p>
        </ShowMoreText>
        <footer className="blockquote-footer float-right">
          Wrote by {latestReviewedBooks[d].editor}
        </footer>
      </ListGroup.Item>
    ))}</ListGroup>;
  }

  return (
    <StyledApp>
      <StyledJumbotron>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h1>BOOK</h1>
                  <p>What is your mood's book?<br />Book reviews and more...</p>
                  <Container>
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
                              <i><Link to={{ pathname: '/reviewPage', state: { data: book } }} type="button">Click to
                                see the
                                reviews</Link></i>
                            </Media.Body>
                          </Media>
                        </Row>
                      </>
                    ))}
                  </Container>
                </Col>
              </Row>
            </Col>
            <Col>
              <StyledCard>
                <h3>Find books of your mood</h3>
                <FindBooksOfYourMood />
              </StyledCard>
            </Col>
          </Row>
        </Container>

      </StyledJumbotron>
      <Container>
        <StyledRow>
          <Container>
            <h3>Latest Reviewed Books</h3>
            <StyledRow>
              {showLatestReviewedBook}
            </StyledRow>
          </Container>
        </StyledRow>
      </Container>
    </StyledApp>
  );
};
