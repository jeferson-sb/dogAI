import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home/Home'
import Dashboard from '@/pages/Dashboard/Dashboard'

const AppRoutes = () => (
  <Routes>
    <Route index path="/" element={<Home />} />
    <Route path="/dash" element={<Dashboard />} />
  </Routes>
)

export default AppRoutes
