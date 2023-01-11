import React from 'react';
import MainRoutes from './routes/routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';

function App() {

  const theme = {
    primaryColor: '#FB9400',
    secondaryColor: '',
    fontColor: '',
    offwhite: ''
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainRoutes/> 
      </ThemeProvider>
    </div>
  );
}

export default App;
