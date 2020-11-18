import React from 'react';
import { Jumbotron, Row, ModalFooter, Col, Card } from 'react-bootstrap';
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
  background: green;
`;


export const MainPage = () => {
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
          <h2>Last Reviewed Books</h2>
        </StyledRow>
        <StyledRow>
          <h2>Last Reviewed Movies</h2>
        </StyledRow>
        <StyledRow>
          <Col>
            <StyledCard>
              <h3>Most Liked Books</h3>
            </StyledCard>
            </Col>
          <Col>
            <StyledCard>
              <h3>Most Liked Movies</h3>
            </StyledCard>
          </Col>
        </StyledRow>
      </Container>

    </StyledApp>

  );
};
