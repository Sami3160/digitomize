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
import BlogsPage from './views/BlogsPage'
import SingleBlogPage from './views/SingleBlogPage'
import UserProfile from './views/UserProfile'
import { useNavigate } from 'react-router-dom'
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
                <Route path="/blogs" element={<BlogsPage />} >
                    <Route path=":id" element={<SingleBlogPage />} />
                </Route>
                <Route path='/profile/:user_id' element={<UserProfile/>} />
                <Route path="/problems" element={<ProblemsPage />} >
                    <Route path="company" element={<CompanyProblems />} />
                </Route>
                <Route path="/qn" element={<ProblemsPage />} />
                <Route path="*" element={<NotFound/>} />

            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    )
}

const NotFound = () => {
    const navigate = useNavigate();

    return (<div className='flex flex-col justify-center items-center h-screen'>
                    <h1 className='text-9xl text-[#5eead4] font-bold'>404 Page Not Found</h1>
                    
                    <button
                        onClick={() => {
                            navigate('/');
                        }} 
                        className='mt-7 bg-primary px-10 py-2 rounded border border-[#5eead4] text-base text-white hover:bg-[#5eead4] hover:text-black font-medium active:scale-95 active:bg-primary transition-transform duration-150 ease-in-out'>
                        Go to Home</button>

                    </div>
            )
}
