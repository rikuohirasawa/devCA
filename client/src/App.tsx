import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './globalStyles/globalStyles'
import { Header } from './header/Header';
import { Homepage } from './homepage/Homepage'

import { useEffect } from 'react';


const App: React.FC = () => {

  useEffect(()=>{
    fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=region_data`)
    .then(res=>{
      console.log(res)
      return res.json()})
      .then(data=>{
        console.log(data)
      })
  }, [])
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

