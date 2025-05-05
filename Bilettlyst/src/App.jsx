import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import Home from './Components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'

function App() {
  
  return (
    <>
    <Layout>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/event/:id" element={<EventPage />}></Route>
        <Route path= "/category/:slug" element={<CategoryPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
    </Layout>
    </>
  )
}

export default App
