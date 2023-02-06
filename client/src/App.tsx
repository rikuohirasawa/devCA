import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyles/globalStyles'
import { Header } from './header/Header';
import { Homepage } from './homepage/Homepage'
import { Dashboard } from './dashboard/Dashboard';
import { About } from './about/About';
import { PageContextProvider } from './states/PageContext';


const App: React.FC = () => {
  return (
    <PageContextProvider>
      <GlobalStyle/>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </PageContextProvider>
  );
}

export default App;

