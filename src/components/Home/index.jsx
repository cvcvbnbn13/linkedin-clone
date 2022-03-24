import styled from 'styled-components';
import LeftSide from '../LeftSide';
import Main from '../Main';
import RightSide from '../RightSide';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = props => {
  const { user } = useSelector(state => {
    return state.userState;
  });

  return (
    <Container>
      {!user && <Redirect to="/" />}
      <Section>
        <h5>
          <a>正在找優秀人才? - </a>
        </h5>
        <p>透過上傳職缺在短時間內找到專業人才</p>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'leftside main rightside';
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
