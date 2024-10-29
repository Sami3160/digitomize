import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom"
import SingleBlogPage from "./SingleBlogPage"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import axios from "axios"
function BlogsPage() {
    const [pageSize] = useState(4)
    const [page, setPage] = useState(1)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({})
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
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blog/getBlogs', {
                    params: {
                        page,
                        pageSize
                    }
                })
                // console.log(response.data.blogs)
                setBlogs(response.data.blogs)
            } catch (error) {
                console.log("blogs fetching error :", error.message)
                console.log(error)
                return error
            }
        }
        // setBlogs()
        fetchBlogs()
    }, [page, pageSize])
    // const id=
    const [searchParams] = useSearchParams()
    if (searchParams.get('id')) return <SingleBlogPage blogData={blogData}/>
    return (
        <div className="pt-10">
            <h1 className="text-7xl text-white  mx-32 mt-16">Daily Blogs</h1>
            <h1 className="text-3xl text-white  mx-32 mt-5 ">
                Explore our blog: your coding corner with practical tips, breakthrough trends, and inspiring discussions. Grow your skills, share your voice, and design your tech future.
            </h1>
            <div className="max-w-screen-xl mx-auto p-16">
                {console.log(blogs)}
                <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
                    {blogs?.map((object, index) => (
                        <div key={index}
                            onClick={() => {
                                setBlogData(object)

                                navigate(`/blogs?id=${object._id}`)
                            }}
                            className="bg-[#020617]  cursor-pointer hover:bg-[#101423] hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="py-4 px-8">
                                <div className="flex items-center  gap-4 text-white">

                                    <img src={object.owner.profileUrl} className="rounded-full h-12 w-12 " />
                                    <div className="flex- flex-col gep-2 justify-center">
                                        <p className="text-xl font-medium">{object.owner.username}</p >
                                        <p className="text-xs font-thin text-gray-300">{object.owner.firstname} {object.owner.lastname}</p >
                                    </div>
                                </div>
                                <NavLink href="#">
                                    <h4 className="text-lg mb-3 text-white font-semibold">{object.title}</h4>
                                </NavLink>
                                <p className="mb-2 text-sm text-gray-600">{DOMPurify.sanitize(object.content.substring(0, 150) + "...", {
                                    USE_PROFILES: {
                                        html: false
                                    }
                                })}</p>

                                <img src={object.thumbnailUrl} className="h-32 object-fill w-full" />

                                <hr className="mt-4" />
                                <p className="text-xs text-gray-200">{formatDateTime(object.createdAt)}</p>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center">

                    <button className="mt-10 bg-[#101423] rounded-full w-[70%]  border border-transparent font-medium hover:bg-slate-200 disabled:opacity-50 hover:dark:bg-slate-700 flex flex-row items-center focus:outline-none self-center  justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500" type="button" >
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