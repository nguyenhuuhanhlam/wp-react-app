import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import WebLayout from './layouts/web-layout'
import HomePage from './pages/home'
import BlogPage from './pages/blog'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<WebLayout />} >
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)