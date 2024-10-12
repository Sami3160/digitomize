import React from 'react'
import App from './App'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
export default function GlobalRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<App />} />
                <Route path="/conetst" element={<App />} />
                <Route path="/profile" element={<App />} />
                <Route path="/login" element={<App />} />
                <Route path="/signin" element={<App />} />
                <Route path="/profile" component={<App/>} />
            </Routes>
        </BrowserRouter>
    )
}
