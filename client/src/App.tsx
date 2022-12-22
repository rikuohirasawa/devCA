import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './globalStyles/globalStyles'
import { Header } from './header/Header';
import { Homepage } from './homepage/Homepage'

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle/>

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
