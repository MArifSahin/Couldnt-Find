import React, { useState } from 'react';
import { Jumbotron, Row, Col, Card, Image, Figure, Media, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Search } from '@internship/ui';
import { Link } from 'react-router-dom';
import { button } from '@storybook/addon-knobs';


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

  return (
    <StyledApp>
      <StyledJumbotron>
        <Container>
          <Row>
            <Col>
              <h1>There is book page</h1>
              <p>There is a paragraph that describes site</p>
            </Col>
          </Row>
          <Search whichPage='book' setSearchResults={setSearchResults} setSearchedItem={setSearchedItem} />
          {searchResults.map(book => (
            <>
              <Row>
                <Media>
                  <Image className="d-flex mr-3 img-thumbnail align-self-center" src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.title} />
                  <Media.Body>
                    <header className="d-flex mr-3 align-self-center">{book.volumeInfo?.title}</header>
                    <i>Author: {book.volumeInfo?.authors}</i><br/>
                    <i>Editor Score: <Badge variant="info">90</Badge></i><br/>
                    <i>User Score: <Badge variant="info">80</Badge></i><br/>
                    <i><Link to={{ pathname: "/reviewPage", data:{book}}} type="button">Click to see the reviews</Link></i>
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
              <h3>Find book of your mood</h3>
            </StyledCard>
          </Col>
        </StyledRow>
        <StyledRow>
          <h2>Last Reviewed Books</h2>
        </StyledRow>
      </Container>

    </StyledApp>

  );
};
