import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout, Home, Blog, CreateBlog} from './index.jsx'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/blog/:id' element={<Blog/>}/>
            <Route path='/create' element={< CreateBlog/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
