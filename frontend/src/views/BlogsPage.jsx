import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom"
import SingleBlogPage from "./SingleBlogPage"
import { useContext, useEffect, useState } from "react"
import DOMPurify from "dompurify"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
function BlogsPage() {
    const { user } = useContext(AuthContext)
    const [pageSize] = useState(4)
    const [page, setPage] = useState(1)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({})
    const [totalBlogs, setTotalBlogs] = useState(0)
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    };
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/blog/getBlogs`, {
                params: {
                    page,
                    pageSize
                }
            })
            setTotalBlogs(response.data.totalBlogs)
            setBlogs(response.data.blogs)
        } catch (error) {
            console.log("blogs fetching error :", error.message)
            console.log(error)
            return error
        }
    }
    useEffect(() => {

        // setBlogs()
        fetchBlogs()
    }, [page, pageSize])
    // const id=
    const [searchParams] = useSearchParams()
    if (searchParams.get('id')) return <SingleBlogPage />
    return (
        <div className="pt-10">
            <h1 className="text-3xl md:text-7xl font-bold text-white mx-10 md:mx-32 mt-20 md:mt-16">Daily Blogs</h1>
            <h1 className="text-lg md:text-3xl text-gray-400  mx-10 md:mx-32 mt-2 md:mt-5 ">
                Explore our blog: your coding corner with practical tips, breakthrough trends, and inspiring discussions. Grow your skills, share your voice, and design your tech future.
            </h1>
            <div className="max-w-screen-xl mx-auto p-5 md:p-16">
                <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10 ">
                    {blogs?.map((object, index) => {

                        const handleBlogDelete = async() => {
                            // alert('deleted')
                            delete1 = true;
                            const confirmDelete = confirm('Are you sure you want to delete this blog?')
                            try {

                                confirmDelete &&await axios.post(`${apiBaseUrl}/blog/delete`, {
                                    blog_id: object._id,
                                    user_id: user._id
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                alert('Blog deleted successfully')
                                fetchBlogs()
                            } catch (error) {
                                console.log(error)
                                console.log(error.message)
                                alert('Error deleting blog', error.message)
                            }
                        }
                        let delete1 = false;
                        return (
                            <div key={index}
                                onClick={() => {
                                    // setBlogData(object)
                                    if (!delete1) {
                                        navigate(`/blogs?id=${object._id}`)
                                        delete1 = false;
                                    }

                                }}
                                className="bg-[#1a1f35]  rounded-lg relative my-3 md:my-0  cursor-pointer hover:bg-[#101423] hover:text-white transition duration-300 max-w-sm  overflow-hidden shadow-lg">
                                {
                                    object?.owner?._id === user?._id && (

                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtklEQVR4nO3SsYkCURSF4QED2cQG1HQTCzAWjM1twAJMjBZBLMPAPrQBs4VtwALcYFFQ0OWTgRGeg6jDCCrMDwfevZd3DlxuFBUUvD9ooB2onMesij4GiUbYOWcezGN1sgR8yc4GpXsDPtBKraR9Q5/RS4FZxhU18wQssE4ZfuP3EQHLpB4HZtv4TNF7RMBPUseneOIv6XWLgJhiRc+/ohUqmARme9QwzBMwDT4fgvel3j/q1wyPjNG/VaJ5K54AAAAASUVORK5CYII="
                                            className='absolute right-2 z-20 h-6 w-6 cursor-pointer hover:shadow-lg    m-2'
                                            onClick={() => handleBlogDelete()}
                                        ></img>
                                    )
                                }
                                <div className="py-8 px-8">
                                    <div className="flex items-center  gap-4 text-white">

                                        <img src={object?.owner?.profileUrl} className="rounded-full h-12 w-12 " />
                                        <div className="flex flex-col  justify-center">
                                            <p className="text-lg font-medium">{object?.owner?.username}</p >
                                            <p className="text-xs font-thin text-gray-300">{object?.owner?.firstname} {object?.owner?.lastname}</p >
                                        </div>
                                    </div>
                                    <NavLink href="#">
                                        <h4 className="text-xl mt-3 mb-1 text-white font-semibold">{object?.title}</h4>
                                    </NavLink>
                                    <p className="mb-2 text-sm text-gray-400">{DOMPurify.sanitize(object?.content?.substring(0, 150) + "...", {
                                        USE_PROFILES: {
                                            html: false
                                        }
                                    })}</p>

                                    <img src={object.thumbnailUrl} className="h-32 object-cover overflow-hidden rounded-xl w-full" />

                                    <hr className="mt-4" />
                                    <p className="text-xs text-gray-200">{formatDateTime(object.createdAt)}</p>

                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full flex justify-center">

                    <button className="mt-10 bg-[#101423] rounded-full w-[70%] md:w-[20%]  border border-transparent font-medium hover:bg-slate-200 disabled:opacity-50 hover:dark:bg-slate-700 flex flex-row items-center focus:outline-none self-center  justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500" type="button" 
                        onClick={async () => {
                            if(blogs.length>=totalBlogs){
                                alert('No more blogs to load')
                                return;
                            }
                            setPage(page + 1)
                            try {
                                const response = await axios.get(`${apiBaseUrl}/blog/getBlogs`, {
                                    params: {
                                        page,
                                        pageSize
                                    }
                                })
                                // console.log(response.data.blogs)
                                setBlogs((blg)=>[...blg,...response.data.blogs])
                            } catch (error) {
                                console.log("blogs fetching error :", error.message)
                                console.log(error)
                                return error
                            }
                        }}
                    >
                        <span>Load more</span>
                        <svg className="ml-3 h-5 w-5 fill-current" viewBox="0 0 448 512">
                            <path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z">

                            </path>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BlogsPage