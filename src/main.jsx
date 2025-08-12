import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import WebLayout from './layouts/web-layout'
import HomePage from './pages/home'
import BlogPage from './pages/blog'
import NewsPage from './pages/news'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<WebLayout />} >
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="news" element={<NewsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)