import React, { useState } from 'react';
import { Jumbotron, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { Search } from '@internship/ui';

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


export const Movie = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [movie, setSearchedItem] = useState("");
  return (
    <StyledApp>
      <StyledJumbotron>
        <Container>
          <Row>
            <Col>
              <h1>This is a movie page</h1>
              <p>This is a paragraph that describes movie page</p>
            </Col>
          </Row>
          <Search whichPage='movie' setSearchResults={setSearchResults} setSearchedItem={setSearchedItem}/>
          {console.log(searchResults)}
        </Container>

      </StyledJumbotron>
      <Container>

        <StyledRow>
          <Col>
            <StyledCard>
              <h3>Find movie of your mood</h3>
            </StyledCard>
          </Col>refre
        </StyledRow>
        <StyledRow>
          <h2>Last Reviewed Movies</h2>
        </StyledRow>
      </Container>

    </StyledApp>

  );
};
