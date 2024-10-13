import React, { Suspense } from 'react'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SigninPage from './views/signin-page'
import Navbar from './test/navbar'
import { LoginFormDemo } from './test/login-form'
// const Loader = React.lazy(() => import('./components/loader'))
import Loader from './components/loader'
import ProblemsPage from './views/problems'
import CompanyProblems from './views/CompanyProblems'
// const LoginFormDemo = React.lazy(() => import('./test/login-form'))
// const SigninPage = React.lazy(() => import('./views/signin-page'))
// const Navbar=React.lazy(()=>import('./test/navbar'))
export default function GlobalRoute() {
    return (
        <BrowserRouter>
            <Navbar className={"top-4"} />
            <Suspense fallback={<Loader/>}>

            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<App />} />
                <Route path="/conetst" element={<App />} />
                <Route path="/profile" element={<App />} />
                <Route path="/login" element={<LoginFormDemo />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/profile" component={<App />} />
                <Route path="/problems" element={<ProblemsPage />} >
                    <Route path=":company" element={<CompanyProblems />} />
                </Route>
                <Route path="/qn" element={<ProblemsPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />

            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
