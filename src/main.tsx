import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './main.css'
import Home from './pages/page_home/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        <Route path={"/"} element={ <Home /> } />

        {/* <Route path="*" element={ <NotFound /> } /> */}

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
