import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './globalStyles/globalStyles'
import { Header } from './header/Header';
import { Homepage } from './homepage/Homepage'

import { useEffect } from 'react';

import { Dashboard } from './dashboard/Dashboard';

import { PageContext, PageContextProvider } from './states/PageContext';


const App: React.FC = () => {
  return (
    <PageContextProvider>
      <GlobalStyle/>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </PageContextProvider>
  );
}

export default App;

