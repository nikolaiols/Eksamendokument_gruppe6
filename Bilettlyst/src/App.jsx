import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'

function App() {
  

  return (
    <>
    <Layout>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/2" element={<Home />}></Route>
        <Route path= "/3" element={<Home />}></Route>
        <Route path="/4" element={<Home />}></Route>
    </Routes>
    </Layout>
    </>
  )
}

export default App
