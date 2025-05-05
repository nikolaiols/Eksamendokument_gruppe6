import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import EventCard from './components/EventCard.jsx'

function App() {
  
  return (
    <>
    <Layout>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path= "/category/:slug" element={<CategoryPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/event/:slug" element={<EventCard />}></Route>
    </Routes>
    </Layout>
    </>
  )
}

export default App
