
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import Signup from './pages/Signup'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <main className='container pb-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<PostList />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
