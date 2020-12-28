import { Container, styled } from '@material-ui/core';
import React from 'react';
import './App.css';
import { PhoneInput } from './components/PhoneInput';



function App() { 
  return (
    <StyledContainer>
      <PhoneInput />
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  display:'flex',
  justifyContent:'center',
  marginTop:'50px'
})
export default App;
