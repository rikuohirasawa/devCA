import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './globalStyles/globalStyles'
import { Header } from './header/Header';
import { Homepage } from './homepage/Homepage'

import { useEffect } from 'react';

import { PageContext, PageContextProvider } from './states/PageContext';


const App: React.FC = () => {


  return (
    <PageContextProvider>
    <div className="App">
      <GlobalStyle/>
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </PageContextProvider>
  );
}

export default App;

