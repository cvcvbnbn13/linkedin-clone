import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const AppLoading = ({ show }) => {
  return (
    <AppLoadingContainer>
      <AppLoadingContents>
        <img
          src="/images/login-logo.svg"
          alt=""
          style={show ? { display: 'block' } : { display: 'none' }}
        />
        <Spinner name="ball-spin-fade-loader" color="#0a66c2" fadeIn="none" />
      </AppLoadingContents>
    </AppLoadingContainer>
  );
};

export default AppLoading;

const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
