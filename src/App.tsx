import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'
import Prices from './pages/Prices'
import Services from './pages/Services'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="services" element={<Services />} />
        <Route path="prices" element={<Prices />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
