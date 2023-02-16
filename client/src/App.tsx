import React, { useEffect } from 'react';
import MainRoutes from './routes/routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import deliveryApi from './services/deliveryApi/deliveryApi'


function App() {

  const api = deliveryApi


  useEffect(()=> {
    deliveryApi.userRefresh()

    setInterval(()=> {
      deliveryApi.userRefresh()
    }, 295000)
  },[])
  

  const theme = {
    primaryColor: '#FB9400',
    secondaryColor: '',
    fontColor: '#4A4A4A',
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
