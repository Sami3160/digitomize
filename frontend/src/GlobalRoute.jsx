import React, { Suspense } from 'react'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SigninPage from './views/signin-page'
import Navbar from './test/navbar'
import { LoginFormDemo } from './test/login-form'
import Loader from './components/loader'
import ProblemsPage from './views/problems'
import CompanyProblems from './views/CompanyProblems'
import Footer from './components/footer'
import Contests from './components/Contests'
import Dashboard from './views/Dashboard'
export default function GlobalRoute() {
    return (
        <BrowserRouter>

            <Navbar className={"top-4"} />

            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<App />} />
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/contest" element={<Contests />} />
                <Route path="/login" element={<LoginFormDemo />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/problems" element={<ProblemsPage />} >
                    <Route path="company" element={<CompanyProblems />} />
                </Route>
                <Route path="/qn" element={<ProblemsPage />} />
                <Route path="*" element={<h1 className='text-white'>404 Not Found</h1>} />

            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    )
}
